
import React from 'react';
import { PageType } from '../types';

interface NavbarProps {
  siteName: string;
  onNavigate: (page: PageType) => void;
  currentPage: PageType;
}

const Navbar: React.FC<NavbarProps> = ({ siteName, onNavigate, currentPage }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="text-2xl font-black cursor-pointer hover:text-purple-400 transition-colors"
          onClick={() => onNavigate(PageType.HOME)}
        >
          {siteName.toUpperCase()}
        </div>
        
        <div className="hidden md:flex space-x-8 font-medium text-sm tracking-widest uppercase">
          <button 
            onClick={() => onNavigate(PageType.HOME)}
            className={`${currentPage === PageType.HOME ? 'text-purple-400' : 'text-gray-400 hover:text-white'} transition-colors`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate(PageType.PORTFOLIO)}
            className={`${currentPage === PageType.PORTFOLIO ? 'text-purple-400' : 'text-gray-400 hover:text-white'} transition-colors`}
          >
            Portfolio
          </button>
          <button 
            onClick={() => onNavigate(PageType.ADMIN)}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full text-white transition-all shadow-lg shadow-purple-500/20"
          >
            Admin Panel
          </button>
        </div>
        
        {/* Mobile Menu Toggle (Simplified for this example) */}
        <div className="md:hidden text-white">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
           </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
