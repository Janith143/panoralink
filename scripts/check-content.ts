import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "mysql://root:@127.0.0.1:3306/panoralink_db",
        },
    },
});

async function main() {
    try {
        console.log('Connecting to database...');
        await prisma.$connect();
        console.log('Connected.');

        const pages = await prisma.page.findMany({
            include: { sections: true }
        });

        console.log('--- DB Content Check ---');
        for (const p of pages) {
            console.log(`Page: ${p.title} (${p.slug})`);
            console.log(`  Sections: ${p.sections.length}`);
            // Sort sections by order
            const sortedSections = p.sections.sort((a, b) => a.order - b.order);
            sortedSections.forEach(s => {
                const contentStr = JSON.stringify(s.content).substring(0, 50) + '...';
                console.log(`    - [${s.type}] Order: ${s.order} | Content: ${contentStr}`);
            });
        }
    } catch (error) {
        console.error('Error in check-content:', error);
    }
}

main().finally(() => prisma.$disconnect());
