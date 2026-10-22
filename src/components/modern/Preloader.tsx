import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onDone: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1400; // ms

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsOpening(true);
          setTimeout(() => {
            onDone();
          }, 800);
        }, 200);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex">
      {/* Left Door */}
      <div
        style={{ transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)' }}
        className={`w-1/2 h-full bg-[#101015] text-[#ebe7dc] flex flex-col justify-between p-8 md:p-14 border-r border-[#ffffff15] transition-transform duration-700 ${
          isOpening ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-widest text-[#a8a599]">
            PORTFOLIO // VOL. 26
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff2638] animate-ping" />
        </div>

        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#a8a599] block mb-2">
            PROVENANCE &amp; ARCHITECTURE
          </span>
          <h1 className="font-bebas text-4xl md:text-6xl font-normal tracking-wide text-white uppercase">
            EVAN PRANAWA
          </h1>
          <p className="font-instrument italic text-lg md:text-xl text-[#ff2638] mt-1">
            “Fluent in Code, Native in Systems”
          </p>
        </div>

        <div className="font-mono text-xs text-[#737168] tracking-widest">
          SYSADMIN · SOFTWARE ENGR · AUDIO
        </div>
      </div>

      {/* Right Door */}
      <div
        style={{ transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)' }}
        className={`w-1/2 h-full bg-[#101015] text-[#ebe7dc] flex flex-col justify-between items-end p-8 md:p-14 border-l border-[#ffffff15] transition-transform duration-700 ${
          isOpening ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="font-mono text-xs tracking-widest text-[#a8a599]">
          BOGOR, ID · UTC+7
        </div>

        <div className="text-right">
          <div className="font-mono text-5xl md:text-7xl font-light text-white tabular-nums">
            {progress < 10 ? `0${progress}` : progress}
            <span className="text-xl md:text-2xl text-[#ff2638]">%</span>
          </div>
          <div className="w-32 md:w-48 h-[2px] bg-[#272733] mt-4 ml-auto overflow-hidden">
            <div
              className="h-full bg-[#ff2638] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="font-mono text-xs text-[#737168] tracking-widest">
          INITIATING WEBGL ENGINE
        </div>
      </div>
    </div>
  );
};
