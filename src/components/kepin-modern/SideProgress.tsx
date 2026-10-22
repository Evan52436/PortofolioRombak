import React from 'react';
import { sound } from '@/lib/sound';

interface SideProgressProps {
  activeSection: string;
  isDark: boolean;
  onNavigate: (id: string) => void;
}

const ROOMS = [
  { id: 'hero', numeral: '01' },
  { id: 'about', numeral: '02' },
  { id: 'skills', numeral: '03' },
  { id: 'audio', numeral: '04' },
  { id: 'projects', numeral: '05' },
  { id: 'certificates', numeral: '06' },
  { id: 'contact', numeral: '07' },
];

export const SideProgress: React.FC<SideProgressProps> = ({
  activeSection,
  onNavigate,
}) => {
  return (
    <aside
      aria-label="Progress tracker"
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3 select-none"
    >
      <span className="w-[1px] h-10 bg-white/20" />

      <div className="flex flex-col gap-2 items-center font-mono">
        {ROOMS.map((room) => {
          const isActive = activeSection === room.id;
          return (
            <button
              key={room.id}
              onClick={() => {
                sound.playClick();
                onNavigate(room.id);
              }}
              className={`text-[10px] transition-all duration-200 py-1 px-1 cursor-pointer ${
                isActive
                  ? 'text-[#ff2638] font-bold scale-125'
                  : 'text-zinc-600 hover:text-zinc-300'
              }`}
              title={`Jump to Section ${room.numeral}`}
            >
              {room.numeral}
            </button>
          );
        })}
      </div>

      <span className="w-[1px] h-10 bg-white/20" />
    </aside>
  );
};
