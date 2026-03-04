'use client';

import { useActionState } from 'react'; // Updated hook
import { useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';
// We need to create this action

export default function LoginPage() {
    const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined);

    return (
        <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' }}>
            <form action={dispatch} style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
                <h1 style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#0f172a' }}>Admin Login</h1>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                    />
                </div>

                <div>
                    <LoginButton />
                </div>

                {errorMessage && (
                    <p style={{ color: 'red', marginTop: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>{errorMessage}</p>
                )}
            </form>
        </div>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            style={{
                width: '100%',
                padding: '0.75rem',
                background: '#0f172a',
                color: 'white',
                borderRadius: '4px',
                fontWeight: 'bold',
                opacity: pending ? 0.7 : 1
            }}
        >
            {pending ? 'Logging in...' : 'Login'}
        </button>
    );
}
