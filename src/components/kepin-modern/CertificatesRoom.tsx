import React, { useState } from 'react';
import { Award, Shield, Server, ExternalLink, Eye, ArrowUpRight } from 'lucide-react';
import { ExhibitionArtifact } from './ExhibitionLightbox';
import { sound } from '@/lib/sound';

interface CertificatesRoomProps {
  onSelectArtifact: (artifact: ExhibitionArtifact) => void;
}

export const CertificatesRoom: React.FC<CertificatesRoomProps> = ({ onSelectArtifact }) => {
  const [filter, setFilter] = useState('all');

  const certificates: ExhibitionArtifact[] = [
    {
      id: 'cert-1',
      title: 'Top 10 Clash of Cyberheist Finalist',
      issuer: 'MyDigiLearn & HackerRank',
      category: 'cybersecurity',
      image: '/sertifkelompok.webp',
      description: 'Positioned in top 10 on a province-level cybersecurity tournament covering cryptography, web exploitation, and reverse engineering.',
    },
    {
      id: 'cert-2',
      title: 'Introduction to Capture The Flag (CTF)',
      issuer: 'ID-Networkers',
      category: 'cybersecurity',
      image: '/ctf intro.webp',
      description: 'Attended hands-on technical workshop and tournament on offensive & defensive CTF flags and protocol inspection.',
    },
    {
      id: 'cert-3',
      title: 'Project Owner: Decoupled Storage System',
      issuer: 'Wikrama RPL Showcase',
      category: 'engineering',
      image: '/depakto.webp',
      description: 'Formal recognition as Project Owner and lead architect for the Decoupled S3 MinIO Storage System running on Armbian NAS.',
    },
    {
      id: 'cert-4',
      title: 'Finalist AI Open Innovation Competition',
      issuer: 'President University & TUV NORD',
      category: 'engineering',
      image: '/lombah1.webp',
      description: 'Backend Developer for PPE Compliance Monitoring prototype powered by computer vision and real-time streaming.',
    },
    {
      id: 'cert-5',
      title: 'JHIC National Web Competition Finalist',
      issuer: 'Jagoan Hosting Indonesia',
      category: 'sysadmin',
      image: '/jhic1.webp',
      description: 'System Administrator and Project Manager maintaining 100% infrastructure stability across consecutive elimination rounds.',
    },
    {
      id: 'cert-6',
      title: 'IT Infrastructure Internship Certificate',
      issuer: 'School of Universe IT Dept',
      category: 'sysadmin',
      image: '/sou.webp',
      description: 'Managed network cabling, server deployments, system updates, and campus technical hardware troubleshooting.',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Honors' },
    { id: 'cybersecurity', label: 'Cybersecurity & CTF' },
    { id: 'sysadmin', label: 'SysAdmin & Network' },
    { id: 'engineering', label: 'Competitions' },
  ];

  const filteredCerts = filter === 'all'
    ? certificates
    : certificates.filter((c) => c.category === filter);

  return (
    <section
      id="certificates"
      className="relative w-full py-28 px-4 sm:px-8 md:px-12 bg-[#060609] text-white select-none z-10 border-t border-white/10"
    >
      <div className="relative z-20 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col border-b border-white/10 pb-8 mb-12">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#ff2638] mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff2638] inline-block" />
            <span>ACCREDITATION // ARCHIVE 06</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-400">CERTIFICATES &amp; TOURNAMENT HONORS</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-bebas text-6xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[0.85] uppercase">
                HONORS &amp; <span className="text-[#ff2638]">ACCREDITATION</span>
              </h2>
              <p className="mt-2 font-mono text-xs sm:text-sm text-zinc-400 max-w-2xl">
                Verified competition finishes in cybersecurity CTF tournaments, national web hosting contests, and institutional infrastructure roles.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar bg-[#0f0f16] p-1 border border-white/15">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    sound.playClick();
                    setFilter(c.id);
                  }}
                  className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    filter === c.id
                      ? 'bg-[#ff2638] text-white font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert, idx) => (
            <div
              key={cert.id}
              onClick={() => {
                sound.playClick();
                onSelectArtifact(cert);
              }}
              className="group cursor-pointer bg-[#0d0d14] border border-white/10 hover:border-[#ff2638]/60 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Certificate Preview Frame */}
                <div className="relative aspect-[4/3] bg-black/80 overflow-hidden border-b border-white/10">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-transparent to-transparent opacity-60" />

                  <div className="absolute top-2.5 left-2.5 font-mono text-[9px] bg-black/80 px-2 py-0.5 border border-white/10 text-zinc-300">
                    REC_{String(idx + 1).padStart(2, '0')}
                  </div>

                  <div className="absolute top-2.5 right-2.5 p-1.5 bg-black/80 border border-white/15 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-3.5 h-3.5 text-[#ff2638]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <span className="font-mono text-[10px] text-[#ff2638] uppercase tracking-wider block font-bold">
                    {cert.issuer}
                  </span>
                  <h3 className="font-grotesk font-bold text-white text-base sm:text-lg group-hover:text-[#ff2638] transition-colors leading-snug">
                    {cert.title}
                  </h3>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between font-mono text-[10px] text-zinc-500 border-t border-white/5 mt-2">
                <span>VERIFIED RECORD</span>
                <span className="text-zinc-300 group-hover:text-white flex items-center gap-1 font-bold">
                  EXPAND <ArrowUpRight className="w-3 h-3 text-[#ff2638]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
