export default function TextBlock({ title, body }: { title: string; body: string }) {
    return (
        <section className="section-padding">
            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    {title && <h2>{title}</h2>}
                    {body && (
                        <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                            {body}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
