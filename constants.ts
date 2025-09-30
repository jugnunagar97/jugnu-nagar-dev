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
        name: 'Project Alpha',
        description: 'A cutting-edge web platform for a fintech startup, providing real-time data analytics and visualizations.',
        longDescription: 'Project Alpha is a comprehensive financial analytics platform designed for traders and investors. It features a customizable dashboard, real-time market data streaming via WebSockets, and advanced charting tools. I led the front-end development, building a highly performant and responsive interface with React and TypeScript.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        tools: ['React', 'TypeScript', 'D3.js', 'Node.js', 'GraphQL', 'PostgreSQL'],
        projectLink: '#',
    },
    {
        name: 'Confidential Project (Apple)',
        description: 'An internal tool for Apple to manage marketing campaigns and assets. Due to NDA, details cannot be shared.',
        longDescription: 'This was an internal project developed for Apple. The application streamlined the workflow for the global marketing team, providing tools for asset management, campaign tracking, and performance reporting. The project is confidential, and further details are protected under a non-disclosure agreement.',
        imageUrl: 'https://images.unsplash.com/photo-1588196749107-4246d5600c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
        tools: ['React', 'Redux', 'JavaScript', 'Internal APIs'],
        projectLink: '#',
        isConfidential: true,
    },
    {
        name: 'E-commerce Platform',
        description: 'A bespoke e-commerce solution for a fashion brand, featuring a custom CMS and Stripe integration.',
        longDescription: 'This project involved building a complete e-commerce website from the ground up for a luxury fashion retailer. Key features include a product catalog with advanced filtering, a secure checkout process powered by Stripe, customer account management, and a custom-built content management system (CMS) for easy updates by the client.',
        imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        tools: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
        projectLink: '#',
    },
    {
        name: 'SaaS Dashboard',
        description: 'A responsive dashboard for a B2B SaaS product, enabling users to manage their accounts and services.',
        longDescription: 'I designed and developed the user-facing dashboard for a SaaS company providing cloud infrastructure monitoring. The dashboard allows users to view real-time metrics, configure alerts, manage team members, and handle billing. The focus was on creating an intuitive and data-rich user experience.',
        imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1406&q=80',
        tools: ['React', 'TypeScript', 'Redux Toolkit', 'Chart.js', 'Firebase'],
        projectLink: '#',
    }
];

export const WORK_PROJECTS = allProjects.slice(0, 3);
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