import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Terminal, Radio } from 'lucide-react';
import { sound } from '@/lib/sound';

interface NavbarProps {
  activeSection: string;
  isDark: boolean;
  onNavigate: (id: string) => void;
  onOpenTerminal?: () => void;
}

const SECTIONS = [
  { id: 'hero', numeral: 'I', label: 'Exordivm / Hero' },
  { id: 'about', numeral: 'II', label: 'Philosophia / About' },
  { id: 'infrastructure', numeral: 'III', label: 'Systema / Homelab' },
  { id: 'projects', numeral: 'IV', label: 'Opera / Projects' },
  { id: 'experience', numeral: 'V', label: 'Praxis / Experience' },
  { id: 'contact', numeral: 'VI', label: 'Epistvla / Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  isDark,
  onNavigate,
  onOpenTerminal,
}) => {
  const [soundOn, setSoundOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Jakarta',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const next = sound.toggle();
    setSoundOn(next);
  };

  const currentSectionMeta = SECTIONS.find((s) => s.id === activeSection) || SECTIONS[0];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 backdrop-blur-md ${
          isDark
            ? 'bg-[#09090e]/80 text-[#f0f0f4] border-b border-[#ffffff12]'
            : 'bg-[#c4c3b6]/80 text-[#0e0f13] border-b border-[#00000014]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Brand & Roman Identifier */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('hero');
              }}
              className="flex items-center gap-2 group text-left"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-classical font-bold text-xs tracking-wider border transition-all ${
                  isDark
                    ? 'border-[#ffffff25] group-hover:border-[#b89047] text-[#f4f2ea]'
                    : 'border-[#00000025] group-hover:border-[#000000] text-[#0e0f13]'
                }`}
              >
                EP
              </div>
              <div className="hidden sm:block">
                <span className="font-classical text-xs tracking-widest font-semibold block leading-tight">
                  EVAN PRANAWA
                </span>
                <span className="font-mono text-[10px] tracking-wider text-muted-foreground opacity-75">
                  SYSADMIN & DEV
                </span>
              </div>
            </button>

            {/* Current Section Marker */}
            <div
              className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border ${
                isDark
                  ? 'border-[#ffffff15] bg-[#ffffff08] text-[#d4a359]'
                  : 'border-[#00000015] bg-[#00000006] text-[#715c2d]'
              }`}
            >
              <span className="font-classical font-semibold">
                {currentSectionMeta.numeral}.
              </span>
              <span className="uppercase tracking-wider">
                {currentSectionMeta.id}
              </span>
            </div>
          </div>

          {/* Telemetry (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="tracking-wider opacity-85">HOMELAB: ONLINE</span>
            </div>
            <div className="opacity-40">|</div>
            <div className="flex items-center gap-1.5 opacity-80">
              <Radio className="w-3.5 h-3.5 text-amber-500" />
              <span>BOGOR, ID [UTC+7] · {timeStr}</span>
            </div>
          </div>

          {/* Actions & Navigation Links */}
          <div className="flex items-center gap-3">
            {/* Terminal Trigger */}
            {onOpenTerminal && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenTerminal();
                }}
                title="Open Homelab Terminal Console"
                className={`p-2 rounded-full border transition-all ${
                  isDark
                    ? 'border-[#ffffff18] hover:bg-[#ffffff10] text-[#d4a359]'
                    : 'border-[#00000018] hover:bg-[#0000000a] text-[#7a5c28]'
                }`}
              >
                <Terminal className="w-4 h-4" />
              </button>
            )}

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              title={soundOn ? 'Mute acoustic audio' : 'Enable acoustic audio'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-mono text-xs transition-all ${
                isDark
                  ? 'border-[#ffffff18] hover:bg-[#ffffff10]'
                  : 'border-[#00000018] hover:bg-[#0000000a]'
              } ${soundOn ? 'text-amber-400 border-amber-400/40' : 'opacity-70'}`}
            >
              {soundOn ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">AUDIO ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">AUDIO OFF</span>
                </>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className={`md:hidden p-2 rounded-full border ${
                isDark
                  ? 'border-[#ffffff18] hover:bg-[#ffffff10]'
                  : 'border-[#00000018] hover:bg-[#0000000a]'
              }`}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            {/* Desktop Navigation Dots / Jump */}
            <nav className="hidden md:flex items-center gap-1 ml-2">
              {SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    sound.playClick();
                    onNavigate(sec.id);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                    activeSection === sec.id
                      ? isDark
                        ? 'bg-[#ffffff15] text-[#f4f2ea] font-medium'
                        : 'bg-[#00000015] text-[#0e0f13] font-medium'
                      : isDark
                      ? 'opacity-50 hover:opacity-100 hover:text-[#f4f2ea]'
                      : 'opacity-50 hover:opacity-100 hover:text-[#0e0f13]'
                  }`}
                >
                  {sec.id}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-30 md:hidden pt-20 px-6 backdrop-blur-xl transition-all ${
            isDark ? 'bg-[#09090e]/95 text-[#f0f0f4]' : 'bg-[#c4c3b6]/95 text-[#0e0f13]'
          }`}
        >
          <div className="space-y-4 py-8">
            <div className="font-mono text-xs opacity-60 uppercase tracking-widest mb-6">
              INDEX RERVM // SECTIONS
            </div>
            {SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => {
                  sound.playClick();
                  onNavigate(sec.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left py-3 px-4 rounded-xl border flex items-center justify-between font-mono text-sm uppercase transition-all ${
                  activeSection === sec.id
                    ? isDark
                      ? 'border-[#d4a359] bg-[#d4a359]/10 text-[#d4a359]'
                      : 'border-[#000000] bg-[#000000]/05 font-bold'
                    : isDark
                    ? 'border-[#ffffff12] text-[#f0f0f4]/70'
                    : 'border-[#00000015] text-[#0e0f13]/70'
                }`}
              >
                <span>{sec.label}</span>
                <span className="font-classical opacity-50">{sec.numeral}</span>
              </button>
            ))}

            <div className="pt-8 border-t border-current/10 font-mono text-xs space-y-2 opacity-75">
              <div>BOGOR, INDONESIA · UTC+7</div>
              <div>CLUSTER: DELL WYSE 5010 & HG680-P NAS</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
