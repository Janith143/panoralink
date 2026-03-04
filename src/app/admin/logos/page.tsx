import { prisma } from '@/lib/prisma';
import { addPartnerLogo, deletePartnerLogo } from '@/lib/actions';
import Image from 'next/image';
import { FaTrash, FaPlus, FaLink, FaImage } from 'react-icons/fa';

export default async function AdminLogosPage() {
    const logos = await prisma.partnerLogo.findMany({
        orderBy: { createdAt: 'desc' }
    });

    // Inline styles to ensure reliability
    const styles = {
        container: { maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif', color: '#0f172a' },
        header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
        h1: { fontSize: '1.875rem', fontWeight: '700', margin: 0 },
        p: { color: '#64748b', marginTop: '0.5rem' },
        badge: { background: '#eff6ff', color: '#1d4ed8', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: '500' },
        grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' },
        card: { background: 'white', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
        formLabel: { display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' },
        input: { width: '100%', padding: '0.625rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.5rem', outline: 'none', transition: 'border-color 0.15s' },
        button: { width: '100%', background: '#0f172a', color: 'white', fontWeight: '600', padding: '0.75rem', borderRadius: '0.75rem', marginTop: '1rem', cursor: 'pointer' },
        logoCard: { background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '1rem', transition: 'all 0.2s', position: 'relative' as 'relative' }, // Explicitly cast position
        imageContainer: {
            height: '160px', width: '100%', position: 'relative' as 'relative', // CRITICAL: relative position for Next/Image fill
            background: '#f8fafc', borderRadius: '0.5rem', marginBottom: '1rem', overflow: 'hidden', border: '1px solid #f1f5f9'
        },
        deleteBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2rem', height: '2rem', borderRadius: '0.5rem', color: '#94a3b8', background: 'transparent', cursor: 'pointer' }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.h1}>Partner Logos</h1>
                    <p style={styles.p}>Manage the trusted brands displayed on the homepage.</p>
                </div>
                <div style={styles.badge}>
                    Total Logos: {logos.length}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                {/* Add Logo Form */}
                <div style={styles.card}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <div style={{ width: '2.5rem', height: '2.5rem', background: '#dbeafe', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                            <FaPlus />
                        </div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Add New Logo</h2>
                    </div>

                    <form action={async (formData) => {
                        'use server';
                        await addPartnerLogo(formData);
                    }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label style={styles.formLabel}>Partner Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="e.g. Acme Corp"
                                style={styles.input}
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                name="image"
                                required
                                placeholder="/uploads/logo.png"
                                style={styles.input}
                            />
                            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
                                Use a relative path (e.g., <code style={{ background: '#f1f5f9', padding: '0.125rem 0.25rem', borderRadius: '0.25rem' }}>/uploads/file.png</code>) or a full URL.
                            </p>
                        </div>

                        <div>
                            <label style={styles.formLabel}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaLink color="#94a3b8" /> Website Link (Optional)</span>
                            </label>
                            <input
                                type="url"
                                name="link"
                                placeholder="https://example.com"
                                style={styles.input}
                            />
                        </div>

                        <button type="submit" style={styles.button}>
                            Add Partner Logo
                        </button>
                    </form>
                </div>

                {/* Logo List */}
                <div>
                    {logos.length === 0 ? (
                        <div style={{ ...styles.card, textAlign: 'center', padding: '3rem' }}>
                            <div style={{ width: '4rem', height: '4rem', background: '#f8fafc', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', margin: '0 auto 1rem auto' }}>
                                <FaImage size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#0f172a' }}>No logos yet</h3>
                            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Add your first partner logo using the form on the left.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                            {logos.map((logo: any) => (
                                <div key={logo.id} style={styles.logoCard}>
                                    {/* CRITICAL: Explicit dimensions and relative positioning for Next/Image */}
                                    <div style={styles.imageContainer}>
                                        <Image
                                            src={logo.image}
                                            alt={logo.name}
                                            fill
                                            style={{ objectFit: 'contain', padding: '1rem' }}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                                        <div style={{ overflow: 'hidden' }}>
                                            <h3 style={{ fontWeight: 'bold', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={logo.name}>{logo.name}</h3>
                                            {logo.link ? (
                                                <a href={logo.link} target="_blank" style={{ fontSize: '0.75rem', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem', textDecoration: 'none' }}>
                                                    <FaLink size={10} />
                                                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                                                        {(() => {
                                                            try {
                                                                return new URL(logo.link).hostname;
                                                            } catch {
                                                                return 'Visit Link';
                                                            }
                                                        })()}
                                                    </span>
                                                </a>
                                            ) : (
                                                <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem', display: 'block' }}>No link provided</span>
                                            )}
                                        </div>

                                        <form action={async () => {
                                            'use server';
                                            await deletePartnerLogo(logo.id);
                                        }}>
                                            <button
                                                type="submit"
                                                style={styles.deleteBtn}
                                                title="Delete Logo"
                                            >
                                                <FaTrash size={14} color="#ef4444" />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
