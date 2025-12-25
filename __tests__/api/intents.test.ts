import { GET } from '@/app/api/intents/route';
import { NextRequest } from 'next/server';

describe('GET /api/intents', () => {
  it('should return 400 when situationId is missing', async () => {
    const request = new NextRequest('http://localhost:3000/api/intents');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
    expect(data.error).toBe('Missing situationId');
  });

  it('should return intents for valid situationId', async () => {
    const request = new NextRequest(
      'http://localhost:3000/api/intents?situationId=situation_001'
    );
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('intents');
    expect(Array.isArray(data.intents)).toBe(true);
    
    // 각 의도가 필요한 필드를 가지고 있는지 확인
    data.intents.forEach((intent: any) => {
      expect(intent).toHaveProperty('id');
      expect(intent).toHaveProperty('situationId');
      expect(intent).toHaveProperty('name');
      expect(intent).toHaveProperty('description');
      expect(intent).toHaveProperty('displayOrder');
      expect(intent.situationId).toBe('situation_001');
    });
  });

  it('should return empty array for non-existent situationId', async () => {
    const request = new NextRequest(
      'http://localhost:3000/api/intents?situationId=non_existent'
    );
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('intents');
    expect(Array.isArray(data.intents)).toBe(true);
  });
});



