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
  const baseStyles = 'bg-white rounded-lg shadow-md p-6 transition-all duration-200';
  const hoverStyles = hover ? 'hover:shadow-lg hover:scale-105 cursor-pointer' : '';
  const activeStyles = active ? 'ring-2 ring-primary scale-105' : '';
  
  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${activeStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}



