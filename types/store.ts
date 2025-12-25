import { Situation, Intent } from './index';

export interface AppState {
  // 선택한 데이터
  situation: Situation | null;
  intent: Intent | null;
  sentences: string[];
  
  // 사용자 행동
  ttsPlayed: boolean;
  resultRating: number | null;
  
  // Actions
  setSituation: (situation: Situation) => void;
  setIntent: (intent: Intent) => void;
  setSentences: (sentences: string[]) => void;
  setTtsPlayed: (played: boolean) => void;
  setResultRating: (rating: number) => void;
  resetStore: () => void;
}



