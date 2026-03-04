import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminPagesList() {
    const pages = await prisma.page.findMany({
        orderBy: { slug: 'asc' },
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#0f172a' }}>Pages</h1>
                <Link
                    href="/admin/pages/new"
                    style={{
                        background: '#0f172a',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                    }}
                >
                    + Create New Page
                </Link>
            </div>

            <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.875rem', color: '#64748b' }}>Title</th>
                            <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.875rem', color: '#64748b' }}>Slug</th>
                            <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.875rem', color: '#64748b' }}>Status</th>
                            <th style={{ textAlign: 'right', padding: '1rem', fontSize: '0.875rem', color: '#64748b' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages.map((page: any) => (
                            <tr key={page.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '1rem', color: '#0f172a', fontWeight: '500' }}>{page.title}</td>
                                <td style={{ padding: '1rem', color: '#64748b' }}>/{page.slug === 'home' ? '' : page.slug}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        background: page.published ? '#dcfce7' : '#f1f5f9',
                                        color: page.published ? '#166534' : '#64748b',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        {page.published ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <Link
                                        href={`/admin/pages/${page.id}`}
                                        style={{
                                            color: '#3b82f6',
                                            textDecoration: 'none',
                                            fontWeight: '500',
                                            marginRight: '1rem'
                                        }}
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {pages.length === 0 && (
                    <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                        No pages found. Create your first one!
                    </div>
                )}
            </div>
        </div>
    );
}
