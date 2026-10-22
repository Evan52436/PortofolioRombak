import React, { useState } from 'react';
import { Mail, Github, MapPin, Send, Check, Copy, Radio, ArrowUpRight } from 'lucide-react';
import { sound } from '@/lib/sound';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const email = 'evanpranawaarmansyah@gmail.com';

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playChime();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 px-4 md:px-8 max-w-7xl mx-auto z-10 text-[#f0f0f4] flex flex-col justify-between"
    >
      <div>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-white/10 font-mono text-xs tracking-wider text-[#9f9fae] mb-12">
          <div className="flex items-center gap-3">
            <span className="font-classical font-bold text-[#d4a359]">VI.</span>
            <span>EPISTVLA · INITIATE TRANSMISSION</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AVAILABLE FOR COLLABORATION
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left: Contact Info & Philosophy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#d4a359] block">
                Open Channels
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
                Let&apos;s engineer something resilient together.
              </h2>
            </div>

            <p className="font-sans text-sm text-[#b0b1c2] leading-relaxed">
              Whether you are discussing homelab infrastructure, network
              deployments, full-stack web applications, or acoustic audio
              productions, my channels are always open.
            </p>

            {/* Quick Copy Email Card */}
            <div className="p-5 rounded-2xl bg-[#13141f] border border-white/10 space-y-3">
              <div className="font-mono text-xs text-[#8e8f9e] uppercase">
                DIRECT ELECTRONIC MAIL
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-sm text-white select-all break-all">
                  {email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white transition-all shrink-0"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copied && (
                <div className="font-mono text-[11px] text-emerald-400">
                  Address copied to clipboard.
                </div>
              )}
            </div>

            {/* External Links */}
            <div className="space-y-2 pt-2 font-mono text-xs">
              <a
                href="https://github.com/Evan52436"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:border-[#d4a359] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4 text-[#d4a359]" />
                  <span className="text-white group-hover:text-[#d4a359] transition-colors">
                    GitHub Profile
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-[#d4a359] transition-colors" />
              </a>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#d4a359]" />
                  <span className="text-white">Base: Bogor, West Java</span>
                </div>
                <span className="text-[#8e8f9e]">UTC+7</span>
              </div>
            </div>
          </div>

          {/* Right: Message Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-3xl bg-[#13141f] border border-white/10 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
                <span className="text-[#d4a359] uppercase tracking-wider">
                  DISPATCH PACKET // TRANSMISSION
                </span>
                <span className="text-[#7a7b8e]">SECURE CHANNEL</span>
              </div>

              {sent ? (
                <div className="py-16 text-center space-y-3 font-mono">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-white">
                    Transmission Dispatched
                  </h3>
                  <p className="text-xs text-[#a0a1b2] max-w-sm mx-auto">
                    Thank you. Your packet has been registered. I will respond to
                    your designated mail terminal promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-[#a0a1b2] uppercase text-[11px] mb-1.5">
                      IDENTIFIER / NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      placeholder="e.g. Leonardo da Vinci"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#d4a359] transition-all font-sans text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[#a0a1b2] uppercase text-[11px] mb-1.5">
                      RETURN MAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      placeholder="e.g. operator@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#d4a359] transition-all font-sans text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[#a0a1b2] uppercase text-[11px] mb-1.5">
                      TRANSMISSION PAYLOAD / MESSAGE
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Describe project requirements, architecture discussion, or collaboration..."
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#d4a359] transition-all font-sans text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-pill bg-[#d4a359] text-black font-bold hover:bg-[#e4b56d] flex items-center justify-center gap-2 py-3 shadow-lg"
                  >
                    <span>Transmit Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Colophon & Footer */}
      <footer className="pt-8 border-t border-white/10 font-mono text-xs text-[#7e7f91] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          ARCHIVVM MMXXVI &copy; EVAN PRANAWA ARMANSYAH. ALL RIGHTS RESERVED.
        </div>
        <div className="flex items-center gap-4">
          <span>BUILT WITH VITE &bull; THREE.JS &bull; BUN</span>
        </div>
      </footer>
    </section>
  );
};
