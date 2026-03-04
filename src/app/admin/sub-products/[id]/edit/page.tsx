
import { prisma } from '@/lib/prisma';
import { updateSubProduct } from '@/lib/actions';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaImage, FaAlignLeft, FaMoneyBill, FaWhatsapp, FaArrowLeft, FaList, FaTag } from 'react-icons/fa';

export default async function EditSubProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await prisma.subProduct.findUnique({
        where: { id },
        include: { brandProduct: true }
    });

    if (!product) {
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
        await updateSubProduct(product.id, product.brandProductId, formData);
    };

    // Prepare JSON strings for default values
    const shortDescStr = product.shortDescription ? JSON.stringify(product.shortDescription) : '';
    const galleryStr = product.galleryImages ? JSON.stringify(product.galleryImages) : '';

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <Link href={`/admin/brands/${product.brandProductId}`} style={{ color: '#64748b' }}>
                    <FaArrowLeft size={20} />
                </Link>
                <h1 style={styles.h1}>Edit Sub-Product</h1>
            </div>

            <div style={styles.card}>
                <form action={updateAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div>
                        <label style={styles.formLabel}>Name</label>
                        <input type="text" name="name" required defaultValue={product.name} style={styles.input} />
                    </div>

                    <div>
                        <label style={styles.formLabel}>
                            <FaImage color="#94a3b8" /> Image
                        </label>
                        <input type="file" name="image" accept="image/*" style={styles.input} />
                        <input type="hidden" name="currentImage" value={product.image} />
                        <div style={styles.currentImage}>
                            Current: <a href={product.image} target="_blank" style={{ color: '#2563eb' }}>View Image</a>
                        </div>
                    </div>

                    <div>
                        <label style={styles.formLabel}>
                            <FaList color="#94a3b8" /> Short Description (Bullet Points)
                        </label>
                        <textarea name="shortDescription" required defaultValue={shortDescStr} placeholder='["Point 1", "Point 2"]' style={{ ...styles.textarea, minHeight: '80px' }} />
                    </div>

                    <div>
                        <label style={styles.formLabel}>
                            <FaAlignLeft color="#94a3b8" /> Long Description
                        </label>
                        <textarea name="longDescription" required defaultValue={product.longDescription} style={styles.textarea} />
                    </div>

                    <div>
                        <label style={styles.formLabel}>
                            <FaMoneyBill color="#94a3b8" /> Price (Monthly)
                        </label>
                        <input type="text" name="price" required defaultValue={product.price} style={styles.input} />
                    </div>

                    <div>
                        <label style={styles.formLabel}>
                            <FaWhatsapp color="#94a3b8" /> WhatsApp Number (Optional)
                        </label>
                        <input type="text" name="whatsapp" defaultValue={product.whatsapp || ''} style={styles.input} />
                    </div>

                    <div>
                        <label style={styles.formLabel}>
                            <FaImage color="#94a3b8" /> Gallery Images JSON (Optional)
                        </label>
                        <textarea name="galleryImages" defaultValue={galleryStr} placeholder='["/url1.jpg", "/url2.jpg"]' style={{ ...styles.textarea, minHeight: '60px' }} />
                    </div>

                    <div>
                        <button type="submit" style={styles.button}>
                            Update Sub-Product
                        </button>
                        <Link href={`/admin/brands/${product.brandProductId}`} style={styles.cancelBtn}>
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
