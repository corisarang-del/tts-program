'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* 헤더 */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">QuickTalk</h1>
          <p className="text-xl text-gray-600 mb-8">
            상황만 선택하면 바로 쓸 수 있는 문장
          </p>
        </header>

        {/* 핵심 가치 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            핵심 가치
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-2">최소 클릭</h3>
              <p className="text-gray-600">
                2~3번의 선택만으로 완성된 문장 제공
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-lg font-semibold mb-2">즉시 제공</h3>
              <p className="text-gray-600">
                선택 즉시 결과 제공, 고민 시간 제로
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">🔊</div>
              <h3 className="text-lg font-semibold mb-2">음성 지원</h3>
              <p className="text-gray-600">
                TTS로 다양한 사용 환경 지원
              </p>
            </div>
          </div>
        </section>

        {/* 사용 방법 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            사용 방법
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">상황 선택</h3>
                <p className="text-gray-600">현재 상황을 선택하세요</p>
              </div>
              <div className="hidden md:block text-gray-400 text-2xl">→</div>
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">의도 선택</h3>
                <p className="text-gray-600">원하는 의도를 선택하세요</p>
              </div>
              <div className="hidden md:block text-gray-400 text-2xl">→</div>
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">문장 사용</h3>
                <p className="text-gray-600">생성된 문장을 복사하거나 음성으로 듣기</p>
              </div>
            </div>
          </div>
        </section>

        {/* 시작하기 버튼 */}
        <div className="text-center">
          <Link href="/situation">
            <Button size="lg" variant="primary">
              시작하기
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
