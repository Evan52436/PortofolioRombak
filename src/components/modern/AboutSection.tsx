import React, { useState } from 'react';
import { Terminal, MapPin, Award, Radio } from 'lucide-react';
import { sound } from '@/lib/sound';

export const AboutSection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState(0);
  const photos = [
    { src: '/epuy.webp', label: 'Evan Pranawa Armansyah' },
    { src: '/belakang.webp', label: 'Field & Event Ops' },
    { src: '/main.webp', label: 'Technical Workspace' },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen py-24 px-4 md:px-8 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-[#0e0f13]/15 font-mono text-xs tracking-wider text-[#4a473e] mb-12">
        <div className="flex items-center gap-3">
          <span className="font-classical font-bold text-[#0e0f13]">II.</span>
          <span>PHILOSOPHIA · OPERATOR DOSSIER</span>
        </div>
        <div className="flex items-center gap-4">
          <span>ARCHIVE CODE: EP-2026</span>
          <span className="hidden sm:inline">PROVENANCE: BOGOR / INDONESIA</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Editorial Portrait Frame */}
        <div className="lg:col-span-5">
          <div className="relative group">
            {/* Outer Architectural Border */}
            <div className="p-3 bg-[#e4e2d8] border border-[#0e0f13]/15 rounded-2xl shadow-xl transition-all duration-500">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#181820]">
                <img
                  src={photos[activePhoto].src}
                  alt={photos[activePhoto].label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Caption Bar inside photo */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-[#f0ede4]">
                  <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                    {photos[activePhoto].label}
                  </span>
                  <span className="bg-[#b89047]/90 text-black font-semibold px-2 py-0.5 rounded">
                    0{activePhoto + 1}/0{photos.length}
                  </span>
                </div>
              </div>

              {/* Photo Selector Strip */}
              <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-[#0e0f13]/10">
                {photos.map((p, idx) => (
                  <button
                    key={p.src}
                    onClick={() => {
                      sound.playClick();
                      setActivePhoto(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      activePhoto === idx
                        ? 'w-8 bg-[#0e0f13]'
                        : 'w-2 bg-[#0e0f13]/25 hover:bg-[#0e0f13]/50'
                    }`}
                    title={p.label}
                  />
                ))}
              </div>
            </div>

            {/* Corner Roman Marker */}
            <div className="absolute -bottom-3 -right-3 bg-[#0e0f13] text-[#f4f2ea] font-classical text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
              FIG. II
            </div>
          </div>
        </div>

        {/* Right: Narrative & Systems Manifesto */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#735928]">
            <Terminal className="w-3.5 h-3.5" />
            <span>The Operator Behind The Systems</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#0e0f13] font-normal leading-tight">
            Curiosity driven by bare-metal computing and sonic exploration.
          </h2>

          <div className="font-editorial text-lg sm:text-xl text-[#3d3a33] space-y-4 leading-relaxed font-normal">
            <p>
              I am a Junior System Administrator and Software Engineering
              student based in Bogor, Indonesia. My journey started with a
              fascination for how machines talk to each other without
              abstractions—which led me to assemble my own home server cluster,
              configure Linux kernels, and engineer decoupled cloud architectures.
            </p>
            <p>
              Beyond systems and code, I am deeply rooted in acoustic sound
              engineering, music production with Ableton Live and Studio One,
              and live performance across piano, guitar, and drums. This
              intersection teaches me rhythm, timing, and precision: qualities
              essential whether architecting a low-latency network or mixing an
              audio master.
            </p>
          </div>

          {/* Architectural Spec Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#0e0f13]/15 font-mono text-xs">
            <div className="p-3.5 rounded-xl border border-[#0e0f13]/10 bg-white/40">
              <div className="flex items-center gap-1.5 text-[#735928] mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span className="font-semibold">LOCATION</span>
              </div>
              <div className="text-[#1a1917] font-medium">Bogor, West Java</div>
              <div className="text-[#6d695e] text-[11px]">Indonesia · UTC+7</div>
            </div>

            <div className="p-3.5 rounded-xl border border-[#0e0f13]/10 bg-white/40">
              <div className="flex items-center gap-1.5 text-[#735928] mb-1">
                <Award className="w-3.5 h-3.5" />
                <span className="font-semibold">ORGANIZATION</span>
              </div>
              <div className="text-[#1a1917] font-medium">Devaccto RPL</div>
              <div className="text-[#6d695e] text-[11px]">Vice President</div>
            </div>

            <div className="p-3.5 rounded-xl border border-[#0e0f13]/10 bg-white/40">
              <div className="flex items-center gap-1.5 text-[#735928] mb-1">
                <Radio className="w-3.5 h-3.5" />
                <span className="font-semibold">SPECIALTY</span>
              </div>
              <div className="text-[#1a1917] font-medium">SysAdmin & Sec</div>
              <div className="text-[#6d695e] text-[11px]">Homelab & CTF</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
