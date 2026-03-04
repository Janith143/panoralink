'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'none';
}

export default function AnimatedSection({
    children,
    className = '',
    delay = 0,
    animation = 'fade-up'
}: AnimatedSectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    const getAnimationClass = () => {
        switch (animation) {
            case 'fade-up': return 'animate-section-up';
            case 'fade-down': return 'animate-section-down';
            case 'fade-left': return 'animate-section-left';
            case 'fade-right': return 'animate-section-right';
            case 'scale': return 'animate-section-scale';
            default: return '';
        }
    };

    return (
        <div ref={ref} className={`animated-section ${getAnimationClass()} ${className}`}>
            {children}
            <style jsx>{`
                .animated-section {
                    opacity: 0.01; /* fallback for 0 to ensure paint? */
                    transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
                    will-change: opacity, transform;
                }
                .animated-section.visible {
                    opacity: 1;
                }
                .animate-section-up {
                    transform: translateY(60px);
                }
                .animate-section-up.visible {
                    transform: translateY(0);
                }
                .animate-section-down {
                    transform: translateY(-60px);
                }
                .animate-section-down.visible {
                    transform: translateY(0);
                }
                .animate-section-left {
                    transform: translateX(-50px);
                }
                .animate-section-left.visible {
                    transform: translateX(0);
                }
                .animate-section-right {
                    transform: translateX(50px);
                }
                .animate-section-right.visible {
                    transform: translateX(0);
                }
                .animate-section-scale {
                    transform: scale(0.95);
                }
                .animate-section-scale.visible {
                    transform: scale(1);
                }
            `}</style>
        </div>
    );
}
