import React from 'react';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { GearsIcon } from './icons/GearsIcon';
import { StarIcon } from './icons/StarIcon';

const ValueCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
    <div className="flex justify-center items-center mb-4">
      <div className="bg-blue-100 text-brand-blue rounded-full p-4">
        {icon}
      </div>
    </div>
    <h3 className="font-heading text-xl font-semibold text-gray-800 tracking-wider">{title}</h3>
    <p className="mt-4 text-gray-600 leading-relaxed">{children}</p>
  </div>
);

const ValueProposition: React.FC = () => {
  return (
    <section id="process" className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-light text-gray-800 max-w-3xl mx-auto leading-snug">
          I Turn Complex Web Applications Into <span className="font-semibold text-brand-blue">Beautiful Experiences</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-16 max-w-6xl mx-auto">
          <ValueCard title="EXPERIENCE" icon={<BriefcaseIcon className="w-8 h-8"/>}>
            I have worked for digital agencies, big companies, startups and solo founders. With over 10 years' experience, I know where the pitfalls are in custom web applications and website projects, and how to guide you through safely.
          </ValueCard>
          <ValueCard title="PROCESS" icon={<GearsIcon className="w-8 h-8"/>}>
            My detailed, step-by-step process ensures we don't miss crucial elements. Before coding, I do an extensive road-mapping session to define S.M.A.R.T. (specific, measurable, attainable, relevant, time-bound) goals for the project.
          </ValueCard>
          <ValueCard title="SATISFACTION" icon={<StarIcon className="w-8 h-8"/>}>
            I continuously test features to ensure the application behaves properly and catch bugs early. One-off projects often turn into long-term relationships, with clients enjoying ongoing guidance and support long after launch.
          </ValueCard>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;