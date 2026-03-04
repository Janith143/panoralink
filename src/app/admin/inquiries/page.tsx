import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const revalidate = 0;

export default async function InquiriesPage() {
    const inquiries = await prisma.inquiry.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Inquiries</h1>
            </div>

            <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '1rem', fontWeight: '600', color: '#64748b' }}>Date</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: '#64748b' }}>Name</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: '#64748b' }}>Requirement</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: '#64748b' }}>Contact</th>
                            <th style={{ padding: '1rem', fontWeight: '600', color: '#64748b' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                                    No inquiries found.
                                </td>
                            </tr>
                        ) : (
                            inquiries.map((inquiry: any) => (
                                <tr key={inquiry.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem' }}>
                                        {new Date(inquiry.createdAt).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {inquiry.name}
                                    </td>
                                    <td style={{ padding: '1rem', maxWidth: '300px' }}>
                                        <div style={{ maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                            {inquiry.requirement}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div>{inquiry.mobile}</div>
                                        {inquiry.email && <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{inquiry.email}</div>}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '999px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            background: inquiry.status === 'NEW' ? '#dbeafe' : '#f1f5f9',
                                            color: inquiry.status === 'NEW' ? '#1e40af' : '#64748b'
                                        }}>
                                            {inquiry.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
