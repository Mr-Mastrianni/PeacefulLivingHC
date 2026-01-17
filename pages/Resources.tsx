
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RESOURCES_DATA = [
    {
        title: "Indiana FSSA",
        description: "The Family and Social Services Administration helps Hoosiers live healthy, productive, and safe lives. Support for families, children, and individuals.",
        link: "https://www.in.gov/fssa/",
        color: "from-blue-500 to-indigo-600",
        lightCol: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
        title: "CICOA Aging & In-Home Solutions",
        description: "Empowering older adults, people with disabilities, and family caregivers with the resources they need to remain independent at home.",
        link: "https://cicoa.org",
        color: "from-emerald-500 to-teal-600",
        lightCol: "bg-emerald-50 text-emerald-600 border-emerald-100"
    }
];

const Resources: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Title animation
            gsap.fromTo(".resources-title",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            );

            // Card grid animation - using fromTo for robustness
            gsap.fromTo(".resource-card",
                { y: 60, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".resource-grid",
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    clearProps: "opacity,transform" // Ensure no stuck inline styles
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="pt-24 min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/10 to-orange-50/10 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-20 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">

                {/* Header */}
                <div className="resources-title text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-tight">
                        Helpful <span className="text-transparent bg-clip-text gradient-accent">Resources</span>
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        We believe in empowering our community with the right information. Here are some trusted organizations that can provide additional support and guidance.
                    </p>
                </div>

                {/* Resource Grid */}
                <div className="resource-grid grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {RESOURCES_DATA.map((res, idx) => (
                        <a
                            key={idx}
                            href={res.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resource-card group relative block p-8 rounded-[2rem] overflow-hidden hover:-translate-y-2"
                            style={{
                                background: 'rgba(255, 255, 255, 0.7)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.5)',
                                boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)',
                                transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease'
                            }}
                        >
                            {/* Hover Backdrop Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${res.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br ${res.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </div>

                                <h3 className="text-2xl font-serif font-bold text-slate-800 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                                    {res.title}
                                </h3>

                                <p className="text-slate-600 leading-relaxed mb-8 group-hover:text-slate-700 transition-colors">
                                    {res.description}
                                </p>

                                <div className="flex items-center text-xs font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-purple-600 transition-colors">
                                    Launch Website
                                    <svg className="w-4 h-4 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>

                            {/* Decorative Shine */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        </a>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Resources;
