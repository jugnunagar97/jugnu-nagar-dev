import React from 'react';
import { motion } from 'framer-motion';

// --- IMPORT YOUR NEW JAW-DROPPING COMPONENTS ---
import Hero from './Hero'; 
import Work from './Work';
import Skills from './Skills';

// --- REMAINING SECTIONS (Now enhanced with Motion) ---
// We keep these here for now, but wrapped in Motion for smoothness

// 1. SERVICES SECTION (Updated with Hover Effects)
const ServicesSection = () => {
    const services = [
        { title: "MVP Development", desc: "Rapid prototyping to production." },
        { title: "Scalable Backends", desc: "Node.js & Microservices architectures." },
        { title: "Interactive UI", desc: "React 19 & High-performance animations." },
        { title: "Cloud Native", desc: "AWS, Vercel, and Docker orchestration." },
    ];

    return (
        <section className="py-24 bg-neutral-900 text-white">
            <div className="container mx-auto px-4">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-bold text-center mb-16"
                >
                    Technical <span className="text-blue-500">Mastery</span>
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05, backgroundColor: "#171717" }}
                            className="p-8 border border-neutral-800 rounded-2xl bg-black hover:border-blue-500/50 transition-colors"
                        >
                            <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                            <p className="text-neutral-400">{s.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 2. CONTACT SECTION (Dark Mode Optimized)
const ContactSection = () => {
    return (
        <section className="py-32 bg-black text-white relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.h2 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-4xl md:text-6xl font-bold mb-8"
                >
                    Ready to scale?
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-neutral-400 mb-12"
                >
                    Let's build something extraordinary together.
                </motion.p>
                <motion.a 
                    href="mailto:dev.nagarjugnu@gmail.com"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block bg-white text-black font-bold text-lg px-10 py-4 rounded-full hover:bg-blue-50 transition-colors"
                >
                    Start a Project
                </motion.a>
            </div>
        </section>
    );
};

// --- MAIN HOME COMPONENT ---
const Home: React.FC = () => {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-blue-500 selection:text-white">
      
      {/* 1. The New Motion Hero */}
      <Hero />

      {/* 2. The New Skills Section */}
      <Skills />

      {/* 3. The New 3D Work Section */}
      <Work />

      {/* 4. Enhanced Inline Sections */}
      <ServicesSection />
      <ContactSection />
      
    </main>
  );
};

export default Home;