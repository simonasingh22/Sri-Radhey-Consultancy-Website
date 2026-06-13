import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Globe, ChevronDown } from 'lucide-react';
import logoImg from '../assets/logo.png';

import { useSettings } from '../context/SettingsContext';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Subsidies & Policies', href: '/policies' },
  { name: 'Compliance', href: '/compliance' },
  { name: 'Industries', href: '/industries' },
  { name: 'Success Stories', href: '/success-stories' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { settings } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Track scroll depth for changing navbar background opacity/elevation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-primary/95 backdrop-blur-md shadow-premium py-2 border-b border-accent/20' 
        : 'bg-primary py-4'
    }`}>
      {/* Top Bar for Contact Info */}
      {!isScrolled && (
        <div className="bg-primary-dark text-white/70 text-xs py-1.5 border-b border-white/5 px-6 hidden md:block">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                Uttar Pradesh Industrial Subsidy Partner
              </span>
              <span className="text-white/40">|</span>
              <span>Liaisoning & Compliance Experts</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href={`tel:${settings.phone}`} className="hover:text-accent transition-colors flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> {settings.phone}
              </a>
              <span>|</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> DIC, UP Govt. Liaisoning
              </span>
            </div>
          </div>
        </div>
      )}

      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6" aria-label="Global">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group focus:outline-none">
          {/* Logo container utilizing orbital theme */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-black flex items-center justify-center border border-accent/30 group-hover:border-accent transition-all duration-300">
            <img 
              src={settings.logo || logoImg} 
              alt={`${settings.companyName} Logo`} 
              width="44"
              height="44"
              decoding="async"
              fetchPriority="high"
              className="w-11 h-11 object-contain transform group-hover:scale-105 transition-transform duration-300" 
            />
            {/* Orbital glow path border decoration */}
            <div className="absolute inset-0 border border-accent/0 group-hover:border-accent/30 rounded-full animate-[spin_6s_linear_infinite]" />
          </div>
          <div>
            <h1 className="text-white text-base md:text-lg font-bold tracking-tight font-display flex items-center leading-none">
              {settings.companyName} 
              {/* <span className="text-accent ml-1.5 font-light text-xs tracking-widest hidden sm:inline">CONSULTANCY</span> */}
            </h1>
            <p className="text-white/60 text-[10px] sm:text-[11px] leading-tight font-sans tracking-wide mt-0.5 max-w-[220px] sm:max-w-none">
              {settings.tagline}
            </p>
          </div>
        </Link>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-white/95 hover:text-accent hover:bg-white/5 transition-colors focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Desktop Menu links */}
        <div className="hidden lg:flex lg:gap-x-1 xl:gap-x-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => `
                px-3 py-2 text-[13px] font-medium tracking-wide rounded-md transition-all duration-200
                ${isActive 
                  ? 'text-accent bg-white/5 font-semibold border-b-2 border-accent rounded-b-none' 
                  : 'text-white/90 hover:text-accent hover:bg-white/5'
                }
              `}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Quick CTA */}
        <div className="hidden lg:flex">
          <Link
            to="/contact"
            className="bg-accent hover:bg-accent-dark text-primary-dark text-xs font-semibold py-2 px-4 rounded shadow-premium transition-all hover:-translate-y-0.5 hover:shadow-premium-hover"
          >
            Check Eligibility
          </Link>
        </div>
      </nav>

      {/* Mobile menu, show/hide based on menu state. */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-primary border-t border-white/10 py-4 px-6 absolute top-full left-0 w-full shadow-premium animate-[fadeIn_0.2s_ease-out]">
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => `
                  block rounded-md px-3 py-2.5 text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-white/10 text-accent font-semibold' 
                    : 'text-white/90 hover:bg-white/5 hover:text-accent'
                  }
                `}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center justify-center gap-2 border border-white/20 text-white font-medium py-2 px-4 rounded text-sm hover:bg-white/5 transition-colors"
            >
              <Phone className="w-4 h-4" /> Call: {settings.phone}
            </a>
            <Link
              to="/contact"
              className="bg-accent hover:bg-accent-dark text-primary-dark text-center font-semibold py-2.5 px-4 rounded text-sm shadow-premium transition-all"
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
