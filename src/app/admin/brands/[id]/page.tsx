import { prisma } from '@/lib/prisma';
import { addSubProduct, deleteSubProduct } from '@/lib/actions';
import Image from 'next/image';
import { FaTrash, FaPlus, FaImage, FaTag, FaAlignLeft, FaMoneyBill, FaWhatsapp, FaArrowLeft, FaList, FaEdit } from 'react-icons/fa';
import Link from 'next/link';

export default async function AdminSubProductsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const brand = await prisma.brandProduct.findUnique({
        where: { id },
        include: {
            subProducts: {
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    if (!brand) {
        return <div>Brand not found</div>;
    }

    // Inline styles for reliability
    const styles = {
        container: { maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif', color: '#0f172a' },
        header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
        h1: { fontSize: '1.875rem', fontWeight: '700', margin: 0 },
        p: { color: '#64748b', marginTop: '0.5rem' },
        badge: { background: '#eff6ff', color: '#1d4ed8', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: '500' },
        card: { background: 'white', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
        formLabel: { display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' },
        input: { width: '100%', padding: '0.625rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.5rem', outline: 'none', transition: 'border-color 0.15s' },
        textarea: { width: '100%', padding: '0.625rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.5rem', outline: 'none', transition: 'border-color 0.15s', minHeight: '100px', resize: 'vertical' as 'vertical' },
        button: { width: '100%', background: '#0f172a', color: 'white', fontWeight: '600', padding: '0.75rem', borderRadius: '0.75rem', marginTop: '1rem', cursor: 'pointer' },
        subProductCard: { background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '1rem', transition: 'all 0.2s', display: 'flex', flexDirection: 'column' as 'column', gap: '1rem' },
        imageContainer: {
            height: '150px', width: '100%', position: 'relative' as 'relative',
            background: '#f8fafc', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid #f1f5f9'
        },
        deleteBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2rem', height: '2rem', borderRadius: '0.5rem', color: '#94a3b8', background: 'transparent', cursor: 'pointer', border: 'none' },
        backLink: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.875rem', fontWeight: '500' }
    };

    return (
        <div style={styles.container}>
            <Link href="/admin/brands" style={styles.backLink}>
                <FaArrowLeft /> Back to Brands
            </Link>

            <div style={styles.header}>
                <div>
                    <h1 style={styles.h1}>{brand.name} - Sub Products</h1>
                    <p style={styles.p}>Manage sub-products for {brand.name}.</p>
                </div>
                <div style={styles.badge}>
                    Total: {brand.subProducts.length}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '2rem', alignItems: 'start' }}>
                {/* Add Sub Product Form */}
                <div style={{ ...styles.card, position: 'sticky', top: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <div style={{ width: '2.5rem', height: '2.5rem', background: '#dbeafe', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                            <FaPlus />
                        </div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Add Sub-Product</h2>
                    </div>

                    <form action={async (formData) => {
                        'use server';
                        await addSubProduct(formData);
                    }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <input type="hidden" name="brandProductId" value={brand.id} />

                        <div>
                            <label style={styles.formLabel}>Name</label>
                            <input type="text" name="name" required placeholder="e.g. Starter Plan" style={styles.input} />
                        </div>

                        <div>
                            <label style={styles.formLabel}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaImage color="#94a3b8" /> Image</span>
                            </label>
                            <input type="file" name="image" required accept="image/*" style={styles.input} />
                        </div>

                        <div>
                            <label style={styles.formLabel}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaList color="#94a3b8" /> Short Description (Bullet Points)</span>
                            </label>
                            <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>Enter points as a JSON array (e.g. ["Feature 1", "Feature 2"]) or just text.</p>
                            <textarea name="shortDescription" required placeholder='["Point 1", "Point 2"]' style={{ ...styles.textarea, minHeight: '80px' }} />
                        </div>


                        <div>
                            <label style={styles.formLabel}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaAlignLeft color="#94a3b8" /> Long Description</span>
                            </label>
                            <textarea name="longDescription" required placeholder="Detailed description..." style={styles.textarea} />
                        </div>

                        <div>
                            <label style={styles.formLabel}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaMoneyBill color="#94a3b8" /> Price (Monthly)</span>
                            </label>
                            <input type="text" name="price" required placeholder="e.g. $29/mo" style={styles.input} />
                        </div>

                        <div>
                            <label style={styles.formLabel}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaWhatsapp color="#94a3b8" /> WhatsApp Number (Optional)</span>
                            </label>
                            <input type="text" name="whatsapp" placeholder="e.g. 9477..." style={styles.input} />
                        </div>

                        <div>
                            <label style={styles.formLabel}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaImage color="#94a3b8" /> Gallery Images JSON (Optional)</span>
                            </label>
                            <textarea name="galleryImages" placeholder='["/url1.jpg", "/url2.jpg"]' style={{ ...styles.textarea, minHeight: '60px' }} />
                        </div>


                        <button type="submit" style={styles.button}>
                            Add Sub-Product
                        </button>
                    </form>
                </div>

                {/* List */}
                <div>
                    {brand.subProducts.length === 0 ? (
                        <div style={{ ...styles.card, textAlign: 'center', padding: '3rem' }}>
                            <div style={{ width: '4rem', height: '4rem', background: '#f8fafc', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', margin: '0 auto 1rem auto' }}>
                                <FaImage size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#0f172a' }}>No sub-products yet</h3>
                            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Add your first sub-product using the form.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {brand.subProducts.map((product: any) => (
                                <div key={product.id} style={styles.subProductCard}>
                                    <div style={styles.imageContainer}>
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0f172a', margin: '0.5rem 0' }}>{product.name}</h3>
                                        <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                            <strong>Price:</strong> {product.price}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {/* Attempt to show short desc safely */}
                                            {Array.isArray(product.shortDescription)
                                                ? (product.shortDescription as string[]).join(', ')
                                                : 'No description'}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', gap: '0.5rem' }}>
                                        <a href={`/admin/sub-products/${product.id}/edit`} style={styles.deleteBtn} title="Edit">
                                            <FaEdit size={14} color="#2563eb" />
                                        </a>
                                        <form action={async () => {
                                            'use server';
                                            await deleteSubProduct(product.id, brand.id);
                                        }}>
                                            <button type="submit" style={styles.deleteBtn} title="Delete">
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
