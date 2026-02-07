'use client'

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Globe, 
  Smartphone, 
  Lock, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  PlayCircle, 
  Wifi,
  Menu,
  X,
  Server,
  EyeOff,
  Crosshair,
  Loader2,
  CreditCard
} from 'lucide-react';

// --- CONFIGURAÇÃO ---
const N8N_WEBHOOK_URL = "https://m-n8n.tnxmedia.pro/webhook/processar-pagamento";

// --- COMPONENTES VISUAIS ---

const MLogo = ({ className = "w-12 h-12" }) => (
  // Logo usada apenas no rodapé agora
  <img 
    src="/logo.png" 
    alt="Logo M-VPN" 
    className={`${className} object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`} 
  />
);

const Button = ({ children, variant = 'primary', className = "", onClick, href, disabled, isLoading }) => {
  const baseStyle = "px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-[1.05] active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] border border-transparent",
    secondary: "bg-slate-900 text-white border border-slate-700 hover:bg-slate-800 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]",
    outline: "bg-transparent border border-slate-600 text-slate-400 hover:border-white hover:text-white",
    green: "bg-green-500 text-black hover:bg-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]"
  };

  const Component = href ? 'a' : 'button';
  
  return (
    <Component 
      onClick={onClick} 
      href={href}
      disabled={disabled || isLoading}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
      {children}
    </Component>
  );
};

const PlanCard = ({ title, price, features, recommended = false, dataLimit, highlight, label, onSelect, planId, delay }) => (
  <div className={`relative flex flex-col p-8 rounded-[1.5rem] transition-all duration-500 h-full animate-in fade-in slide-in-from-bottom-8 ${
    recommended 
      ? "bg-gradient-to-b from-slate-900 to-[#0a0a0a] border border-white/30 shadow-[0_0_60px_rgba(255,255,255,0.05)] transform hover:-translate-y-4 z-10 hover:shadow-[0_0_80px_rgba(255,255,255,0.1)]" 
      : "bg-[#0a0a0a] border border-slate-800 hover:border-slate-600 hover:bg-slate-900 transform hover:-translate-y-2 hover:shadow-xl"
  }`}
  style={{ animationDelay: `${delay}ms` }}
  >
    {recommended && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-black font-black px-6 py-1 rounded-sm text-xs tracking-[0.2em] shadow-xl uppercase whitespace-nowrap animate-pulse">
        MELHOR ESCOLHA
      </div>
    )}
    
    {label && !recommended && (
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-slate-800 text-slate-400 font-bold px-4 py-1 rounded-sm text-[10px] tracking-widest uppercase border border-slate-700">
        {label}
      </div>
    )}
    
    <div className="text-center border-b border-slate-800/50 pb-6 mb-6">
      <h3 className={`text-xl font-black uppercase tracking-wider mb-2 ${recommended ? 'text-white' : 'text-slate-400'}`}>{title}</h3>
      <p className="text-slate-500 text-xs h-8 flex items-center justify-center px-4 font-medium">{highlight}</p>
      
      <div className="mt-4 flex items-center justify-center">
        <span className="text-lg text-slate-600 mr-1 font-medium">R$</span>
        <span className={`text-5xl font-black tracking-tighter ${recommended ? 'text-white' : 'text-slate-300'}`}>{price}</span>
      </div>
      <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest mt-1 block">Mensal</span>
    </div>

    <div className="flex-1 flex flex-col">
      <div className="w-full bg-slate-800/30 rounded-full h-1.5 mb-4 overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ${recommended ? 'bg-white w-full shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-slate-600'}`} 
          style={{width: recommended ? '100%' : title.includes('Padrão') ? '60%' : '20%'}}
        ></div>
      </div>
      <p className="text-center text-slate-400 font-mono text-xs mb-8 bg-slate-900/30 py-1.5 rounded border border-slate-800/50 uppercase tracking-wide">
        {dataLimit}
      </p>

      <ul className="space-y-4 mb-8 flex-1 px-1">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start text-slate-400 group">
            <CheckCircle size={16} className={`mr-3 flex-shrink-0 transition-all duration-300 ${recommended ? 'text-white shadow-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-slate-700 group-hover:text-green-400'}`} />
            <span className="text-sm font-medium leading-snug group-hover:text-slate-200 transition-colors">{feature}</span>
          </li>
        ))}
      </ul>

      <Button 
        variant={recommended ? 'primary' : 'secondary'}
        onClick={() => onSelect({ id: planId, title, price })}
        className="w-full text-xs"
      >
        ATIVAR AGORA
      </Button>
      
      <p className="text-center text-[10px] text-slate-700 mt-4 flex items-center justify-center gap-1 uppercase tracking-wider font-bold opacity-60">
        <Lock size={10} /> Checkout Blindado
      </p>
    </div>
  </div>
);

const CheckoutModal = ({ isOpen, onClose, plan, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({ nome: '', whatsapp: '', email: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, plano: plan.id });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative bg-[#0f1115] border border-white/10 w-full max-w-md rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in slide-in-from-bottom-10 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Finalizar Acesso</h3>
          <p className="text-slate-400 text-sm">Você escolheu: <span className="text-white font-bold">{plan?.title}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Seu Nome</label>
            <input 
              type="text" 
              required
              placeholder="Ex: João Silva"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/50 transition-all"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">WhatsApp (Com DDD)</label>
            <input 
              type="tel" 
              required
              placeholder="Ex: 11999999999"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/50 transition-all"
              value={formData.whatsapp}
              onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
            />
            <p className="text-[10px] text-slate-600 mt-1">*Seu acesso será enviado para este número.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">E-mail</label>
            <input 
              type="email" 
              required
              placeholder="seu@email.com"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/50 transition-all"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="pt-4">
            <Button 
              variant="green" 
              className="w-full py-4 text-base"
              isLoading={isLoading}
            >
              <CreditCard size={18} />
              PAGAR R$ {plan?.price}
            </Button>
          </div>
          
          <p className="text-center text-[10px] text-slate-600">
            Ambiente seguro. Seus dados são processados automaticamente.
          </p>
        </form>
      </div>
    </div>
  );
};

const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-800 last:border-0">
      <button
        className="w-full py-5 flex justify-between items-center text-left hover:text-white transition-colors group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-base text-slate-300 group-hover:text-white uppercase tracking-wide transition-colors">{question}</span>
        {isOpen ? <ChevronUp className="text-white" size={18} /> : <ChevronDown className="text-slate-600" size={18} />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-48 opacity-100 pb-6" : "max-h-0 opacity-0"}`}>
        <p className="text-slate-400 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2">{answer}</p>
      </div>
    </div>
  );
};

const SecurityStep = ({ icon: Icon, title, description, step, delay }) => (
  <div 
    className="relative p-8 bg-slate-900/30 border border-slate-800 rounded-2xl hover:border-white/30 hover:bg-slate-900/50 transition-all duration-500 group hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute -top-4 -left-4 w-10 h-10 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center text-white font-mono font-bold shadow-xl text-sm group-hover:border-white/50 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-500">
      {step}
    </div>
    <div className="mb-5 text-slate-500 group-hover:text-white transition-colors duration-500">
      <Icon size={32} strokeWidth={1.5} />
    </div>
    <h3 className="text-lg font-black text-white mb-2 uppercase tracking-wide">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

// --- PÁGINA PRINCIPAL ---

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const scrollToId = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handleCheckout = async (formData) => {
    setLoading(true);
    try {
      // Envia dados para o n8n
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Se o n8n retornar um JSON com a URL (Configuração Ideal)
      const data = await response.json();
      
      if (data.url || data.init_point) {
        window.location.href = data.url || data.init_point;
      } else if (response.redirected) {
        // Fallback se o n8n estiver fazendo redirect direto
        window.location.href = response.url;
      } else {
        // Fallback final: tenta ler o location header se possível ou mostra erro
        alert("Redirecionando para pagamento...");
      }

    } catch (error) {
      console.error("Erro no checkout:", error);
      alert("Erro ao processar. Tente novamente ou contate o suporte.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-white/30 overflow-x-hidden">
      
      <CheckoutModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        plan={selectedPlan}
        isLoading={loading}
        onSubmit={handleCheckout}
      />

      {/* Background Effects (Animados) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-slate-900/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-800/10 rounded-full blur-[120px] animate-float-delayed" />
      </div>

      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/5 bg-[#050505]/95 backdrop-blur-md animate-in fade-in slide-in-from-top duration-700">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            {/* Logo de imagem removida, apenas texto agora */}
            <span className="text-2xl font-black text-white tracking-[0.2em] group-hover:text-slate-300 transition-colors">M-VPN</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <button onClick={() => scrollToId('beneficios')} className="hover:text-white transition-colors hover:scale-105 transform duration-200">Recursos</button>
            <button onClick={() => scrollToId('como-funciona')} className="hover:text-white transition-colors hover:scale-105 transform duration-200">Tecnologia</button>
            <button onClick={() => scrollToId('planos')} className="hover:text-white transition-colors hover:scale-105 transform duration-200">Acesso</button>
            <button onClick={() => scrollToId('faq')} className="hover:text-white transition-colors hover:scale-105 transform duration-200">FAQ</button>
          </div>
          
          <div className="hidden md:block">
            <Button onClick={() => scrollToId('planos')} variant="primary" className="px-8 py-3 text-xs">
              Área do Cliente
            </Button>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-24 left-0 w-full bg-[#050505] border-b border-white/10 p-8 flex flex-col gap-6 animate-in slide-in-from-top-10 fade-in duration-300 shadow-2xl">
            <button onClick={() => scrollToId('beneficios')} className="text-left text-sm font-bold uppercase tracking-widest text-slate-400">Recursos</button>
            <button onClick={() => scrollToId('como-funciona')} className="text-left text-sm font-bold uppercase tracking-widest text-slate-400">Tecnologia</button>
            <button onClick={() => scrollToId('planos')} className="text-left text-sm font-bold uppercase tracking-widest text-slate-400">Acesso</button>
            <Button onClick={() => scrollToId('planos')} variant="primary" className="w-full mt-4">
              Começar Agora
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-48 pb-32 md:pt-64 md:pb-48 px-6 overflow-hidden">
        
        <div className="container mx-auto text-center max-w-7xl relative z-10">
          
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded px-5 py-2 mb-12 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default animate-in fade-in zoom-in duration-700 delay-100">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-600"></span>
            </span>
            <span className="text-[10px] font-black text-slate-300 tracking-[0.2em] uppercase">Rede Operacional</span>
          </div>

          {/* LOGO DE FUNDO (Watermark) - Posicionada ENTRE "Rede Operacional" e o Título */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-0 opacity-20 pointer-events-none animate-pulse-glow flex justify-center items-center w-full">
            <img 
              src="/logo.png" 
              alt="Logo Background" 
              className="w-[300px] h-auto md:w-[600px] object-contain grayscale"
            />
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-10 leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200 relative z-10">
            INTERNET<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-400 to-slate-700 animate-pulse-glow">
              SEM LIMITES.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            A única VPN com <strong>criptografia de nível militar</strong> que libera o potencial máximo do seu 5G. Roteamento inteligente para Streaming 4K e Jogos Competitivos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">
            <Button onClick={() => scrollToId('planos')} variant="primary" className="w-full sm:w-auto min-w-[240px] py-4 text-sm">
              <ShieldCheck size={20} className="text-black" />
              ATIVAR PROTEÇÃO
            </Button>
            <Button onClick={() => window.open('https://wa.me/55NUMERO', '_blank')} variant="outline" className="w-full sm:w-auto min-w-[240px] py-4 text-sm">
              <Smartphone size={20} />
              TESTAR CONEXÃO
            </Button>
          </div>

          <div className="mt-24 pt-12 border-t border-white/5 animate-in fade-in duration-1000 delay-700">
            <p className="text-[10px] text-slate-600 mb-8 uppercase tracking-[0.3em] font-bold">Protocolos Compatíveis</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
               <span className="text-sm font-bold text-white flex items-center gap-3 tracking-widest hover:scale-110 transition-transform"><Lock size={16}/> SHADOWSOCKS</span>
               <span className="text-sm font-bold text-white flex items-center gap-3 tracking-widest hover:scale-110 transition-transform"><Globe size={16}/> V2RAY</span>
               <span className="text-sm font-bold text-white flex items-center gap-3 tracking-widest hover:scale-110 transition-transform"><ShieldCheck size={16}/> WIREGUARD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Benefícios */}
      <section id="beneficios" className="py-32 bg-slate-900/10 border-y border-white/5 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            <div className="md:col-span-2 bg-[#0a0a0a] p-12 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all group overflow-hidden relative min-h-[320px] animate-in fade-in slide-in-from-bottom-10 duration-700 delay-100">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[100px] group-hover:bg-white/10 transition-all duration-700" />
              <div className="bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <Server className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-white mb-6 tracking-wide uppercase">Infraestrutura Dedicada</h3>
              <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                Operamos com servidores Premium na Contabo (EUA) e RackNerd. Links de fibra ótica de 1Gbps garantem que sua conexão nunca sofra gargalos, mesmo em horários de pico.
              </p>
            </div>

            <div className="bg-[#0a0a0a] p-10 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all min-h-[320px] flex flex-col justify-between animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200 group">
              <div>
                <Crosshair className="w-12 h-12 text-slate-500 mb-8 group-hover:text-white transition-colors duration-500 group-hover:scale-110 transform" strokeWidth={1.5} />
                <h3 className="text-2xl font-black text-white mb-4 tracking-wide uppercase">Ping Otimizado</h3>
                <p className="text-slate-400 text-base leading-relaxed">
                  Rotas diretas para servidores de jogos. Reduza a latência em FPS e MOBAs competitivos.
                </p>
              </div>
            </div>

            <div className="bg-[#0a0a0a] p-10 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all min-h-[320px] flex flex-col justify-between animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300 group">
              <div>
                <EyeOff className="w-12 h-12 text-slate-500 mb-8 group-hover:text-white transition-colors duration-500 group-hover:scale-110 transform" strokeWidth={1.5} />
                <h3 className="text-2xl font-black text-white mb-4 tracking-wide uppercase">Invisibilidade</h3>
                <p className="text-slate-400 text-base leading-relaxed">
                  Sua navegação se torna indetectável. Seu provedor de internet não saberá o que você acessa.
                </p>
              </div>
            </div>

            <div className="md:col-span-2 bg-[#0a0a0a] p-12 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden min-h-[320px] animate-in fade-in slide-in-from-bottom-10 duration-700 delay-400">
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-800/20 rounded-full blur-[80px] group-hover:bg-slate-700/20 transition-all duration-700" />
              <div className="relative z-10">
                <div className="bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white border border-white/10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <PlayCircle className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black text-white mb-6 tracking-wide uppercase">Streaming 4K Ultra HD</h3>
                <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                  Protocolos otimizados para evitar o "throttling" (limitação) das operadoras. Assista Netflix, Disney+ e Prime Video na qualidade máxima, sem interrupções.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Logo Divider entre Seções */}
      <div className="flex justify-center items-center py-12 relative z-10 bg-transparent">
         <img 
            src="/logo.png" 
            alt="M-VPN Logo" 
            className="w-24 h-24 object-contain opacity-20 animate-pulse-glow"
         />
      </div>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-32 relative z-10 bg-[#030303]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase">
              Protocolo de Segurança
            </h2>
            <p className="text-base text-slate-400 max-w-2xl mx-auto font-mono">
              // Entenda o processo de encapsulamento de dados
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative max-w-7xl mx-auto">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900 -translate-y-1/2 z-0 opacity-30" />

            <SecurityStep 
              step="01"
              icon={Smartphone}
              title="Origem"
              description="Ativação do agente M-VPN no dispositivo. Dados são criptografados na fonte."
              delay={100}
            />

            <SecurityStep 
              step="02"
              icon={Lock}
              title="Túnel Seguro"
              description="Tráfego viaja por túnel blindado. Impossível de ser interceptado ou lido."
              delay={300}
            />

            <SecurityStep 
              step="03"
              icon={Server}
              title="Anonymization"
              description="Chegada ao servidor seguro. IP real é descartado e substituído por IP tático."
              delay={500}
            />

            <SecurityStep 
              step="04"
              icon={Globe}
              title="Acesso Livre"
              description="Conexão com a internet aberta. O destino vê apenas a M-VPN, garantindo anonimato."
              delay={700}
            />
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="py-40 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase">
              SELECIONE SEU PLANO
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
              Sem fidelidade. Cancelamento a qualquer momento.
              <br/>
              <span className="text-white font-medium">Liberação automática via sistema.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[90rem] mx-auto items-start">
            
            <div className="h-full">
              <PlanCard 
                planId="basico"
                title="Básico"
                price="9,90"
                dataLimit="Franquia: 50 GB"
                highlight="Para operações leves (Bancos/Social)."
                label="Entrada"
                onSelect={handlePlanSelect}
                delay={100}
                features={[
                  "50 GB de Tráfego",
                  "Velocidade 4G/5G",
                  "Blindagem Bancária",
                  "Navegação Anônima",
                  "1 Dispositivo",
                  "Servidor Standard"
                ]}
              />
            </div>

            <div className="h-full">
              <PlanCard 
                planId="padrao"
                title="Padrão"
                price="16,90"
                dataLimit="Franquia: 250 GB"
                highlight="Consumo moderado de mídia HD."
                label="Intermediário"
                onSelect={handlePlanSelect}
                delay={300}
                features={[
                  "250 GB de Tráfego",
                  "Suporte a Vídeos HD",
                  "IP Blindado EUA/BR",
                  "Proteção Avançada",
                  "2 Dispositivos",
                  "Suporte Dedicado"
                ]}
              />
            </div>

            <div className="h-full transform md:-translate-y-4">
              <PlanCard 
                planId="pro"
                title="Pro / Premium"
                price="19,90"
                recommended={true}
                dataLimit="ILIMITADO"
                highlight="Acesso irrestrito de alta performance."
                onSelect={handlePlanSelect}
                delay={500}
                features={[
                  "Tráfego Ilimitado (Fair Use)",
                  "Liberado Netflix/Streaming 4K",
                  "IP Americano Dedicado",
                  "Prioridade de Banda",
                  "3 Dispositivos Simultâneos",
                  "Suporte VIP Preferencial",
                  "Latência Otimizada (Jogos)"
                ]}
              />
            </div>

          </div>
          
          <div className="mt-24 text-center">
            <div className="inline-block px-10 py-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-10 duration-700 delay-700">
              <div className="flex flex-col md:flex-row items-center gap-12 text-left text-base text-slate-300">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded bg-white text-black flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">01</div>
                  <span className="font-bold uppercase tracking-wide">Cadastro Rápido</span>
                </div>
                <div className="hidden md:block w-12 h-px bg-slate-700 opacity-50"></div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded bg-slate-800 text-white border border-slate-600 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">02</div>
                  <span className="font-bold uppercase tracking-wide">Pix Automático</span>
                </div>
                <div className="hidden md:block w-12 h-px bg-slate-700 opacity-50"></div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded bg-slate-800 text-white border border-slate-600 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">03</div>
                  <span className="font-bold uppercase tracking-wide">Entrega no Zap</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 bg-slate-900/10 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-black text-white text-center mb-20 tracking-tighter uppercase animate-in fade-in slide-in-from-bottom-4">
            Central de Dúvidas
          </h2>
          <div className="bg-[#0a0a0a] p-10 rounded-[2rem] border border-white/5 animate-in fade-in slide-in-from-bottom-8">
            <FAQ 
              question="Compatibilidade de Dispositivos"
              answer="A M-VPN opera com protocolos universais (Shadowsocks/V2Ray). Compatível nativamente com iOS (iPhone/iPad), Android, Windows e MacOS através dos aplicativos oficiais 'Outline' e 'V2Box'."
            />
            <FAQ 
              question="Diferença entre os Planos"
              answer="Básico (50GB): Focado em segurança bancária e comunicação leve. Padrão (250GB): Permite consumo de mídia HD moderado. Premium (Ilimitado): Projetado para heavy users, streaming 4K contínuo e downloads pesados."
            />
            <FAQ 
              question="Impacto na Velocidade"
              answer="Nossa tecnologia evita o 'Traffic Shaping' das operadoras (limitação artificial de velocidade em vídeos/jogos). Na maioria dos cenários, a estabilidade e a rota melhoram."
            />
            <FAQ 
              question="Política de Cancelamento"
              answer="Modelo pré-pago sem amarras. O acesso é válido por 30 dias. Para cancelar, basta não renovar o pagamento no ciclo seguinte."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-slate-900 bg-[#010101] text-center relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center gap-6 mb-10">
            <div className="bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
              <MLogo className="w-12 h-12" />
            </div>
            <span className="font-black text-white text-2xl tracking-[0.2em] uppercase">M-VPN Global</span>
            <p className="text-slate-600 text-xs max-w-md font-mono">
              INFRAESTRUTURA CRIPTOGRAFADA DE ALTA PERFORMANCE.
            </p>
          </div>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-10"></div>
          
          <p className="text-slate-700 mb-2 text-[10px] uppercase tracking-wider">© 2026 TNX Media. Todos os direitos reservados.</p>
          <p className="text-[10px] text-slate-800">
            O uso desta tecnologia para fins ilícitos resultará no bloqueio imediato da credencial de acesso.
          </p>
        </div>
      </footer>
    </div>
  );
}