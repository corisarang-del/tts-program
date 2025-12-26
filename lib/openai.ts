import { Situation, Intent, Locale } from '@/types';
import { requireEnv } from '@/lib/env';
import { AppError } from '@/lib/error-handler';
import { getLocalizedText } from '@/lib/i18n';

const GEMINI_MODEL = 'gemini-2.5-flash';

const SYSTEM_PROMPT = `You are an expert in natural, polite communication across cultures.
Your task is to generate realistic, practical sentences that people would actually use in real conversations.

IMPORTANT RULES:
- Generate ORIGINAL sentences, not template phrases or saved examples
- Each sentence must be complete, natural, and immediately usable
- Sentences should sound like real human conversation, not formal templates
- Keep sentences concise (1-2 lines maximum)
- Provide exactly 3 different variations
- Return ONLY a JSON array of strings, nothing else`;

const LANGUAGE_NAMES: Record<Locale, string> = {
  ko: 'Korean',
  en: 'English',
  ja: 'Japanese',
  zh: 'Simplified Chinese',
};

export async function generateSentences(
  situation: Situation,
  intent: Intent,
  locale: Locale
): Promise<string[]> {
  const situationName = getLocalizedText(situation.name, locale);
  const situationDescription = getLocalizedText(situation.description, locale);
  const intentName = getLocalizedText(intent.name, locale);
  const intentDescription = getLocalizedText(intent.description, locale);
  const languageName = LANGUAGE_NAMES[locale] || 'Korean';

  const userPrompt = `CONTEXT:
Situation: ${situationName}
Description: ${situationDescription}
Intent: ${intentName}
Goal: ${intentDescription}
Language: ${languageName}

TASK:
Generate 3 realistic ${languageName} sentences that someone would actually say in this exact situation to achieve this intent.

REQUIREMENTS:
- Each sentence must be complete and ready to use in a real conversation
- Use natural, conversational language (not stiff or overly formal)
- Make each variation distinct (different wording, tone, or approach)
- Sentences should fit the specific context and cultural norms of ${languageName}
- Keep each sentence concise and clear (1-2 lines maximum)

OUTPUT FORMAT:
Return ONLY a JSON array with exactly 3 strings: ["sentence1", "sentence2", "sentence3"]`;

  try {
    // 환경 변수 확인 및 에러 처리 개선
    let apiKey: string;
    try {
      apiKey = requireEnv('GOOGLE_GEMINI_API_KEY');
    } catch (envError) {
      console.error('[Gemini] Environment variable error:', envError);
      throw new AppError(
        500,
        'GEMINI_API_KEY_NOT_SET',
        'Google Gemini API 키가 설정되지 않았습니다. GOOGLE_GEMINI_API_KEY 환경 변수를 확인해주세요.'
      );
    }
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: userPrompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new AppError(
        response.status,
        'GEMINI_API_ERROR',
        `Google Gemini API request failed (${response.status}).`
      );
    }

    const data = await response.json();
    const content = (data?.candidates || [])
      .flatMap((candidate: { content?: { parts?: { text?: string }[] } }) =>
        candidate.content?.parts?.map(part => part.text || '') || []
      )
      .join('');

    if (!content) {
      throw new Error('No response from Gemini');
    }

    // JSON parsing
    try {
      let cleanedContent = content.trim();
      cleanedContent = cleanedContent.replace(/^```json\s*/i, '');
      cleanedContent = cleanedContent.replace(/^```\s*/i, '');
      cleanedContent = cleanedContent.replace(/\s*```$/i, '');
      cleanedContent = cleanedContent.trim();

      const jsonMatch = cleanedContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const sentences = JSON.parse(jsonMatch[0]);
        if (Array.isArray(sentences) && sentences.length > 0) {
          return sentences
            .slice(0, 3)
            .filter((s: unknown) => typeof s === 'string' && s.length > 0);
        }
      }

      const sentences = JSON.parse(cleanedContent);
      if (Array.isArray(sentences) && sentences.length > 0) {
        return sentences
          .slice(0, 3)
          .filter((s: unknown) => typeof s === 'string' && s.length > 0);
      }
    } catch {
      const lines = content
        .split('\n')
        .map((line: string) => {
          let cleaned = line.trim().replace(/^["']|["']$/g, '');
          cleaned = cleaned.replace(/^[-*?\s]*/, '');
          cleaned = cleaned.replace(/^\d+[.)]\s*/, '');
          return cleaned.trim();
        })
        .filter((line: string) => line.length > 0 && !line.match(/^[\[\]{}",:]+$/));

      if (lines.length > 0) {
        return lines.slice(0, 3);
      }
    }

    throw new Error('Failed to parse sentences from response');
  } catch (error) {
    console.error('[Gemini Error]', error);
    throw error;
  }
}
