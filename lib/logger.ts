import { apiPost } from './api';
import { API_ENDPOINTS } from './constants';
import { UsageLog } from '@/types';

// 세션 ID 생성
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// 세션 ID 가져오기 또는 생성
export function getSessionId(): string {
  if (typeof window === 'undefined') {
    return generateSessionId();
  }
  
  const stored = localStorage.getItem('quicktalk_session_id');
  if (stored) {
    return stored;
  }
  
  const newSessionId = generateSessionId();
  localStorage.setItem('quicktalk_session_id', newSessionId);
  return newSessionId;
}

// 디바이스 타입 감지
export function detectDevice(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') {
    return 'desktop';
  }
  
  const width = window.innerWidth;
  if (width < 640) {
    return 'mobile';
  } else if (width < 1024) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

// 상황 선택 로그
export function logSelection(type: 'situation' | 'intent', data: any): void {
  console.log(`[Log Selection] ${type}:`, data);
  // 실제 로그 전송은 결과 평가 시점에 수행
}

// 문장 생성 로그
export function logGeneration(sentences: string[]): void {
  console.log('[Log Generation]', sentences);
}

// 평가 로그
export function logRating(rating: number): void {
  console.log('[Log Rating]', rating);
}

// TTS 재생 로그
export function logTTSPlay(): void {
  console.log('[Log TTS Play]');
}

// 전체 사용 로그 전송
export async function sendUsageLog(log: UsageLog): Promise<string> {
  try {
    const response = await apiPost<{ success: boolean; logId: string }>(
      API_ENDPOINTS.LOG,
      log
    );
    return response.logId;
  } catch (error) {
    console.error('[Failed to send usage log]', error);
    throw error;
  }
}



