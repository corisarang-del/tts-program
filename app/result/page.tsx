'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { sendUsageLog } from '@/lib/logger';
import { getSessionId, detectDevice } from '@/lib/logger';
import { toast } from 'react-hot-toast';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { getUIText } from '@/lib/i18n';

export default function ResultPage() {
  const router = useRouter();
  const { situation, intent, sentences, ttsPlayed, resultRating, setResultRating, language } = useAppStore();
  const [submitting, setSubmitting] = useState(false);

  const handleRating = async (rating: number) => {
    setResultRating(rating);
    
    if (!situation || !intent || !sentences || sentences.length === 0) {
      router.push('/analysis');
      return;
    }

    try {
      setSubmitting(true);
      
      const log = {
        sessionId: getSessionId(),
        situationId: situation.id,
        intentId: intent.id,
        sentences,
        selectedSentenceIndex: 0,
        ttsPlayed,
        resultRating: rating,
        timestamp: new Date().toISOString(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
        device: detectDevice(),
      };

      await sendUsageLog(log);
      router.push('/analysis');
    } catch (err) {
      console.error('Failed to save log:', err);
      toast.error(language === 'ko' ? '평가 저장에 실패했습니다' : language === 'en' ? 'Failed to save rating' : language === 'ja' ? '評価の保存に失敗しました' : '保存评分失败');
      router.push('/analysis');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => {
    router.push('/analysis');
  };

  return (
    <div className="min-h-screen">
      <Header title={getUIText('wasItHelpful', language)} />

      <Section variant="subtle">
        <Container>
          <div className="text-center mb-12">
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
              {getUIText('rateHelpfulness', language)}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 italic">
              {getUIText('feedbackMessage', language)}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => handleRating(3)}
              loading={submitting}
              disabled={submitting}
            >
              {getUIText('solved', language)}
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={() => handleRating(2)}
              loading={submitting}
              disabled={submitting}
            >
              {getUIText('okay', language)}
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="w-full"
              onClick={() => handleRating(1)}
              loading={submitting}
              disabled={submitting}
            >
              {getUIText('notHelpful', language)}
            </Button>
          </div>

          <div className="text-center">
            <button
              onClick={handleSkip}
              className="text-neutral-500 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 underline"
              disabled={submitting}
            >
              {getUIText('skip', language)}
            </button>
          </div>
        </Container>
      </Section>
    </div>
  );
}



