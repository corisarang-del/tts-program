import { NextRequest, NextResponse } from 'next/server';
import { generateTTS, localeToLanguageCode, getDefaultVoiceForLocale } from '@/lib/tts';
import { createErrorResponse, logError, AppError } from '@/lib/error-handler';
import { Locale } from '@/types';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // 환경 변수 디버깅 (더 자세한 로그)
    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    console.log('[TTS API] Environment check:', {
      hasApiKey: !!process.env.GOOGLE_CLOUD_API_KEY,
      apiKeyPrefix: process.env.GOOGLE_CLOUD_API_KEY?.substring(0, 10),
      hasCredentials: !!credentialsPath,
      credentialsPath: credentialsPath || 'not set',
      credentialsPathPreview: credentialsPath ? `${credentialsPath.substring(0, 50)}...` : 'not set',
      nodeEnv: process.env.NODE_ENV,
      cwd: process.cwd(),
      allGoogleEnvKeys: Object.keys(process.env).filter(key => key.includes('GOOGLE')),
    });
    
    const body = await request.json();
    const { text, voice, language } = body;

    if (!text) {
      throw new AppError(
        400,
        'Missing text',
        '텍스트가 필요합니다.'
      );
    }

    // 언어 코드 결정: language 파라미터가 있으면 사용, 없으면 voice에서 추출하거나 기본값 사용
    let languageCode: string | undefined;
    let finalVoice = voice;
    
    if (language) {
      // Locale 타입 검증
      const validLocales: Locale[] = ['ko', 'en', 'ja', 'zh'];
      if (validLocales.includes(language as Locale)) {
        languageCode = localeToLanguageCode(language as Locale);
        // voice가 제공되지 않았으면 언어에 맞는 기본 음성 사용
        if (!finalVoice) {
          finalVoice = getDefaultVoiceForLocale(language as Locale);
        }
      }
    }
    
    // voice가 제공되지 않았고 language도 없으면 기본값 사용
    if (!finalVoice) {
      finalVoice = 'ko-KR-Standard-A';
    }

    const { audioBuffer, cached } = await generateTTS(text, finalVoice, languageCode);

    const duration = Math.ceil(text.length * 0.1);

    return new NextResponse(new Uint8Array(audioBuffer), {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
        'X-Audio-Cached': String(cached),
        'X-Audio-Duration': String(duration),
      },
    });
  } catch (error) {
    logError(error, 'POST /api/tts');
    return createErrorResponse(error, '음성 생성 중 오류가 발생했습니다.');
  }
}
