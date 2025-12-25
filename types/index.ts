export type Locale = 'ko' | 'en' | 'ja' | 'zh';

export type LocalizedText = Partial<Record<Locale, string>>;
export type LocalizedSentences = Partial<Record<Locale, string[]>>;

export interface Situation {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  icon: string;
  displayOrder: number;
}

export interface Intent {
  id: string;
  situationId: string;
  name: LocalizedText;
  description: LocalizedText;
  displayOrder: number;
  sentences?: LocalizedSentences;
}

export interface UsageLog {
  logId?: string;
  sessionId: string;
  userId?: string;
  situationId: string;
  intentId: string;
  sentences: string[];
  selectedSentenceIndex?: number;
  ttsPlayed: boolean;
  resultRating: number | null;
  timestamp: string;
  userAgent: string;
  device: 'mobile' | 'tablet' | 'desktop';
}



