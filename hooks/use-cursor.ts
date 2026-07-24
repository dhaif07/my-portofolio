'use client';

import { useState, useEffect, useCallback } from 'react';

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
  label: string;
}

export function useCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
    label: '',
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursor((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
  }, []);

  const handleMouseDown = useCallback(() => {
    setCursor((prev) => ({ ...prev, isClicking: true }));
  }, []);

  const handleMouseUp = useCallback(() => {
    setCursor((prev) => ({ ...prev, isClicking: false }));
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp]);

  const setHovering = useCallback((isHovering: boolean, label = '') => {
    setCursor((prev) => ({ ...prev, isHovering, label }));
  }, []);

  return { cursor, setHovering };
}
