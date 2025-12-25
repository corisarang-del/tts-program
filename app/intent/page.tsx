'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { apiGet, apiPost } from '@/lib/api';
import { IntentsResponse, GenerateResponse } from '@/types/api';
import { Intent } from '@/types';
import { API_ENDPOINTS } from '@/lib/constants';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';

export default function IntentPage() {
  const router = useRouter();
  const { situation, setIntent, setSentences } = useAppStore();
  const [intents, setIntents] = useState<Intent[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!situation) {
      router.push('/situation');
      return;
    }
    fetchIntents();
  }, [situation, router]);

  const fetchIntents = async () => {
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
  };

  const handleIntentClick = async (intent: Intent) => {
    if (!situation) return;
    
    try {
      setGenerating(true);
      setIntent(intent);
      
      // 문장 생성 API 호출
      const response = await apiPost<GenerateResponse>(API_ENDPOINTS.GENERATE, {
        situationId: situation.id,
        intentId: intent.id,
      });
      
      setSentences(response.sentences);
      router.push('/sentence');
    } catch (err) {
      console.error('Failed to generate sentences:', err);
      setError('문장 생성 중 오류가 발생했습니다.');
    } finally {
      setGenerating(false);
    }
  };

  if (!situation) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="어떻게 전달하고 싶으신가요?" showBack backUrl="/situation" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-gray-600">선택한 상황: <span className="font-semibold text-gray-900">{situation.name}</span></p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader size="lg" />
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchIntents}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              다시 시도
            </button>
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
                  <div className="font-semibold">{intent.name}</div>
                  <div className="text-sm opacity-90">{intent.description}</div>
                </div>
              </Button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}



