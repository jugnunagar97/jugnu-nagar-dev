import React from 'react';
import { TESTIMONIALS_DATA } from '../constants';

const QuoteMark = () => (
  <span className="absolute top-4 left-5 text-5xl text-brand-200/60 select-none">“</span>
);

const TestimonialCard: React.FC<{ quote: string; author: string; company: string; index: number }> = ({ quote, author, company, index }) => {
  const stats = getStats(index);
  return (
    <div className="group relative [perspective:1200px]">
      <div className="relative h-full min-h-[240px] rounded-2xl bg-white ring-1 ring-gray-100 shadow-soft p-6 md:p-7 flex flex-col [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 p-6 md:p-7 flex flex-col justify-between rounded-2xl overflow-hidden [backface-visibility:hidden]">
          <QuoteMark />
          <p className="text-gray-700 leading-relaxed">{quote}</p>
          <div className="mt-5 pt-4 border-t border-gray-100">
            <p className="font-heading font-semibold text-gray-900">{author}</p>
            <p className="text-gray-500 text-sm">{company}</p>
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 p-6 md:p-7 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-brand-50 to-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div>
            <p className="font-heading text-sm tracking-wider text-brand-700">Project impact</p>
            <h4 className="font-heading text-xl font-semibold text-gray-900 mt-1">Key outcomes</h4>
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <li key={s.label} className="rounded-xl ring-1 ring-gray-200 bg-white px-3 py-2 text-center">
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="font-heading font-semibold text-gray-900">{s.value}</p>
              </li>
            ))}
          </ul>
          <div className="mt-5 text-xs text-gray-500">Hover to flip • Data anonymized</div>
        </div>
      </div>
    </div>
  );
};

function getStats(i: number) {
  const presets = [
    [
      { label: 'Time to launch', value: '6 weeks' },
      { label: 'Core Web Vitals', value: '95+%' },
      { label: 'Uptime', value: '99.99%' },
      { label: 'Coverage', value: '85% tests' },
    ],
    [
      { label: 'Signup uplift', value: '+32%' },
      { label: 'Page speed', value: '1.2s LCP' },
      { label: 'Users onboarded', value: '10k+' },
      { label: 'Bugs post‑launch', value: '0 Sev‑1' },
    ],
    [
      { label: 'API latency', value: '-40%' },
      { label: 'Error rate', value: '-65%' },
      { label: 'Deploys/week', value: '15' },
      { label: 'SEO clicks', value: '+48%' },
    ],
  ];
  return presets[i % presets.length];
}

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32 bg-gradient-to-b from-white to-gray-50">
      {/* Animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto">
          <p className="font-heading text-xs tracking-[0.25em] text-brand-700 uppercase">Social Proof</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-wider text-gray-900">What clients say</h2>
          <p className="mt-3 text-gray-500">Real feedback from product leaders and engineers I’ve worked with.</p>
          <div className="w-20 h-1 bg-brand-blue mx-auto mt-6 rounded-full" />
        </div>
        
        {/* Rotating marquee row - pauses on hover */}
        <div className="mt-14 overflow-hidden py-2 relative">
          {/* Edge masks for nicer cut-off */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-gray-50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-gray-50 to-transparent" />
          <div className="flex gap-5 sm:gap-6 lg:gap-8 px-3 animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
            {[...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA].map((t, idx) => (
              <div key={idx} className="basis-[320px] sm:basis-[360px] lg:basis-[420px] flex-shrink-0">
                <TestimonialCard quote={t.quote} author={t.author} company={t.company} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;