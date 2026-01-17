
import React from 'react';

interface HeroProps {
  title: string;
  subTitle: string;
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ title, subTitle, onCtaClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-bold tracking-widest uppercase animate-pulse">
          Premium Design Studio
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] whitespace-pre-line tracking-tighter">
          {title}
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          {subTitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onCtaClick}
            className="w-full sm:w-auto px-10 py-5 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-2xl shadow-purple-500/40"
          >
            프로젝트 문의하기
          </button>
          <button className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full text-lg font-bold transition-all backdrop-blur-sm">
            포트폴리오 보기
          </button>
        </div>
      </div>
      
      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
