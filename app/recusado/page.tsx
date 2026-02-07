'use client'

import React from 'react';
import { XCircle, RefreshCw, MessageCircle } from 'lucide-react';

export default function PagamentoRecusado() {
  const WHATSAPP_SUPORTE = "5511999999999"; // Ajuste para o seu número

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-red-500/10 p-6 rounded-full mb-8">
        <XCircle className="w-16 h-16 text-red-500" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase">
        Ops! Pagamento Recusado
      </h1>
      
      <p className="text-slate-400 text-lg max-w-lg mb-12">
        Houve um problema ao processar seu pagamento. Verifique os dados do cartão ou tente uma nova forma de pagamento (PIX é instantâneo!).
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a href="/">
          <button className="w-full sm:w-auto px-8 py-3 rounded-lg font-bold bg-white text-black hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 uppercase tracking-wider text-sm">
            <RefreshCw size={18} />
            Tentar Novamente
          </button>
        </a>
        
        <a href={`https://wa.me/${WHATSAPP_SUPORTE}`} target="_blank" rel="noopener noreferrer">
          <button className="w-full sm:w-auto px-8 py-3 rounded-lg font-bold border border-slate-700 text-slate-300 hover:border-white hover:text-white transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-sm">
            <MessageCircle size={18} />
            Chamar Suporte
          </button>
        </a>
      </div>
    </div>
  );
}