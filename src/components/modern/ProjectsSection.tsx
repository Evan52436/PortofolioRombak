import React, { useState } from 'react';
import { ExternalLink, Github, Eye, Sparkles } from 'lucide-react';
import { projects } from '@/lib/data';
import { sound } from '@/lib/sound';
import { ProjectModal, ProjectItem } from './ProjectModal';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'code' | 'Sertificate'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 px-4 md:px-8 max-w-7xl mx-auto z-10 text-[#f0f0f4]"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-white/10 font-mono text-xs tracking-wider text-[#9f9fae] mb-12">
        <div className="flex items-center gap-3">
          <span className="font-classical font-bold text-[#d4a359]">IV.</span>
          <span>OPERA · SELECTED ENGINEERING & ARCHIVES</span>
        </div>
        <div className="flex items-center gap-4">
          <span>CATALOG: {projects.length} ARTIFACTS</span>
          <span className="hidden sm:inline">PROTOTYPES & DEPLOYMENTS</span>
        </div>
      </div>

      {/* Title & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#d4a359] block mb-2">
            Systems & Applied Code
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
            Architected for performance, decoupled storage, and 3D simulation.
          </h2>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 font-mono text-xs shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              setFilter('all');
            }}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-[#d4a359] text-black font-semibold'
                : 'text-white/70 hover:text-white'
            }`}
          >
            All Works ({projects.length})
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setFilter('code');
            }}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'code'
                ? 'bg-[#d4a359] text-black font-semibold'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Systems & Web
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setFilter('Sertificate');
            }}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'Sertificate'
                ? 'bg-[#d4a359] text-black font-semibold'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Certificates & CTF
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => {
          const imgUrl = project.image.imageUrl;
          const isThreeJs = project.technologies.includes('Three.js');

          return (
            <div
              key={project.id}
              className="group rounded-2xl bg-[#13141f] border border-white/10 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#d4a359]/50 hover:-translate-y-1 shadow-xl"
            >
              <div>
                {/* Image Container */}
                <div
                  onClick={() => {
                    sound.playClick();
                    setSelectedProject(project as ProjectItem);
                  }}
                  className="relative aspect-[16/10] overflow-hidden bg-black/60 cursor-pointer"
                >
                  <img
                    src={imgUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13141f] via-transparent to-transparent opacity-80" />

                  {/* Badges on top */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-mono text-[11px]">
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-white/90">
                      {project.category === 'Sertificate' ? 'CERTIFICATE' : 'SYSTEM'}
                    </span>
                    {isThreeJs && (
                      <span className="bg-[#d4a359] text-black font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>3D WebGL</span>
                      </span>
                    )}
                  </div>

                  {/* Hover Eye Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                    <span className="btn-pill bg-white text-black text-xs font-semibold flex items-center gap-1.5 py-1.5 px-4 shadow-lg">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Artifact</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <div className="font-classical text-xs text-[#d4a359]">
                    N° 0{idx + 1}
                  </div>
                  <h3
                    onClick={() => {
                      sound.playClick();
                      setSelectedProject(project as ProjectItem);
                    }}
                    className="font-serif text-xl font-medium text-white group-hover:text-[#d4a359] transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs text-[#a7a8b8] line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Bottom Footer & Stack */}
              <div className="p-5 pt-0 space-y-4">
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-[#c8c9db] border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-[#8b8c9e]">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 text-xs font-mono">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setSelectedProject(project as ProjectItem);
                    }}
                    className="text-[#d4a359] hover:underline flex items-center gap-1"
                  >
                    <span>View Dossier</span>
                  </button>

                  <div className="flex items-center gap-2 text-white/70">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md hover:bg-white/10 hover:text-white transition-all"
                        title="Live Site"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md hover:bg-white/10 hover:text-white transition-all"
                        title="Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dossier Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
