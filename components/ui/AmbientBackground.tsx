import React from 'react';

interface AmbientBackgroundProps {
  opacity?: number;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ opacity = 1 }) => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div style={{ opacity }} className="absolute inset-0 transition-opacity duration-1000">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-m-red/20 rounded-full blur-[120px] mix-blend-screen animate-blob filter" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-m-green/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000 filter" />
        <div className="absolute top-[40%] left-[40%] w-[30vw] h-[30vw] bg-m-red/10 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-4000 filter" />
      </div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] brightness-100 contrast-150 mix-blend-overlay" />
    </div>
  );
};