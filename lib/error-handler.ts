import { ErrorResponse } from '@/types/api';
import { NextResponse } from 'next/server';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public errorCode: string,
    message: string,
    public retryAfter?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function createErrorResponse(
  error: unknown,
  defaultMessage: string = '알 수 없는 오류가 발생했습니다.'
): NextResponse<ErrorResponse> {
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: error.errorCode,
        message: error.message,
        retryAfter: error.retryAfter,
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof Error) {
    // OpenAI API 에러 처리
    if (error.message.includes('rate limit') || error.message.includes('429')) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
          retryAfter: 60,
        },
        { status: 429 }
      );
    }

    // 네트워크 에러 처리
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return NextResponse.json(
        {
          error: 'Network error',
          message: '네트워크 연결을 확인해주세요.',
        },
        { status: 503 }
      );
    }

    // 일반 에러
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error.message || defaultMessage,
      },
      { status: 500 }
    );
  }

  // 알 수 없는 에러
  return NextResponse.json(
    {
      error: 'Unknown error',
      message: defaultMessage,
    },
    { status: 500 }
  );
}

export function logError(error: unknown, context: string): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}]`, error);
  }
  // 프로덕션에서는 에러 로깅 서비스에 전송
}



