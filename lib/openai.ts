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
- Provide at least 2 and up to 3 different variations
- Each sentence must be a complete, meaningful statement
- Return ONLY a JSON array of strings, nothing else
- Ensure all sentences are properly formatted and grammatically correct`;

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
Generate at least 2 realistic ${languageName} sentences (preferably 3) that someone would actually say in this exact situation to achieve this intent.

REQUIREMENTS:
- Each sentence must be complete and ready to use in a real conversation
- Use natural, conversational language (not stiff or overly formal)
- Make each variation distinct (different wording, tone, or approach)
- Sentences should fit the specific context and cultural norms of ${languageName}
- Keep each sentence concise and clear (1-2 lines maximum)
- Ensure each sentence is grammatically correct and makes sense
- Do not include incomplete sentences or fragments

OUTPUT FORMAT:
Return ONLY a JSON array with at least 2 strings (preferably 3): ["sentence1", "sentence2", "sentence3"]`;

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
            temperature: 0.8,
            maxOutputTokens: 1024,
            topP: 0.95,
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
          const validSentences = sentences
            .filter((s: unknown) => typeof s === 'string' && s.trim().length > 0)
            .map((s: string) => s.trim())
            .filter((s: string) => {
              // 최소 5자 이상이고, 불완전한 문장 제외
              if (s.length < 5) return false;
              // 불완전한 문장 패턴 제외 (예: "이거 사이즈" 같은 경우)
              if (s.match(/^["'\[\(]/) && !s.match(/[\.!?\)\]"']$/)) return false;
              // 너무 짧거나 의미없는 문장 제외
              if (s.split(/\s+/).length < 2 && s.length < 10) return false;
              return true;
            });
          
          if (validSentences.length >= 2) {
            return validSentences.slice(0, 3);
          }
        }
      }

      const sentences = JSON.parse(cleanedContent);
      if (Array.isArray(sentences) && sentences.length > 0) {
        const validSentences = sentences
          .filter((s: unknown) => typeof s === 'string' && s.trim().length > 0)
          .map((s: string) => s.trim())
          .filter((s: string) => {
            // 최소 5자 이상이고, 불완전한 문장 제외
            if (s.length < 5) return false;
            // 불완전한 문장 패턴 제외 (예: "이거 사이즈" 같은 경우)
            if (s.match(/^["'\[\(]/) && !s.match(/[\.!?\)\]"']$/)) return false;
            // 너무 짧거나 의미없는 문장 제외
            if (s.split(/\s+/).length < 2 && s.length < 10) return false;
            return true;
          });
        
        if (validSentences.length >= 2) {
          return validSentences.slice(0, 3);
        }
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
        .filter((line: string) => {
          // 최소 5자 이상
          if (line.length < 5) return false;
          // JSON 구분자만 있는 경우 제외
          if (line.match(/^[\[\]{}",:]+$/)) return false;
          // 불완전한 문장 패턴 제외
          if (line.match(/^["'\[\(]/) && !line.match(/[\.!?\)\]"']$/)) return false;
          // 너무 짧거나 의미없는 문장 제외
          if (line.split(/\s+/).length < 2 && line.length < 10) return false;
          return true;
        });

      if (lines.length >= 2) {
        return lines.slice(0, 3);
      }
    }

    // 최소 2개를 보장하지 못한 경우 에러
    throw new Error('Failed to generate at least 2 valid sentences from response');
  } catch (error) {
    console.error('[Gemini Error]', error);
    throw error;
  }
}
