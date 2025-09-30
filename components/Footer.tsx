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

        <div className="mt-8 pt-6 border-t border-gray-800 text-left text-xs text-gray-500 max-w-6xl mx-auto">
          <p>&copy; {new Date().getFullYear()} Jugnu Nagar. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
