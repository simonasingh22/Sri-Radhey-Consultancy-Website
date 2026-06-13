import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, ShieldCheck, FileText, Settings, CreditCard, Landmark, 
  RefreshCw, Layers, Leaf, Users, Zap, Shield, BookOpen, HardHat 
} from 'lucide-react';
import SEO, { SITE_URL } from '../components/SEO';

export const servicesData = [
  {
    slug: "subsidy-consultancy",
    name: "Subsidy Consultancy",
    icon: <Award className="w-6 h-6" />,
    shortDesc: "Complete counseling and verification of state incentives for new/expanding units.",
    description: "Our core advisory evaluates your project plan against all available UP incentives. We index eligible incentives and model financial projections to help optimize investment budgets.",
    category: "Subsidy"
  },
  {
    slug: "msme-policy-assistance",
    name: "MSME Policy Assistance",
    icon: <Users className="w-6 h-6" />,
    shortDesc: "Claiming capital grants, exemptions, and benefits under UP MSME Policy 2022.",
    description: "Detailed guidance to claim under the UP MSME Promotion Policy 2022, securing eligibility certificates and coordinating offline DIC reviews.",
    category: "Subsidy"
  },
  {
    slug: "technology-upgradation-scheme",
    name: "Technology Upgradation Scheme",
    icon: <Zap className="w-6 h-6" />,
    shortDesc: "Capital assistance for machinery modernization and international quality certifications.",
    description: "Claim capital incentives for upgrading outdated machinery, installing automated tech panels, or securing ISO quality clearances.",
    category: "Subsidy"
  },
  {
    slug: "capital-subsidy",
    name: "Capital Subsidy",
    icon: <CreditCard className="w-6 h-6" />,
    shortDesc: "Securing cash refunds on plant construction and capital asset investments.",
    description: "Acquiring capital grant sanctions on building structures and core machineries, ranging from 10% to 25% of audited purchase statements.",
    category: "Subsidy"
  },
  {
    slug: "interest-subsidy",
    name: "Interest Subsidy",
    icon: <Landmark className="w-6 h-6" />,
    shortDesc: "Bank term loan interest interest refunds for industrial expansion.",
    description: "Securing interest invoice reimbursements on bank term-loans taken for equipment, providing substantial relief over term cycles.",
    category: "Subsidy"
  },
  {
    slug: "sgst-reimbursement",
    name: "SGST Reimbursement",
    icon: <RefreshCw className="w-6 h-6" />,
    shortDesc: "Up to 100% reimbursement of paid State GST on sales invoices.",
    description: "Assisting factories in indexing tax records and filing quarterly state tax reimbursement forms to reclaim paid SGST.",
    category: "Subsidy"
  },
  {
    slug: "stamp-duty-exemption",
    name: "Stamp Duty Exemption",
    icon: <Layers className="w-6 h-6" />,
    shortDesc: "Acquiring stamp duty waivers on industrial land registry transactions.",
    description: "Filing for stamp exemption approvals prior to registering factory plots, preventing lock-in of startup cash balances.",
    category: "Subsidy"
  },
  {
    slug: "pollution-noc",
    name: "Pollution NOC (UPPCB)",
    icon: <Leaf className="w-6 h-6" />,
    shortDesc: "Obtaining consent to establish (CTE) and consent to operate (CTO) permits.",
    description: "Compiling water/air effluent disposal details and representing files at the Uttar Pradesh Pollution Control Board (UPPCB) for fast NOC releases.",
    category: "Compliance"
  },
  {
    slug: "labour-noc",
    name: "Labour NOC / Registration",
    icon: <HardHat className="w-6 h-6" />,
    shortDesc: "Factory worker registration and state labour department clear logs.",
    description: "Completing worker safety protocols disclosures, scheduling safety reviews, and securing compliance permits from the UP Labour Commissioner.",
    category: "Compliance"
  },
  {
    slug: "electrical-safety-noc",
    name: "Electrical Safety NOC",
    icon: <Zap className="w-6 h-6" />,
    shortDesc: "Securing safety certificates for high-tension lines and sub-stations.",
    description: "Compiling electrical diagram layouts, organizing safety checks, and coordinating NOCs from the Directorate of Electrical Safety.",
    category: "Compliance"
  },
  {
    slug: "factory-license",
    name: "Factory Licensing",
    icon: <ShieldCheck className="w-6 h-6" />,
    shortDesc: "Obtaining layout blueprints approvals and operating factory licenses.",
    description: "Submitting factory design diagrams, organizing structure safety approvals, and procuring factory licenses under the Factories Act.",
    category: "Compliance"
  },
  {
    slug: "fire-noc",
    name: "Fire NOC",
    icon: <Shield className="w-6 h-6" />,
    shortDesc: "Securing fire hydrants layout approval certificates.",
    description: "Evaluating building safety grids, checking alarm requirements, and liaisoning with the Fire Department to secure operating fire clearances.",
    category: "Compliance"
  },
  {
    slug: "documentation-services",
    name: "Documentation Services",
    icon: <FileText className="w-6 h-6" />,
    shortDesc: "Detailed project reports (DPR) formatting and balance audits.",
    description: "Formulating DPR files, detailing machinery lists, index bank receipts, and compiling certificates matching regulatory rules.",
    category: "Liaison"
  },
  {
    slug: "liaisoning-services",
    name: "Liaisoning Services",
    icon: <Settings className="w-6 h-6" />,
    shortDesc: "Direct file representation in District Industries Centres (DIC).",
    description: "Boots-on-the-ground support at state department desks in UP to resolve registry queries and push files to sanction committees.",
    category: "Liaison"
  }
];

export default function Services() {
  return (
    <>
      <SEO
        title="Industrial Subsidy & Compliance Services"
        description="Explore industrial services including UP MSME subsidy claims, capital subsidy, SGST reimbursement, Pollution NOC, Factory License, and DIC liaisoning."
        path="/services"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Industrial Subsidy and Compliance Services',
          itemListElement: servicesData.map((service, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${SITE_URL}/services/${service.slug}`,
            name: service.name,
            description: service.shortDesc,
          })),
        }}
      />

      {/* Hero Banner */}
      <section className="bg-primary text-white py-16 px-6 text-center border-b border-accent/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-accent text-xs font-bold uppercase tracking-widest">Our Expertise</span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">Specialized Industrial Services</h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Comprehensive support from site planning to government incentives claims for manufacturing units in UP.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          {/* Category: Subsidies */}
          <div className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-primary font-display flex items-center gap-2">
              <span className="h-6 w-1 bg-accent inline-block rounded-full"></span>
              Government Subsidies & Policy Claims
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.filter(s => s.category === "Subsidy").map((service, idx) => (
                <div key={idx} className="bg-white rounded-lg border border-primary/5 shadow-premium hover:shadow-premium-hover transition-all duration-300 p-8 flex flex-col justify-between hover:-translate-y-1">
                  <div>
                    <div className="w-12 h-12 bg-primary/5 text-primary flex items-center justify-center rounded-lg mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-3 font-display">{service.name}</h3>
                    <p className="text-xs text-text-muted leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>
                  </div>
                  <Link 
                    to={`/services/${service.slug}`} 
                    className="bg-primary hover:bg-primary-light text-white text-center text-xs font-semibold py-2 px-4 rounded transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Category: Compliances & Licenses */}
          <div className="space-y-6 pt-8">
            <h2 className="text-xl md:text-2xl font-bold text-primary font-display flex items-center gap-2">
              <span className="h-6 w-1 bg-accent inline-block rounded-full"></span>
              Industrial Compliances & NOCs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.filter(s => s.category === "Compliance").map((service, idx) => (
                <div key={idx} className="bg-white rounded-lg border border-primary/5 shadow-premium hover:shadow-premium-hover transition-all duration-300 p-8 flex flex-col justify-between hover:-translate-y-1">
                  <div>
                    <div className="w-12 h-12 bg-primary/5 text-primary flex items-center justify-center rounded-lg mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-3 font-display">{service.name}</h3>
                    <p className="text-xs text-text-muted leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>
                  </div>
                  <Link 
                    to={`/services/${service.slug}`} 
                    className="bg-primary hover:bg-primary-light text-white text-center text-xs font-semibold py-2 px-4 rounded transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Category: Documentation & Liaisoning */}
          <div className="space-y-6 pt-8">
            <h2 className="text-xl md:text-2xl font-bold text-primary font-display flex items-center gap-2">
              <span className="h-6 w-1 bg-accent inline-block rounded-full"></span>
              Documentation & State Liaison
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {servicesData.filter(s => s.category === "Liaison").map((service, idx) => (
                <div key={idx} className="bg-white rounded-lg border border-primary/5 shadow-premium hover:shadow-premium-hover transition-all duration-300 p-8 flex flex-col justify-between hover:-translate-y-1">
                  <div>
                    <div className="w-12 h-12 bg-primary/5 text-primary flex items-center justify-center rounded-lg mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-3 font-display">{service.name}</h3>
                    <p className="text-xs text-text-muted leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>
                  </div>
                  <Link 
                    to={`/services/${service.slug}`} 
                    className="bg-primary hover:bg-primary-light text-white text-center text-xs font-semibold py-2 px-4 rounded transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16 px-6 text-center border-t border-accent/20">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold font-display">Need Help Choosing the Right Service?</h2>
          <p className="text-xs text-white/70 max-w-xl mx-auto leading-relaxed">
            Not sure which policy matches your plant's setup? Schedule a diagnostic discussion with our expert.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="bg-accent hover:bg-accent-dark text-primary-dark font-semibold text-xs py-3 px-6 rounded transition-all">
              Request Callback
            </Link>
            <a 
              href="https://wa.me/919999999999?text=Hello,%20I%20would%20like%20to%20discuss%20subsidy%20eligibility%20for%20my%20industry." 
              target="_blank" 
              rel="noreferrer"
              className="bg-secondary hover:bg-secondary-light text-white font-semibold text-xs py-3 px-6 rounded transition-all"
            >
              WhatsApp Details
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
