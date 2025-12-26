/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import IntentPage from '@/app/intent/page';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { apiGet } from '@/lib/api';

jest.mock('next/navigation');
jest.mock('@/lib/store');
jest.mock('@/lib/api');

describe('IntentPage - Multilingual UI Support', () => {
  const mockIntents = [
    {
      id: 'intent_001',
      situationId: 'situation_001',
      name: { ko: '인사', en: 'Greeting', ja: '挨拶', zh: '问候' },
      description: { ko: '인사하기', en: 'Say hello', ja: 'あいさつする', zh: '打招呼' },
      sentences: {},
    },
    {
      id: 'intent_002',
      situationId: 'situation_001',
      name: { ko: '감사', en: 'Thanks', ja: '感謝', zh: '感谢' },
      description: { ko: '감사 표현', en: 'Express thanks', ja: 'ありがとう', zh: '表示感谢' },
      sentences: {},
    },
  ];

  const mockSituation = {
    id: 'situation_001',
    name: { ko: '직장', en: 'Workplace', ja: '職場', zh: '工作场所' },
    description: { ko: '직장 상황', en: 'Work situations', ja: '職場の状況', zh: '工作情况' },
    icon: '💼',
    displayOrder: 1,
    intents: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (apiGet as jest.Mock).mockResolvedValue({ intents: mockIntents });
  });

  describe('Korean UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        situation: mockSituation,
        setIntent: jest.fn(),
        setSentences: jest.fn(),
        language: 'ko',
      });
    });

    it('should display Korean question text', async () => {
      render(<IntentPage />);
      await waitFor(() => {
        expect(screen.getByText(/어떤 의도인가요/)).toBeInTheDocument();
      });
    });

    it('should display Korean retry button text', async () => {
      (apiGet as jest.Mock).mockRejectedValue(new Error('API error'));
      render(<IntentPage />);
      await waitFor(() => {
        expect(screen.getByText('다시 시도')).toBeInTheDocument();
      });
    });
  });

  describe('English UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        situation: mockSituation,
        setIntent: jest.fn(),
        setSentences: jest.fn(),
        language: 'en',
      });
    });

    it('should display English question text', async () => {
      render(<IntentPage />);
      await waitFor(() => {
        expect(screen.getByText(/What is your intention/)).toBeInTheDocument();
      });
    });

    it('should display English retry button text', async () => {
      (apiGet as jest.Mock).mockRejectedValue(new Error('API error'));
      render(<IntentPage />);
      await waitFor(() => {
        expect(screen.getByText('Retry')).toBeInTheDocument();
      });
    });
  });

  describe('Japanese UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        situation: mockSituation,
        setIntent: jest.fn(),
        setSentences: jest.fn(),
        language: 'ja',
      });
    });

    it('should display Japanese question text', async () => {
      render(<IntentPage />);
      await waitFor(() => {
        expect(screen.getByText(/どの意図ですか/)).toBeInTheDocument();
      });
    });

    it('should display Japanese retry button text', async () => {
      (apiGet as jest.Mock).mockRejectedValue(new Error('API error'));
      render(<IntentPage />);
      await waitFor(() => {
        expect(screen.getByText('再試行')).toBeInTheDocument();
      });
    });
  });

  describe('Chinese UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        situation: mockSituation,
        setIntent: jest.fn(),
        setSentences: jest.fn(),
        language: 'zh',
      });
    });

    it('should display Chinese question text', async () => {
      render(<IntentPage />);
      await waitFor(() => {
        expect(screen.getByText(/你的意图是什么/)).toBeInTheDocument();
      });
    });

    it('should display Chinese retry button text', async () => {
      (apiGet as jest.Mock).mockRejectedValue(new Error('API error'));
      render(<IntentPage />);
      await waitFor(() => {
        expect(screen.getByText('重试')).toBeInTheDocument();
      });
    });
  });
});
