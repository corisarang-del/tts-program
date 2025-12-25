'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { apiGet } from '@/lib/api';
import { SituationsResponse } from '@/types/api';
import { Situation } from '@/types';
import { API_ENDPOINTS } from '@/lib/constants';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Loader from '@/components/ui/Loader';
import { getLocalizedText } from '@/lib/i18n';

export default function SituationPage() {
  const router = useRouter();
  const { setSituation, language } = useAppStore();
  const [situations, setSituations] = useState<Situation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSituations();
  }, []);

  const fetchSituations = async () => {
    try {
      setLoading(true);
      const response = await apiGet<SituationsResponse>(API_ENDPOINTS.SITUATIONS);
      setSituations(response.situations);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch situations:', err);
      setError('상황 목록을 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSituationClick = (situation: Situation) => {
    setSituation(situation);
    router.push('/intent');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="어떤 상황인가요?" showBack backUrl="/" />
      
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader size="lg" />
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchSituations}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              다시 시도
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {situations.map((situation) => (
              <Card
                key={situation.id}
                hover
                onClick={() => handleSituationClick(situation)}
                className="cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{getIcon(situation.icon)}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {getLocalizedText(situation.name, language)}
                    </h3>
                    <p className="text-gray-600">
                      {getLocalizedText(situation.description, language)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function getIcon(iconName: string): string {
  const icons: Record<string, string> = {
    clock: '⏰',
    calendar: '📅',
    'help-circle': '❓',
    'file-text': '📄',
    map: '🗺️',
    restroom: '🚻',
    restaurant: '🍽️',
    accessibility: '♿',
    medical: '🏥',
    lost: '🧳',
    airport: '✈️',
    hotel: '🏨',
    hospital: '🏥',
    police: '🚓',
    transport: '🚌',
    shopping: '🛍️',
    tour: '🎟️',
  };
  return icons[iconName] || '📋';
}



