'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { apiPost } from '@/lib/api';
import { TTSResponse } from '@/types/api';
import { API_ENDPOINTS } from '@/lib/constants';
import { toast } from 'react-hot-toast';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function SentencePage() {
  const router = useRouter();
  const { situation, intent, sentences, setSentences, setTtsPlayed } = useAppStore();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [regenerating, setRegenerating] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('복사되었습니다');
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('복사에 실패했습니다');
    }
  };

  const handleTTS = async (text: string, index: number) => {
    try {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      if (playingIndex === index) {
        setPlayingIndex(null);
        setAudio(null);
        return;
      }

      setPlayingIndex(index);
      
      const response = await apiPost<TTSResponse>(API_ENDPOINTS.TTS, { text });
      
      const newAudio = new Audio(response.audioUrl);
      newAudio.onended = () => {
        setPlayingIndex(null);
        setAudio(null);
      };
      
      await newAudio.play();
      setAudio(newAudio);
      setTtsPlayed(true);
    } catch (err) {
      console.error('Failed to play TTS:', err);
      toast.error('음성 재생에 실패했습니다');
      setPlayingIndex(null);
    }
  };

  const handleRegenerate = async () => {
    if (!situation || !intent) return;
    
    try {
      setRegenerating(true);
      const response = await apiPost<{ sentences: string[]; generatedAt: string }>(
        API_ENDPOINTS.GENERATE,
        {
          situationId: situation.id,
          intentId: intent.id,
        }
      );
      
      setSentences(response.sentences);
      toast.success('문장이 다시 생성되었습니다');
    } catch (err) {
      console.error('Failed to regenerate:', err);
      toast.error('문장 생성에 실패했습니다');
    } finally {
      setRegenerating(false);
    }
  };

  if (!sentences || sentences.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="생성된 문장" showBack backUrl="/intent" />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <p className="text-gray-600 mb-4">생성된 문장이 없습니다.</p>
            <Button onClick={() => router.push('/intent')} variant="primary">
              의도 선택으로 돌아가기
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="생성된 문장" showBack backUrl="/intent" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {sentences.map((sentence, index) => (
            <Card key={index} className="relative">
              <p className="text-gray-900 mb-4 text-lg leading-relaxed">
                {sentence}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCopy(sentence)}
                >
                  복사
                </Button>
                <Button
                  variant={playingIndex === index ? 'ghost' : 'primary'}
                  size="sm"
                  onClick={() => handleTTS(sentence, index)}
                >
                  {playingIndex === index ? '일시정지' : '🔊 듣기'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-8 flex gap-4">
          <Button
            variant="ghost"
            onClick={handleRegenerate}
            loading={regenerating}
          >
            다시 생성
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => router.push('/result')}
          >
            다음
          </Button>
        </div>
      </main>
    </div>
  );
}



