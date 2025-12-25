import { NextRequest, NextResponse } from 'next/server';
import { getIntents } from '@/lib/db';
import { IntentsResponse } from '@/types/api';
import { createErrorResponse, logError, AppError } from '@/lib/error-handler';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const situationId = searchParams.get('situationId');
    
    if (!situationId) {
      throw new AppError(
        400,
        'Missing situationId',
        'situationId를 입력해주세요.'
      );
    }
    
    const intents = await getIntents(situationId);
    
    const response: IntentsResponse = {
      intents,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    logError(error, 'GET /api/intents');
    return createErrorResponse(error, '의도 목록을 불러올 수 없습니다.');
  }
}

