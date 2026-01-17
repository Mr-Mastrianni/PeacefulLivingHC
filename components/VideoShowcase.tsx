import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoShowcase: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(videoContainerRef.current,
                { opacity: 0, scale: 0.95, y: 20 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "top 50%",
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-[#fdfbf7] relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-purple-100 blur-3xl opacity-40"></div>
                <div className="absolute bottom-1/4 -left-20 w-60 h-60 rounded-full bg-orange-100 blur-3xl opacity-40"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Discovery Compassionate Care</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        See how we bring peace and comfort to your loved ones' lives through our dedicated service.
                    </p>
                </div>

                <div
                    ref={videoContainerRef}
                    className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-video bg-slate-900 w-full max-w-5xl mx-auto group"
                >
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        controls
                        playsInline
                        poster="/video_thumbnail_brand.png"
                        src="/videos/marketing-intro.mp4"
                    >
                        Your browser does not support the video tag.
                    </video>

                    {/* Optional: Overlay gradient - fades out when playing if we wanted better controls, 
                        but standard controls are safer for accessibility and user preference. 
                        We can add a subtle border overlay though. */}
                    <div className="absolute inset-0 border border-white/10 rounded-2xl md:rounded-3xl pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
};

export default VideoShowcase;
