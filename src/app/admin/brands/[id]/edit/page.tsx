
import { prisma } from '@/lib/prisma';
import { updateBrandProduct } from '@/lib/actions';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { FaTag, FaImage, FaAlignLeft, FaLink, FaArrowLeft } from 'react-icons/fa';

export default async function EditBrandPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const brand = await prisma.brandProduct.findUnique({
        where: { id }
    });

    if (!brand) {
        notFound();
    }

    const styles = {
        container: { maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', color: '#0f172a', padding: '2rem' },
        header: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' },
        h1: { fontSize: '1.875rem', fontWeight: '700', margin: 0 },
        card: { background: 'white', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
        formLabel: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' },
        input: { width: '100%', padding: '0.625rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.5rem', outline: 'none', transition: 'border-color 0.15s' },
        textarea: { width: '100%', padding: '0.625rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.5rem', outline: 'none', transition: 'border-color 0.15s', minHeight: '150px', resize: 'vertical' as 'vertical' },
        button: { width: '100%', background: '#0f172a', color: 'white', fontWeight: '600', padding: '0.75rem', borderRadius: '0.75rem', marginTop: '1rem', cursor: 'pointer', border: 'none' },
        currentImage: { marginTop: '0.5rem', fontSize: '0.875rem', color: '#64748b' },
        cancelBtn: { display: 'inline-block', textAlign: 'center' as 'center', width: '100%', padding: '0.75rem', marginTop: '0.5rem', color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }
    };

    const updateAction = async (formData: FormData) => {
        'use server';
        await updateBrandProduct(brand.id, formData);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <Link href="/admin/brands" style={{ color: '#64748b' }}>
                    <FaArrowLeft size={20} />
                </Link>
                <h1 style={styles.h1}>Edit Brand Product</h1>
            </div>

            <div style={styles.card}>
                <form action={updateAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div>
                        <label style={styles.formLabel}>Product Name</label>
                        <input type="text" name="name" required defaultValue={brand.name} style={styles.input} />
                    </div>

                    <div>
                        <label style={styles.formLabel}>
                            <FaTag color="#94a3b8" /> Tag / Category
                        </label>
                        <input type="text" name="tag" defaultValue={brand.tag || ''} style={styles.input} />
                    </div>

                    <div>
                        <label style={styles.formLabel}>
                            <FaImage color="#94a3b8" /> Product Image
                        </label>
                        <input type="file" name="image" accept="image/*" style={styles.input} />
                        <input type="hidden" name="currentImage" value={brand.image} />
                        <div style={styles.currentImage}>
                            Current: <a href={brand.image} target="_blank" style={{ color: '#2563eb' }}>View Image</a>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                            Leave empty to keep the current image.
                        </p>
                    </div>

                    <div>
                        <label style={styles.formLabel}>
                            <FaAlignLeft color="#94a3b8" /> Description
                        </label>
                        <textarea name="description" required defaultValue={brand.description} style={styles.textarea} />
                    </div>

                    <div>
                        <label style={styles.formLabel}>
                            <FaLink color="#94a3b8" /> Website Link (Optional)
                        </label>
                        <input type="url" name="link" defaultValue={brand.link || ''} style={styles.input} />
                    </div>

                    <div>
                        <button type="submit" style={styles.button}>
                            Update Product
                        </button>
                        <Link href="/admin/brands" style={styles.cancelBtn}>
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
