import { prisma } from '@/lib/prisma';
import { addBrandProduct, deleteBrandProduct } from '@/lib/actions';
import Image from 'next/image';
import { FaTrash, FaPlus, FaLink, FaImage, FaTag, FaAlignLeft, FaArrowRight, FaEdit } from 'react-icons/fa';

export default async function AdminBrandsPage() {
    const brands = await prisma.brandProduct.findMany({
        orderBy: { createdAt: 'desc' }
    });

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
        brandCard: { background: 'white', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '1rem', transition: 'all 0.2s', display: 'flex', flexDirection: 'column' as 'column', gap: '1rem' },
        imageContainer: {
            height: '200px', width: '100%', position: 'relative' as 'relative',
            background: '#f8fafc', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid #f1f5f9'
        },
        deleteBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2rem', height: '2rem', borderRadius: '0.5rem', color: '#94a3b8', background: 'transparent', cursor: 'pointer', border: 'none' }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.h1}>Our Brands</h1>
                    <p style={styles.p}>Manage the products displayed in the &quot;Our Products&quot; section.</p>
                </div>
                <div style={styles.badge}>
                    Total Products: {brands.length}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem', alignItems: 'start' }}>
                {/* Add Brand Form */}
                <div style={{ ...styles.card, position: 'sticky', top: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <div style={{ width: '2.5rem', height: '2.5rem', background: '#dbeafe', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                            <FaPlus />
                        </div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Add New Product</h2>
                    </div>

                    <form action={async (formData) => {
                        'use server';
                        await addBrandProduct(formData);
                    }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label style={styles.formLabel}>Product Name</label>
                            <input type="text" name="name" required placeholder="e.g. Clazz.lk" style={styles.input} />
                        </div>

                        <div>
                            <label style={styles.formLabel}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaTag color="#94a3b8" /> Tag / Category</span>
                            </label>
                            <input type="text" name="tag" placeholder="e.g. EdTech Platform" style={styles.input} />
                        </div>

                        <div>
                            <label style={styles.formLabel}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaImage color="#94a3b8" /> Product Image</span>
                            </label>
                            <input type="file" name="image" required accept="image/*" style={styles.input} />
                            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
                                Upload an image (max 8MB).
                            </p>
                        </div>

                        <div>
                            <label style={styles.formLabel}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaAlignLeft color="#94a3b8" /> Description</span>
                            </label>
                            <textarea name="description" required placeholder="Brief description of the product..." style={styles.textarea} />
                        </div>

                        <div>
                            <label style={styles.formLabel}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaLink color="#94a3b8" /> Website Link (Optional)</span>
                            </label>
                            <input type="url" name="link" placeholder="https://example.com" style={styles.input} />
                        </div>

                        <button type="submit" style={styles.button}>
                            Add Product
                        </button>
                    </form>
                </div>

                {/* Brand List */}
                <div>
                    {brands.length === 0 ? (
                        <div style={{ ...styles.card, textAlign: 'center', padding: '3rem' }}>
                            <div style={{ width: '4rem', height: '4rem', background: '#f8fafc', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', margin: '0 auto 1rem auto' }}>
                                <FaImage size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#0f172a' }}>No products yet</h3>
                            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Add your first product using the form on the left.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {brands.map((brand: any) => (
                                <div key={brand.id} style={styles.brandCard}>
                                    <div style={styles.imageContainer}>
                                        <Image
                                            src={brand.image}
                                            alt={brand.name}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        {brand.tag && (
                                            <span style={{ fontSize: '0.75rem', color: '#2563eb', background: '#eff6ff', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontWeight: '600', marginBottom: '0.5rem', display: 'inline-block' }}>
                                                {brand.tag}
                                            </span>
                                        )}
                                        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0f172a', margin: '0.5rem 0' }}>{brand.name}</h3>
                                        <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {brand.description}
                                        </p>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                                        {brand.link ? (
                                            <a href={brand.link} target="_blank" style={{ fontSize: '0.875rem', color: '#0f172a', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                                                Visit Site <FaLink size={12} color="#94a3b8" />
                                            </a>
                                        ) : (
                                            <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>No link</span>
                                        )}

                                        <a href={`/admin/brands/${brand.id}`} style={{ fontSize: '0.875rem', color: '#2563eb', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                                            Manage Sub-Products <FaArrowRight size={12} />
                                        </a>

                                        <a href={`/admin/brands/${brand.id}/edit`} style={styles.deleteBtn} title="Edit Product">
                                            <FaEdit size={14} color="#2563eb" />
                                        </a>

                                        <form action={async () => {
                                            'use server';
                                            await deleteBrandProduct(brand.id);
                                        }}>
                                            <button type="submit" style={styles.deleteBtn} title="Delete Product">
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
