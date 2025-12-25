'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { apiPost } from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import { toast } from 'react-hot-toast';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { getLocalizedSentences } from '@/lib/i18n';

export default function SentencePage() {
  const router = useRouter();
  const { situation, intent, sentences, setSentences, setTtsPlayed, language } = useAppStore();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
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
    let url: string | null = null;

    try {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }

      if (playingIndex === index) {
        setPlayingIndex(null);
        setAudio(null);
        return;
      }

      setPlayingIndex(index);

      const response = await fetch(API_ENDPOINTS.TTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `TTS 요청 실패 (${response.status})`;
        console.error('TTS API Error:', response.status, errorMessage);
        throw new Error(errorMessage);
      }

      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
      url = URL.createObjectURL(blob);
      setAudioUrl(url);

      const newAudio = new Audio(url);
      newAudio.onended = () => {
        if (url) {
          URL.revokeObjectURL(url);
        }
        setAudioUrl(null);
        setPlayingIndex(null);
        setAudio(null);
      };
      newAudio.onerror = (e) => {
        console.error('Audio playback error:', e);
        if (url) {
          URL.revokeObjectURL(url);
        }
        setAudioUrl(null);
        setPlayingIndex(null);
        setAudio(null);
        toast.error('오디오 재생 중 오류가 발생했습니다');
      };

      try {
        await newAudio.play();
      } catch (playError) {
        console.error('Audio play error:', playError);
        // 브라우저 자동 재생 정책으로 인한 오류 처리
        if (playError instanceof Error && playError.name === 'NotAllowedError') {
          toast.error('브라우저에서 자동 재생이 차단되었습니다. 재생 버튼을 다시 클릭해주세요.');
        } else {
          throw playError;
        }
      }
      setAudio(newAudio);
      setTtsPlayed(true);
    } catch (err) {
      if (url) {
        URL.revokeObjectURL(url);
      }
      setAudioUrl(null);
      console.error('Failed to play TTS:', err);
      
      let errorMessage = '음성 재생에 실패했습니다';
      if (err instanceof Error) {
        if (err.message.includes('TTS 요청 실패')) {
          errorMessage = '음성 생성에 실패했습니다. 서버 설정을 확인해주세요.';
        } else if (err.message.includes('Google Cloud')) {
          errorMessage = 'Google Cloud TTS 설정이 필요합니다.';
        } else {
          errorMessage = err.message || errorMessage;
        }
      }
      
      toast.error(errorMessage);
      setPlayingIndex(null);
    }
  };

  const handleRegenerate = async () => {
    if (!situation || !intent) return;
    
    try {
      setRegenerating(true);
      
      // 재생 중인 오디오 정리
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }
      setPlayingIndex(null);
      setAudio(null);
      
      // 상태를 먼저 초기화하여 리렌더링 강제
      setSentences([]);
      
      // 항상 API를 호출하여 새로 생성 (저장된 문장이 있어도 강제로 재생성)
      const response = await apiPost<{ sentences: string[]; generatedAt: string }>(
        API_ENDPOINTS.GENERATE,
        {
          situationId: situation.id,
          intentId: intent.id,
          language,
          forceGenerate: true, // 저장된 문장 무시하고 강제로 AI 생성
        }
      );
      
      // 새로운 배열을 생성하여 참조 변경 (React가 변경을 감지하도록)
      const newSentences = Array.isArray(response.sentences) 
        ? [...response.sentences] 
        : response.sentences;
      
      console.log('[Regenerate] New sentences:', newSentences);
      console.log('[Regenerate] Previous sentences:', sentences);
      
      setSentences(newSentences);
      toast.success('문장이 다시 생성되었습니다');
    } catch (err: any) {
      console.error('Failed to regenerate:', err);
      
      // 에러 상세 정보 확인
      let errorMessage = '문장 생성에 실패했습니다';
      if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err?.message) {
        errorMessage = err.message;
      }
      
      console.error('[Regenerate Error Details]', {
        error: err,
        response: err?.response,
        message: errorMessage,
      });
      
      // 에러가 발생하면 저장된 문장이 있으면 그것을 사용
      const storedSentences = getLocalizedSentences(intent.sentences, language);
      if (storedSentences && storedSentences.length > 0) {
        const newStoredSentences = [...storedSentences.slice(0, 3)];
        setSentences(newStoredSentences);
        toast.error(`새로운 문장 생성에 실패했습니다: ${errorMessage}. 저장된 문장을 표시합니다.`);
      } else {
        toast.error(`문장 생성에 실패했습니다: ${errorMessage}`);
      }
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



