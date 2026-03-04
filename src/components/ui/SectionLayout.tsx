import React from 'react';
import AnimatedSection from './AnimatedSection';

interface SectionLayoutProps {
    children: React.ReactNode;
    index: number;
    id?: string;
    className?: string;
}

export default function SectionLayout({ children, index, id, className = '' }: SectionLayoutProps) {
    const isEven = index % 2 === 0;
    const bgStyle = isEven ? '#ffffff' : '#f8fafc'; // White vs Slate-50

    return (
        <section
            id={id}
            className={`section-wrapper ${className}`}
            style={{
                backgroundColor: bgStyle,
                paddingTop: '6rem',
                paddingBottom: '6rem',
                borderBottom: '1px solid rgba(0,0,0,0.03)',
                overflow: 'hidden' // Prevent animation overflow
            }}
        >
            <div className="container">
                <AnimatedSection animation="fade-up" delay={100}>
                    {children}
                </AnimatedSection>
            </div>
        </section>
    );
}
