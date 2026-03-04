import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductSpotlight.module.css';
import AnimatedSection from '../ui/AnimatedSection';

interface ProductSpotlightProps {
    title?: string;
    tagline?: string;
    description?: string;
    image?: string;
    features?: string[];
    ctaText?: string;
    ctaLink?: string;
}

export default function ProductSpotlight({
    title = 'Our Flagship Product',
    tagline = 'Innovation at Scale',
    description = 'A comprehensive solution designed to streamline your business operations and drive growth.',
    image = '/images/products-showcase.png',
    features = ['Cloud-based platform', 'Real-time analytics', 'Secure & Reliable'],
    ctaText = 'Learn More',
    ctaLink = '/products'
}: ProductSpotlightProps) {
    return (
        <section className={styles.productSpotlight}>
            <div className={`container ${styles.container}`}>
                <AnimatedSection animation="fade-right" className={styles.content}>
                    <span className={`${styles.tagline} animate-pulse-glow`}>{tagline}</span>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.description}>{description}</p>

                    <ul className={styles.list}>
                        {features.map((feature, i) => (
                            <li key={i} className={`${styles.listItem} animate-fade-in-up stagger-${(i % 5) + 1}`}>
                                <span className={styles.check}>✓</span> {feature}
                            </li>
                        ))}
                    </ul>

                    <div className={styles.actions}>
                        <Link href={ctaLink} className="btn btn-primary hover-lift">
                            {ctaText}
                        </Link>
                    </div>
                </AnimatedSection>

                <AnimatedSection animation="fade-left" className={styles.imageWrapper}>
                    <div className={`${styles.imageContainer} animate-float`}>
                        <Image
                            src={image}
                            alt={title}
                            width={600}
                            height={400}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
