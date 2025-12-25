import fs from 'fs';
import path from 'path';

describe('Global Styles - CSS Variables', () => {
  let globalsCss: string;

  beforeAll(() => {
    const filePath = path.join(process.cwd(), 'app', 'globals.css');
    globalsCss = fs.readFileSync(filePath, 'utf-8');
  });

  describe('CSS Variables', () => {
    it('should define neutral color variables', () => {
      expect(globalsCss).toMatch(/--neutral-50:/);
      expect(globalsCss).toMatch(/--neutral-100:/);
      expect(globalsCss).toMatch(/--neutral-900:/);
    });

    it('should define primary color variables', () => {
      expect(globalsCss).toMatch(/--primary-50:/);
      expect(globalsCss).toMatch(/--primary-500:/);
      expect(globalsCss).toMatch(/--primary-600:/);
    });

    it('should define semantic color variables', () => {
      expect(globalsCss).toMatch(/--success:/);
      expect(globalsCss).toMatch(/--warning:/);
      expect(globalsCss).toMatch(/--error:/);
      expect(globalsCss).toMatch(/--info:/);
    });

    it('should have dark mode color variables', () => {
      expect(globalsCss).toMatch(/@media.*prefers-color-scheme:\s*dark/);
      expect(globalsCss).toMatch(/--bg-primary:/);
      expect(globalsCss).toMatch(/--text-primary:/);
    });

    it('should define typography variables', () => {
      expect(globalsCss).toMatch(/--font-family:/);
    });
  });

  describe('Root Selector', () => {
    it('should have :root selector with variables', () => {
      expect(globalsCss).toMatch(/:root\s*{[\s\S]*--/);
    });
  });
});
