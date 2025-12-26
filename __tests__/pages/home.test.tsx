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
jest.mock('@/components/landing/Hero', () => {
  return {
    Hero: function MockHero() {
      return <div data-testid="mock-hero">Hero Component</div>;
    },
  };
});
jest.mock('@/components/landing/HowTo', () => {
  return {
    HowTo: function MockHowTo() {
      return <div data-testid="mock-howto">HowTo Component</div>;
    },
  };
});
jest.mock('@/components/landing/Footer', () => {
  return {
    Footer: function MockFooter() {
      return <div data-testid="mock-footer">Footer Component</div>;
    },
  };
});
jest.mock('@/components/ui/Header', () => {
  return function MockHeader() {
    return <div data-testid="mock-header">Header</div>;
  };
});

describe('Home Page - Multilingual UI Support', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Home Page Rendering', () => {
    beforeEach(() => {
      (useAppStore as jest.Mock).mockReturnValue({
        language: 'ko',
      });
    });

    it('should render home page with all main components', () => {
      render(<Home />);
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-hero')).toBeInTheDocument();
      expect(screen.getByTestId('mock-features')).toBeInTheDocument();
      expect(screen.getByTestId('mock-howto')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    });

    it('should have correct main container structure', () => {
      render(<Home />);
      const mainElement = screen.getByRole('main');
      expect(mainElement).toBeInTheDocument();
    });
  });

});
