
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TrustRibbon: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const duration = 20; // Seconds for one full loop

            const content = textRef.current;
            if (content) {
                // Create an infinite loop
                gsap.to(content, {
                    xPercent: -50,
                    ease: "none",
                    duration: duration,
                    repeat: -1,
                });
            }
        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    const textItem = (
        <div className="flex items-center space-x-12 px-6">
            <span className="text-sm sm:text-base font-bold tracking-[0.2em] font-sans uppercase text-white/90">
                Over 25 Years in Healthcare
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
        </div>
    );

    // We repeat the content multiple times to ensure it covers screens of all sizes 
    // and creates a seamless loop when duplicated by the logic (though here we manually duplicate for simplicity in the scroller)
    const items = Array(8).fill(textItem);

    return (
        <div ref={wrapperRef} className="relative w-full overflow-hidden bg-slate-900 border-y border-white/10 py-4 z-20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-slate-900/50 backdrop-blur-sm"></div>

            {/* The scrolling container */}
            <div ref={textRef} className="flex w-[200%] relative z-10 whitespace-nowrap">
                <div className="flex w-1/2 justify-around">
                    {items.map((item, idx) => (
                        <React.Fragment key={`a-${idx}`}>{item}</React.Fragment>
                    ))}
                </div>
                <div className="flex w-1/2 justify-around">
                    {items.map((item, idx) => (
                        <React.Fragment key={`b-${idx}`}>{item}</React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustRibbon;
