import OpenAI from 'openai';
import { Situation, Intent } from '@/types';
import { requireEnv } from '@/lib/env';

const apiKey = requireEnv('OPENAI_API_KEY');

const openai = new OpenAI({
  apiKey,
});

// 시스템 프롬프트
const SYSTEM_PROMPT = `당신은 한국 직장 문화에 정통한 커뮤니케이션 전문가입니다. 
사용자가 제시한 상황과 의도에 맞는 자연스럽고 예의 바른 문장을 생성해주세요.

규칙:
1. 각 문장은 실제 메신저나 이메일에서 바로 사용할 수 있어야 합니다.
2. 존댓말을 사용하되, 과하지 않게 자연스러워야 합니다.
3. 문장은 2-3줄 이내로 간결하게 작성합니다.
4. 3개의 다양한 옵션을 제공합니다.`;

// 문장 생성 함수
export async function generateSentences(
  situation: Situation,
  intent: Intent
): Promise<string[]> {
  const userPrompt = `
상황: ${situation.name} (${situation.description})
의도: ${intent.name} (${intent.description})

위 상황에서 ${intent.name}를 표현하는 문장 3개를 생성해주세요.
JSON 배열 형식으로만 응답해주세요: ["문장1", "문장2", "문장3"]
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // JSON 파싱 시도
    try {
      // 마크다운 코드 블록 제거
      let cleanedContent = content.trim();
      cleanedContent = cleanedContent.replace(/^```json\s*/i, '');
      cleanedContent = cleanedContent.replace(/^```\s*/i, '');
      cleanedContent = cleanedContent.replace(/\s*```$/i, '');
      cleanedContent = cleanedContent.trim();
      
      // JSON 배열 추출 시도
      const jsonMatch = cleanedContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const sentences = JSON.parse(jsonMatch[0]);
        if (Array.isArray(sentences) && sentences.length > 0) {
          return sentences.slice(0, 3).filter((s: any) => typeof s === 'string' && s.length > 0);
        }
      }
      
      // 직접 파싱 시도
      const sentences = JSON.parse(cleanedContent);
      if (Array.isArray(sentences) && sentences.length > 0) {
        return sentences.slice(0, 3).filter((s: any) => typeof s === 'string' && s.length > 0);
      }
    } catch {
      // JSON 파싱 실패 시 줄바꿈으로 분리 시도
      const lines = content
        .split('\n')
        .map(line => {
          // 따옴표 제거
          let cleaned = line.trim().replace(/^["']|["']$/g, '');
          // 번호나 불릿 제거
          cleaned = cleaned.replace(/^[-*•]\s*/, '');
          cleaned = cleaned.replace(/^\d+[.)]\s*/, '');
          return cleaned.trim();
        })
        .filter(line => line.length > 0 && !line.match(/^[\[\]{}",:]+$/));
      
      if (lines.length > 0) {
        return lines.slice(0, 3);
      }
    }

    throw new Error('Failed to parse sentences from response');
  } catch (error) {
    console.error('[OpenAI Error]', error);
    throw error;
  }
}

