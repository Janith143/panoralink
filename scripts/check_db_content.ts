
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Checking Pages...');
    const pages = await prisma.page.findMany({
        include: {
            sections: {
                orderBy: { order: 'asc' }
            }
        }
    });

    if (pages.length === 0) {
        console.log('No pages found in the database.');
    } else {
        pages.forEach(page => {
            console.log(`\n---------------------------------------------------`);
            console.log(`Page: "${page.title}"`);
            console.log(`Slug: "${page.slug}"`);
            console.log(`Published: ${page.published}`);
            console.log(`ID: ${page.id}`);
            console.log(`Section Count: ${page.sections.length}`);
            if (page.sections.length > 0) {
                page.sections.forEach(section => {
                    console.log(`  - Type: ${section.type}, Order: ${section.order}`);
                    // console.log(`    Content: ${JSON.stringify(section.content)}`);
                });
            } else {
                console.log('  No sections linked to this page.');
            }
        });
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
