import React, { useState } from 'react';
import { Terminal, Cpu, Server, Disc3, Shield, ArrowRight, ExternalLink, Activity, Sparkles, Hash, HardDrive, Key } from 'lucide-react';
import { InteractivePortrait } from './InteractivePortrait';
import { sound } from '@/lib/sound';

interface AboutRoomProps {
  onNavigate: (id: string) => void;
  onOpenTerminal?: () => void;
}

export const AboutRoom: React.FC<AboutRoomProps> = ({ onNavigate, onOpenTerminal }) => {
  const subsystems = [
    {
      id: '01_KERNEL',
      title: 'Bare-Metal & Linux Administration',
      kernel: 'Fedora 41 · Armbian Linux',
      desc: 'Provisioning multi-node headless appliances from repurposed thin clients. Hardened SSH daemon, automated rsync snapshots, systemd unit automation, and low-power power management.',
      specs: 'AMD G-T48E Dual-Core · Amlogic S905X ARMv8',
    },
    {
      id: '02_STORAGE',
      title: 'Decoupled Storage & MinIO S3 API',
      kernel: 'Self-Hosted S3 Engine',
      desc: 'Decoupling frontend client uploads from application servers. Direct presigned multipart streaming to self-hosted MinIO object buckets on ARM hardware without server memory bottlenecks.',
      specs: 'Multi-bucket policies · Supabase sync · Armbian NAS',
    },
    {
      id: '03_INFOSEC',
      title: 'Cybersecurity & Protocol Mapping',
      kernel: 'Capture The Flag (CTF)',
      desc: 'Top 10 province finalist in Clash of Cyberheist. Deep-dive network packet capture with Wireshark, traffic anomaly detection, reverse engineering, and defensive server perimeter hardening.',
      specs: 'Top 10 Finalist · Cryptography · Wireshark packet capture',
    },
    {
      id: '04_ACOUSTICS',
      title: 'Acoustics & Frequency Engineering',
      kernel: 'Ableton Live 11 · Studio One',
      desc: 'Event audio engineering (Front of House mixing), speaker alignment, monitor feedback suppression, and DAW music production. Active live performer on piano, guitar, and drums.',
      specs: '48kHz / 24-bit · Stem Summing · Multi-Instrumentalist',
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[#08080c] text-white select-none z-10 border-t border-white/10"
    >
      <div className="relative z-20 max-w-7xl mx-auto w-full">
        {/* Magazine Editorial Section Header: HELLO, I'M EVAN */}
        <div className="flex flex-col border-b border-white/10 pb-8 mb-12 sm:mb-16">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#ff2638] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#ff2638] inline-block animate-ping" />
            <span>OPERATOR ARCHIVE // ARTICLE 01</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-400">IDENTITY &amp; COMPUTING PROFILE</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-bebas text-7xl sm:text-8xl md:text-9xl text-white tracking-tight leading-[0.85] uppercase">
                HELLO, I&apos;M <span className="text-[#ff2638]">EVAN</span>
              </h2>
              <p className="mt-2 font-mono text-xs sm:text-sm text-zinc-400">
                EVAN PRANAWA ARMANSYAH &bull; JUNIOR SYSADMIN &bull; FULL-STACK DEVELOPER &bull; AUDIO ENGINEER
              </p>
            </div>

            <div className="flex items-center gap-3">
              {onOpenTerminal && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenTerminal();
                  }}
                  className="px-4 py-2 bg-[#ff2638]/10 hover:bg-[#ff2638] border border-[#ff2638]/40 hover:text-white text-[#ff2638] font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>RUN $ neofetch</span>
                </button>
              )}

              <div className="flex items-center gap-2 font-mono text-xs bg-white/5 border border-white/10 px-3.5 py-2">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-zinc-400">LOCATION:</span>
                <span className="text-white font-bold">BOGOR, ID (UTC+7)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Editorial 2-Column Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Technical Operator Badge & Physical Rig Telemetry */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start order-2 lg:order-1 space-y-6 w-full">
            <div className="w-full max-w-md">
              <InteractivePortrait />
            </div>

            {/* Operator Hardware & Cryptographic Passport */}
            <div className="w-full max-w-md p-5 bg-[#0d0d14] border border-white/15 font-mono text-xs space-y-3 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-zinc-400">
                <span className="flex items-center gap-2 text-white font-bold">
                  <Key className="w-3.5 h-3.5 text-[#ff2638]" />
                  OPERATOR TELEMETRY
                </span>
                <span className="text-emerald-400 text-[10px] font-bold">● CLUSTER VERIFIED</span>
              </div>

              <div className="space-y-2 text-zinc-300 text-[11px]">
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-zinc-500">HOSTNAME_ALPHA:</span>
                  <span className="text-white font-medium">dell-wyse (Fedora 41)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-zinc-500">HOSTNAME_BETA:</span>
                  <span className="text-white font-medium">fiberhome-nas (Armbian)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-zinc-500">STORAGE_ENGINE:</span>
                  <span className="text-[#ff2638] font-bold">MinIO S3 (Decoupled)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-zinc-500">OVERLAY_NET:</span>
                  <span className="text-zinc-200">Tailscale Encrypted Mesh</span>
                </div>
                <div className="flex justify-between items-center pt-1 text-[10px] text-zinc-500">
                  <span>SHA256_FINGERPRINT:</span>
                  <span className="text-zinc-400 font-mono">e7b9...4173</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Subsystem Architecture */}
          <div className="lg:col-span-7 flex flex-col space-y-8 order-1 lg:order-2">
            {/* Elegant Editorial Pull Quote */}
            <blockquote className="relative pl-6 sm:pl-8 border-l-2 border-[#ff2638]">
              <p className="font-instrument italic text-2xl sm:text-3xl lg:text-4xl text-zinc-100 font-normal leading-snug">
                “Architecture is not only what stands in stone, but the invisible network protocols and daemon loops that quietly keep computation resilient.”
              </p>
              <cite className="block mt-2 font-mono text-[11px] text-zinc-400 uppercase tracking-widest not-italic">
                &mdash; EVAN PRANAWA ARMANSYAH
              </cite>
            </blockquote>

            {/* Narrative Body in Technical International Typography */}
            <div className="space-y-4 text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
              <p>
                Halo! Saya adalah <strong className="text-white font-bold">Evan Pranawa Armansyah</strong>, seorang Junior System Administrator (SysAdmin) dan software developer berbasis di Bogor, Indonesia, dengan fokus utama pada Rekayasa Perangkat Lunak dan Cybersecurity.
              </p>
              <p>
                Alih-alih mengandalkan cloud provider komersial yang mahal, saya merakit dan mengorkestrasi infrastruktur server bare-metal berdaya rendah mandiri menggunakan perangkat repurposed (Dell Wyse thin-client dan Android TV box) yang diflash dengan kernel <strong className="text-white font-semibold">Fedora Server</strong> dan <strong className="text-white font-semibold">Armbian Linux</strong>. Pada cluster ini, saya mengimplementasikan arsitektur decoupled storage berbasis <strong className="text-white font-semibold">MinIO S3</strong>, jaringan mesh VPN <strong className="text-white font-semibold">Tailscale WireGuard</strong>, serta reverse proxy <strong className="text-white font-semibold">Nginx</strong>.
              </p>
              <p>
                Selain dunia kernel dan terminal, saya aktif sebagai <strong className="text-white font-semibold">Event Audio Engineer</strong> (live mixing console) dan produser musik digital menggunakan DAW <strong className="text-white font-semibold">Ableton Live &amp; Studio One</strong>, serta memainkan piano, gitar, dan drum.
              </p>
            </div>

            {/* Subsystems Architecture List (Replaces generic skill percentage slop!) */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#ff2638] mb-2 font-bold">
                <span>COMPUTING &amp; DISCIPLINE SUBSYSTEMS</span>
                <span className="text-zinc-500">[4 MODULES]</span>
              </div>

              <div className="space-y-3">
                {subsystems.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 bg-[#0d0d14] border border-white/10 hover:border-[#ff2638]/50 transition-all font-mono"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[#ff2638] font-bold text-xs">{sub.id}</span>
                        <span className="text-white font-bold text-sm">{sub.title}</span>
                      </div>
                      <span className="text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 border border-white/10">
                        {sub.kernel}
                      </span>
                    </div>

                    <p className="font-sans text-xs text-zinc-300 leading-relaxed mb-2">
                      {sub.desc}
                    </p>

                    <div className="text-[10px] text-zinc-500 font-mono">
                      <span>SPEC: </span>
                      <span className="text-zinc-400">{sub.specs}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Navigation */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate('projects');
                }}
                className="px-6 py-2.5 bg-[#ff2638] hover:bg-[#e52536] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-[#ff2638]/20"
              >
                <span>INSPECT CURATED WORKS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate('skills');
                }}
                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
              >
                <span>PHYSICAL CLUSTER RACK</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
