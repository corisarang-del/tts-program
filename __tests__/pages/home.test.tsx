/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { useAppStore } from '@/lib/store';

jest.mock('@/lib/store');
jest.mock('next/navigation');
jest.mock('@/components/landing/Features', () => {
  return function MockFeatures() {
    return <div data-testid="mock-features">Features Component</div>;
  };
});

describe('Home Page - Multilingual UI Support', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Korean UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        language: 'ko',
      });
    });

    it('should display Korean main title', () => {
      render(<Home />);
      expect(screen.getByText(/상황만 선택하면/)).toBeInTheDocument();
    });

    it('should display Korean CTA button text', () => {
      render(<Home />);
      expect(screen.getByText('지금 시작하기 →')).toBeInTheDocument();
    });

    it('should display Korean feature titles', () => {
      render(<Home />);
      expect(screen.getByText('최소 클릭')).toBeInTheDocument();
      expect(screen.getByText('즉시 제공')).toBeInTheDocument();
      expect(screen.getByText('음성 지원')).toBeInTheDocument();
    });
  });

  describe('English UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        language: 'en',
      });
    });

    it('should display English main title', () => {
      render(<Home />);
      expect(screen.getByText(/Select a situation/)).toBeInTheDocument();
    });

    it('should display English CTA button text', () => {
      render(<Home />);
      expect(screen.getByText('Start now →')).toBeInTheDocument();
    });

    it('should display English feature titles', () => {
      render(<Home />);
      expect(screen.getByText('Minimal clicks')).toBeInTheDocument();
      expect(screen.getByText('Instant results')).toBeInTheDocument();
      expect(screen.getByText('Voice support')).toBeInTheDocument();
    });
  });

  describe('Japanese UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        language: 'ja',
      });
    });

    it('should display Japanese main title', () => {
      render(<Home />);
      expect(screen.getByText(/状況を選ぶだけで/)).toBeInTheDocument();
    });

    it('should display Japanese CTA button text', () => {
      render(<Home />);
      expect(screen.getByText('今すぐ始める →')).toBeInTheDocument();
    });

    it('should display Japanese feature titles', () => {
      render(<Home />);
      expect(screen.getByText('最小限のクリック')).toBeInTheDocument();
      expect(screen.getByText('即座に提供')).toBeInTheDocument();
      expect(screen.getByText('音声サポート')).toBeInTheDocument();
    });
  });

  describe('Chinese UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        language: 'zh',
      });
    });

    it('should display Chinese main title', () => {
      render(<Home />);
      expect(screen.getByText(/只需选择情况/)).toBeInTheDocument();
    });

    it('should display Chinese CTA button text', () => {
      render(<Home />);
      expect(screen.getByText('立即开始 →')).toBeInTheDocument();
    });

    it('should display Chinese feature titles', () => {
      render(<Home />);
      expect(screen.getByText('最少点击次数')).toBeInTheDocument();
      expect(screen.getByText('立即提供')).toBeInTheDocument();
      expect(screen.getByText('语音支持')).toBeInTheDocument();
    });
  });
});
