export default function AdminDashboard() {
    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#0f172a' }}>Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <DashboardCard title="Pages" value="4" description="Total pages managed" />
                <DashboardCard title="Media" value="2" description="Images uploaded" />
                <DashboardCard title="System" value="Healthy" description="Database Connection" />
            </div>

            <div style={{ marginTop: '3rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Quick Actions</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}>Edit Home Page</button>
                    <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}>Upload Image</button>
                    <a href="/admin/logos" className="btn btn-outline" style={{ padding: '0.5rem 1rem', border: '1px solid #cbd5e1', borderRadius: '4px', textDecoration: 'none', color: 'inherit', display: 'inline-block' }}>Manage Logos</a>
                </div>
            </div>
        </div>
    );
}

function DashboardCard({ title, value, description }: { title: string; value: string; description: string }) {
    return (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '600' }}>{title}</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0f172a', margin: '0.5rem 0' }}>{value}</p>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{description}</p>
        </div>
    );
}
