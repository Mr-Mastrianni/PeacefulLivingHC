
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image Panel Animation
      gsap.fromTo(imageRef.current, 
        { scale: 0.9, opacity: 0, y: 80 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          }
        }
      );

      // Text reveal
      gsap.from(".about-text-content > *", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".about-text-content",
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-white overflow-hidden border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* User's Single Image Layout (Recreating the composite feel) */}
          <div ref={imageRef} className="relative group">
            <div className="relative aspect-[1.8/1] sm:aspect-[2.2/1] lg:aspect-[1.5/1] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white ring-1 ring-slate-100">
              {/* 
                We use the user's concept of the 3-panel composite. 
                Replacing the 3 individual tags with a single container holding their one composite image.
              */}
              <img 
                src="https://images.unsplash.com/photo-1573497620053-ea5310f94a17?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000" 
                alt="Compassionate Home Care Journey" 
              />
              
              {/* Overlay Gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/40 via-transparent to-transparent opacity-60"></div>
            </div>
            
            {/* Floating Badge - Integrated brand anchor */}
            <div className="absolute -bottom-10 -right-6 w-40 h-40 sm:w-48 sm:h-48 bg-slate-900 rounded-full p-8 text-white flex flex-col items-center justify-center text-center shadow-2xl transform rotate-6 group-hover:rotate-0 transition-transform duration-700">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 mb-1">Established</p>
              <p className="text-3xl font-serif font-bold">2024</p>
              <p className="text-[10px] italic text-cyan-400 mt-1 font-serif">A Peaceful Life</p>
            </div>
          </div>

          {/* Text Content */}
          <div className="about-text-content space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-6xl font-serif font-bold text-slate-900 leading-tight">
                A Tradition of <span className="text-transparent bg-clip-text gradient-accent">Trust</span>
              </h2>
              <div className="h-1.5 w-24 gradient-accent rounded-full"></div>
            </div>
            
            <p className="text-xl text-slate-600 leading-relaxed font-light">
              At Peaceful Living Home Care LLC, we are passionate about providing high-quality care and support to our clients and their families. Our team is professional, reliable, and ready to assist you every step of the way.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8 pt-4">
               <div className="space-y-3">
                 <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                 </div>
                 <h4 className="text-lg font-bold text-slate-900">Personalized Support</h4>
                 <p className="text-slate-500 text-sm">Every plan is as unique as the heart it serves.</p>
               </div>
               <div className="space-y-3">
                 <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                 </div>
                 <h4 className="text-lg font-bold text-slate-900">Home Comfort</h4>
                 <p className="text-slate-500 text-sm">Ensuring safety and independence in your cherished home.</p>
               </div>
            </div>
            
            {/* Payment Acceptance Integrated with refined visual style */}
            <div className="pt-10 border-t border-slate-100">
               <p className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-slate-400 mb-6">We Proudly Accept</p>
               <div className="flex flex-wrap gap-4">
                  {['Private Pay', 'Medicaid Waivers', 'Pathways For Aging'].map(p => (
                    <span key={p} className="px-5 py-2.5 bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200/50 hover:bg-white hover:shadow-md transition-all cursor-default">
                      {p}
                    </span>
                  ))}
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
