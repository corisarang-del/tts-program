import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { requireEnv } from '@/lib/env';

const apiKey = requireEnv('OPENAI_API_KEY');

const openai = new OpenAI({
  apiKey,
});

// TTS 캐시 디렉토리
const CACHE_DIR = path.join(process.cwd(), '.cache', 'tts');

// 캐시 디렉토리 생성
function ensureCacheDir(): void {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

// 텍스트 해시 생성 (캐시 키)
function getTextHash(text: string): string {
  // 간단한 해시 함수
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

// TTS 생성 함수
export async function generateTTS(
  text: string,
  voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer' = 'nova'
): Promise<{ audioBuffer: Buffer; cached: boolean }> {
  ensureCacheDir();
  
  const textHash = getTextHash(text);
  const cachePath = path.join(CACHE_DIR, `${textHash}.mp3`);

  // 캐시 확인
  if (fs.existsSync(cachePath)) {
    const audioBuffer = fs.readFileSync(cachePath);
    return { audioBuffer, cached: true };
  }

  try {
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: voice,
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    
    // 캐시 저장
    fs.writeFileSync(cachePath, buffer);
    
    return { audioBuffer: buffer, cached: false };
  } catch (error) {
    console.error('[TTS Error]', error);
    throw error;
  }
}

// TTS URL 생성 (Base64 데이터 URL)
export function createAudioDataURL(audioBuffer: Buffer): string {
  const base64 = audioBuffer.toString('base64');
  return `data:audio/mpeg;base64,${base64}`;
}

