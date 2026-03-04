import Link from 'next/link';

interface AdminEditLinkProps {
    pageId: string;
    label?: string;
}

export default function AdminEditLink({ pageId, label = 'Edit Page' }: AdminEditLinkProps) {
    // Only show in development or to logged-in admins
    // For simplicity, we show it always in dev. In production, you'd check auth.
    if (process.env.NODE_ENV !== 'development') return null;

    return (
        <Link
            href={`/admin/pages/${pageId}`}
            style={{
                position: 'fixed',
                bottom: '1rem',
                right: '1rem',
                background: '#0f172a',
                color: 'white',
                padding: '0.75rem 1.25rem',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}
        >
            ✏️ {label}
        </Link>
    );
}
