import { cn } from '@/utils';

type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-surface border-border text-secondary',
  accent: 'bg-accent/10 border-accent/20 text-accent',
  success: 'bg-success/10 border-success/20 text-success',
  warning: 'bg-warning/10 border-warning/20 text-warning',
  danger: 'bg-danger/10 border-danger/20 text-danger',
  outline: 'bg-transparent border-border text-secondary hover:border-accent/30',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-badge text-xs font-medium border',
        'font-inter transition-colors duration-200',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
