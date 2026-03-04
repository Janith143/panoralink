import { PrismaClient } from '@prisma/client'
import crypto from 'node:crypto'

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "mysql://root:@127.0.0.1:3306/panoralink_db",
        },
    },
})

async function main() {
    console.log('Seeding database...')

    // 1. Global Settings
    const settings = [
        { key: 'site_name', value: 'PanoraLink' },
        { key: 'site_tagline', value: 'Websites, Travel Services & Digital Growth Tools' },
        { key: 'contact_email', value: 'info@panoralink.com' },
        { key: 'footer_text', value: '© 2026 PanoraLink. All Rights Reserved.' },
        { key: 'one_line_positioning', value: 'PanoraLink is a technology solutions company delivering smart software, platforms, and digital systems that help businesses grow, scale, and succeed.' },
    ]

    for (const s of settings) {
        await prisma.setting.upsert({
            where: { key: s.key },
            update: { value: s.value, updatedAt: new Date() },
            create: { ...s, updatedAt: new Date() },
        })
    }

    // 2. Pages & Sections

    // --- Home Page ---
    // App queries slug: 'home' (not '/')
    const homePage = await prisma.page.upsert({
        where: { slug: 'home' },
        update: { updatedAt: new Date() },
        create: {
            slug: 'home',
            title: 'Home',
            published: true,
            metaDesc: 'PanoraLink – Empowering Businesses with Smart Digital Solutions',
            updatedAt: new Date(),
            id: crypto.randomUUID(),
        },
    })

    // Hero
    await createOrUpdateSection(homePage.id, 'HERO', {
        headline: 'PanoraLink – Empowering Businesses with Smart Digital Solutions',
        subheadline: 'We design, develop, and deploy powerful software solutions that help businesses grow, scale, and move to the next level.',
        description: '',
        ctaText: 'Explore Our Solutions',
        ctaLink: '/services',
        backgroundImage: '',
    }, 0)

    // Snapshot: What We Do
    await createOrUpdateSection(homePage.id, 'TEXT', {
        title: 'Technology-Driven Solutions',
        body: 'PanoraLink is a technology-driven company delivering end-to-end software solutions for businesses of all sizes. From education platforms and travel solutions to enterprise systems like CRM, HR, POS, and eCommerce, we help organizations transform digitally and operate smarter.',
    }, 1)

    // Core Solutions (Cards)
    await createOrUpdateSection(homePage.id, 'SERVICE_GRID', {
        title: 'Our Core Solutions',
        items: [
            { title: 'Custom Software Development', desc: 'Tailored solutions aligned with your business processes.' },
            { title: 'Business Automation Systems', desc: 'Streamline operations with smart, scalable tools.' },
            { title: 'Education Technology Solutions', desc: 'Platforms connecting teachers, institutes, and students.' },
            { title: 'Travel & Tourism Platforms', desc: 'Digital solutions for the modern travel industry.' },
            { title: 'Web & Mobile App Development', desc: 'Engaging, responsive, and high-performance apps.' },
        ]
    }, 2)

    // Our Brands - Clazz.lk
    await createOrUpdateSection(homePage.id, 'PRODUCT_SPOTLIGHT', {
        title: 'Clazz.lk',
        tagline: 'Equal Education for All',
        description: 'Clazz.lk is an all-in-one digital education platform designed to connect teachers, institutes, and students. It enables online classes, learning management, attendance tracking, and secure payment handling.',
        features: [
            'Online & physical class management',
            'LMS with recordings, quizzes, exams',
            'Attendance-based access control',
            'Teacher & institute profiles',
            'Digital content marketplace',
            'Secure payment & commission handling',
        ],
        ctaText: 'Visit Clazz.lk',
        ctaLink: '/products/clazz',
        image: '/images/clazz-mockup.png'
    }, 3)

    // Our Brands - Panora Travels
    await createOrUpdateSection(homePage.id, 'PRODUCT_SPOTLIGHT', {
        title: 'Panora Travels',
        tagline: 'Authentic travel experiences powered by smart planning.',
        description: 'Panora Travels is a Sri Lanka-focused travel brand offering curated tour packages, custom itineraries, transport arrangements, and local travel experiences for international and local travelers.',
        features: [
            'Custom Sri Lanka tour planning',
            'Holiday & honeymoon packages',
            'Cultural, wildlife & beach tours',
            'Airport transfers & private transport',
            'Hotel & accommodation assistance',
        ],
        ctaText: 'Explore Travels',
        ctaLink: '/travel',
        image: '/images/panora-travels-mockup.png'
    }, 4)

    // Why Choose PanoraLink
    await createOrUpdateSection(homePage.id, 'FEATURES', {
        title: 'Why Choose PanoraLink?',
        items: [
            { title: 'One Company, Multiple Brands', desc: 'Diverse expertise under one roof.', icon: '🏢' },
            { title: 'Business-Focused', desc: 'Solutions designed for growth and ROI.', icon: '📈' },
            { title: 'Scalable Systems', desc: 'Future-ready technology that grows with you.', icon: '🚀' },
            { title: 'Local & Global', desc: 'Local understanding with global standards.', icon: '🌍' },
            { title: 'Ongoing Support', desc: 'We are with you for the long run.', icon: '🤝' },
        ]
    }, 5)

    // Our Approach (Process Section) - [NEW]
    await createOrUpdateSection(homePage.id, 'FEATURES', {
        title: 'Our Approach',
        items: [
            { title: 'Business Analysis', desc: 'Understanding your needs.', icon: '🔍' },
            { title: 'Solution Design', desc: 'Architecting the right system.', icon: '✏️' },
            { title: 'Development & Testing', desc: 'Building robust software.', icon: '💻' },
            { title: 'Deployment', desc: 'Going live smoothly.', icon: '🚀' },
            { title: 'Training & Support', desc: 'Empowering your team.', icon: '👨‍🏫' },
            { title: 'Continuous Improvement', desc: 'Evolving with your business.', icon: '🔄' },
        ]
    }, 6)


    // --- About Page ---
    const aboutPage = await prisma.page.upsert({
        where: { slug: 'about' },
        update: { updatedAt: new Date() },
        create: {
            slug: 'about',
            title: 'About Us',
            published: true,
            metaDesc: 'Who We Are - PanoraLink',
            updatedAt: new Date(),
            id: crypto.randomUUID(),
        },
    })

    await createOrUpdateSection(aboutPage.id, 'TEXT', {
        title: 'Who We Are',
        body: 'PanoraLink is a software and digital solutions company focused on building innovative, scalable, and practical systems for modern businesses. We partner with organizations to streamline operations, enhance customer experience, and unlock growth through technology.',
    }, 0)

    await createOrUpdateSection(aboutPage.id, 'FEATURES', {
        title: 'Mission & Vision',
        items: [
            { title: 'Our Mission', desc: 'To help businesses leverage technology to operate efficiently, grow faster, and stay competitive in a digital-first world.', icon: '🎯' },
            { title: 'Our Vision', desc: 'To become a trusted global technology partner delivering impactful digital solutions across industries.', icon: '👁️' },
        ]
    }, 1)

    await createOrUpdateSection(aboutPage.id, 'FEATURES', {
        title: 'Industries We Serve',
        items: [
            { title: 'Education & Training', desc: '', icon: '🎓' },
            { title: 'Travel & Tourism', desc: '', icon: '✈️' },
            { title: 'Retail & Wholesale', desc: '', icon: '🛒' },
            { title: 'Logistics & Operations', desc: '', icon: '🚚' },
            { title: 'Service-Based Businesses', desc: '', icon: '💼' },
            { title: 'SMEs & Enterprises', desc: '', icon: '🏭' },
        ]
    }, 2)


    // --- Services Page ---
    const servicesPage = await prisma.page.upsert({
        where: { slug: 'services' },
        update: { updatedAt: new Date() },
        create: {
            slug: 'services',
            title: 'Digital Services',
            published: true,
            metaDesc: 'Our Main Offerings',
            updatedAt: new Date(),
            id: crypto.randomUUID(),
        },
    })

    await createOrUpdateSection(servicesPage.id, 'SERVICE_GRID', {
        title: 'Business Software Solutions',
        items: [
            { title: 'Custom Software Development', desc: 'Web-based systems, Cloud apps, API integrations.' },
            { title: 'CRM Systems', desc: 'Lead management, Customer profiles, Analytics.' },
            { title: 'HR Management Systems', desc: 'Employee records, Payroll, Performance tracking.' },
            { title: 'POS Systems', desc: 'Sales, Inventory, Multi-branch support.' },
            { title: 'eCommerce Solutions', desc: 'Custom stores, Payment gateways, Inventory management.' },
        ]
    }, 0)

    await createOrUpdateSection(servicesPage.id, 'SERVICE_GRID', {
        title: 'Web & Mobile Development',
        items: [
            { title: 'Website Development', desc: 'Corporate, Portfolio, Landing pages.' },
            { title: 'Web Applications', desc: 'Dashboards, Booking systems, Marketplaces.' },
            { title: 'Mobile App Development', desc: 'iOS, Android, Hybrid apps.' },
        ]
    }, 1)

    // --- Products Page ---
    const productsPage = await prisma.page.upsert({
        where: { slug: 'products' },
        update: { updatedAt: new Date() },
        create: {
            slug: 'products',
            title: 'Our Products',
            published: true,
            metaDesc: 'Our Products',
            updatedAt: new Date(),
            id: crypto.randomUUID(),
        },
    })

    await createOrUpdateSection(productsPage.id, 'PRODUCT_SPOTLIGHT', {
        title: 'Featured Products',
        tagline: 'Top Quality',
        description: 'Explore our range of products.',
        features: ['High Performance', 'Reliable', 'Cost Effective'],
        ctaText: 'Learn More',
        ctaLink: '#',
        image: ''
    }, 0)

    // --- Travel Page ---
    const travelPage = await prisma.page.upsert({
        where: { slug: 'travel' },
        update: { updatedAt: new Date() },
        create: {
            slug: 'travel',
            title: 'Travel Solutions',
            published: true,
            metaDesc: 'Panora Travels - Sri Lanka Travel Solutions',
            updatedAt: new Date(),
            id: crypto.randomUUID(),
        },
    })

    await createOrUpdateSection(travelPage.id, 'HERO', {
        headline: 'Explore Sri Lanka with Panora Travels',
        subheadline: 'Authentic travel experiences powered by smart planning and local expertise.',
        ctaText: 'View Packages',
        ctaLink: '#packages',
        backgroundImage: '',
    }, 0)

    await createOrUpdateSection(travelPage.id, 'FEATURES', {
        title: 'Tour Categories',
        items: [
            { title: 'Cultural Tours', desc: 'Explore the rich heritage of Sri Lanka.', icon: 'mh' },
            { title: 'Wildlife & Nature', desc: 'Safaris and nature trails.', icon: '🐘' },
            { title: 'Beach & Island', desc: 'Relax on pristine beaches.', icon: '🏖️' },
            { title: 'Adventure Packages', desc: 'Hiking, trekking, and water sports.', icon: '🧗' },
        ]
    }, 1)

    // --- Contact Page ---
    const contactPage = await prisma.page.upsert({
        where: { slug: 'contact' },
        update: { updatedAt: new Date() },
        create: {
            slug: 'contact',
            title: 'Contact Us',
            published: true,
            metaDesc: 'Get in Touch',
            updatedAt: new Date(),
            id: crypto.randomUUID(),
        },
    })

    await createOrUpdateSection(contactPage.id, 'TEXT', {
        title: 'Get in Touch',
        body: 'Ready to take your business to the next level? Contact us for a free consultation, custom requirement discussion, project estimation, or support & partnerships.',
    }, 0)

    // --- Privacy Policy ---
    const privacyPage = await prisma.page.upsert({
        where: { slug: 'privacy' },
        update: { updatedAt: new Date() },
        create: {
            slug: 'privacy',
            title: 'Privacy Policy',
            published: true,
            metaDesc: 'Privacy Policy',
            updatedAt: new Date(),
            id: crypto.randomUUID(),
        },
    })
    await createOrUpdateSection(privacyPage.id, 'TEXT', {
        title: 'Privacy Policy',
        body: 'Your privacy is important to us.',
    }, 0)

    // --- Terms of Service ---
    const termsPage = await prisma.page.upsert({
        where: { slug: 'terms' },
        update: { updatedAt: new Date() },
        create: {
            slug: 'terms',
            title: 'Terms of Service',
            published: true,
            metaDesc: 'Terms of Service',
            updatedAt: new Date(),
            id: crypto.randomUUID(),
        },
    })
    await createOrUpdateSection(termsPage.id, 'TEXT', {
        title: 'Terms of Service',
        body: 'By using our services, you agree to these terms.',
    }, 0)

    // --- Refund Policy (New) ---
    const refundPage = await prisma.page.upsert({
        where: { slug: 'refund-policy' },
        update: { updatedAt: new Date() },
        create: {
            slug: 'refund-policy',
            title: 'Refund & Cancellation Policy',
            published: true,
            metaDesc: 'Refund Policy',
            updatedAt: new Date(),
            id: crypto.randomUUID(),
        },
    })
    await createOrUpdateSection(refundPage.id, 'TEXT', {
        title: 'Refund & Cancellation Policy',
        body: 'Details about refunds and cancellations.',
    }, 0)

    // --- Data Protection (New) ---
    const securityPage = await prisma.page.upsert({
        where: { slug: 'security' },
        update: { updatedAt: new Date() },
        create: {
            slug: 'security',
            title: 'Data Protection & Security',
            published: true,
            metaDesc: 'Data Protection Center',
            updatedAt: new Date(),
            id: crypto.randomUUID(),
        },
    })
    await createOrUpdateSection(securityPage.id, 'TEXT', {
        title: 'Data Protection & Security',
        body: 'How we protect your data.',
    }, 0)

    // --- Blog ---
    const blogPage = await prisma.page.upsert({
        where: { slug: 'blog' },
        update: { updatedAt: new Date() },
        create: {
            slug: 'blog',
            title: 'Knowledge Hub',
            published: true,
            metaDesc: 'Insights and Articles',
            updatedAt: new Date(),
            id: crypto.randomUUID(),
        },
    })
    await createOrUpdateSection(blogPage.id, 'TEXT', {
        title: 'Welcome to our Knowledge Hub',
        body: 'Topics include: Digital transformation for SMEs, Education technology trends, Travel tech innovations, CRM & automation benefits, and more.',
    }, 0)


    console.log('Seeding finished.')
}

async function createOrUpdateSection(pageId: string, type: string, content: any, order: number) {
    const existing = await prisma.section.findFirst({
        where: { pageId, order }
    })

    if (existing) {
        await prisma.section.update({
            where: { id: existing.id },
            data: { type, content, order, updatedAt: new Date() }
        })
    } else {
        await prisma.section.create({
            data: { id: crypto.randomUUID(), pageId, type, content, order, updatedAt: new Date() }
        })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
