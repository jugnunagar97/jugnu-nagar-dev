import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { TwitterIcon } from './icons/TwitterIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { GithubIcon } from './icons/GithubIcon';
import { ProductHuntIcon } from './icons/ProductHuntIcon';
import { AngelListIcon } from './icons/AngelListIcon';

const socialLinks = [
  { href: '#', icon: TwitterIcon, name: 'Twitter' },
  { href: '#', icon: LinkedInIcon, name: 'LinkedIn' },
  { href: '#', icon: GithubIcon, name: 'GitHub' },
  { href: '#', icon: ProductHuntIcon, name: 'Product Hunt' },
  { href: '#', icon: AngelListIcon, name: 'AngelList' },
];

const Footer: React.FC = () => {
  const workLink = NAV_LINKS.find(l => l.label === 'Work');
  const servicesLink = NAV_LINKS.find(l => l.label === 'Services');

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4">
            <h3 className="font-heading text-2xl font-bold text-white">Andrej Gajdos</h3>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              A freelance full stack developer building scalable, clean, and fast web applications.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.href} 
                  aria-label={social.name}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-heading font-semibold tracking-wider uppercase text-gray-400 text-sm">Navigate</h4>
              <ul className="mt-4 space-y-3">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/#about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/#experience" className="hover:text-white transition-colors">Experience</Link></li>
                <li><Link to="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            {workLink && workLink.sublinks && (
              <div>
                <h4 className="font-heading font-semibold tracking-wider uppercase text-gray-400 text-sm">{workLink.label}</h4>
                <ul className="mt-4 space-y-3">
                  {workLink.sublinks.map(sublink => (
                    <li key={sublink.label}>
                      <Link to={sublink.href} className="hover:text-white transition-colors">{sublink.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {servicesLink && servicesLink.sublinks && (
              <div>
                <h4 className="font-heading font-semibold tracking-wider uppercase text-gray-400 text-sm">{servicesLink.label}</h4>
                <ul className="mt-4 space-y-3">
                  {servicesLink.sublinks.map(sublink => (
                    <li key={sublink.label}>
                      <Link to={sublink.href} className="hover:text-white transition-colors">{sublink.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h4 className="font-heading font-semibold tracking-wider uppercase text-gray-400 text-sm">Contact</h4>
                <ul className="mt-4 space-y-3">
                  <li><a href="mailto:mail@andrejgajdos.com" className="hover:text-white transition-colors">mail@andrejgajdos.com</a></li>
                </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Andrej Gajdos. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
