import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, CornerDownLeft } from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState<Array<{ command: string; output: string | React.ReactNode }>>([
    {
      command: 'systemctl status homelab.cluster',
      output: (
        <div className="text-[#89abd2] space-y-1">
          <div>● homelab.cluster - Multi-Node Bare-Metal Self-Hosted Cluster</div>
          <div className="text-white/70">
            Loaded: loaded (/etc/systemd/system/homelab.cluster; enabled)
          </div>
          <div className="text-white/70">
            Active: <span className="text-[#89abd2] font-bold">active (running)</span> continuous 24/7
          </div>
          <div className="text-white/70">
            Nodes: Dell Wyse 5010 [Fedora 41] | Fiberhome HG680-P [Armbian NAS MinIO]
          </div>
          <div className="text-[#dfe7f2] pt-1">
            Type &apos;help&apos; to view available diagnostic commands.
          </div>
        </div>
      ),
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let res: React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        res = (
          <div className="space-y-1 text-white/80">
            <div className="text-[#89abd2] font-bold">Available commands:</div>
            <div><span className="text-[#89abd2] font-semibold">neofetch</span> - Display system architecture &amp; OS specs</div>
            <div><span className="text-[#89abd2] font-semibold">nodes</span> - List physical node specs &amp; active daemons</div>
            <div><span className="text-[#89abd2] font-semibold">projects</span> - List core deployed software works</div>
            <div><span className="text-[#89abd2] font-semibold">whoami</span> - Display operator profile summary</div>
            <div><span className="text-[#89abd2] font-semibold">audio</span> - Inspect acoustic production stack &amp; DAW specs</div>
            <div><span className="text-[#89abd2] font-semibold">contact</span> - Display direct communication channels</div>
            <div><span className="text-[#89abd2] font-semibold">clear</span> - Clear terminal session output</div>
            <div><span className="text-[#89abd2] font-semibold">exit</span> - Close terminal session</div>
          </div>
        );
        break;

      case 'neofetch':
        res = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <pre className="text-[#89abd2] leading-tight">
{`   _____               
  / ____|              
 | (___  _   _ ___     
  \\___ \\| | | / __|    
  ____) | |_| \\__ \\    
 |_____/ \\__, |___/    
          __/ |        
         |___/         `}
            </pre>
            <div className="space-y-1 text-white/80">
              <div><span className="text-[#89abd2] font-bold">operator@evanpranawa</span></div>
              <div className="text-white/30">-----------------------------</div>
              <div><span className="text-[#89abd2]">OS:</span> Fedora Server 41 / Armbian Bookworm</div>
              <div><span className="text-[#89abd2]">Host:</span> Dell Wyse 5010 &amp; HG680-P NAS</div>
              <div><span className="text-[#89abd2]">Storage:</span> MinIO S3 Object Store API</div>
              <div><span className="text-[#89abd2]">Uptime:</span> 99.98% (Bogor, Indonesia)</div>
              <div><span className="text-[#89abd2]">Shell:</span> bash 5.2.26 on Tailscale Mesh</div>
            </div>
          </div>
        );
        break;

      case 'nodes':
        res = (
          <div className="space-y-2 text-white/80 font-mono">
            <div className="text-[#89abd2] font-bold">CLUSTER TOPOLOGY:</div>
            <div className="p-2 bg-black/60 border border-white/10">
              <div className="text-[#89abd2] font-bold">NODE 01: Dell Wyse 5010 [Fedora 41]</div>
              <div>Roles: Docker Host, Nginx Reverse Proxy, aaPanel Control, Tailscale Mesh</div>
              <div>CPU: AMD G-T48E Dual-Core &bull; RAM: 4GB DDR3 &bull; Power: ~9W</div>
            </div>
            <div className="p-2 bg-black/60 border border-white/10">
              <div className="text-[#89abd2] font-bold">NODE 02: Fiberhome HG680-P [Armbian NAS]</div>
              <div>Roles: MinIO S3 Object Store, Samba Volume Shares, MySQL Database</div>
              <div>CPU: Amlogic S905X Quad-Core ARMv8 &bull; RAM: 2GB DDR3 &bull; Power: ~5W</div>
            </div>
          </div>
        );
        break;

      case 'projects':
        res = (
          <div className="space-y-1.5 text-white/80 font-mono">
            <div className="text-[#89abd2] font-bold">CORE PRODUCTION ARTIFACTS:</div>
            <div>[01] <span className="text-white font-bold">Decoupled Storage System</span> &mdash; S3 MinIO on Armbian NAS + TS Frontend</div>
            <div>[02] <span className="text-white font-bold">Laravel MVC NAS Gallery</span> &mdash; CRUD gallery with Armbian storage backend</div>
            <div>[03] <span className="text-white font-bold">GDG Hackathon Binus</span> &mdash; Realtime EdTech quiz application</div>
            <div>[04] <span className="text-white font-bold">Truck Packer 3D</span> &mdash; Three.js spatial packing simulator for PresUniv</div>
          </div>
        );
        break;

      case 'whoami':
        res = (
          <div className="text-white/80 space-y-1">
            <div><span className="text-[#89abd2] font-bold">Name:</span> Evan Pranawa Armansyah</div>
            <div><span className="text-[#89abd2] font-bold">Discipline:</span> Junior SysAdmin &bull; Full-Stack Web &bull; Cybersecurity</div>
            <div><span className="text-[#89abd2] font-bold">Location:</span> Bogor, West Java, Indonesia (UTC+7)</div>
            <div><span className="text-[#89abd2] font-bold">Acoustic Role:</span> Live Event Audio Engineer &bull; DAW Music Producer</div>
          </div>
        );
        break;

      case 'audio':
        res = (
          <div className="text-white/80 space-y-1">
            <div className="text-[#89abd2] font-bold">Acoustics &amp; Production Profile:</div>
            <div>DAW: Ableton Live 11 Suite &bull; PreSonus Studio One</div>
            <div>FOH: Live event sound console mixing &amp; phase alignment</div>
            <div>Instruments: Piano/Keys, Rhythm Guitar, Live Percussion</div>
          </div>
        );
        break;

      case 'contact':
        res = (
          <div className="text-white/80 space-y-1">
            <div>Email: <a href="mailto:evanpranawa@ackteams.com" className="text-[#89abd2] underline">evanpranawa@ackteams.com</a></div>
            <div>GitHub: <a href="https://github.com/Evan52436" target="_blank" rel="noreferrer" className="text-[#89abd2] underline">github.com/Evan52436</a></div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'exit':
        onClose();
        return;

      default:
        res = (
          <div className="text-rose-400">
            command not found: {trimmed}. Type &apos;help&apos; for list of valid commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output: res }]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 backdrop-blur-xl bg-black/80 font-mono select-none">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl h-[560px] bg-[#0d0d0d] border-4 border-[#0d0d0d] shadow-[10px_10px_0px_#89abd2] flex flex-col overflow-hidden text-xs">
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-[#14141b] border-b-2 border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#89abd2] inline-block cursor-pointer" onClick={onClose} />
            <span className="w-3 h-3 bg-[#dfe7f2] inline-block" />
            <span className="ml-2 text-white font-semibold flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-[#89abd2]" />
              <span>evan@homelab-cluster: ~</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-white/60 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-white/60">
                <span className="text-[#89abd2] font-bold">evan@homelab:~$</span>
                <span className="text-white">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Line */}
        <form
          onSubmit={onSubmit}
          className="p-3 bg-[#14141b] border-t border-white/15 flex items-center gap-2"
        >
          <span className="text-[#89abd2] font-bold shrink-0">evan@homelab:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' or any command..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-white/30"
          />
          <button type="submit" className="text-white/60 hover:text-[#89abd2] cursor-pointer">
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
