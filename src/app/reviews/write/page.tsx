
import { submitReview } from '@/lib/actions';
import { FaStar, FaUser, FaBriefcase, FaComment, FaImage, FaCheckCircle } from 'react-icons/fa';

export default function WriteReviewPage() {

    // Inline styles for a premium look
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            fontFamily: "'Inter', sans-serif",
        },
        card: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            padding: '3rem',
            width: '100%',
            maxWidth: '600px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
        },
        header: {
            textAlign: 'center' as 'center',
            marginBottom: '2.5rem',
        },
        title: {
            fontSize: '2rem',
            fontWeight: '800',
            color: '#0f172a',
            marginBottom: '0.5rem',
            background: 'linear-gradient(to right, #2563eb, #4f46e5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        },
        subtitle: {
            color: '#64748b',
            fontSize: '1rem',
        },
        formGroup: {
            marginBottom: '1.5rem',
        },
        label: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#334155',
            marginBottom: '0.5rem',
        },
        input: {
            width: '100%',
            padding: '0.875rem 1rem',
            borderRadius: '0.75rem',
            border: '1px solid #e2e8f0',
            background: 'white',
            outline: 'none',
            transition: 'all 0.2s',
            fontSize: '1rem',
        },
        textarea: {
            width: '100%',
            padding: '0.875rem 1rem',
            borderRadius: '0.75rem',
            border: '1px solid #e2e8f0',
            background: 'white',
            outline: 'none',
            transition: 'all 0.2s',
            fontSize: '1rem',
            minHeight: '120px',
            resize: 'vertical' as 'vertical',
        },
        ratingContainer: {
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '0.5rem',
        },
        starLabel: {
            cursor: 'pointer',
            fontSize: '2rem',
            color: '#cbd5e1',
            transition: 'color 0.2s',
        },
        fileInputWrapper: {
            position: 'relative' as 'relative',
            background: '#f1f5f9',
            borderRadius: '0.75rem',
            padding: '1rem',
            textAlign: 'center' as 'center',
            border: '2px dashed #cbd5e1',
            cursor: 'pointer',
            transition: 'all 0.2s',
        },
        button: {
            width: '100%',
            padding: '1rem',
            background: 'linear-gradient(to right, #2563eb, #4f46e5)',
            color: 'white',
            border: 'none',
            borderRadius: '0.75rem',
            fontSize: '1.125rem',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'transform 0.1s, box-shadow 0.2s',
            boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Share Your Experience</h1>
                    <p style={styles.subtitle}>We value your feedback! Please rate our service.</p>
                </div>

                <form action={async (formData) => {
                    'use server';
                    await submitReview(formData);
                }}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}><FaUser color="#6366f1" /> Full Name</label>
                        <input type="text" name="name" required placeholder="John Doe" style={styles.input} />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}><FaBriefcase color="#6366f1" /> Designation / Company (Optional)</label>
                        <input type="text" name="designation" placeholder="CEO at TechCorp" style={styles.input} />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}><FaStar color="#fbbf24" /> Rating</label>
                        <div className="rating-selector" style={styles.ratingContainer}>
                            {/* Simple CSS-only star rating logic or we rely on User selecting number */}
                            {/* For simplicity and reliability in server component without heavy client JS */}
                            <select name="rating" required style={styles.input}>
                                <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
                                <option value="4">⭐⭐⭐⭐ (Good)</option>
                                <option value="3">⭐⭐⭐ (Average)</option>
                                <option value="2">⭐⭐ (Poor)</option>
                                <option value="1">⭐ (Terrible)</option>
                            </select>
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}><FaComment color="#6366f1" /> Your Review</label>
                        <textarea name="comment" required placeholder="Tell us what you liked..." style={styles.textarea} />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}><FaImage color="#6366f1" /> Profile Picture (Optional)</label>
                        <div style={styles.fileInputWrapper}>
                            <input type="file" name="image" accept="image/*" style={{ width: '100%' }} />
                            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>Upload a photo to display with your review</p>
                        </div>
                    </div>

                    <button type="submit" style={styles.button}>
                        Submit Review
                    </button>

                    <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', color: '#94a3b8' }}>
                        Your review will be posted after moderation.
                    </p>
                </form>
            </div>
        </div>
    );
}
