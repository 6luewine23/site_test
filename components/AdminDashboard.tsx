
import React, { useState } from 'react';
import { SiteSettings, PortfolioItem, AppState } from '../types.ts';
import { ICONS } from '../constants.tsx';

interface AdminDashboardProps {
  appState: AppState;
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ appState, onExit }) => {
  const [activeTab, setActiveTab] = useState<'Stats' | 'Content' | 'Settings'>('Stats');
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

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col gap-10">
        <div className="flex items-center gap-3 px-2 text-2xl font-black tracking-tighter">ADMIN</div>
        <nav className="flex flex-col gap-2">
          {['Stats', 'Content', 'Settings'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab ? 'bg-purple-600 text-white' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
            >
              <span className="font-semibold">{tab === 'Stats' ? '대시보드' : tab === 'Content' ? '포트폴리오' : '설정'}</span>
            </button>
          ))}
        </nav>
        <button onClick={onExit} className="mt-auto w-full py-3 rounded-xl bg-white/5 border border-white/10 font-bold">나가기</button>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'Settings' && (
          <div className="max-w-2xl glass-card p-8 rounded-3xl flex flex-col gap-6">
            <h2 className="text-2xl font-black mb-4">사이트 설정 변경</h2>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-500 font-bold uppercase">사이트 이름</label>
              <input 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                value={editedSettings.siteName}
                onChange={(e) => setEditedSettings({...editedSettings, siteName: e.target.value})}
              />
            </div>
            <button onClick={handleSaveSettings} className="bg-purple-600 py-4 rounded-xl font-black text-lg">저장하기</button>
          </div>
        )}
        {activeTab === 'Stats' && (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-card p-6 rounded-3xl">
                  <div className="text-gray-500 text-sm mb-2">통계 데이터 {i}</div>
                  <div className="text-4xl font-black">1,234</div>
                </div>
              ))}
           </div>
        )}
        {activeTab === 'Content' && (
           <div className="flex flex-col gap-4">
              {editedPortfolio.map(item => (
                <div key={item.id} className="glass-card p-4 rounded-2xl flex items-center gap-4">
                  <img src={item.imageUrl} className="w-16 h-16 rounded-lg object-cover" />
                  <span className="font-bold">{item.title}</span>
                </div>
              ))}
           </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
