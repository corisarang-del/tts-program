import { LocalizedSentences, LocalizedText, Locale } from '@/types';

export const LOCALES: Locale[] = ['ko', 'en', 'ja', 'zh'];

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '中文',
};

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
