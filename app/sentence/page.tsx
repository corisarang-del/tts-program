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
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { getLocalizedSentences, getUIText } from '@/lib/i18n';

export default function SentencePage() {
  const router = useRouter();
  const { situation, intent, sentences, setSentences, setTtsPlayed, language } = useAppStore();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [regenerating, setRegenerating] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(3); // 현재까지 표시한 문장 수

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(language === 'ko' ? '복사되었습니다' : language === 'en' ? 'Copied' : language === 'ja' ? 'コピーされました' : '已复制');
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error(language === 'ko' ? '복사에 실패했습니다' : language === 'en' ? 'Failed to copy' : language === 'ja' ? 'コピーに失敗しました' : '复制失败');
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
        body: JSON.stringify({ text, language }),
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

      // 저장된 모든 문장 가져오기
      const storedSentences = getLocalizedSentences(intent.sentences, language);

      // 다음 3개를 표시할 수 있는지 확인
      if (storedSentences && displayedCount < storedSentences.length) {
        // 저장된 문장 중 다음 3개 표시
        const nextBatch = storedSentences.slice(displayedCount, displayedCount + 3);
        setSentences(nextBatch);
        setDisplayedCount(displayedCount + 3);

        const remaining = storedSentences.length - (displayedCount + 3);
        if (remaining > 0) {
          toast.success(`다음 문장을 표시했습니다. (${remaining}개 남음)`);
        } else {
          toast.success('모든 저장된 문장을 표시했습니다. 다음 클릭 시 새 문장을 생성합니다.');
        }
        return;
      }

      // 저장된 문장을 다 보여줬으면 API로 새로운 문장 생성
      console.log('[Regenerate] All stored sentences shown, generating new ones...');
      const response = await apiPost<{ sentences: string[]; generatedAt: string }>(
        API_ENDPOINTS.GENERATE,
        {
          situationId: situation.id,
          intentId: intent.id,
          language,
          forceGenerate: true, // 강제로 AI 생성
        }
      );

      // 새로운 배열을 생성하여 참조 변경 (React가 변경을 감지하도록)
      const newSentences = Array.isArray(response.sentences)
        ? [...response.sentences]
        : response.sentences;

      console.log('[Regenerate] New generated sentences:', newSentences);

      setSentences(newSentences);
      setDisplayedCount(3); // 카운트 리셋
      toast.success('새로운 문장이 생성되었습니다');
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

      toast.error(`문장 생성에 실패했습니다: ${errorMessage}`);
    } finally {
      setRegenerating(false);
    }
  };

  if (!sentences || sentences.length === 0) {
    return (
      <div className="min-h-screen">
        <Header title={getUIText('generatedSentences', language)} showBack backUrl="/intent" />
        <Section variant="subtle">
          <Container>
            <div className="text-center py-16">
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">{getUIText('noSentences', language)}</p>
              <Button onClick={() => router.push('/intent')} variant="primary">
                {getUIText('backToIntent', language)}
              </Button>
            </div>
          </Container>
        </Section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header title={getUIText('generatedSentences', language)} showBack backUrl="/intent" />

      <Section variant="subtle">
        <Container>
          <div className="space-y-6">
            {sentences.map((sentence, index) => (
              <Card key={index} className="relative">
                <p className="text-neutral-900 dark:text-neutral-100 mb-4 text-lg leading-relaxed">
                  {sentence}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleCopy(sentence)}
                  >
                    {getUIText('copy', language)}
                  </Button>
                  <Button
                    variant={playingIndex === index ? 'ghost' : 'primary'}
                    size="sm"
                    onClick={() => handleTTS(sentence, index)}
                  >
                    {playingIndex === index ? getUIText('pause', language) : getUIText('play', language)}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <Button
              variant="ghost"
              onClick={handleRegenerate}
              loading={regenerating}
            >
              {getUIText('regenerate', language)}
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => router.push('/result')}
            >
              {getUIText('next', language)}
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}



