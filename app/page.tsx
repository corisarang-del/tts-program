'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero 섹션 */}
      <Section variant="light">
        <Container>
          <div className="text-center py-12">
            <h1 className="text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              QuickTalk
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
              상황만 선택하면 바로 쓸 수 있는 문장
            </p>
          </div>
        </Container>
      </Section>

      {/* 핵심 가치 섹션 */}
      <Section variant="subtle">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900 dark:text-neutral-100">
            핵심 가치
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                최소 클릭
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                2~3번의 선택만으로 완성된 문장 제공
              </p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                즉시 제공
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                선택 즉시 결과 제공, 고민 시간 제로
              </p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
              <div className="text-4xl mb-4">🔊</div>
              <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                음성 지원
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                TTS로 다양한 사용 환경 지원
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 사용 방법 섹션 */}
      <Section variant="light">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900 dark:text-neutral-100">
            사용 방법
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-primary-600 dark:bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                상황 선택
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                현재 상황을 선택하세요
              </p>
            </div>
            <div className="hidden md:block text-neutral-300 dark:text-neutral-700 text-2xl">
              →
            </div>
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-primary-600 dark:bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                의도 선택
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                원하는 의도를 선택하세요
              </p>
            </div>
            <div className="hidden md:block text-neutral-300 dark:text-neutral-700 text-2xl">
              →
            </div>
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-primary-600 dark:bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                문장 사용
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                생성된 문장을 복사하거나 음성으로 듣기
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA 섹션 */}
      <Section variant="subtle">
        <Container>
          <div className="text-center py-8">
            <Link href="/situation">
              <Button size="lg" variant="primary">
                시작하기
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
