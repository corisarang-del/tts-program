import { NextRequest, NextResponse } from 'next/server';
import { generateTTS, createAudioDataURL } from '@/lib/tts';
import { TTSResponse } from '@/types/api';
import { createErrorResponse, logError, AppError } from '@/lib/error-handler';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, voice } = body;
    
    if (!text) {
      throw new AppError(
        400,
        'Missing text',
        '텍스트를 입력해주세요.'
      );
    }
    
    // TTS 생성
    const { audioBuffer, cached } = await generateTTS(text, voice || 'nova');
    
    // Base64 데이터 URL 생성
    const audioUrl = createAudioDataURL(audioBuffer);
    
    // 대략적인 duration 계산 (간단한 추정)
    const duration = Math.ceil(text.length * 0.1); // 대략 0.1초 per character
    
    const response: TTSResponse = {
      audioUrl,
      duration,
      cached,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    logError(error, 'POST /api/tts');
    return createErrorResponse(error, '음성 생성 중 오류가 발생했습니다.');
  }
}

