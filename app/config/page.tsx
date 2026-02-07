'use client'

import React, { useState, useEffect } from 'react';
import { Copy, ExternalLink, CheckCircle2, Shield } from 'lucide-react';

export default function ConfigPage() {
  const [ssLink, setSsLink] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Pega o código da URL: seusite.com/config?c=ss://...
    const params = new URLSearchParams(window.location.search);
    const code = params.get('c');
    if (code) setSsLink(code);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(ssLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white/5 p-4 rounded-2xl border border-white/10 mb-8">
        <Shield className="w-12 h-12 text-white" />
      </div>

      <h1 className="text-3xl font-black mb-2 uppercase tracking-tighter">Ativar Conexão</h1>
      <p className="text-slate-400 mb-10 max-w-xs">Siga os passos abaixo para conectar sua M-VPN Premium.</p>

      <div className="w-full max-w-sm space-y-4">
        {/* Passo 1: Copiar */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 text-left">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Passo 1</span>
          <h3 className="font-bold mb-4">Copie seu código de acesso</h3>
          <button 
            onClick={handleCopy}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${copied ? 'bg-green-500 text-black' : 'bg-white text-black hover:bg-slate-200'}`}
          >
            {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
            {copied ? 'COPIADO!' : 'COPIAR CÓDIGO'}
          </button>
        </div>

        {/* Passo 2: Abrir App */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 text-left">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Passo 2</span>
          <h3 className="font-bold mb-4">Abra o Aplicativo Outline</h3>
          <p className="text-xs text-slate-500 mb-4 italic">Após abrir, clique no (+) e o código será detectado.</p>
          <a href="https://getoutline.org/pt-BR/" target="_blank" className="w-full py-4 rounded-xl font-bold border border-slate-700 text-white flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
            <ExternalLink size={20} />
            ABRIR OUTLINE
          </a>
        </div>
      </div>
    </div>
  );
}