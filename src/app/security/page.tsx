import Navbar from '@/components/ui/Navbar';
import SectionLayout from '@/components/ui/SectionLayout';
import Footer from '@/components/ui/Footer';
import TextBlock from '@/components/public/TextBlock';
import AdminEditLink from '@/components/ui/AdminEditLink';
import { prisma } from '@/lib/prisma';

export const revalidate = 0;

export default async function SecurityPage() {
    const page = await prisma.page.findFirst({
        where: { slug: 'security' },
        include: {
            sections: { orderBy: { order: 'asc' } }
        }
    });

    const sections = page?.sections || [];

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: '80px', minHeight: '60vh' }}>
                <div className="container section-padding">
                    <h1>Data Protection & Security</h1>
                    {sections.length > 0 ? (
                        sections.map((section: any, index: number) => {
                            let content = section.content || {};
                            if (typeof content === 'string') {
                                try {
                                    content = JSON.parse(content);
                                } catch (e) {
                                    content = {};
                                }
                            }
                            if (section.type === 'TEXT') {
                                return (
                                    <div key={section.id} style={{ marginTop: '2rem' }}>
                                        <TextBlock title={content.title} body={content.body} />
                                    </div>
                                );
                            }
                            return null;
                        })
                    ) : (
                        <p>Content coming soon.</p>
                    )}
                </div>
            </main>
            <Footer />
            {page && <AdminEditLink pageId={page.id} label="Edit This Page" />}
        </>
    );
}
