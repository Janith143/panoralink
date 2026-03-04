import Link from 'next/link';
import styles from './CTABanner.module.css';
import AnimatedSection from '../ui/AnimatedSection';

interface CTABannerProps {
    headline?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
}

export default function CTABanner({
    headline = 'Ready to Transform Your Business?',
    description = 'Let us help you achieve your digital transformation goals with innovative solutions.',
    ctaText = 'Get Started Today',
    ctaLink = '/contact'
}: CTABannerProps) {
    return (
        <section className={`${styles.section} animate-gradient`}>
            <div className="container">
                <AnimatedSection animation="scale">
                    <div className={styles.content}>
                        <h2 className={`${styles.headline} animate-fade-in-up stagger-1`}>{headline}</h2>
                        <p className={`${styles.description} animate-fade-in-up stagger-2`}>{description}</p>
                        <Link href={ctaLink} className={`${styles.cta} animate-fade-in-up stagger-3 hover-scale`}>
                            {ctaText} →
                        </Link>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
