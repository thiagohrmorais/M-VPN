'use client'

import React, { useState, useEffect } from 'react';
import { Copy, ExternalLink, CheckCircle2, Shield, Download } from 'lucide-react';

export default function ConfigPage() {
  const [ssLink, setSsLink] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('c');
    if (code) {
      // Decodifica o link que veio do n8n
      setSsLink(decodeURIComponent(code));
    }
  }, []);

  const handleCopy = () => {
    if (!ssLink) return;
    navigator.clipboard.writeText(ssLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const openOutline = () => {
    if (!ssLink) return;
    // Tenta abrir o app diretamente com o código
    window.location.href = ssLink; 
    
    // Se em 2 segundos nada acontecer (app não instalado), avisa o usuário
    setTimeout(() => {
      if (confirm("O Outline não abriu? Clique em OK para baixar o app.")) {
        window.open("https://getoutline.org/pt-BR/get-started/#step-2", "_blank");
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white/5 p-4 rounded-2xl border border-white/10 mb-8">
        <Shield className="w-12 h-12 text-white" />
      </div>

      <h1 className="text-3xl font-black mb-2 uppercase tracking-tighter">Ativar Conexão</h1>
      <p className="text-slate-400 mb-10 max-w-xs text-sm">Siga os passos para conectar sua M-VPN Premium.</p>

      <div className="w-full max-w-sm space-y-4">
        {/* Passo 1: Copiar */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 text-left">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Passo 1</span>
          <h3 className="font-bold mb-4 text-sm">Copie seu código de acesso</h3>
          <button 
            onClick={handleCopy}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${copied ? 'bg-green-500 text-black' : 'bg-white text-black hover:bg-slate-200'}`}
          >
            {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
            {copied ? 'COPIADO COM SUCESSO!' : 'COPIAR CÓDIGO'}
          </button>
        </div>

        {/* Passo 2: Abrir App */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 text-left">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Passo 2</span>
          <h3 className="font-bold mb-4 text-sm">Importar para o Outline</h3>
          <button 
            onClick={openOutline}
            className="w-full py-4 rounded-xl font-bold border border-slate-700 text-white flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
          >
            <ExternalLink size={20} />
            ABRIR E CONECTAR
          </button>
        </div>
      </div>
    </div>
  );
}