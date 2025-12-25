'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { apiGet, apiPost } from '@/lib/api';
import { IntentsResponse, GenerateResponse } from '@/types/api';
import { Intent } from '@/types';
import { API_ENDPOINTS } from '@/lib/constants';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { getLocalizedSentences, getLocalizedText } from '@/lib/i18n';

export default function IntentPage() {
  const router = useRouter();
  const { situation, setIntent, setSentences, language } = useAppStore();
  const [intents, setIntents] = useState<Intent[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIntents = useCallback(async () => {
    if (!situation) return;
    
    try {
      setLoading(true);
      const response = await apiGet<IntentsResponse>(
        `${API_ENDPOINTS.INTENTS}?situationId=${situation.id}`
      );
      setIntents(response.intents);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch intents:', err);
      setError('의도 목록을 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  }, [situation]);

  useEffect(() => {
    if (!situation) {
      router.push('/situation');
      return;
    }
    fetchIntents();
  }, [situation, router, fetchIntents]);


  const handleIntentClick = async (intent: Intent) => {
    if (!situation) return;
    
    try {
      setIntent(intent);

      const storedSentences = getLocalizedSentences(intent.sentences, language);
      if (storedSentences && storedSentences.length > 0) {
        setSentences(storedSentences.slice(0, 3));
        router.push('/sentence');
        return;
      }

      setGenerating(true);
      
      // 문장 생성 API 호출
      const response = await apiPost<GenerateResponse>(API_ENDPOINTS.GENERATE, {
        situationId: situation.id,
        intentId: intent.id,
        language,
      });
      
      setSentences(response.sentences);
      router.push('/sentence');
    } catch (err) {
      console.error('Failed to generate sentences:', err);
      setError('문장 생성에 실패했습니다.');
    } finally {
      setGenerating(false);
    }
  };

  if (!situation) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header title={getLocalizedText(situation.name, language)} showBack backUrl="/situation" />

      <Section variant="subtle">
        <Container>
          <div className="mb-6 text-center">
            <p className="text-neutral-600 dark:text-neutral-400">어떤 의도인가요? <span className="font-semibold text-neutral-900 dark:text-neutral-100">{getLocalizedText(situation.name, language)}</span></p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader size="lg" />
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-error dark:text-red-400 mb-4">{error}</p>
              <Button onClick={fetchIntents} variant="primary">
                다시 시도
              </Button>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-4">
              {intents.map((intent) => (
                <Button
                  key={intent.id}
                  variant="primary"
                  size="lg"
                  className="w-full text-left justify-start"
                  onClick={() => handleIntentClick(intent)}
                  loading={generating}
                  disabled={generating}
                >
                  <div>
                    <div className="font-semibold">{getLocalizedText(intent.name, language)}</div>
                    <div className="text-sm opacity-90">{getLocalizedText(intent.description, language)}</div>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
