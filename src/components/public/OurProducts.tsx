import Image from 'next/image';
// Trigger rebuild for CSS update
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import AnimatedSection from '../ui/AnimatedSection';
import LogoWall from './LogoWall';
import styles from './OurProducts.module.css';

interface PartnerLogo {
    id: string;
    name: string;
    image: string;
    link?: string | null;
}

interface SubProduct {
    id: string;
    name: string;
    image: string;
}

interface BrandProduct {
    id: string;
    name: string;
    description: string;
    image: string;
    link?: string | null;
    tag?: string | null;
    subProducts?: SubProduct[];
}

interface OurProductsProps {
    logos: PartnerLogo[];
    products: BrandProduct[];
    layout?: 'grid' | 'list';
    darkMode?: boolean;
}

export default function OurProducts({ logos, products = [], layout = 'grid', darkMode = false }: OurProductsProps) {
    // Map DB logos to LogoWall format
    const logoItems = logos.map(logo => ({
        image: logo.image,
        alt: logo.name,
        link: logo.link || undefined
    }));

    const isList = layout === 'list';

    return (
        <section className={`${styles.section} ${darkMode ? 'dark' : ''}`} id="products">
            <div className="container">
                <div className={styles.header}>
                    <AnimatedSection animation="fade-up">
                        <h2>Our Products</h2>
                        <p>Innovative solutions driving digital transformation.</p>
                    </AnimatedSection>
                </div>

                <div className={isList ? styles.productsList : styles.productsGrid}>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <AnimatedSection key={product.id} animation="fade-up" delay={index * 150}>
                                <div className={isList ? styles.premiumCard : styles.productCard}>
                                    {/* Layer 1: Background Image */}
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 80vw"
                                            className={styles.productImage}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>

                                    {/* Layer 2: Content Overlay */}
                                    <div className={styles.content}>
                                        {/* Tag from product.tag or default */}
                                        <div className={styles.tag}>
                                            {product.tag || 'Premium'}
                                        </div>

                                        <h3 className={styles.title}>{product.name}</h3>
                                        <p className={styles.description}>{product.description}</p>

                                        <div className={styles.btnGroup}>
                                            {product.link && (
                                                <Link href={product.link} className={styles.link}>
                                                    Explore Solution
                                                </Link>
                                            )}
                                            <Link href="/contact" className={styles.secondaryLink}>
                                                Contact Us
                                            </Link>
                                        </div>

                                        {product.subProducts && product.subProducts.length > 0 && (
                                            <div className={styles.subProductsContainer}>
                                                <div className={styles.subProductsTitle}>Includes:</div>
                                                <div className={styles.subProductsGrid}>
                                                    {product.subProducts.slice(0, 3).map((sub) => (
                                                        <Link
                                                            key={sub.id}
                                                            href={`/products/${sub.id}`}
                                                            className={styles.subProductCard}
                                                        >
                                                            {sub.image && (
                                                                <div className={styles.subProductImageWrapper}>
                                                                    <Image
                                                                        src={sub.image}
                                                                        alt={sub.name}
                                                                        fill
                                                                        sizes="48px"
                                                                        className={styles.productImage}
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className={styles.subProductContent}>
                                                                <span className={styles.subProductName}>{sub.name}</span>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                            <p>No products added yet. Visit Admin Panel to add products.</p>
                        </div>
                    )}
                </div>

                {/* Partner Logos */}
                <div className={styles.logoSection}>
                    <AnimatedSection animation="fade-up">
                        <h4 className={styles.logoHeader}>Trusted By Industry Leaders</h4>
                        {/* Reuse LogoWall but pass our dynamic items */}
                        <LogoWall items={logoItems} />
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
