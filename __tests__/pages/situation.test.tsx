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

    it('should display Korean title text', async () => {
      render(<SituationPage />);
      await waitFor(() => {
        expect(screen.getByText('어떤 상황인가요?')).toBeInTheDocument();
      });
    });

    it('should display Korean retry button text', async () => {
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

    it('should display English title text', async () => {
      render(<SituationPage />);
      await waitFor(() => {
        expect(screen.getByText(/What situation are you in/)).toBeInTheDocument();
      });
    });

    it('should display English retry button text', async () => {
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

    it('should display Japanese title text', async () => {
      render(<SituationPage />);
      await waitFor(() => {
        expect(screen.getByText(/どんな状況/)).toBeInTheDocument();
      });
    });

    it('should display Japanese retry button text', async () => {
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

    it('should display Chinese title text', async () => {
      render(<SituationPage />);
      await waitFor(() => {
        expect(screen.getByText(/你的情况是什么/)).toBeInTheDocument();
      });
    });

    it('should display Chinese retry button text', async () => {
      (apiGet as jest.Mock).mockRejectedValue(new Error('API error'));
      render(<SituationPage />);
      await waitFor(() => {
        expect(screen.getByText('重试')).toBeInTheDocument();
      });
    });
  });
});
