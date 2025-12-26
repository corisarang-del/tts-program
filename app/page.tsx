'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { getUIText } from '@/lib/i18n';

export default function Home() {
  const { language } = useAppStore();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      emoji: '⚡',
      title: getUIText('homeFeatureMinimalClicks', language),
      description: '2~3번의 선택만으로 완성된 문장을 바로 얻어보세요',
      detail: '불필요한 단계는 모두 제거했습니다',
    },
    {
      id: 2,
      emoji: '🚀',
      title: getUIText('homeFeatureInstantResults', language),
      description: '선택하는 순간 결과가 나옵니다',
      detail: '고민할 시간은 줄이고 사용할 시간을 늘려보세요',
    },
    {
      id: 3,
      emoji: '🔊',
      title: getUIText('homeFeatureVoiceSupport', language),
      description: 'TTS로 들으며 활용할 수 있습니다',
      detail: '다양한 목소리와 발음 옵션을 제공합니다',
    },
  ];

  const steps = [
    {
      number: 1,
      emoji: '🌍',
      title: '상황 선택',
      description: '지금 처한 상황을 선택하세요',
    },
    {
      number: 2,
      emoji: '💭',
      title: '의도 선택',
      description: '어떤 의도로 말할지 선택하세요',
    },
    {
      number: 3,
      emoji: '📝',
      title: '문장 사용',
      description: '생성된 문장을 복사하거나 듣기',
    },
  ];

  return (
    <main className="bg-semie-cream min-h-screen">
      {/* Hero 섹션 */}
      <section className="pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden relative">
        {/* 배경 장식 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-semie-rose opacity-5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-semie-coral opacity-5 rounded-full -ml-40 blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="text-center space-y-8 animate-fadeInUp">
            {/* 작은 라벨 */}
            <div className="inline-block">
              <span className="inline-block bg-semie-rose/20 text-semie-coral px-4 py-2 rounded-full text-sm font-semibold">
                🎯 상황별 맞춤 문장
              </span>
            </div>

            {/* 메인 제목 */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-semie-dark leading-tight">
              {getUIText('homeMainTitle', language)}
              <br />
              <span className="bg-gradient-to-r from-semie-coral to-semie-rose bg-clip-text text-transparent">
                바로 쓸 수 있는 문장
              </span>
            </h1>

            {/* 부제 */}
            <p className="text-lg md:text-xl text-semie-dark/70 max-w-2xl mx-auto leading-relaxed">
              낯선 상황에서 말이 안 나올 때, 주저하지 말고 QuickTalk를 사용해보세요.
              <br className="hidden sm:block" />
              준비된 문장으로 자신감 있게 대화하세요.
            </p>

            {/* CTA 버튼 */}
            <div className="pt-4">
              <Link href="/situation">
                <button className="bg-semie-coral hover:bg-semie-coral/90 text-white font-bold px-10 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 shadow-lg">
                  {getUIText('homeStartButton', language)}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 가치 섹션 */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="max-w-6xl mx-auto px-4">
          {/* 섹션 헤더 */}
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block text-semie-coral font-bold text-sm tracking-widest">
              ✨ 특징
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-semie-dark">
              QuickTalk의 강점
            </h2>
            <p className="text-semie-dark/60 text-lg max-w-2xl mx-auto">
              최대한 간단하고, 빠르고, 자연스럽게 설계했습니다.
            </p>
          </div>

          {/* 특징 카드 그리드 */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="group relative"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                {/* 배경 */}
                <div className="absolute inset-0 bg-gradient-to-br from-semie-beige to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>

                {/* 카드 */}
                <div className="relative bg-semie-cream border-2 border-semie-rose/10 rounded-2xl p-8 transition-all duration-300 transform group-hover:-translate-y-2 group-hover:border-semie-rose/30 group-hover:shadow-xl">
                  {/* 아이콘 */}
                  <div className="text-6xl mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {feature.emoji}
                  </div>

                  {/* 타이틀 */}
                  <h3 className="text-2xl font-bold text-semie-dark mb-3">
                    {feature.title}
                  </h3>

                  {/* 설명 */}
                  <p className="text-semie-dark/70 mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* 추가 정보 */}
                  <div className={`overflow-hidden transition-all duration-300 ${hoveredFeature === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm text-semie-coral font-semibold">
                      💡 {feature.detail}
                    </p>
                  </div>

                  {/* 장식 선 */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-semie-coral/0 via-semie-coral to-semie-rose/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 사용 방법 섹션 */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-semie-beige to-semie-cream">
        <div className="max-w-6xl mx-auto px-4">
          {/* 섹션 헤더 */}
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block text-semie-coral font-bold text-sm tracking-widest">
              📱 3단계 사용법
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-semie-dark">
              너무 간단합니다
            </h2>
            <p className="text-semie-dark/60 text-lg max-w-2xl mx-auto">
              복잡한 절차는 없습니다. 3번의 클릭만으로 원하는 문장을 얻을 수 있습니다.
            </p>
          </div>

          {/* 스텝 */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-stretch">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* 연결선 */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-12 h-1 bg-gradient-to-r from-semie-coral to-transparent transform translate-x-1/2"></div>
                )}

                {/* 스텝 카드 */}
                <div className="bg-white rounded-2xl p-8 h-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {/* 번호 */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-semie-coral to-semie-rose text-white font-bold text-xl mb-6">
                    {step.number}
                  </div>

                  {/* 이모지*/}
                  <div className="text-5xl mb-4">
                    {step.emoji}
                  </div>

                  {/* 타이틀 */}
                  <h3 className="text-2xl font-bold text-semie-dark mb-3">
                    {step.title}
                  </h3>

                  {/* 설명 */}
                  <p className="text-semie-dark/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 신뢰성 섹션 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-semie-coral/10 to-semie-rose/10 rounded-3xl p-8 md:p-12 text-center space-y-6 border-2 border-semie-rose/20">
            <div className="text-4xl md:text-5xl">✅</div>
            <h3 className="text-3xl md:text-4xl font-bold text-semie-dark">
              이미 많은 사람들이 사용 중입니다
            </h3>
            <p className="text-semie-dark/70 text-lg max-w-2xl mx-auto">
              어색한 상황에서도 자신감 있게 말할 수 있도록 준비된 문장들을 제공합니다.
              지금 바로 시작해보세요!
            </p>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-24 md:py-32 bg-semie-cream relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 right-10 text-8xl">🍳</div>
          <div className="absolute bottom-10 left-10 text-8xl">💬</div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-semie-dark leading-tight">
            준비되셨나요?
          </h2>
          <p className="text-lg text-semie-dark/70">
            지금 바로 시작해서 자신감 있게 대화하세요.
          </p>

          <Link href="/situation">
            <button className="inline-block bg-semie-coral hover:bg-semie-coral/90 text-white font-bold px-12 py-5 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 shadow-lg">
              QuickTalk 시작하기 🚀
            </button>
          </Link>

          <p className="text-sm text-semie-dark/50 pt-4">
            가입이나 로그인이 필요 없습니다. 바로 시작하세요!
          </p>
        </div>
      </section>
    </main>
  );
}
