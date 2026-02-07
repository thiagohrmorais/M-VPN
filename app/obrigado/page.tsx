'use client'

import React from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Obrigado() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-green-500/10 p-6 rounded-full mb-8 animate-bounce">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
        Pagamento Aprovado!
      </h1>
      
      <p className="text-slate-400 text-lg max-w-lg mb-12">
        Seu acesso premium já foi liberado. Verifique seu WhatsApp, enviamos as instruções de conexão por lá.
      </p>

      <Link href="/">
        <button className="px-8 py-3 rounded-lg font-bold bg-white text-black hover:bg-slate-200 transition-colors flex items-center gap-2 uppercase tracking-wider text-sm">
          <ArrowLeft size={18} />
          Voltar ao Início
        </button>
      </Link>
    </div>
  );
}