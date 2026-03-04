
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import styles from './careers.module.css';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { FaLaptopCode, FaHeartbeat, FaCoffee, FaClock, FaUsers, FaGraduationCap, FaBriefcase, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Careers | Panoralink',
    description: 'Join the Panoralink team and help build the future of digital technology. Check out our current job openings and company culture.',
};

export default function CareersPage() {
    const benefits = [
        { icon: <FaLaptopCode />, title: "Latest Tech", desc: "Work with cutting-edge technologies and modern development stacks." },
        { icon: <FaClock />, title: "Flexible Hours", desc: "We value work-life balance and offer flexible working hours." },
        { icon: <FaHeartbeat />, title: "Health & Wellness", desc: "Comprehensive health insurance and wellness programs for our team." },
        { icon: <FaGraduationCap />, title: "Learning Budget", desc: "Annual budget for courses, conferences, and continuous learning." },
        { icon: <FaUsers />, title: "Great Culture", desc: "A collaborative, inclusive, and fun work environment." },
        { icon: <FaCoffee />, title: "Remote Options", desc: "Hybrid and remote work options available for many positions." }
    ];

    return (
        <>
            <Navbar />
            <main>
                {/* 1. Hero Section */}
                <div className={styles.heroSection}>
                    <div className={styles.heroBackground}>
                        <div className={styles.heroPattern}></div>
                    </div>
                    <div className={styles.heroContent}>
                        <AnimatedSection animation="fade-up">
                            <span className={styles.label}>Join Our Team</span>
                            <h1 className={styles.title}>
                                Build the Future With Us
                            </h1>
                            <p className={styles.subtitle}>
                                We're looking for passionate problem solvers, creators, and innovators to help us shape the digital landscape.
                            </p>
                        </AnimatedSection>
                    </div>
                </div>

                {/* 2. Benefits Section */}
                <section className={styles.benefitsSection}>
                    <div className="container">
                        <AnimatedSection animation="fade-up">
                            <div className={styles.sectionHeader}>
                                <span className={styles.sectionLabel}>Why Panoralink?</span>
                                <h2 className={styles.sectionTitle}>Perks & Benefits</h2>
                                <p className={styles.sectionDesc}>
                                    We believe in taking care of our people so they can do their best work.
                                </p>
                            </div>
                        </AnimatedSection>

                        <div className={styles.grid}>
                            {benefits.map((benefit: any, i: number) => (
                                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                                    <div className={styles.benefitCard}>
                                        <div className={styles.benefitIcon}>{benefit.icon}</div>
                                        <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                                        <p className={styles.benefitDesc}>{benefit.desc}</p>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. Openings Section */}
                <section className={styles.openingsSection}>
                    <div className="container">
                        <AnimatedSection animation="fade-up">
                            <div className={styles.sectionHeader}>
                                <span className={styles.sectionLabel}>Current Openings</span>
                                <h2 className={styles.sectionTitle}>Join the Mission</h2>
                                <p className={styles.sectionDesc}>
                                    Check out our open positions below. Don't see a fit? We're always looking for talent.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="fade-up" delay={200}>
                            <div className={styles.emptyState}>
                                <div className={styles.emptyIcon}>
                                    <FaBriefcase />
                                </div>
                                <h3 className={styles.emptyTitle}>No Open Positions Right Now</h3>
                                <p className={styles.emptyText}>
                                    We don't have any specific openings at the moment, but we're always interested in meeting talented people. Send us your CV and we'll keep you in mind for future opportunities.
                                </p>
                                <Link href="/contact" className={styles.ctaButton}>
                                    <FaEnvelope style={{ marginRight: '0.5rem' }} />
                                    Contact Us
                                </Link>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
