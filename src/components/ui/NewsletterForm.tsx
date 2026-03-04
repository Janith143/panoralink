'use client';

import { useState } from 'react';
import styles from './Footer.module.css';

export default function NewsletterForm() {
    const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('LOADING');
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!res.ok) throw new Error('Failed');
            setStatus('SUCCESS');
            (e.target as HTMLFormElement).reset();
        } catch {
            setStatus('ERROR');
        }
    }

    return (
        <div className={styles.newsletter}>

            {status === 'SUCCESS' ? (
                <div style={{ color: '#4ade80', marginTop: '0.5rem', fontWeight: 'bold' }}>
                    Thank you for subscribing!
                </div>
            ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        required
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className={styles.input}
                        disabled={status === 'LOADING'}
                    />
                    <button type="submit" className={styles.subscribeBtn} disabled={status === 'LOADING'}>
                        {status === 'LOADING' ? '...' : 'Subscribe'}
                    </button>
                    {status === 'ERROR' && <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.5rem' }}>Something went wrong.</p>}
                </form>
            )}
        </div>
    );
}
