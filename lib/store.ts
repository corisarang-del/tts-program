import { create } from 'zustand';
import { Situation, Intent, Locale } from '@/types';
import { AppState } from '@/types/store';

export const useAppStore = create<AppState>((set) => ({
  // 초기 상태
  situation: null,
  intent: null,
  sentences: [],
  ttsPlayed: false,
  resultRating: null,
  language: 'ko',

  // Actions
  setSituation: (situation: Situation) => set({ situation }),
  setIntent: (intent: Intent) => set({ intent }),
  setSentences: (sentences: string[]) => set({ sentences }),
  setLanguage: (language: Locale) => set({ language }),
  setTtsPlayed: (played: boolean) => set({ ttsPlayed: played }),
  setResultRating: (rating: number) => set({ resultRating: rating }),
  resetStore: () => set({
    situation: null,
    intent: null,
    sentences: [],
    ttsPlayed: false,
    resultRating: null,
    language: 'ko',
  }),
}));



