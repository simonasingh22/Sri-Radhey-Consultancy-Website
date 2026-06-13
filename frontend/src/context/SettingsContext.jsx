import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    companyName: 'Sri Radhey Consultancy',

    tagline: 'Industrial Subsidy & Compliance',

    phone: '+91-8303534901',

    whatsapp: '+91-6387688787',

    email: 'sriradheyconsultancy@gmail.com',

    addresses: {
      headOffice:
        '128/9, F-2, Siddhivinayak Dham, Y Block, Kidwai Nagar, Kanpur, UP - 208011',

      branchOffice:
        'Shop No. 2, Savitri Market, Gamma-1, Jagat Farm, Greater Noida, UP - 201310',
    },

    logo: null,

    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('/api/settings');

        if (res.data) {
          const s = res.data;

          // Clean WhatsApp formatting
          let ws = s.whatsapp || '+91-6387688787';
          const digitsOnly = ws.replace(/\D/g, '');

          const formattedWhatsapp =
            digitsOnly.length === 10
              ? '91' + digitsOnly
              : digitsOnly || '6387688787';

          setSettings({
            companyName: s.companyName || 'Sri Radhey Consultancy',

            tagline: s.tagline || 'Industrial Subsidy & Compliance',

            phone: s.phone || '+91-8303534901',

            whatsapp: formattedWhatsapp,

            email: s.email || 'sriradheyconsultancy@gmail.com',

            addresses: {
              headOffice:
                s.addresses?.headOffice ||
                '128/9, F-2, Siddhivinayak Dham, Y Block, Kidwai Nagar, Kanpur, UP - 208011',

              branchOffice:
                s.addresses?.branchOffice ||
                'Shop No. 2, Savitri Market, Gamma-1, Jagat Farm, Greater Noida, UP - 201310',
            },

            logo: s.logo || null,

            socialLinks: {
              facebook: s.socialLinks?.facebook || '',
              twitter: s.socialLinks?.twitter || '',
              linkedin: s.socialLinks?.linkedin || '',
              instagram: s.socialLinks?.instagram || '',
            },
          });
        }
      } catch (err) {
        console.error('Failed to fetch settings, using defaults:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (context === null) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return context;
}