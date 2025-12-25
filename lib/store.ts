import { create } from 'zustand';
import { Situation, Intent } from '@/types';
import { AppState } from '@/types/store';

export const useAppStore = create<AppState>((set) => ({
  // 초기 상태
  situation: null,
  intent: null,
  sentences: [],
  ttsPlayed: false,
  resultRating: null,

  // Actions
  setSituation: (situation: Situation) => set({ situation }),
  setIntent: (intent: Intent) => set({ intent }),
  setSentences: (sentences: string[]) => set({ sentences }),
  setTtsPlayed: (played: boolean) => set({ ttsPlayed: played }),
  setResultRating: (rating: number) => set({ resultRating: rating }),
  resetStore: () => set({
    situation: null,
    intent: null,
    sentences: [],
    ttsPlayed: false,
    resultRating: null,
  }),
}));



