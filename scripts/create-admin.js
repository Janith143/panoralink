const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const mariadb = require('mariadb');
const bcrypt = require('bcryptjs');

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
    console.log('Connecting via adapter...');
    const email = 'admin@panoralink.com';
    const password = await bcrypt.hash('admin123', 10);

    await prisma.user.upsert({
        where: { email },
        update: { password },
        create: {
            email,
            password,
            name: 'Admin'
        }
    });
    console.log('Admin user created successfully!');
}

main()
    .catch(e => {
        console.error('Error creating admin:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
