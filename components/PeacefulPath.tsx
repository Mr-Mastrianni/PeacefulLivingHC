
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES, PHONE_TEL } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const PeacefulPath: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Path Line Animation
      gsap.fromTo(pathRef.current, 
        { scaleY: 0 },
        { 
          scaleY: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 20%",
            end: "bottom 80%",
            scrub: 1,
          }
        }
      );

      // 2. Gradient Bloom Breathing
      gsap.to(bloomRef.current, {
        scale: 1.15,
        opacity: 0.25,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 3. Card Animations
      cardsRef.current.forEach((card, index) => {
        const isEven = index % 2 === 0;
        const xOffset = isEven ? -100 : 100;
        
        gsap.fromTo(card,
          { 
            opacity: 0, 
            xPercent: xOffset,
            rotate: isEven ? -5 : 5,
          },
          {
            opacity: 1,
            xPercent: 0,
            rotate: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 50%",
              scrub: 1,
            }
          }
        );
      });

      // 4. Sticky CTA Panel
      gsap.fromTo(".sticky-cta",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".path-end-marker",
            start: "top center",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#fdfbf7] py-32 overflow-hidden">
      {/* Background Bloom */}
      <div 
        ref={bloomRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-[120px] pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
      ></div>

      <div className="max-w-5xl mx-auto px-4 relative">
        <div className="text-center mb-24">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-6">The Peaceful Path</h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            A guided journey of care, tailored specifically for your family's needs.
          </p>
        </div>

        {/* The Central Path Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-48 bottom-32 w-1.5 bg-slate-100 rounded-full hidden md:block">
          <div 
            ref={pathRef}
            className="w-full h-full gradient-accent rounded-full origin-top"
          ></div>
        </div>

        {/* Service Cards */}
        <div className="space-y-24 md:space-y-48 relative">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id}
              ref={(el) => (cardsRef.current[index] = el!)}
              className={`flex flex-col md:flex-row items-center justify-between gap-12 ${
                index % 2 === 0 ? '' : 'md:flex-row-reverse'
              }`}
            >
              {/* Card */}
              <div className="w-full md:w-[42%] group outline-none" tabIndex={0}>
                <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-lg border border-slate-100 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:border-purple-200 group-focus:-translate-y-2 group-focus:scale-[1.03] group-focus:shadow-2xl group-focus:border-purple-400">
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full gradient-accent text-white font-bold text-sm">
                      0{index + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-800">{service.title}</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                    {service.description}
                  </p>
                </div>
              </div>
              
              {/* Spacer/Connector for Desktop */}
              <div className="hidden md:block w-12 h-12 rounded-full border-4 border-white bg-purple-500 shadow-sm z-10"></div>
              
              {/* Empty space for alternating */}
              <div className="hidden md:block w-[42%]"></div>
            </div>
          ))}
        </div>

        <div className="path-end-marker h-20"></div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="sticky-cta fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-2xl">
        <div className="bg-white/80 backdrop-blur-lg border border-white/50 shadow-2xl rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-900 font-bold hidden sm:block">Ready to start your path?</p>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
             <a 
              href={PHONE_TEL}
              className="flex-1 sm:flex-none px-6 py-3 border-2 border-purple-200 text-purple-700 rounded-xl font-bold text-sm hover:bg-purple-50 transition-colors text-center focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              Call Now
            </a>
            <button 
              onClick={onContactClick}
              className="flex-1 sm:flex-none px-6 py-3 gradient-accent text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              Request Care Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PeacefulPath;
