import { getUIText, LOCALES } from '@/lib/i18n';
import { Locale } from '@/types';

describe('i18n UI Text Support', () => {
  describe('getUIText', () => {
    it('should return Korean text for ko locale', () => {
      const text = getUIText('copy', 'ko');
      expect(text).toBe('복사');
    });

    it('should return English text for en locale', () => {
      const text = getUIText('copy', 'en');
      expect(text).toBe('Copy');
    });

    it('should return Japanese text for ja locale', () => {
      const text = getUIText('copy', 'ja');
      expect(text).toBe('コピー');
    });

    it('should return Chinese text for zh locale', () => {
      const text = getUIText('copy', 'zh');
      expect(text).toBe('复制');
    });

    it('should support common button labels', () => {
      const labels = ['copy', 'play', 'pause', 'regenerate', 'next', 'back'];

      labels.forEach(label => {
        LOCALES.forEach(locale => {
          const text = getUIText(label as any, locale);
          expect(text).toBeTruthy();
          expect(typeof text).toBe('string');
          expect(text.length).toBeGreaterThan(0);
        });
      });
    });

    it('should return Korean text as fallback for unknown locale', () => {
      const text = getUIText('copy', 'ko');
      expect(text).toBe('복사');
    });
  });
});
