'use client';

import { useState } from 'react';
import styles from './Contact.module.css';

export default function TicketForm() {
    const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
    const [ticketId, setTicketId] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('LOADING');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            priority: formData.get('priority'),
            category: formData.get('category'),
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/ticket', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!res.ok) throw new Error('Failed to submit');

            const result = await res.json();
            setTicketId(result.ticketId);
            setStatus('SUCCESS');
            (e.target as HTMLFormElement).reset();
        } catch (err) {
            setStatus('ERROR');
        }
    }

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Full Name</label>
                <input required name="name" type="text" className={styles.input} placeholder="John Doe" />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <input required name="email" type="email" className={styles.input} placeholder="john@example.com" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Priority</label>
                    <select name="priority" className={styles.select}>
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Category</label>
                    <select name="category" className={styles.select}>
                        <option value="SUPPORT">General Support</option>
                        <option value="SALES">Sales Inquiry</option>
                        <option value="PARTNERSHIP">Partnership</option>
                    </select>
                </div>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Subject</label>
                <input required name="subject" type="text" className={styles.input} placeholder="Brief summary of your issue" />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Message</label>
                <textarea required name="message" className={styles.textarea} placeholder="Describe your issue in detail..." />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={status === 'LOADING'}>
                {status === 'LOADING' ? 'Submitting...' : 'Submit Ticket'}
            </button>

            {status === 'SUCCESS' && (
                <div className={styles.successMessage}>
                    <strong>Success!</strong> Your ticket ID is {ticketId}. We'll be in touch shortly.
                </div>
            )}

            {status === 'ERROR' && (
                <div className={styles.errorMessage}>
                    Failed to submit ticket. Please try again.
                </div>
            )}
        </form>
    );
}
