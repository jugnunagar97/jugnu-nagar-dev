import React from 'react';
import { MailIcon } from './icons/MailIcon';

const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.748 1.295 2.536 0 3.284L7.279 20.99c-1.25.722-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);


const About: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white font-nunito">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-wider text-gray-800">FROM SOLO FOUNDERS TO GROWING STARTUPS</h2>
          <div className="w-20 h-1 bg-brand-blue mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="text-lg text-gray-600 space-y-6 text-left leading-relaxed">
          <p>
            I remember my first production outage. It taught me more than any textbook ever could. Now, I use that experience to build bulletproof apps for my clients.
          </p>
          <p>
            Whether you're a startup needing an MVP or a scale-up fighting technical debt, I've been there. I create fast, clean, and maintainable web applications, ready to scale from a few users to thousands.
          </p>
          <p>
            I’ve successfully delivered over 20 projects for a range of clients, from solo founders to digital agencies. I don't just hand over code; I make sure it solves your actual business problem.
          </p>
          <p>
            I offer my services as a full stack developer for hire. Feel free to get in touch. I'm available during the week to discuss your project.
          </p>
          <div className="flex items-center justify-start pt-4">
            <MailIcon className="w-6 h-6 text-brand-blue mr-3" />
            <a href="mailto:dev.nagarjugnu@gmail.com" className="text-brand-blue font-semibold hover:underline">
              dev.nagarjugnu@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;