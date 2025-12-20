import React from "react";
import { motion } from "framer-motion";
import { cn } from "../src/lib/utils";

// --- 1. ICONS (Simple, Abstract, Tech-focused) ---
const CodeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const RocketIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const LayersIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const BoltIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

// --- 2. DATA: The Services ---
const SERVICES = [
  {
    title: "MVP Development",
    description: "You have an idea. I turn it into a shipping product in weeks, not months. No fluff, just core features that work.",
    icon: RocketIcon,
    tags: ["React", "Node", "Supabase"],
  },
  {
    title: "Web Applications",
    description: "Dashboards, SaaS platforms, internal tools. I build complex systems that are reliable, secure, and ready to scale.",
    icon: LayersIcon,
    tags: ["Next.js", "PostgreSQL", "AWS"],
  },
  {
    title: "Performance & Fixes",
    description: "Site slow? Buggy? I audit your codebase, optimize Core Web Vitals, and squash bugs that others missed.",
    icon: BoltIcon,
    tags: ["Audit", "Optimization", "Debug"],
  },
  {
    title: "Frontend Architecture",
    description: "Translating Figma designs into pixel-perfect, responsive code. Smooth animations, accessibility, and clean component structure.",
    icon: CodeIcon,
    tags: ["Tailwind", "Framer Motion", "UI/UX"],
  },
];

// --- 3. COMPONENT: Service Card with Hover Effect ---
const ServiceCard: React.FC<{ service: typeof SERVICES[0]; index: number }> = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative p-8 rounded-3xl border border-white/10 bg-neutral-900/50 hover:bg-neutral-800/80 transition-colors duration-500 overflow-hidden"
    >
      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon & Index */}
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:scale-110 transition-transform duration-500">
            <service.icon className="w-6 h-6" />
          </div>
          <span className="text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
            0{index + 1}
          </span>
        </div>

        {/* Title & Desc */}
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
          {service.title}
        </h3>
        <p className="text-neutral-400 leading-relaxed mb-6 flex-grow">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-neutral-300 border border-white/5 group-hover:border-white/20 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- 4. MAIN COMPONENT ---
const Services = () => {
  return (
    <section id="services" className="py-24 sm:py-32 bg-black relative w-full overflow-hidden">

      {/* Background Gradients/Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[128px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Header Section (Left Side on Desktop) */}
          <div className="lg:col-span-4 sticky top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-bold tracking-[0.2em] text-blue-500 uppercase mb-6 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-blue-500 inline-block" />
                Services
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                I Don't Just Write Code. <br /> <span className="text-neutral-500">I Solve Problems.</span>
              </h3>
              <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                You don't need another generic agency. You need a partner who understands your vision and has the technical skills to execute it. I handle the entire stack so you can focus on growing your business.
              </p>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-white font-semibold group hover:text-blue-400 transition-colors"
              >
                Start a project
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Cards Grid (Right Side) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;
