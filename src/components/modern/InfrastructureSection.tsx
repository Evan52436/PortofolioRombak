import React, { useState } from 'react';
import { Server, HardDrive, ShieldCheck, Cpu, Terminal, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { sound } from '@/lib/sound';

export const InfrastructureSection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<'wyse' | 'hg680'>('wyse');

  const nodeDetails = {
    wyse: {
      name: 'Dell Wyse 5010 Thin Client',
      role: 'Primary Microservice & Gateway Host',
      os: 'Fedora Server 41 Headless',
      cpu: 'AMD G-T48E Dual-Core 1.4GHz',
      services: [
        { name: 'Docker Engine', desc: 'Container daemon for web apps & DBs' },
        { name: 'Nginx Reverse Proxy', desc: 'SSL termination & subdomain routing' },
        { name: 'aaPanel Control Center', desc: 'Resource monitoring & cron automation' },
        { name: 'Tailscale Wireguard', desc: 'Secure mesh VPN between nodes' },
        { name: 'Cloudflare Tunnel', desc: 'Zero-trust edge proxy to public web' },
      ],
      ports: ['80/tcp', '443/tcp', '8888/tcp', '9000/tcp', '41641/udp'],
      status: 'OPERATIONAL · 24/7 LOW-POWER DRAW',
    },
    hg680: {
      name: 'Fiberhome HG680-P Box',
      role: 'Network Attached Storage & S3 Storage',
      os: 'Armbian Linux (Debian Bookworm)',
      cpu: 'Amlogic S905X Quad-Core ARMv8',
      services: [
        { name: 'MinIO S3 Server', desc: 'Self-hosted S3 API for decoupled apps' },
        { name: 'NFS / Samba Share', desc: 'Local network shared storage volumes' },
        { name: 'rsync Snapshot Sync', desc: 'Automated encrypted remote backups' },
        { name: 'MySQL Database', desc: 'Data persistence for internal projects' },
      ],
      ports: ['9000/tcp', '9001/tcp', '3306/tcp', '445/tcp', '2049/tcp'],
      status: 'OPERATIONAL · ARM ARCHITECTURE NAS',
    },
  };

  const curr = nodeDetails[activeNode];

  return (
    <section
      id="infrastructure"
      className="relative min-h-screen py-24 px-4 md:px-8 max-w-7xl mx-auto z-10 text-[#f0f0f4]"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-white/10 font-mono text-xs tracking-wider text-[#9f9fae] mb-12">
        <div className="flex items-center gap-3">
          <span className="font-classical font-bold text-[#d4a359]">III.</span>
          <span>SYSTEMA · THE HOMELAB CLUSTER</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            2 NODES ACTIVE
          </span>
          <span className="hidden sm:inline">TAILSCALE MESH CONNECTED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Hardware Rig Showcase & Photo */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative group p-3 bg-[#13141f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/60">
              <img
                src="/image.webp"
                alt="Dell Wyse 5010 and HG680-P Stacked Homelab Rig"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-[#f4f2ea]">
                  Physical Homelab Stack
                </span>
                <span className="text-[#d4a359] font-bold">FIG. III</span>
              </div>
            </div>

            <div className="p-4 space-y-2 font-mono text-xs text-[#a0a1b2]">
              <div className="flex items-center justify-between text-white font-medium">
                <span>HARDWARE TOPOLOGY</span>
                <span className="text-emerald-400">ONLINE</span>
              </div>
              <p className="font-sans text-xs leading-relaxed text-[#b1b2c4]">
                Stacked physical node cluster running 24/7 in Bogor. Built on
                repurposed enterprise thin-clients and ARM boxes for maximum
                thermal efficiency and zero server rental costs.
              </p>
            </div>
          </div>

          {/* Technology Badges */}
          <div className="p-5 rounded-2xl bg-[#13141f] border border-white/10 space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#d4a359] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Core Infrastructure Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Fedora Server',
                'Armbian Linux',
                'Docker',
                'Nginx',
                'MinIO S3',
                'Tailscale',
                'Cloudflare Tunnels',
                'aaPanel',
                'Bash Scripting',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-white/90"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Interactive Node Inspector */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#d4a359] mb-2 flex items-center gap-2">
              <Server className="w-4 h-4" />
              <span>Node Inspector // Telemetry</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
              Self-hosted microservices without commercial cloud dependence.
            </h2>
          </div>

          {/* Node Tab Switcher */}
          <div className="grid grid-cols-2 gap-3 p-1.5 rounded-xl bg-white/5 border border-white/10 font-mono text-xs">
            <button
              onClick={() => {
                sound.playClick();
                setActiveNode('wyse');
              }}
              className={`py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                activeNode === 'wyse'
                  ? 'bg-[#d4a359] text-black font-bold shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>NODE 01: DELL WYSE</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveNode('hg680');
              }}
              className={`py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                activeNode === 'hg680'
                  ? 'bg-[#d4a359] text-black font-bold shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <HardDrive className="w-4 h-4" />
              <span>NODE 02: ARMBIAN NAS</span>
            </button>
          </div>

          {/* Active Node Specification Dossier */}
          <div className="p-6 rounded-2xl bg-[#13141f] border border-white/10 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
              <div>
                <h3 className="font-serif text-xl text-white font-medium">
                  {curr.name}
                </h3>
                <p className="font-mono text-xs text-[#d4a359] mt-0.5">
                  {curr.role}
                </p>
              </div>
              <div className="font-mono text-[11px] px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {curr.status}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-[#8e8f9e] block text-[10px] uppercase">
                  OPERATING SYSTEM
                </span>
                <span className="text-white font-medium">{curr.os}</span>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-[#8e8f9e] block text-[10px] uppercase">
                  PROCESSOR ARCHITECTURE
                </span>
                <span className="text-white font-medium">{curr.cpu}</span>
              </div>
            </div>

            {/* Active Services List */}
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#9d9eb2] block">
                Deployed Microservices
              </span>
              <div className="space-y-2">
                {curr.services.map((svc) => (
                  <div
                    key={svc.name}
                    className="p-3 rounded-xl bg-black/30 border border-white/5 flex items-start justify-between gap-4 font-mono text-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#d4a359] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white font-semibold">
                          {svc.name}
                        </span>
                        <p className="text-[#a0a1b2] font-sans text-xs mt-0.5">
                          {svc.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ports & Connectivity */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#9d9eb2]">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#d4a359]" />
                <span>EXPOSED PORTS:</span>
                <span className="text-white">{curr.ports.join(', ')}</span>
              </div>
              <span className="text-[11px] text-[#d4a359]">
                ZERO-TRUST PROTECTED
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
