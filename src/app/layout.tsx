import './globals.css';
import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });

export const metadata: Metadata = {
    title: 'Panoralink Business Solutions',
    description: 'Empowering Businesses Through Smart Digital Solutions',
    icons: {
        icon: '/icon.png',
    },
};

import RequirementPopup from '@/components/public/RequirementPopup';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" style={{ scrollBehavior: 'smooth' }}>
            <body className={`${inter.className} ${orbitron.variable}`}>
                {children}
                <RequirementPopup />
            </body>
        </html>
    );
}
