import styles from './Stats.module.css';
import AnimatedSection from '../ui/AnimatedSection';
import { FiAward, FiSmile, FiTrendingUp, FiCheckSquare, FiUsers, FiClock } from 'react-icons/fi';
import { ReactNode } from 'react';

const iconMap: { [key: string]: ReactNode } = {
    'award': <FiAward />,
    'smile': <FiSmile />,
    'trending-up': <FiTrendingUp />,
    'check-square': <FiCheckSquare />,
    'users': <FiUsers />,
    'clock': <FiClock />,
    'default': <FiAward />
};

interface StatItem {
    icon: string;
    value: string;
    label: string;
}

interface StatsProps {
    title?: string;
    items?: StatItem[];
}

export default function Stats({
    title = 'Our Achievements',
    items = [
        { icon: 'check-square', value: '150+', label: 'Projects Completed' },
        { icon: 'smile', value: '50+', label: 'Happy Clients' },
        { icon: 'trending-up', value: '10+', label: 'Years Experience' },
        { icon: 'award', value: '99%', label: 'Client Satisfaction' }
    ]
}: StatsProps) {

    const getIcon = (iconName: string) => {
        if (!iconName) return iconMap['default'];
        if (/\p{Emoji}/u.test(iconName)) return iconName;
        return iconMap[iconName] || iconMap['default'];
    };

    return (
        <section className={styles.section}>
            <div className="container">
                {title && (
                    <div className={styles.header}>
                        <h2>{title}</h2>
                    </div>
                )}
                <div className={styles.grid}>
                    {items.map((item, index) => (
                        <AnimatedSection key={index} animation="fade-up" delay={index * 150}>
                            <div className={`${styles.stat} hover-lift`}>
                                <span className={`${styles.icon} animate-bounce`}>
                                    {getIcon(item.icon)}
                                </span>
                                <div className={styles.value}>{item.value}</div>
                                <div className={styles.label}>{item.label}</div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
