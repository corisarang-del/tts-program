'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { LOCALES, LOCALE_LABELS } from '@/lib/i18n';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  backUrl?: string;
}

export default function Header({ title, showBack = false, backUrl }: HeaderProps) {
  const router = useRouter();
  const { language, setLanguage } = useAppStore();
  
  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl);
    } else {
      window.history.back();
    }
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-orange-100/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBack && (
            <button
              onClick={handleBack}
              className="text-brand-text hover:text-brand-primary transition-colors"
              aria-label="뒤로가기"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">Q</div>
            <span className="font-bold text-xl tracking-tight text-brand-text">QuickTalk</span>
          </Link>
          {title && !showBack && (
            <h1 className="text-xl font-bold text-brand-text ml-4">{title}</h1>
          )}
        </div>
        <select
          className="rounded-md border border-orange-200 bg-white/50 backdrop-blur px-3 py-1.5 text-sm text-brand-text font-medium hover:border-brand-primary transition-colors"
          value={language}
          onChange={(event) => setLanguage(event.target.value as typeof language)}
          aria-label="Language"
        >
          {LOCALES.map(locale => (
            <option key={locale} value={locale}>
              {LOCALE_LABELS[locale]}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}
