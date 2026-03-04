'use client';

import { useState } from 'react';
import { updatePage } from '@/lib/actions';

type Section = {
    id: string;
    type: string;
    order: number;
    content: any;
};

type PageWithSections = {
    id: string;
    title: string;
    slug: string;
    published: boolean;
    sections: Section[];
};

export default function PageEditor({ page }: { page: PageWithSections }) {
    const [sections, setSections] = useState<Section[]>(() => {
        return page.sections.map(s => {
            try {
                return {
                    ...s,
                    content: typeof s.content === 'string' ? JSON.parse(s.content) : s.content
                };
            } catch (e) {
                console.error('Failed to parse section content', s);
                return { ...s, content: {} };
            }
        });
    });
    const [isPublished, setIsPublished] = useState(page.published);
    const updatePageWithId = updatePage.bind(null, page.id);

    const addSection = (type: string) => {
        const defaults: Record<string, any> = {
            HERO: { headline: 'Empower Your Business', subheadline: '🚀 Digital Innovation', description: 'Transform your business with cutting-edge software solutions.', ctaText: 'Get Started', ctaLink: '/contact' },
            TEXT: { title: 'About Us', body: 'We are a leading software company delivering innovative solutions.' },
            FEATURES: {
                title: 'Why Choose Us', items: [
                    { icon: '⚡', title: 'Fast Performance', description: 'Lightning-fast applications optimized for speed.' },
                    { icon: '🔒', title: 'Secure & Reliable', description: 'Enterprise-grade security for your data.' },
                    { icon: '🎨', title: 'Beautiful Design', description: 'Modern, intuitive interfaces users love.' }
                ]
            },
            PRODUCT_SPOTLIGHT: { title: 'Our Flagship Product', tagline: 'Innovation at Scale', description: 'Comprehensive solution for modern businesses.', ctaText: 'Learn More', ctaLink: '/products', features: ['Cloud-based platform', '24/7 Support', 'Real-time analytics'] },
            SERVICE_GRID: {
                title: 'Our Services', items: [
                    { title: 'Web Development', description: 'Custom web applications built with modern technologies.' },
                    { title: 'Mobile Apps', description: 'Native and cross-platform mobile solutions.' },
                    { title: 'Cloud Solutions', description: 'Scalable cloud infrastructure and services.' }
                ]
            },
            LOGO_WALL: { title: 'Trusted By', items: [] },
            STATS: {
                title: 'Our Achievements', items: [
                    { value: '150+', label: 'Projects Completed', icon: '📊' },
                    { value: '50+', label: 'Happy Clients', icon: '😊' },
                    { value: '10+', label: 'Years Experience', icon: '🏆' },
                    { value: '99%', label: 'Client Satisfaction', icon: '⭐' }
                ]
            },
            TESTIMONIALS: {
                title: 'What Our Clients Say', items: [
                    { quote: 'Excellent service and amazing results!', author: 'John Doe', company: 'Tech Corp', image: '' }
                ]
            },
            CTA_BANNER: { headline: 'Ready to Transform Your Business?', description: 'Let us help you achieve your digital goals.', ctaText: 'Contact Us', ctaLink: '/contact' }
        };
        const newSection: Section = {
            id: `new-${Date.now()}`,
            type,
            order: sections.length,
            content: defaults[type] || {},
        };
        setSections([...sections, newSection]);
    };

    const removeSection = (index: number) => {
        const updated = sections.filter((_, i) => i !== index);
        updated.forEach((s, i) => s.order = i);
        setSections(updated);
    };

    const moveSection = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === sections.length - 1) return;
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        const updated = [...sections];
        [updated[index], updated[swapIndex]] = [updated[swapIndex], updated[index]];
        updated.forEach((s, i) => s.order = i);
        setSections(updated);
    };

    const updateContent = (index: number, field: string, value: any) => {
        const updated = [...sections];
        updated[index].content = { ...updated[index].content, [field]: value };
        setSections(updated);
    };

    const updateArrayItem = (sectionIndex: number, itemIndex: number, field: string, value: any) => {
        const updated = [...sections];
        const items = [...(updated[sectionIndex].content.items || [])];
        items[itemIndex] = { ...items[itemIndex], [field]: value };
        updated[sectionIndex].content = { ...updated[sectionIndex].content, items };
        setSections(updated);
    };

    const addArrayItem = (sectionIndex: number, defaultItem: any) => {
        const updated = [...sections];
        const items = [...(updated[sectionIndex].content.items || []), defaultItem];
        updated[sectionIndex].content = { ...updated[sectionIndex].content, items };
        setSections(updated);
    };

    const removeArrayItem = (sectionIndex: number, itemIndex: number) => {
        const updated = [...sections];
        const items = (updated[sectionIndex].content.items || []).filter((_: any, i: number) => i !== itemIndex);
        updated[sectionIndex].content = { ...updated[sectionIndex].content, items };
        setSections(updated);
    };

    const renderSectionEditor = (section: Section, index: number) => {
        const content = section.content || {};
        switch (section.type) {
            case 'HERO':
                return (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Headline</label>
                            <input type="text" value={content.headline || ''} onChange={(e) => updateContent(index, 'headline', e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Subheadline</label>
                            <input type="text" value={content.subheadline || ''} onChange={(e) => updateContent(index, 'subheadline', e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Description</label>
                            <textarea value={content.description || ''} onChange={(e) => updateContent(index, 'description', e.target.value)} style={{ ...inputStyle, minHeight: '80px' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={labelStyle}>CTA Text</label>
                                <input type="text" value={content.ctaText || ''} onChange={(e) => updateContent(index, 'ctaText', e.target.value)} style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>CTA Link</label>
                                <input type="text" value={content.ctaLink || ''} onChange={(e) => updateContent(index, 'ctaLink', e.target.value)} style={inputStyle} />
                            </div>
                        </div>
                    </div>
                );
            case 'TEXT':
                return (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Title</label>
                            <input type="text" value={content.title || ''} onChange={(e) => updateContent(index, 'title', e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Body</label>
                            <textarea value={content.body || ''} onChange={(e) => updateContent(index, 'body', e.target.value)} style={{ ...inputStyle, minHeight: '120px' }} />
                        </div>
                    </div>
                );
            case 'FEATURES':
                return (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Section Title</label>
                            <input type="text" value={content.title || ''} onChange={(e) => updateContent(index, 'title', e.target.value)} style={inputStyle} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label style={{ ...labelStyle, marginBottom: 0 }}>Features ({(content.items || []).length})</label>
                            <button type="button" onClick={() => addArrayItem(index, { icon: '✨', title: 'New Feature', description: 'Feature description' })} style={addBtnStyle}>+ Add Feature</button>
                        </div>
                        {(content.items || []).map((item: any, i: number) => (
                            <div key={i} style={itemCardStyle}>
                                <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={labelStyle}>Icon</label>
                                        <input type="text" value={item.icon || ''} onChange={(e) => updateArrayItem(index, i, 'icon', e.target.value)} style={inputStyle} placeholder="⚡" />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Title</label>
                                        <input type="text" value={item.title || ''} onChange={(e) => updateArrayItem(index, i, 'title', e.target.value)} style={inputStyle} />
                                    </div>
                                </div>
                                <div>
                                    <label style={labelStyle}>Description</label>
                                    <textarea value={item.description || ''} onChange={(e) => updateArrayItem(index, i, 'description', e.target.value)} style={{ ...inputStyle, minHeight: '60px' }} />
                                </div>
                                <button type="button" onClick={() => removeArrayItem(index, i)} style={removeBtnStyle}>Remove</button>
                            </div>
                        ))}
                    </div>
                );
            case 'SERVICE_GRID':
                return (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Section Title</label>
                            <input type="text" value={content.title || ''} onChange={(e) => updateContent(index, 'title', e.target.value)} style={inputStyle} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label style={{ ...labelStyle, marginBottom: 0 }}>Services ({(content.items || []).length})</label>
                            <button type="button" onClick={() => addArrayItem(index, { title: 'New Service', description: 'Service description' })} style={addBtnStyle}>+ Add Service</button>
                        </div>
                        {(content.items || []).map((item: any, i: number) => (
                            <div key={i} style={itemCardStyle}>
                                <div>
                                    <label style={labelStyle}>Title</label>
                                    <input type="text" value={item.title || ''} onChange={(e) => updateArrayItem(index, i, 'title', e.target.value)} style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Description</label>
                                    <textarea value={item.description || ''} onChange={(e) => updateArrayItem(index, i, 'description', e.target.value)} style={{ ...inputStyle, minHeight: '60px' }} />
                                </div>
                                <button type="button" onClick={() => removeArrayItem(index, i)} style={removeBtnStyle}>Remove</button>
                            </div>
                        ))}
                    </div>
                );
            case 'STATS':
                return (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Section Title</label>
                            <input type="text" value={content.title || ''} onChange={(e) => updateContent(index, 'title', e.target.value)} style={inputStyle} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label style={{ ...labelStyle, marginBottom: 0 }}>Stats ({(content.items || []).length})</label>
                            <button type="button" onClick={() => addArrayItem(index, { value: '100+', label: 'New Stat', icon: '📈' })} style={addBtnStyle}>+ Add Stat</button>
                        </div>
                        {(content.items || []).map((item: any, i: number) => (
                            <div key={i} style={itemCardStyle}>
                                <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={labelStyle}>Icon</label>
                                        <input type="text" value={item.icon || ''} onChange={(e) => updateArrayItem(index, i, 'icon', e.target.value)} style={inputStyle} placeholder="📊" />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Value</label>
                                        <input type="text" value={item.value || ''} onChange={(e) => updateArrayItem(index, i, 'value', e.target.value)} style={inputStyle} placeholder="150+" />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Label</label>
                                        <input type="text" value={item.label || ''} onChange={(e) => updateArrayItem(index, i, 'label', e.target.value)} style={inputStyle} />
                                    </div>
                                </div>
                                <button type="button" onClick={() => removeArrayItem(index, i)} style={removeBtnStyle}>Remove</button>
                            </div>
                        ))}
                    </div>
                );
            case 'TESTIMONIALS':
                return (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Section Title</label>
                            <input type="text" value={content.title || ''} onChange={(e) => updateContent(index, 'title', e.target.value)} style={inputStyle} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label style={{ ...labelStyle, marginBottom: 0 }}>Testimonials ({(content.items || []).length})</label>
                            <button type="button" onClick={() => addArrayItem(index, { quote: 'Great service!', author: 'Customer Name', company: 'Company', image: '' })} style={addBtnStyle}>+ Add Testimonial</button>
                        </div>
                        {(content.items || []).map((item: any, i: number) => (
                            <div key={i} style={itemCardStyle}>
                                <div>
                                    <label style={labelStyle}>Quote</label>
                                    <textarea value={item.quote || ''} onChange={(e) => updateArrayItem(index, i, 'quote', e.target.value)} style={{ ...inputStyle, minHeight: '80px' }} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={labelStyle}>Author Name</label>
                                        <input type="text" value={item.author || ''} onChange={(e) => updateArrayItem(index, i, 'author', e.target.value)} style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Company</label>
                                        <input type="text" value={item.company || ''} onChange={(e) => updateArrayItem(index, i, 'company', e.target.value)} style={inputStyle} />
                                    </div>
                                </div>
                                <div>
                                    <label style={labelStyle}>Author Image URL</label>
                                    <input type="text" value={item.image || ''} onChange={(e) => updateArrayItem(index, i, 'image', e.target.value)} style={inputStyle} placeholder="/images/avatar.png" />
                                </div>
                                <button type="button" onClick={() => removeArrayItem(index, i)} style={removeBtnStyle}>Remove</button>
                            </div>
                        ))}
                    </div>
                );
            case 'CTA_BANNER':
                return (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Headline</label>
                            <input type="text" value={content.headline || ''} onChange={(e) => updateContent(index, 'headline', e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Description</label>
                            <textarea value={content.description || ''} onChange={(e) => updateContent(index, 'description', e.target.value)} style={{ ...inputStyle, minHeight: '60px' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={labelStyle}>CTA Text</label>
                                <input type="text" value={content.ctaText || ''} onChange={(e) => updateContent(index, 'ctaText', e.target.value)} style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>CTA Link</label>
                                <input type="text" value={content.ctaLink || ''} onChange={(e) => updateContent(index, 'ctaLink', e.target.value)} style={inputStyle} />
                            </div>
                        </div>
                    </div>
                );
            case 'LOGO_WALL':
                return (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Section Title</label>
                            <input type="text" value={content.title || ''} onChange={(e) => updateContent(index, 'title', e.target.value)} style={inputStyle} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label style={{ ...labelStyle, marginBottom: 0 }}>Logos ({(content.items || []).length})</label>
                            <button type="button" onClick={() => addArrayItem(index, { image: '', alt: 'Partner', link: '#' })} style={addBtnStyle}>+ Add Logo</button>
                        </div>
                        {(content.items || []).map((item: any, i: number) => (
                            <div key={i} style={itemCardStyle}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={labelStyle}>Image URL</label>
                                        <input type="text" value={item.image || ''} onChange={(e) => updateArrayItem(index, i, 'image', e.target.value)} style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Alt Text</label>
                                        <input type="text" value={item.alt || ''} onChange={(e) => updateArrayItem(index, i, 'alt', e.target.value)} style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Link</label>
                                        <input type="text" value={item.link || ''} onChange={(e) => updateArrayItem(index, i, 'link', e.target.value)} style={inputStyle} />
                                    </div>
                                </div>
                                <button type="button" onClick={() => removeArrayItem(index, i)} style={removeBtnStyle}>Remove</button>
                            </div>
                        ))}
                    </div>
                );
            case 'PRODUCT_SPOTLIGHT':
                return (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Title</label>
                            <input type="text" value={content.title || ''} onChange={(e) => updateContent(index, 'title', e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Tagline</label>
                            <input type="text" value={content.tagline || ''} onChange={(e) => updateContent(index, 'tagline', e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Description</label>
                            <textarea value={content.description || ''} onChange={(e) => updateContent(index, 'description', e.target.value)} style={{ ...inputStyle, minHeight: '100px' }} />
                        </div>
                        <div>
                            <label style={labelStyle}>Product Image URL</label>
                            <input type="text" value={content.image || ''} onChange={(e) => updateContent(index, 'image', e.target.value)} style={inputStyle} placeholder="/images/product.png" />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={labelStyle}>CTA Text</label>
                                <input type="text" value={content.ctaText || ''} onChange={(e) => updateContent(index, 'ctaText', e.target.value)} style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>CTA Link</label>
                                <input type="text" value={content.ctaLink || ''} onChange={(e) => updateContent(index, 'ctaLink', e.target.value)} style={inputStyle} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label style={{ ...labelStyle, marginBottom: 0 }}>Features ({(content.features || []).length})</label>
                            <button type="button" onClick={() => {
                                const updated = [...sections];
                                const features = [...(content.features || []), 'New Feature'];
                                updated[index].content = { ...content, features };
                                setSections(updated);
                            }} style={addBtnStyle}>+ Add Feature</button>
                        </div>
                        {(content.features || []).map((feature: string, i: number) => (
                            <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => {
                                        const updated = [...sections];
                                        const features = [...(content.features || [])];
                                        features[i] = e.target.value;
                                        updated[index].content = { ...content, features };
                                        setSections(updated);
                                    }}
                                    style={{ ...inputStyle, flex: 1 }}
                                />
                                <button type="button" onClick={() => {
                                    const updated = [...sections];
                                    const features = (content.features || []).filter((_: any, idx: number) => idx !== i);
                                    updated[index].content = { ...content, features };
                                    setSections(updated);
                                }} style={{ ...removeBtnStyle, padding: '0.5rem 1rem' }}>×</button>
                            </div>
                        ))}
                    </div>
                );
            default:
                return <p>Unknown Section Type: {section.type}</p>;
        }
    };

    return (
        <form action={async () => {
            const formData = new FormData();
            formData.append('title', page.title);
            formData.append('slug', page.slug);
            if (isPublished) {
                formData.append('published', 'on');
            }
            formData.append('sectionsData', JSON.stringify(sections));
            await updatePageWithId(formData);
            alert('Page saved!');
        }} style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>Edit: {page.title}</h1>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            checked={isPublished}
                            onChange={(e) => setIsPublished(e.target.checked)}
                            id="published-toggle"
                            style={{ width: '1.25rem', height: '1.25rem' }}
                        />
                        <label htmlFor="published-toggle" style={{ fontWeight: 600, color: '#475569', cursor: 'pointer' }}>Published</label>
                    </div>
                    <a href={`/${page.slug === 'home' ? '' : page.slug}`} target="_blank" style={outlineBtnStyle}>View Page</a>
                    <button type="submit" style={btnStyle}>💾 Save Changes</button>
                </div>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', color: '#334155' }}>Page Sections</h2>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {
                        ['HERO', 'TEXT', 'FEATURES', 'STATS', 'PRODUCT_SPOTLIGHT', 'SERVICE_GRID', 'TESTIMONIALS', 'CTA_BANNER', 'LOGO_WALL'].map((t) => (
                            <button key={t} type="button" onClick={() => addSection(t)} style={sectionBtnStyle}>+ {t.replace(/_/g, ' ')}</button>
                        ))
                    }
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {sections.map((section, index) => (
                        <div key={section.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                            <div style={{ background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', padding: '1rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 'bold', color: '#7c3aed', fontSize: '0.9rem' }}>{section.type.replace(/_/g, ' ')}</span>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button type="button" onClick={() => moveSection(index, 'up')} style={moveBtnStyle} disabled={index === 0}>↑</button>
                                    <button type="button" onClick={() => moveSection(index, 'down')} style={moveBtnStyle} disabled={index === sections.length - 1}>↓</button>
                                    <button type="button" onClick={() => removeSection(index)} style={{ ...moveBtnStyle, background: '#fee2e2', color: '#dc2626' }}>🗑️</button>
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                {renderSectionEditor(section, index)}
                            </div>
                        </div>
                    ))}
                    {sections.length === 0 && <p style={{ textAlign: 'center', color: '#94a3b8', fontStyle: 'italic', padding: '3rem' }}>No sections yet. Add one above to get started!</p>}
                </div>
            </div>
        </form>
    );
}

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '0.95rem',
    transition: 'border-color 0.2s',
};

const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#475569',
};

const btnStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #7c3aed, #000000)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.95rem',
};

const outlineBtnStyle: React.CSSProperties = {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#64748b',
    border: '1px solid #e2e8f0',
    fontWeight: 500,
};

const sectionBtnStyle: React.CSSProperties = {
    background: '#f5f3ff',
    color: '#7c3aed',
    border: '1px solid #e9d5ff',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.85rem',
};

const moveBtnStyle: React.CSSProperties = {
    background: '#f1f5f9',
    color: '#475569',
    border: 'none',
    padding: '0.5rem 0.75rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 500,
};

const addBtnStyle: React.CSSProperties = {
    background: '#10b981',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.85rem',
};

const removeBtnStyle: React.CSSProperties = {
    background: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '0.85rem',
    marginTop: '0.5rem',
};

const itemCardStyle: React.CSSProperties = {
    background: '#fafafa',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1rem',
    display: 'grid',
    gap: '1rem',
};
