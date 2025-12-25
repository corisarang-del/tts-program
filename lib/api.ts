import axios, { AxiosError } from 'axios';
import { ApiResponse, ErrorResponse } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// API 클라이언트 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET 요청
export async function apiGet<T>(endpoint: string): Promise<T> {
  try {
    const response = await apiClient.get<T>(endpoint);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

// POST 요청
export async function apiPost<T>(endpoint: string, data: any): Promise<T> {
  try {
    const response = await apiClient.post<T>(endpoint, data);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

// 에러 핸들링
function handleError(error: unknown): void {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const errorResponse = axiosError.response?.data;
    
    if (errorResponse) {
      console.error('[API Error]', errorResponse.error, errorResponse.message);
    } else {
      console.error('[API Error]', error.message);
    }
  } else {
    console.error('[API Error]', error);
  }
}



