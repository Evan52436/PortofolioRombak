import React, { useState } from 'react';
import { Send, Check, Mail, Github, ArrowUp, ArrowUpRight, Copy, CheckCheck, Terminal, Shield } from 'lucide-react';
import { sound } from '@/lib/sound';

interface ContactRoomProps {
  onScrollTop: () => void;
}

export const ContactRoom: React.FC<ContactRoomProps> = ({ onScrollTop }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const emailAddress = 'evanpranawa@ackteams.com';

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playChime();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen py-28 px-4 sm:px-8 md:px-12 bg-[#050508] text-white select-none z-10 flex flex-col justify-between border-t border-white/10"
    >
      <div className="relative z-20 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col border-b border-white/10 pb-8 mb-12">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#ff2638] mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff2638] inline-block" />
            <span>DISPATCH &bull; COLOPHON // COVER 07</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-400">SECURE INQUIRIES &amp; ARCHIVE CLOSE</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-bebas text-6xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[0.85] uppercase">
                GET IN <span className="text-[#ff2638]">TOUCH</span>
              </h2>
              <p className="mt-2 font-mono text-xs sm:text-sm text-zinc-400 max-w-2xl">
                Open for bare-metal cluster engineering, decoupled S3 storage consulting, full-stack web builds, and live audio acoustic production.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyEmail}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs flex items-center gap-2 transition-colors cursor-pointer"
                title="Copy direct email address"
              >
                {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#ff2638]" />}
                <span>{copied ? 'EMAIL COPIED!' : emailAddress}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Contact Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          {/* Left Column: Direct Inquiries & Computer Colophon */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-instrument italic text-3xl sm:text-4xl text-zinc-100 font-normal leading-snug">
              “Let&apos;s engineer something resilient, modern, and computationally sound.”
            </h3>
            <p className="font-sans text-sm text-zinc-300 leading-relaxed">
              Based in Bogor, Indonesia (UTC+7). Whether you need a self-hosted S3 object store, a hardened Linux reverse-proxy cluster, or live audio engineering, feel free to transmit a payload.
            </p>

            {/* Quick Link Cards */}
            <div className="space-y-3 pt-2 font-mono">
              <a
                href="https://github.com/Evan52436"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-4 bg-[#0d0d14] border border-white/10 hover:border-[#ff2638]/60 flex items-center justify-between text-zinc-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-white" />
                  <div>
                    <span className="font-bold block text-sm">GitHub</span>
                    <span className="text-xs text-zinc-500">github.com/Evan52436</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[#ff2638] transition-colors" />
              </a>

              <a
                href="mailto:evanpranawa@ackteams.com"
                onClick={() => sound.playClick()}
                className="p-4 bg-[#0d0d14] border border-white/10 hover:border-[#ff2638]/60 flex items-center justify-between text-zinc-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#ff2638]" />
                  <div>
                    <span className="font-bold block text-sm">Direct Transmission</span>
                    <span className="text-xs text-zinc-500">{emailAddress}</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[#ff2638] transition-colors" />
              </a>
            </div>

            {/* Technical Colophon Stamp */}
            <div className="p-4 bg-white/[0.02] border border-white/10 font-mono text-[11px] text-zinc-400 space-y-1">
              <div className="text-white font-bold">[COLOPHON // STACK_META]</div>
              <div>ENGINE: Bun 1.4 + Vite 8 + React 18 + Three.js WebGL</div>
              <div>TYPOGRAPHY: Bebas Neue, Instrument Serif, Space Grotesk, JetBrains Mono</div>
              <div>HOSTING: Dell Wyse 5010 Fedora 41 &bull; Fiberhome HG680-P NAS</div>
            </div>
          </div>

          {/* Right Column: Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-[#0d0d14] border border-white/15 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6 font-mono text-xs text-zinc-400">
                <span className="text-white font-bold flex items-center gap-2">
                  <Send className="w-3.5 h-3.5 text-[#ff2638]" />
                  TRANSMIT PAYLOAD TO OPERATOR
                </span>
                <span className="text-emerald-400 font-bold">PORT: 4173 READY</span>
              </div>

              {sent ? (
                <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 font-mono">
                  <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-white text-lg">
                    TRANSMISSION DISPATCHED
                  </h4>
                  <p className="text-xs text-zinc-300 font-sans">
                    Payload received and queued on the homelab daemon. A response will be returned shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-zinc-400 uppercase tracking-wider block">
                        Sender Handle / Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-2.5 bg-black/60 border border-white/15 focus:border-[#ff2638] focus:outline-none font-sans text-sm text-white placeholder-zinc-600 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-zinc-400 uppercase tracking-wider block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="alex@domain.com"
                        className="w-full px-4 py-2.5 bg-black/60 border border-white/15 focus:border-[#ff2638] focus:outline-none font-sans text-sm text-white placeholder-zinc-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-400 uppercase tracking-wider block">
                      Message / Project Payload
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Specify your cluster scope, MinIO S3 decoupled storage requirements, or audio collaboration inquiry..."
                      className="w-full px-4 py-2.5 bg-black/60 border border-white/15 focus:border-[#ff2638] focus:outline-none font-sans text-sm text-white placeholder-zinc-600 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#ff2638] hover:bg-[#e52536] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#ff2638]/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>TRANSMIT DISPATCH PAYLOAD</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Colophon & Back Cover Barcode Footer */}
      <footer className="relative z-20 max-w-7xl mx-auto w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-zinc-500">
        <div className="flex items-center gap-4">
          {/* Barcode graphic */}
          <div className="flex items-center gap-1 opacity-70">
            <div className="w-[2px] h-8 bg-white" />
            <div className="w-[1px] h-8 bg-white" />
            <div className="w-[3px] h-8 bg-white" />
            <div className="w-[1px] h-8 bg-white" />
            <div className="w-[2px] h-8 bg-white" />
            <div className="w-[4px] h-8 bg-white" />
            <div className="w-[1px] h-8 bg-white" />
            <div className="w-[2px] h-8 bg-white" />
          </div>
          <div>
            <span className="text-white block font-bold">EVAN PRANAWA ARMANSYAH</span>
            <span className="text-[10px] text-zinc-400">EDITION MMXXVI // PROVENANCE &amp; RESILIENCE</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span>RUNNING ON BUN &bull; PORT 4173</span>
          <button
            onClick={() => {
              sound.playClick();
              onScrollTop();
            }}
            className="flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
            title="Return to Cover Masthead"
          >
            <span>RETURN TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#ff2638]" />
          </button>
        </div>
      </footer>
    </section>
  );
};
