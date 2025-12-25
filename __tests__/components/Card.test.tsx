/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '@/components/ui/Card';

describe('Card Component - Design System', () => {
  describe('Rendering', () => {
    it('should render with children', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });
  });

  describe('Base Styling', () => {
    it('should have correct base styles', () => {
      const { container } = render(<Card>Test</Card>);
      const card = container.querySelector('div');

      expect(card?.className).toContain('bg-white');
      expect(card?.className).toContain('rounded-md');
      expect(card?.className).toContain('shadow-md');
      expect(card?.className).toContain('p-6');
      expect(card?.className).toContain('transition-all');
    });

    it('should use dark mode background color', () => {
      const { container } = render(<Card>Test</Card>);
      const card = container.querySelector('div');

      expect(card?.className).toContain('dark:bg-neutral-800');
    });
  });

  describe('Hover State', () => {
    it('should support hover prop with micro-interactions', () => {
      const { container } = render(<Card hover>Hoverable</Card>);
      const card = container.querySelector('div');

      expect(card?.className).toContain('hover:shadow-lg');
      expect(card?.className).toContain('hover:scale-105');
      expect(card?.className).toContain('cursor-pointer');
    });

    it('should not have hover styles when hover prop is false', () => {
      const { container } = render(<Card hover={false}>Not hoverable</Card>);
      const card = container.querySelector('div');

      expect(card?.className).not.toMatch(/hover:shadow-lg.*hover:scale-105/);
    });
  });

  describe('Active State', () => {
    it('should support active prop with new primary color', () => {
      const { container } = render(<Card active>Active</Card>);
      const card = container.querySelector('div');

      expect(card?.className).toContain('ring-2');
      expect(card?.className).toContain('ring-primary-600');
      expect(card?.className).toContain('scale-105');
    });

    it('should not have active styles when active prop is false', () => {
      const { container } = render(<Card active={false}>Inactive</Card>);
      const card = container.querySelector('div');

      expect(card?.className).not.toContain('ring-2');
    });
  });

  describe('Custom Styling', () => {
    it('should accept custom className', () => {
      const { container } = render(
        <Card className="custom-class">Test</Card>
      );
      const card = container.querySelector('div');

      expect(card?.className).toContain('custom-class');
    });

    it('should accept custom HTML attributes', () => {
      const { container } = render(
        <Card data-testid="custom-card" aria-label="Custom Card">
          Test
        </Card>
      );
      const card = container.querySelector('[data-testid="custom-card"]');

      expect(card).toHaveAttribute('aria-label', 'Custom Card');
    });
  });

  describe('Accessibility', () => {
    it('should support aria attributes', () => {
      render(<Card aria-label="Information Card">Content</Card>);
      const card = screen.getByLabelText('Information Card');

      expect(card).toBeInTheDocument();
    });
  });
});
