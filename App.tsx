
import React, { useState } from 'react';
import { PageType, SiteSettings, PortfolioItem, AppState } from './types.ts';
import { INITIAL_SETTINGS, INITIAL_PORTFOLIO } from './constants.tsx';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import PortfolioGallery from './components/PortfolioGallery.tsx';
import Footer from './components/Footer.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>(PageType.HOME);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);

  const appState: AppState = {
    settings,
    portfolio,
    setSettings,
    setPortfolio
  };

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === PageType.ADMIN) {
    return (
      <AdminDashboard 
        appState={appState} 
        onExit={() => handleNavigate(PageType.HOME)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-600/30 selection:text-purple-400">
      <Navbar 
        siteName={settings.siteName} 
        onNavigate={handleNavigate} 
        currentPage={currentPage} 
      />
      
      {currentPage === PageType.HOME && (
        <>
          <Hero 
            title={settings.heroTitle} 
            subTitle={settings.heroSubTitle} 
            onCtaClick={() => handleNavigate(PageType.PORTFOLIO)}
          />
          
          <section className="py-24 bg-gradient-to-b from-black to-[#050505]">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col gap-4 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-400 font-bold text-xl group-hover:scale-110 transition-transform">1</div>
                <h3 className="text-2xl font-black">Strategic Design</h3>
                <p className="text-gray-400">브랜드 철학을 담은 전략적 아이덴티티를 제안합니다.</p>
              </div>
              <div className="flex flex-col gap-4 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-400 font-bold text-xl group-hover:scale-110 transition-transform">2</div>
                <h3 className="text-2xl font-black">Fast Execution</h3>
                <p className="text-gray-400">최신 기술로 놀라운 성능의 결과물을 제작합니다.</p>
              </div>
              <div className="flex flex-col gap-4 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-400 font-bold text-xl group-hover:scale-110 transition-transform">3</div>
                <h3 className="text-2xl font-black">Scalability</h3>
                <p className="text-gray-400">비즈니스 성장에 따라 유연하게 확장 가능한 아키텍처를 지향합니다.</p>
              </div>
            </div>
          </section>

          <PortfolioGallery items={portfolio} />

          <section className="py-24 bg-black">
             <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-6xl font-black mb-8">당신의 아이디어를<br/><span className="text-purple-500">현실</span>로 만들어 드립니다.</h2>
                <p className="text-gray-500 mb-12 text-lg">상담 신청 후 24시간 이내에 답변을 드립니다.</p>
                <form className="max-w-lg mx-auto flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                   <input type="text" placeholder="성함 또는 기업명" className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-purple-500 transition-all" />
                   <input type="email" placeholder="이메일 주소" className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-purple-500 transition-all" />
                   <textarea placeholder="프로젝트에 대해 설명해주세요" className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-purple-500 transition-all h-32 resize-none"></textarea>
                   <button className="bg-purple-600 hover:bg-purple-700 py-4 rounded-2xl font-black text-lg shadow-xl shadow-purple-500/20 transition-all">전송하기</button>
                </form>
             </div>
          </section>
        </>
      )}

      {currentPage === PageType.PORTFOLIO && (
        <div className="pt-20">
          <PortfolioGallery items={portfolio} />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
