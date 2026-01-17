
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="text-3xl font-black mb-6">WEBSITETEST</div>
          <p className="text-gray-500 max-w-sm leading-relaxed mb-8">
            고객의 브랜드 정체성을 정확히 파악하여 가독성 높고 아름다운 웹사이트와 
            지속 가능한 브랜드 이미지를 창출합니다.
          </p>
          <div className="flex gap-4">
            {['Instagram', 'Twitter', 'LinkedIn'].map(social => (
              <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-purple-600 hover:border-purple-600 transition-all text-sm">
                <span className="sr-only">{social}</span>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Services</h4>
          <ul className="text-gray-500 space-y-4">
            <li><a href="#" className="hover:text-purple-400">Logo Design</a></li>
            <li><a href="#" className="hover:text-purple-400">Web Development</a></li>
            <li><a href="#" className="hover:text-purple-400">Brand Identity</a></li>
            <li><a href="#" className="hover:text-purple-400">SEO Optimization</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Contact</h4>
          <ul className="text-gray-500 space-y-4">
            <li>서울특별시 강남구 테헤란로 123</li>
            <li>02-1234-5678</li>
            <li>contact@websitetest.com</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-600 uppercase tracking-widest">
        <p>&copy; 2024 WebsiteTest. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
