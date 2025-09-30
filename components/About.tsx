import React from 'react';
import { MailIcon } from './icons/MailIcon';

const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.748 1.295 2.536 0 3.284L7.279 20.99c-1.25.722-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
);


const About: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-wider text-gray-800">ABOUT ME</h2>
          <div className="w-20 h-1 bg-brand-blue mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="text-lg text-gray-600 space-y-6 text-left leading-relaxed">
          <p>
            I am a freelance full-stack developer. I have a strong background as a software architect and have successfully led teams as a <a href="#" className="text-brand-blue font-semibold hover:underline">fractional CTO</a>. I have worked with clients from diverse industries worldwide. I have successfully delivered over 20 projects for a range of clients, including solo founders, early stage startups, growing startups, digital agencies, and notable companies like Apple and Binance.
          </p>
          <p>
            I create fast, clean, and maintainable web applications, ready to scale from few users to thousands. I can help you deliver a seamless and engaging experience to your users. Background in computer science and ability as a full-stack developer (front-end and back-end) allow me to create everything from small business websites to custom web applications.
          </p>
          <p>
            I have over 10 years of experience in delivering web applications and I like making life better through technology. My work currently consists of freelance clients and side projects. My freelance full stack development roots are in React, Next.js, Node.js and others.
          </p>
          <p>
            I offer my services as a full stack developer for hire to work with businesses of all sizes. Feel free to get in touch. I'm available during the week to discuss and advise on your project or development needs.
          </p>
          <div className="flex items-center justify-start pt-4">
            <MailIcon className="w-6 h-6 text-brand-blue mr-3" />
            <a href="mailto:mail@andrejgajdos.com" className="text-brand-blue font-semibold hover:underline">
              mail@andrejgajdos.com
            </a>
          </div>
        </div>

        <div className="mt-20 shadow-2xl rounded-lg overflow-hidden relative group">
          <a 
              href="https://vimeo.com/299651375" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Watch intro video on Vimeo"
              className="block"
          >
              <img 
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Video thumbnail of a business meeting"
                  className="w-full h-auto aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-white rounded-full p-3 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <PlayIcon className="w-10 h-10 text-brand-blue" />
                  </div>
              </div>
          </a>
        </div>


        <div className="mt-20 text-center text-gray-600 leading-relaxed max-w-3xl mx-auto">
            <h3 className="font-heading text-2xl font-semibold text-gray-800 mb-4">What is a full stack developer?</h3>
            <p>
                A full stack developer has the functional knowledge and ability to take a concept and turn it into a finished product. A full stack developer should have knowledge in front end and back end development. Front end developers build the visible parts of applications that users see and interact with. Back end developers on the other hand, are responsible for building the parts the user does not see, which include core computational logic, server and database.
            </p>
        </div>
      </div>
    </section>
  );
};

export default About;