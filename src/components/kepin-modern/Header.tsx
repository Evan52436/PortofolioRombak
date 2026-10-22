import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Terminal, Radio } from 'lucide-react';
import { sound } from '@/lib/sound';

interface HeaderProps {
  activeSection: string;
  isDark: boolean;
  onNavigate: (id: string) => void;
  onOpenTerminal?: () => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Cover' },
  { id: 'about', label: 'Profile' },
  { id: 'skills', label: 'Rack' },
  { id: 'audio', label: 'Audio' },
  { id: 'projects', label: 'Works' },
  { id: 'certificates', label: 'Honors' },
  { id: 'contact', label: 'Dispatch' },
];

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenTerminal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const next = sound.toggle();
    setSoundEnabled(next);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#060609]/95 py-3 text-white border-b border-white/10 backdrop-blur-xl shadow-2xl'
            : 'bg-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Left: Brand Monogram */}
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('hero');
            }}
            className="flex items-center gap-3 group text-left cursor-pointer"
            aria-label="Evan Pranawa Armansyah — Home"
          >
            <div className="w-8 h-8 rounded-none border border-white/20 group-hover:border-[#ff2638] flex items-center justify-center font-bebas text-sm transition-all duration-300 group-hover:scale-105 bg-white/5 text-white">
              EP
            </div>
            <div>
              <h4 className="font-grotesk font-bold text-xs sm:text-sm leading-tight tracking-wide text-white group-hover:text-[#ff2638] transition-colors">
                Evan Pranawa Armansyah
              </h4>
              <p className="text-[10px] font-mono tracking-wider text-zinc-400">
                SysAdmin &bull; Full-Stack &bull; Audio
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 font-mono text-[11px] uppercase tracking-wider">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    onNavigate(item.id);
                  }}
                  className={`relative py-1 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#ff2638]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Sound button, Terminal trigger & Mobile hamburger */}
          <div className="flex items-center gap-2.5">
            {onOpenTerminal && (
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onOpenTerminal();
                }}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider border border-white/20 hover:border-[#ff2638] bg-white/5 hover:bg-[#ff2638]/20 text-white transition-all cursor-pointer"
                title="Open Terminal Emulator (~)"
              >
                <Terminal size={12} className="text-[#ff2638]" />
                <span>TERMINAL</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleSoundToggle}
              title={soundEnabled ? 'Mute acoustics' : 'Enable acoustics'}
              aria-label="Toggle acoustic sound"
              className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider border cursor-pointer transition-all ${
                soundEnabled
                  ? 'bg-[#ff2638]/20 border-[#ff2638] text-[#ff2638] shadow-md shadow-[#ff2638]/20'
                  : 'bg-white/5 border-white/15 text-zinc-400 hover:text-white'
              }`}
            >
              {soundEnabled ? (
                <>
                  <Volume2 size={12} className="text-[#ff2638] animate-pulse" />
                  <span className="hidden md:inline">AUDIO: ON</span>
                </>
              ) : (
                <>
                  <VolumeX size={12} className="opacity-60" />
                  <span className="hidden md:inline">AUDIO: OFF</span>
                </>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setMobileOpen((prev) => !prev);
              }}
              className="lg:hidden p-1.5 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 bg-[#060609]/95 backdrop-blur-2xl flex flex-col justify-center items-center px-6 lg:hidden select-none"
        >
          <nav className="flex flex-col items-center gap-5 font-bebas text-4xl uppercase tracking-wider text-center">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  setMobileOpen(false);
                  onNavigate(item.id);
                }}
                className={`transition-colors cursor-pointer ${
                  activeSection === item.id ? 'text-[#ff2638]' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};
