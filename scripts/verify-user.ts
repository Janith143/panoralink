import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Connecting to DB via Prisma 5...');
    try {
        const users = await prisma.user.findMany();
        console.log('Total users:', users.length);
        users.forEach(u => console.log(`- ${u.email} (${u.name}) - Pass length: ${u.password.length}`));

        const email = 'admin@panoralink.com';
        const admin = await prisma.user.findUnique({ where: { email } });
        if (admin) {
            console.log('Admin found specifically.');
        } else {
            console.log('Admin NOT found by email search.');
        }

    } catch (e) {
        console.error('Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
