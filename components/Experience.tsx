import React from "react";
import { motion } from "framer-motion";
import { EXPERIENCE_DATA } from "../constants";

const ExperienceCard: React.FC<{ experience: typeof EXPERIENCE_DATA[0]; index: number }> = ({ experience, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="relative pl-8 md:pl-0"
        >
            {/* Timeline Line (Desktop Center, Mobile Left) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-800 -translate-x-1/2" />
            <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-neutral-800" />

            <div className={`md:flex items-center justify-between ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>

                {/* Empty Space for Timeline Balance */}
                <div className="hidden md:block w-5/12" />

                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-black -translate-x-1.5 md:-translate-x-1/2 mt-1.5 z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

                {/* Card Content */}
                <div className="md:w-5/12 mb-10 md:mb-0">
                    <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10 hover:border-blue-500/30 transition-colors duration-300">
                        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full">
                            {experience.period}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-1">{experience.role}</h3>
                        <p className="text-neutral-400 text-sm font-medium mb-4">{experience.company}</p>
                        <p className="text-neutral-300 leading-relaxed text-sm mb-6">
                            {experience.description}
                        </p>

                        {/* Tech Stack Tags */}
                        <div className="flex flex-wrap gap-2">
                            {experience.tools.map((tool) => (
                                <span key={tool} className="px-2 py-1 text-xs text-neutral-400 bg-white/5 rounded border border-white/5">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

const Experience = () => {
    // We add a "Education" or "Background" item to make the timeline look better, 
    // but keep it accurate to the user's "Freelance" persona. 
    // Since user only has one entry in constants, we'll render that, and maybe an "Education" block if it existed.
    // For now, we'll just render the EXPERIENCE_DATA. If it's single, it will still look good.

    return (
        <section id="experience" className="py-24 bg-black relative">
            <div className="container mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Professional <span className="text-blue-500">Journey</span>
                    </motion.h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full" />
                </div>

                {/* Timeline */}
                <div className="relative max-w-4xl mx-auto">
                    {EXPERIENCE_DATA.length > 0 ? (
                        EXPERIENCE_DATA.map((exp, index) => (
                            <ExperienceCard key={index} experience={exp} index={index} />
                        ))
                    ) : (
                        <div className="text-center text-neutral-500">No experience data found.</div>
                    )}

                    {/* "Start" Dot at the bottom to close the loop */}
                    <div className="absolute left-0 md:left-1/2 bottom-0 w-3 h-3 rounded-full bg-neutral-800 -translate-x-1 md:-translate-x-1/2 translate-y-full" />
                </div>

            </div>
        </section>
    );
};

export default Experience;
