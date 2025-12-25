import { getSituations, getIntents, saveUsageLog } from '@/lib/db';
import { UsageLog } from '@/types';

describe('Database functions', () => {
  describe('getSituations', () => {
    it('should return array of situations', async () => {
      const situations = await getSituations();
      
      expect(Array.isArray(situations)).toBe(true);
      expect(situations.length).toBeGreaterThan(0);
      
      situations.forEach(situation => {
        expect(situation).toHaveProperty('id');
        expect(situation).toHaveProperty('name');
        expect(situation).toHaveProperty('description');
        expect(situation).toHaveProperty('icon');
        expect(situation).toHaveProperty('displayOrder');
      });
    });

    it('should return situations ordered by displayOrder', async () => {
      const situations = await getSituations();
      const displayOrders = situations.map(s => s.displayOrder);
      const sortedOrders = [...displayOrders].sort((a, b) => a - b);
      
      expect(displayOrders).toEqual(sortedOrders);
    });
  });

  describe('getIntents', () => {
    it('should return intents for valid situationId', async () => {
      const intents = await getIntents('situation_001');
      
      expect(Array.isArray(intents)).toBe(true);
      
      intents.forEach(intent => {
        expect(intent).toHaveProperty('id');
        expect(intent).toHaveProperty('situationId');
        expect(intent).toHaveProperty('name');
        expect(intent.situationId).toBe('situation_001');
      });
    });

    it('should return empty array for non-existent situationId', async () => {
      const intents = await getIntents('non_existent');
      
      expect(Array.isArray(intents)).toBe(true);
      expect(intents.length).toBe(0);
    });
  });

  describe('saveUsageLog', () => {
    it('should save log and return logId', async () => {
      const log: UsageLog = {
        sessionId: 'test_session_' + Date.now(),
        situationId: 'situation_001',
        intentId: 'intent_001',
        sentences: ['테스트 문장'],
        ttsPlayed: false,
        resultRating: 3,
        timestamp: new Date().toISOString(),
        userAgent: 'test-agent',
        device: 'desktop',
      };

      const logId = await saveUsageLog(log);
      
      expect(typeof logId).toBe('string');
      expect(logId.length).toBeGreaterThan(0);
    });

    it('should handle optional fields', async () => {
      const log: UsageLog = {
        sessionId: 'test_session_' + Date.now(),
        situationId: 'situation_001',
        intentId: 'intent_001',
        sentences: ['테스트 문장'],
        selectedSentenceIndex: 0,
        ttsPlayed: true,
        resultRating: null,
        timestamp: new Date().toISOString(),
        userAgent: 'test-agent',
        device: 'mobile',
      };

      const logId = await saveUsageLog(log);
      
      expect(typeof logId).toBe('string');
    });
  });
});



