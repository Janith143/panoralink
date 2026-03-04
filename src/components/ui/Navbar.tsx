'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { href: '/', label: 'Home' },
        { href: '/services', label: 'Services' },
        { href: '/products', label: 'Products' },
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/images/logo.gif"
                        alt="Panoralink"
                        width={180}
                        height={50}
                        style={{ objectFit: 'contain' }}
                        priority
                        unoptimized
                    />
                    <span className={styles.brandText}>Panoralink</span>
                </Link>
                <nav className={styles.navLinks}>
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.link} ${pathname === link.href ? styles.active : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/contact" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                        Get Quote
                    </Link>
                </nav>
                <button className={styles.mobileMenuBtn}>☰</button>
            </div>
        </header>
    );
}
