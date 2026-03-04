import Navbar from '@/components/ui/Navbar';
import HeroSlider from '@/components/public/HeroSlider';
import Footer from '@/components/ui/Footer';
import Features from '@/components/public/Features';
import ProductSpotlight from '@/components/public/ProductSpotlight';
import ServiceGrid from '@/components/public/ServiceGrid';
import TextBlock from '@/components/public/TextBlock';
import LogoWall from '@/components/public/LogoWall';
import Stats from '@/components/public/Stats';
import Testimonials from '@/components/public/Testimonials';
import CTABanner from '@/components/public/CTABanner';
import Pillars from '@/components/public/Pillars';
import GrowthLogic from '@/components/public/GrowthLogic';
import OurProducts from '@/components/public/OurProducts';
import DetailedServices from '@/components/public/DetailedServices';
import ReviewsSection from '@/components/public/ReviewsSection';
import AdminEditLink from '@/components/ui/AdminEditLink';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const revalidate = 0; // Disable caching for development

export default async function Home() {
    const page = await prisma.page.findUnique({
        where: { slug: 'home' },
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

    if (!page || !page.published) {
        return notFound();
    }

    return (
        <>
            <Navbar />
            <main>
                {/* Always show the Slider at the top, regardless of sections order for now, or replace the HERO section */}
                {/* For this specific redesign, we will inject the HeroSlider at the very top and skip the dynamic HERO section if it exists to avoid duplicates */}
                <HeroSlider />

                {page.sections.map((section: any) => {
                    let content = section.content || {};
                    if (typeof content === 'string') {
                        try {
                            content = JSON.parse(content);
                        } catch (e) {
                            console.error('Failed to parse section content', section.id);
                            content = {};
                        }
                    }

                    // SKip the old HERO section as we have the new Slider
                    if (section.type === 'HERO') {
                        return null;
                    }

                    // Handle CTA_BANNER separately (full width, no wrapper)
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

                    // Handle PILLARS separately if needed (full width check?) - utilizing standard wrapper for now
                    if (section.type === 'PILLARS') {
                        return (
                            <div key={section.id}>
                                <Pillars />
                                <OurProducts logos={logos} products={products} />
                            </div>
                        );
                    }

                    // Handle GROWTH_LOGIC separately
                    if (section.type === 'GROWTH_LOGIC') {
                        return <GrowthLogic key={section.id} />;
                    }

                    // Wrap other sections for consistent layout
                    const sectionComponent = (() => {
                        switch (section.type) {
                            case 'FEATURES':
                                return (
                                    <Features
                                        title={content.title}
                                        items={content.items}
                                    />
                                );
                            case 'LOGO_WALL':
                                // We are replacing the manual logo wall with our dynamic one in OurProducts
                                // But if there's another logo wall, we can keep it or hide it. 
                                // For now, let's return null to minimize duplication if the user intends this new section to replace it
                                // Or we can render it if they want both. User said "below homepage pillars section...".
                                // If this existing LogoWall is elsewhere, keep it. 
                                return (
                                    <LogoWall
                                        title={content.title}
                                        items={content.items}
                                    />
                                );
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
                            case 'TEXT':
                                return (
                                    <TextBlock
                                        title={content.title}
                                        body={content.body}
                                    />
                                );
                            case 'SERVICE_GRID':
                                return (
                                    <ServiceGrid
                                        title={content.title}
                                        items={content.items}
                                    />
                                );
                            case 'STATS':
                                return (
                                    <Stats
                                        title={content.title}
                                        items={content.items}
                                    />
                                );
                            case 'TESTIMONIALS':
                                return (
                                    <Testimonials
                                        title={content.title}
                                        items={content.items}
                                    />
                                );
                            default:
                                return <p>Unknown section type</p>;
                        }
                    })();

                    // Render component directly as they handle their own layout/container
                    return <div key={section.id}>{sectionComponent}</div>;
                })}
                <DetailedServices />
                <ReviewsSection />
            </main>
            <Footer />
            <AdminEditLink pageId={page.id} label="Edit This Page" />
        </>
    );
}
