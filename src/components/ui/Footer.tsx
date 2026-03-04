
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import NewsletterForm from './NewsletterForm';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    {/* Brand Section */}
                    <div className={styles.brand}>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div>
                                <Image
                                    src="/images/logo.gif"
                                    alt="Panoralink"
                                    width={45}
                                    height={45}
                                    style={{ objectFit: 'contain' }}
                                    unoptimized
                                />
                            </div>
                            <h3 className={styles.logoText}>
                                Panoralink
                            </h3>
                        </Link>
                        <p className={styles.brandDesc}>
                            Empowering businesses, institutions, and entrepreneurs to transform ideas into reliable, scalable technology. Your partner in digital innovation.
                        </p>
                        <div className={styles.social}>
                            <a href="https://www.facebook.com/panoralink" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                                <FaFacebookF />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Twitter">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="https://www.linkedin.com/company/panoralink/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.section}>
                        <h4>Company</h4>
                        <div className={styles.links}>
                            <Link href="/about">About Us</Link>
                            <Link href="/careers">Careers</Link>
                            <Link href="/blog">Blog</Link>
                            <Link href="/contact">Contact Us</Link>
                        </div>
                    </div>

                    {/* Services Links */}
                    <div className={styles.section}>
                        <h4>Services</h4>
                        <div className={styles.links}>
                            <Link href="/services">Web Development</Link>
                            <Link href="/services">Mobile Apps</Link>
                            <Link href="/services">Cloud Solutions</Link>
                            <Link href="/services">UI/UX Design</Link>
                            <Link href="/services">Digital Strategy</Link>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className={styles.section}>
                        <h4>Stay Updated</h4>
                        <div className={styles.newsletter}>
                            <p className={styles.newsletterText}>
                                Subscribe to our newsletter for the latest tech trends and updates.
                            </p>
                            <NewsletterForm />
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.bottom}>
                    <p>© {new Date().getFullYear()} Panoralink Business Solutions (Pvt) Ltd. All Rights Reserved.</p>
                    <div className={styles.legal}>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                        <Link href="/cookies">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
