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
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { getLocalizedText, getUIText } from '@/lib/i18n';

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
      setError(language === 'ko' ? '상황 목록을 불러올 수 없습니다.' : language === 'en' ? 'Failed to load situations.' : language === 'ja' ? '状況を読み込めませんでした。' : '无法加载情况。');
    } finally {
      setLoading(false);
    }
  };

  const handleSituationClick = (situation: Situation) => {
    setSituation(situation);
    router.push('/intent');
  };

  return (
    <div className="min-h-screen">
      <Header title={getUIText('whichSituation', language)} showBack backUrl="/" />

      <Section variant="subtle">
        <Container>
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader size="lg" />
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-error dark:text-red-400 mb-4">{error}</p>
              <Button onClick={fetchSituations} variant="primary">
                {getUIText('retry', language)}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {situations.map((situation) => (
                <Card
                  key={situation.id}
                  hover
                  onClick={() => handleSituationClick(situation)}
                  className="cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">{getIcon(situation.icon)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                        {getLocalizedText(situation.name, language)}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        {getLocalizedText(situation.description, language)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </Section>
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



