'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './HeroSlider.module.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'; // Assuming react-icons is installed, if not we'll use unicode or install it

interface Slide {
    id: number;
    image: string;
    label: string;
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
}

const DEFAULT_SLIDES: Slide[] = [
    {
        id: 1,
        // Using a professional corporate/tech background
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop',
        label: 'Comprehensive Development',
        title: 'End-to-End Software Solutions for Modern Businesses',
        description: 'From idea to deployment, we architect intelligent systems that power operations, automate workflows, and drive performance.',
        ctaText: 'Start Your Project',
        ctaLink: '/contact'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', // Tech/Network abstract
        label: 'Systemic Integration',
        title: 'We Don’t Just Build Software. We Build Business Systems.',
        description: 'Panoralink analyzes your entire workflow and develops software that connects every moving part into one powerful ecosystem.',
        ctaText: 'Transform My Operations',
        ctaLink: '/services'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop', // Professional team/meeting
        label: 'Total Control',
        title: 'Complete Software. Complete Control.',
        description: 'Custom-built systems engineered for clarity, automation, and measurable growth.',
        ctaText: 'See Our Solutions',
        ctaLink: '/products'
    }
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % DEFAULT_SLIDES.length);
    }, []);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + DEFAULT_SLIDES.length) % DEFAULT_SLIDES.length);
    };

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [isPaused, nextSlide]);

    return (
        <section
            className={styles.slider}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-label="Hero Slider"
        >
            {DEFAULT_SLIDES.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`${styles.slide} ${index === currentSlide ? styles.slideActive : ''}`}
                    aria-hidden={index !== currentSlide}
                >
                    <div className={styles.imageContainer}>
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            priority={index === 0}
                            className={styles.slideImage}
                        />
                    </div>

                    <div className={`container ${styles.content}`}>
                        <div className={styles.textContent}>
                            <span className={styles.label}>{slide.label}</span>
                            <h1 className={styles.title}>{slide.title}</h1>
                            <p className={styles.description}>{slide.description}</p>
                            <div className={styles.actions}>
                                <Link href={slide.ctaLink} className="btn btn-primary hover-lift">
                                    {slide.ctaText}
                                </Link>
                                {slide.secondaryCtaText && slide.secondaryCtaLink && (
                                    <Link href={slide.secondaryCtaLink} className="btn btn-outline hover-lift" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                                        {slide.secondaryCtaText}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className={`container ${styles.controls}`}>
                <div className={styles.dots}>
                    {DEFAULT_SLIDES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
                <div className={styles.arrows}>
                    <button onClick={prevSlide} className={styles.arrowBtn} aria-label="Previous slide">
                        <FaArrowLeft />
                    </button>
                    <button onClick={nextSlide} className={styles.arrowBtn} aria-label="Next slide">
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </section>
    );
}
