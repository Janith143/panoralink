import styles from './Features.module.css';
import AnimatedSection from '../ui/AnimatedSection';
import { FiAward, FiGlobe, FiZap, FiLock, FiSmartphone, FiCloud, FiServer, FiCode, FiDatabase, FiShield, FiLayout, FiCheckCircle } from 'react-icons/fi';
import { ReactNode } from 'react';

// Icon mapping for professional look
const iconMap: { [key: string]: ReactNode } = {
    'award': <FiAward />,
    'globe': <FiGlobe />,
    'zap': <FiZap />,
    'lock': <FiLock />,
    'smartphone': <FiSmartphone />,
    'cloud': <FiCloud />,
    'server': <FiServer />,
    'code': <FiCode />,
    'database': <FiDatabase />,
    'shield': <FiShield />,
    'layout': <FiLayout />,
    'check-circle': <FiCheckCircle />,
    'default': <FiCheckCircle />
};

interface FeatureItem {
    title: string;
    description?: string;
    desc?: string;
    icon?: string;
}

interface FeaturesProps {
    title?: string;
    subtitle?: string;
    items?: FeatureItem[];
}

export default function Features({
    title = 'Why Choose Panoralink?',
    subtitle = "We don't just build software — we build solutions that grow with your business.",
    items = []
}: FeaturesProps) {
    const defaultItems: FeatureItem[] = [
        { icon: 'zap', title: 'Fast & Efficient', description: 'Lightning-fast development with agile methodologies.' },
        { icon: 'shield', title: 'Secure & Reliable', description: 'Enterprise-grade security protocols protecting your data.' },
        { icon: 'layout', title: 'Beautiful Design', description: 'Modern, intuitive interfaces that users love.' },
        { icon: 'smartphone', title: 'Mobile First', description: 'Responsive designs that work flawlessly across all devices.' },
        { icon: 'cloud', title: 'Cloud Native', description: 'Scalable cloud solutions for growing businesses.' },
        { icon: 'check-circle', title: 'Dedicated Support', description: '24/7 technical support and maintenance services.' }
    ];

    const displayItems = items.length > 0 ? items : defaultItems;

    const getIcon = (iconName?: string) => {
        if (!iconName) return iconMap['default'];
        // Handle emoji fallback if legacy data exists
        if (/\p{Emoji}/u.test(iconName)) return iconName;
        return iconMap[iconName] || iconMap['default'];
    };

    return (
        <section className={styles.features}>
            <div className="container">
                <div className={styles.header}>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </div>
                <div className={styles.grid}>
                    {displayItems.map((feature, i) => (
                        <AnimatedSection key={i} animation="scale" delay={i * 100}>
                            <div className={`${styles.card} hover-lift`}>
                                <div className={`${styles.icon} animate-pulse-glow`}>
                                    {getIcon(feature.icon)}
                                </div>
                                <h3 className={styles.title}>{feature.title}</h3>
                                <p className={styles.description}>{feature.description || feature.desc || ''}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
