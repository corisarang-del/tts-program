'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { getUIText } from '@/lib/i18n';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

export default function AnalysisPage() {
  const { resetStore, language } = useAppStore();

  const handleReset = () => {
    resetStore();
  };

  return (
    <div className="min-h-screen">
      <Header title={getUIText('usageComplete', language)} />

      <Section variant="subtle">
        <Container>
          <div className="text-center">
            <div className="mb-12">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                {getUIText('usageCompleted', language)}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                생성된 문장이 도움이 되었기를 바랍니다.
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                {getUIText('reuseMessage', language)}
              </p>
            </div>

            <div className="space-y-4">
              <Link href="/situation" onClick={handleReset}>
                <Button variant="primary" size="lg" className="w-full">
                  {getUIText('tryAnotherSituation', language)}
                </Button>
              </Link>

              <Link href="/" onClick={handleReset}>
                <Button variant="ghost" size="lg" className="w-full">
                  {getUIText('goToHome', language)}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}



