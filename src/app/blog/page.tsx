import Navbar from '@/components/ui/Navbar';
import SectionLayout from '@/components/ui/SectionLayout';
import Footer from '@/components/ui/Footer';
import Features from '@/components/public/Features';
import ProductSpotlight from '@/components/public/ProductSpotlight';
import ServiceGrid from '@/components/public/ServiceGrid';
import TextBlock from '@/components/public/TextBlock';
import LogoWall from '@/components/public/LogoWall';
import Hero from '@/components/public/Hero';
import AdminEditLink from '@/components/ui/AdminEditLink';
import { prisma } from '@/lib/prisma';

export const revalidate = 0;

export default async function BlogPage() {
    const page = await prisma.page.findFirst({
        where: { slug: 'blog' },
        include: {
            sections: { orderBy: { order: 'asc' } }
        }
    });

    const sections = page?.sections || [];

    return (
        <>
            <Navbar />
            <main>
                {sections.length > 0 ? (
                    sections.map((section: any, index: number) => {
                        let content = section.content || {};
                        if (typeof content === 'string') {
                            try {
                                content = JSON.parse(content);
                            } catch (e) {
                                console.error('Failed to parse section content', section.id);
                                content = {};
                            }
                        }

                        if (section.type === 'HERO') {
                            return (
                                <Hero
                                    key={section.id}
                                    headline={content.headline}
                                    subheadline={content.subheadline}
                                    description={content.description || ''}
                                    ctaText={content.ctaText}
                                    ctaLink={content.ctaLink}
                                    backgroundImage={content.backgroundImage}
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
                                default: return null;
                            }
                        })();

                        return (
                            <SectionLayout key={section.id} index={index}>
                                {sectionComponent}
                            </SectionLayout>
                        );
                    })
                ) : (
                    <div className="container section-padding" style={{ paddingTop: '100px' }}>
                        <h1>Knowledge Hub</h1>
                        <p>Latest news and insights coming soon.</p>
                    </div>
                )}
            </main>
            <Footer />
            {page && <AdminEditLink pageId={page.id} label="Edit This Page" />}
        </>
    );
}
