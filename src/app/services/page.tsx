import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Features from '@/components/public/Features';
import ProductSpotlight from '@/components/public/ProductSpotlight';
import ServiceGrid from '@/components/public/ServiceGrid';
import TextBlock from '@/components/public/TextBlock';
import LogoWall from '@/components/public/LogoWall';
import Hero from '@/components/public/Hero';
import Stats from '@/components/public/Stats';
import Testimonials from '@/components/public/Testimonials';
import CTABanner from '@/components/public/CTABanner';
import DetailedServices from '@/components/public/DetailedServices';
import AdminEditLink from '@/components/ui/AdminEditLink';
import ServicesHeroAnimations from '@/components/public/ServicesHeroAnimations';
import { prisma } from '@/lib/prisma';

import styles from './services.module.css';

export const revalidate = 0;

export default async function ServicesPage() {
    const page = await prisma.page.findFirst({
        where: { slug: 'services' },
        include: {
            sections: { orderBy: { order: 'asc' } }
        }
    });

    const logos = await prisma.partnerLogo.findMany({
        orderBy: { createdAt: 'desc' }
    });

    const sections = page?.sections || [];

    // ...

    // Marketing-Optimized Flow
    return (
        <>
            <Navbar />
            <main>
                {/* 1. Static Hero */}
                <div className={styles.heroSection}>
                    <div className={styles.heroBackground}>
                        <div className={styles.heroGradient}></div>
                        <div className={styles.heroPattern}></div>
                        <ServicesHeroAnimations />
                    </div>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            Building <span className={styles.highlight}>Digital Empires</span>,<br />
                            Not Just Websites.
                        </h1>
                        <p className={styles.heroSubtitle}>
                            We craft high-performance digital solutions that drive growth, engagement, and operational efficiency for forward-thinking businesses.
                        </p>
                        <div>
                            <a href="#contact" className={styles.ctaButton}>
                                Start Your Project
                            </a>
                        </div>
                    </div>
                </div>

                {/* 2. Social Proof */}
                {logos.length > 0 && (
                    <div className={styles.logoSection}>
                        <LogoWall items={logos.map((l: any) => ({ image: l.image, alt: l.name }))} title="Trusted by Industry Leaders" />
                    </div>
                )}

                {/* 3. Detailed Services (Core Offer + Value + Tech) */}
                <DetailedServices />

                {/* 4. Dynamic Sections */}
                {sections.length > 0 && sections.map((section: any) => {
                    if (section.type === 'HERO') return null;

                    let content = section.content || {};
                    if (typeof content === 'string') {
                        try { content = JSON.parse(content); } catch (e) { content = {}; }
                    }

                    const sectionComponent = (() => {
                        switch (section.type) {
                            case 'CTA_BANNER':
                                return <CTABanner key={section.id} headline={content.headline} description={content.description} ctaText={content.ctaText} ctaLink={content.ctaLink} />;
                            case 'TESTIMONIALS': return <Testimonials title={content.title} items={content.items} />;
                            default: return null;
                        }
                    })();
                    return <div key={section.id}>{sectionComponent}</div>;
                })}

                {/* 5. Final CTA */}
                <CTABanner
                    headline="Ready to Transform Your Digital Presence?"
                    description="Join the ranks of industry leaders who trust Panoralink for their mission-critical digital assets."
                    ctaText="Get a Free Consultation"
                    ctaLink="/contact"
                />
            </main>
            <Footer />
            {page && <AdminEditLink pageId={page.id} label="Edit This Page" />}
        </>
    );
}
