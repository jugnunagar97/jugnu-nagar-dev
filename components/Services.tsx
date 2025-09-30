import React from 'react';

type Service = {
  title: string;
  subtitle: string;
  bullets: string[];
  cta?: { label: string; href: string };
  icon: React.ReactNode;
  badge?: string;
};

const SectionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M12 3l7.5 4.33v9.34L12 21l-7.5-4.33V7.33L12 3z" />
  </svg>
);

const CodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M9 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloudIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M7 18a5 5 0 010-10 6 6 0 0111.31 2.5H19a4 4 0 010 8H7z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const services: Service[] = [
  {
    title: 'MVP Development',
    subtitle: 'Ship a polished product fast',
    bullets: [
      'Rapid UX prototyping and iteration',
      'Type-safe React + Node foundations',
      'Production-ready auth, payments, emails',
    ],
    icon: <SectionIcon className="w-7 h-7" />,
    badge: 'Popular',
  },
  {
    title: 'Web Applications',
    subtitle: 'Reliable, scalable, maintainable',
    bullets: [
      'Clean architecture and DX focus',
      'API design, caching and performance',
      'E2E, unit testing and CI/CD',
    ],
    icon: <CodeIcon className="w-7 h-7" />,
  },
  {
    title: 'Cloud & Backends',
    subtitle: 'Deploy with confidence',
    bullets: [
      'AWS/Firebase/Vercel deployments',
      'Observability and logging',
      'Security, roles and data privacy',
    ],
    icon: <CloudIcon className="w-7 h-7" />,
  },
  {
    title: 'E‑commerce Platforms',
    subtitle: 'Conversion‑focused storefronts',
    bullets: [
      'Product catalog, search, filters',
      'Stripe/PayPal checkout & subscriptions',
      'Order management and analytics',
    ],
    icon: <SectionIcon className="w-7 h-7" />,
  },
  {
    title: 'AI Features & Integrations',
    subtitle: 'Enhance UX with AI',
    bullets: [
      'Chat assistants and content generation',
      'Vector search and embeddings',
      'OpenAI/Claude integration with safety guardrails',
    ],
    icon: <CodeIcon className="w-7 h-7" />,
    badge: 'New',
  },
  {
    title: 'Performance & SEO',
    subtitle: 'Make it fast and discoverable',
    bullets: [
      'Core Web Vitals optimization',
      'Image/CDN strategy and caching',
      'Schema, sitemaps, and on‑page SEO',
    ],
    icon: <CloudIcon className="w-7 h-7" />,
  },
  {
    title: 'Design Systems & UI Kits',
    subtitle: 'Consistent UI at scale',
    bullets: [
      'Reusable components and tokens',
      'Accessibility (WCAG) baked‑in',
      'Storybook docs and theming',
    ],
    icon: <SectionIcon className="w-7 h-7" />,
  },
  {
    title: 'Maintenance & Support',
    subtitle: 'Stay secure and up‑to‑date',
    bullets: [
      'Upgrades, patches and monitoring',
      'Bug triage and incident response',
      'Monthly reports and roadmap',
    ],
    icon: <CloudIcon className="w-7 h-7" />,
  },
];

const ServiceCard: React.FC<{ item: Service; index: number }> = ({ item, index }) => (
  <div className="group relative">
    <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-200/40 via-transparent to-brand-200/40 opacity-0 group-hover:opacity-100 blur-2xl transition" />
    <div className="relative rounded-2xl bg-white ring-1 ring-gray-100 shadow-soft p-8 transition-transform hover:-translate-y-1 min-h-[260px]">
      <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-400/60 via-brand-600 to-brand-400/60 opacity-60" />
      <div className="flex items-center gap-3 text-brand-600">
        <div className="p-2.5 rounded-xl bg-brand-50 text-brand-700">{item.icon}</div>
        <h3 className="font-heading text-xl font-semibold text-gray-900">{item.title}</h3>
        {item.badge && (
          <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-brand-100 text-brand-700">{item.badge}</span>
        )}
      </div>
      <p className="mt-3 text-gray-600">{item.subtitle}</p>
      <ul className="mt-5 space-y-2">
        {item.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500" />
            <span className="text-gray-700">{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="relative py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white">
      <span className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-brand-200/30 blur-3xl" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="font-heading text-xs tracking-[0.25em] text-brand-700 uppercase">What I Do</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-wider text-gray-900">Services</h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">Everything required to plan, build and launch a polished product, end-to-end.</p>
          <div className="w-20 h-1 bg-brand-blue mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <ServiceCard key={s.title} item={s} index={i} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <a href="#contact" className="inline-flex items-center justify-center bg-gray-900 text-white py-3 px-8 text-sm font-bold uppercase tracking-widest rounded-md hover:bg-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400">Discuss your project</a>
        </div>
      </div>
    </section>
  );
};

export default Services;


