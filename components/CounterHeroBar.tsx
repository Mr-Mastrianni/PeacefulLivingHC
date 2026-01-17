import React, { useEffect, useRef, useState } from 'react';

interface CounterHeroBarProps {
    targetNumber?: number;
    label?: string;
}

const CounterHeroBar: React.FC<CounterHeroBarProps> = ({
    targetNumber = 25,
    label = "Years of Compassionate Care"
}) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setIsVisible(true);
                        setHasAnimated(true);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (barRef.current) {
            observer.observe(barRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    // Count-up animation
    useEffect(() => {
        if (!isVisible) return;

        const duration = 1500; // 1.5 seconds
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;

        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease-out cubic for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.round(easeOut * targetNumber);

            setCount(currentCount);

            if (frame === totalFrames) {
                clearInterval(counter);
                setCount(targetNumber);
            }
        }, frameDuration);

        return () => clearInterval(counter);
    }, [isVisible, targetNumber]);

    return (
        <div
            ref={barRef}
            className={`
        w-full overflow-hidden
        transition-all duration-700 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
      `}
        >
            {/* The Bar */}
            <div className="relative gradient-accent shadow-2xl">
                {/* Shimmer overlay effect */}
                <div
                    className={`
            absolute inset-0 
            bg-gradient-to-r from-transparent via-white/20 to-transparent
            ${isVisible ? 'animate-shimmer' : ''}
          `}
                    style={{
                        backgroundSize: '200% 100%',
                    }}
                />

                {/* Content */}
                <div className="relative py-5 px-6 sm:py-6 sm:px-8">
                    <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
                        {/* The Number */}
                        <div className="flex items-baseline gap-2">
                            <span
                                className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white drop-shadow-lg"
                                style={{
                                    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                                    minWidth: '100px',
                                    display: 'inline-block',
                                }}
                            >
                                {count}
                            </span>
                            <span className="text-3xl sm:text-4xl lg:text-5xl text-white/80 font-bold">+</span>
                        </div>

                        {/* The Label */}
                        <div className="flex flex-col items-center sm:items-start">
                            <span className="text-white/90 text-lg sm:text-xl lg:text-2xl font-medium tracking-wide">
                                {label}
                            </span>
                            <span className="text-white/70 text-sm sm:text-base font-light italic mt-1">
                                Trusted by families across Indiana
                            </span>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white/10 to-transparent" />
                <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white/10 to-transparent" />
            </div>
        </div>
    );
};

export default CounterHeroBar;
