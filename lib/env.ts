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
  const requiredEnvVars = ['OPENAI_API_KEY'];
  
  const missing: string[] = [];
  
  for (const key of requiredEnvVars) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env.local file.'
    );
  }
}



