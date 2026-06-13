import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import logoImage from '../assets/logo.png';

export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.sriradheyconsultancy.com').replace(/\/$/, '');
export const SITE_NAME = 'Sri Radhey Consultancy';
export const DEFAULT_DESCRIPTION = 'Sri Radhey Consultancy helps industries and MSMEs in Uttar Pradesh claim subsidies, policy benefits, and regulatory NOCs with complete documentation support.';

const buildUrl = (path = '/') => {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export const createOrganizationSchema = (settings = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: settings.companyName || SITE_NAME,
  url: SITE_URL,
  logo: buildUrl(logoImage),
  image: buildUrl(logoImage),
  telephone: settings.phone,
  email: settings.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: settings.address || 'District Industries Centre Liaison Road',
    addressLocality: 'Gorakhpur',
    addressRegion: 'Uttar Pradesh',
    postalCode: '273001',
    addressCountry: 'IN',
  },
  areaServed: 'Uttar Pradesh',
  sameAs: [
    settings.socialLinks?.facebook,
    settings.socialLinks?.twitter,
    settings.socialLinks?.linkedin,
    settings.socialLinks?.instagram,
  ].filter(Boolean),
});

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  type = 'website',
  image = logoImage,
  keywords,
  jsonLd,
}) {
  const location = useLocation();
  const canonicalUrl = buildUrl(path || location.pathname);
  const imageUrl = buildUrl(image);
  const fullTitle = title?.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd].filter(Boolean);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(', ') : keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
