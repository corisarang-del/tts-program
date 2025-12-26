/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResultPage from '@/app/result/page';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import * as logger from '@/lib/logger';

jest.mock('next/navigation');
jest.mock('@/lib/store');
jest.mock('@/lib/logger');

describe('ResultPage - Multilingual UI Support', () => {
  const mockSituation = {
    id: 'situation_001',
    name: { ko: '직장', en: 'Workplace', ja: '職場', zh: '工作场所' },
    description: { ko: '직장 상황', en: 'Work situations', ja: '職場の状況', zh: '工作情况' },
    icon: '💼',
    displayOrder: 1,
    intents: [],
  };

  const mockIntent = {
    id: 'intent_001',
    situationId: 'situation_001',
    name: { ko: '인사', en: 'Greeting', ja: '挨拶', zh: '问候' },
    description: { ko: '인사하기', en: 'Say hello', ja: 'あいさつする', zh: '打招呼' },
    sentences: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (logger.getSessionId as jest.Mock).mockReturnValue('test_session_123');
    (logger.detectDevice as jest.Mock).mockReturnValue('desktop');
    (logger.sendUsageLog as jest.Mock).mockResolvedValue(undefined);
  });

  describe('Korean UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        situation: mockSituation,
        intent: mockIntent,
        sentences: ['테스트 문장'],
        ttsPlayed: false,
        resultRating: null,
        setResultRating: jest.fn(),
        language: 'ko',
      });
    });

    it('should display Korean title text', () => {
      render(<ResultPage />);
      expect(screen.getByText('도움이 되셨나요?')).toBeInTheDocument();
    });

    it('should display Korean rating buttons', () => {
      render(<ResultPage />);
      expect(screen.getByText(/해결됨/)).toBeInTheDocument();
      expect(screen.getByText(/보통/)).toBeInTheDocument();
      expect(screen.getByText(/도움 안됨/)).toBeInTheDocument();
    });

    it('should display Korean skip button text', () => {
      render(<ResultPage />);
      expect(screen.getByText('건너뛰기')).toBeInTheDocument();
    });
  });

  describe('English UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        situation: mockSituation,
        intent: mockIntent,
        sentences: ['Test sentence'],
        ttsPlayed: false,
        resultRating: null,
        setResultRating: jest.fn(),
        language: 'en',
      });
    });

    it('should display English title text', () => {
      render(<ResultPage />);
      expect(screen.getByText(/Was this helpful/)).toBeInTheDocument();
    });

    it('should display English rating buttons', () => {
      render(<ResultPage />);
      expect(screen.getByText(/Solved/)).toBeInTheDocument();
      expect(screen.getByText(/Okay/)).toBeInTheDocument();
      expect(screen.getByText(/Not helpful/)).toBeInTheDocument();
    });

    it('should display English skip button text', () => {
      render(<ResultPage />);
      expect(screen.getByText('Skip')).toBeInTheDocument();
    });
  });

  describe('Japanese UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        situation: mockSituation,
        intent: mockIntent,
        sentences: ['テスト文'],
        ttsPlayed: false,
        resultRating: null,
        setResultRating: jest.fn(),
        language: 'ja',
      });
    });

    it('should display Japanese title text', () => {
      render(<ResultPage />);
      expect(screen.getByText(/役に立ちました/)).toBeInTheDocument();
    });

    it('should display Japanese rating buttons', () => {
      render(<ResultPage />);
      expect(screen.getByText(/解決/)).toBeInTheDocument();
      expect(screen.getByText(/普通/)).toBeInTheDocument();
      expect(screen.getByText(/役に立たなかった/)).toBeInTheDocument();
    });

    it('should display Japanese skip button text', () => {
      render(<ResultPage />);
      expect(screen.getByText('スキップ')).toBeInTheDocument();
    });
  });

  describe('Chinese UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        situation: mockSituation,
        intent: mockIntent,
        sentences: ['测试句子'],
        ttsPlayed: false,
        resultRating: null,
        setResultRating: jest.fn(),
        language: 'zh',
      });
    });

    it('should display Chinese title text', () => {
      render(<ResultPage />);
      expect(screen.getByText(/有帮助吗/)).toBeInTheDocument();
    });

    it('should display Chinese rating buttons', () => {
      render(<ResultPage />);
      expect(screen.getByText(/已解决/)).toBeInTheDocument();
      expect(screen.getByText(/一般/)).toBeInTheDocument();
      expect(screen.getByText(/没有帮助/)).toBeInTheDocument();
    });

    it('should display Chinese skip button text', () => {
      render(<ResultPage />);
      expect(screen.getByText('跳过')).toBeInTheDocument();
    });
  });
});
