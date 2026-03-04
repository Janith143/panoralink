import { prisma } from '@/lib/prisma';
import PageEditor from '@/components/admin/PageEditor';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: Props) {
    const { id } = await params;

    // Fetch page with sections sorted by order
    const page = await prisma.page.findUnique({
        where: { id },
        include: {
            sections: {
                orderBy: { order: 'asc' }
            }
        }
    });

    if (!page) {
        notFound();
    }

    return <PageEditor page={page} />;
}
