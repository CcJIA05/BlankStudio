import { useEffect, useRef } from 'react';
import LogoImage from '../LogoImage/LogoImage';
import logoFull from '../../assets/logo-full.webp';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const elements = heroRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements?.forEach((el, i) => {
      setTimeout(() => observer.observe(el), i * 100);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
    >
      <div className="beam-container">
        <div className="beam-glow"></div>
        <div className="beam"></div>
        <div className="beam-reflection"></div>
        <div className="floor-line"></div>
      </div>

      <div className="glow-orb w-[500px] h-[500px] -top-32 -left-32" style={{ animation: 'pulse 6s ease-in-out infinite' }}></div>
      <div className="glow-orb w-[300px] h-[300px] top-1/3 right-0" style={{ animation: 'pulse 5s ease-in-out infinite 1s' }}></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-8">
            <div className="reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="relative mb-6 -ml-6">
                <div className="absolute -inset-3 bg-primary/20 blur-2xl rounded-full opacity-40"></div>
                <LogoImage
                  src={logoFull}
                  alt="BlankStudio Logo"
                  className="relative w-auto h-32 md:h-40 lg:h-48 object-contain"
                />
              </div>
            </div>

            <div className="reveal mb-14" style={{ transitionDelay: '0.4s' }}>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-px bg-gradient-to-r from-primary to-transparent"></div>
                <span className="text-xs text-primary tracking-[0.3em] uppercase font-medium">CREATIVE DESIGN STUDIO</span>
              </div>
              <p className="text-2xl md:text-3xl font-light text-zinc-200 mb-3">让想法产生影响力</p>
              <p className="text-sm md:text-base text-zinc-500 tracking-[0.2em] uppercase">Let Ideas Make An Impact</p>
            </div>

            <div className="reveal flex flex-wrap gap-3 mb-16" style={{ transitionDelay: '0.5s' }}>
              <span className="px-5 py-2.5 border border-white/10 rounded-full text-xs text-zinc-400 tracking-wider hover:border-primary/40 hover:text-primary transition-all duration-300 cursor-pointer">UI / UX DESIGN</span>
              <span className="px-5 py-2.5 border border-white/10 rounded-full text-xs text-zinc-400 tracking-wider hover:border-primary/40 hover:text-primary transition-all duration-300 cursor-pointer">WEB DESIGN</span>
              <span className="px-5 py-2.5 border border-white/10 rounded-full text-xs text-zinc-400 tracking-wider hover:border-primary/40 hover:text-primary transition-all duration-300 cursor-pointer">PPT DESIGN</span>
              <span className="px-5 py-2.5 border border-white/10 rounded-full text-xs text-zinc-400 tracking-wider hover:border-primary/40 hover:text-primary transition-all duration-300 cursor-pointer">BRAND DESIGN</span>
            </div>

            <div className="reveal flex items-center gap-8" style={{ transitionDelay: '0.7s' }}>
              <a 
                href="#work" 
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-semibold rounded-full overflow-hidden transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-10px_rgba(124,92,252,0.5)]"
              >
                <span className="relative z-10">查看作品</span>
                <svg className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                立即联系
              </a>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 hidden lg:block pt-8">
            <div className="reveal-right space-y-8" style={{ transitionDelay: '0.6s' }}>
              <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl backdrop-blur-sm">
                <div className="text-xs text-zinc-600 tracking-[0.2em] uppercase mb-3">Established</div>
                <div className="text-5xl font-black number-display text-zinc-800">2022</div>
              </div>
              
              <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl backdrop-blur-sm">
                <div className="text-xs text-zinc-600 tracking-[0.2em] uppercase mb-4">Design Philosophy</div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span className="text-sm text-zinc-400">Professional · 专业</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span className="text-sm text-zinc-400">Minimal · 极简</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span className="text-sm text-zinc-400">Impactful · 影响力</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-[10px] text-zinc-600 tracking-[0.4em] uppercase">SCROLL TO EXPLORE</span>
        <div className="relative w-6 h-10 border border-zinc-700 rounded-full flex justify-center">
          <div className="absolute top-2 w-1 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
