import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { useSettings } from '../context/SettingsContext';
import { getWhatsAppUrl, siteConfig } from '../config/siteConfig';

function EligibilityLink({ mobile = false }) {
  return (
    <Link
      to="/contact"
      className={`inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-xs font-bold tracking-wide text-primary-dark shadow-premium transition hover:-translate-y-0.5 hover:bg-accent-light hover:shadow-premium-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary ${
        mobile ? 'w-full' : ''
      }`}
    >
      Check Eligibility
    </Link>
  );
}

function NavigationLink({ item, mobile = false, onNavigate }) {
  return (
    <NavLink
      to={item.href}
      onClick={onNavigate}
      className={({ isActive }) => `block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? 'bg-white/10 text-accent'
          : 'text-white/85 hover:bg-white/5 hover:text-accent'
      } ${mobile ? 'w-full' : ''}`}
    >
      {item.name}
    </NavLink>
  );
}

export default function Navbar() {
  const { settings } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const WhatsAppIcon = siteConfig.whatsapp.icon;
  const brandName = settings.companyName || siteConfig.brand.name;
  const brandSubtitle = siteConfig.brand.subtitle;
  const whatsappUrl = getWhatsAppUrl();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-accent/20 bg-primary transition-all duration-300 ${
        isScrolled ? 'bg-primary/95 py-2 shadow-premium backdrop-blur-md' : 'py-3'
      }`}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:px-8" aria-label="Global">
        <Link to="/" className="group flex min-w-0 shrink-0 items-center gap-3" aria-label={`${brandName} home`}>
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-accent/40 bg-black transition group-hover:border-accent">
            <img
              src={settings.logo || logoImg}
              alt={`${brandName} logo`}
              width="44"
              height="44"
              decoding="async"
              fetchPriority="high"
              className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-bold leading-tight tracking-tight text-white sm:text-base">
              {brandName}
            </p>
            <p className="max-w-[220px] truncate text-[9px] leading-tight tracking-wide text-white/60 sm:text-[10px]">
              {brandSubtitle}
            </p>
          </div>
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
          {siteConfig.navigation.map((item) => (
            <NavigationLink key={item.name} item={item} />
          ))}
        </div>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <EligibilityLink />
          <div className="flex flex-col items-end gap-0.5 border-l border-white/15 pl-3">
            <Link to={siteConfig.adminPortalUrl} className="text-[10px] font-medium text-white/55 transition hover:text-accent">
              Admin Portal
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-semibold text-white/85 transition hover:text-accent">
              <WhatsAppIcon className="h-3.5 w-3.5 text-secondary-light" aria-hidden="true" />
              WhatsApp {siteConfig.whatsapp.agentName}
            </a>
          </div>
        </div>

        <button
          type="button"
          className="ml-auto rounded-md p-2 text-white transition hover:bg-white/10 hover:text-accent xl:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.24 }}
            className="absolute right-0 top-full max-h-[calc(100vh-72px)] w-full overflow-y-auto border-t border-white/10 bg-primary px-5 py-5 shadow-2xl sm:w-96"
          >
            <div className="space-y-1">
              {siteConfig.navigation.map((item) => (
                <NavigationLink key={item.name} item={item} mobile onNavigate={() => setMobileMenuOpen(false)} />
              ))}
            </div>
            <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
              <EligibilityLink mobile />
              <Link to={siteConfig.adminPortalUrl} onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-accent">
                Admin Portal
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/5 hover:text-accent">
                <WhatsAppIcon className="h-4 w-4 text-secondary-light" aria-hidden="true" />
                WhatsApp {siteConfig.whatsapp.agentName}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
