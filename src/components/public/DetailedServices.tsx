'use client';

import { motion } from 'framer-motion';
import {
    FaLaptopCode, FaServer, FaDatabase, FaCloud, FaMobileAlt, FaRocket, FaShieldAlt, FaChartLine,
    FaCode, FaCogs, FaGlobe, FaLock, FaBolt, FaLayerGroup
} from 'react-icons/fa';
import AnimatedSection from '../ui/AnimatedSection';
import styles from './DetailedServices.module.css';



export default function DetailedServices() {
    const services = [
        { name: "Custom Web Development", desc: "Modern, responsive web applications built with React, Next.js, Angular, and Vue.js. We create fast, secure, and scalable solutions.", icon: <FaLaptopCode size={24} /> },
        { name: "Mobile App Development", desc: "Native iOS and Android apps, plus cross-platform solutions using React Native and Flutter for maximum reach and efficiency.", icon: <FaMobileAlt size={24} /> },
        { name: "Enterprise Software", desc: "Custom ERP, CRM, and business management systems designed to streamline your operations and boost productivity.", icon: <FaServer size={24} /> },
        { name: "Cloud & DevOps", desc: "Cloud migration, AWS/Azure/GCP setup, CI/CD pipelines, containerization with Docker and Kubernetes.", icon: <FaCloud size={24} /> },
        { name: "UI/UX Design", desc: "User-centered design that creates intuitive, beautiful interfaces. From wireframes to high-fidelity prototypes and design systems.", icon: <FaGlobe size={24} /> },
        { name: "E-Commerce Solutions", desc: "Complete online store development with payment gateway integration, inventory management, and analytics dashboards.", icon: <FaChartLine size={24} /> },
        { name: "API Development", desc: "RESTful and GraphQL APIs with comprehensive documentation, security best practices, and high performance.", icon: <FaCode size={24} /> },
        { name: "Maintenance & Support", desc: "24/7 technical support, bug fixes, security updates, and performance optimization for your applications.", icon: <FaCogs size={24} /> }
    ];

    const process = [
        { step: "01", title: "Discovery", desc: "We start by understanding your business goals, target audience, and technical requirements through in-depth consultations." },
        { step: "02", title: "Planning", desc: "Our team creates detailed project plans, wireframes, and technical specifications to ensure alignment." },
        { step: "03", title: "Development", desc: "Using agile methodologies, we build your solution in iterative sprints with regular updates and feedback." },
        { step: "04", title: "Testing", desc: "Rigorous QA testing ensures your application is bug-free, secure, and performs optimally." },
        { step: "05", title: "Deployment", desc: "We handle the launch process, including server setup, domain configuration, and go-live support." },
        { step: "06", title: "Support", desc: "Ongoing maintenance, updates, and technical support to keep your application running smoothly." }
    ];

    // Keeping technical/features as supporting content
    const techStack = {
        Frontend: ["HTML5", "CSS3", "JavaScript (ES6+)", "React", "Next.js", "Vue.js", "Tailwind CSS"],
        Backend: ["Node.js", "Express.js", "PHP", "Laravel", "Python", "Django"],
        Databases: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"],
        "DevOps & Cloud": ["AWS", "Google Cloud", "VPS Deployment", "CI/CD Integration", "Docker"]
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>

                {/* 1. Intro */}
                <div className={styles.header}>
                    <AnimatedSection animation="fade-up">
                        <span className={styles.subtitle}>What We Offer</span>
                        <h2 className={styles.title}>End-to-End Technology Solutions</h2>
                        <p className={styles.description}>
                            At Panoralink, we offer a complete suite of technology services designed to help your business thrive in the digital age. Whether you need a custom web application, a mobile app, cloud infrastructure, or ongoing technical support, our experienced team is ready to deliver solutions that exceed your expectations.
                        </p>
                        <div className={styles.underline}></div>
                    </AnimatedSection>
                </div>

                {/* 2. Core Services Grid */}
                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <AnimatedSection key={index} animation="fade-up" delay={index * 50}>
                            <div className={styles.serviceCard}>
                                <div className={styles.iconWrapper}>
                                    {service.icon}
                                </div>
                                <h3 className={styles.serviceName}>{service.name}</h3>
                                <p className={styles.serviceDesc}>{service.desc}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                {/* 3. Development Process */}
                <div className={styles.processSection}>
                    <AnimatedSection animation="fade-up">
                        <h2 className={styles.sectionTitle}>Our Development Process</h2>
                        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>We don't just build software — we build solutions that grow with your business.</p>
                    </AnimatedSection>

                    <div className={styles.processGrid}>
                        {process.map((p, index) => (
                            <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                                <div className={styles.processCard}>
                                    <div className={styles.stepNumber}>{p.step}</div>
                                    <h3 className={styles.processTitle}>{p.title}</h3>
                                    <p className={styles.processDesc}>{p.desc}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>

                {/* 4. Tech Stack (Supporting) */}
                <div className={styles.techSection}>
                    <div className={styles.header}>
                        <AnimatedSection animation="fade-up">
                            <h2 className={styles.sectionTitle}>
                                <FaCode style={{ color: 'var(--primary)', display: 'inline', marginRight: '10px' }} /> Powered By Modern Tech
                            </h2>
                        </AnimatedSection>
                    </div>

                    <div className={styles.techGrid}>
                        {Object.entries(techStack).map(([category, techs], catIndex) => (
                            <AnimatedSection key={category} animation="fade-up" delay={catIndex * 100}>
                                <div className={styles.techCard}>
                                    <h3 className={styles.techCategory}>{category}</h3>
                                    <ul className={styles.techList}>
                                        {techs.map((tech, i) => (
                                            <li key={i} className={styles.techItem}>
                                                <span className={styles.dot}></span>
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
