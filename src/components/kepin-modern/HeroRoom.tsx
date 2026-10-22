import React, { useState, useEffect } from 'react';
import { ArrowDown, Radio, Terminal, Volume2, VolumeX, ShieldCheck, MapPin, Sliders, Cpu, Activity } from 'lucide-react';
import { sound } from '@/lib/sound';

interface HeroRoomProps {
  onNavigate: (id: string) => void;
  onOpenTerminal?: () => void;
}

const PORTRAIT_OPTIONS = [
  { id: 'epuy', label: 'Frontal', src: '/epuy.webp', caption: 'Evan P. Armansyah — Bogor, ID' },
  { id: 'main', label: 'Studio', src: '/main.webp', caption: 'Creative & Technical Lead' },
  { id: 'belakang', label: 'Homelab', src: '/belakang.webp', caption: 'Systems & Infrastructure' },
];

type RenderMode = 'editorial' | 'dither' | 'crt';

export const HeroRoom: React.FC<HeroRoomProps> = ({ onNavigate, onOpenTerminal }) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [soundActive, setSoundActive] = useState(sound.enabled);
  const [renderMode, setRenderMode] = useState<RenderMode>('editorial');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Live Clock in Bogor (WIB / UTC+7)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Jakarta',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(timeStr);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleSoundClick = () => {
    const next = sound.toggle();
    setSoundActive(next);
  };

  const currentPhoto = PORTRAIT_OPTIONS[activePhotoIdx];

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className={`relative min-h-screen w-full flex flex-col justify-between pt-20 pb-10 px-4 sm:px-8 md:px-12 bg-[#060609] text-white select-none overflow-hidden z-10 transition-all duration-500 ${
        renderMode === 'crt' ? 'crt-scanlines' : ''
      }`}
    >
      {/* Background Grid & Architectural Lines */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Subtle red speed blur lines behind */}
        <div className="absolute top-1/3 -left-20 right-0 h-40 bg-gradient-to-r from-transparent via-[#ff2638]/[0.08] to-transparent blur-3xl" />
        <div className="absolute bottom-1/3 left-0 -right-20 h-40 bg-gradient-to-r from-transparent via-[#ff2638]/[0.05] to-transparent blur-3xl" />
      </div>

      {/* Experimental Render Mode Switcher Bar (Computer-Style Micro-HUD) */}
      <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-3 mb-2 font-mono text-[11px] text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="text-[#ff2638] font-bold">RENDER_MODE:</span>
          <div className="flex items-center gap-1 bg-white/5 p-0.5 border border-white/10">
            {(['editorial', 'dither', 'crt'] as RenderMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  sound.playGlitch();
                  setRenderMode(mode);
                }}
                className={`px-2 py-0.5 uppercase tracking-wider text-[10px] transition-all cursor-pointer ${
                  renderMode === mode
                    ? 'bg-[#ff2638] text-white font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[10px]">
          <span>CPU_CORE: AMD G-T48E</span>
          <span className="text-zinc-600">/</span>
          <span>ARM_V8 AMLOGIC</span>
          <span className="text-zinc-600">/</span>
          <span className="text-emerald-400">STATUS: 24/7 LOW-POWER DRAW</span>
        </div>
      </div>

      {/* Magazine Masthead Top Bar (Behance Style with Computer Diagnostics) */}
      <header className="relative z-20 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4 font-mono text-xs uppercase tracking-widest text-zinc-300">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ff2638] animate-pulse" />
          <span className="font-bold text-white tracking-widest">
            SYSTEMS &amp; ARCHITECTURE PORTFOLIO
          </span>
          <span className="hidden sm:inline text-zinc-600">//</span>
          <span className="hidden sm:inline text-zinc-400 font-mono text-[11px] bg-white/5 px-2 py-0.5 border border-white/10">
            VOL. 26 · ISSUE 01
          </span>
        </div>

        <div className="flex items-center gap-4 text-zinc-400 text-xs">
          <div className="hidden md:flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-[#ff2638]" />
            <span>BOGOR {currentTime ? `${currentTime} WIB` : 'UTC+7'}</span>
          </div>

          <span className="text-white font-bold">OCTOBER, 2026</span>

          {/* Quick Audio Toggle */}
          <button
            onClick={handleSoundClick}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white text-[10px] border border-white/15 transition-colors cursor-pointer"
            title="Toggle Tactile Audio & Ambient Sound"
          >
            {soundActive ? <Volume2 className="w-3 h-3 text-[#ff2638] animate-pulse" /> : <VolumeX className="w-3 h-3 text-zinc-500" />}
            <span className="font-mono">{soundActive ? 'SND:ON' : 'SND:OFF'}</span>
          </button>

          {/* Direct Terminal Modal Opener */}
          {onOpenTerminal && (
            <button
              onClick={() => {
                sound.playClick();
                onOpenTerminal();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-[#ff2638]/10 hover:bg-[#ff2638] text-[#ff2638] hover:text-white text-[10px] border border-[#ff2638]/40 transition-all cursor-pointer font-bold"
              title="Launch Unix Terminal Modal"
            >
              <Terminal className="w-3 h-3" />
              <span>TERMINAL ~</span>
            </button>
          )}
        </div>
      </header>

      {/* Central Magazine Cover Stage */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center items-center my-6">
        {/* The Unified Magazine Cover Box */}
        <div className="relative w-full flex items-center justify-center min-h-[380px] sm:min-h-[480px] md:min-h-[560px] lg:min-h-[620px] overflow-visible">
          {/* Layer 1: Giant Crimson Red "PORTFOLIO" Typography with 3D Parallax */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10"
            style={{
              transform: `translate3d(${mousePos.x * 14}px, ${mousePos.y * 10}px, 0)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            <h1
              className={`font-bebas text-[25vw] sm:text-[23vw] md:text-[22vw] leading-none tracking-normal uppercase transition-all duration-500 w-full text-center ${
                renderMode === 'dither'
                  ? 'text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                  : 'text-[#ff2638] drop-shadow-[0_15px_60px_rgba(255,38,56,0.5)]'
              }`}
              style={{
                textShadow:
                  renderMode === 'dither'
                    ? 'none'
                    : '0 0 80px rgba(255, 38, 56, 0.45), 0 0 160px rgba(255, 38, 56, 0.25)',
              }}
            >
              PORTFOLIO
            </h1>

            {/* Architectural Registration Mark & Crosshairs */}
            <div className="absolute top-2 left-2 font-mono text-[10px] text-zinc-600 hidden lg:block text-left">
              <span>[SYS_SPEC: 0x4173]</span>
              <br />
              <span>[GRID: +48.0 // -12.4]</span>
            </div>
            <div className="absolute top-2 right-2 font-mono text-[10px] text-zinc-600 hidden lg:block text-right">
              <span>[HOST: DELL_WYSE + HG680]</span>
              <br />
              <span>[S3: MINIO_STORAGE]</span>
            </div>
          </div>

          {/* Layer 2: Foreground Portrait Cutout Subject (Evan Pranawa Armansyah) */}
          <div
            className="relative z-20 flex flex-col items-center"
            style={{
              transform: `translate3d(${mousePos.x * -8}px, ${mousePos.y * -6}px, 0)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            {/* Subtle crimson back-lighting aura behind Evan's cutout */}
            <div className="absolute top-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#ff2638]/25 blur-3xl pointer-events-none" />

            {/* The Portrait Frame */}
            <div
              className={`relative group w-52 sm:w-72 md:w-80 lg:w-96 aspect-[3.2/4.3] overflow-hidden shadow-2xl transition-all duration-500 ease-out border border-white/20 ${
                renderMode === 'dither' ? 'dither-filter contrast-150 grayscale' : ''
              }`}
            >
              {/* The Image */}
              <img
                src={currentPhoto.src}
                alt={currentPhoto.caption}
                className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 contrast-110 brightness-100 ${
                  renderMode === 'dither' ? 'grayscale contrast-200' : ''
                }`}
              />

              {/* Seamless Dark Bottom Gradient Fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060609] via-transparent to-transparent opacity-95" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060609] opacity-60" />

              {/* Technical HUD Crosshair Overlay on Image */}
              <div className="absolute top-2 left-2 text-[#ff2638] font-mono text-xs">+</div>
              <div className="absolute top-2 right-2 text-[#ff2638] font-mono text-xs">+</div>

              <div className="absolute top-3 left-6 px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
                <span>{currentPhoto.caption}</span>
              </div>

              <div className="absolute bottom-3 right-3 font-mono text-[9px] text-zinc-400 bg-black/80 px-2 py-0.5 border border-white/10">
                6°35&apos;S 106°47&apos;E
              </div>
            </div>

            {/* Portrait Switcher Controls */}
            <div className="relative -mt-4 z-40 flex items-center gap-1 p-1 bg-black/90 backdrop-blur-md border border-white/20 shadow-xl">
              {PORTRAIT_OPTIONS.map((opt, idx) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    sound.playClick();
                    setActivePhotoIdx(idx);
                  }}
                  className={`px-3 py-0.5 text-[10px] font-mono transition-all cursor-pointer ${
                    activePhotoIdx === idx
                      ? 'bg-[#ff2638] text-white font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Layer 3: Editorial Typography Callouts (Behance Layout + Technical Micro-Labels) */}
        <div className="relative z-30 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-end mt-4 sm:mt-6 pt-4 border-t border-white/10">
          {/* Bottom Left: Bold Sans Uppercase Role */}
          <div className="flex flex-col items-start text-left space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-[2px] bg-[#ff2638]" />
              <span className="font-mono text-[11px] text-[#ff2638] uppercase tracking-widest font-bold">
                OPERATOR &bull; ENGINEERING ROLE
              </span>
            </div>
            <h2 className="font-grotesk font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase leading-tight">
              CREATIVE SYSADMIN &amp;
              <br />
              <span className="text-zinc-300">FULL-STACK ENGINEER</span>
            </h2>
            <p className="font-mono text-[11px] text-zinc-400 flex items-center gap-2 pt-0.5">
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              <span>FEDORA 41 &bull; ARMBIAN NAS &bull; MINIO S3 &bull; DOCKER</span>
            </p>
          </div>

          {/* Bottom Right: High-Fashion Italic Editorial Quote & Location */}
          <div className="flex flex-col md:items-end text-left md:text-right space-y-2">
            <blockquote className="font-instrument italic text-2xl sm:text-3xl md:text-4xl text-zinc-100 font-normal leading-snug">
              “Fluent in Code, Native in Systems”
            </blockquote>
            <div className="flex items-center md:justify-end gap-2 text-zinc-400 font-sans text-sm sm:text-base">
              <MapPin className="w-4 h-4 text-[#ff2638]" />
              <span className="italic">Bogor, West Java, Indonesia</span>
            </div>
            <div className="pt-1 flex items-center md:justify-end gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                BARE-METAL CLUSTERS ONLINE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Magazine Footer Bar & Scroll Prompter */}
      <footer className="relative z-20 max-w-7xl mx-auto w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Quick Action Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('about');
            }}
            className="px-5 py-2 bg-white text-black font-grotesk font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Article Spec</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('projects');
            }}
            className="px-5 py-2 bg-transparent hover:bg-white/10 border border-white/20 text-white font-grotesk font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Curated Works</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('audio');
            }}
            className="px-5 py-2 bg-[#ff2638]/10 hover:bg-[#ff2638] text-[#ff2638] hover:text-white border border-[#ff2638]/30 font-grotesk font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Sound Lab</span>
          </button>
        </div>

        {/* Center/Right: Technical Diagnostic Barcode & Scroll Cue */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-1 opacity-70">
            <div className="w-[1px] h-6 bg-white" />
            <div className="w-[2px] h-6 bg-white" />
            <div className="w-[1px] h-6 bg-white" />
            <div className="w-[3px] h-6 bg-white" />
            <div className="w-[1px] h-6 bg-white" />
            <div className="w-[2px] h-6 bg-white" />
            <div className="w-[4px] h-6 bg-white" />
            <span className="font-mono text-[9px] tracking-widest text-zinc-400 pl-1">
              KERNEL_6.11_BOGOR
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('about');
            }}
            className="group flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span className="tracking-widest uppercase text-[11px]">SCROLL TO EXPLORE</span>
            <div className="w-6 h-6 border border-white/20 flex items-center justify-center group-hover:border-[#ff2638] group-hover:bg-[#ff2638]/20 transition-all">
              <ArrowDown className="w-3.5 h-3.5 text-white group-hover:translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </footer>

      {/* Experimental CRT Scanline Styling */}
      <style>{`
        .crt-scanlines::before {
          content: " ";
          display: block;
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.04));
          z-index: 40;
          background-size: 100% 4px, 6px 100%;
          pointer-events: none;
        }
        .dither-filter {
          image-rendering: pixelated;
        }
      `}</style>
    </section>
  );
};
