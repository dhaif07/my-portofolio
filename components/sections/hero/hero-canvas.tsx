'use client';

import { Scene } from '@/components/three/scene';
import { Particles } from '@/components/three/particles';

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <Scene className="w-full h-full">
        <Particles count={2000} />
      </Scene>
      
      {/* Dark overlay to ensure text remains readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background z-10" />
    </div>
  );
}
