import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Disc3, Radio, Sliders, Activity, Sparkles } from 'lucide-react';
import { sound } from '@/lib/sound';

const FREQ_KEYS = [
  { label: 'SUB 60Hz', freq: 60, type: 'sine' as OscillatorType, desc: 'Sub-bass kick & sub synth resonance' },
  { label: 'WARMTH 220Hz', freq: 220, type: 'sine' as OscillatorType, desc: 'Bass guitar fundamental & piano lower register' },
  { label: 'BODY 440Hz', freq: 440, type: 'triangle' as OscillatorType, desc: 'Standard concert pitch A4 · Mid warmth' },
  { label: 'PRESENCE 1.2kHz', freq: 1200, type: 'sawtooth' as OscillatorType, desc: 'Vocal clarity & guitar bite' },
  { label: 'AIR 5.5kHz', freq: 5500, type: 'sine' as OscillatorType, desc: 'Cymbal shimmer, tape sparkle & acoustic headroom' },
];

export const AudioLabSection: React.FC = () => {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  // Oscilloscope canvas visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const draw = () => {
      ctx.fillStyle = '#08080c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Center zero line
      ctx.strokeStyle = 'rgba(255, 38, 56, 0.2)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Dynamic Waveform
      ctx.strokeStyle = '#ff2638';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#ff2638';
      ctx.shadowBlur = 10;
      ctx.beginPath();

      const sliceWidth = canvas.width / 100;
      let x = 0;

      for (let i = 0; i < 100; i++) {
        const amp = activeNote ? 35 : 10;
        const speed = activeNote ? 0.08 : 0.02;
        phase += speed * 0.01;
        const v = Math.sin(i * 0.15 + phase) * Math.cos(i * 0.05 + phase * 0.5);
        const y = canvas.height / 2 + v * amp;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.stroke();
      ctx.shadowBlur = 0;

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [activeNote]);

  const handleKeyTrigger = (k: typeof FREQ_KEYS[0]) => {
    setActiveNote(k.label);
    sound.playTone(k.freq, k.type, 0.4);
    setTimeout(() => {
      setActiveNote((prev) => (prev === k.label ? null : prev));
    }, 400);
  };

  return (
    <section className="relative w-full py-24 px-4 sm:px-8 md:px-12 bg-[#060609] text-white border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col border-b border-white/10 pb-6 mb-12">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#ff2638] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#ff2638] animate-pulse" />
            <span>ACOUSTICS &amp; FREQUENCIES // DISCIPLINE 02</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-400">EVENT AUDIO &amp; DAW PRODUCTION</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[0.85] uppercase">
                THE SOUND <span className="text-[#ff2638]">LABORATORY</span>
              </h2>
              <p className="mt-2 font-grotesk text-zinc-400 text-sm sm:text-base max-w-2xl">
                Dual creative identity: When not provisioning Linux kernels, I engineer live acoustics for live events and sculpt digital frequencies in Ableton Live &amp; Studio One.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs bg-white/5 border border-white/10 px-4 py-2 rounded">
              <Radio className="w-3.5 h-3.5 text-[#ff2638] animate-ping" />
              <span className="text-zinc-400">ENGINE:</span>
              <span className="text-white font-bold">WEB AUDIO OSCILLOSCOPE</span>
            </div>
          </div>
        </div>

        {/* Interactive Audio Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Live Oscilloscope Screen */}
          <div className="lg:col-span-7 bg-[#0b0b10] border border-white/15 p-6 rounded-none shadow-2xl relative overflow-hidden">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Activity className="w-4 h-4 text-[#ff2638]" />
                <span>REAL-TIME HARMONIC OSCILLOSCOPE</span>
              </div>
              <span className="text-emerald-400 text-[11px] font-mono">
                {activeNote ? `ACTIVE: ${activeNote}` : 'IDLE WAVE · 48.0 kHz'}
              </span>
            </div>

            {/* Canvas */}
            <div className="relative border border-white/10 bg-[#08080c] overflow-hidden">
              <canvas
                ref={canvasRef}
                width={640}
                height={220}
                className="w-full h-48 block"
              />

              {/* Technical HUD Overlay on Canvas */}
              <div className="absolute top-2 left-3 font-mono text-[10px] text-zinc-500 uppercase">
                VOLT/DIV: 0.5V &bull; TIME/DIV: 2ms &bull; CH-1 RED
              </div>
              <div className="absolute bottom-2 right-3 font-mono text-[10px] text-[#ff2638] tracking-widest">
                {activeNote ? `TRIGGERED` : `READY`}
              </div>
            </div>

            {/* Frequency Trigger Keys */}
            <div className="mt-6 space-y-2">
              <span className="block font-mono text-[11px] text-zinc-400 uppercase tracking-widest">
                TAP KEY TO SYNTHESIZE FREQUENCY:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {FREQ_KEYS.map((k) => (
                  <button
                    key={k.label}
                    onClick={() => handleKeyTrigger(k)}
                    className={`p-3 border text-left font-mono transition-all cursor-pointer ${
                      activeNote === k.label
                        ? 'bg-[#ff2638] text-white border-[#ff2638] shadow-lg shadow-[#ff2638]/40 scale-102'
                        : 'bg-[#12121a] hover:bg-[#1a1a24] text-zinc-300 border-white/10 hover:border-[#ff2638]/50'
                    }`}
                  >
                    <span className="text-xs font-bold block">{k.label}</span>
                    <span className="text-[10px] opacity-70 block mt-0.5 truncate">{k.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Technical Audio Production Specs */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 bg-[#0b0b10] border border-white/15 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-white font-bold">
                <span className="flex items-center gap-2">
                  <Disc3 className="w-4 h-4 text-[#ff2638]" />
                  PRODUCTION &amp; LIVE RIG
                </span>
                <span className="text-zinc-500 text-[10px]">DAW_SPEC_01</span>
              </div>

              <div className="space-y-3 text-zinc-300 font-sans text-xs">
                <div className="border-b border-white/5 pb-2">
                  <span className="text-zinc-500 font-mono block text-[10px]">DIGITAL AUDIO WORKSTATIONS</span>
                  <span className="text-white font-semibold">Ableton Live 11 Suite &bull; PreSonus Studio One</span>
                </div>

                <div className="border-b border-white/5 pb-2">
                  <span className="text-zinc-500 font-mono block text-[10px]">EVENT ENGINEERING DISCIPLINE</span>
                  <span className="text-white font-semibold">Front-of-House (FOH) Live Mixing &bull; Stage Cabling &bull; Acoustic Phase Alignment</span>
                </div>

                <div className="border-b border-white/5 pb-2">
                  <span className="text-zinc-500 font-mono block text-[10px]">MULTI-INSTRUMENTAL PERFORMANCE</span>
                  <span className="text-white font-semibold">Keyboard/Piano &bull; Rhythm &amp; Electric Guitar &bull; Live Drums</span>
                </div>

                <div className="pt-1">
                  <span className="text-zinc-500 font-mono block text-[10px]">ACOUSTIC PHILOSOPHY</span>
                  <p className="italic text-zinc-400 mt-1 leading-relaxed font-instrument text-sm">
                    “Just as a high-availability cluster requires zero packet collisions, a balanced audio mix demands precise frequency separation and harmonic headroom.”
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Audio Badge */}
            <div className="p-4 bg-white/[0.02] border border-white/10 flex items-center justify-between font-mono text-xs">
              <span className="text-zinc-400">SOUND SYNTHESIZER:</span>
              <span className="text-[#ff2638] font-bold">ACTIVE &bull; 5 OSCILLATORS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
