import { Situation, Intent, UsageLog } from './index';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface SituationsResponse {
  situations: Situation[];
}

export interface IntentsResponse {
  intents: Intent[];
}

export interface GenerateResponse {
  sentences: string[];
  generatedAt: string;
}


export interface LogResponse {
  success: boolean;
  logId: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  retryAfter?: number;
}



