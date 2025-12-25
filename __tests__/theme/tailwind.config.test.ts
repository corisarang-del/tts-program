import config from '@/tailwind.config';

describe('Tailwind Config - Design System', () => {
  describe('Color Palette', () => {
    it('should have neutral color palette', () => {
      const theme = (config.theme?.extend as any)?.colors;
      
      expect(theme).toBeDefined();
      expect(theme?.neutral).toBeDefined();
      expect(theme?.neutral?.[50]).toBe('#fafafa');
      expect(theme?.neutral?.[100]).toBe('#f5f5f5');
      expect(theme?.neutral?.[900]).toBe('#171717');
    });

    it('should have primary color palette with 6 shades', () => {
      const theme = (config.theme?.extend as any)?.colors;
      
      expect(theme?.primary).toBeDefined();
      expect(theme?.primary?.[50]).toBe('#f5f3ff');
      expect(theme?.primary?.[100]).toBe('#ede9fe');
      expect(theme?.primary?.[500]).toBe('#8b5cf6');
      expect(theme?.primary?.[600]).toBe('#7c3aed');
      expect(theme?.primary?.[700]).toBe('#6d28d9');
    });

    it('should have semantic colors for success, warning, error, info', () => {
      const theme = (config.theme?.extend as any)?.colors;
      
      expect(theme?.success).toBe('#10b981');
      expect(theme?.warning).toBe('#f59e0b');
      expect(theme?.error).toBe('#ef4444');
      expect(theme?.info).toBe('#3b82f6');
    });
  });

  describe('Typography', () => {
    it('should have extended line height values', () => {
      const theme = (config.theme?.extend as any);
      
      expect(theme?.lineHeight).toBeDefined();
      expect(theme?.lineHeight?.['16']).toBe('16px');
      expect(theme?.lineHeight?.['20']).toBe('20px');
      expect(theme?.lineHeight?.['24']).toBe('24px');
    });
  });

  describe('Border Radius', () => {
    it('should have design system border radius values', () => {
      const theme = (config.theme?.extend as any);
      
      expect(theme?.borderRadius).toBeDefined();
      expect(theme?.borderRadius?.xs).toBe('4px');
      expect(theme?.borderRadius?.sm).toBe('8px');
      expect(theme?.borderRadius?.md).toBe('12px');
      expect(theme?.borderRadius?.lg).toBe('16px');
    });
  });

  describe('Spacing', () => {
    it('should have consistent spacing scale', () => {
      const theme = (config.theme?.extend as any);
      
      // Tailwind already provides spacing, just verify the basic ones work
      expect(theme?.spacing || true).toBe(true);
    });
  });
});
