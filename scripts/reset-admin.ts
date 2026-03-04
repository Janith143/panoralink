import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import mariadb from 'mariadb';
import bcrypt from 'bcryptjs';

const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: 3306,
    database: 'panoralink_db',
    connectionLimit: 5
});

const adapter = new PrismaMariaDb(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const email = 'admin@panoralink.com';
    const password = await bcrypt.hash('admin123', 10);
    console.log(`Resetting password for ${email}...`);

    try {
        await prisma.user.upsert({
            where: { email },
            update: { password },
            create: {
                email,
                password,
                name: 'Admin'
            }
        });
        console.log('SUCCESS: Admin password reset.');
    } catch (e) {
        console.error('FAILURE:', e);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

main();
