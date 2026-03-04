import Link from 'next/link';
import { logout } from '@/lib/actions';
import { auth } from '@/auth';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', background: '#0f172a', color: 'white', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '2rem', padding: '1rem 0', borderBottom: '1px solid #334155' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Admin Panel</h2>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{session?.user?.email}</p>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <NavLink href="/admin">Dashboard</NavLink>
                    <NavLink href="/admin/pages">Pages</NavLink>
                    <NavLink href="/admin/inquiries">Inquiries</NavLink>
                    <NavLink href="/admin/media">Media Library</NavLink>
                    <NavLink href="/admin/logos">Partner Logos</NavLink>
                    <NavLink href="/admin/brands">Our Brands</NavLink>
                    <NavLink href="/admin/reviews">Customer Reviews</NavLink>
                    <NavLink href="/admin/settings">Settings</NavLink>
                    <a href="/" target="_blank" style={{ marginTop: 'auto', padding: '0.75rem', borderRadius: '4px', color: '#94a3b8', textDecoration: 'none' }}>
                        View Site ↗
                    </a>
                </nav>

                <form action={logout}>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginTop: '1rem'
                        }}
                    >
                        Logout
                    </button>
                </form>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, background: '#f1f5f9', padding: '2rem', overflowY: 'auto' }}>
                {children}
            </main>
        </div>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            style={{
                display: 'block',
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                color: 'white',
                textDecoration: 'none',
                transition: 'background 0.2s'
            }}
        >
            {children}
        </Link>
    );
}
