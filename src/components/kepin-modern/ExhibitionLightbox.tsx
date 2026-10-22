import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { sound } from '@/lib/sound';

export interface ExhibitionArtifact {
  id: string | number;
  title: string;
  category?: string;
  issuer?: string;
  image: string;
  description?: string;
  tags?: string[];
  url?: string;
  githubUrl?: string;
}

interface ExhibitionLightboxProps {
  artifact: ExhibitionArtifact | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export const ExhibitionLightbox: React.FC<ExhibitionLightboxProps> = ({
  artifact,
  onClose,
  onPrev,
  onNext,
}) => {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    setZoom(1);
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [artifact, onClose, onPrev, onNext]);

  if (!artifact) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 transition-opacity duration-300 select-none"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-[#111115] text-white rounded-[9px] border border-white/15 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0d0d10] border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <h3 className="text-sm font-medium tracking-wide text-white/95 font-serif">
                {artifact.title}
              </h3>
              <p className="text-[12px] text-white/50 tracking-wider uppercase font-grotesk mt-0.5">
                {artifact.issuer || artifact.category || 'Exhibition Artifact & Dossier'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                sound.playClick();
                setZoom((z) => Math.min(z + 0.25, 2.5));
              }}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setZoom((z) => Math.max(z - 0.25, 0.75));
              }}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <a
              href={artifact.image}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              title="Open full resolution image in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors ml-2"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Artifact Stage */}
        <div className="relative flex-1 min-h-[380px] max-h-[65vh] overflow-auto flex items-center justify-center p-6 bg-[#070709]">
          <div
            className="transition-transform duration-200"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          >
            <img
              src={artifact.image}
              alt={artifact.title}
              className="max-h-[55vh] max-w-full w-auto h-auto object-contain shadow-2xl border border-white/10 rounded"
            />
          </div>

          {onPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                sound.playClick();
                onPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/90 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {onNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                sound.playClick();
                onNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/90 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Footer Notes */}
        <div className="px-6 py-4 bg-[#0d0d10] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-grotesk text-white/70">
          <p className="max-w-xl text-white/80 leading-relaxed font-sans text-xs">
            {artifact.description || 'Verified archival credential and demonstration artifact.'}
          </p>

          <div className="flex items-center gap-3 shrink-0">
            {artifact.url && (
              <a
                href={artifact.url}
                target="_blank"
                rel="noreferrer"
                className="btn-pill bg-white text-black text-xs font-semibold py-1.5 px-3.5 hover:bg-[#e7e5e4]"
              >
                Launch Live Link
              </a>
            )}
            {artifact.githubUrl && (
              <a
                href={artifact.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-pill btn-pill-dark-outline text-xs py-1.5 px-3.5"
              >
                GitHub Repo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
