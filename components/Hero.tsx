import React from 'react';
import { PROFILE_IMAGE_URL } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className="font-heading text-lg text-brand-blue mb-4">Hi, my name is Andrej Gajdos</p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight">
              I'm a full stack developer specializing in building modern web applications.
            </h1>
            <a 
              href="#about"
              className="mt-10 inline-block bg-brand-blue text-white py-4 px-10 text-sm font-bold tracking-widest uppercase rounded-md shadow-lg hover:bg-brand-blue-dark transition-all duration-300 transform hover:scale-105"
            >
              FIND OUT MORE
            </a>
          </div>
          <div className="flex justify-center lg:justify-end">
             <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full opacity-60 blur-xl"></div>
                <img 
                  src={PROFILE_IMAGE_URL} 
                  alt="Andrej Gajdos"
                  className="relative rounded-full w-80 h-80 md:w-96 md:h-96 object-cover shadow-2xl"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;