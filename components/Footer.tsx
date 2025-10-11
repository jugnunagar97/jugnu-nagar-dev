import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { TwitterIcon } from './icons/TwitterIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { GithubIcon } from './icons/GithubIcon';
import { ProductHuntIcon } from './icons/ProductHuntIcon';
import { AngelListIcon } from './icons/AngelListIcon';

const socialLinks = [
  { href: 'https://x.com/serp_guy', icon: TwitterIcon, name: 'Twitter' },
  { href: 'https://in.linkedin.com/in/jugnu-nagar', icon: LinkedInIcon, name: 'LinkedIn' },
];

const Footer: React.FC = () => {
  const workLink = NAV_LINKS.find(l => l.label === 'Work');
  const servicesLink = NAV_LINKS.find(l => l.label === 'Services');

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-heading text-xl font-semibold text-white">Jugnu Nagar</h3>
            <a href="mailto:dev.nagarjugnu@gmail.com" className="block text-gray-400 hover:text-white transition-colors text-sm mt-1">dev.nagarjugnu@gmail.com</a>
          </div>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            {socialLinks.map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                aria-label={social.name}
                className="text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 rounded"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Sitemap Link */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm">
              <Link 
                to="/sitemap" 
                className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 rounded-lg px-3 py-2 hover:bg-gray-800/50"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span className="font-medium">Sitemap</span>
                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <a 
                href="https://jugnunagar.dev/api/sitemap.xml" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 rounded-lg px-3 py-2 hover:bg-gray-800/50"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span className="font-medium">XML Sitemap</span>
                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Jugnu Nagar. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
