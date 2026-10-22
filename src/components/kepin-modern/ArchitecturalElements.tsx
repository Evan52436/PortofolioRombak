import React from 'react';

// Room Badge (iconic museum tag)
interface RoomBadgeProps {
  room: string;
  label: string;
  isDark?: boolean;
}

export const RoomBadge: React.FC<RoomBadgeProps> = ({ room, label, isDark = false }) => (
  <p
    className={`inline-flex items-baseline gap-2.5 pl-3.5 pr-4 py-1.5 transition-colors ${
      isDark ? 'bg-[#21212b] text-white border border-white/10' : 'bg-[#e7e5e4] text-black'
    }`}
  >
    <span className="font-serif text-base leading-none font-medium">{room}</span>
    <span className={`font-grotesk text-[13px] ${isDark ? 'text-white/70' : 'text-black/65'}`}>
      {label}
    </span>
  </p>
);

// Architectural Wainscoting Deck (Ze in reference)
export const WainscotingDeck: React.FC<{ wall?: string; deck?: string }> = ({
  wall = '#1a1a21',
  deck = '#0f0f15',
}) => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-0">
    <div className="h-10" style={{ backgroundColor: wall }} />
    <div className="h-28" style={{ backgroundColor: deck }} />
  </div>
);

// Museum Stone Plinth / Pedestal (Qe in reference)
export const MuseumPlinth: React.FC<{ className?: string; tone?: string }> = ({
  className = '',
  tone = '#e7e5e4',
}) => (
  <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
    <div className="relative">
      <span className="absolute inset-0 translate-x-2 translate-y-2 bg-black/35" />
      <div className="relative">
        <div className="h-2 bg-[#0c0c11]" />
        <div className="h-24" style={{ backgroundColor: tone }}>
          <div className="h-full mx-3 my-3 bg-black/15" />
        </div>
        <div className="h-3 bg-[#0c0c11]" />
      </div>
    </div>
  </div>
);

// Velvet Rope Barrier Stanchions ($e in reference)
export const StanchionRope: React.FC<{
  className?: string;
  postTone?: string;
  ropeTone?: string;
}> = ({ className = '', postTone = '#4c4b47', ropeTone = '#6b6a66' }) => (
  <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
    <div className="flex items-end gap-0">
      <span className="w-1.5 h-6 rounded-t" style={{ backgroundColor: postTone }} />
      <span className="flex-1 h-2 mb-3 rounded-full" style={{ backgroundColor: ropeTone }} />
      <span className="w-1.5 h-6 rounded-t" style={{ backgroundColor: postTone }} />
    </div>
  </div>
);

// 10-Block Proficiency Meter (rt in reference)
export const ProficiencyMeter: React.FC<{ level: number; inverted?: boolean }> = ({
  level,
  inverted = false,
}) => {
  const blocks = Math.round(level / 10);
  return (
    <div
      className="flex items-center gap-1.5"
      role="img"
      aria-label={`Proficiency ${level} out of 100`}
    >
      {Array.from({ length: 10 }).map((_, idx) => (
        <span
          key={idx}
          className={`h-4 w-2.5 rounded-[2px] transition-colors duration-300 ${
            idx < blocks
              ? inverted
                ? 'bg-black'
                : 'bg-white'
              : inverted
              ? 'bg-black/15'
              : 'bg-white/15'
          }`}
        />
      ))}
    </div>
  );
};

// Museum Multi-Layer Physical Frame (Ye / at in reference)
interface MuseumFrameProps {
  children: React.ReactNode;
  className?: string;
  captionTitle?: string;
  captionSubtitle?: string;
  captionYear?: string;
  dropShadowClass?: string;
  mouldingClass?: string;
  linerClass?: string;
  matClass?: string;
}

export const MuseumFrame: React.FC<MuseumFrameProps> = ({
  children,
  className = '',
  captionTitle,
  captionSubtitle,
  captionYear,
  dropShadowClass = 'translate-x-2.5 translate-y-2.5 bg-[#07070a]',
  mouldingClass = 'bg-[#08080b] p-2.5',
  linerClass = 'bg-[#2b2b30] p-1',
  matClass = 'bg-[#e7e5e4] p-3',
}) => (
  <figure data-push className={`w-full ${className}`}>
    <div className="relative">
      <span aria-hidden="true" className={`pointer-events-none absolute inset-0 ${dropShadowClass}`} />
      <div className={`relative ${mouldingClass}`}>
        <div className={linerClass}>
          <div className={matClass}>{children}</div>
        </div>
      </div>
    </div>
    {(captionTitle || captionSubtitle) && (
      <figcaption className="mt-3 font-grotesk">
        {captionTitle && (
          <span className="inline-block bg-[#e7e5e4] px-2.5 py-1 text-[13px] text-black/75 font-medium">
            {captionTitle}
          </span>
        )}
        <div className="flex items-center justify-between mt-1.5 text-xs text-black/60 px-0.5">
          {captionSubtitle && <span>{captionSubtitle}</span>}
          {captionYear && <span>{captionYear}</span>}
        </div>
      </figcaption>
    )}
  </figure>
);
