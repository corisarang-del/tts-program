import { ReactNode, HTMLAttributes } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: 'light' | 'subtle' | 'dark';
}

export default function Section({
  children,
  variant = 'light',
  className = '',
  ...props
}: SectionProps) {
  const baseStyles = 'w-full py-12 md:py-16';

  const variantStyles = {
    light: 'bg-white dark:bg-neutral-900',
    subtle: 'bg-neutral-50 dark:bg-neutral-800',
    dark: 'bg-neutral-900 dark:bg-neutral-950 text-white',
  };

  return (
    <section
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
