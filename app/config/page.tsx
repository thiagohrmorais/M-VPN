'use client'

import React, { useState, useEffect, Suspense } from 'react';
import { Copy, ExternalLink, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';

function ConfigContent() {
  const [ssLink, setSsLink] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('c');
      if (code) setSsLink(decodeURIComponent(code));
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(ssLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <Shield className="w-12 h-12 mb-8 text-white/80" />
      <h1 className="text-3xl font-black mb-2 uppercase tracking-tighter">Ativar Conexão</h1>
      <p className="text-slate-400 mb-10 text-sm">Siga os passos abaixo para conectar sua M-VPN.</p>

      <div className="w-full max-w-sm space-y-4">
        <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/10 text-left">
          <h3 className="font-bold mb-4 text-sm text-white">1. Copie seu código</h3>
          <button onClick={handleCopy} className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${copied ? 'bg-green-500 text-black' : 'bg-white text-black'}`}>
            {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
            {copied ? 'COPIADO!' : 'COPIAR CÓDIGO'}
          </button>
        </div>

        <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/10 text-left">
          <h3 className="font-bold mb-4 text-sm text-white">2. Importar para o App</h3>
          <a href={ssLink} className="w-full py-4 rounded-xl font-bold border border-white/20 text-white flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
            <ExternalLink size={20} /> ABRIR OUTLINE
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ConfigPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <ConfigContent />
    </Suspense>
  );
}