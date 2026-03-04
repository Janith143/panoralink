'use client';

import { useEffect, useState } from 'react';
import styles from './ServicesHeroAnimations.module.css';

export default function ServicesHeroAnimations() {
    const [dots, setDots] = useState<{ x: number; y: number; delay: number }[]>([]);

    useEffect(() => {
        const updateDots = () => {
            const width = window.innerWidth;
            const height = window.innerHeight; // Approximate hero height coverage
            const gridSize = 30; // Matches CSS background-size
            const cols = Math.ceil(width / gridSize);
            const rows = Math.ceil(800 / gridSize); // Max hero height approx

            const newDots = [];
            const numDots = 40; // Number of blinking dots

            for (let i = 0; i < numDots; i++) {
                const c = Math.floor(Math.random() * cols);
                const r = Math.floor(Math.random() * rows);

                newDots.push({
                    x: c * gridSize + 15, // Center of 30px tile
                    y: r * gridSize + 15,
                    delay: Math.random() * 5 // Random animation delay
                });
            }
            setDots(newDots);
        };

        updateDots();
        window.addEventListener('resize', updateDots);
        return () => window.removeEventListener('resize', updateDots);
    }, []);

    return (
        <div className={styles.container}>
            {dots.map((dot, i) => (
                <div
                    key={i}
                    className={styles.dot}
                    style={{
                        left: `${dot.x}px`,
                        top: `${dot.y}px`,
                        animationDelay: `${dot.delay}s`
                    }}
                />
            ))}
        </div>
    );
}
