import { cn } from '@/utils';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-4 py-1.5 rounded-full',
        'bg-surface border border-border',
        'font-inter text-xs font-medium tracking-widest uppercase text-secondary',
        className,
      )}
    >
      <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
      {children}
    </div>
  );
}
