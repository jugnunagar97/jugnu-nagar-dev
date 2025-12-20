import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MailIcon } from './icons/MailIcon';

const ContactSection: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');

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
    <section id="contact" className="py-32 bg-neutral-950 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="text-blue-500">Ship?</span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Tell me what you're building. I'm direct. If I'm not the right fit, I'll tell you. If I am, we'll build something great.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8 md:p-12"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-neutral-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="reply_to" className="block text-sm font-medium text-neutral-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="reply_to"
                    name="reply_to"
                    required
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                  placeholder="Tell me about your project, timeline, and what you're looking to achieve..."
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Status Messages */}
              {status === 'ok' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm"
                >
                  ✓ Message sent successfully. I'll get back to you within 24 hours.
                </motion.div>
              )}
              {status === 'err' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                >
                  Something went wrong. Please try emailing directly at{' '}
                  <a href="mailto:dev.nagarjugnu@gmail.com" className="underline hover:text-red-300">
                    dev.nagarjugnu@gmail.com
                  </a>
                </motion.div>
              )}
            </form>

            {/* Alternative Contact */}
            <div className="mt-12 pt-8 border-t border-neutral-800">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-neutral-400">
                <div className="flex items-center gap-3">
                  <MailIcon className="w-5 h-5 text-blue-500" />
                  <a
                    href="mailto:dev.nagarjugnu@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    dev.nagarjugnu@gmail.com
                  </a>
                </div>
                <span className="hidden sm:inline text-neutral-600">•</span>
                <p className="text-sm">
                  Typically responds within 24 hours
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

