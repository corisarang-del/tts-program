import { LocalizedSentences, LocalizedText, Locale } from '@/types';

export const LOCALES: Locale[] = ['ko', 'en', 'ja', 'zh'];

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '中文',
};

type UITextKey = 'copy' | 'play' | 'pause' | 'regenerate' | 'next' | 'back' | 'generatedSentences' | 'noSentences' | 'backToIntent' | 'whichIntention' | 'retry' | 'whichSituation' | 'wasItHelpful' | 'rateHelpfulness' | 'solved' | 'okay' | 'notHelpful' | 'skip';

const UI_TEXTS: Record<UITextKey, Record<Locale, string>> = {
  copy: {
    ko: '복사',
    en: 'Copy',
    ja: 'コピー',
    zh: '复制',
  },
  play: {
    ko: '🔊 듣기',
    en: '🔊 Listen',
    ja: '🔊 再生',
    zh: '🔊 播放',
  },
  pause: {
    ko: '일시정지',
    en: 'Pause',
    ja: '一時停止',
    zh: '暂停',
  },
  regenerate: {
    ko: '다시 생성',
    en: 'Regenerate',
    ja: '再生成',
    zh: '重新生成',
  },
  next: {
    ko: '다음',
    en: 'Next',
    ja: '次',
    zh: '下一步',
  },
  back: {
    ko: '돌아가기',
    en: 'Back',
    ja: '戻る',
    zh: '返回',
  },
  generatedSentences: {
    ko: '생성된 문장',
    en: 'Generated Sentences',
    ja: '生成された文',
    zh: '生成的句子',
  },
  noSentences: {
    ko: '생성된 문장이 없습니다.',
    en: 'No generated sentences.',
    ja: '生成された文がありません。',
    zh: '没有生成的句子。',
  },
  backToIntent: {
    ko: '의도 선택으로 돌아가기',
    en: 'Back to Intent Selection',
    ja: '意図選択に戻る',
    zh: '返回意图选择',
  },
  whichIntention: {
    ko: '어떤 의도인가요?',
    en: 'What is your intention?',
    ja: 'どの意図ですか?',
    zh: '你的意图是什么?',
  },
  retry: {
    ko: '다시 시도',
    en: 'Retry',
    ja: '再試行',
    zh: '重试',
  },
  whichSituation: {
    ko: '어떤 상황인가요?',
    en: 'What situation are you in?',
    ja: 'どんな状況ですか?',
    zh: '你的情况是什么?',
  },
  wasItHelpful: {
    ko: '도움이 되셨나요?',
    en: 'Was this helpful?',
    ja: '役に立ちました?',
    zh: '有帮助吗?',
  },
  rateHelpfulness: {
    ko: '생성된 문장이 도움이 되었는지 평가해주세요',
    en: 'Please rate if the generated sentences were helpful',
    ja: '生成された文が役に立ったかを評価してください',
    zh: '请评价生成的句子是否有帮助',
  },
  solved: {
    ko: '해결됨 😊',
    en: 'Solved 😊',
    ja: '解決 😊',
    zh: '已解决 😊',
  },
  okay: {
    ko: '보통 😐',
    en: 'Okay 😐',
    ja: '普通 😐',
    zh: '一般 😐',
  },
  notHelpful: {
    ko: '도움 안됨 😞',
    en: 'Not helpful 😞',
    ja: '役に立たなかった 😞',
    zh: '没有帮助 😞',
  },
  skip: {
    ko: '건너뛰기',
    en: 'Skip',
    ja: 'スキップ',
    zh: '跳过',
  },
};

export function getUIText(key: UITextKey, locale: Locale): string {
  return UI_TEXTS[key]?.[locale] || UI_TEXTS[key]?.['ko'] || '';
}

export function getLocalizedText(text: LocalizedText, locale: Locale): string {
  if (text?.[locale]) {
    return text[locale];
  }
  if (text?.ko) {
    return text.ko;
  }
  const fallback = Object.values(text || {}).find(value => value);
  return fallback || '';
}

export function getLocalizedSentences(
  sentences: LocalizedSentences | undefined,
  locale: Locale
): string[] | undefined {
  if (!sentences) {
    return undefined;
  }
  if (sentences[locale] && sentences[locale]?.length) {
    return sentences[locale];
  }
  if (sentences.ko && sentences.ko.length) {
    return sentences.ko;
  }
  return Object.values(sentences).find(list => list && list.length);
}
