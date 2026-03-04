'use client';

import { uploadImage } from '@/lib/actions';
import { useActionState, useState } from 'react';

export default function MediaLibrary({ assets }: { assets: any[] }) {
    const [uploadStatus, setUploadStatus] = useState<string>('');

    async function handleUpload(formData: FormData) {
        setUploadStatus('Uploading...');
        const result = await uploadImage(formData);
        if (result.success) {
            setUploadStatus('Upload successful!');
            // Reset form? browser handles it naturally on re-render if key changes, 
            // but we might want to clear the input explicitly if we were fully controlled.
            setTimeout(() => setUploadStatus(''), 3000);
        } else {
            setUploadStatus('Upload failed.');
        }
    }

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        alert('URL copied to clipboard: ' + url);
    };

    return (
        <div>
            {/* Upload Area */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#334155' }}>Upload New Image</h2>
                <form action={handleUpload} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        required
                        style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                    />
                    <button
                        type="submit"
                        style={{
                            background: '#0f172a',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Upload
                    </button>
                    {uploadStatus && <span style={{ color: '#166534', fontWeight: '500' }}>{uploadStatus}</span>}
                </form>
            </div>

            {/* Gallery */}
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#334155' }}>Library ({assets.length})</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {assets.map((asset: any) => (
                    <div key={asset.id} style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ height: '150px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={asset.url}
                                alt={asset.filename}
                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            />
                        </div>
                        <div style={{ padding: '1rem' }}>
                            <p style={{ fontSize: '0.8rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '0.5rem' }} title={asset.filename}>
                                {asset.filename}
                            </p>
                            <button
                                onClick={() => copyToClipboard(asset.url)}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    background: '#f1f5f9',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '4px',
                                    color: '#334155',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Copy URL
                            </button>
                        </div>
                    </div>
                ))}
                {assets.length === 0 && <p style={{ color: '#94a3b8' }}>No images found.</p>}
            </div>
        </div>
    );
}
