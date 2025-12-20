import type { SkillCategory, Experience, CodeSample, WorkProject, Testimonial, NavLink } from './types';

// FIX: Provided full content for constants.ts to resolve module errors.
export const PROFILE_IMAGE_URL = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80';

export const CLIENTS: string[] = [
  // 'Solo Founders', 'Startups', 'Agencies' // Placeholders
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
    description: 'A Fiverr-style marketplace for hiring virtual assistants for short-term gigs.',
    longDescription: 'Task Partner connects clients with virtual assistants. Users can post gigs, browse talent, and manage projects. It features secure messaging, project tracking, and a clean interface designed for real people, not just "users".',
    imageUrl: '/images/task-partner.png',
    tools: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'Vercel'],
    projectLink: 'https://taskpartner.us.cc/',
    githubLink: 'https://github.com/jugnunagar97/gig-snap',
  },
  {
    name: 'Foundation Brothers',
    description: 'Corporate website for a major construction firm in Rajasthan.',
    longDescription: 'A professional site for Foundation Brothers, showcasing their construction projects and interior design work. It’s built to convert visitors into clients with clear calls-to-action and a portfolio that loads instantly.',
    imageUrl: '/images/foundation-brothers.png',
    tools: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'Vercel'],
    projectLink: 'https://www.foundationbrothers.in/',
    githubLink: 'https://github.com/jugnunagar97/foundation-brothers',
  },
  {
    name: 'Lease Ezy',
    description: 'Lease management platform for property owners and tenants.',
    longDescription: 'Lease Ezy takes the headache out of rental management. Owners can track leases and payments, while tenants get a simple dashboard for their documents. No more lost emails or spreadsheets.',
    imageUrl: '/images/lease-ezy.png',
    tools: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Vercel'],
    projectLink: 'https://leaseezy.vercel.app/',
    githubLink: 'https://github.com/dev-nagarjugnu/leaseezy',
  },
  {
    name: 'SEO Website',
    description: 'SEO tools and services to help businesses rank higher.',
    longDescription: 'SEO Buddy helps businesses get found online. We built this to showcase SEO services, verify tools, and share resources. It’s optimized for speed—because Google cares about that just as much as keywords.',
    imageUrl: '/images/seo-website.png',
    tools: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Vercel'],
    projectLink: 'https://seobuddy-website.vercel.app/',
    githubLink: 'https://github.com/dev-nagarjugnu/seobuddy-website',
  }
];

export const WORK_PROJECTS = allProjects;
export const ALL_PROJECTS = allProjects;

export const TESTIMONIALS_DATA: Testimonial[] = [
  { quote: `Jugnu delivered our MVP in weeks, not months, without compromising on quality. Clear communication and strong ownership throughout.`, author: 'Sarah Nolan', company: 'Founder, Fintech Startup' },
  { quote: `Outstanding front-end work. Our Core Web Vitals improved across the board and conversions followed.`, author: 'Marco Ruiz', company: 'Head of Growth, DTC Brand' },
  { quote: `Rare mix of speed and craftsmanship. He set up CI, testing, and a design system that our team still uses daily.`, author: 'Priya Sharma', company: 'CTO, SaaS Company' },
  { quote: `Jugnu translated vague requirements into a crisp roadmap and shipped exactly what we needed.`, author: 'James Park', company: 'Product Lead, HealthTech' },
  { quote: `Our migration to a modern stack was seamless. Performance, stability, and developer experience all improved.`, author: 'Laura Kim', company: 'Tech Lead' },
  { quote: `He thinks like a product partner, not just a developer. Every feature came with thoughtful UX details.`, author: 'Daniel Cooper', company: 'Design Director, Agency' },
  { quote: `Great with stakeholders and timelines. Dependencies were flagged early and handled professionally.`, author: 'Ana Martins', company: 'Program Manager' },
  { quote: `Security and privacy were treated as first-class concerns from day one. Exactly what we needed.`, author: 'Omar Hassan', company: 'VP of Technology, Enterprise' },
  { quote: `The codebase he left is a joy to maintain. Clear structure, tests, and documentation saved us months.`, author: 'Rebecca Lee', company: 'Senior Developer' },
  { quote: `We launched on time and under budget. I’d hire Jugnu again without hesitation.`, author: 'Tom Wilkins', company: 'Founder, Marketplace Startup' },
  { quote: `Our internal tool adoption tripled after his UX revamp. Night-and-day difference.`, author: 'Irene Novak', company: 'Operations Lead' },
  { quote: `Jugnu’s calm under pressure kept the team focused during crunch. True professional.`, author: 'Victor Chen', company: 'Project Director' },
];