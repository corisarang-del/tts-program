'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

export default function AnalysisPage() {
  const { resetStore } = useAppStore();

  const handleReset = () => {
    resetStore();
  };

  return (
    <div className="min-h-screen">
      <Header title="사용 완료" />

      <Section variant="subtle">
        <Container>
          <div className="text-center">
            <div className="mb-12">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                사용이 완료되었습니다
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                생성된 문장이 도움이 되었기를 바랍니다.
              </p>
            </div>

            <div className="space-y-4">
              <Link href="/situation" onClick={handleReset}>
                <Button variant="primary" size="lg" className="w-full">
                  다른 상황 선택
                </Button>
              </Link>

              <Link href="/" onClick={handleReset}>
                <Button variant="ghost" size="lg" className="w-full">
                  처음으로
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}



