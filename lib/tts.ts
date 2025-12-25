import fs from 'fs';
import os from 'os';
import path from 'path';
import { getEnv } from '@/lib/env';
import { AppError } from '@/lib/error-handler';

// Google Cloud TTS REST API를 사용하여 API 키로 인증
async function callGoogleCloudTTSRESTAPI(
  text: string,
  voice: string,
  apiKey: string
): Promise<Buffer> {
  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
  
  const requestBody = {
    input: { text },
    voice: {
      languageCode: 'ko-KR',
      name: voice,
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: 1.0,
      pitch: 0,
      volumeGainDb: 0,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error?.message || `HTTP ${response.status}`;
    
    if (response.status === 401 || response.status === 403) {
      throw new AppError(
        500,
        'GOOGLE_CLOUD_AUTH_ERROR',
        'Google Cloud TTS 인증에 실패했습니다. API 키를 확인해주세요.'
      );
    }
    if (response.status === 429) {
      throw new AppError(
        429,
        'GOOGLE_CLOUD_QUOTA_EXCEEDED',
        'Google Cloud TTS 할당량을 초과했습니다. 잠시 후 다시 시도해주세요.'
      );
    }
    
    throw new AppError(
      500,
      'GOOGLE_CLOUD_TTS_ERROR',
      `Google Cloud TTS 오류: ${errorMessage}`
    );
  }

  const data = await response.json();
  
  if (!data.audioContent) {
    throw new AppError(
      500,
      'GOOGLE_CLOUD_TTS_NO_AUDIO',
      'Google Cloud TTS에서 오디오 콘텐츠를 받지 못했습니다.'
    );
  }

  return Buffer.from(data.audioContent, 'base64');
}

const MAX_MEMORY_CACHE_ITEMS = 50;
const memoryCache = new Map<string, Buffer>();
let fileCacheAvailable = true;

function getCacheDir(): string {
  if (process.env.TTS_CACHE_DIR) {
    return process.env.TTS_CACHE_DIR;
  }
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), 'quicktalk-tts');
  }
  return path.join(process.cwd(), '.cache', 'tts');
}

const CACHE_DIR = getCacheDir();

function ensureCacheDir(): void {
  if (!fileCacheAvailable) {
    return;
  }
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
  } catch {
    fileCacheAvailable = false;
  }
}

function setMemoryCache(key: string, buffer: Buffer): void {
  memoryCache.set(key, buffer);
  if (memoryCache.size > MAX_MEMORY_CACHE_ITEMS) {
    const firstKey = memoryCache.keys().next().value;
    if (firstKey) {
      memoryCache.delete(firstKey);
    }
  }
}

// 텍스트 해시 생성 (캐시 키)
function getTextHash(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// Google Cloud TTS 음성 옵션
export type GoogleCloudVoice =
  | 'ko-KR-Standard-A' // 여성 음성
  | 'ko-KR-Standard-B' // 남성 음성
  | 'ko-KR-Standard-C' // 여성 음성
  | 'ko-KR-Standard-D' // 남성 음성
  | 'ko-KR-Wavenet-A'  // 고품질 여성 음성
  | 'ko-KR-Wavenet-B'  // 고품질 남성 음성
  | 'ko-KR-Wavenet-C'  // 고품질 여성 음성
  | 'ko-KR-Wavenet-D'; // 고품질 남성 음성

// TTS 생성 함수
export async function generateTTS(
  text: string,
  voice: GoogleCloudVoice = 'ko-KR-Standard-A'
): Promise<{ audioBuffer: Buffer; cached: boolean }> {
  const textHash = getTextHash(text + voice);
  const memoryCached = memoryCache.get(textHash);
  if (memoryCached) {
    return { audioBuffer: memoryCached, cached: true };
  }

  ensureCacheDir();
  const cachePath = fileCacheAvailable ? path.join(CACHE_DIR, `${textHash}.mp3`) : null;

  if (cachePath) {
    try {
      if (fs.existsSync(cachePath)) {
        const audioBuffer = fs.readFileSync(cachePath);
        setMemoryCache(textHash, audioBuffer);
        return { audioBuffer, cached: true };
      }
    } catch {
      fileCacheAvailable = false;
    }
  }

  try {
    // Google Cloud TTS 인증 확인
    // 환경 변수를 여러 방법으로 확인
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
    let credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || '';
    const keyJson = process.env.GOOGLE_CLOUD_KEY;

    // 환경 변수가 없으면 프로젝트 내 키 파일 경로를 기본값으로 사용
    if (!credentialsPath) {
      const defaultKeyPath = path.join(process.cwd(), 'credentials', 'google-cloud-key.json');
      if (fs.existsSync(defaultKeyPath)) {
        credentialsPath = defaultKeyPath;
        console.log('[TTS Debug] Using default credentials path:', credentialsPath);
      }
    }

    // 디버깅: 환경 변수 확인 (더 자세한 로그)
    const allGoogleEnvVars = Object.keys(process.env).filter(key => key.includes('GOOGLE'));
    console.log('[TTS Debug] Environment variables:', {
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey?.length || 0,
      hasCredentialsPath: !!credentialsPath,
      credentialsPath: credentialsPath || 'none',
      credentialsPathExists: credentialsPath ? fs.existsSync(credentialsPath) : false,
      hasProjectId: !!projectId,
      projectId: projectId || 'none',
      hasKeyJson: !!keyJson,
      nodeEnv: process.env.NODE_ENV,
      cwd: process.cwd(),
      allGoogleEnvVars,
      // 환경 변수 값 확인 (보안을 위해 일부만 표시)
      googleEnvValues: allGoogleEnvVars.reduce((acc, key) => {
        const value = process.env[key];
        if (key.includes('KEY') || key.includes('CREDENTIALS')) {
          acc[key] = value ? `${value.substring(0, 20)}...` : 'not set';
        } else {
          acc[key] = value || 'not set';
        }
        return acc;
      }, {} as Record<string, string>),
    });

    let buffer: Buffer;

    if (apiKey) {
      // REST API를 사용하여 API 키로 인증 (프로젝트 ID는 선택사항)
      buffer = await callGoogleCloudTTSRESTAPI(text, voice, apiKey);
    } else if (credentialsPath) {
      // 서비스 계정 키 파일 사용 (기존 SDK 방식)
      // 절대 경로 또는 상대 경로 모두 처리
      let resolvedPath: string;
      if (path.isAbsolute(credentialsPath)) {
        resolvedPath = credentialsPath;
      } else {
        // 상대 경로인 경우 프로젝트 루트 기준으로 해석
        resolvedPath = path.join(process.cwd(), credentialsPath);
      }
      
      // Windows 경로 구분자 정규화 (슬래시를 백슬래시로)
      const normalizedPath = resolvedPath.replace(/\//g, path.sep);
      
      // 여러 경로 형식 시도
      const pathsToTry = [
        normalizedPath,
        resolvedPath, // 원본 경로도 시도
        credentialsPath, // 원본 환경 변수 값도 시도
        path.resolve(credentialsPath), // resolve로 절대 경로 변환
      ];
      
      console.log('[TTS Debug] Resolving credentials path:', {
        original: credentialsPath,
        resolved: resolvedPath,
        normalized: normalizedPath,
        cwd: process.cwd(),
        pathsToTry: pathsToTry.map(p => ({ path: p, exists: fs.existsSync(p) })),
      });
      
      let finalPath: string | null = null;
      for (const testPath of pathsToTry) {
        if (fs.existsSync(testPath)) {
          finalPath = testPath;
          console.log('[TTS Debug] Found credentials file at:', finalPath);
          break;
        }
      }
      
      if (!finalPath) {
        // 파일 내용 확인 (키 파일이 올바른지)
        const keyFileInProject = path.join(process.cwd(), 'credentials', 'google-cloud-key.json');
        const keyFileExists = fs.existsSync(keyFileInProject);
        
        throw new AppError(
          500,
          'GOOGLE_CLOUD_CREDENTIALS_NOT_FOUND',
          `서비스 계정 키 파일을 찾을 수 없습니다.\n` +
          `시도한 경로들:\n` +
          pathsToTry.map(p => `  - ${p} (존재: ${fs.existsSync(p) ? '예' : '아니오'})`).join('\n') +
          `\n프로젝트 내 키 파일: ${keyFileInProject} (존재: ${keyFileExists ? '예' : '아니오'})\n` +
          `현재 작업 디렉토리: ${process.cwd()}\n` +
          `환경 변수 GOOGLE_APPLICATION_CREDENTIALS: ${credentialsPath}`
        );
      }
      
      const { TextToSpeechClient } = await import('@google-cloud/text-to-speech');
      const client = new TextToSpeechClient({
        keyFilename: finalPath,
      });
      
      const [response] = await client.synthesizeSpeech({
        input: { text },
        voice: {
          languageCode: 'ko-KR',
          name: voice,
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 1.0,
          pitch: 0,
          volumeGainDb: 0,
        },
      });
      
      if (!response.audioContent) {
        throw new Error('No audio content returned from Google Cloud TTS');
      }
      
      buffer = Buffer.from(response.audioContent);
    } else if (projectId && keyJson) {
      // JSON 문자열로 인증 정보 제공
      try {
        const credentials = JSON.parse(keyJson);
        const { TextToSpeechClient } = await import('@google-cloud/text-to-speech');
        const client = new TextToSpeechClient({
          projectId,
          credentials,
        });
        
        const [response] = await client.synthesizeSpeech({
          input: { text },
          voice: {
            languageCode: 'ko-KR',
            name: voice,
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 1.0,
            pitch: 0,
            volumeGainDb: 0,
          },
        });
        
        if (!response.audioContent) {
          throw new Error('No audio content returned from Google Cloud TTS');
        }
        
        buffer = Buffer.from(response.audioContent);
      } catch (parseError) {
        throw new AppError(
          500,
          'INVALID_GOOGLE_CLOUD_KEY',
          'GOOGLE_CLOUD_KEY가 유효한 JSON 형식이 아닙니다.'
        );
      }
    } else {
      // 환경 변수 디버깅 정보
      const debugInfo = {
        apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : '없음',
        credentialsPath: credentialsPath || '없음',
        projectId: projectId || '없음',
        keyJson: keyJson ? '있음' : '없음',
        allEnvVars: Object.keys(process.env)
          .filter(key => key.includes('GOOGLE'))
          .map(key => `${key}=${process.env[key]?.substring(0, 20)}...`),
      };
      
      console.error('[TTS Error] 환경 변수가 설정되지 않았습니다:', debugInfo);
      
      throw new AppError(
        500,
        'GOOGLE_CLOUD_TTS_NOT_CONFIGURED',
        'Google Cloud TTS가 설정되지 않았습니다. GOOGLE_CLOUD_API_KEY 또는 GOOGLE_APPLICATION_CREDENTIALS를 설정해주세요.\n' +
        '현재 환경 변수 상태:\n' +
        `- GOOGLE_CLOUD_API_KEY: ${apiKey ? '설정됨' : '없음'}\n` +
        `- GOOGLE_APPLICATION_CREDENTIALS: ${credentialsPath ? '설정됨' : '없음'}\n` +
        `- GOOGLE_CLOUD_PROJECT_ID: ${projectId ? '설정됨' : '없음'}\n` +
        `- GOOGLE_CLOUD_KEY: ${keyJson ? '설정됨' : '없음'}\n` +
        `\n서버를 재시작했는지 확인해주세요.`
      );
    }

    setMemoryCache(textHash, buffer);

    if (cachePath && fileCacheAvailable) {
      try {
        fs.writeFileSync(cachePath, buffer);
      } catch {
        fileCacheAvailable = false;
      }
    }

    return { audioBuffer: buffer, cached: false };
  } catch (error) {
    console.error('[TTS Error]', error);
    
    // AppError는 그대로 전달
    if (error instanceof AppError) {
      throw error;
    }
    
    // 기타 에러 처리
    if (error instanceof Error) {
      if (error.message.includes('authentication') || error.message.includes('credentials')) {
        throw new AppError(
          500,
          'GOOGLE_CLOUD_AUTH_ERROR',
          'Google Cloud 인증에 실패했습니다. 환경 변수를 확인해주세요.'
        );
      }
      if (error.message.includes('quota') || error.message.includes('limit')) {
        throw new AppError(
          429,
          'GOOGLE_CLOUD_QUOTA_EXCEEDED',
          'Google Cloud TTS 할당량을 초과했습니다. 잠시 후 다시 시도해주세요.'
        );
      }
    }
    
    throw error;
  }
}

// TTS URL 생성 (Base64 데이터 URL)
export function createAudioDataURL(audioBuffer: Buffer): string {
  const base64 = audioBuffer.toString('base64');
  return `data:audio/mpeg;base64,${base64}`;
}
