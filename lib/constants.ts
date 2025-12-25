// API Endpoints
export const API_ENDPOINTS = {
  SITUATIONS: '/api/situations',
  INTENTS: '/api/intents',
  GENERATE: '/api/generate',
  TTS: '/api/tts',
  LOG: '/api/log',
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



