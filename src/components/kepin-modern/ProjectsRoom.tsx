import React, { useState } from 'react';
import { ExternalLink, Github, Eye, Terminal, ArrowUpRight, Layers, Radio } from 'lucide-react';
import { ExhibitionArtifact } from './ExhibitionLightbox';
import { projects } from '@/lib/data';
import { sound } from '@/lib/sound';

interface ProjectsRoomProps {
  onSelectArtifact: (artifact: ExhibitionArtifact) => void;
}

export const ProjectsRoom: React.FC<ProjectsRoomProps> = ({ onSelectArtifact }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const exhibits: ExhibitionArtifact[] = projects.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.technologies.includes('MinIO')
      ? 'storage'
      : p.technologies.includes('Three.js')
      ? 'three'
      : 'web',
    issuer: p.technologies.join(' · '),
    image: p.image.imageUrl,
    description: p.description,
    tags: p.technologies,
    url: p.url,
    githubUrl: p.githubUrl,
  }));

  const active = exhibits[selectedIndex] || exhibits[0];
  const activeRaw = projects[selectedIndex] || projects[0];

  return (
    <section
      id="projects"
      className="relative w-full py-28 px-4 sm:px-8 md:px-12 bg-[#08080c] text-white select-none z-10 border-t border-white/10"
    >
      <div className="relative z-20 max-w-7xl mx-auto w-full">
        {/* Room Header */}
        <div className="flex flex-col border-b border-white/10 pb-8 mb-12">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#ff2638] mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff2638] inline-block" />
            <span>ENGINEERING DECK // WORKS 04</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-400">DECOUPLED STORAGE &amp; WEB ARCHITECTURE</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-bebas text-6xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[0.85] uppercase">
                SELECTED <span className="text-[#ff2638]">WORKS</span>
              </h2>
              <p className="mt-2 font-mono text-xs sm:text-sm text-zinc-400 max-w-2xl">
                Production-grade decoupled object storage systems, university hackathon prototypes, and 3D WebGL spatial applications.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 bg-white/5 border border-white/10 px-3.5 py-1.5">
              <span>ACTIVE_INDEX:</span>
              <span className="text-white font-bold">[{selectedIndex + 1} / {exhibits.length}]</span>
            </div>
          </div>
        </div>

        {/* Master Engineering Deck: Split Screen Interactive Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Project Selector Master Roster */}
          <div className="lg:col-span-5 space-y-2">
            <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest block mb-3">
              SELECT ARTIFACT TO LOAD TELEMETRY:
            </span>

            {exhibits.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedIndex(idx);
                  }}
                  onMouseEnter={() => {
                    if (selectedIndex !== idx) sound.playHover();
                  }}
                  className={`p-5 border transition-all cursor-pointer font-mono ${
                    isSelected
                      ? 'bg-[#141420] border-[#ff2638] shadow-xl shadow-[#ff2638]/10'
                      : 'bg-[#0d0d14] border-white/10 hover:border-white/30 hover:bg-[#111118]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-[#ff2638] font-bold">
                      [{String(idx + 1).padStart(2, '0')}] // {item.category?.toUpperCase()}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        LOADED
                      </span>
                    )}
                  </div>

                  <h3 className="font-grotesk font-bold text-lg sm:text-xl text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap gap-1">
                    {item.tags?.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[9px] uppercase tracking-wider bg-white/5 px-2 py-0.5 border border-white/5 text-zinc-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Blueprint Monitor & Architecture Details */}
          <div className="lg:col-span-7 bg-[#0d0d14] border border-white/15 p-6 sm:p-8 shadow-2xl relative space-y-6">
            {/* Top Monitor Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-2 text-white font-bold">
                <Terminal className="w-4 h-4 text-[#ff2638]" />
                <span>SPEC_VIEWPORT: {active.title}</span>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  onSelectArtifact(active);
                }}
                className="px-3 py-1 bg-white/5 hover:bg-[#ff2638] text-white hover:text-white border border-white/15 text-[10px] transition-all flex items-center gap-1 cursor-pointer font-mono"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>EXPAND FULL GALLERY</span>
              </button>
            </div>

            {/* Live Visual Frame */}
            <div className="relative aspect-[16/10] bg-black/80 overflow-hidden border border-white/10">
              <img
                src={active.image}
                alt={active.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-transparent to-transparent opacity-70" />

              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 border border-white/10 font-mono text-[10px] text-zinc-300">
                PROD_INTERFACE // CAPTURED LIVE
              </div>
            </div>

            {/* Architecture Description */}
            <div className="space-y-3 font-sans">
              <h4 className="font-grotesk font-bold text-2xl text-white">
                {active.title}
              </h4>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {active.description}
              </p>
              {activeRaw.content && (
                <div className="p-3 bg-white/[0.03] border-l-2 border-[#ff2638] font-mono text-xs text-zinc-400">
                  <span className="text-[#ff2638] font-bold block mb-1">ARCHITECTURE DECOUPLING:</span>
                  <span>{activeRaw.content}</span>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                {active.tags?.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] bg-white/5 px-2.5 py-1 border border-white/10 text-zinc-300 font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {active.githubUrl && (
                  <a
                    href={active.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white transition-all flex items-center gap-2 font-mono"
                  >
                    <Github className="w-4 h-4" />
                    <span>SOURCE REPO</span>
                  </a>
                )}
                {active.url && (
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="px-4 py-2 bg-[#ff2638] hover:bg-[#e52536] text-white transition-all flex items-center gap-2 font-mono font-bold shadow-lg shadow-[#ff2638]/30"
                  >
                    <span>LAUNCH DEPLOYMENT</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
