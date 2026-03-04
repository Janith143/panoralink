import Image from 'next/image';
import styles from './GrowthLogic.module.css';
import AnimatedSection from '../ui/AnimatedSection';

export default function GrowthLogic() {
    return (
        <section className={styles.growthLogic} id="growth-logic">
            <div className="container">
                <AnimatedSection animation="fade-up">
                    <div className={styles.header}>
                        <h2>Scale Your Vision, Not Your Payroll</h2>
                        <p>
                            Traditional growth is expensive. Usually, more customers mean you need more staff, more office space, and more management. <span className={styles.accent}>Panora Link changes the math.</span>
                        </p>
                    </div>
                </AnimatedSection>

                <div className={styles.contentGrid}>
                    <div className={styles.visuals}>
                        <AnimatedSection animation="fade-right" delay={100}>
                            <div className={styles.visualCard}>
                                <Image
                                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop"
                                    alt="The Old Way: Chaotic and stressful scaling"
                                    width={600}
                                    height={338}
                                    className={styles.visualImage}
                                    unoptimized
                                />
                                <div className={styles.visualCaption}>The "Old" Way: Heavy & Unstable</div>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection animation="fade-right" delay={200}>
                            <div className={styles.visualCard}>
                                <Image
                                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop"
                                    alt="The Panora Way: Efficient and scalable technology"
                                    width={600}
                                    height={338}
                                    className={styles.visualImage}
                                    unoptimized
                                />
                                <div className={styles.visualCaption}>The "Panora" Way: Lean & Powerful</div>
                            </div>
                        </AnimatedSection>
                    </div>

                    <div className={styles.points}>
                        <AnimatedSection animation="fade-left" delay={300}>
                            <div className={styles.point}>
                                <h3>Don't Expand—Optimize</h3>
                                <p>We help you reach the next level by removing friction, not by adding more people.</p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="fade-left" delay={400}>
                            <div className={styles.point}>
                                <h3>The 10x Efficiency Multiplier</h3>
                                <p>Our goal is to make your business process so smooth that your current team can handle double the output.</p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="fade-left" delay={500}>
                            <div className={styles.point}>
                                <h3>Sustainable Growth</h3>
                                <p>When you scale through efficiency, your profit margins grow with you.</p>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    );
}
