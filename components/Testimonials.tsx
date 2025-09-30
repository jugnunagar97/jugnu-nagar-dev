import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS_DATA } from '../constants';

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = window.setTimeout(
      () =>
        setActiveIndex((prevIndex) =>
          prevIndex === TESTIMONIALS_DATA.length - 1 ? 0 : prevIndex + 1
        ),
      7000 // Increased duration
    );

    return () => {
      resetTimeout();
    };
  }, [activeIndex]);

  const currentTestimonial = TESTIMONIALS_DATA[activeIndex];

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-wider text-gray-800">THINGS PEOPLE SAY</h2>
        <div className="w-20 h-1 bg-brand-blue mx-auto mt-4 rounded-full"></div>

        <div className="mt-16 relative min-h-[350px]">
           <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-8xl text-gray-200 font-serif opacity-50">“</span>
           <p className="text-lg sm:text-xl text-gray-600 leading-relaxed whitespace-pre-line italic">
            {currentTestimonial.quote}
          </p>
          <div className="mt-8">
            <p className="font-heading font-bold text-gray-800 text-lg">
              {currentTestimonial.author}
            </p>
            <p className="text-gray-500">{currentTestimonial.company}</p>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center space-x-3">
          {TESTIMONIALS_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'bg-brand-blue scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;