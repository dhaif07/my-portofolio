'use client';

import { useScrollProgress } from '@/hooks/use-scroll-progress';

export function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}
