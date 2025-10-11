import React from 'react';
import { Link } from 'react-router-dom';
import profileImg from './jugnu-nagar.jpg';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50/40 py-24 sm:py-32 lg:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className="font-heading text-sm tracking-wider text-brand-blue mb-3 uppercase">Jugnu Nagar — Full Stack Developer</p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-tight">
              Building clean, fast, and scalable web apps.
            </h1>
            <p className="mt-5 text-gray-600 max-w-2xl mx-auto lg:mx-0">I design and develop polished user experiences and robust backends for startups and teams. From MVP to production, I ship quality software end-to-end.</p>
            <div className="mt-10 flex items-center justify-center lg:justify-start">
              <Link 
                to={{ pathname: '/', state: { scrollTarget: 'about' } }}
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    const el = document.getElementById('about');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }}
                className="inline-flex items-center justify-center bg-brand-blue text-white py-4 px-10 text-sm font-bold tracking-widest uppercase rounded-md shadow-lg hover:bg-brand-blue-dark transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50"
              >
                FIND OUT MORE
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Outer glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full opacity-60 blur-2xl"></div>
              
              {/* Animated orbiting lines container */}
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                {/* Outer orbit ring */}
                <div className="absolute inset-0 rounded-full border border-blue-200/30 animate-spin-slow">
                  <div className="absolute top-0 left-1/2 w-1 h-1 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-blue-400 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
                </div>
                
                {/* Middle orbit ring */}
                <div className="absolute inset-4 rounded-full border border-indigo-200/40 animate-spin-reverse">
                  <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-indigo-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute right-0 top-1/2 w-1.5 h-1.5 bg-indigo-400 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                </div>
                
                {/* Inner orbit ring */}
                <div className="absolute inset-8 rounded-full border border-purple-200/50 animate-spin-slow">
                  <div className="absolute top-0 left-1/2 w-1 h-1 bg-purple-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 right-0 w-1 h-1 bg-purple-400 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
                </div>
                
                {/* Floating particles */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-300 rounded-full animate-pulse-slow"></div>
                  <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-indigo-300 rounded-full animate-pulse-slow delay-1000"></div>
                  <div className="absolute top-1/2 left-1/6 w-0.5 h-0.5 bg-purple-300 rounded-full animate-pulse-slow delay-2000"></div>
                  <div className="absolute bottom-1/4 right-1/6 w-0.5 h-0.5 bg-blue-300 rounded-full animate-pulse-slow delay-3000"></div>
                </div>
                
                {/* Central photo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src={profileImg} 
                    alt="Jugnu Nagar"
                    loading="lazy"
                    width="384" height="384"
                    className="rounded-full w-72 h-72 md:w-80 md:h-80 object-cover shadow-2xl relative z-10"
                  />
                </div>
                
                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50/20 to-indigo-50/20 blur-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;