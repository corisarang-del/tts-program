import { ReactNode, HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Container({
  children,
  className = '',
  ...props
}: ContainerProps) {
  const baseStyles = 'w-full max-w-2xl mx-auto px-4';

  return (
    <div className={`${baseStyles} ${className}`} {...props}>
      {children}
    </div>
  );
}
