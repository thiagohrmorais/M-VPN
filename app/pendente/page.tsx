'use client'

import React from 'react';
import { Clock, MessageCircle, Home } from 'lucide-react';

export default function PagamentoPendente() {
  const WHATSAPP_SUPORTE = "5511999999999"; // Ajuste para o seu número

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-yellow-500/10 p-6 rounded-full mb-8 animate-pulse">
        <Clock className="w-16 h-16 text-yellow-500" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase">
        Pagamento em Análise
      </h1>
      
      <p className="text-slate-400 text-lg max-w-lg mb-12">
        Estamos aguardando a confirmação do seu pagamento. Se você pagou via PIX, a liberação ocorre em instantes. Boletos podem levar até 2 dias úteis.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a href="/">
          <button className="w-full sm:w-auto px-8 py-3 rounded-lg font-bold bg-white text-black hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 uppercase tracking-wider text-sm">
            <Home size={18} />
            Ir para Home
          </button>
        </a>
        
        <a href={`https://wa.me/${WHATSAPP_SUPORTE}`} target="_blank" rel="noopener noreferrer">
          <button className="w-full sm:w-auto px-8 py-3 rounded-lg font-bold border border-slate-700 text-slate-300 hover:border-white hover:text-white transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-sm">
            <MessageCircle size={18} />
            Já paguei / Suporte
          </button>
        </a>
      </div>
    </div>
  );
}