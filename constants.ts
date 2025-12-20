import type { SkillCategory, Experience, CodeSample, WorkProject, Testimonial, NavLink } from './types';

// FIX: Provided full content for constants.ts to resolve module errors.
export const PROFILE_IMAGE_URL = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80';

export const CLIENTS: string[] = [
  'Apple', 'Binance', 'Coinbase', 'Unilever', 'Mercedes-Benz'
];

export const NAV_LINKS: NavLink[] = [
    { href: '/#about', label: 'About' },
    {
        href: '/#work',
        label: 'Work',
    },
    { href: '/#services', label: 'Services' },
    { href: '/#testimonials', label: 'Testimonials' },
    { href: '/#experience', label: 'Experience' },
    { href: '/blog', label: 'Blog' },
    { href: '/#contact', label: 'Contact' },
];


export const SKILLS: SkillCategory[] = [
  {
    category: 'LANGUAGES',
    skills: [{ name: 'JavaScript (ES6+)' }, { name: 'TypeScript' }, { name: 'HTML5' }, { name: 'CSS3 / SASS' }, { name: 'SQL' }, { name: 'GraphQL' }],
  },
  {
    category: 'FRAMEWORKS & LIBRARIES',
    skills: [{ name: 'React' }, { name: 'Next.js' }, { name: 'Node.js' }, { name: 'Express.js' }, { name: 'Tailwind CSS' }, { name: 'Redux' }],
  },
  {
    category: 'DATABASES & CLOUD',
    skills: [{ name: 'PostgreSQL' }, { name: 'MongoDB' }, { name: 'Firebase' }, { name: 'AWS' }, { name: 'Vercel' }, { name: 'Docker' }],
  },
  {
    category: 'TOOLS & PLATFORMS',
    skills: [{ name: 'Git & GitHub' }, { name: 'Webpack' }, { name: 'Figma' }, { name: 'Stripe' }, { name: 'Jira' }, { name: 'Contentful' }],
  },
];

export const EXPERIENCE_LOGOS = {
    apple: 'Apple',
    binance: 'Binance',
    freelance: 'Freelance',
};

export const EXPERIENCE_DATA: Experience[] = [
  {
    company: 'Freelance',
    logo: 'freelance',
    role: 'Full Stack Developer',
    period: '2020 - Present',
    description: `I partner with startups and businesses to build scalable web applications from scratch. I handle everything from architecture and UI/UX design to backend development and deployment, focusing on creating high-quality, maintainable code.`,
    tools: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
  },
  {
    company: 'Apple',
    logo: 'apple',
    role: 'Senior Frontend Engineer',
    period: '2018 - 2020',
    description: `Worked on internal tools and dashboards for the marketing team. I was responsible for developing new features, improving performance, and ensuring a high level of code quality and test coverage. Collaborated closely with designers and product managers.`,
    tools: ['React', 'Redux', 'JavaScript', 'SASS', 'Webpack', 'Jest'],
  },
  {
    company: 'Binance',
    logo: 'binance',
    role: 'Software Engineer',
    period: '2016 - 2018',
    description: `Developed and maintained features for the main trading platform. Focused on real-time data visualization, performance optimization, and building a robust component library. Worked in a fast-paced agile environment.`,
    tools: ['JavaScript', 'React', 'WebSocket', 'Node.js', 'Styled Components'],
  },
];

export const CODE_SAMPLES_DATA: CodeSample[] = [
    {
        name: 'Portfolio Website',
        description: 'The source code for this very website. Built with Next.js, TypeScript, and Tailwind CSS for a modern, fast, and responsive experience.',
        tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
        sourceLink: '#',
        demoLink: '/',
    },
    {
        name: 'E-commerce Store',
        description: 'A full-featured e-commerce platform with Stripe integration for payments, user authentication, and a complete admin dashboard for managing products.',
        tools: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API'],
        sourceLink: '#',
    },
    {
        name: 'Real-time Chat App',
        description: 'A web-based chat application using WebSockets for instant messaging. Features include multiple rooms, user presence indicators, and message history.',
        tools: ['React', 'Node.js', 'Socket.IO', 'Redis'],
        sourceLink: '#',
    },
];

const allProjects: WorkProject[] = [
    {
        name: 'Task Partner',
        description: 'A Fiverr-like marketplace platform where users can post short-term projects and hire virtual assistants to complete tasks efficiently.',
        longDescription: 'Task Partner is a comprehensive marketplace platform similar to Fiverr, designed to connect clients with virtual assistants for short-term projects. The platform features a modern, user-friendly interface where clients can post gigs, browse available virtual assistants, and manage their projects seamlessly. Built with a focus on scalability and user experience, the platform includes features like project posting, talent matching, secure communication, and project management tools. The application is fully deployed and live, demonstrating production-ready code with clean architecture and responsive design.',
        imageUrl: '/images/task-partner.png',
        tools: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'Vercel'],
        projectLink: 'https://taskpartner.us.cc/',
        githubLink: 'https://github.com/jugnunagar97/gig-snap',
    },
    {
        name: 'Foundation Brothers',
        description: 'A modern corporate website for a leading construction company in Rajasthan, showcasing services, projects, and client testimonials with a clean, professional design.',
        longDescription: 'Foundation Brothers is a comprehensive corporate website for a construction and real estate company based in Rajasthan. The website features a modern, professional design with multiple sections including hero area, services showcase, project portfolio, FAQ section, and contact forms. Built with a focus on user experience and conversion optimization, the site showcases the company\'s construction services, commercial projects, interior design capabilities, and home renovation expertise. The application includes interactive elements, responsive design, and seamless navigation, demonstrating a polished client-facing web presence.',
        imageUrl: '/images/foundation-brothers.png',
        tools: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'Vercel'],
        projectLink: 'https://www.foundationbrothers.in/',
        githubLink: 'https://github.com/jugnunagar97/foundation-brothers',
    },
    {
        name: 'Lease Ezy',
        description: 'A modern web application for managing lease agreements and rental properties, providing an easy-to-use platform for property owners and tenants.',
        longDescription: 'Lease Ezy is a comprehensive lease management platform designed to simplify the process of creating, managing, and tracking lease agreements. The application provides a streamlined interface for property owners to manage their rental properties and for tenants to handle their lease documents. Built with modern web technologies, the platform offers features such as lease creation, document management, payment tracking, and automated reminders. The application demonstrates clean architecture, responsive design, and user-friendly workflows for efficient lease management.',
        imageUrl: '/images/lease-ezy.png',
        tools: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Vercel'],
        projectLink: 'https://leaseezy.vercel.app/',
        githubLink: 'https://github.com/dev-nagarjugnu/leaseezy',
    },
    {
        name: 'SEO Website',
        description: 'A modern SEO service website showcasing SEO tools, services, and resources to help businesses improve their search engine rankings and online visibility.',
        longDescription: 'SEO Website (SEO Buddy) is a comprehensive SEO service platform designed to help businesses improve their search engine optimization. The website features a modern, conversion-focused design with sections highlighting SEO services, tools, case studies, and resources. Built with performance and SEO best practices in mind, the platform showcases SEO expertise through an intuitive interface, service packages, and educational content. The application demonstrates modern web development practices with fast load times, responsive design, and optimized user experience for both desktop and mobile devices.',
        imageUrl: '/images/seo-website.png',
        tools: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Vercel'],
        projectLink: 'https://seobuddy-website.vercel.app/',
        githubLink: 'https://github.com/dev-nagarjugnu/seobuddy-website',
    }
];

export const WORK_PROJECTS = allProjects;
export const ALL_PROJECTS = allProjects;

export const TESTIMONIALS_DATA: Testimonial[] = [
  { quote: `Andrej delivered our MVP in weeks, not months, without compromising on quality. Clear communication and strong ownership throughout.`, author: 'Sarah Nolan', company: 'Founder, Fintech Startup' },
  { quote: `Outstanding front-end engineering. Our Core Web Vitals improved across the board and conversions followed.`, author: 'Marco Ruiz', company: 'Head of Growth, DTC Brand' },
  { quote: `Rare mix of speed and craftsmanship. He set up CI, testing, and a design system that our team still uses daily.`, author: 'Priya Sharma', company: 'CTO, SaaS Company' },
  { quote: `Andrej translated vague requirements into a crisp roadmap and shipped exactly what we needed.`, author: 'James Park', company: 'Product Lead, HealthTech' },
  { quote: `Our migration to a modern stack was seamless. Performance, stability, and developer experience all improved.`, author: 'Laura Kim', company: 'Engineering Manager' },
  { quote: `He thinks like a product partner, not just a developer. Every feature came with thoughtful UX details.`, author: 'Daniel Cooper', company: 'Design Director, Agency' },
  { quote: `Great with stakeholders and timelines. Dependencies were flagged early and handled professionally.`, author: 'Ana Martins', company: 'Program Manager' },
  { quote: `Security and privacy were treated as first-class concerns from day one. Exactly what we needed.`, author: 'Omar Hassan', company: 'VP Engineering, Enterprise' },
  { quote: `The codebase he left is a joy to maintain. Clear structure, tests, and documentation saved us months.`, author: 'Rebecca Lee', company: 'Senior Engineer' },
  { quote: `We launched on time and under budget. I’d hire Andrej again without hesitation.`, author: 'Tom Wilkins', company: 'Founder, Marketplace Startup' },
  { quote: `Our internal tool adoption tripled after his UX revamp. Night-and-day difference.`, author: 'Irene Novak', company: 'Operations Lead' },
  { quote: `Andrej’s calm under pressure kept the team focused during crunch. True professional.`, author: 'Victor Chen', company: 'Project Director' },
];