import { MessageCircle } from 'lucide-react';

export const siteConfig = {
  brand: {
    name: 'Sri Radhey Consultancy',
    subtitle: 'Industrial Subsidy & Compliance Advisors',
  },
  adminPortalUrl: '/admin',
  whatsapp: {
    agentName: 'Rohit',
    number: import.meta.env.VITE_WHATSAPP_NUMBER || '916387688787',
    icon: MessageCircle,
  },
  navigation: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Subsidies & Policies', href: '/policies' },
    { name: 'Compliance', href: '/compliance' },
    { name: 'Success Stories & FAQ', href: '/success-stories' },
    { name: 'Contact', href: '/contact' },
  ],
};

export function getWhatsAppUrl() {
  const phoneNumber = siteConfig.whatsapp.number.replace(/\D/g, '');
  const message = encodeURIComponent(
    'Hello, I would like to discuss subsidy eligibility for my industry.'
  );

  return `https://wa.me/${phoneNumber}?text=${message}`;
}
