'use client';

import { useState } from 'react';
import { submitContactMessage } from '@/lib/actions';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';
import styles from '@/app/contact/contact.module.css'; // Reusing styles from page module if possible, or we might need to pass classNames

// Since styles are CSS modules in page.tsx, we can't easily import them here unless we move styles to a shared file or props.
// However, typically in Next.js CSS modules are scoped. 
// Let's assume we will pass classNames or duplicate the specific form styles in a new module if needed.
// Actually, looking at the existing structure, `contact.module.css` is in `src/app/contact/`.
// We can import it if we are allowed.
// But clean architecture suggests `ContactForm` might be better self-contained or use passed classes.
// For speed/simplicity given the request, let's try to use the existing module if it works or inline/tailwind for the form structure to match.
// Wait, I can import the module if I am in a component file.

// Let's create a new CSS module for this component to be safe and clean, cloning necessary styles from contact.module.css
// OR simpler: Component receives className? No, it replaces a specific known block.

import formStyles from '@/app/contact/contact.module.css';

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        // Basic client-side validation
        const newErrors: any = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));

        const result = await submitContactMessage(data);
        setLoading(false);

        if (result.success) {
            setSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSuccess(false), 5000);
        } else {
            if (result.errors) {
                setErrors(result.errors);
            } else {
                alert(result.error || 'Something went wrong');
            }
        }
    };

    return (
        <div className={formStyles.formCard}>
            <div className={formStyles.formHeader}>
                <h2 className={formStyles.formTitle}>Send us a Message</h2>
                <p className={formStyles.formSubtitle}>Fill out the form below and we'll get back to you shortly.</p>
            </div>

            {success ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--success)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Message Sent!</h3>
                    <p>Thank you for contacting us. We will get back to you shortly.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={formStyles.formGroup}>
                            <label className={formStyles.label} htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={formStyles.input}
                                placeholder="Your Name"
                            />
                            {errors.name && <p style={{ color: 'var(--error)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.name}</p>}
                        </div>
                        <div className={formStyles.formGroup}>
                            <label className={formStyles.label} htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={formStyles.input}
                                placeholder="your@email.com"
                            />
                            {errors.email && <p style={{ color: 'var(--error)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.email}</p>}
                        </div>
                    </div>
                    <div className={formStyles.formGroup}>
                        <label className={formStyles.label} htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className={formStyles.input}
                            placeholder="Project Inquiry"
                        />
                        {errors.subject && <p style={{ color: 'var(--error)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.subject}</p>}
                    </div>
                    <div className={formStyles.formGroup}>
                        <label className={formStyles.label} htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className={formStyles.textarea}
                            placeholder="Tell us about your project..."
                        ></textarea>
                        {errors.message && <p style={{ color: 'var(--error)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.message}</p>}
                    </div>
                    <button type="submit" className={formStyles.submitBtn} disabled={loading}>
                        {loading ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><FaSpinner className="animate-spin" /> Sending...</span> : 'Send Message'}
                    </button>
                </form>
            )}
        </div>
    );
}
