import { createClient } from '@supabase/supabase-js';
import { Situation, Intent, UsageLog } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

// PostgreSQL 직접 연결을 위한 대안 (환경 변수에 DATABASE_URL이 있는 경우)
const getDatabaseUrl = () => {
  return process.env.DATABASE_URL;
};

// 데이터베이스 연결 확인
export async function checkConnection(): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from('situations').select('count').limit(1);
      return !error;
    } catch {
      return false;
    }
  }
  return false;
}

// 데이터베이스 필드를 TypeScript 타입으로 매핑
function mapSituationFromDb(row: any): Situation {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    icon: row.icon,
    displayOrder: row.display_order,
  };
}

function mapIntentFromDb(row: any): Intent {
  return {
    id: row.id,
    situationId: row.situation_id,
    name: row.name,
    description: row.description,
    displayOrder: row.display_order,
  };
}

// Situations 조회
export async function getSituations(): Promise<Situation[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('situations')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) {
      throw new Error(`Failed to fetch situations: ${error.message}`);
    }
    
    // 데이터베이스 필드명을 TypeScript 타입으로 매핑
    return (data || []).map(mapSituationFromDb);
  }
  
  // Fallback: JSON 파일 사용
  const situations = await import('@/data/situations.json');
  return situations.default;
}

// Intents 조회
export async function getIntents(situationId: string): Promise<Intent[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('intents')
      .select('*')
      .eq('situation_id', situationId)
      .order('display_order', { ascending: true });
    
    if (error) {
      throw new Error(`Failed to fetch intents: ${error.message}`);
    }
    
    // 데이터베이스 필드명을 TypeScript 타입으로 매핑
    return (data || []).map(mapIntentFromDb);
  }
  
  // Fallback: JSON 파일 사용
  const intents = await import('@/data/intents.json');
  return intents.default.filter(intent => intent.situationId === situationId);
}

// Usage Log 저장
export async function saveUsageLog(log: UsageLog): Promise<string> {
  if (supabase) {
    const { data, error } = await supabase
      .from('usage_logs')
      .insert({
        session_id: log.sessionId,
        user_id: log.userId || null,
        situation_id: log.situationId,
        intent_id: log.intentId,
        sentences: log.sentences,
        selected_sentence_index: log.selectedSentenceIndex || null,
        tts_played: log.ttsPlayed,
        result_rating: log.resultRating,
        timestamp: log.timestamp,
        user_agent: log.userAgent,
        device: log.device,
      })
      .select('id')
      .single();
    
    if (error) {
      throw new Error(`Failed to save log: ${error.message}`);
    }
    
    return data?.id?.toString() || `log_${Date.now()}`;
  }
  
  // Fallback: 콘솔 로그 (개발 환경)
  console.log('[Usage Log]', log);
  return `log_${Date.now()}`;
}

// 데이터베이스 스키마 생성 SQL (수동 실행 필요)
export const CREATE_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS situations (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  icon VARCHAR,
  display_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS intents (
  id VARCHAR PRIMARY KEY,
  situation_id VARCHAR NOT NULL REFERENCES situations(id),
  name VARCHAR NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS usage_logs (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR NOT NULL,
  user_id VARCHAR,
  situation_id VARCHAR NOT NULL,
  intent_id VARCHAR NOT NULL,
  sentences TEXT[] NOT NULL,
  selected_sentence_index INTEGER,
  tts_played BOOLEAN DEFAULT FALSE,
  result_rating INTEGER CHECK (result_rating BETWEEN 1 AND 3),
  timestamp TIMESTAMP DEFAULT NOW(),
  user_agent TEXT,
  device VARCHAR
);

CREATE INDEX IF NOT EXISTS idx_intents_situation_id ON intents(situation_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_session_id ON usage_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_timestamp ON usage_logs(timestamp);
`;

