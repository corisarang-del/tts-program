/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import SentencePage from '@/app/sentence/page';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation');
jest.mock('@/lib/store');

describe('SentencePage - Multilingual UI Support', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  describe('Korean UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        situation: { id: 'situation_001', name: 'Test' },
        intent: {
          id: 'intent_001',
          name: 'Test Intent',
          sentences: {
            ko: ['테스트 문장 1', '테스트 문장 2', '테스트 문장 3'],
          },
        },
        sentences: ['테스트 문장 1', '테스트 문장 2', '테스트 문장 3'],
        setSentences: jest.fn(),
        setTtsPlayed: jest.fn(),
        language: 'ko',
      });
    });

    it('should display Korean copy button text', () => {
      render(<SentencePage />);
      const buttons = screen.getAllByText('복사');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should display Korean regenerate button text', () => {
      render(<SentencePage />);
      expect(screen.getByText('다시 생성')).toBeInTheDocument();
    });

    it('should display Korean next button text', () => {
      render(<SentencePage />);
      expect(screen.getByText('다음')).toBeInTheDocument();
    });
  });

  describe('English UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        situation: { id: 'situation_001', name: 'Test' },
        intent: {
          id: 'intent_001',
          name: 'Test Intent',
          sentences: {
            en: ['Test sentence 1', 'Test sentence 2', 'Test sentence 3'],
          },
        },
        sentences: ['Test sentence 1', 'Test sentence 2', 'Test sentence 3'],
        setSentences: jest.fn(),
        setTtsPlayed: jest.fn(),
        language: 'en',
      });
    });

    it('should display English copy button text', () => {
      render(<SentencePage />);
      const buttons = screen.getAllByText('Copy');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should display English regenerate button text', () => {
      render(<SentencePage />);
      expect(screen.getByText('Regenerate')).toBeInTheDocument();
    });

    it('should display English next button text', () => {
      render(<SentencePage />);
      expect(screen.getByText('Next')).toBeInTheDocument();
    });
  });

  describe('Japanese UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        situation: { id: 'situation_001', name: 'Test' },
        intent: {
          id: 'intent_001',
          name: 'Test Intent',
          sentences: {
            ja: ['テスト文1', 'テスト文2', 'テスト文3'],
          },
        },
        sentences: ['テスト文1', 'テスト文2', 'テスト文3'],
        setSentences: jest.fn(),
        setTtsPlayed: jest.fn(),
        language: 'ja',
      });
    });

    it('should display Japanese copy button text', () => {
      render(<SentencePage />);
      const buttons = screen.getAllByText('コピー');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should display Japanese regenerate button text', () => {
      render(<SentencePage />);
      expect(screen.getByText('再生成')).toBeInTheDocument();
    });

    it('should display Japanese next button text', () => {
      render(<SentencePage />);
      expect(screen.getByText('次')).toBeInTheDocument();
    });
  });

  describe('Chinese UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        situation: { id: 'situation_001', name: 'Test' },
        intent: {
          id: 'intent_001',
          name: 'Test Intent',
          sentences: {
            zh: ['测试句子1', '测试句子2', '测试句子3'],
          },
        },
        sentences: ['测试句子1', '测试句子2', '测试句子3'],
        setSentences: jest.fn(),
        setTtsPlayed: jest.fn(),
        language: 'zh',
      });
    });

    it('should display Chinese copy button text', () => {
      render(<SentencePage />);
      const buttons = screen.getAllByText('复制');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should display Chinese regenerate button text', () => {
      render(<SentencePage />);
      expect(screen.getByText('重新生成')).toBeInTheDocument();
    });

    it('should display Chinese next button text', () => {
      render(<SentencePage />);
      expect(screen.getByText('下一步')).toBeInTheDocument();
    });
  });
});
