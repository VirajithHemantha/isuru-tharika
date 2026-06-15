import React, { useState } from 'react';
import { Copy, Check, Link as LinkIcon } from 'lucide-react';

export default function Admin() {
  const [prefix, setPrefix] = useState('Mr. & Mrs.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    
    const url = new URL(window.location.origin);
    if (prefix) {
      url.searchParams.set('prefix', prefix);
    }
    url.searchParams.set('name', guestName.trim());
    
    setGeneratedLink(url.toString());
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const prefixes = [
    'Mr. & Mrs.',
    'Mr.',
    'Mrs.',
    'Ms.',
    'Miss',
    'Dr.',
    'Dr. & Mrs.',
    'Rev.',
    'Prof.'
  ];

  return (
    <div className="min-h-screen bg-[#fdfaf5] font-montserrat flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#c7d7c4]/50 p-8">
        <div className="text-center mb-8">
          <h1 className="font-playball text-4xl text-[#3f5240] mb-2">Link Generator</h1>
          <p className="font-cinzel text-xs uppercase tracking-[0.2em] font-bold text-[#5c715e]">Admin Dashboard</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Prefix</label>
            <select 
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full bg-[#fdfaf5] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#5c715e] transition-all font-cinzel"
            >
              <option value="">No Prefix</option>
              {prefixes.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Guest Name</label>
            <input 
              type="text" 
              placeholder="e.g. John Doe"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-[#fdfaf5] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#5c715e] transition-all font-cinzel"
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={!guestName.trim()}
            className="w-full bg-[#3f5240] hover:bg-[#2c3a2d] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-cinzel text-sm tracking-widest uppercase transition-all shadow-md flex items-center justify-center gap-2"
          >
            <LinkIcon className="w-4 h-4" />
            Generate Link
          </button>

          {generatedLink && (
            <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
              <label className="text-xs font-bold text-[#5c715e] uppercase tracking-wider text-center block">Generated Link</label>
              
              <div className="relative flex items-center gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={generatedLink}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-4 pr-12 py-3 text-slate-600 text-sm focus:outline-none"
                />
                <button 
                  onClick={handleCopy}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-[#3f5240] transition-colors bg-white rounded-md border border-slate-100 shadow-sm"
                  title="Copy Link"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
