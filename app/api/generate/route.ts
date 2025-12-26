import { NextRequest, NextResponse } from 'next/server';
import { generateSentences } from '@/lib/openai';
import { getSituations, getIntents } from '@/lib/db';
import { GenerateResponse } from '@/types/api';
import { createErrorResponse, logError, AppError } from '@/lib/error-handler';
import { getLocalizedSentences, LOCALES } from '@/lib/i18n';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { situationId, intentId, language, forceGenerate } = body;
    
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
    const normalizedLanguage =
      typeof language === 'string' && LOCALES.includes(language as any)
        ? language
        : 'ko';
    
    // forceGenerate가 true가 아니면 저장된 문장 우선 사용
    const storedSentences = getLocalizedSentences(intent.sentences, normalizedLanguage as any);
    if (!forceGenerate && storedSentences && storedSentences.length > 0) {
      const response: GenerateResponse = {
        sentences: storedSentences.slice(0, 3),
        generatedAt: new Date().toISOString(),
      };
      return NextResponse.json(response);
    }

    // forceGenerate가 true이거나 저장된 문장이 없으면 AI로 생성
    let sentences = await generateSentences(situation, intent, normalizedLanguage as any);
    
    // 최소 2개 보장
    if (!Array.isArray(sentences) || sentences.length < 2) {
      // 재시도 로직
      console.warn(`[Generate] Only ${sentences?.length || 0} sentences generated, retrying...`);
      sentences = await generateSentences(situation, intent, normalizedLanguage as any);
      
      // 여전히 2개 미만이면 에러
      if (!Array.isArray(sentences) || sentences.length < 2) {
        throw new AppError(
          500,
          'INSUFFICIENT_SENTENCES',
          '문장 생성에 실패했습니다. 최소 2개의 문장을 생성할 수 없습니다.'
        );
      }
    }
    
    const response: GenerateResponse = {
      sentences: sentences.slice(0, 3), // 최대 3개까지만
      generatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json(response);
  } catch (error: unknown) {
    logError(error, 'POST /api/generate');
    
    // Rate limit 에러 처리
    if (
      error &&
      typeof error === 'object' &&
      (
        ('status' in error && (error as any).status === 429) ||
        ('message' in error && typeof (error as any).message === 'string' && (error as any).message.includes('rate limit'))
      )
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
