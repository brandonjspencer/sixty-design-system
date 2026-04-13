import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export function Button({ children = 'Button', className = '', ...props }: ButtonProps) {
  return (
    <button type="button" className={`sixty-button ${className}`} {...props}>
      {children}
    </button>
  );
}
