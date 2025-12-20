import React from "react";
import { motion } from "framer-motion";
import { cn } from "../src/lib/utils";
import profileImg from './jugnu-nagar.jpg'; // Keep your image
import { GithubIcon } from './icons/GithubIcon';

// --- SPOTLIGHT COMPONENT ---
const Spotlight = ({ className, fill = "white" }: { className?: string; fill?: string }) => {
  return (
    <svg
      className={cn(
        "animate-spotlight pointer-events-none absolute z-[1]  h-[169%] w-[138%] lg:w-[84%] opacity-0",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 229.109)"
          fill={fill}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
        </filter>
      </defs>
    </svg>
  );
};

// --- BACKGROUND GRID ---
const GridBackground = () => (
  <div className="h-full w-full dark:bg-black bg-black bg-grid-white absolute top-0 left-0 flex items-center justify-center">
    {/* Radial gradient for the container to give a faded look */}
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center, transparent_20%, black)]"></div>
  </div>
);

const Hero = () => {
  return (
    <section className="h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* 1. The Moving Spotlight */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      <GridBackground />

      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-blue-400 uppercase mb-4">
                Full Stack Developer & Architect
              </h2>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50"
            >
              Engineering the <br />
              <span className="text-blue-500">Digital Future.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 font-normal text-base text-neutral-300 max-w-lg mx-auto md:mx-0 leading-relaxed"
            >
              I build pixel-perfect, engaging, and accessible digital experiences. 
              Currently architecting scalable solutions for <span className="text-blue-400 font-semibold">Apple</span> and <span className="text-blue-400 font-semibold">Binance</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
            >
               {/* Custom Button with moving border gradient */}
               <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl hover:bg-slate-900 transition-colors">
                    View My Work
                  </span>
                </button>
                
                <button className="text-neutral-300 hover:text-white transition-colors font-medium px-6">
                  Contact Me
                </button>
                
                <motion.a
                  href="https://github.com/dev-nagarjugnu"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-neutral-700 bg-neutral-900/50 hover:bg-neutral-800 hover:border-blue-500/50 text-neutral-300 hover:text-white transition-all"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5" />
                </motion.a>
            </motion.div>
          </div>

          {/* Image with Floating/Hover Effect */}
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
                {/* Glowing orb behind */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-[80px] opacity-50 animate-pulse"></div>
                
                <motion.div 
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                >
                    <img src={profileImg} alt="Jugnu" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                    
                    {/* Glass overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                         <div className="flex gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500"></span>
                            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                         </div>
                    </div>
                </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
      
      <style>{`
        .bg-grid-white\/\[0\.02\] { background-size: 40px 40px; background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px); }
        .bg-grid-black\/\[0\.04\] { background-size: 40px 40px; background-image: linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px); }
        @keyframes spotlight {
          0% { opacity: 0; transform: translate(-72%, -62%) scale(0.5); }
          100% { opacity: 1; transform: translate(-50%,-40%) scale(1); }
        }
        .animate-spotlight { animation: spotlight 2s ease .75s 1 forwards; }
      `}</style>
    </section>
  );
};

export default Hero;