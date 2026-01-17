
import React, { useState } from 'react';
import { PortfolioItem } from '../types.ts';

interface PortfolioGalleryProps {
  items: PortfolioItem[];
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ items }) => {
  const [filter, setFilter] = useState<'All' | 'Logo' | 'Web' | 'Brand'>('All');
  
  const filteredItems = filter === 'All' 
    ? items 
    : items.filter(item => item.category === filter);

  const categories: ('All' | 'Logo' | 'Web' | 'Brand')[] = ['All', 'Logo', 'Web', 'Brand'];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">Our Works</h2>
          <p className="text-gray-500 max-w-md">창의적인 시선으로 완성된 포트폴리오를 확인해보세요.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                filter === cat 
                  ? 'bg-purple-600 border-purple-600 text-white' 
                  : 'bg-transparent border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {filteredItems.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gray-900 border border-white/5 mb-6">
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                 <span className="text-purple-400 font-bold mb-2">{item.category}</span>
                 <h3 className="text-2xl font-black text-white">{item.title}</h3>
              </div>
            </div>
            <div className="px-2">
              <div className="flex items-center gap-2 mb-2 text-purple-500 font-bold text-xs uppercase tracking-widest">
                <span>0{item.id}</span>
                <span className="h-[1px] w-8 bg-purple-500/30"></span>
                <span>{item.category}</span>
              </div>
              <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">{item.title}</h3>
              <p className="text-gray-500 mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioGallery;
