/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '@/components/ui/Button';

describe('Button Component - Design System', () => {
  describe('Rendering', () => {
    it('should render with children text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should support primary variant with new design system color', () => {
      const { container } = render(<Button variant="primary">Primary</Button>);
      const button = container.querySelector('button');
      
      expect(button).toHaveClass('bg-primary-600');
    });

    it('should support secondary variant', () => {
      const { container } = render(<Button variant="secondary">Secondary</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('secondary');
    });

    it('should support ghost variant', () => {
      const { container } = render(<Button variant="ghost">Ghost</Button>);
      const button = container.querySelector('button');

      expect(button?.className).toContain('bg-transparent');
      expect(button?.className).toContain('text-neutral-700');
    });

    it('should support danger variant', () => {
      const { container } = render(<Button variant="danger">Delete</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('bg-error');
    });

    it('should support text variant', () => {
      const { container } = render(<Button variant="text">Text</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('bg-transparent');
    });
  });

  describe('Sizing', () => {
    it('should support sm size', () => {
      const { container } = render(<Button size="sm">Small</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('px-3');
      expect(button?.className).toContain('py-1.5');
    });

    it('should support md size', () => {
      const { container } = render(<Button size="md">Medium</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('px-4');
      expect(button?.className).toContain('py-2');
    });

    it('should support lg size', () => {
      const { container } = render(<Button size="lg">Large</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('px-6');
      expect(button?.className).toContain('py-3');
    });
  });

  describe('States', () => {
    it('should support disabled state', () => {
      const { container } = render(<Button disabled>Disabled</Button>);
      const button = container.querySelector('button') as HTMLButtonElement;
      
      expect(button.disabled).toBe(true);
    });

    it('should support loading state', () => {
      const { container } = render(<Button loading>Loading</Button>);
      const button = container.querySelector('button') as HTMLButtonElement;
      
      expect(button.disabled).toBe(true);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should use new border-radius from design system', () => {
      const { container } = render(<Button>Rounded</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('rounded-md');
    });

    it('should support focus state with ring', () => {
      const { container } = render(<Button>Focus</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('focus:ring-2');
    });

    it('should have transition effects', () => {
      const { container } = render(<Button>Transition</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('transition');
    });
  });
});
