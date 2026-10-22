import React from 'react';
import { ArrowDown, Cpu, Shield, Disc, Server } from 'lucide-react';
import { sound } from '@/lib/sound';

interface HeroSectionProps {
  onNavigate: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto z-10"
    >
      {/* Top Architectural Metadata Rule */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-[#0e0f13]/15 font-mono text-xs tracking-wider text-[#4a473e] gap-2">
        <div className="flex items-center gap-3">
          <span className="font-classical font-bold text-[#0e0f13]">I.</span>
          <span>EXORDIVM · ARCHITECTURAL PROSPECTVS</span>
        </div>
        <div className="flex items-center gap-6">
          <span>LAT 6°35'47&quot;S · LON 106°47'54&quot;E</span>
          <span className="hidden md:inline">FEDORA &bull; DOCKER &bull; TYPESCRIPT</span>
        </div>
      </div>

      {/* Main Title Centerpiece */}
      <div className="my-auto py-12 md:py-16">
        <div className="max-w-4xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0e0f13]/20 bg-[#0e0f13]/5 font-mono text-xs text-[#2b2924] mb-6 tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#9c7a3c]" />
            Junior System Administrator & Developer
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-[#0e0f13] leading-[1.02] mb-6">
            Evan Pranawa
            <span className="block font-classical italic font-light text-[#735928] text-4xl sm:text-6xl lg:text-7xl mt-1">
              Armansyah.
            </span>
          </h1>

          <p className="font-editorial text-xl sm:text-2xl text-[#3b3832] max-w-2xl leading-relaxed mb-10 font-normal">
            Bridging bare-metal homelab infrastructure, robust web architecture,
            and acoustic precision. Designing resilient systems where low-level
            computing meets thoughtful creative engineering.
          </p>

          {/* Action Pills */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('infrastructure');
              }}
              className="btn-pill btn-pill-dark"
            >
              <span>Explore Homelab & Works</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onNavigate('contact');
              }}
              className="btn-pill btn-pill-outline"
            >
              <span>Initiate Transmission</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Technical Grid Pillars */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#0e0f13]/15 font-mono text-xs">
        <div className="p-4 rounded-xl border border-[#0e0f13]/10 bg-[#ffffff]/30 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-[#735928] mb-2 font-semibold">
            <Server className="w-4 h-4" />
            <span>SYSADMIN</span>
          </div>
          <div className="text-[#1a1917] font-sans font-medium text-sm">
            Self-Hosted Infrastructure
          </div>
          <div className="text-[#635f54] text-[11px] mt-1">
            Fedora Server, Docker, Nginx, Tailscale
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[#0e0f13]/10 bg-[#ffffff]/30 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-[#735928] mb-2 font-semibold">
            <Cpu className="w-4 h-4" />
            <span>DEV ARCHITECTURE</span>
          </div>
          <div className="text-[#1a1917] font-sans font-medium text-sm">
            Full-Stack & 3D Web
          </div>
          <div className="text-[#635f54] text-[11px] mt-1">
            TypeScript, Three.js, React, Laravel
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[#0e0f13]/10 bg-[#ffffff]/30 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-[#735928] mb-2 font-semibold">
            <Shield className="w-4 h-4" />
            <span>CYBERSECURITY</span>
          </div>
          <div className="text-[#1a1917] font-sans font-medium text-sm">
            CTF & Network Hardening
          </div>
          <div className="text-[#635f54] text-[11px] mt-1">
            Top 10 Cyberheist, Traffic Mapping
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[#0e0f13]/10 bg-[#ffffff]/30 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-[#735928] mb-2 font-semibold">
            <Disc className="w-4 h-4" />
            <span>ACOUSTICS & DAW</span>
          </div>
          <div className="text-[#1a1917] font-sans font-medium text-sm">
            Audio Production
          </div>
          <div className="text-[#635f54] text-[11px] mt-1">
            Ableton Live, Live Sound, Multi-Instrument
          </div>
        </div>
      </div>
    </section>
  );
};
