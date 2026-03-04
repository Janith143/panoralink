import { prisma } from '@/lib/prisma';
import { updateSettings } from '@/lib/actions';

export default async function AdminSettingsPage() {
    const settingsData = await prisma.setting.findMany();
    const settings = settingsData.reduce((acc: any, curr: any) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {} as Record<string, string>);

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#0f172a' }}>Global Settings</h1>
                <p style={{ color: '#64748b' }}>Manage site-wide details and configuration.</p>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <form action={async (formData) => {
                    'use server';
                    await updateSettings(formData);
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#334155' }}>Site Name</label>
                            <input name="site_name" type="text" defaultValue={settings.site_name || 'Panoralink Business Solutions'} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#334155' }}>Contact Email (Public)</label>
                            <input name="contact_email" type="email" defaultValue={settings.contact_email || 'info@panoralink.com'} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#334155' }}>Phone Number</label>
                            <input name="phone" type="text" defaultValue={settings.phone || '+94 77 123 4567'} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#334155' }}>Address</label>
                            <input name="address" type="text" defaultValue={settings.address || 'Colombo, Sri Lanka'} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                        </div>
                        <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#0f172a' }}>Notification Email (Private)</label>
                            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.75rem' }}>Inquiries from the Contact form will be sent to this address.</p>
                            <input name="notification_email" type="email" defaultValue={settings.notification_email || ''} placeholder="admin@panoralink.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                        </div>

                        <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '1rem' }}>Social Media Links</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#334155' }}>Twitter</label>
                                    <input name="social_twitter" type="url" defaultValue={settings.social_twitter || ''} placeholder="https://twitter.com/..." style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#334155' }}>LinkedIn</label>
                                    <input name="social_linkedin" type="url" defaultValue={settings.social_linkedin || ''} placeholder="https://linkedin.com/..." style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#334155' }}>GitHub</label>
                                    <input name="social_github" type="url" defaultValue={settings.social_github || ''} placeholder="https://github.com/..." style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#334155' }}>Discord</label>
                                    <input name="social_discord" type="url" defaultValue={settings.social_discord || ''} placeholder="https://discord.gg/..." style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #f1f5f9' }}>
                        <button type="submit" style={{ background: '#0f172a', color: 'white', padding: '0.75rem 2rem', borderRadius: '4px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
