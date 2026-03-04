import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import AdminEditLink from '@/components/ui/AdminEditLink';
import { prisma } from '@/lib/prisma';
import styles from './contact.module.css';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ContactForm from '@/components/public/ContactForm';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaTelegram, FaFacebook, FaTiktok } from 'react-icons/fa';

export const revalidate = 0;

export default async function ContactPage() {
    const page = await prisma.page.findFirst({
        where: { slug: 'contact' },
    });

    return (
        <div className={styles.pageWrapper}>
            <Navbar />
            <main style={{ flex: 1 }}>
                {/* 1. Hero */}
                <div className={styles.heroSection}>
                    <div className={styles.heroContent}>
                        <AnimatedSection animation="fade-up">
                            <h1 className={styles.title}>Get in Touch</h1>
                            <p className={styles.subtitle}>
                                Have a project in mind or want to learn more about our services? We’d love to hear from you.
                            </p>
                        </AnimatedSection>
                    </div>
                </div>

                {/* 2. Contact Grid */}
                <section className={styles.contactSection}>
                    <div className="container">
                        <div className={styles.grid}>

                            {/* Contact Info */}
                            <div className={styles.infoColumn}>
                                <AnimatedSection animation="fade-right">
                                    <div className={styles.infoCard}>
                                        <div className={styles.iconBox}>
                                            <FaEnvelope />
                                        </div>
                                        <div>
                                            <span className={styles.infoTitle}>Email Us</span>
                                            <a href="mailto:support@panoralink.com" className={styles.link}>support@panoralink.com</a>
                                            <p className={styles.infoText}>For general inquiries and support</p>
                                        </div>
                                    </div>
                                </AnimatedSection>

                                <AnimatedSection animation="fade-right" delay={100}>
                                    <div className={styles.infoCard}>
                                        <div className={styles.iconBox}>
                                            <FaPhoneAlt />
                                        </div>
                                        <div>
                                            <span className={styles.infoTitle}>Call Us</span>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                <a href="tel:+94770321557" className={styles.link}>+94 77 032 1557</a>
                                                <a
                                                    href="https://wa.me/94770321557"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.link}
                                                    style={{ fontSize: '0.9em', opacity: 0.9, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                                                >
                                                    <FaWhatsapp /> WhatsApp
                                                </a>
                                            </div>
                                            <p className={styles.infoText}>Mon-Fri, 9am - 6pm</p>
                                        </div>
                                    </div>
                                </AnimatedSection>


                            </div>

                            {/* Contact Form */}
                            <AnimatedSection animation="fade-left">
                                <ContactForm />
                            </AnimatedSection>

                        </div>
                    </div>
                </section>

                {/* 3. Social Media Section (New) */}
                <section className={styles.socialSection}>
                    <div className="container">
                        <AnimatedSection animation="fade-up">
                            <h2 className={styles.socialTitle}>Connect with us on Social Media</h2>
                            <div className={styles.socialGrid}>
                                <a href="https://wa.me/94770321557" target="_blank" rel="noopener noreferrer" className={`${styles.socialBtn} ${styles.whatsapp}`} title="WhatsApp">
                                    <FaWhatsapp />
                                </a>
                                <a href="https://t.me/panoralink" target="_blank" rel="noopener noreferrer" className={`${styles.socialBtn} ${styles.telegram}`} title="Telegram">
                                    <FaTelegram />
                                </a>
                                <a href="https://facebook.com/panoralink" target="_blank" rel="noopener noreferrer" className={`${styles.socialBtn} ${styles.facebook}`} title="Facebook">
                                    <FaFacebook />
                                </a>
                                <a href="https://tiktok.com/@panoralink" target="_blank" rel="noopener noreferrer" className={`${styles.socialBtn} ${styles.tiktok}`} title="TikTok">
                                    <FaTiktok />
                                </a>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

            </main>
            <Footer />
            {page && <AdminEditLink pageId={page.id} label="Edit This Page" />}
        </div>
    );
}
