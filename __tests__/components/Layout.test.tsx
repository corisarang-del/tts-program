/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

describe('Layout Components - Design System', () => {
  describe('Container', () => {
    it('should render with children', () => {
      const { container } = render(<Container>Content</Container>);
      expect(container.textContent).toContain('Content');
    });

    it('should have correct container styles', () => {
      const { container } = render(<Container>Test</Container>);
      const div = container.querySelector('div');

      expect(div?.className).toContain('mx-auto');
      expect(div?.className).toContain('px-4');
      expect(div?.className).toContain('w-full');
    });

    it('should limit max width to 2xl', () => {
      const { container } = render(<Container>Test</Container>);
      const div = container.querySelector('div');

      expect(div?.className).toContain('max-w-2xl');
    });

    it('should accept custom className', () => {
      const { container } = render(<Container className="custom">Test</Container>);
      const div = container.querySelector('div');

      expect(div?.className).toContain('custom');
    });

    it('should accept custom HTML attributes', () => {
      const { container } = render(
        <Container data-testid="custom-container" role="main">
          Test
        </Container>
      );
      const div = container.querySelector('[data-testid="custom-container"]');

      expect(div).toHaveAttribute('role', 'main');
    });
  });

  describe('Section', () => {
    it('should render with children', () => {
      const { container } = render(<Section>Section content</Section>);
      expect(container.textContent).toContain('Section content');
    });

    it('should have correct base styles', () => {
      const { container } = render(<Section>Test</Section>);
      const section = container.querySelector('section');

      expect(section?.className).toContain('w-full');
      expect(section?.className).toContain('py-12');
      expect(section?.className).toContain('md:py-16');
    });

    it('should support variant backgrounds', () => {
      const { container: container1 } = render(
        <Section variant="light">Light</Section>
      );
      const section1 = container1.querySelector('section');
      expect(section1?.className).toContain('bg-white');

      const { container: container2 } = render(
        <Section variant="subtle">Subtle</Section>
      );
      const section2 = container2.querySelector('section');
      expect(section2?.className).toContain('bg-neutral-50');
    });

    it('should support dark mode', () => {
      const { container } = render(<Section>Test</Section>);
      const section = container.querySelector('section');

      expect(section?.className).toMatch(/dark:/);
    });

    it('should accept custom className', () => {
      const { container } = render(<Section className="custom">Test</Section>);
      const section = container.querySelector('section');

      expect(section?.className).toContain('custom');
    });

    it('should accept custom HTML attributes', () => {
      const { container } = render(
        <Section data-testid="custom-section" aria-label="Test Section">
          Test
        </Section>
      );
      const section = container.querySelector('[data-testid="custom-section"]');

      expect(section).toHaveAttribute('aria-label', 'Test Section');
    });

    it('should render children correctly', () => {
      const { container } = render(
        <Section>
          <p>Paragraph inside section</p>
        </Section>
      );

      expect(container.querySelector('p')).toHaveTextContent('Paragraph inside section');
    });
  });

  describe('Composition', () => {
    it('should work well together with Container inside Section', () => {
      const { container } = render(
        <Section>
          <Container>Nested content</Container>
        </Section>
      );

      const section = container.querySelector('section');
      const div = container.querySelector('div');

      expect(section).toBeInTheDocument();
      expect(div?.className).toContain('mx-auto');
      expect(container.textContent).toContain('Nested content');
    });
  });
});
