
import React, { useState } from 'react';
import { SiteSettings, PortfolioItem, AppState } from '../types';
import { ICONS } from '../constants';

interface AdminDashboardProps {
  appState: AppState;
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ appState, onExit }) => {
  const [activeTab, setActiveTab] = useState<'Stats' | 'Content' | 'Settings'>('Stats');
  
  // Local edit states
  const [editedSettings, setEditedSettings] = useState<SiteSettings>(appState.settings);
  const [editedPortfolio, setEditedPortfolio] = useState<PortfolioItem[]>(appState.portfolio);

  const handleSaveSettings = () => {
    appState.setSettings(editedSettings);
    alert('설정이 저장되었습니다!');
  };

  const handleUpdatePortfolio = (id: string, field: keyof PortfolioItem, value: string) => {
    const updated = editedPortfolio.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    setEditedPortfolio(updated);
    appState.setPortfolio(updated);
  };

  const stats = [
    { label: 'Total Visits', value: '12,842', change: '+12%', icon: ICONS.Stats() },
    { label: 'Project Requests', value: '48', change: '+5%', icon: ICONS.Dashboard() },
    { label: 'Conversion Rate', value: '3.2%', change: '-0.4%', icon: ICONS.Stats() },
  ];

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col gap-10">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded bg-purple-600 flex items-center justify-center font-bold">W</div>
          <span className="font-black text-xl tracking-tighter">ADMIN PANEL</span>
        </div>
        
        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('Stats')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'Stats' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
          >
            <ICONS.Stats />
            <span className="font-semibold">대시보드 통계</span>
          </button>
          <button 
            onClick={() => setActiveTab('Content')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'Content' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
          >
            <ICONS.Portfolio />
            <span className="font-semibold">포트폴리오 관리</span>
          </button>
          <button 
            onClick={() => setActiveTab('Settings')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'Settings' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
          >
            <ICONS.Settings />
            <span className="font-semibold">사이트 설정</span>
          </button>
        </nav>

        <div className="mt-auto">
          <button 
            onClick={onExit}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold"
          >
            나가기
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black">{activeTab === 'Stats' ? '통계 개요' : activeTab === 'Content' ? '콘텐츠 관리' : '일반 설정'}</h1>
            <p className="text-gray-500 mt-1">사이트의 주요 정보를 관리하고 변경할 수 있습니다.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-900 border border-purple-500/50"></div>
            <div className="text-sm font-bold">Administrator</div>
          </div>
        </header>

        {activeTab === 'Stats' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="glass-card p-6 rounded-3xl">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-2xl bg-white/5 text-purple-400">
                    {stat.icon}
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.change.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.label}</h3>
                <div className="text-3xl font-black">{stat.value}</div>
              </div>
            ))}
            
            <div className="md:col-span-3 glass-card p-10 rounded-3xl">
               <h3 className="text-xl font-bold mb-6">최근 프로젝트 요청 추이</h3>
               <div className="h-64 flex items-end gap-2">
                  {[40, 60, 45, 90, 70, 85, 100, 80, 60, 95, 110, 130].map((h, i) => (
                    <div key={i} className="flex-1 bg-purple-600/30 hover:bg-purple-600 transition-all rounded-t-lg" style={{ height: `${h}%` }}></div>
                  ))}
               </div>
               <div className="flex justify-between mt-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest px-2">
                 <span>Jan</span>
                 <span>Dec</span>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'Content' && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">포트폴리오 리스트</h2>
              <button className="bg-purple-600 px-4 py-2 rounded-lg font-bold text-sm">+ 새 프로젝트 추가</button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {editedPortfolio.map((item) => (
                <div key={item.id} className="glass-card p-6 rounded-2xl flex items-center gap-6">
                  <img src={item.imageUrl} alt={item.title} className="w-20 h-20 rounded-xl object-cover" />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-gray-500 font-bold uppercase">Project Title</label>
                      <input 
                        className="bg-transparent border-b border-white/10 py-1 focus:border-purple-500 outline-none font-bold"
                        value={item.title}
                        onChange={(e) => handleUpdatePortfolio(item.id, 'title', e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-gray-500 font-bold uppercase">Category</label>
                      <select 
                        className="bg-transparent border-b border-white/10 py-1 focus:border-purple-500 outline-none font-bold text-sm"
                        value={item.category}
                        onChange={(e) => handleUpdatePortfolio(item.id, 'category', e.target.value as any)}
                      >
                        <option value="Logo" className="bg-black">Logo</option>
                        <option value="Web" className="bg-black">Web</option>
                        <option value="Brand" className="bg-black">Brand</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-gray-500 font-bold uppercase">Image URL</label>
                      <input 
                        className="bg-transparent border-b border-white/10 py-1 focus:border-purple-500 outline-none text-xs"
                        value={item.imageUrl}
                        onChange={(e) => handleUpdatePortfolio(item.id, 'imageUrl', e.target.value)}
                      />
                    </div>
                  </div>
                  <button className="text-red-500 hover:text-red-400 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Settings' && (
          <div className="max-w-2xl flex flex-col gap-8">
            <div className="glass-card p-8 rounded-3xl flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500 font-bold uppercase">사이트 이름</label>
                <input 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none font-bold"
                  value={editedSettings.siteName}
                  onChange={(e) => setEditedSettings({...editedSettings, siteName: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500 font-bold uppercase">메인 히어로 타이틀</label>
                <textarea 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none font-bold h-32 resize-none"
                  value={editedSettings.heroTitle}
                  onChange={(e) => setEditedSettings({...editedSettings, heroTitle: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500 font-bold uppercase">히어로 서브 타이틀</label>
                <textarea 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none text-gray-400 h-24 resize-none"
                  value={editedSettings.heroSubTitle}
                  onChange={(e) => setEditedSettings({...editedSettings, heroSubTitle: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500 font-bold uppercase">포인트 컬러 (Hex)</label>
                <div className="flex gap-4 items-center">
                  <input 
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none font-mono"
                    value={editedSettings.primaryColor}
                    onChange={(e) => setEditedSettings({...editedSettings, primaryColor: e.target.value})}
                  />
                  <div className="w-12 h-12 rounded-xl" style={{ backgroundColor: editedSettings.primaryColor }}></div>
                </div>
              </div>
              
              <button 
                onClick={handleSaveSettings}
                className="mt-4 w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-xl font-black text-lg transition-all"
              >
                저장하기
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
