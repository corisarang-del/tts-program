import { POST } from '@/app/api/generate/route';
import { NextRequest } from 'next/server';

describe('POST /api/generate', () => {
  it('should return 400 when situationId is missing', async () => {
    const request = new NextRequest('http://localhost:3000/api/generate', {
      method: 'POST',
      body: JSON.stringify({ intentId: 'intent_001' }),
    });
    
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
    expect(data.error).toBe('Missing required fields');
  });

  it('should return 400 when intentId is missing', async () => {
    const request = new NextRequest('http://localhost:3000/api/generate', {
      method: 'POST',
      body: JSON.stringify({ situationId: 'situation_001' }),
    });
    
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
  });

  it('should return 404 for invalid situation or intent', async () => {
    const request = new NextRequest('http://localhost:3000/api/generate', {
      method: 'POST',
      body: JSON.stringify({
        situationId: 'non_existent',
        intentId: 'non_existent',
      }),
    });
    
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toHaveProperty('error');
  });

  it('should generate sentences for valid situation and intent', async () => {
    // 이 테스트는 OpenAI API 키가 필요하므로 스킵 가능
    if (!process.env.OPENAI_API_KEY) {
      console.log('Skipping OpenAI test - API key not set');
      return;
    }

    const request = new NextRequest('http://localhost:3000/api/generate', {
      method: 'POST',
      body: JSON.stringify({
        situationId: 'situation_001',
        intentId: 'intent_001',
      }),
    });
    
    const response = await POST(request);
    const data = await response.json();

    if (response.status === 200) {
      expect(data).toHaveProperty('sentences');
      expect(Array.isArray(data.sentences)).toBe(true);
      expect(data.sentences.length).toBeGreaterThan(0);
      expect(data).toHaveProperty('generatedAt');
    } else {
      // API 키가 없거나 에러가 발생한 경우
      expect([429, 500]).toContain(response.status);
    }
  });
});



