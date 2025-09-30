import React from 'react';
import { TwitterIcon } from './icons/TwitterIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { GithubIcon } from './icons/GithubIcon';
import { ProductHuntIcon } from './icons/ProductHuntIcon';
import { AngelListIcon } from './icons/AngelListIcon';

const ServiceButton: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <button type="button" className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-colors">
        {children}
    </button>
);

const FormInput: React.FC<{id: string, label: string, type?: string, optional?: boolean}> = ({ id, label, type = 'text', optional = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-bold text-gray-800 mb-2">
      {label} {optional && <span className="text-gray-500 font-normal">(optional)</span>}
    </label>
    <input type={type} id={id} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-shadow" />
  </div>
);

const FormSelect: React.FC<{id: string, label: string, description: string, children: React.ReactNode}> = ({ id, label, description, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-bold text-gray-800 mb-2">{label}</label>
    <p className="text-xs text-gray-500 mb-2">{description}</p>
    <select id={id} className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-shadow">
      {children}
    </select>
  </div>
);

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="font-heading text-3xl sm:text-4xl font-light text-gray-800">Need a Full Stack Developer? <span className="font-semibold text-brand-blue">Let's Build Something.</span></h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 bg-white p-8 sm:p-12 rounded-lg shadow-xl">
            <p className="text-gray-600 mb-8">I'm ready to hear about your project. Don't hesitate to get in touch with me using the contact form.</p>
            <form className="space-y-8">
              <FormSelect id="project-type" label="What type of project do you need completed?" description="This will help me understand the basic needs of your project and set the right budget and timeline expectations.">
                  <option>Select Project Type</option>
                  <option>New Website</option>
                  <option>Existing Website Redesign</option>
                  <option>Web Application</option>
                  <option>Mobile Application</option>
              </FormSelect>
              
              <div>
                 <label className="block text-sm font-bold text-gray-800 mb-2">Which services do you need?</label>
                 <p className="text-xs text-gray-500 mb-2">Please specify the type level of completion you'd like me to deliver on this project.</p>
                 <div className="flex flex-wrap gap-3">
                    <ServiceButton>Development</ServiceButton>
                    <ServiceButton>Development & Design</ServiceButton>
                    <ServiceButton>Development & Design & SEO</ServiceButton>
                    <ServiceButton>SEO</ServiceButton>
                    <ServiceButton>Other</ServiceButton>
                 </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FormSelect id="budget" label="What's the budget for your project?" description="This will help me guide you toward the most appropriate solution.">
                    <option>Select Budget</option>
                    <option>$1,000 - $5,000</option>
                    <option>$5,000 - $10,000</option>
                    <option>$10,000 - $25,000</option>
                    <option>$25,000+</option>
                </FormSelect>
                <FormSelect id="timeline" label="When do you need this completed?" description="Select the option that best expresses your expectations.">
                    <option>Select Completion Time</option>
                    <option>Within 1 Month</option>
                    <option>1-3 Months</option>
                    <option>3-6 Months</option>
                    <option>6+ Months</option>
                </FormSelect>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FormInput id="fullName" label="Full Name" />
                <FormInput id="email" label="Email" type="email" />
              </div>
              
              <FormInput id="website" label="Website URL" type="url" optional />

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-800 mb-2">Your Message</label>
                <textarea id="message" rows={6} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-shadow"></textarea>
              </div>

              <div>
                <button type="submit" className="w-full bg-brand-blue text-white font-bold py-4 px-6 rounded-md hover:bg-brand-blue-dark transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
                  SEND MESSAGE
                </button>
              </div>
            </form>
          </div>
          
          <div className="space-y-10 mt-8 lg:mt-0">
            <div>
              <h4 className="font-heading font-bold text-gray-800 text-xl">Email</h4>
              <a href="mailto:mail@andrejgajdos.com" className="text-brand-blue hover:underline text-lg">mail@andrejgajdos.com</a>
            </div>
            <div>
              <h4 className="font-heading font-bold text-gray-800 text-xl">Connect</h4>
              <div className="flex space-x-4 mt-3">
                  <a href="#" className="text-gray-500 hover:text-brand-blue transition-colors"><TwitterIcon className="w-7 h-7" /></a>
                  <a href="#" className="text-gray-500 hover:text-brand-blue transition-colors"><LinkedInIcon className="w-7 h-7" /></a>
                  <a href="#" className="text-gray-500 hover:text-brand-blue transition-colors"><GithubIcon className="w-7 h-7" /></a>
                  <a href="#" className="text-gray-500 hover:text-brand-blue transition-colors"><ProductHuntIcon className="w-7 h-7" /></a>
                  <a href="#" className="text-gray-500 hover:text-brand-blue transition-colors"><AngelListIcon className="w-7 h-7" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;