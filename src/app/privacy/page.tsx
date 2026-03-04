import Navbar from '@/components/ui/Navbar';
import SectionLayout from '@/components/ui/SectionLayout';
import Footer from '@/components/ui/Footer';
import TextBlock from '@/components/public/TextBlock';
import AdminEditLink from '@/components/ui/AdminEditLink';
import { prisma } from '@/lib/prisma';

export const revalidate = 0;

export default async function PrivacyPage() {
    const page = await prisma.page.findFirst({
        where: { slug: 'privacy' },
        include: { sections: { orderBy: { order: 'asc' } } }
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
                        return (
                            <SectionLayout key={section.id} index={index}>
                                <TextBlock title={content.title} body={content.body} />
                            </SectionLayout>
                        );
                    })
                ) : (
                    <div className="container section-padding" style={{ paddingTop: '100px' }}>
                        <h1>Privacy Policy</h1>
                        <p>Content not available.</p>
                    </div>
                )}
            </main>
            <Footer />
            {page && <AdminEditLink pageId={page.id} label="Edit This Page" />}
        </>
    );
}
