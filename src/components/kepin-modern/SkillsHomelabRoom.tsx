import React, { useState } from 'react';
import { Server, HardDrive, Cpu, Terminal, Activity, ArrowRight, ShieldCheck, CheckCircle2, Radio, Play } from 'lucide-react';
import { sound } from '@/lib/sound';

export const SkillsHomelabRoom: React.FC = () => {
  const [activeNode, setActiveNode] = useState<'wyse' | 'hg680'>('wyse');
  const [pingResult, setPingResult] = useState<string | null>(null);
  const [pinging, setPinging] = useState(false);

  const nodes = {
    wyse: {
      id: 'NODE_ALPHA',
      name: 'Dell Wyse 5010 Thin Client',
      role: 'Primary Microservice Gateway & Docker Host',
      os: 'Fedora Server 41 (Headless Linux)',
      cpu: 'AMD G-T48E Dual-Core 1.4GHz',
      ram: '4 GB DDR3',
      storage: '16 GB Flash + External SSD',
      power: '~9W Continuous Draw (24/7)',
      services: [
        { name: 'Docker Engine 27.x', desc: 'Container daemon for web apps & isolated services', port: 'DOCKER_SOCK' },
        { name: 'Nginx Reverse Proxy', desc: 'Automated SSL certificates termination & subdomain dispatch', port: '80 / 443' },
        { name: 'aaPanel Control Center', desc: 'Resource metrics, automated cron routines & log rotation', port: '8888' },
        { name: 'Tailscale Wireguard', desc: 'Zero-config encrypted peer-to-peer mesh VPN overlay', port: '41641/udp' },
        { name: 'Cloudflare Zero-Trust Tunnel', desc: 'Outbound-only secure ingress without opening router ports', port: 'TUNNEL' },
      ],
      ports: ['80/tcp (HTTP)', '443/tcp (HTTPS)', '8888/tcp (aaPanel)', '22/tcp (SSH)', '41641/udp (Wireguard)'],
    },
    hg680: {
      id: 'NODE_BETA',
      name: 'Fiberhome HG680-P TV Box',
      role: 'Repurposed ARM Network Attached Storage (NAS) & S3',
      os: 'Armbian Linux (Debian 12 Bookworm)',
      cpu: 'Amlogic S905X Quad-Core ARMv8 (Cortex-A53)',
      ram: '2 GB DDR3',
      storage: 'SATA/USB Storage Array with automated rsync',
      power: '~5W Ultra-Low Power Draw',
      services: [
        { name: 'MinIO S3 Server', desc: 'Self-hosted High-Performance S3 Compatible Object Store', port: '9000 / 9001' },
        { name: 'NFS / Samba Network Share', desc: 'LAN shared volume pooling for multi-workstation sync', port: '2049 / 445' },
        { name: 'rsync Snapshot Engine', desc: 'Automated delta differential backup routines to offsite', port: 'CRON_DAEMON' },
        { name: 'MySQL Relational DB', desc: 'Structured backend storage for decoupled web prototypes', port: '3306' },
      ],
      ports: ['9000/tcp (MinIO API)', '9001/tcp (MinIO Console)', '3306/tcp (MySQL)', '445/tcp (SMB)', '22/tcp (SSH)'],
    },
  };

  const handleTestPing = (port: string) => {
    sound.playTone(880, 'sine', 0.1);
    setPinging(true);
    setPingResult(`CONNECTING ${port}...`);

    setTimeout(() => {
      sound.playTone(1320, 'sine', 0.15);
      const rtt = (Math.random() * 4 + 4).toFixed(1);
      setPingResult(`ACK 200 OK &bull; RTT ${rtt}ms &bull; ${port} RESPONDED`);
      setPinging(false);
    }, 450);
  };

  const current = nodes[activeNode];

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full py-28 px-4 sm:px-8 md:px-12 bg-[#060609] text-white select-none z-10 border-t border-white/10"
    >
      <div className="relative z-20 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col border-b border-white/10 pb-8 mb-12">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#ff2638] mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff2638] inline-block animate-pulse" />
            <span>INFRASTRUCTURE // SYSTEMA III</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-400">PHYSICAL BARE-METAL CLUSTER</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-bebas text-6xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[0.85] uppercase">
                THE BARE-METAL <span className="text-[#ff2638]">RACK</span>
              </h2>
              <p className="mt-2 font-mono text-xs sm:text-sm text-zinc-400 max-w-2xl">
                Real repurposed silicon operating 24/7 in Bogor, Indonesia. No rented hyper-scaler cloud—pure self-hosted computing, automated kernel routines, and decoupled S3 storage.
              </p>
            </div>

            {/* Quick Node Switcher Buttons */}
            <div className="flex items-center gap-2 bg-[#0f0f16] p-1 border border-white/15">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveNode('wyse');
                }}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeNode === 'wyse'
                    ? 'bg-[#ff2638] text-white font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                01: DELL WYSE (FEDORA)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveNode('hg680');
                }}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeNode === 'hg680'
                    ? 'bg-[#ff2638] text-white font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                02: FIBERHOME (ARMBIAN NAS)
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Hardware Inspector Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Real Physical Hardware Photo & Technical Status */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-4 bg-[#0d0d14] border border-white/15 shadow-2xl relative">
              <div className="relative aspect-[4/3] bg-black/70 overflow-hidden border border-white/10">
                <img
                  src="/image.webp"
                  alt="Dell Wyse 5010 and HG680-P Stacked Homelab Hardware Rig"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 border border-white/15 font-mono text-[10px] text-white">
                  PHYSICAL RIG &bull; BOGOR HOMELAB
                </div>

                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between font-mono text-[10px] text-zinc-300">
                  <span className="bg-black/80 px-2 py-0.5 border border-white/10">
                    POWER DRAW: ~14W TOTAL
                  </span>
                  <span className="text-emerald-400 bg-black/80 px-2 py-0.5 border border-emerald-500/30 font-bold">
                    ● ALL NODES ACTIVE
                  </span>
                </div>
              </div>

              {/* Hardware Spec Sheet */}
              <div className="mt-4 font-mono text-xs space-y-2 border-t border-white/10 pt-3 text-zinc-300">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">OPERATING_SYSTEM:</span>
                  <span className="text-white font-bold">{current.os}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">PROCESSOR_CORE:</span>
                  <span className="text-white">{current.cpu}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">MEMORY_BUFFER:</span>
                  <span className="text-white">{current.ram}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">STORAGE_POOL:</span>
                  <span className="text-white">{current.storage}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">POWER_EFFICIENCY:</span>
                  <span className="text-emerald-400 font-bold">{current.power}</span>
                </div>
              </div>
            </div>

            {/* Interactive Port Ping Diagnostic Console */}
            <div className="p-5 bg-[#0d0d14] border border-white/15 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-white font-bold flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#ff2638]" />
                  ACTIVE LISTENER PORTS
                </span>
                <span className="text-[10px] text-zinc-500">CLICK TO PING</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {current.ports.map((port) => (
                  <button
                    key={port}
                    onClick={() => handleTestPing(port)}
                    className="px-2.5 py-1 bg-white/5 hover:bg-[#ff2638] hover:text-white border border-white/10 text-zinc-300 text-[10px] transition-all cursor-pointer font-mono"
                    title={`Send test SYN packet to ${port}`}
                  >
                    $ ping {port.split(' ')[0]}
                  </button>
                ))}
              </div>

              {pingResult && (
                <div
                  className="p-2.5 bg-black/60 border border-white/10 text-[11px] text-emerald-400 font-mono transition-all"
                  dangerouslySetInnerHTML={{ __html: pingResult }}
                />
              )}
            </div>
          </div>

          {/* Right Column: Deployed Services & Daemon Manifest */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-white font-bold">
                <Server className="w-4 h-4 text-[#ff2638]" />
                <span>{current.name} &bull; SERVICE MANIFEST</span>
              </div>
              <span className="text-[#ff2638] text-[11px] font-bold">{current.id}</span>
            </div>

            <p className="font-mono text-xs text-zinc-400">
              ROLE: <span className="text-zinc-200">{current.role}</span>
            </p>

            {/* Services List */}
            <div className="space-y-3 pt-2">
              {current.services.map((svc) => (
                <div
                  key={svc.name}
                  className="p-4 bg-[#0d0d14] border border-white/10 hover:border-[#ff2638]/40 transition-all font-mono"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                    <span className="text-white font-bold text-sm">{svc.name}</span>
                    <span className="text-[10px] bg-white/5 text-[#ff2638] px-2 py-0.5 border border-white/10 font-bold">
                      PORT: {svc.port}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-zinc-300 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Network Architecture Flow */}
            <div className="mt-8 p-5 bg-[#0a0a10] border border-white/10 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between text-zinc-400 border-b border-white/10 pb-2">
                <span className="text-white font-bold">INGRESS &amp; EGRESS TOPOLOGY</span>
                <span className="text-emerald-400">ENCRYPTED WIREGUARD MESH</span>
              </div>
              <div className="text-[11px] text-zinc-300 leading-relaxed space-y-1">
                <div>[Public Client] &rarr; [Cloudflare Zero-Trust Edge] &rarr; [Nginx Reverse Proxy on Dell Wyse]</div>
                <div>&rarr; [Tailscale Mesh] &rarr; [MinIO S3 API on Armbian NAS HG680-P] &rarr; [SATA Disk Array]</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
