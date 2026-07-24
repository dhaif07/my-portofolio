'use client';

import { forwardRef, useRef, MouseEvent } from 'react';
import { cn } from '@/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'glass border border-white/10 text-primary hover:border-accent/40 hover:bg-white/5 shadow-card hover:shadow-[0_0_25px_rgba(0,229,255,0.25)]',
  secondary:
    'bg-transparent text-primary border border-border/80 hover:bg-primary hover:text-background hover:border-primary',
  ghost:
    'bg-transparent text-secondary hover:text-primary hover:bg-surface/50',
  accent:
    'bg-accent text-background border border-accent/20 hover:bg-accent/90 shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:shadow-[0_0_25px_rgba(0,229,255,0.45)]',
  outline:
    'bg-transparent text-primary border border-border/50 hover:bg-surface hover:text-primary hover:border-border',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-6 py-3.5 text-sm',
  lg: 'px-8 py-4.5 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      children,
      className,
      onMouseMove,
      ...props
    },
    ref,
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
      const btn = buttonRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      btn.style.setProperty('--mouse-x', `${x}px`);
      btn.style.setProperty('--mouse-y', `${y}px`);

      onMouseMove?.(e);
    };

    return (
      <button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        onMouseMove={handleMouseMove}
        disabled={isLoading || props.disabled}
        className={cn(
          'relative inline-flex items-center justify-center gap-2',
          'rounded-btn font-inter font-medium',
          'transition-all duration-200 ease-out cursor-pointer',
          'hover:scale-[1.03]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'overflow-hidden select-none',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
