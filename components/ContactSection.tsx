
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, CAREERS_LINK, MailIcon, PhoneIcon } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const horizontalLength = horizontalRef.current?.scrollWidth || 0;
      const viewportWidth = window.innerWidth;
      
      gsap.to(horizontalRef.current, {
        x: () => -(horizontalLength - viewportWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          start: "top top",
          end: () => `+=${horizontalLength - viewportWidth}`,
        }
      });

      // Simple stagger for elements within panels
      gsap.from(".contact-panel-content", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen overflow-hidden bg-slate-50 border-t border-slate-100">
      <div 
        ref={horizontalRef} 
        className="flex h-full w-[300vw] md:w-[200vw] lg:w-[150vw]"
      >
        {/* Panel 1: Info & Intro */}
        <div className="w-screen h-full flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>
          <div className="max-w-3xl space-y-12 contact-panel-content">
            <div className="space-y-4">
              <h2 className="text-6xl sm:text-8xl font-serif font-bold text-slate-900 leading-none">
                Let's Start a
              </h2>
              <div className="w-full max-w-md h-16 sm:h-20 gradient-accent rounded-sm shadow-lg"></div>
            </div>
            
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              If you need more information or have questions, our team of advisors is ready to help. We're here to guide you through every step.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <a href={PHONE_TEL} className="flex items-center space-x-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-purple-300 transition-all group shadow-sm">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Phone</p>
                  <p className="text-lg font-bold text-slate-800">{PHONE_DISPLAY}</p>
                </div>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center space-x-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-pink-300 transition-all group shadow-sm">
                <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center group-hover:bg-pink-600 group-hover:text-white transition-all">
                  <MailIcon />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Email</p>
                  <p className="text-lg font-bold text-slate-800">{EMAIL}</p>
                </div>
              </a>
            </div>
          </div>
          <div className="absolute bottom-12 left-24 hidden lg:flex items-center space-x-4 text-slate-300">
             <span className="text-xs font-bold uppercase tracking-widest">Scroll sideways to form</span>
             <div className="w-20 h-px bg-slate-200"></div>
          </div>
        </div>

        {/* Panel 2: The Form */}
        <div className="w-screen h-full flex items-center justify-center px-8 sm:px-16 bg-slate-50 relative">
          <div className="w-full max-w-4xl bg-white rounded-[40px] p-8 sm:p-12 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 contact-panel-content">
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-3xl font-serif font-bold text-slate-900">Request a Care Plan</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Fill out the form and a care coordinator will reach out to you within 24 hours to discuss your unique needs.
                </p>
                <div className="pt-8 border-t border-slate-50">
                   <div className="flex items-center space-x-4 text-slate-400">
                     <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                     <span className="text-[10px] uppercase tracking-widest font-bold">Advisors Online</span>
                   </div>
                </div>
              </div>
              
              <div className="lg:col-span-3">
                {formStatus === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">Thank you!</h4>
                    <p className="text-slate-500 mt-2">We've received your request.</p>
                    <button onClick={() => setFormStatus('idle')} className="mt-6 text-purple-600 font-bold hover:underline">Send another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input required type="text" placeholder="Full Name" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all placeholder:text-slate-400" />
                    <input required type="email" placeholder="Email" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all placeholder:text-slate-400" />
                    <input required type="tel" placeholder="Phone" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all sm:col-span-2 placeholder:text-slate-400" />
                    <textarea required placeholder="How can we help?" rows={3} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all sm:col-span-2 resize-none placeholder:text-slate-400" />
                    <button type="submit" disabled={formStatus === 'sending'} className="sm:col-span-2 py-4 gradient-accent text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50">
                      {formStatus === 'sending' ? 'Sending...' : 'Submit Request'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Panel 3: Careers & Closing */}
        <div className="w-screen h-full flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-slate-900 text-white relative">
           <div className="absolute top-0 left-0 w-64 h-64 gradient-accent opacity-20 blur-[120px] rounded-full"></div>
           <div className="max-w-2xl space-y-8 contact-panel-content">
             <h2 className="text-4xl sm:text-6xl font-serif font-bold leading-tight">
               Want to Join Our <br />
               <span className="text-transparent bg-clip-text gradient-accent">Care Family?</span>
             </h2>
             <p className="text-lg text-slate-400 leading-relaxed">
               We are always looking for passionate, professional caregivers. Build a meaningful career with Peaceful Living Home Care.
             </p>
             <a 
               href={CAREERS_LINK} 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center px-10 py-5 gradient-accent text-white font-bold rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95"
             >
               Explore Career Openings
             </a>
           </div>
           
           <div className="absolute bottom-12 right-12 text-right">
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500">© 2024 Peaceful Living Home Care LLC</p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
