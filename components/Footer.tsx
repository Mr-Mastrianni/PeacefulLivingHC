
import React from 'react';
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, PhoneIcon, MailIcon } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#4a3a3a] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold">Call us today</h2>
            <a 
              href={PHONE_TEL} 
              className="text-3xl sm:text-5xl font-sans font-extrabold hover:text-purple-300 transition-colors"
            >
              {PHONE_DISPLAY.replace(/-/g, '.')}
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <a 
              href={`mailto:${EMAIL}`} 
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <MailIcon className="w-5 h-5" />
              <span>{EMAIL}</span>
            </a>
            <div className="h-px w-12 bg-white/20 hidden sm:block"></div>
            <p className="text-white/60 text-sm">
              Available 24/7 for your family
            </p>
          </div>

          <div className="pt-8 border-t border-white/10 w-full text-center">
            <p className="text-white/40 text-xs sm:text-sm tracking-widest uppercase">
              &copy; 2024 by Peaceful Living Home Care, LLC
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
