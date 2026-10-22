import React from 'react';
import { sound } from '@/lib/sound';

interface FloatingDockProps {
  activeSection: string;
  isDark: boolean;
  onNavigate: (id: string) => void;
}

const ROOMS = [
  { id: 'hero', numeral: '01', label: 'Cover' },
  { id: 'about', numeral: '02', label: 'Profile' },
  { id: 'skills', numeral: '03', label: 'Rack' },
  { id: 'audio', numeral: '04', label: 'Audio' },
  { id: 'projects', numeral: '05', label: 'Works' },
  { id: 'certificates', numeral: '06', label: 'Honors' },
  { id: 'contact', numeral: '07', label: 'Dispatch' },
];

export const FloatingDock: React.FC<FloatingDockProps> = ({
  activeSection,
  onNavigate,
}) => {
  return (
    <nav
      aria-label="Magazine quick navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#08080d]/90 backdrop-blur-xl px-2 py-1.5 border border-white/20 shadow-2xl flex items-center gap-1 select-none"
    >
      {ROOMS.map((room) => {
        const isActive = activeSection === room.id;
        return (
          <button
            key={room.id}
            onClick={() => {
              sound.playClick();
              onNavigate(room.id);
            }}
            className={`px-3 py-1 font-mono text-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              isActive
                ? 'bg-[#ff2638] text-white shadow-md shadow-[#ff2638]/40 font-bold scale-102'
                : 'text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
            title={`Section ${room.numeral}: ${room.label}`}
          >
            <span>{room.numeral}</span>
            <span className="hidden sm:inline font-mono text-[10px] uppercase opacity-90">
              {room.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
