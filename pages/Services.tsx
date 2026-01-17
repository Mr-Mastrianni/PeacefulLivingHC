import React, { useEffect, useRef, useState } from 'react';
import { PHONE_DISPLAY, PHONE_TEL } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCard {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    gradient: string;
    accentColor: string;
}

const services: ServiceCard[] = [
    {
        id: 'homecare',
        title: 'Home Care',
        subtitle: 'Personalized In-Home Support',
        description: 'Comprehensive in-home care services tailored to meet individual needs, ensuring comfort and dignity in the familiar surroundings of your own home.',
        icon: (
            <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                <path d="M32 8L6 28V56H24V40H40V56H58V28L32 8Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M32 40V48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="32" cy="28" r="6" stroke="currentColor" strokeWidth="2.5" />
            </svg>
        ),
        gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
        accentColor: '#8b5cf6'
    },
    {
        id: 'attendant-care',
        title: 'Attendant Care',
        subtitle: 'Daily Living Assistance',
        description: 'Professional attendants provide essential daily living support including bathing, dressing, grooming, and mobility assistance with compassion and respect.',
        icon: (
            <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                <circle cx="32" cy="16" r="8" stroke="currentColor" strokeWidth="2.5" />
                <path d="M20 56V44C20 38.477 24.477 34 30 34H34C39.523 34 44 38.477 44 44V56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M32 34V44M28 40H36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        ),
        gradient: 'from-cyan-500 via-teal-500 to-emerald-500',
        accentColor: '#14b8a6'
    },
    {
        id: 'homemaker',
        title: 'Homemaker Services',
        subtitle: 'Household Management',
        description: 'Light housekeeping, meal preparation, laundry, grocery shopping, and errands to maintain a clean, comfortable, and well-organized living environment.',
        icon: (
            <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                <rect x="12" y="24" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="2.5" />
                <path d="M20 24V16C20 12 24 8 32 8C40 8 44 12 44 16V24" stroke="currentColor" strokeWidth="2.5" />
                <path d="M24 40H40M24 48H36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        ),
        gradient: 'from-amber-500 via-orange-500 to-rose-500',
        accentColor: '#f97316'
    },
    {
        id: 'structured-family',
        title: 'Structured Family Care',
        subtitle: 'Family-Centered Support',
        description: 'Specialized programs that empower families to provide quality care for loved ones at home, with professional guidance, training, and ongoing support.',
        icon: (
            <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="44" cy="20" r="6" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="32" cy="44" r="8" stroke="currentColor" strokeWidth="2.5" />
                <path d="M20 28V32C20 36 24 40 32 40M44 28V32C44 36 40 40 32 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        ),
        gradient: 'from-pink-500 via-rose-500 to-red-500',
        accentColor: '#ec4899'
    },
    {
        id: 'pediatric',
        title: 'Pediatric Homecare',
        subtitle: 'Specialized Child Care',
        description: 'Expert pediatric care services for children with special healthcare needs, delivered with warmth and expertise to support the whole family.',
        icon: (
            <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                <circle cx="32" cy="20" r="10" stroke="currentColor" strokeWidth="2.5" />
                <path d="M32 32C22 32 16 40 16 48V56H48V48C48 40 42 32 32 32Z" stroke="currentColor" strokeWidth="2.5" />
                <path d="M28 18L30 22L34 22L36 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="28" cy="16" r="1.5" fill="currentColor" />
                <circle cx="36" cy="16" r="1.5" fill="currentColor" />
            </svg>
        ),
        gradient: 'from-blue-500 via-indigo-500 to-violet-500',
        accentColor: '#6366f1'
    },
    {
        id: 'transportation',
        title: 'Non-Emergency Transport',
        subtitle: 'Safe & Reliable Rides',
        description: 'Dependable non-emergency medical transportation to appointments, therapy sessions, and healthcare facilities with trained, caring drivers.',
        icon: (
            <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                <rect x="8" y="24" width="48" height="20" rx="4" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="20" cy="48" r="5" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="44" cy="48" r="5" stroke="currentColor" strokeWidth="2.5" />
                <path d="M8 32H4V40H8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M56 32H60V40H56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M16 32H32M16 38H28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M44 24V16H52L56 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        gradient: 'from-emerald-500 via-green-500 to-lime-500',
        accentColor: '#10b981'
    }
];

// 3D Spinning Glassmorphic Card Component
const ServiceCardComponent: React.FC<{ service: ServiceCard; index: number }> = ({ service, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!cardRef.current) return;

        // Initial animation - cards fly in with rotation
        gsap.fromTo(
            cardRef.current,
            {
                opacity: 0,
                rotateY: -180,
                scale: 0.5,
                y: 100
            },
            {
                opacity: 1,
                rotateY: 0,
                scale: 1,
                y: 0,
                duration: 1.2,
                delay: index * 0.15,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Continuous subtle floating animation
        gsap.to(cardRef.current, {
            y: '+=10',
            duration: 2 + index * 0.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.3
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, [index]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (cardRef.current) {
            gsap.to(cardRef.current, {
                scale: 1.05,
                rotateY: 10,
                rotateX: -5,
                boxShadow: `0 25px 50px -12px ${service.accentColor}40`,
                duration: 0.4,
                ease: 'power2.out'
            });
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (cardRef.current) {
            gsap.to(cardRef.current, {
                scale: 1,
                rotateY: 0,
                rotateX: 0,
                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
                duration: 0.4,
                ease: 'power2.out'
            });
        }
    };

    const handleClick = () => {
        setIsFlipped(!isFlipped);
        if (cardRef.current) {
            gsap.to(cardRef.current, {
                rotateY: isFlipped ? 0 : 180,
                duration: 0.8,
                ease: 'power2.inOut'
            });
        }
    };

    return (
        <div
            ref={cardRef}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-[4/5] cursor-pointer"
            style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
            }}
        >
            {/* Front of Card */}
            <div
                className={`absolute inset-0 rounded-3xl p-6 sm:p-8 flex flex-col transition-opacity duration-300 ${isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: `
            0 10px 40px -10px rgba(0,0,0,0.2),
            inset 0 1px 0 rgba(255,255,255,0.4),
            inset 0 -1px 0 rgba(0,0,0,0.1)
          `,
                    backfaceVisibility: 'hidden'
                }}
            >
                {/* Gradient Orb */}
                <div
                    className={`absolute top-4 right-4 w-24 h-24 rounded-full bg-gradient-to-br ${service.gradient} opacity-30 blur-2xl`}
                />

                {/* Icon */}
                <div
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 p-4 rounded-2xl bg-gradient-to-br ${service.gradient} text-white shadow-lg mb-6`}
                    style={{
                        boxShadow: `0 10px 30px -5px ${service.accentColor}60`
                    }}
                >
                    {service.icon}
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-800 mb-2">
                        {service.title}
                    </h3>
                    <p
                        className="text-sm font-semibold uppercase tracking-wider mb-4"
                        style={{ color: service.accentColor }}
                    >
                        {service.subtitle}
                    </p>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed flex-grow">
                        {service.description}
                    </p>
                </div>

                {/* Click hint */}
                <div className="flex items-center justify-center mt-4 text-slate-400 text-xs">
                    <span className="mr-2">Click to flip</span>
                    <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </div>

                {/* Shine effect on hover */}
                <div
                    className={`absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, transparent 100%)'
                    }}
                />
            </div>

            {/* Back of Card */}
            <div
                className={`absolute inset-0 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                style={{
                    background: `linear-gradient(135deg, ${service.accentColor}ee, ${service.accentColor}99)`,
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: `0 20px 50px -10px ${service.accentColor}60`,
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                }}
            >
                <div className="w-20 h-20 text-white/90 mb-6">
                    {service.icon}
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
                    {service.title}
                </h3>
                <p className="text-white/80 text-sm mb-6">
                    Ready to learn more about our {service.title.toLowerCase()} services?
                </p>
                <button
                    className="px-8 py-3 bg-white text-slate-800 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Navigate to contact
                        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

const Services: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Hero animations
        const tl = gsap.timeline();

        tl.fromTo(
            titleRef.current,
            { opacity: 0, y: 80, rotateX: -30 },
            { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: 'power4.out' }
        ).fromTo(
            subtitleRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.6'
        );

        // Parallax effect on scroll
        gsap.to(heroRef.current, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // Floating orbs animation
        gsap.utils.toArray<HTMLElement>('.floating-orb').forEach((orb, i) => {
            gsap.to(orb, {
                x: `+=${Math.sin(i) * 30}`,
                y: `+=${Math.cos(i) * 20}`,
                duration: 4 + i,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-orange-50/20 overflow-hidden">
            {/* Hero Section */}
            <div
                ref={heroRef}
                className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden"
            >
                {/* Animated Background Orbs */}
                <div className="floating-orb absolute top-20 left-[10%] w-72 h-72 bg-purple-300/40 rounded-full blur-3xl" />
                <div className="floating-orb absolute top-40 right-[15%] w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
                <div className="floating-orb absolute bottom-0 left-[30%] w-80 h-80 bg-pink-200/30 rounded-full blur-3xl" />

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full mb-8 border border-purple-100">
                        <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full mr-3 animate-pulse" />
                        <span className="text-sm font-medium text-slate-600">Comprehensive Care Solutions</span>
                    </div>

                    <h1
                        ref={titleRef}
                        className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-slate-900 mb-6 leading-tight"
                        style={{ perspective: '1000px' }}
                    >
                        Our <span className="text-transparent bg-clip-text gradient-accent">Services</span>
                    </h1>

                    <p
                        ref={subtitleRef}
                        className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        Discover our comprehensive range of home care services, designed to provide
                        <span className="font-semibold text-slate-800"> compassionate support</span> for every stage of life.
                    </p>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
                    <span className="text-xs text-slate-400 mb-2">Scroll to explore</span>
                    <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>

            {/* Services Grid */}
            <div className="relative py-16 lg:py-24">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />

                <div ref={gridRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {services.map((service, index) => (
                            <ServiceCardComponent key={service.id} service={service} index={index} />
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative py-20 lg:py-32 overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 gradient-accent opacity-95" />

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[200%] bg-white/10 rotate-12 blur-3xl" />
                    <div className="absolute bottom-[-50%] right-[-20%] w-[60%] h-[200%] bg-black/10 -rotate-12 blur-3xl" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
                        Ready to Begin Your Care Journey?
                    </h2>
                    <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                        Let us create a personalized care plan that fits your family's unique needs. Our compassionate team is here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-10 py-5 bg-white text-slate-800 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all transform hover:-translate-y-1 hover:scale-105"
                        >
                            Get Your Free Consultation
                        </button>
                        <a
                            href={PHONE_TEL}
                            className="px-10 py-5 border-2 border-white/40 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all"
                        >
                            Call {PHONE_DISPLAY}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
