import React, { useState } from 'react';
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, Layers, Cpu } from 'lucide-react';
import { sound } from '@/lib/sound';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: { imageUrl: string; description?: string };
  gallery?: { imageUrl: string; description?: string }[];
  url?: string;
  githubUrl?: string;
  content?: string;
}

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  if (!project) return null;

  const gallery = project.gallery && project.gallery.length > 0
    ? project.gallery
    : [project.image];

  const handlePrev = () => {
    sound.playClick();
    setActiveImgIdx((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNext = () => {
    sound.playClick();
    setActiveImgIdx((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-xl bg-black/80">
      {/* Click outside to close backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#111219] border border-white/15 text-[#f0f0f4] shadow-2xl p-6 md:p-8 space-y-6">
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#d4a359] mb-1">
              OPERA ARCHIVVM // {project.category.toUpperCase()}
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-white">
              {project.title}
            </h2>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-full border border-white/15 hover:bg-white/10 text-white/70 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery Carousel */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/80 border border-white/10 group">
          <img
            src={gallery[activeImgIdx]?.imageUrl || project.image.imageUrl}
            alt={project.title}
            className="w-full h-full object-contain"
          />

          {/* Carousel Arrows if > 1 */}
          {gallery.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 border border-white/20 text-white opacity-0 group-hover:opacity-100 hover:bg-black/90 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 border border-white/20 text-white opacity-0 group-hover:opacity-100 hover:bg-black/90 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 font-mono text-xs">
                <span>
                  {activeImgIdx + 1} / {gallery.length}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Narrative & Architecture Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 font-mono text-xs">
          <div className="md:col-span-2 space-y-4">
            <div>
              <span className="text-[#9899a8] block uppercase text-[11px] mb-1">
                DESCRIPTION & CONTEXT
              </span>
              <p className="font-sans text-sm text-[#d0d1df] leading-relaxed">
                {project.description}
              </p>
            </div>

            {project.content && (
              <div>
                <span className="text-[#9899a8] block uppercase text-[11px] mb-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#d4a359]" />
                  <span>ARCHITECTURE NOTES</span>
                </span>
                <p className="font-sans text-sm text-[#b0b1c2] leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
                  {project.content}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4 border-t md:border-t-0 md:border-l border-white/10 md:pl-6">
            <div>
              <span className="text-[#9899a8] block uppercase text-[11px] mb-2 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#d4a359]" />
                <span>TECHNOLOGIES</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/90 text-[11px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Links */}
            <div className="pt-2 space-y-2">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-pill bg-[#d4a359] text-black font-semibold hover:bg-[#e4b56d] flex items-center justify-center gap-2 py-2"
                >
                  <span>Launch Live System</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-pill btn-pill-dark-outline flex items-center justify-center gap-2 py-2"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
