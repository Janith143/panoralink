import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import AdminEditLink from '@/components/ui/AdminEditLink';
import { prisma } from '@/lib/prisma';
import styles from './about.module.css';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { FaBullseye, FaEye, FaHandshake, FaLightbulb, FaRocket, FaUsers, FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs, FaPython, FaDatabase, FaServer, FaCode, FaLaptopCode, FaMobileAlt, FaCloud } from 'react-icons/fa';
import Testimonials from '@/components/public/Testimonials';

export const revalidate = 0;

export default async function AboutPage() {
    const page = await prisma.page.findFirst({
        where: { slug: 'about' },
        include: {
            sections: { orderBy: { order: 'asc' } }
        }
    });

    const values = [
        { icon: <FaLightbulb />, title: "Innovation", desc: "We constantly push boundaries to create forward-thinking solutions." },
        { icon: <FaHandshake />, title: "Integrity", desc: "We build trust through transparency, honesty, and ethical practices." },
        { icon: <FaUsers />, title: "Collaboration", desc: "We believe in the power of partnership with our clients and team." },
        { icon: <FaRocket />, title: "Excellence", desc: "We are committed to delivering the highest quality in everything we do." }
    ];

    // Fetch real reviews from DB
    const dbReviews = await prisma.review.findMany({
        where: { isApproved: true },
        orderBy: { createdAt: 'desc' },
        take: 10
    });

    const reviews = dbReviews.length > 0 ? dbReviews.map((r: any) => ({
        quote: r.comment,
        author: r.name,
        company: r.designation || '',
        image: r.image || ''
    })) : [
        // Fallback if no real reviews
        { quote: "Panoralink's strategic approach completely revitalized our digital presence.", author: "David K.", company: "Retail Giants Corp" },
        { quote: "Their team isn't just skilled; they're genuinely invested in our success.", author: "Michelle T.", company: "Startup Hub" },
        { quote: "The best technical partner we've worked with. Delivered on time and within budget.", author: "James L.", company: "FinTech Solutions" },
        { quote: "A seamless experience from concept to deployment. Highly recommended!", author: "Amanda R.", company: "Creative Studios" },
        { quote: "They understood our vision perfectly and executed it with precision.", author: "Robert B.", company: "Eco Ventures" }
    ];

    return (
        <>
            <Navbar />
            <main>
                {/* 1. Hero Section */}
                <div className={styles.heroSection}>
                    <div className={styles.heroBackground}>
                        <div className={styles.heroPattern}></div>
                        {/* Animated Web Dev Icons */}
                        <div className={styles.floatingIcons}>
                            <FaHtml5 className={`${styles.techIcon} ${styles.icon1}`} />
                            <FaCss3 className={`${styles.techIcon} ${styles.icon2}`} />
                            <FaJs className={`${styles.techIcon} ${styles.icon3}`} />
                            <FaReact className={`${styles.techIcon} ${styles.icon4}`} />
                            <FaNodeJs className={`${styles.techIcon} ${styles.icon5}`} />
                            <FaPython className={`${styles.techIcon} ${styles.icon6}`} />

                            <FaDatabase className={`${styles.techIcon} ${styles.icon7}`} />
                            <FaServer className={`${styles.techIcon} ${styles.icon8}`} />
                            <FaCode className={`${styles.techIcon} ${styles.icon9}`} />
                            <FaLaptopCode className={`${styles.techIcon} ${styles.icon10}`} />
                            <FaMobileAlt className={`${styles.techIcon} ${styles.icon11}`} />
                            <FaCloud className={`${styles.techIcon} ${styles.icon12}`} />
                        </div>
                    </div>
                    <div className={styles.heroContent}>
                        <AnimatedSection animation="fade-up">
                            <span className={styles.label}>Who We Are</span>
                            <h1 className={styles.title}>
                                Driving Digital Transformation
                            </h1>
                            <p className={styles.subtitle}>
                                Panoralink is a team of visionary developers, designers, and strategists dedicated to empowering businesses through cutting-edge technology.
                            </p>
                        </AnimatedSection>
                    </div>
                </div>

                {/* 2. Mission & Vision */}
                <section className={styles.missionSection}>
                    <div className="container">
                        <div className={styles.grid}>
                            <AnimatedSection animation="fade-right">
                                <div className={styles.card}>
                                    <div className={styles.cardIcon}>
                                        <FaBullseye />
                                    </div>
                                    <h2 className={styles.cardTitle}>Our Mission</h2>
                                    <p className={styles.cardText}>
                                        To empower organizations with scalable, high-performance digital solutions that drive growth and efficiency. We strive to bridge the gap between complex technology and business success.
                                    </p>
                                </div>
                            </AnimatedSection>
                            <AnimatedSection animation="fade-left">
                                <div className={styles.card}>
                                    <div className={styles.cardIcon}>
                                        <FaEye />
                                    </div>
                                    <h2 className={styles.cardTitle}>Our Vision</h2>
                                    <p className={styles.cardText}>
                                        To be the global partner of choice for digital innovation, where we help shape the future of technology by building digital empires that stand the test of time.
                                    </p>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* 3. Our Story */}
                <section className={styles.storySection}>
                    <div className="container">
                        <AnimatedSection animation="fade-up">
                            <div className={styles.storyContent}>
                                <span className={styles.sectionLabel}>Our Journey</span>
                                <h2 className={styles.sectionTitle}>Building for the Future</h2>
                                <div className={styles.storyText}>
                                    <p>
                                        Founded with a passion for code and a vision for the future, Panoralink started as a small team of tech enthusiasts. Today, we have grown into a full-service digital agency trusted by industry leaders.
                                    </p>
                                    <p>
                                        We believe that every line of code matters. Our approach combines technical expertise with creative problem-solving to deliver solutions that are not just functional, but transformative. From startups to enterprises, we have helped countless businesses navigate the digital landscape.
                                    </p>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* 4. Core Values */}
                <section className={styles.valuesSection}>
                    <div className="container">
                        <AnimatedSection animation="fade-up">
                            <div style={{ textAlign: 'center' }}>
                                <span className={styles.label} style={{ background: 'rgba(255,255,255,0.1)' }}>Our Culture</span>
                                <h2 className={styles.sectionTitle} style={{ color: 'white' }}>Core Values</h2>
                            </div>
                        </AnimatedSection>
                        <div className={styles.valuesGrid}>
                            {values.map((val, i) => (
                                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                                    <div className={styles.valueItem}>
                                        <div className={styles.valueIcon}>{val.icon}</div>
                                        <h3 className={styles.valueTitle}>{val.title}</h3>
                                        <p className={styles.valueDesc}>{val.desc}</p>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>



                {/* 5. Reviews Marquee */}
                <Testimonials title="What People Say About Us" items={reviews} layout="marquee" />

            </main >
            <Footer />
            {page && <AdminEditLink pageId={page.id} label="Edit This Page" />}
        </>
    );
}
