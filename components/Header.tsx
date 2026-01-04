
import React from 'react';
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_TEL, LogoIcon, PhoneIcon } from '../constants';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: any) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  return (
    <header className="sticky top-0 z-50 w-full header-bg shadow-sm border-b border-purple-100/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Name */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onPageChange('home')}
          >
            <div className="bg-white/40 p-1.5 rounded-xl shadow-sm transform group-hover:scale-110 transition-transform duration-300">
              <LogoIcon className="w-12 h-12" id="header-logo-identity" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-serif font-bold tracking-wider text-slate-900 leading-none uppercase">
                Peaceful Living
              </span>
              <span className="text-[9px] font-sans font-medium text-slate-500 tracking-[0.2em] uppercase mt-0.5">
                Home Care
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {['home', 'about', 'contact'].map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`text-xs font-bold uppercase tracking-[0.25em] transition-all duration-200 relative group ${
                  currentPage === page ? 'text-purple-600' : 'text-slate-500 hover:text-purple-500'
                }`}
              >
                {page === 'contact' ? 'Contact Us' : page}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 gradient-accent transform origin-left transition-transform duration-300 ${currentPage === page ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}></span>
              </button>
            ))}
          </nav>

          {/* CTAs */}
          <div className="flex items-center space-x-6">
            <a 
              href={PHONE_TEL} 
              className="hidden lg:flex items-center text-slate-700 hover:text-purple-600 font-bold text-sm transition-colors"
            >
              <PhoneIcon className="mr-2 w-4 h-4 text-purple-600" />
              {PHONE_DISPLAY}
            </a>
            <button
               onClick={() => onPageChange('contact')}
               className="gradient-accent text-white px-7 py-3 rounded-full text-xs font-extrabold shadow-lg hover:shadow-purple-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Care Plan
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
