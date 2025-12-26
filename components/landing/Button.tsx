'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  href,
  onClick, 
  className = '', 
  variant = 'primary' 
}) => {
  const baseStyle = "px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-brand-primary text-white hover:bg-brand-primaryHover shadow-brand-primary/30",
    outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
  };

  const buttonClasses = `${baseStyle} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick} 
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

