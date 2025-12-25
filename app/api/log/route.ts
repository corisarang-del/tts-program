import { NextRequest, NextResponse } from 'next/server';
import { saveUsageLog } from '@/lib/db';
import { UsageLog } from '@/types';
import { LogResponse } from '@/types/api';
import { createErrorResponse, logError, AppError } from '@/lib/error-handler';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sessionId,
      situationId,
      intentId,
      sentences,
      selectedSentenceIndex,
      ttsPlayed,
      resultRating,
      timestamp,
      userAgent,
      device,
    } = body;
    
    if (!sessionId || !situationId || !intentId || !sentences) {
      throw new AppError(
        400,
        'Missing required fields',
        '필수 필드가 누락되었습니다.'
      );
    }
    
    const log: UsageLog = {
      sessionId,
      situationId,
      intentId,
      sentences: Array.isArray(sentences) ? sentences : [sentences],
      selectedSentenceIndex,
      ttsPlayed: ttsPlayed || false,
      resultRating: resultRating || null,
      timestamp: timestamp || new Date().toISOString(),
      userAgent: userAgent || request.headers.get('user-agent') || '',
      device: device || 'desktop',
    };
    
    const logId = await saveUsageLog(log);
    
    const response: LogResponse = {
      success: true,
      logId,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    logError(error, 'POST /api/log');
    return createErrorResponse(error, '로그 저장에 실패했습니다.');
  }
}

