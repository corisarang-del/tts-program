/**
 * 환경 변수 검증 유틸리티
 */

export function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value;
}

export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is not set and no default value provided`);
  }
  return value || defaultValue || '';
}

/**
 * 앱 시작 시 필수 환경 변수 검증
 */
export function validateEnv(): void {
  const requiredEnvVars = ['GOOGLE_GEMINI_API_KEY'];
  
  const missing: string[] = [];
  
  for (const key of requiredEnvVars) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }
  
  // Google Cloud TTS 인증 확인 (하나 이상 필요)
  // API 키만 있어도 REST API를 사용할 수 있으므로 프로젝트 ID는 선택사항
  const hasGoogleAuth = 
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    (process.env.GOOGLE_CLOUD_PROJECT_ID && process.env.GOOGLE_CLOUD_KEY) ||
    process.env.GOOGLE_CLOUD_API_KEY; // API 키만 있어도 작동
  
  if (!hasGoogleAuth) {
    console.warn(
      'Warning: Google Cloud TTS 인증 정보가 설정되지 않았습니다.\n' +
      '다음 중 하나를 설정해주세요:\n' +
      '1. GOOGLE_APPLICATION_CREDENTIALS (서비스 계정 키 파일 경로)\n' +
      '2. GOOGLE_CLOUD_PROJECT_ID + GOOGLE_CLOUD_KEY (JSON 문자열)\n' +
      '3. GOOGLE_CLOUD_API_KEY (API 키만으로도 작동 가능, 프로젝트 ID는 선택사항)'
    );
  }
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env.local file.'
    );
  }
}


