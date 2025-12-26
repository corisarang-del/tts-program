/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SituationPage from '@/app/situation/page';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { apiGet } from '@/lib/api';

jest.mock('next/navigation');
jest.mock('@/lib/store');
jest.mock('@/lib/api');
jest.mock('@/components/ui/Header', () => {
  return function MockHeader() {
    return <div data-testid="mock-header">Header</div>;
  };
});

describe('SituationPage - Multilingual UI Support', () => {
  const mockSituations = [
    {
      id: 'situation_001',
      name: { ko: '직장', en: 'Workplace', ja: '職場', zh: '工作场所' },
      description: { ko: '직장에서의 상황', en: 'Work situations', ja: '職場の状況', zh: '工作情况' },
      icon: 'work',
      displayOrder: 1,
      intents: [],
    },
    {
      id: 'situation_002',
      name: { ko: '여행', en: 'Travel', ja: '旅行', zh: '旅行' },
      description: { ko: '여행 중의 상황', en: 'Travel situations', ja: '旅行の状況', zh: '旅行情况' },
      icon: 'travel',
      displayOrder: 2,
      intents: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (useAppStore as jest.Mock).mockReturnValue({
      setSituation: jest.fn(),
      language: 'ko',
    });
    (apiGet as jest.Mock).mockResolvedValue({ situations: mockSituations });
  });

  describe('Korean UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        setSituation: jest.fn(),
        language: 'ko',
      });
    });

    it('should render situation page with korean language', async () => {
      render(<SituationPage />);
      await waitFor(() => {
        // 상황 카드가 렌더링되는지 확인
        expect(screen.getByText('직장')).toBeInTheDocument();
      });
    });

    it('should display Korean retry button on error', async () => {
      (apiGet as jest.Mock).mockRejectedValue(new Error('API error'));
      render(<SituationPage />);
      await waitFor(() => {
        expect(screen.getByText('다시 시도')).toBeInTheDocument();
      });
    });
  });

  describe('English UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        setSituation: jest.fn(),
        language: 'en',
      });
    });

    it('should render situation page with english language', async () => {
      render(<SituationPage />);
      await waitFor(() => {
        expect(screen.getByText('Workplace')).toBeInTheDocument();
      });
    });

    it('should display English retry button on error', async () => {
      (apiGet as jest.Mock).mockRejectedValue(new Error('API error'));
      render(<SituationPage />);
      await waitFor(() => {
        expect(screen.getByText('Retry')).toBeInTheDocument();
      });
    });
  });

  describe('Japanese UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        setSituation: jest.fn(),
        language: 'ja',
      });
    });

    it('should render situation page with japanese language', async () => {
      render(<SituationPage />);
      await waitFor(() => {
        expect(screen.getByText('職場')).toBeInTheDocument();
      });
    });

    it('should display Japanese retry button on error', async () => {
      (apiGet as jest.Mock).mockRejectedValue(new Error('API error'));
      render(<SituationPage />);
      await waitFor(() => {
        expect(screen.getByText('再試行')).toBeInTheDocument();
      });
    });
  });

  describe('Chinese UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        setSituation: jest.fn(),
        language: 'zh',
      });
    });

    it('should render situation page with chinese language', async () => {
      render(<SituationPage />);
      await waitFor(() => {
        expect(screen.getByText('工作场所')).toBeInTheDocument();
      });
    });

    it('should display Chinese retry button on error', async () => {
      (apiGet as jest.Mock).mockRejectedValue(new Error('API error'));
      render(<SituationPage />);
      await waitFor(() => {
        expect(screen.getByText('重试')).toBeInTheDocument();
      });
    });
  });
});
