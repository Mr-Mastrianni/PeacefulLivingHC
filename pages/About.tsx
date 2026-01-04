
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageGridRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Reveal
      gsap.from(".about-hero-text", {
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2
      });

      // 2. Three-Panel Image Animation (The User's Provided Image Layout)
      const images = imageGridRef.current?.querySelectorAll('.moment-image');
      if (images) {
        gsap.from(images, {
          y: 100,
          opacity: 0,
          scale: 0.9,
          duration: 1.2,
          stagger: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: imageGridRef.current,
            start: "top 80%",
            end: "bottom center",
            toggleActions: "play none none reverse"
          }
        });
      }

      // 3. Values Journey - Scroll Scrubbed Reveal
      const valueBlocks = valuesRef.current?.querySelectorAll('.value-block');
      if (valueBlocks) {
        valueBlocks.forEach((block, i) => {
          gsap.fromTo(block, 
            { opacity: 0.2, x: i % 2 === 0 ? -50 : 50 },
            { 
              opacity: 1, 
              x: 0,
              scrollTrigger: {
                trigger: block,
                start: "top 85%",
                end: "top 40%",
                scrub: 1,
              }
            }
          );
        });
      }

      // 4. Parallax Background Heart
      gsap.to(".floating-heart-bg", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#fdfbf7] overflow-hidden">
      {/* Parallax Decorative Element */}
      <div className="floating-heart-bg absolute top-1/4 right-[-10%] w-[600px] h-[600px] opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 24 24" fill="#8b5cf6" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

      {/* Intro Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="about-hero-text text-5xl sm:text-7xl font-serif font-bold text-slate-900 mb-8 leading-tight">
            Built on <span className="text-transparent bg-clip-text gradient-accent">Compassion</span>
          </h1>
          <p className="about-hero-text text-xl sm:text-2xl text-slate-600 leading-relaxed">
            At Peaceful Living Home Care LLC, our mission is to redefine what it means to care for your family. We aren't just a service; we are a dedicated partner in your loved one's comfort and dignity.
          </p>
        </div>
      </section>

      {/* The 3-Panel Vision Section (User's Requested Layout) */}
      <section className="py-20 px-4">
        <div ref={imageGridRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="moment-image relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800" alt="Caregiver and senior smiling" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <p className="text-white font-serif italic text-xl">Connecting Hearts</p>
            </div>
          </div>
          <div className="moment-image relative h-[500px] rounded-3xl overflow-hidden shadow-2xl md:translate-y-12">
            <img src="https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800" alt="Senior couple hugging" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <p className="text-white font-serif italic text-xl">Preserving Joy</p>
            </div>
          </div>
          <div className="moment-image relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800" alt="Nurse helping senior" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <p className="text-white font-serif italic text-xl">Professional Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Journey (Scroll Scrubbed) */}
      <section ref={valuesRef} className="py-32 bg-white mt-20">
        <div className="max-w-5xl mx-auto px-4 space-y-40">
          <div className="value-block flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <h3 className="text-4xl font-serif font-bold text-slate-900 mb-6">Unwavering Support</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our team is professional, reliable, and ready to assist you every step of the way. We believe that home is where the heart is, and our goal is to ensure your loved ones can stay in their cherished environment safely and comfortably.
              </p>
            </div>
            <div className="w-full md:w-1/2 h-80 rounded-[40px] gradient-accent opacity-10 flex items-center justify-center">
              <svg className="w-32 h-32 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>

          <div className="value-block flex flex-col md:flex-row-reverse items-center gap-16">
            <div className="w-full md:w-1/2">
              <h3 className="text-4xl font-serif font-bold text-slate-900 mb-6">Expert Guidance</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Contact us today to learn how we can help your loved ones live comfortably and safely at home. From daily chores to specialized non-medical support, we are the extension of your own hands.
              </p>
            </div>
            <div className="w-full md:w-1/2 h-80 rounded-[40px] bg-slate-50 flex items-center justify-center">
               <div className="grid grid-cols-2 gap-4 p-8 w-full h-full">
                  <div className="bg-white rounded-2xl shadow-sm flex items-center justify-center text-xs font-bold uppercase tracking-widest text-slate-400">Reliable</div>
                  <div className="bg-white rounded-2xl shadow-sm flex items-center justify-center text-xs font-bold uppercase tracking-widest text-slate-400">Trusted</div>
                  <div className="bg-white rounded-2xl shadow-sm flex items-center justify-center text-xs font-bold uppercase tracking-widest text-slate-400">24/7 Care</div>
                  <div className="bg-white rounded-2xl shadow-sm flex items-center justify-center text-xs font-bold uppercase tracking-widest text-slate-400">Expert</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif font-bold mb-16 uppercase tracking-widest opacity-60">Payment Acceptance</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            {['Private Pay', 'Medicaid Waivers', 'Pathways For Aging'].map((item, i) => (
              <div key={item} className="group cursor-default">
                <div className="text-4xl sm:text-5xl font-serif font-bold mb-2 transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:gradient-accent">
                  {item}
                </div>
                <div className="h-1 w-0 group-hover:w-full gradient-accent transition-all duration-500 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Icons */}
      <section className="py-32 bg-[#fdfbf7]">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          {[
            { title: 'Compassionate', desc: 'Heart-first care for every individual we serve.' },
            { title: 'Professional', desc: 'Highly trained staff dedicated to clinical and ethical excellence.' },
            { title: 'Family-Oriented', desc: 'We treat your family like our own, ensuring peace of mind.' }
          ].map((v) => (
            <div key={v.title} className="text-center p-12 bg-white rounded-[40px] shadow-sm border border-slate-50 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-4">
              <div className="w-16 h-16 gradient-accent rounded-2xl mx-auto mb-8 flex items-center justify-center text-white font-bold text-2xl">
                {v.title[0]}
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">{v.title}</h3>
              <p className="text-slate-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
