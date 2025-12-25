export interface Situation {
  id: string;
  name: string;
  description: string;
  icon: string;
  displayOrder: number;
}

export interface Intent {
  id: string;
  situationId: string;
  name: string;
  description: string;
  displayOrder: number;
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



