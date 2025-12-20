import React from "react";
import { motion } from "framer-motion";
import { cn } from "../src/lib/utils";

// --- DATA: The 3 Specific Reviews ---
const TESTIMONIALS = [
  {
    project: "Task Partner",
    quote: "I had this idea for a marketplace but didn't know where to start. Jugnu didn't just write the code; he sat down with me and planned the whole user flow. We went live in 6 weeks and it just works.",
    author: "Aditi Verma",
    role: "Founder",
    stat: "6 Weeks to Launch",
  },
  {
    project: "Foundation Brothers",
    quote: "Our old site was slow and didn't show up on Google at all. Jugnu rebuilt it completely. Now it loads instantly and our leads have actually doubled. Best part? He explains everything in plain English.",
    author: "Rajeev Sharma",
    role: "Founder",
    stat: "2x Leads",
  },
  {
    project: "Lease Ezy",
    quote: "We were drowning in spreadsheets before this. The platform Jugnu built is a lifesaver saves us roughly 20 hours every week. It's simple, fast, and exactly what our property managers needed.",
    author: "Kapil Kumar",
    role: "Founder",
    stat: "20hrs Saved/Week",
  },
];

const TestimonialCard: React.FC<{ review: typeof TESTIMONIALS[0]; index: number }> = ({ review, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      viewport={{ once: true }}
      className="relative p-8 rounded-3xl bg-neutral-900/50 border border-white/10 hover:border-blue-500/30 transition-colors duration-500 group flex flex-col h-full"
    >
      {/* Decorative Quote Icon */}
      <div className="absolute top-6 right-8 text-7xl font-serif text-white/5 select-none leading-none">
        "
      </div>

      {/* Project Tag */}
      <div className="mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {review.project}
        </span>
      </div>

      {/* Quote */}
      <p className="text-neutral-300 text-lg leading-relaxed flex-grow relative z-10">
        {review.quote}
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-white/10 my-6" />

      {/* Footer: Author & Stat */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white font-bold text-base">{review.author}</h4>
          <p className="text-neutral-500 text-sm">{review.role}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Impact</p>
          <p className="text-white font-bold text-sm bg-white/10 px-2 py-1 rounded">{review.stat}</p>
        </div>
      </div>

    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-black relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Trusted by <span className="text-blue-500">Founders</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-neutral-400 text-lg"
          >
            Real feedback from the people I build for.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {TESTIMONIALS.map((review, index) => (
            <TestimonialCard key={review.project} review={review} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;