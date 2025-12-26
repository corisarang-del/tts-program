// API Base URL
const API_BASE = typeof window !== 'undefined'
  ? (process.env.NEXT_PUBLIC_API_URL || '')
  : '';

// API Endpoints
export const API_ENDPOINTS = {
  SITUATIONS: `${API_BASE}/api/situations`,
  INTENTS: `${API_BASE}/api/intents`,
  GENERATE: `${API_BASE}/api/generate`,
  TTS: `${API_BASE}/api/tts`,
  LOG: `${API_BASE}/api/log`,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  SESSION_ID: 'quicktalk_session_id',
  USER_PREFERENCES: 'quicktalk_user_preferences',
} as const;

// Default Values
export const DEFAULT_VALUES = {
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// Device Detection
export const DEVICE_TYPES = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
} as const;



