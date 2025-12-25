/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/ui/Header';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation');
jest.mock('@/lib/store');

describe('Header Component - Design System', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (useAppStore as jest.Mock).mockReturnValue({
      language: 'ko',
      setLanguage: jest.fn(),
    });
  });

  describe('Base Styling', () => {
    it('should have correct header styles', () => {
      const { container } = render(<Header />);
      const header = container.querySelector('header');

      expect(header?.className).toContain('w-full');
      expect(header?.className).toContain('border-b');
      expect(header?.className).toContain('border-neutral-200');
      expect(header?.className).toContain('bg-white');
    });

    it('should support dark mode', () => {
      const { container } = render(<Header />);
      const header = container.querySelector('header');

      expect(header?.className).toContain('dark:bg-neutral-800');
      expect(header?.className).toContain('dark:border-neutral-700');
    });

    it('should have proper padding and layout', () => {
      const { container } = render(<Header />);
      const div = container.querySelector('[class*="container"]');

      expect(div?.className).toContain('mx-auto');
      expect(div?.className).toContain('px-4');
      expect(div?.className).toContain('py-4');
      expect(div?.className).toContain('flex');
      expect(div?.className).toContain('items-center');
    });
  });

  describe('Back Button', () => {
    it('should render back button when showBack is true', () => {
      render(<Header showBack={true} />);
      const button = screen.getByLabelText('뒤로가기');

      expect(button).toBeInTheDocument();
    });

    it('should not render back button when showBack is false', () => {
      render(<Header showBack={false} />);
      const button = screen.queryByLabelText('뒤로가기');

      expect(button).not.toBeInTheDocument();
    });

    it('back button should use new neutral colors', () => {
      const { container } = render(<Header showBack={true} />);
      const button = container.querySelector('button');

      expect(button?.className).toContain('text-neutral-600');
      expect(button?.className).toContain('hover:text-neutral-900');
    });

    it('should navigate using backUrl when provided', () => {
      const mockPush = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

      render(<Header showBack={true} backUrl="/custom-path" />);
      const button = screen.getByLabelText('뒤로가기');

      fireEvent.click(button);
      expect(mockPush).toHaveBeenCalledWith('/custom-path');
    });
  });

  describe('Title', () => {
    it('should render title when provided', () => {
      render(<Header title="Test Title" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should not render title when not provided', () => {
      const { container } = render(<Header />);
      const h1 = container.querySelector('h1');

      expect(h1).not.toBeInTheDocument();
    });

    it('title should use new neutral colors', () => {
      const { container } = render(<Header title="Test" />);
      const h1 = container.querySelector('h1');

      expect(h1?.className).toContain('text-neutral-900');
      expect(h1?.className).toContain('dark:text-neutral-100');
    });
  });

  describe('Logo Link', () => {
    it('should render QuickTalk logo link', () => {
      render(<Header />);
      const link = screen.getByText('QuickTalk');

      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', '/');
    });

    it('logo should use new primary color', () => {
      const { container } = render(<Header />);
      const link = container.querySelector('a[href="/"]');

      expect(link?.className).toContain('text-primary-600');
      expect(link?.className).toContain('dark:text-primary-400');
    });
  });

  describe('Language Select', () => {
    it('should render language select', () => {
      render(<Header />);
      const select = screen.getByLabelText('Language');

      expect(select).toBeInTheDocument();
    });

    it('select should use new neutral border color', () => {
      const { container } = render(<Header />);
      const select = container.querySelector('select');

      expect(select?.className).toContain('border-neutral-200');
      expect(select?.className).toContain('rounded-md');
      expect(select?.className).toContain('bg-white');
    });

    it('should support dark mode in select', () => {
      const { container } = render(<Header />);
      const select = container.querySelector('select');

      expect(select?.className).toContain('dark:bg-neutral-800');
      expect(select?.className).toContain('dark:border-neutral-700');
    });
  });

  describe('Accessibility', () => {
    it('back button should have aria-label', () => {
      render(<Header showBack={true} />);
      const button = screen.getByLabelText('뒤로가기');

      expect(button).toHaveAttribute('aria-label', '뒤로가기');
    });

    it('language select should have aria-label', () => {
      const { container } = render(<Header />);
      const select = container.querySelector('select');

      expect(select).toHaveAttribute('aria-label', 'Language');
    });
  });
});
