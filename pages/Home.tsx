
import React, { useEffect, useRef } from 'react';

import Hero from '../components/Hero';
import PeacefulPath from '../components/PeacefulPath';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import VideoShowcase from '../components/VideoShowcase';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  onNavigate: (page: any) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="min-h-screen">
      <div id="home-section">
        <Hero onCtaClick={() => onNavigate('contact')} />
      </div>

      <VideoShowcase />

      <div id="path-section">
        <PeacefulPath onContactClick={() => onNavigate('contact')} />
      </div>

      <div id="about-section">
        <AboutSection />
      </div>

      {/* Horizontal Contact Scroll Section */}
      <div id="contact-section">
        <ContactSection />
      </div>

      {/* Testimonial Section */}
      <section className="py-24 bg-[#0b0b0f] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 gradient-accent opacity-10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-12">
            <svg className="w-16 h-16 mx-auto text-purple-500 opacity-50" fill="currentColor" viewBox="0 0 32 32">
              <path d="M10 8v8h6c0 2.2-1.8 4-4 4h-1v4h1c4.4 0 8-3.6 8-8V8h-9zm12 0v8h6c0 2.2-1.8 4-4 4h-1v4h1c4.4 0 8-3.6 8-8V8h-9z" />
            </svg>
          </div>
          <p className="text-2xl sm:text-3xl font-serif italic leading-relaxed mb-8">
            "Peaceful Living Home Care LLC has been a blessing for our family. The caregivers are not only professional but also compassionate, providing exceptional care to our loved one."
          </p>
          <div className="space-y-1">
            <p className="font-bold text-xl tracking-wide">Regina C</p>
            <p className="text-slate-400 text-sm uppercase tracking-widest">Grateful Family Member</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
