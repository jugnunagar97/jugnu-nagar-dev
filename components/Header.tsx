import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import type { NavLink } from '../types';
import { MenuIcon } from './icons/MenuIcon';
import { XIcon } from './icons/XIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

const NavLinkItem: React.FC<{ link: NavLink; onClick?: () => void }> = ({ link, onClick }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const isSectionLink = link.href.startsWith('/#');
  const linkTarget = isSectionLink 
    ? { pathname: '/', state: { scrollTarget: link.href.slice(2) } }
    : link.href;

  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) { // lg breakpoint
      setDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      setDropdownOpen(false);
    }
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    if (window.innerWidth < 1024) {
      e.preventDefault();
      setDropdownOpen(!isDropdownOpen);
    }
  };

  const handleLinkClick = (e?: React.MouseEvent) => {
    if (isSectionLink && window.location.pathname === '/') {
      e?.preventDefault();
      const id = link.href.slice(2);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    if (onClick) {
      onClick();
    }
    setDropdownOpen(false);
  }
  
  if (link.sublinks) {
    return (
      <div 
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <a
          href={link.href}
          onClick={handleDropdownClick}
          className="flex items-center gap-1 font-heading font-medium text-gray-600 hover:text-brand-blue transition-colors duration-300"
        >
          {link.label}
          <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </a>
        {isDropdownOpen && (
          <div className="lg:absolute top-full left-0 mt-2 lg:mt-4 w-56 bg-white rounded-lg shadow-xl py-2 z-10">
            {link.sublinks.map(sublink => (
              <Link
                key={sublink.label}
                to={sublink.href}
                onClick={handleLinkClick}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-brand-blue"
              >
                {sublink.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={linkTarget as any}
      onClick={handleLinkClick}
      className="font-heading font-normal text-gray-600 hover:text-brand-blue transition-colors duration-300 tracking-wide"
    >
      {link.label}
    </Link>
  );
};

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm' : 'bg-transparent'}`} aria-label="Primary header">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Removed logo text for minimal header */}
          <div className="hidden lg:block flex-1" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 justify-center">
            {NAV_LINKS.map(link => (
              <NavLinkItem key={link.label} link={link} />
            ))}
          </nav>
          
          <div className="hidden lg:block flex-1" />

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" aria-expanded={isOpen} aria-controls="mobile-menu" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 rounded">
              {isOpen ? <XIcon className="w-6 h-6 text-gray-800" /> : <MenuIcon className="w-6 h-6 text-gray-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" className={`lg:hidden bg-white/95 backdrop-blur shadow-lg absolute top-full left-0 w-full transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="flex flex-col p-6 space-y-4">
          {NAV_LINKS.map(link => (
            <NavLinkItem key={link.label} link={link} onClick={() => setIsOpen(false)} />
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
