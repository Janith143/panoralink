'use client';

import styles from './LogoWall.module.css';

interface LogoItem {
    image: string;
    alt: string;
    link?: string;
}

interface LogoWallProps {
    title?: string;
    items?: {
        image: string;
        alt: string;
        link?: string;
    }[];
}

export default function LogoWall({ title = 'Trusted By', items = [] }: LogoWallProps) {
    const defaultItems: LogoItem[] = [
        // Just placeholder defaults if empty to avoid broken UI
        { image: '/images/partners.png', alt: 'Partners' }
    ];

    // If items are empty, try to show the generated partners image as a single item fallback
    // But mainly this component expects items from DB or falls back to empty return
    const displayItems = items.length > 0 ? [...items, ...items, ...items, ...items] : defaultItems;

    if (items.length === 0 && displayItems === defaultItems) {
        // Special case: if no items provided, try to render the singular partners image
        return (
            <section className={styles.section}>
                <div className="container">
                    {title && <h3 className={styles.title}>{title}</h3>}
                    <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.7 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/partners.png" alt="Partners" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <div className="container">
                {title && <h3 className={`${styles.title} animate-fade-in-up`}>{title}</h3>}

                <div className={styles.scroller}>
                    <div className={styles.track}>
                        {displayItems.map((item, index) => (
                            <div key={index} className={`${styles.item} hover-scale`}>
                                {item.link ? (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={item.image}
                                            alt={item.alt}
                                            className={styles.logo}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    </a>
                                ) : (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                        src={item.image}
                                        alt={item.alt}
                                        className={styles.logo}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
