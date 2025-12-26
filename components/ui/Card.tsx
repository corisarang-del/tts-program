import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  active?: boolean;
}

export default function Card({
  children,
  hover = false,
  active = false,
  className = '',
  ...props
}: CardProps) {
  const baseStyles = 'bg-white dark:bg-neutral-800 rounded-md shadow-md p-6 transition-all duration-200';
  const hoverStyles = hover ? 'hover:shadow-lg hover:scale-105 cursor-pointer' : '';
  const activeStyles = active ? 'ring-2 ring-primary-600 scale-105' : '';
  
  const combinedClassName = [
    baseStyles,
    hoverStyles,
    activeStyles,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={combinedClassName}
      {...props}
    >
      {children}
    </div>
  );
}



