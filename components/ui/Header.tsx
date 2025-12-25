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
    <header className="w-full border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBack && (
            <button
              onClick={handleBack}
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              aria-label="뒤로가기"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {title && (
            <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{title}</h1>
          )}
        </div>
        <Link href="/" className="text-primary-600 dark:text-primary-400 font-bold text-lg">
          QuickTalk
        </Link>
        <select
          className="ml-4 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2 py-1 text-sm text-neutral-700 dark:text-neutral-300"
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
    </header>
  );
}
