import { GET } from '@/app/api/situations/route';
import { NextRequest } from 'next/server';

describe('GET /api/situations', () => {
  it('should return list of situations', async () => {
    const request = new NextRequest('http://localhost:3000/api/situations');
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('situations');
    expect(Array.isArray(data.situations)).toBe(true);
    expect(data.situations.length).toBeGreaterThan(0);
    
    // 각 상황이 필요한 필드를 가지고 있는지 확인
    data.situations.forEach((situation: any) => {
      expect(situation).toHaveProperty('id');
      expect(situation).toHaveProperty('name');
      expect(situation).toHaveProperty('description');
      expect(situation).toHaveProperty('icon');
      expect(situation).toHaveProperty('displayOrder');
    });
  });

  it('should return situations ordered by displayOrder', async () => {
    const response = await GET();
    const data = await response.json();

    const displayOrders = data.situations.map((s: any) => s.displayOrder);
    const sortedOrders = [...displayOrders].sort((a, b) => a - b);
    
    expect(displayOrders).toEqual(sortedOrders);
  });
});



