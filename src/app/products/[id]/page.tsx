
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaWhatsapp, FaArrowLeft, FaCheck } from 'react-icons/fa';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export const revalidate = 0;

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await prisma.subProduct.findUnique({
        where: { id },
        include: {
            brandProduct: true
        }
    });

    if (!product) {
        return notFound();
    }

    // Parse descriptions
    let shortDesc: string[] = [];
    try {
        const rawShortDesc = product.shortDescription as any;
        if (Array.isArray(rawShortDesc)) {
            shortDesc = rawShortDesc;
        } else if (typeof rawShortDesc === 'string') {
            try {
                const parsed = JSON.parse(rawShortDesc);
                shortDesc = Array.isArray(parsed) ? parsed : [parsed];
            } catch {
                shortDesc = [rawShortDesc];
            }
        }
    } catch (e) {
        shortDesc = [];
    }

    let galleryImages: string[] = [];
    try {
        galleryImages = (product.galleryImages as any) || [];
        if (typeof galleryImages === 'string') {
            try {
                galleryImages = JSON.parse(galleryImages);
            } catch {
                galleryImages = [];
            }
        }
    } catch (e) {
        galleryImages = [];
    }

    // Ensure main image is finding its way if gallery is empty
    if (!galleryImages || galleryImages.length === 0) {
        galleryImages = [product.image];
    } else {
        // Add main image to start if not present, or maybe just use gallery
        // User said "image gallery". Let's show main image + gallery images
        if (!galleryImages.includes(product.image)) {
            galleryImages = [product.image, ...galleryImages];
        }
    }


    const styles = {
        main: { paddingTop: '80px', minHeight: '100vh', background: '#f8fafc' },
        container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' },
        breadcrumb: { marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b' },
        grid: { display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' },
        imageSection: { background: 'white', padding: '1rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
        mainImage: { width: '100%', height: '400px', position: 'relative' as 'relative', borderRadius: '0.75rem', overflow: 'hidden', marginBottom: '1rem' },
        galleryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '0.75rem' },
        thumb: { width: '100%', height: '80px', position: 'relative' as 'relative', borderRadius: '0.5rem', overflow: 'hidden', cursor: 'pointer', border: '1px solid #e2e8f0' },
        infoSection: {},
        badge: { display: 'inline-block', padding: '0.25rem 0.75rem', background: '#dbeafe', color: '#2563eb', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600', marginBottom: '1rem' },
        title: { fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem', lineHeight: '1.2' },
        price: { fontSize: '1.875rem', fontWeight: '700', color: '#2563eb', marginBottom: '1.5rem' },
        descTitle: { fontSize: '1.125rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem', marginTop: '2rem' },
        list: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' as 'column', gap: '0.75rem' },
        listItem: { display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#475569', lineHeight: '1.6' },
        longDesc: { color: '#475569', lineHeight: '1.7', whiteSpace: 'pre-line' as 'pre-line' },
        actionSection: { marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '1rem', flexWrap: 'wrap' as 'wrap' },
        whatsappBtn: { display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: '#25D366', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.75rem', fontWeight: '600', textDecoration: 'none', fontSize: '1.125rem', transition: 'transform 0.2s' },
    };

    return (
        <>
            <Navbar />
            <main style={styles.main}>
                <div style={styles.container}>
                    <div style={styles.breadcrumb}>
                        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
                        <span>/</span>
                        <Link href="/#products" style={{ textDecoration: 'none', color: 'inherit' }}>Products</Link>
                        <span>/</span>
                        <span style={{ color: '#0f172a', fontWeight: '500' }}>{product.name}</span>
                    </div>

                    <div style={{ ...styles.grid, gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)' }}>
                        {/* Images */}
                        <div style={styles.imageSection}>
                            <div style={styles.mainImage}>
                                <Image
                                    src={galleryImages[0]}
                                    alt={product.name}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    priority
                                />
                            </div>
                            {galleryImages.length > 1 && (
                                <div style={styles.galleryGrid}>
                                    {galleryImages.map((img: any, idx: number) => (
                                        <div key={idx} style={styles.thumb}>
                                            <Image
                                                src={img}
                                                alt={`${product.name} view ${idx + 1}`}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div style={styles.infoSection}>
                            <div style={styles.badge}>{product.brandProduct.name}</div>
                            <h1 style={styles.title}>{product.name}</h1>
                            <div style={styles.price}>{product.price}</div>

                            {shortDesc.length > 0 && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <ul style={styles.list}>
                                        {shortDesc.map((point: any, i: number) => (
                                            <li key={i} style={styles.listItem}>
                                                <FaCheck color="#2563eb" size={16} style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div>
                                <h3 style={styles.descTitle}>Description</h3>
                                <div style={styles.longDesc}>{product.longDescription}</div>
                            </div>

                            <div style={styles.actionSection}>
                                <a
                                    href={`https://wa.me/${product.whatsapp?.replace(/\D/g, '') || ''}?text=Hi, I am interested in ${product.name} (${product.brandProduct.name})`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={styles.whatsappBtn}
                                >
                                    <FaWhatsapp size={24} />
                                    Order Now on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
