
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const pagesToSeed = [
    { slug: 'home', title: 'Home', published: true },
    { slug: 'about', title: 'About Us', published: true },
    { slug: 'services', title: 'Our Services', published: true },
    { slug: 'products', title: 'Products', published: true },
    { slug: 'blog', title: 'Blog', published: true },
    { slug: 'contact', title: 'Contact Us', published: true },
    { slug: 'privacy', title: 'Privacy Policy', published: true },
    { slug: 'terms', title: 'Terms of Service', published: true },
    { slug: 'refund-policy', title: 'Refund Policy', published: true },
    { slug: 'security', title: 'Security', published: true },
    { slug: 'travel', title: 'Travel', published: true },
];

async function main() {
    console.log('Seeding Pages...');

    for (const page of pagesToSeed) {
        const existing = await prisma.page.findUnique({
            where: { slug: page.slug }
        });

        if (!existing) {
            await prisma.page.create({
                data: {
                    id: crypto.randomUUID(),
                    slug: page.slug,
                    title: page.title,
                    published: page.published,
                    updatedAt: new Date(),
                }
            });
            console.log(`Created page: ${page.title} (${page.slug})`);
        } else {
            console.log(`Page already exists: ${page.title} (${page.slug})`);
        }
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
