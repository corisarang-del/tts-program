import { NextRequest, NextResponse } from 'next/server';
import { generateSentences } from '@/lib/openai';
import { getSituations, getIntents } from '@/lib/db';
import { GenerateResponse } from '@/types/api';
import { createErrorResponse, logError, AppError } from '@/lib/error-handler';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { situationId, intentId } = body;
    
    if (!situationId || !intentId) {
      throw new AppError(
        400,
        'Missing required fields',
        'situationId와 intentId를 모두 입력해주세요.'
      );
    }
    
    // 상황과 의도 정보 가져오기
    const [situations, intents] = await Promise.all([
      getSituations(),
      getIntents(situationId),
    ]);
    
    const situation = situations.find(s => s.id === situationId);
    const intent = intents.find(i => i.id === intentId);
    
    if (!situation || !intent) {
      throw new AppError(
        404,
        'Invalid situation or intent',
        '유효하지 않은 상황 또는 의도입니다.'
      );
    }
    
    // OpenAI로 문장 생성
    const sentences = await generateSentences(situation, intent);
    
    const response: GenerateResponse = {
      sentences,
      generatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json(response);
  } catch (error: unknown) {
    logError(error, 'POST /api/generate');
    
    // Rate limit 에러 처리
    if (
      error &&
      typeof error === 'object' &&
      ('status' in error && error.status === 429) ||
      ('message' in error && typeof error.message === 'string' && error.message.includes('rate limit'))
    ) {
      return createErrorResponse(
        new AppError(
          429,
          'Rate limit exceeded',
          '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
          60
        ),
        '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.'
      );
    }
    
    return createErrorResponse(error, '문장 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
}

