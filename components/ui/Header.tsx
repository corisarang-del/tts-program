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
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBack && (
            <button
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="뒤로가기"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {title && (
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          )}
        </div>
        <Link href="/" className="text-primary font-bold text-lg">
          QuickTalk
        </Link>
        <select
          className="ml-4 rounded-md border border-gray-200 bg-white px-2 py-1 text-sm text-gray-700"
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
