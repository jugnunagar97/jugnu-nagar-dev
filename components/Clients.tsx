import React from 'react';
import { CLIENTS } from '../constants';

const Clients: React.FC = () => {
  return (
    <section className="bg-white border-y border-gray-200 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-12 gap-y-6">
          {CLIENTS.map((client) => (
            <span 
              key={client} 
              className="font-heading text-gray-500 font-semibold text-lg filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;