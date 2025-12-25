'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';

export default function AnalysisPage() {
  const { resetStore } = useAppStore();

  const handleReset = () => {
    resetStore();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="사용 완료" />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-12">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              사용이 완료되었습니다
            </h2>
            <p className="text-gray-600">
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
      </main>
    </div>
  );
}



