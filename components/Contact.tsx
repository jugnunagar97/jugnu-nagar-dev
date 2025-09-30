import React, { useRef, useState } from 'react';
import { TwitterIcon } from './icons/TwitterIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
// Removed extra socials to keep only Twitter and LinkedIn

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
    <input type={type} id={id} name={id} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-shadow" />
  </div>
);

const FormSelect: React.FC<{id: string, label: string, description: string, children: React.ReactNode}> = ({ id, label, description, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-bold text-gray-800 mb-2">{label}</label>
    <p className="text-xs text-gray-500 mb-2">{description}</p>
    <select id={id} name={id} className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-shadow">
      {children}
    </select>
  </div>
);

declare global { interface Window { emailjs: any } }

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'idle'|'ok'|'err'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || sending) return;
    try {
      setSending(true);
      setStatus('idle');
      const data = new FormData(formRef.current);
      const payload = {
        fullName: String(data.get('fullName') || ''),
        reply_to: String(data.get('reply_to') || ''),
        message: String(data.get('message') || ''),
      };
      const base = import.meta.env.VITE_API_BASE || '';
      const res = await fetch(`${base}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Mailer error');
      setStatus('ok');
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      setStatus('err');
    } finally {
      setSending(false);
    }
  };
  return (
    <section id="contact" className="py-24 sm:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="font-heading text-3xl sm:text-4xl font-light text-gray-800">Need a Full Stack Developer? <span className="font-semibold text-brand-blue">Let's Build Something.</span></h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 bg-white p-8 sm:p-12 rounded-lg shadow-xl">
            <p className="text-gray-600 mb-8">I'm ready to hear about your project. Don't hesitate to get in touch with me using the contact form.</p>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
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
                <FormInput id="reply_to" label="Email" type="email" />
              </div>
              
              <FormInput id="website" label="Website URL" type="url" optional />

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-800 mb-2">Your Message</label>
                <textarea id="message" name="message" rows={6} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-shadow"></textarea>
              </div>

              <div>
                <button disabled={sending} type="submit" className="w-full bg-brand-blue text-white font-bold py-4 px-6 rounded-md hover:bg-brand-blue-dark transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-60">
                  {sending ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
                {status === 'ok' && (
                  <div className="mt-4 rounded-md bg-green-50 text-green-800 border border-green-200 p-4 text-sm">
                    Thank you! Your message has been sent. We’ll get back to you shortly, and a copy was emailed to you.
                  </div>
                )}
                {status === 'err' && (
                  <div className="mt-4 rounded-md bg-red-50 text-red-800 border border-red-200 p-4 text-sm">
                    Sorry, something went wrong. Please try again or email us directly at <a href="mailto:dev.nagarjugnu@gmail.com" className="underline">dev.nagarjugnu@gmail.com</a>.
                  </div>
                )}
              </div>
            </form>
          </div>
          
          <div className="space-y-10 mt-8 lg:mt-0">
            <div>
              <h4 className="font-heading font-bold text-gray-800 text-xl">Email</h4>
              <a href="mailto:dev.nagarjugnu@gmail.com" className="text-brand-blue hover:underline text-lg">dev.nagarjugnu@gmail.com</a>
            </div>
            <div>
              <h4 className="font-heading font-bold text-gray-800 text-xl">Connect</h4>
              <div className="flex space-x-4 mt-3">
                  <a href="https://x.com/serp_guy" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-brand-blue transition-colors"><TwitterIcon className="w-7 h-7" /></a>
                  <a href="https://in.linkedin.com/in/jugnu-nagar" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-brand-blue transition-colors"><LinkedInIcon className="w-7 h-7" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;