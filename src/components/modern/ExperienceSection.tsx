import React, { useState } from 'react';
import { Briefcase, Calendar, Music, Sparkles, ChevronRight, X } from 'lucide-react';
import { resume } from '@/lib/data';
import { sound } from '@/lib/sound';

export const ExperienceSection: React.FC = () => {
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);

  return (
    <section
      id="experience"
      className="relative min-h-screen py-24 px-4 md:px-8 max-w-7xl mx-auto z-10 text-[#f0f0f4]"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-white/10 font-mono text-xs tracking-wider text-[#9f9fae] mb-12">
        <div className="flex items-center gap-3">
          <span className="font-classical font-bold text-[#d4a359]">V.</span>
          <span>PRAXIS · EXPERIENCE & PROVENANCE</span>
        </div>
        <div className="flex items-center gap-4">
          <span>TIMELINE 2024 — 2026</span>
          <span className="hidden sm:inline">LEADERSHIP & COMPETITIONS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Experience Timeline */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-2 mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#d4a359] block">
              Field Track Record
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              Systems administration, competitive finalist, and media engineering.
            </h2>
          </div>

          <div className="space-y-6">
            {resume.experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#13141f] border border-white/10 space-y-4 hover:border-[#d4a359]/40 transition-all shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                  <div>
                    <span className="font-mono text-xs text-[#d4a359] uppercase tracking-wider block">
                      {exp.company}
                    </span>
                    <h3 className="font-serif text-xl text-white font-medium whitespace-pre-line">
                      {exp.role.replace('\n', ' ')}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs text-[#9d9eb2] bg-white/5 px-3 py-1 rounded-full border border-white/10 shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-[#d4a359]" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="font-sans text-xs text-[#b8b9cc] leading-relaxed">
                  {exp.description}
                </p>

                {/* Evidence Photo Thumbnails */}
                {exp.images && exp.images.length > 0 && (
                  <div className="pt-2">
                    <span className="font-mono text-[10px] uppercase text-[#7a7b8e] block mb-2">
                      Photographic Record & Proof:
                    </span>
                    <div className="flex items-center gap-3">
                      {exp.images.map((img, iIdx) => (
                        <div
                          key={iIdx}
                          onClick={() => {
                            sound.playClick();
                            setActivePhotoModal(img.imageUrl);
                          }}
                          className="relative w-20 h-14 rounded-lg overflow-hidden border border-white/15 cursor-pointer group/thumb hover:border-[#d4a359] transition-all"
                        >
                          <img
                            src={img.imageUrl}
                            alt={img.description || 'Archive documentation'}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover/thumb:bg-transparent transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Sound & Acoustic Engineering Spotlight */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-28 p-6 rounded-2xl bg-[#13141f] border border-white/10 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-[#d4a359] font-mono text-xs uppercase tracking-wider">
                <Music className="w-4 h-4" />
                <span>Acoustic Craft</span>
              </div>
              <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                DAW & LIVE
              </span>
            </div>

            <h3 className="font-serif text-2xl text-white font-medium">
              Digital audio production & event acoustic engineering.
            </h3>

            <p className="font-sans text-xs text-[#a3a4b6] leading-relaxed">
              When not architecting bare-metal systems, I produce electronic and
              acoustic soundscapes in Ableton Live & Studio One. Having run live
              mixing desks and performed on piano, guitar, and drums, music
              informs my technical philosophy: harmony, clean frequency separation,
              and disciplined timing.
            </p>

            {/* Simulated Frequency Spectrum Bars */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
              <div className="flex items-center justify-between font-mono text-[11px] text-[#8e8f9e]">
                <span>SPECTRUM MONITOR</span>
                <span className="text-[#d4a359]">44.1 kHz · 24-bit</span>
              </div>

              <div className="flex items-end justify-between h-14 gap-1.5 pt-2">
                {[45, 65, 80, 50, 95, 70, 85, 60, 40, 75, 90, 55, 35, 65, 80, 45].map(
                  (val, i) => (
                    <div
                      key={i}
                      className="w-full bg-[#d4a359]/70 rounded-t transition-all duration-300"
                      style={{
                        height: `${val}%`,
                        opacity: 0.4 + (val / 100) * 0.6,
                      }}
                    />
                  )
                )}
              </div>
            </div>

            {/* Instrumentation & Tools */}
            <div className="space-y-2 pt-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#9d9eb2] block">
                Primary Software & Instruments
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Ableton Live',
                  'PreSonus Studio One',
                  'Live Sound Mixing',
                  'Acoustic Piano',
                  'Electric Guitar',
                  'Acoustic Drums',
                ].map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-white/90"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proof Photo Modal */}
      {activePhotoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-black/85"
          onClick={() => setActivePhotoModal(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/90"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activePhotoModal}
              alt="Archival proof"
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};
