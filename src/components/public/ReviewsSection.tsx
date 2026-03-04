
import { prisma } from '@/lib/prisma';
import { FaStar, FaQuoteLeft, FaUser, FaQuoteRight } from 'react-icons/fa';
import Image from 'next/image';

async function getApprovedReviews() {
    return await prisma.review.findMany({
        where: { isApproved: true },
        orderBy: { createdAt: 'desc' },
        take: 6, // Limit to recent 6 for now
    });
}

export default async function ReviewsSection() {
    const reviews = await getApprovedReviews();

    if (reviews.length === 0) return null;

    const styles = {
        section: {
            padding: '4rem 2rem',
            background: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
        },
        header: {
            textAlign: 'center' as 'center',
            marginBottom: '3rem',
        },
        h2: {
            fontSize: '2.25rem',
            fontWeight: '800',
            color: '#0f172a',
            marginBottom: '1rem',
        },
        p: {
            fontSize: '1.125rem',
            color: '#64748b',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
        },
        card: {
            background: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            border: '1px solid #f1f5f9',
            display: 'flex',
            flexDirection: 'column' as 'column',
            position: 'relative' as 'relative',
        },
        quoteIcon: {
            color: '#e2e8f0',
            fontSize: '2rem',
            marginBottom: '1rem',
        },
        comment: {
            color: '#334155',
            lineHeight: '1.6',
            marginBottom: '1.5rem',
            flex: 1,
            fontStyle: 'italic',
        },
        footer: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginTop: 'auto',
            paddingTop: '1.5rem',
            borderTop: '1px solid #f1f5f9',
        },
        avatar: {
            width: '3rem',
            height: '3rem',
            borderRadius: '9999px',
            background: '#f1f5f9',
            position: 'relative' as 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        meta: {
            display: 'flex',
            flexDirection: 'column' as 'column',
        },
        name: {
            fontWeight: '700',
            color: '#0f172a',
            fontSize: '0.95rem',
        },
        designation: {
            fontSize: '0.8rem',
            color: '#64748b',
        },
        stars: {
            display: 'flex',
            gap: '0.2rem',
            marginBottom: '0.5rem',
            color: '#fbbf24',
        }
    };

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2 style={styles.h2}>What Our Clients Say</h2>
                    <p style={styles.p}>Trusted by businesses and individuals across the globe.</p>
                </div>

                <div style={styles.grid}>
                    {reviews.map((review: any) => (
                        <div key={review.id} style={styles.card}>
                            <div style={styles.stars}>
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} size={16} color={i < review.rating ? '#fbbf24' : '#e2e8f0'} />
                                ))}
                            </div>

                            <p style={styles.comment}>
                                "{review.comment}"
                            </p>

                            <div style={styles.footer}>
                                <div style={styles.avatar}>
                                    {review.image ? (
                                        <Image src={review.image} alt={review.name} fill style={{ objectFit: 'cover' }} />
                                    ) : (
                                        <FaUser color="#cbd5e1" size={20} />
                                    )}
                                </div>
                                <div style={styles.meta}>
                                    <span style={styles.name}>{review.name}</span>
                                    {review.designation && (
                                        <span style={styles.designation}>{review.designation}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
