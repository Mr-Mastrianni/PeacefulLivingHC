import React, { useRef } from 'react';
import homeImage from '../assets/image.png';
import { PHONE_DISPLAY, PHONE_TEL, LogoIcon } from '../constants';
import CounterHeroBar from './CounterHeroBar';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-16 lg:pb-32 bg-white">
      {/* Soft gradient background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-100/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50/40 blur-[120px] rounded-full"></div>

      {/* Decorative User Image */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[30vw] opacity-20 pointer-events-none hidden lg:block blur-sm mix-blend-multiply">
        <img src={homeImage} alt="Peaceful Living" className="w-full h-auto rounded-l-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">

          {/* Hero Branding Section */}
          <div className="mb-12 w-full flex flex-col items-center">
            <div ref={logoRef} className="w-full max-w-[360px] sm:max-w-[550px] lg:max-w-[700px] drop-shadow-xl">
              <LogoIcon className="w-full h-auto" id="hero-primary-logo" />
            </div>

            <div className="mt-6 space-y-4">
              <h2 className="hero-animate-in text-2xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-[0.25em] text-[#423a5a] uppercase">
                Peaceful Living <span className="block sm:inline">Home Care</span>
              </h2>
              <p className="hero-animate-in text-lg sm:text-2xl lg:text-3xl font-serif italic text-[#00a3cc] tracking-wide">
                Home is Where the Heart Is
              </p>
            </div>
          </div>

          {/* Hero Main Copy */}
          <div ref={textRef} className="max-w-3xl mt-8 space-y-10">
            <h1 className="hero-animate-in text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-slate-900 leading-[1.15]">
              Your Loved One's Health is <span className="inline-block text-transparent bg-clip-text gradient-accent">Our Priority</span>
            </h1>
            <p className="hero-animate-in text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              At Peaceful Living Home Care LLC, we deliver exceptional in-home care services, providing personalized support that brings peace of mind to families.
            </p>

            <div className="hero-animate-in flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <button
                onClick={onCtaClick}
                className="w-full sm:w-auto px-12 py-5 gradient-accent text-white rounded-full font-bold shadow-2xl hover:shadow-purple-200 transition-all transform hover:-translate-y-1 active:scale-95"
              >
                Get Your Care Plan
              </button>
              <a
                href={PHONE_TEL}
                className="w-full sm:w-auto px-12 py-5 border-2 border-slate-100 text-slate-800 rounded-full font-bold hover:bg-slate-50 transition-all flex items-center justify-center shadow-sm"
              >
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Counter Hero Bar - slides up from bottom */}
      <div className="relative z-20 mt-16 lg:mt-24">
        <CounterHeroBar
          targetNumber={25}
          label="Years of Compassionate Care"
        />
      </div>
    </section>
  );
};

export default Hero;
