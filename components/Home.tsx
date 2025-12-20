import React from 'react';
import { motion } from 'framer-motion';

// --- IMPORT YOUR NEW JAW-DROPPING COMPONENTS ---
import Hero from './Hero';
import Work from './Work';
import Skills from './Skills';
import ContactSection from './ContactSection';
import Services from './Services';
import Testimonials from './Testimonials';
import Experience from './Experience';

// --- MAIN HOME COMPONENT ---
const Home: React.FC = () => {
    return (
        <main className="bg-black min-h-screen text-white selection:bg-blue-500 selection:text-white">

            {/* 1. The New Motion Hero */}
            <Hero />

            {/* 2. The New Skills Section */}
            <Skills />

            {/* 3. The New Experience Section */}
            <Experience />

            {/* 4. The New 3D Work Section */}
            <Work />

            {/* 5. Enhanced Inline Sections */}
            <Services />
            <Testimonials />
            <ContactSection />

        </main>
    );
};

export default Home;