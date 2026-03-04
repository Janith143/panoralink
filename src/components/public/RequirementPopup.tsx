'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { submitInquiry } from '@/lib/actions';
import { FaTimes, FaCheck, FaArrowRight, FaLightbulb, FaRocket, FaShieldAlt, FaMagic } from 'react-icons/fa';
import styles from './RequirementPopup.module.css';

export default function RequirementPopup() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);
    const [showFloatingButton, setShowFloatingButton] = useState(false);
    const [step, setStep] = useState(0); // 0: Requirement, 1: Contact, 2: Success
    const [formData, setFormData] = useState({
        requirement: '',
        name: '',
        mobile: '',
        email: '',
        struggles: [] as string[]
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Only auto-show regarding popup on homepage
        if (pathname === '/') {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowFloatingButton(true);
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    setShowFloatingButton(false);
                }, 2000);
            } else {
                setShowFloatingButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleNext = () => {
        if (!formData.requirement.trim()) {
            setErrors({ requirement: 'Please describe your requirement.' });
            return;
        }
        setStep(1);
    };

    const handleSubmit = async () => {
        const newErrors: any = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.mobile.trim()) newErrors.mobile = 'Mobile is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'struggles' && Array.isArray(value)) {
                data.append(key, JSON.stringify(value));
            } else {
                data.append(key, value as string);
            }
        });

        const result = await submitInquiry(data);
        setLoading(false);

        if (result.success) {
            setStep(2);
            setTimeout(() => {
                setIsVisible(false);
                setStep(0);
            }, 6000);
        } else {
            alert(result.error || 'Something went wrong');
        }
    };

    if (!mounted || typeof document === 'undefined' || pathname.startsWith('/admin')) return null;

    const { createPortal } = require('react-dom');

    return createPortal(
        <>
            <AnimatePresence>
                {isVisible && (
                    <div className={styles.overlay}>
                        <div className={styles.modal}>
                            {/* Left Side - Visual */}
                            <div className={styles.visualSide}>
                                <div className={styles.visualContent}>
                                    <h2 className={styles.visualTitle}>
                                        Your Business needs something more than a Website...
                                    </h2>
                                    <p className={styles.visualText}>
                                        We analyse your requirement... <br />
                                        We design the right strategy...<br />
                                        We deliver a solution that moves your business forward...
                                    </p>
                                    <ul className={styles.featureList}>
                                        <li className={styles.featureItem}>
                                            <div className={styles.featureIcon}><FaLightbulb /></div>
                                            <span>Innovative Solutions</span>
                                        </li>
                                        <li className={styles.featureItem}>
                                            <div className={styles.featureIcon}><FaRocket /></div>
                                            <span>Rapid Development</span>
                                        </li>
                                        <li className={styles.featureItem}>
                                            <div className={styles.featureIcon}><FaShieldAlt /></div>
                                            <span>Engineered Scaling</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Right Side - Form */}
                            <div className={styles.formSide}>
                                {step < 2 && (
                                    <button
                                        onClick={() => setIsVisible(false)}
                                        className={styles.closeButton}
                                    >
                                        <FaTimes size={16} />
                                    </button>
                                )}

                                <AnimatePresence mode="wait">
                                    {step === 0 && (
                                        <motion.div
                                            key="step0"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className={styles.stepContainer}
                                        >
                                            <h3 className={styles.formTitle}>When the destination isn’t clear,<br></br> we design the journey and deliver the solution.</h3>
                                            <p className={styles.formSubtitle}>Briefly describe what you're looking to build.</p>

                                            <div className={styles.inputGroup}>
                                                <label className={styles.label}>Main Struggle?</label>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                                                    {['Sales', 'Systems', 'Staff', 'Cashflow', 'Marketing', 'Tech', 'Other'].map(struggle => (
                                                        <button
                                                            key={struggle}
                                                            onClick={() => {
                                                                const current = formData.struggles || [];
                                                                const updated = current.includes(struggle)
                                                                    ? current.filter(s => s !== struggle)
                                                                    : [...current, struggle];
                                                                setFormData({ ...formData, struggles: updated });
                                                            }}
                                                            className={`${styles.struggleChip} ${(formData.struggles || []).includes(struggle) ? styles.activeChip : ''}`}
                                                            type="button"
                                                        >
                                                            {struggle}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className={styles.inputGroup} style={{ marginTop: '1rem' }}>
                                                <label className={styles.label}>I'm looking for..</label>
                                                <div className={styles.inputWrapper}>
                                                    <textarea
                                                        name="requirement"
                                                        value={formData.requirement}
                                                        onChange={handleChange}
                                                        placeholder="e.g., I need a corporate website with a booking system..."
                                                        className={styles.textarea}
                                                    />
                                                </div>
                                                {errors.requirement && (
                                                    <div className={styles.error}>
                                                        <FaTimes size={12} /> {errors.requirement}
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                onClick={handleNext}
                                                className={styles.buttonNext}
                                            >
                                                Continue
                                                <FaArrowRight size={14} />
                                            </button>
                                        </motion.div>
                                    )}

                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className={styles.stepContainer}
                                        >
                                            <h3 className={styles.formTitle}>Contact Details</h3>
                                            <p className={styles.formSubtitle}>One of our specialists will contact you shortly.</p>

                                            <div className={styles.inputGroup}>
                                                <label className={styles.label}>Your Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="John Doe"
                                                    className={styles.input}
                                                />
                                                {errors.name && <div className={styles.error}><FaTimes size={12} /> {errors.name}</div>}
                                            </div>

                                            <div className={styles.inputGroup}>
                                                <label className={styles.label}>Mobile Number</label>
                                                <input
                                                    type="tel"
                                                    name="mobile"
                                                    value={formData.mobile}
                                                    onChange={handleChange}
                                                    placeholder="+94 77 123 4567"
                                                    className={styles.input}
                                                />
                                                {errors.mobile && <div className={styles.error}><FaTimes size={12} /> {errors.mobile}</div>}
                                            </div>

                                            <div className={styles.inputGroup}>
                                                <label className={styles.label}>Email Address (Optional)</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="john@example.com"
                                                    className={styles.input}
                                                />
                                            </div>

                                            <div className={styles.actions}>
                                                <button
                                                    onClick={() => setStep(0)}
                                                    className={styles.buttonBack}
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    onClick={handleSubmit}
                                                    disabled={loading}
                                                    className={styles.buttonSubmit}
                                                    style={{ marginTop: 0, flex: 1 }}
                                                >
                                                    {loading ? (
                                                        <div className={styles.loadingSpinner} />
                                                    ) : (
                                                        'Submit Request'
                                                    )}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className={styles.successState}
                                        >
                                            <div className={styles.successIconWrapper}>
                                                <FaCheck />
                                            </div>
                                            <h3 className={styles.formTitle}>Thank You!</h3>
                                            <p className={styles.formSubtitle} style={{ marginBottom: '0.5rem' }}>
                                                We've received your requirement.
                                            </p>
                                            <p className={styles.visualText} style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                                Our team will analyze it and get back to you shortly.
                                            </p>

                                            <button
                                                onClick={() => setIsVisible(false)}
                                                className={styles.buttonBack}
                                                style={{ marginTop: '2rem', width: 'auto', padding: '0.75rem 2rem' }}
                                            >
                                                Close
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {!isVisible && showFloatingButton && (
                    <motion.button
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsVisible(true)}
                        className={styles.floatingButton}
                    >
                        <FaMagic />
                        Your Business needs something special
                    </motion.button>
                )}
            </AnimatePresence>
        </>,
        document.body
    );
}
