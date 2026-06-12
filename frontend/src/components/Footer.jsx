import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink, ShieldAlert, Award, FileText } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white/80 border-t-2 border-accent/20">
      {/* Top detailed footer info grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Company profile column */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center space-x-3 focus:outline-none">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-black flex items-center justify-center border border-accent/30">
              <img src={logoImg} alt="Sri Radhey Consultancy Logo" className="w-9 h-9 object-contain" />
            </div>
            <div>
              <h2 className="text-white text-base font-bold font-display leading-none">Sri Radhey</h2>
              <span className="text-accent text-[10px] tracking-widest font-semibold font-display">CONSULTANCY</span>
            </div>
          </Link>
          <p className="text-xs text-white/60 leading-relaxed font-sans mt-3">
            Uttar Pradesh's trusted industrial subsidy, MSME promotion policy, government incentive, and compliance consultancy partner. Helping industries thrive.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Award className="w-4 h-4 text-accent" />
              <span>MSME Promotion Policy 2022 Experts</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/70">
              <ShieldAlert className="w-4 h-4 text-accent" />
              <span>Full Compliance NOC Assistance</span>
            </div>
          </div>
        </div>

        {/* Core Expertise / Services Column */}
        <div className="space-y-4">
          <h3 className="text-white font-display font-semibold text-sm tracking-wider uppercase border-b border-white/10 pb-2">
            Core Expertise
          </h3>
          <ul className="space-y-2 text-xs font-sans">
            <li>
              <Link to="/policies" className="hover:text-accent transition-colors flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-accent/80" /> MSME Promotion Policy 2022
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-accent transition-colors flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-accent/80" /> Capital & Interest Subsidies
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-accent transition-colors flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-accent/80" /> Stamp Duty Exemption
              </Link>
            </li>
            <li>
              <Link to="/compliance" className="hover:text-accent transition-colors flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-accent/80" /> Pollution NOC (UPPCB)
              </Link>
            </li>
            <li>
              <Link to="/compliance" className="hover:text-accent transition-colors flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-accent/80" /> Factory License & Fire NOC
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-4">
          <h3 className="text-white font-display font-semibold text-sm tracking-wider uppercase border-b border-white/10 pb-2">
            Quick Navigation
          </h3>
          <ul className="space-y-2 text-xs font-sans grid grid-cols-2 gap-x-2">
            <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
            <li><Link to="/services" className="hover:text-accent transition-colors">Services</Link></li>
            <li><Link to="/policies" className="hover:text-accent transition-colors">Policies</Link></li>
            <li><Link to="/industries" className="hover:text-accent transition-colors">Industries</Link></li>
            <li><Link to="/success-stories" className="hover:text-accent transition-colors">Success</Link></li>
            <li><Link to="/blog" className="hover:text-accent transition-colors">Blog CMS</Link></li>
            <li><Link to="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            <li><Link to="/admin" className="hover:text-accent transition-colors font-medium text-accent/95">Admin Portal</Link></li>
          </ul>
        </div>

        {/* Address and Contact details Column */}
        <div className="space-y-4">
          <h3 className="text-white font-display font-semibold text-sm tracking-wider uppercase border-b border-white/10 pb-2">
            Contact Office
          </h3>
          <ul className="space-y-3 text-xs font-sans">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span className="leading-relaxed text-white/70">
                District Industries Centre (DIC) Liaison Road,<br />
                Gorakhpur / Lucknow, Uttar Pradesh, India
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-accent" />
              <a href="tel:+919999999999" className="hover:text-accent transition-colors text-white/70">
                +91-9999999999
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-accent" />
              <a href="mailto:sriradheyconsultancy@gmail.com" className="hover:text-accent transition-colors text-white/70">
                sriradheyconsultancy@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-primary-darker py-6 border-t border-white/5 text-xs text-white/50 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p>© {currentYear} Sri Radhey Consultancy. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/faq" className="hover:text-white transition-colors">FAQs</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Liaison Support</Link>
            <a 
              href="https://up.gov.in" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors flex items-center gap-0.5"
            >
              UP Govt Portal <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
