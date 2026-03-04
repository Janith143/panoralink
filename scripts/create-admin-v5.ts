import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Creating Admin User (Prisma 5)...');
    const email = 'admin@panoralink.com';
    const password = await bcrypt.hash('admin123', 10);

    try {
        const user = await prisma.user.upsert({
            where: { email },
            update: { password },
            create: {
                email,
                password,
                name: 'Admin'
            }
        });
        console.log('SUCCESS: Admin user created/updated:', user);
    } catch (e) {
        console.error('FAILURE:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
