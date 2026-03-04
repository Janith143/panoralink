
import { prisma } from '@/lib/prisma';
import { toggleReviewApproval, deleteReview } from '@/lib/actions';
import { FaCheck, FaTimes, FaTrash, FaStar, FaQuoteLeft, FaUser, FaLink } from 'react-icons/fa';
import Image from 'next/image';

export default async function AdminReviewsPage() {
    const reviews = await prisma.review.findMany({
        orderBy: { createdAt: 'desc' },
    });

    const styles = {
        container: { maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif', color: '#0f172a', padding: '1rem' },
        header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
        h1: { fontSize: '1.875rem', fontWeight: '700', margin: 0 },
        card: { background: 'white', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', marginBottom: '1rem' },
        reviewCard: {
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'start',
            padding: '1.5rem',
            background: 'white',
            borderRadius: '0.75rem',
            border: '1px solid #e2e8f0',
            marginBottom: '1rem',
            transition: 'all 0.2s',
        },
        avatar: {
            width: '3rem',
            height: '3rem',
            borderRadius: '9999px',
            background: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative' as 'relative',
            flexShrink: 0,
        },
        content: { flex: 1 },
        actions: { display: 'flex', gap: '0.75rem', alignItems: 'center' },
        statusBadge: (isApproved: boolean) => ({
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '600',
            background: isApproved ? '#dcfce7' : '#fef9c3',
            color: isApproved ? '#166534' : '#854d0e',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
        }),
        button: (type: 'approve' | 'reject' | 'delete') => ({
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: type === 'approve' ? '#22c55e' : type === 'reject' ? '#f59e0b' : '#ef4444',
            color: 'white',
        }),
        shareLink: {
            background: '#eff6ff',
            padding: '1rem',
            borderRadius: '0.75rem',
            border: '1px solid #dbeafe',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
        }
    };

    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || ''}/reviews/write`;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.h1}>Customer Reviews</h1>
                    <p style={{ color: '#64748b' }}>Manage and approve customer testimonials.</p>
                </div>
                <div style={styles.statusBadge(true)}>
                    Total Reviews: {reviews.length}
                </div>
            </div>

            {/* Share Link Section */}
            <div style={styles.shareLink}>
                <div style={{ padding: '0.75rem', background: 'white', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                    <FaLink color="#2563eb" size={20} />
                </div>
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>Review Submission Link</h3>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>Share this link with your customers to collect reviews.</p>
                    <code style={{ display: 'block', marginTop: '0.5rem', padding: '0.5rem', background: 'white', borderRadius: '0.25rem', border: '1px solid #e2e8f0', fontSize: '0.875rem', color: '#0f172a' }}>
                        {shareUrl}
                    </code>
                </div>
            </div>

            {/* Reviews List */}
            <div>
                {reviews.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                        <FaQuoteLeft size={48} color="#e2e8f0" />
                        <h3 style={{ marginTop: '1rem' }}>No reviews yet</h3>
                        <p>Share the link above to get started!</p>
                    </div>
                ) : (
                    reviews.map((review: any) => (
                        <div key={review.id} style={styles.reviewCard}>
                            <div style={styles.avatar}>
                                {review.image ? (
                                    <Image src={review.image} alt={review.name} fill style={{ objectFit: 'cover' }} />
                                ) : (
                                    <FaUser color="#cbd5e1" size={20} />
                                )}
                            </div>

                            <div style={styles.content}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0 }}>{review.name}</h3>
                                        {review.designation && (
                                            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>{review.designation}</p>
                                        )}
                                    </div>
                                    <span style={styles.statusBadge(review.isApproved)}>
                                        {review.isApproved ? <FaCheck size={12} /> : <FaTimes size={12} />}
                                        {review.isApproved ? 'Approved' : 'Pending'}
                                    </span>
                                </div>

                                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.75rem' }}>
                                    {[...Array(5)].map((_: any, i: number) => (
                                        <FaStar key={i} size={14} color={i < review.rating ? '#fbbf24' : '#e2e8f0'} />
                                    ))}
                                </div>

                                <p style={{ color: '#334155', lineHeight: '1.6', marginBottom: '1rem' }}>
                                    "{review.comment}"
                                </p>
                                <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                    Submitted on {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <form action={async () => {
                                    'use server';
                                    await toggleReviewApproval(review.id);
                                }}>
                                    <button type="submit" style={styles.button(review.isApproved ? 'reject' : 'approve')} title={review.isApproved ? "Unapprove" : "Approve"}>
                                        {review.isApproved ? <FaTimes /> : <FaCheck />}
                                        {review.isApproved ? 'Unapprove' : 'Approve'}
                                    </button>
                                </form>

                                <form action={async () => {
                                    'use server';
                                    await deleteReview(review.id);
                                }}>
                                    <button type="submit" style={styles.button('delete')} title="Delete">
                                        <FaTrash /> Delete
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
