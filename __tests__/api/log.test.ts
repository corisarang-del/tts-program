import { POST } from '@/app/api/log/route';
import { NextRequest } from 'next/server';

describe('POST /api/log', () => {
  it('should return 400 when required fields are missing', async () => {
    const request = new NextRequest('http://localhost:3000/api/log', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
    expect(data.error).toBe('Missing required fields');
  });

  it('should save log successfully with all required fields', async () => {
    const logData = {
      sessionId: 'test_session_123',
      situationId: 'situation_001',
      intentId: 'intent_001',
      sentences: ['테스트 문장 1', '테스트 문장 2'],
      ttsPlayed: false,
      resultRating: 3,
      timestamp: new Date().toISOString(),
      userAgent: 'test-agent',
      device: 'desktop' as const,
    };

    const request = new NextRequest('http://localhost:3000/api/log', {
      method: 'POST',
      body: JSON.stringify(logData),
    });
    
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('success');
    expect(data.success).toBe(true);
    expect(data).toHaveProperty('logId');
  });

  it('should handle optional fields correctly', async () => {
    const logData = {
      sessionId: 'test_session_456',
      situationId: 'situation_001',
      intentId: 'intent_001',
      sentences: ['테스트 문장'],
      selectedSentenceIndex: 0,
      ttsPlayed: true,
      resultRating: null,
      timestamp: new Date().toISOString(),
      userAgent: 'test-agent',
      device: 'mobile' as const,
    };

    const request = new NextRequest('http://localhost:3000/api/log', {
      method: 'POST',
      body: JSON.stringify(logData),
    });
    
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});



