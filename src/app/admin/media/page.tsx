import { prisma } from '@/lib/prisma';
import MediaLibrary from '@/components/admin/MediaLibrary';

export const revalidate = 0;

export default async function AdminMediaPage() {
    const assets = await prisma.asset.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#0f172a' }}>Media Library</h1>
            </div>

            <MediaLibrary assets={assets} />
        </div>
    );
}
