import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import {
  ArrowUpRight,
  ArrowDownRight,
  Github,
  Copy,
  Check,
  Terminal,
  Plus,
  Eye,
  Send,
  Folder,
  Cpu,
  Disc,
  Shield,
  Server,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';
import { projects } from './lib/data';
import { TerminalModal } from './components/modern/TerminalModal';

interface LightboxData {
  title: string;
  sub: string;
  image: string;
  desc?: string;
  url?: string;
}

const HONORS = [
  {
    id: '01',
    code: 'CTF_FINALIST',
    title: 'Top 10 Clash of Cyberheist',
    org: 'MyDigiLearn × HackerRank',
    year: '2025',
    img: '/sertifkelompok.webp',
    desc: 'Top 10 finalist in province-level cybersecurity competition (cryptography, web exploitation, reverse engineering).',
  },
  {
    id: '02',
    code: 'AI_INNOVATION',
    title: 'AI Open Innovation Finalist',
    org: 'President University × TÜV NORD',
    year: '2025',
    img: '/lombah1.webp',
    desc: 'Backend & computer-vision pipeline for real-time PPE compliance monitoring.',
  },
  {
    id: '03',
    code: 'SYS_INFRA',
    title: 'JHIC National Web Finalist',
    org: 'Jagoan Hosting Indonesia',
    year: '2025',
    img: '/jhic1.webp',
    desc: 'System Administrator & PM maintaining 100% server stability across national elimination rounds.',
  },
  {
    id: '04',
    code: 'S3_ARCHITECT',
    title: 'Project Owner: Decoupled S3',
    org: 'Wikrama RPL Showcase',
    year: '2025',
    img: '/depakto.webp',
    desc: 'Lead architect for decoupled MinIO S3 object storage running on an Armbian Linux NAS.',
  },
  {
    id: '05',
    code: 'NET_SEC',
    title: 'Capture The Flag (CTF) Intro',
    org: 'ID-Networkers',
    year: '2024',
    img: '/ctf intro.webp',
    desc: 'Offensive & defensive protocol analysis, packet sniffing, and Linux privilege escalation.',
  },
  {
    id: '06',
    code: 'IT_INTERN',
    title: 'IT Infrastructure Internship',
    org: 'School of Universe IT Dept',
    year: '2024',
    img: '/sou.webp',
    desc: 'Physical network cabling, bare-metal Linux deployments, and campus hardware operations.',
  },
];

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [coords, setCoords] = useState({ x: 417, y: 300 });
  const [scrollPct, setScrollPct] = useState(0);
  const [clock, setClock] = useState('15:45:00 WIB');
  const [activeProject, setActiveProject] = useState(0);
  const [activeShotIdx, setActiveShotIdx] = useState<Record<string, number>>({});
  const [lightbox, setLightbox] = useState<LightboxData | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  // Smooth scroll
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, autoRaf: true });
    return () => lenis.destroy();
  }, []);

  // Mouse coordinates + scroll percentage for the CAD/OS viewport HUD
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Live Bogor clock
  useEffect(() => {
    const update = () => {
      setClock(
        new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' WIB'
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Terminal shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || '')) return;
        e.preventDefault();
        setTerminalOpen((p) => !p);
      } else if (e.key === 'Escape') {
        setLightbox(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('evanpranawa@ackteams.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const bgMain = darkMode ? 'bg-[#0b0b0e] text-[#eae6df]' : 'bg-[#eae6df] text-[#0d0d0d]';
  const borderCol = darkMode ? 'border-[#eae6df]/25' : 'border-[#0d0d0d]';
  const cardBg = darkMode ? 'bg-[#131318]' : 'bg-[#f4f1ea]';
  const hardShadow = darkMode
    ? 'shadow-[6px_6px_0px_#89abd2]'
    : 'shadow-[6px_6px_0px_#0d0d0d]';

  return (
    <div
      className={`min-h-screen ${bgMain} selection:bg-[#89abd2] selection:text-[#0d0d0d] transition-colors duration-300 font-sans overflow-x-hidden`}
    >
      {/* =====================================================================
          FIXED TOP OS / ZINE SYSTEM BAR (Clear Human-Readable Navigation)
      ====================================================================== */}
      <header
        className={`fixed top-0 inset-x-0 z-50 h-10 ${
          darkMode ? 'bg-[#0b0b0e]/95' : 'bg-[#eae6df]/95'
        } backdrop-blur-md border-b-2 ${borderCol} px-3 sm:px-5 flex items-center justify-between font-mono text-[11px] tracking-wider select-none whitespace-nowrap`}
      >
        {/* Left: Clear Brand Identity */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => jump('hero')}
            className="px-2 py-0.5 bg-[#89abd2] text-[#0d0d0d] border border-[#0d0d0d] font-bold cursor-pointer"
          >
            EVAN.P
          </button>
          <span className="font-bold hidden sm:inline">EVAN PRANAWA</span>
          <span className="hidden 2xl:inline opacity-60 text-[10px]">
            // SYSADMIN &amp; DEV
          </span>
        </div>

        {/* Center: Clear Human-Understandable Navigation Tabs */}
        <nav className="hidden lg:flex items-center h-full shrink-0">
          {[
            { id: 'hero', label: '01 / Home' },
            { id: 'dossier', label: '02 / About' },
            { id: 'works', label: '03 / Projects' },
            { id: 'rack', label: '04 / Homelab' },
            { id: 'honors', label: '05 / Awards' },
            { id: 'dispatch', label: '06 / Contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => jump(item.id)}
              className={`h-full px-3 xl:px-4 border-l ${borderCol} hover:bg-[#89abd2] hover:text-[#0d0d0d] font-bold uppercase transition-colors cursor-pointer whitespace-nowrap`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Self-Explanatory Controls (Legacy Site, Terminal, Theme Switch, Scroll %) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="hidden 2xl:inline opacity-75 text-[10px]">{clock}</span>
          <a
            href="https://legacy.evanpranawa.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-2.5 py-1 border ${borderCol} ${cardBg} hover:bg-[#89abd2] hover:text-[#0d0d0d] font-bold transition-colors flex items-center gap-1 whitespace-nowrap`}
            title="Visit Legacy Portfolio (legacy.evanpranawa.my.id)"
          >
            <span>LEGACY SITE</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <button
            onClick={() => setTerminalOpen(true)}
            className={`px-2.5 py-1 border ${borderCol} bg-[#0d0d0d] text-[#eae6df] hover:bg-[#89abd2] hover:text-[#0d0d0d] font-bold cursor-pointer transition-colors whitespace-nowrap`}
            title="Open Interactive Linux Terminal"
          >
            &gt;_ TERMINAL
          </button>
          <button
            onClick={() => setDarkMode((d) => !d)}
            className={`px-2.5 py-1 border ${borderCol} ${
              darkMode ? 'bg-[#eae6df] text-black' : 'bg-[#89abd2] text-[#0d0d0d]'
            } font-bold cursor-pointer flex items-center gap-1.5 whitespace-nowrap`}
            title="Toggle Light / Dark Theme"
          >
            {darkMode ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            <span>{darkMode ? 'LIGHT' : 'DARK'}</span>
          </button>
          <span
            className="px-2 py-1 bg-[#0d0d0d] text-[#89abd2] font-bold hidden xl:inline text-[10px]"
            title="Page Scroll Progress"
          >
            {String(scrollPct).padStart(3, '0')}%
          </span>
        </div>
      </header>

      {/* =====================================================================
          01 // VIEWPORT-LOCKED HERO SPREAD (Fits 80%–150% Scaling Cleanly)
      ====================================================================== */}
      <section
        id="hero"
        className="pt-10 lg:h-screen lg:min-h-[560px] flex flex-col justify-between overflow-hidden"
      >
        {/* Top Metadata Strip */}
        <div
          className={`shrink-0 border-b-2 ${borderCol} px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-[11px] uppercase`}
        >
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 bg-[#5b82b0] animate-ping" />
            <span className="font-bold">
              BOGOR, INDONESIA (6°35′S 106°47′E) — BARE-METAL CLUSTERS ONLINE
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>PORTFOLIO // 2026</span>
            <span className="font-bold text-[#4e739e]">LINUX &amp; INFRASTRUCTURE</span>
          </div>
        </div>

        {/* Main 12-Col Brutalist Architectural Grid (Fills remaining viewport height) */}
        <div
          className={`flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 border-b-2 ${borderCol}`}
        >
          {/* Left 7 Cols: Viewport-Proportional Typography & Editorial Manifesto */}
          <div
            className={`lg:col-span-7 p-4 sm:p-6 lg:px-[3vw] lg:py-[clamp(0.75rem,2vh,1.75rem)] border-b-2 lg:border-b-0 lg:border-r-2 ${borderCol} flex flex-col justify-between relative overflow-hidden min-h-0`}
          >
            {/* Subtle Halftone Dot Pattern in corner */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 w-56 h-56 opacity-25"
              style={{
                backgroundImage: 'radial-gradient(#5b82b0 2px, transparent 2px)',
                backgroundSize: '12px 12px',
              }}
            />

            {/* Top Editorial Tag */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <span className="px-2.5 py-0.5 bg-[#0d0d0d] text-[#eae6df] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
                SYSADMIN &amp; INFRASTRUCTURE ARCHITECT
              </span>
              <span
                className={`px-2.5 py-0.5 border-2 ${borderCol} bg-[#89abd2]/25 font-mono text-[10px] sm:text-[11px] font-bold uppercase`}
              >
                RPL &amp; CYBERSECURITY
              </span>
            </div>

            {/* Giant Stacked Display Headline + Straight Quote Below */}
            <div className="relative z-10 my-auto py-1">
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#4e739e] font-bold mb-0.5">
                // PORTFOLIO OF
              </div>
              <h1 className="font-bebas text-[18vw] sm:text-[13vw] lg:text-[min(8vw,12.5vh)] leading-[0.82] tracking-tight uppercase">
                EVAN
                <br />
                <span className="inline-block bg-[#89abd2] text-[#0d0d0d] border-2 border-[#0d0d0d] px-2.5 sm:px-4 py-0.5 mt-0.5 -rotate-1 shadow-[4px_4px_0px_#0d0d0d]">
                  PRANAWA
                </span>
                <span className="block mt-1.5">ARMANSYAH.</span>
              </h1>
              <blockquote className="mt-2.5 lg:mt-[clamp(0.5rem,1.5vh,1.25rem)] font-instrument italic text-xl sm:text-2xl lg:text-[clamp(1.25rem,2.4vh,1.85rem)] leading-[1.1] max-w-2xl">
                “Native in Linux systems, bare-metal servers &amp; network architecture.”
              </blockquote>
            </div>

            {/* Full-Width Stacked Action Buttons */}
            <div className="pt-2.5 border-t-2 border-dashed border-current/30 flex flex-col gap-2 shrink-0 font-mono text-xs sm:text-sm">
              <button
                onClick={() => jump('works')}
                className={`w-full px-5 py-2.5 lg:py-[clamp(0.55rem,1.3vh,0.95rem)] bg-[#89abd2] hover:bg-[#789ac1] text-[#0d0d0d] font-bold uppercase tracking-[0.2em] border-2 border-[#0d0d0d] shadow-[4px_4px_0px_#0d0d0d] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-between cursor-pointer`}
              >
                <span>01 // EXPLORE PROJECTS &amp; SYSTEMS</span>
                <ArrowDownRight className="w-4 h-4 shrink-0" />
              </button>
              <button
                onClick={() => setTerminalOpen(true)}
                className={`w-full px-5 py-2.5 lg:py-[clamp(0.55rem,1.3vh,0.95rem)] ${cardBg} font-bold uppercase tracking-[0.2em] border-2 ${borderCol} shadow-[4px_4px_0px_#0d0d0d] hover:bg-[#0d0d0d] hover:text-white transition-colors flex items-center justify-between cursor-pointer`}
              >
                <span>02 // OPEN INTERACTIVE TERMINAL (~)</span>
                <Terminal className="w-4 h-4 text-[#4e739e] shrink-0" />
              </button>
            </div>
          </div>

          {/* Right 5 Cols: Viewport-Proportional OS Windows (Zero Overflow on 125–150% Zoom) */}
          <div
            className={`lg:col-span-5 p-4 sm:p-5 lg:px-[2vw] lg:py-[2vh] ${
              darkMode ? 'bg-[#121217]' : 'bg-[#dcd7cd]'
            } flex flex-col justify-between gap-3 relative overflow-hidden min-h-0`}
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          >
            {/* OS Window 01: Night View Main Window (Flex-1 so it scales with viewport height) */}
            <div
              className={`border-2 border-[#0d0d0d] bg-[#f4f1ea] text-[#0d0d0d] shadow-[4px_4px_0px_#0d0d0d] relative z-20 flex-1 min-h-[180px] flex flex-col overflow-hidden`}
            >
              {/* Window Title Bar */}
              <div className="shrink-0 bg-[#0d0d0d] text-[#eae6df] px-3 py-1 flex items-center justify-between font-mono text-[10px] font-bold">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2 h-2 bg-[#89abd2] inline-block shrink-0" />
                  <span className="truncate">Night_View.png — [1000×1000px]</span>
                </div>
                <span className="px-1.5 bg-[#89abd2] text-[#0d0d0d] font-bold text-[9px] shrink-0">
                  RAW
                </span>
              </div>

              {/* Image Content (Clean unobstructed photo) */}
              <div className="relative flex-1 min-h-0 w-full overflow-hidden border-b-2 border-[#0d0d0d] bg-black">
                <img
                  src="/main.webp"
                  alt="Night skyline silhouette"
                  className="w-full h-full object-cover object-center contrast-115"
                />
              </div>

              {/* Window Status Bar */}
              <div className="shrink-0 px-3 py-1 flex items-center justify-between font-mono text-[10px] bg-[#eae6df]">
                <span className="font-bold">BOGOR, INDONESIA</span>
                <span className="text-[#4e739e] font-bold">ARCH · FEDORA · ARMBIAN</span>
              </div>
            </div>

            {/* OS Window 02: Compact Bottom Row (5-Laptop Fleet + Hardware Status) */}
            <div className="shrink-0 grid grid-cols-1 sm:grid-cols-12 gap-3 items-stretch relative z-30 lg:h-[19vh] lg:min-h-[120px] lg:max-h-[168px]">
              <div
                className={`sm:col-span-5 border-2 border-[#0d0d0d] bg-[#0d0d0d] text-white shadow-[4px_4px_0px_#0d0d0d] overflow-hidden flex flex-col`}
              >
                <div className="shrink-0 px-2.5 py-1 bg-[#89abd2] text-[#0d0d0d] font-mono text-[9px] font-bold flex justify-between">
                  <span>Archpad_Fleet.png</span>
                  <span>5× NODES</span>
                </div>
                <div className="flex-1 min-h-0 w-full overflow-hidden">
                  <img
                    src="/belakang.webp"
                    alt="Evan sitting cross-legged with 5 Linux laptops"
                    className="w-full h-full object-cover contrast-110"
                  />
                </div>
              </div>

              {/* Live Hardware Daemon Readout Box */}
              <div
                className={`sm:col-span-7 border-2 border-[#0d0d0d] bg-[#0d0d0d] text-[#eae6df] p-2.5 sm:p-3 font-mono text-[10px] shadow-[4px_4px_0px_#0d0d0d] flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between border-b border-white/20 pb-1 text-[#89abd2] font-bold">
                  <span>$ systemctl status homelab</span>
                  <span>● ONLINE</span>
                </div>
                <div className="space-y-1 my-1 text-[10px] text-zinc-300">
                  <div className="flex justify-between gap-2">
                    <span className="text-zinc-500">GATEWAY:</span>
                    <span className="text-white font-bold truncate">Dell Wyse 5010 (Fedora)</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-zinc-500">STORAGE:</span>
                    <span className="text-[#89abd2] font-bold truncate">HG680-P (MinIO S3 NAS)</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-zinc-500">ACOUSTICS:</span>
                    <span className="text-white truncate">Live FOH &amp; DAW</span>
                  </div>
                </div>
                <div className="text-[8.5px] text-zinc-500 border-t border-white/15 pt-1 flex justify-between">
                  <span>14W CLUSTER</span>
                  <span className="text-[#89abd2]">TAILSCALE MESH</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 4-Cell Brutalist Metric Bar (Locked inside bottom of Hero Viewport) */}
        <div
          className={`shrink-0 grid grid-cols-2 lg:grid-cols-4 border-b-2 ${borderCol} divide-y-2 lg:divide-y-0 lg:divide-x-2 ${
            darkMode ? 'divide-[#eae6df]/25' : 'divide-[#0d0d0d]'
          }`}
        >
          <div className="px-4 py-2.5 sm:px-6 lg:py-[1.6vh] bg-[#89abd2] text-[#0d0d0d] flex items-center justify-between">
            <div>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest font-bold block opacity-80">
                // BARE-METAL NODES
              </span>
              <span className="font-grotesk text-xs sm:text-sm font-bold uppercase mt-0.5 block">
                24/7 Linux Cluster
              </span>
            </div>
            <span className="font-bebas text-4xl sm:text-5xl lg:text-[min(3.5vw,5.2vh)] leading-none">
              02
            </span>
          </div>

          <div className="px-4 py-2.5 sm:px-6 lg:py-[1.6vh] flex items-center justify-between">
            <div>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#4e739e] font-bold block">
                // PRODUCTION BUILDS
              </span>
              <span className="font-grotesk text-xs sm:text-sm font-bold uppercase mt-0.5 block">
                S3 &amp; Web Systems
              </span>
            </div>
            <span className="font-bebas text-4xl sm:text-5xl lg:text-[min(3.5vw,5.2vh)] leading-none">
              08
            </span>
          </div>

          <div className="px-4 py-2.5 sm:px-6 lg:py-[1.6vh] flex items-center justify-between">
            <div>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#4e739e] font-bold block">
                // CYBERSECURITY
              </span>
              <span className="font-grotesk text-xs sm:text-sm font-bold uppercase mt-0.5 block">
                Cyberheist Finalist
              </span>
            </div>
            <span className="font-bebas text-4xl sm:text-5xl lg:text-[min(3.5vw,5.2vh)] leading-none">
              T10
            </span>
          </div>

          <div className="px-4 py-2.5 sm:px-6 lg:py-[1.6vh] bg-[#0d0d0d] text-[#eae6df] flex items-center justify-between">
            <div>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#89abd2] font-bold block">
                // ACCREDITATIONS
              </span>
              <span className="font-grotesk text-xs sm:text-sm font-bold uppercase mt-0.5 block">
                Verified Awards
              </span>
            </div>
            <span className="font-bebas text-4xl sm:text-5xl lg:text-[min(3.5vw,5.2vh)] leading-none text-[#89abd2]">
              06+
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          02 // ABOUT ME — MINIMAL, VISUAL & SCANNABLE SPREAD
      ====================================================================== */}
      <section id="dossier" className={`border-b-2 ${borderCol}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left 5 Cols: Clean Portrait Window */}
          <div
            className={`lg:col-span-5 p-6 sm:p-10 lg:p-[3.2vw] border-b-2 lg:border-b-0 lg:border-r-2 ${borderCol} ${
              darkMode ? 'bg-[#121217]' : 'bg-[#dcd7cd]'
            } flex flex-col justify-center`}
          >
            <div className={`border-2 border-[#0d0d0d] bg-white text-black ${hardShadow} max-w-md mx-auto w-full`}>
              <div className="bg-[#0d0d0d] text-white px-3.5 py-2 font-mono text-[11px] font-bold flex justify-between">
                <span>DevFest_Portrait.png</span>
                <span className="text-[#89abd2]">BOGOR, ID</span>
              </div>
              <div className="aspect-[5/4] w-full overflow-hidden border-b-2 border-[#0d0d0d]">
                <img
                  src="/epuy.webp"
                  alt="Evan Pranawa at Google Developer Group DevFest"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-3.5 py-2 font-mono text-[11px] flex justify-between items-center bg-[#f4f1ea]">
                <span className="font-bold">GDG DEVFEST // ALAM SUTERA</span>
                <span className="px-2 py-0.5 bg-[#89abd2] text-[#0d0d0d] border border-[#0d0d0d] font-bold text-[10px]">
                  SYSADMIN
                </span>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Concise Bio + 4 Visual Capability Tiles (No Text Walls) */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-[3.8vw] flex flex-col justify-between gap-8">
            <div className="space-y-4">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#4e739e]">
                // 02 — ABOUT ME
              </div>
              <h2 className="font-bebas text-6xl sm:text-7xl lg:text-[clamp(3.8rem,5.8vw,6rem)] leading-[0.84] uppercase">
                HELLO, I&apos;M{' '}
                <span className="inline-block bg-[#89abd2] text-[#0d0d0d] border-2 border-[#0d0d0d] px-3 pt-0.5 shadow-[4px_4px_0px_#0d0d0d]">
                  EVAN.
                </span>
              </h2>
              <p className="font-grotesk text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed max-w-2xl opacity-90 pt-1">
                Junior System Administrator based in Bogor, Indonesia, majoring in Software Engineering &amp; Cybersecurity. I build bare-metal homelab servers, self-hosted S3 storage, and network infrastructure — alongside live event audio engineering and DAW production.
              </p>
            </div>

            {/* 4 Compact Visual Focus Cards (Zero Paragraph Clutter) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                {
                  id: '01',
                  title: 'Linux & Bare-Metal',
                  tags: 'Fedora 41 · Armbian · Docker · Nginx',
                  icon: Server,
                },
                {
                  id: '02',
                  title: 'Storage & Systems',
                  tags: 'MinIO S3 · NAS · Tailscale · Cloudflare',
                  icon: Cpu,
                },
                {
                  id: '03',
                  title: 'Cybersecurity & CTF',
                  tags: 'Top 10 Cyberheist · Wireshark · Nmap',
                  icon: Shield,
                },
                {
                  id: '04',
                  title: 'Live Sound & DAW',
                  tags: 'Event FOH · Ableton Live · Studio One',
                  icon: Disc,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className={`p-4 border-2 ${borderCol} ${cardBg} shadow-[4px_4px_0px_#0d0d0d] flex flex-col justify-between gap-2`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-[#89abd2] text-[#0d0d0d] border border-[#0d0d0d] font-mono text-[10px] font-bold">
                        {item.id}
                      </span>
                      <Icon className="w-4 h-4 text-[#4e739e]" />
                    </div>
                    <div>
                      <h3 className="font-grotesk text-base sm:text-lg font-bold uppercase">
                        {item.title}
                      </h3>
                      <p className="font-mono text-[11px] opacity-75 mt-0.5">{item.tags}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          03 // SELECTED WORKS — SINGLE-VIEWPORT INTERACTIVE .AppImage WORKBENCH
      ====================================================================== */}
      <section id="works" className={`border-b-2 ${borderCol}`}>
        {/* Compact Section Header */}
        <div
          className={`px-4 sm:px-8 py-6 border-b-2 ${borderCol} flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0d0d0d] text-[#eae6df]`}
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#89abd2] font-bold block mb-1">
              // 03 — FEATURED PROJECTS
            </span>
            <h2 className="font-bebas text-5xl sm:text-7xl leading-[0.85] uppercase">
              SELECTED <span className="text-[#89abd2]">WORKS.</span>
            </h2>
          </div>
          <span className="font-mono text-xs text-zinc-400">
            SELECT A PROJECT BELOW TO INSPECT APPLICATION &amp; SCREENSHOTS
          </span>
        </div>

        {/* Interactive Workbench: Left Project Selector + Right Active .AppImage Window */}
        {(() => {
          const proj = projects[activeProject] || projects[0];
          const gallery =
            proj.gallery && proj.gallery.length > 0 ? proj.gallery : [proj.image];
          const shotIdx = activeShotIdx[proj.id] || 0;
          const currentShot = gallery[shotIdx] || proj.image;
          const appImageName = `${proj.title.replace(/\s+/g, '_')}.AppImage`;

          return (
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left 5 Cols: Project Directory List + Active Project Summary */}
              <div
                className={`lg:col-span-5 p-5 sm:p-8 lg:p-[2.5vw] border-b-2 lg:border-b-0 lg:border-r-2 ${borderCol} flex flex-col justify-between gap-6`}
              >
                {/* Clickable Project Tabs */}
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  {projects.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveProject(idx)}
                      className={`px-3 py-2.5 border-2 text-left transition-all cursor-pointer font-bold uppercase flex items-center gap-2 truncate ${
                        activeProject === idx
                          ? 'bg-[#89abd2] text-[#0d0d0d] border-[#0d0d0d] shadow-[3px_3px_0px_#0d0d0d]'
                          : `${cardBg} ${borderCol} opacity-75 hover:opacity-100`
                      }`}
                    >
                      <Folder className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">
                        0{idx + 1} · {p.title}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Active Project Details (Minimal & Clean) */}
                <div className="my-auto py-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-bebas text-6xl sm:text-7xl leading-none text-[#5b82b0]">
                      0{activeProject + 1}
                    </span>
                    <h3 className="font-bebas text-4xl sm:text-5xl leading-[0.88] uppercase">
                      {proj.title}
                    </h3>
                  </div>

                  <p className="mt-3 font-grotesk text-base sm:text-lg font-medium leading-relaxed opacity-90">
                    {proj.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 bg-[#0d0d0d] text-[#eae6df] font-mono text-[11px] font-bold uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Active Project Links */}
                <div className="pt-4 border-t-2 border-current/20 flex flex-wrap gap-3 font-mono text-xs">
                  {proj.url && proj.url !== '#' && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-[#89abd2] hover:bg-[#789ac1] text-[#0d0d0d] font-bold uppercase tracking-wider border-2 border-[#0d0d0d] shadow-[4px_4px_0px_#0d0d0d] flex items-center gap-2"
                    >
                      <span>LIVE DEMO</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2.5 ${cardBg} font-bold uppercase tracking-wider border-2 ${borderCol} hover:bg-[#0d0d0d] hover:text-white transition-colors flex items-center gap-2`}
                    >
                      <Github className="w-4 h-4" />
                      <span>SOURCE CODE</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right 7 Cols: Active .AppImage Window */}
              <div
                className={`lg:col-span-7 p-5 sm:p-8 lg:p-[2.5vw] ${
                  darkMode ? 'bg-[#0e0e13]' : 'bg-[#ded9ce]'
                } flex flex-col justify-center`}
              >
                <div className={`border-2 border-[#0d0d0d] bg-[#0d0d0d] text-white ${hardShadow}`}>
                  <div className="px-3.5 py-2 bg-[#0d0d0d] border-b-2 border-white/20 flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2.5 h-2.5 bg-[#89abd2] inline-block shrink-0" />
                      <span className="w-2.5 h-2.5 bg-[#dfe7f2] inline-block shrink-0" />
                      <span className="font-bold ml-1 truncate">
                        {appImageName} — FRAME 0{shotIdx + 1}/0{gallery.length}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        setLightbox({
                          title: proj.title,
                          sub: proj.technologies.join(' · '),
                          image: currentShot.imageUrl,
                          desc: proj.description,
                          url: proj.url,
                        })
                      }
                      className="px-2 py-0.5 bg-[#89abd2] text-[#0d0d0d] text-[10px] font-bold cursor-pointer shrink-0"
                    >
                      FULLSCREEN ↗
                    </button>
                  </div>

                  <div
                    onClick={() =>
                      setLightbox({
                        title: proj.title,
                        sub: proj.technologies.join(' · '),
                        image: currentShot.imageUrl,
                        desc: proj.description,
                        url: proj.url,
                      })
                    }
                    className="relative aspect-[16/10] max-h-[56vh] w-full bg-black overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={currentShot.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>

                  {gallery.length > 1 && (
                    <div className="p-2.5 bg-[#14141b] border-t border-white/15 flex items-center gap-2 overflow-x-auto">
                      <span className="font-mono text-[10px] text-zinc-400 shrink-0">
                        SCREENSHOT:
                      </span>
                      {gallery.map((_, gIdx) => (
                        <button
                          key={gIdx}
                          onClick={() =>
                            setActiveShotIdx((prev) => ({ ...prev, [proj.id]: gIdx }))
                          }
                          className={`px-2.5 py-1 font-mono text-[10px] uppercase font-bold cursor-pointer shrink-0 transition-colors ${
                            shotIdx === gIdx
                              ? 'bg-[#89abd2] text-[#0d0d0d]'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          SHOT_0{gIdx + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* =====================================================================
          04 // BARE-METAL HOMELAB — CLEAN HARDWARE OVERVIEW
      ====================================================================== */}
      <section
        id="rack"
        className="bg-[#0d0d0d] text-[#eae6df] border-b-2 border-[#0d0d0d] py-12 sm:py-16 px-4 sm:px-8"
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-white/20 pb-5 mb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#89abd2] font-bold block mb-1">
                // 04 — SELF-HOSTED INFRASTRUCTURE
              </span>
              <h2 className="font-bebas text-5xl sm:text-7xl leading-[0.85] uppercase text-white">
                BARE-METAL <span className="text-[#89abd2]">HOMELAB.</span>
              </h2>
            </div>
            <span className="font-mono text-xs text-[#89abd2] font-bold">
              CLIENT ━━▶ CLOUDFLARE ━━▶ DELL WYSE (FEDORA) ━━▶ HG680-P (MINIO NAS)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Hardware Stack Photo Window */}
            <div className="lg:col-span-5 border-2 border-white/30 bg-[#14141b] p-3.5 shadow-[6px_6px_0px_#89abd2] flex flex-col justify-between">
              <div className="flex items-center justify-between font-mono text-xs font-bold pb-2">
                <span className="text-[#89abd2]">Hardware_Rig.png</span>
                <span className="px-2 py-0.5 bg-[#89abd2] text-[#0d0d0d]">14W TOTAL DRAW</span>
              </div>
              <div className="aspect-[16/10] w-full overflow-hidden border border-white/20 bg-black">
                <img
                  src="/image.webp"
                  alt="Physical Homelab Hardware Rig"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 2 Clean Server Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border-2 border-white/30 bg-[#14141b] p-6 shadow-[6px_6px_0px_#ffffff] flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-[#89abd2] font-bold">
                    NODE 01 // GATEWAY
                  </span>
                  <h3 className="font-bebas text-4xl text-white tracking-wide mt-1">
                    DELL WYSE 5010
                  </h3>
                  <p className="font-mono text-xs text-zinc-400 mt-1">
                    Fedora Server 41 · AMD G-T48E
                  </p>
                  <p className="text-sm text-zinc-300 mt-4 leading-relaxed">
                    Runs Docker containers, Nginx reverse proxy, SSL termination, and Tailscale WireGuard mesh routing.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/15 font-mono text-xs text-[#89abd2] font-bold">
                  STATUS: 24/7 ONLINE (~9W)
                </div>
              </div>

              <div className="border-2 border-white/30 bg-[#14141b] p-6 shadow-[6px_6px_0px_#ffffff] flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-[#89abd2] font-bold">
                    NODE 02 // S3 NAS
                  </span>
                  <h3 className="font-bebas text-4xl text-white tracking-wide mt-1">
                    FIBERHOME HG680-P
                  </h3>
                  <p className="font-mono text-xs text-zinc-400 mt-1">
                    Armbian Debian 12 · ARMv8 Quad-Core
                  </p>
                  <p className="text-sm text-zinc-300 mt-4 leading-relaxed">
                    Hosts decoupled MinIO S3 object storage buckets, local SMB/NFS network shares, and MySQL persistence.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/15 font-mono text-xs text-[#89abd2] font-bold">
                  STATUS: 24/7 ONLINE (~5W)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          05 // HONORS & AWARDS — CLEAN VISUAL GALLERY
      ====================================================================== */}
      <section id="honors" className={`py-12 sm:py-16 px-4 sm:px-8 border-b-2 ${borderCol}`}>
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#4e739e] font-bold block mb-1">
                // 05 — AWARDS &amp; CERTIFICATES
              </span>
              <h2 className="font-bebas text-5xl sm:text-7xl leading-[0.85] uppercase">
                HONORS &amp; <span className="text-[#5b82b0]">ARCHIVE.</span>
              </h2>
            </div>
            <span className="font-mono text-xs opacity-70">
              CLICK ANY CARD TO EXPAND CERTIFICATE ↗
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HONORS.map((h) => (
              <div
                key={h.id}
                onClick={() =>
                  setLightbox({
                    title: h.title,
                    sub: `${h.org} (${h.year})`,
                    image: h.img,
                    desc: h.desc,
                  })
                }
                className={`group border-2 border-[#0d0d0d] ${cardBg} ${hardShadow} hover:bg-[#89abd2] hover:text-[#0d0d0d] transition-colors cursor-pointer flex flex-col justify-between`}
              >
                <div className="px-3 py-1.5 bg-[#0d0d0d] text-white font-mono text-[11px] font-bold flex items-center justify-between">
                  <span>Cert_{h.id}_{h.code}.png</span>
                  <span className="text-[#89abd2]">{h.year}</span>
                </div>

                <div className="aspect-[16/10] w-full overflow-hidden border-b-2 border-[#0d0d0d] bg-black">
                  <img
                    src={h.img}
                    alt={h.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4 flex items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider opacity-75 block">
                      {h.org}
                    </span>
                    <h3 className="font-grotesk text-base sm:text-lg font-bold uppercase leading-snug">
                      {h.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          06 // CONTACT FOOTER — CLEAN & DIRECT
      ====================================================================== */}
      <footer id="dispatch" className="bg-[#89abd2] text-[#0d0d0d] py-14 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-10 border-b-4 border-[#0d0d0d]">
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] bg-[#0d0d0d] text-[#eae6df] px-3 py-1 inline-block mb-3">
                  // 06 — CONTACT
                </span>
                <h2 className="font-bebas text-7xl sm:text-8xl leading-[0.8] uppercase text-[#0d0d0d]">
                  LET&apos;S TALK.
                </h2>
              </div>

              <div className="space-y-2.5 font-mono text-xs font-bold">
                <button
                  onClick={copyEmail}
                  className="w-full p-3.5 bg-[#0d0d0d] text-white hover:bg-[#eae6df] hover:text-black border-2 border-[#0d0d0d] shadow-[4px_4px_0px_#eae6df] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>
                    {copied ? '✓ COPIED: evanpranawa@ackteams.com' : 'COPY EMAIL // evanpranawa@ackteams.com'}
                  </span>
                  <Copy className="w-4 h-4" />
                </button>
                <a
                  href="https://github.com/Evan52436"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-[#eae6df] border-2 border-[#0d0d0d] shadow-[4px_4px_0px_#0d0d0d] flex items-center justify-between hover:bg-white transition-colors"
                >
                  <span>GITHUB // github.com/Evan52436</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="https://legacy.evanpranawa.my.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-[#eae6df] border-2 border-[#0d0d0d] shadow-[4px_4px_0px_#0d0d0d] flex items-center justify-between hover:bg-white transition-colors"
                >
                  <span>LEGACY SITE // legacy.evanpranawa.my.id</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Dispatch Form */}
            <div className="lg:col-span-7 bg-[#eae6df] text-[#0d0d0d] border-2 border-[#0d0d0d] shadow-[6px_6px_0px_#0d0d0d] p-6 sm:p-8">
              <div className="font-mono text-xs font-bold border-b-2 border-[#0d0d0d] pb-2.5 mb-5 flex justify-between">
                <span>Send_Message.AppImage</span>
                <span>ONLINE</span>
              </div>

              {sent ? (
                <div className="p-8 bg-[#89abd2] border-2 border-[#0d0d0d] font-mono text-center font-bold">
                  ✓ MESSAGE LOGGED — EVAN WILL RESPOND SHORTLY.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                    setTimeout(() => {
                      setSent(false);
                      setForm({ name: '', email: '', message: '' });
                    }, 4000);
                  }}
                  className="space-y-4 font-mono text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold block mb-1.5 uppercase">01 / Sender Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full px-3.5 py-3 bg-white border-2 border-[#0d0d0d] font-sans text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1.5 uppercase">02 / Return Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-3.5 py-3 bg-white border-2 border-[#0d0d0d] font-sans text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-bold block mb-1.5 uppercase">03 / Message Payload</label>
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Write your message..."
                      className="w-full px-3.5 py-3 bg-white border-2 border-[#0d0d0d] font-sans text-sm focus:outline-none resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#0d0d0d] text-white hover:bg-[#89abd2] hover:text-[#0d0d0d] border-2 border-[#0d0d0d] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>SEND TRANSMISSION</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between font-mono text-xs font-bold">
            <span>© 2026 EVAN PRANAWA ARMANSYAH</span>
            <button
              onClick={() => jump('hero')}
              className="px-4 py-2 bg-[#0d0d0d] text-white uppercase cursor-pointer"
            >
              ↑ TOP OF INDEX
            </button>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-black/90 p-4 sm:p-8 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full bg-[#eae6df] text-[#0d0d0d] border-4 border-[#0d0d0d] shadow-[12px_12px_0px_#89abd2]"
          >
            <div className="bg-[#0d0d0d] text-white px-4 py-2.5 flex items-center justify-between font-mono text-xs font-bold">
              <span>{lightbox.title}</span>
              <button
                onClick={() => setLightbox(null)}
                className="px-2.5 py-0.5 bg-[#89abd2] text-[#0d0d0d] cursor-pointer"
              >
                CLOSE [X]
              </button>
            </div>
            <div className="p-4 bg-black flex justify-center max-h-[70vh] overflow-auto">
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>
            <div className="p-4 border-t-2 border-[#0d0d0d] flex items-center justify-between font-mono text-xs">
              <div>
                <span className="font-bold text-[#4e739e]">{lightbox.sub}</span>
                <p className="font-sans text-sm mt-1">{lightbox.desc}</p>
              </div>
              {lightbox.url && lightbox.url !== '#' && (
                <a
                  href={lightbox.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#89abd2] text-[#0d0d0d] font-bold uppercase border-2 border-black"
                >
                  OPEN LIVE ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Terminal Modal */}
      <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </div>
  );
};
