

import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import AdminEditLink from '@/components/ui/AdminEditLink';
import { prisma } from '@/lib/prisma';
import styles from './products.module.css';
import OurProducts from '@/components/public/OurProducts';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Features from '@/components/public/Features';
import ProductSpotlight from '@/components/public/ProductSpotlight';
import ServiceGrid from '@/components/public/ServiceGrid';
import TextBlock from '@/components/public/TextBlock';
import LogoWall from '@/components/public/LogoWall';
import Stats from '@/components/public/Stats';
import Testimonials from '@/components/public/Testimonials';
import CTABanner from '@/components/public/CTABanner';

export const revalidate = 0;

export default async function ProductsPage() {
    const page = await prisma.page.findFirst({
        where: { slug: 'products' },
        include: {
            sections: { orderBy: { order: 'asc' } }
        }
    });

    const logos = await prisma.partnerLogo.findMany({
        orderBy: { createdAt: 'desc' }
    });

    const products = await prisma.brandProduct.findMany({
        orderBy: { createdAt: 'asc' },
        include: {
            subProducts: {
                orderBy: { createdAt: 'asc' }
            }
        }
    });

    const sections = page?.sections || [];
    const hasHero = sections.some((s: any) => s.type === 'HERO');

    return (
        <div className={styles.pageWrapper}>
            <Navbar />
            <main>
                {/* Premium Hero Section */}
                {!hasHero && (
                    <div className={styles.heroSection}>
                        <div className={styles.heroContent}>
                            <AnimatedSection animation="fade-up">
                                <h1 className={styles.heroTitle}>
                                    Our <span className={styles.highlight}>Solutions</span>
                                </h1>
                                <p className={styles.heroSubtitle}>
                                    Explore our comprehensive range of digital products and services designed to elevate your business and drive growth.
                                </p>
                            </AnimatedSection>
                        </div>
                    </div>
                )}

                {/* Product List */}
                <div className={styles.productsContainer}>
                    <OurProducts logos={logos} products={products} layout="list" />
                </div>

                {/* Dynamic CMS Sections */}
                {sections.length > 0 && sections.map((section: any) => {
                    let content = section.content || {};
                    if (typeof content === 'string') {
                        try { content = JSON.parse(content); } catch (e) { content = {}; }
                    }

                    if (section.type === 'HERO') return null;

                    if (section.type === 'CTA_BANNER') {
                        return (
                            <CTABanner
                                key={section.id}
                                headline={content.headline}
                                description={content.description}
                                ctaText={content.ctaText}
                                ctaLink={content.ctaLink}
                            />
                        );
                    }

                    const sectionComponent = (() => {
                        switch (section.type) {
                            case 'FEATURES': return <Features title={content.title} items={content.items} />;
                            case 'LOGO_WALL': return <LogoWall title={content.title} items={content.items} />;
                            case 'PRODUCT_SPOTLIGHT':
                                return (
                                    <ProductSpotlight
                                        title={content.title}
                                        tagline={content.tagline}
                                        description={content.description}
                                        image={content.image}
                                        features={content.features}
                                        ctaText={content.ctaText}
                                        ctaLink={content.ctaLink}
                                    />
                                );
                            case 'TEXT': return <TextBlock title={content.title} body={content.body} />;
                            case 'SERVICE_GRID': return <ServiceGrid title={content.title} items={content.items} />;
                            case 'STATS': return <Stats title={content.title} items={content.items} />;
                            case 'TESTIMONIALS': return <Testimonials title={content.title} items={content.items} />;
                            default: return null;
                        }
                    })();

                    return <div key={section.id}>{sectionComponent}</div>;
                })}
            </main>
            <Footer />
            {page && <AdminEditLink pageId={page.id} label="Edit This Page" />}
        </div>
    );
}
