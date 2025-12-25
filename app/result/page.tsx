'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { sendUsageLog } from '@/lib/logger';
import { getSessionId, detectDevice } from '@/lib/logger';
import { toast } from 'react-hot-toast';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';

export default function ResultPage() {
  const router = useRouter();
  const { situation, intent, sentences, ttsPlayed, resultRating, setResultRating } = useAppStore();
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
      toast.error('평가 저장에 실패했습니다');
      router.push('/analysis');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => {
    router.push('/analysis');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="도움이 되셨나요?" />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xl text-gray-600 mb-8">
              생성된 문장이 도움이 되었는지 평가해주세요
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
              해결됨 😊
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={() => handleRating(2)}
              loading={submitting}
              disabled={submitting}
            >
              보통 😐
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              className="w-full"
              onClick={() => handleRating(1)}
              loading={submitting}
              disabled={submitting}
            >
              도움 안됨 😞
            </Button>
          </div>

          <div className="text-center">
            <button
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700 underline"
              disabled={submitting}
            >
              건너뛰기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}



