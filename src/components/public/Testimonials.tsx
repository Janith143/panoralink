import styles from './Testimonials.module.css';
import AnimatedSection from '../ui/AnimatedSection';

interface Testimonial {
    quote: string;
    author: string;
    company: string;
    image?: string;
}

interface TestimonialsProps {
    title?: string;
    items?: Testimonial[];
    layout?: 'grid' | 'marquee';
}

export default function Testimonials({
    title = 'What Our Clients Say',
    items = [
        { quote: 'Panoralink transformed our business with their innovative solutions. Highly recommended!', author: 'John Smith', company: 'Tech Innovations Ltd', image: '' },
        { quote: 'Outstanding service and support. The team went above and beyond our expectations.', author: 'Sarah Johnson', company: 'Digital First Inc', image: '' },
        { quote: 'Professional, reliable, and results-driven. A true technology partner.', author: 'Michael Chen', company: 'Growth Ventures', image: '' }
    ],
    layout = 'grid'
}: TestimonialsProps) {
    // Duplicate items for seamless marquee scrolling
    const marqueeItems = layout === 'marquee' ? [...items, ...items, ...items, ...items] : items;

    return (
        <section className={styles.section}>
            <div className="container">
                {title && (
                    <div className={styles.header}>
                        <AnimatedSection animation="fade-up">
                            <h2>{title}</h2>
                        </AnimatedSection>
                    </div>
                )}

                {layout === 'marquee' ? (
                    <div className={styles.scroller}>
                        <div className={styles.track}>
                            {marqueeItems.map((item, index) => (
                                <div key={index} className={styles.marqueeCard}>
                                    <p className={styles.quote}>&quot;{item.quote}&quot;</p>
                                    <div className={styles.author}>
                                        <div className={styles.avatar}>
                                            {item.image ? (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img src={item.image} alt={item.author} />
                                            ) : (
                                                item.author.charAt(0)
                                            )}
                                        </div>
                                        <div className={styles.info}>
                                            <h4>{item.author}</h4>
                                            <p>{item.company}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {items.map((item, index) => (
                            <AnimatedSection key={index} animation="scale" delay={index * 150}>
                                <div className={`${styles.card} hover-lift`}>
                                    <p className={styles.quote}>&quot;{item.quote}&quot;</p>
                                    <div className={styles.author}>
                                        <div className={`${styles.avatar} animate-pulse-glow`}>
                                            {item.image ? (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img src={item.image} alt={item.author} />
                                            ) : (
                                                item.author.charAt(0)
                                            )}
                                        </div>
                                        <div className={styles.info}>
                                            <h4>{item.author}</h4>
                                            <p>{item.company}</p>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
