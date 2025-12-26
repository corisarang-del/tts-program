/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import AnalysisPage from '@/app/analysis/page';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation');
jest.mock('@/lib/store');

describe('AnalysisPage - Multilingual UI Support', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  describe('Korean UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        resetStore: jest.fn(),
        language: 'ko',
      });
    });

    it('should display Korean title text', () => {
      render(<AnalysisPage />);
      expect(screen.getByText('사용 완료')).toBeInTheDocument();
    });

    it('should display Korean heading text', () => {
      render(<AnalysisPage />);
      expect(screen.getByText('사용이 완료되었습니다')).toBeInTheDocument();
    });

    it('should display Korean button text', () => {
      render(<AnalysisPage />);
      expect(screen.getByText('다른 상황 선택')).toBeInTheDocument();
      expect(screen.getByText('처음으로')).toBeInTheDocument();
    });
  });

  describe('English UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        resetStore: jest.fn(),
        language: 'en',
      });
    });

    it('should display English title text', () => {
      render(<AnalysisPage />);
      expect(screen.getByText('Usage complete')).toBeInTheDocument();
    });

    it('should display English heading text', () => {
      render(<AnalysisPage />);
      expect(screen.getByText(/Usage completed/)).toBeInTheDocument();
    });

    it('should display English button text', () => {
      render(<AnalysisPage />);
      expect(screen.getByText('Try another situation')).toBeInTheDocument();
      expect(screen.getByText('Go to home')).toBeInTheDocument();
    });
  });

  describe('Japanese UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        resetStore: jest.fn(),
        language: 'ja',
      });
    });

    it('should display Japanese title text', () => {
      render(<AnalysisPage />);
      expect(screen.getByText('使用完了')).toBeInTheDocument();
    });

    it('should display Japanese heading text', () => {
      render(<AnalysisPage />);
      expect(screen.getByText(/使用完了しました/)).toBeInTheDocument();
    });

    it('should display Japanese button text', () => {
      render(<AnalysisPage />);
      expect(screen.getByText('別の状況を選択')).toBeInTheDocument();
      expect(screen.getByText('ホームへ')).toBeInTheDocument();
    });
  });

  describe('Chinese UI Text', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        resetStore: jest.fn(),
        language: 'zh',
      });
    });

    it('should display Chinese title text', () => {
      render(<AnalysisPage />);
      expect(screen.getByText('使用完成')).toBeInTheDocument();
    });

    it('should display Chinese heading text', () => {
      render(<AnalysisPage />);
      expect(screen.getByText(/使用已完成/)).toBeInTheDocument();
    });

    it('should display Chinese button text', () => {
      render(<AnalysisPage />);
      expect(screen.getByText('选择另一种情况')).toBeInTheDocument();
      expect(screen.getByText('返回首页')).toBeInTheDocument();
    });
  });
});
