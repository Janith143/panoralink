import styles from './ServiceGrid.module.css';
import AnimatedSection from '../ui/AnimatedSection';
import { FiLayout, FiSmartphone, FiCloud, FiPenTool, FiCode, FiSettings, FiLayers, FiActivity, FiRefreshCw, FiServer, FiDatabase, FiCheckCircle } from 'react-icons/fi';
import { ReactNode } from 'react';

const iconMap: { [key: string]: ReactNode } = {
    'layout': <FiLayout />,
    'smartphone': <FiSmartphone />,
    'cloud': <FiCloud />,
    'pen-tool': <FiPenTool />,
    'code': <FiCode />,
    'settings': <FiSettings />,
    'layers': <FiLayers />,
    'rocket': <FiActivity />,
    'refresh-cw': <FiRefreshCw />,
    'server': <FiServer />,
    'database': <FiDatabase />,
    'check-circle': <FiCheckCircle />,
    'default': <FiLayers />
};

interface ServiceItem {
    title: string;
    description?: string;
    desc?: string;
    icon?: string;
}

interface ServiceGridProps {
    title?: string;
    subtitle?: string;
    items?: ServiceItem[] | string[];
}

export default function ServiceGrid({
    title = 'Our Services',
    subtitle = 'We provide end-to-end software and technology services.',
    items = []
}: ServiceGridProps) {
    const defaultItems: ServiceItem[] = [
        { icon: 'code', title: 'Web Development', description: 'Custom web applications built with modern technologies.' },
        { icon: 'smartphone', title: 'Mobile App Development', description: 'Native and cross-platform mobile apps for iOS and Android.' },
        { icon: 'cloud', title: 'Cloud Solutions', description: 'Scalable cloud infrastructure using AWS, Google Cloud, and Azure.' },
        { icon: 'pen-tool', title: 'UI/UX Design', description: 'User-centered design approach creating beautiful, intuitive digital experiences.' },
        { icon: 'server', title: 'API Development', description: 'RESTful and GraphQL APIs with robust documentation.' },
        { icon: 'settings', title: 'DevOps & Automation', description: 'CI/CD pipelines, containerization, and automated deployment.' }
    ];

    // Normalize items to objects
    const normalizedItems: ServiceItem[] = items.length > 0
        ? items.map(item => typeof item === 'string' ? { title: item, description: '', icon: 'default' } : item)
        : defaultItems;

    const getIcon = (iconName?: string) => {
        if (!iconName) return iconMap['default'];
        if (/\p{Emoji}/u.test(iconName)) return <span>{iconName}</span>;
        return iconMap[iconName] || iconMap['default'];
    };

    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </div>
                <div className={styles.grid}>
                    {normalizedItems.map((service, i) => (
                        <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                            <div className={`${styles.card} hover-lift`}>
                                <div style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                                    {getIcon(service.icon)}
                                </div>
                                <h3 className="animate-gradient-text">{service.title}</h3>
                                <p>{service.description || service.desc || ''}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
