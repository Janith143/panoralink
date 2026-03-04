
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

async function generate() {
    console.log('-- Initial Data Seed');

    // 1. Admin User
    const adminId = crypto.randomUUID();
    const hash = await bcrypt.hash('admin123', 10);
    console.log(`INSERT INTO \`user\` (\`id\`, \`email\`, \`password\`, \`name\`, \`createdAt\`, \`updatedAt\`) VALUES ('${adminId}', 'admin@panoralink.com', '${hash}', 'Admin', NOW(), NOW());`);

    // 2. Settings
    const settings = [
        { key: 'site_name', value: 'Panoralink Business Solutions' },
        { key: 'contact_email', value: 'info@panoralink.com' },
        { key: 'phone', value: '+94 77 123 4567' },
        { key: 'address', value: 'Colombo, Sri Lanka' },
        { key: 'social_twitter', value: 'https://twitter.com/' },
        { key: 'social_linkedin', value: 'https://linkedin.com/' },
        { key: 'social_github', value: 'https://github.com/' },
        { key: 'social_discord', value: 'https://discord.com/' }
    ];
    for (const s of settings) {
        console.log(`INSERT INTO \`setting\` (\`key\`, \`value\`, \`updatedAt\`) VALUES ('${s.key}', '${s.value}', NOW());`);
    }

    // 3. Pages
    const pages = [
        { slug: 'home', title: 'Home' },
        { slug: 'about', title: 'About Us' },
        { slug: 'services', title: 'Our Services' },
        { slug: 'products', title: 'Products' },
        { slug: 'blog', title: 'Blog' },
        { slug: 'contact', title: 'Contact Us' },
        { slug: 'privacy', title: 'Privacy Policy' },
        { slug: 'terms', title: 'Terms of Service' },
        { slug: 'refund-policy', title: 'Refund Policy' },
        { slug: 'security', title: 'Security' },
        { slug: 'travel', title: 'Travel' },
    ];

    for (const p of pages) {
        const pId = crypto.randomUUID();
        console.log(`INSERT INTO \`page\` (\`id\`, \`slug\`, \`title\`, \`published\`, \`createdAt\`, \`updatedAt\`) VALUES ('${pId}', '${p.slug}', '${p.title}', 1, NOW(), NOW());`);

        // Add default hero section for each page
        const sId = crypto.randomUUID();
        const content = JSON.stringify({
            headline: p.title,
            subheadline: `Welcome to the ${p.title} page`
        }).replace(/'/g, "\\'");


        console.log(`INSERT INTO \`section\` (\`id\`, \`pageId\`, \`type\`, \`content\`, \`order\`, \`createdAt\`, \`updatedAt\`) VALUES ('${sId}', '${pId}', 'HERO', '${content}', 0, NOW(), NOW());`);

        // Special case for Contact page: Add a second TEXT section for "Connect With Us"
        if (p.slug === 'contact') {
            const connectId = crypto.randomUUID();
            const connectContent = JSON.stringify({
                title: 'Connect With Us',
                body: 'Follow us on our social channels for the latest updates.'
            }).replace(/'/g, "\\'");
            console.log(`INSERT INTO \`section\` (\`id\`, \`pageId\`, \`type\`, \`content\`, \`order\`, \`createdAt\`, \`updatedAt\`) VALUES ('${connectId}', '${pId}', 'TEXT', '${connectContent}', 1, NOW(), NOW());`);
        }
    }
}

generate();
