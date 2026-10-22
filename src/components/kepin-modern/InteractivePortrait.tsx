import React, { useState } from 'react';
import { Paintbrush, RotateCcw, Scan, Sparkles } from 'lucide-react';
import { sound } from '@/lib/sound';

export const InteractivePortrait: React.FC = () => {
  const [isPainted, setIsPainted] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);

  const photos = [
    { src: '/epuy.webp', label: '01: FRONTAL PORTRAIT', hash: 'SHA256:7b4f...a91c' },
    { src: '/main.webp', label: '02: STUDIO PROFILE', hash: 'SHA256:92da...3e81' },
    { src: '/belakang.webp', label: '03: HOMELAB CANDID', hash: 'SHA256:4c10...b20f' },
  ];

  const togglePaint = () => {
    sound.playClick();
    setIsPainted((prev) => !prev);
  };

  const cyclePhoto = () => {
    sound.playClick();
    setCurrentIdx((prev) => (prev + 1) % photos.length);
  };

  const current = photos[currentIdx];

  return (
    <figure data-push className="w-full max-w-sm mx-auto select-none font-mono">
      <div className="relative">
        {/* Subtle crimson rim back-glow */}
        <div className="absolute -inset-1 bg-gradient-to-tr from-[#ff2638]/20 via-transparent to-white/5 blur-lg opacity-70 pointer-events-none" />

        {/* Industrial Technical Frame */}
        <div className="relative bg-[#0d0d14] p-3 border border-white/20 shadow-2xl">
          {/* Top Chassis Registration Bar */}
          <div className="flex items-center justify-between text-[10px] text-zinc-500 pb-2 mb-2 border-b border-white/10">
            <span className="text-[#ff2638] font-bold">[OPERATOR_IMG]</span>
            <span>{current.hash}</span>
          </div>

          {/* Photo Container */}
          <div className="relative aspect-[4/5] bg-black overflow-hidden border border-white/10">
            <img
              src={current.src}
              alt="Evan Pranawa Armansyah, Junior SysAdmin & Software Developer"
              width="480"
              height="600"
              className={`w-full h-full object-cover object-top transition-all duration-700 ease-out ${
                isPainted
                  ? 'grayscale-0 contrast-110 brightness-100'
                  : 'grayscale contrast-130 brightness-90'
              }`}
            />

            {/* Subtle editorial film overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent pointer-events-none" />

            {/* Corner Crosshairs */}
            <div className="absolute top-2 left-2 text-[#ff2638] text-xs leading-none">+</div>
            <div className="absolute top-2 right-2 text-[#ff2638] text-xs leading-none">+</div>
            <div className="absolute bottom-2 left-2 text-[#ff2638] text-xs leading-none">+</div>
            <div className="absolute bottom-2 right-2 text-[#ff2638] text-xs leading-none">+</div>

            {/* Quick interactive badge at bottom of photo */}
            <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[10px] text-white">
              <span className="bg-black/80 px-2 py-0.5 border border-white/15">
                {current.label}
              </span>
              <button
                type="button"
                onClick={cyclePhoto}
                className="bg-[#ff2638] hover:bg-[#e52536] text-white px-2 py-0.5 transition-colors cursor-pointer font-bold shadow-md"
                title="Cycle through available photographs"
              >
                CYCLE ↻
              </button>
            </div>
          </div>

          {/* Toggle Monochrome / Color Paint Button */}
          <button
            type="button"
            onClick={togglePaint}
            aria-label={isPainted ? 'Toggle monochrome style' : 'Toggle vibrant color'}
            className="absolute -top-3 -right-3 w-8 h-8 z-30 flex items-center justify-center bg-[#ff2638] text-white hover:bg-[#e52536] shadow-lg shadow-[#ff2638]/40 transition-transform active:scale-90 cursor-pointer border border-white/20"
            title={isPainted ? 'Switch to Monochrome' : 'Switch to Full Color'}
          >
            {isPainted ? <RotateCcw size={14} /> : <Paintbrush size={14} />}
          </button>
        </div>
      </div>

      {/* Editorial Technical Caption */}
      <figcaption className="mt-3 text-xs text-zinc-400">
        <div className="flex items-center justify-between">
          <span className="text-white font-bold tracking-wider">
            EVAN PRANAWA ARMANSYAH
          </span>
          <span className="text-[#ff2638]">[ID: 0xEP]</span>
        </div>
        <div className="flex items-center justify-between mt-1 text-[10px] text-zinc-500">
          <span>REKAYASA PERANGKAT LUNAK</span>
          <span>BOGOR, INDONESIA</span>
        </div>
      </figcaption>
    </figure>
  );
};
