import { NextResponse } from 'next/server';
import { getSituations } from '@/lib/db';
import { SituationsResponse } from '@/types/api';
import { createErrorResponse, logError } from '@/lib/error-handler';

export async function GET() {
  try {
    const situations = await getSituations();
    
    const response: SituationsResponse = {
      situations,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    logError(error, 'GET /api/situations');
    return createErrorResponse(error, '상황 목록을 불러올 수 없습니다.');
  }
}

