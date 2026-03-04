import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

interface HeroProps {
    headline: string;
    subheadline: string;
    description: string;
    ctaText?: string;
    ctaLink?: string;
    backgroundImage?: string;
}

export default function Hero({ headline, subheadline, description, ctaText = 'Get Started', ctaLink = '/contact' }: HeroProps) {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay} />
            <div className={`container ${styles.heroContent}`}>
                <div className={styles.textContent}>
                    <span className={`${styles.label} animate-fade-in-up stagger-1`}>✨ {subheadline}</span>
                    <h1 className={`${styles.title} animate-fade-in-up stagger-2`}>{headline}</h1>
                    <p className={`${styles.description} animate-fade-in-up stagger-3`}>{description}</p>
                    <div className={`${styles.actions} animate-fade-in-up stagger-4`}>
                        <Link href={ctaLink} className="btn btn-primary hover-lift">{ctaText}</Link>
                        <Link href="/services" className="btn btn-outline hover-lift">Our Services</Link>
                    </div>
                </div>
                <div className={`${styles.visual} animate-fade-in-left stagger-5`}>
                    <div className="animate-float">
                        <Image
                            src="/images/hero-visual.png"
                            alt="Software Solutions"
                            width={650}
                            height={550}
                            priority
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
