import Image from 'next/image';
import styles from './Pillars.module.css';
import AnimatedSection from '../ui/AnimatedSection';

export default function Pillars() {
    const pillars = [
        {
            number: 'Pillar I',
            title: 'System-Wide Re-Engineering',
            concept: 'Total Environment Fix',
            message: "We don’t just fix a broken part; we re-design the whole machine. By looking at the big picture, we make sure today’s problems never come back.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" // Architecture/Structure
        },
        {
            number: 'Pillar II',
            title: 'Zero-Load Integration',
            concept: 'No New Overhead',
            message: "We solve problems without creating new ones. Our systems don’t require a tech team to manage them, so you get all the power with none of the extra payroll.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" // Tech Integration/Connection
        },
        {
            number: 'Pillar III',
            title: 'Decision Intelligence',
            concept: 'Clarity at a Glance',
            message: "We turn messy data into clear decisions. When everything is compiled, your next move is as clear as day—no more guessing, no more confusion.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" // Data/Analytics
        },
        {
            number: 'Pillar IV',
            title: 'Efficiency-Led Scaling',
            concept: 'Breaking the Glass Ceiling',
            message: "Growth doesn't have to mean more employees. We help you scale by making your current systems so efficient that you do more with less.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" // Growth/Upward Trend
        }
    ];

    return (
        <section className={styles.pillars} id="pillars">
            <div className="container">
                <div className={styles.header}>
                    <AnimatedSection animation="fade-up">
                        <h2>Clarity in Design. Precision in Execution.<br /> Scalability by Default</h2>
                    </AnimatedSection>
                </div>
                <div className={styles.grid}>
                    {pillars.map((pillar, i) => (
                        <AnimatedSection key={i} animation="fade-up" delay={i * 200}>
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <h3 className={styles.title}>{pillar.title}</h3>
                                </div>
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={pillar.image}
                                        alt={pillar.title}
                                        fill
                                        className={styles.image}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                </div>
                                <div className={styles.content}>
                                    {/* <span className={styles.pillarNumber}>{pillar.number}</span> */}
                                    <p className={styles.concept}>{pillar.concept}</p>
                                    <p className={styles.message}>{pillar.message}</p>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
