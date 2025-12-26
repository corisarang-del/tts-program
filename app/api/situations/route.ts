import { NextResponse } from 'next/server';
import { getSituations } from '@/lib/db';
import { SituationsResponse } from '@/types/api';
import { createErrorResponse, logError } from '@/lib/error-handler';
import { handleCorsOptions, addCorsHeaders } from '@/lib/cors';

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET() {
  try {
    const situations = await getSituations();

    const response: SituationsResponse = {
      situations,
    };

    const jsonResponse = NextResponse.json(response);
    return addCorsHeaders(jsonResponse);
  } catch (error) {
    logError(error, 'GET /api/situations');
    const errorResponse = createErrorResponse(error, '상황 목록을 불러올 수 없습니다.');
    return addCorsHeaders(errorResponse);
  }
}

