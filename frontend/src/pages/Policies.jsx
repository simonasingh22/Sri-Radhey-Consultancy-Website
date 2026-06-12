import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Award, Landmark, TrendingUp, Sparkles, UserCheck, Share2, ChevronRight } from 'lucide-react';

export const policiesData = [
  {
    slug: "msme-policy-2022",
    name: "MSME Promotion Policy 2022",
    icon: <Award className="w-6 h-6 text-accent" />,
    shortDesc: "Major capital and interest incentives for UP micro, small and medium enterprises.",
    overview: "Introduced by the UP Government to accelerate local manufacturing, providing substantial capital returns and long-term interest waivers on term loans.",
    benefits: ["Capital subsidy up to 25% on plant and machinery", "5% to 6% interest subsidy for 5 years", "100% stamp duty exemption in selected districts"],
    eligibility: "New manufacturing units or existing units expanding capacity by more than 25%. Must secure Udyam Registration.",
    documents: ["Udyam Registration Certificate", "Lease or Sale Deed of factory plot", "Detailed Project Report (DPR)", "Term Loan approval letter"],
    process: ["Online filing on Nivesh Mitra portal", "Initial document audit by DIC", "DIC committee physical site inspection", "Sanction letter issuance", "DBT disbursement"],
    timeline: "3 to 6 Months",
    faqs: [
      { q: "What is the maximum subsidy cap?", a: "For Micro units, it is up to Rs 2 Cr; Small units up to Rs 5 Cr; Medium units up to Rs 10 Cr." },
      { q: "Is registration on Udyam mandatory?", a: "Yes, Udyam registration is a primary document to apply under this scheme." }
    ]
  },
  {
    slug: "technology-upgradation-scheme-2019",
    name: "Technology Upgradation Scheme 2019",
    icon: <TrendingUp className="w-6 h-6 text-accent" />,
    shortDesc: "Support for industrial modernization, machinery upgrades, and certifications.",
    overview: "Formulated to help factories upgrade outdated machinery, incorporate automation, reduce emissions, and secure quality standards.",
    benefits: ["15% capital subsidy on machinery upgrades", "Waiver on ISO certification fees", "Refunds on patent filing expenses"],
    eligibility: "Operating manufacturing units replacing existing manual gear with high-tech equipment.",
    documents: ["Old vs New machinery inventory list", "Vendor technical specs sheet", "UPPCB CTO compliance certificates", "Bank audit verification"],
    process: ["Submit upgrade proposal to DIC", "Procure and install machinery", "DIC inspection verification", "Direct grant disbursement"],
    timeline: "4 to 8 Months",
    faqs: [
      { q: "Does this cover second-hand machinery?", a: "No, only new high-efficiency machinery is eligible for technology upgradation grants." }
    ]
  },
  {
    slug: "odop-schemes",
    name: "ODOP Schemes",
    icon: <Landmark className="w-6 h-6 text-accent" />,
    shortDesc: "One District One Product financial assistance and market exposure.",
    overview: "Promoting UP's traditional craft products by offering financial capital, technical training, and direct trade expo pathways.",
    benefits: ["Margin Money scheme subsidy up to 25%", "Exhibition stall fee waivers", "Skill training and toolkit grants"],
    eligibility: "Artisans and manufacturers creating the declared district product (e.g., Terracotta in Gorakhpur).",
    documents: ["Artisan card or ID", "Address proof of unit", "Project costing sheet", "DIC recommendation letter"],
    process: ["Verify product mapping for district", "Submit Margin Money application", "DIC clearance review", "Direct bank credit"],
    timeline: "2 to 4 Months",
    faqs: [
      { q: "What is the Margin Money scheme limit?", a: "Financial assistance is provided up to Rs 20 Lakhs per industrial applicant." }
    ]
  },
  {
    slug: "women-entrepreneur-schemes",
    name: "Women Entrepreneur Schemes",
    icon: <Sparkles className="w-6 h-6 text-accent" />,
    shortDesc: "Special capital grants and additional interest waivers for female owners.",
    overview: "Dedicated schemes to support and incentivize female-owned industrial enterprises throughout Uttar Pradesh.",
    benefits: ["Additional 5% capital subsidy on fixed assets", "100% stamp duty exemption in all UP districts", "Relaxed loan collateral terms"],
    eligibility: "Industries where women holds 51% or higher equity share and direct management control.",
    documents: ["Shareholding agreement document", "Proprietor ID details", "Udyam Registration", "Detailed project report"],
    process: ["File application with women equity proof", "DIC initial compliance review", "Credit sanction audit", "Direct cash transfer"],
    timeline: "3 to 5 Months",
    faqs: [
      { q: "Are partnerships eligible?", a: "Yes, provided women partners hold a minimum of 51% financial share." }
    ]
  },
  {
    slug: "sc-st-schemes",
    name: "SC/ST Schemes",
    icon: <UserCheck className="w-6 h-6 text-accent" />,
    shortDesc: "Exclusive incentive brackets, high capital returns, and land allocations.",
    overview: "Enhanced subsidy structures designed to encourage industrial entrepreneurship within SC/ST communities.",
    benefits: ["Up to 30% capital subsidy on investments", "Additional interest invoice waivers", "Priority allocation of industrial plots"],
    eligibility: "Entrepreneurs with caste verification certificate issued by UP authority.",
    documents: ["Caste Certificate", "Udyam Registry certificate", "Bank loan sanction papers", "DPR booklet"],
    process: ["Submit caste validation to DIC", "Online filing on Nivesh Mitra", "Administrative approval", "Direct grant credit"],
    timeline: "3 to 6 Months",
    faqs: [
      { q: "Does this apply to rented land?", a: "Yes, but lease terms must exceed 7 years to claim fixed asset benefits." }
    ]
  },
  {
    slug: "export-promotion-schemes",
    name: "Export Promotion Schemes",
    icon: <Share2 className="w-6 h-6 text-accent" />,
    shortDesc: "Subsidies for shipping logistics, international expos, and global certifications.",
    overview: "State assistance helping UP manufacturers export their products globally, covering logistics and international display costs.",
    benefits: ["Logistics freight subsidies up to 25%", "Exhibition catalog printing refunds", "Global marketing search grants"],
    eligibility: "UP manufacturing companies holding IEC (Import Export Code) registration.",
    documents: ["Import Export Code (IEC)", "Export shipping bill files", "Product catalogs", "DIC registration details"],
    process: ["Secure shipping documents", "Submit claim to Export Commissioner", "State desk file audits", "Subsidy clearance credit"],
    timeline: "4 to 6 Months",
    faqs: [
      { q: "Is freight refund applicable to air shipping?", a: "Yes, both sea and air shipping costs have specified refund brackets." }
    ]
  }
];

export default function Policies() {
  return (
    <>
      <Helmet>
        <title>UP Government Industrial Subsidies & Policies | Sri Radhey Consultancy</title>
        <meta name="description" content="Overview of active UP Government schemes: MSME Policy 2022, ODOP, Women Entrepreneurs, SC/ST, and Export schemes." />
      </Helmet>

      {/* Hero Banner */}
      <section className="bg-primary text-white py-16 px-6 text-center border-b border-accent/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-accent text-xs font-bold uppercase tracking-widest">Incentive Frameworks</span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">UP State Government Policies</h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Browse through active industrial promotion schemes. Let us guide you on eligibility checks and claim filings.
          </p>
        </div>
      </section>

      {/* Policy list grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {policiesData.map((policy, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-lg border border-primary/5 shadow-premium hover:shadow-premium-hover transition-all duration-300 p-8 flex flex-col justify-between hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center">
                    {policy.icon}
                  </div>
                  <h3 className="text-lg font-bold text-primary font-display">{policy.name}</h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {policy.shortDesc}
                  </p>
                </div>

                <div className="pt-6 border-t border-black/5 mt-6 flex justify-between items-center">
                  <span className="text-[11px] text-text-muted">Process: {policy.timeline}</span>
                  <Link 
                    to={`/policies/${policy.slug}`} 
                    className="text-primary hover:text-accent-dark font-bold text-xs flex items-center gap-1"
                  >
                    View Guidelines <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16 px-6 text-center border-t border-accent/20">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold font-display">Verify Your Policy Eligibility</h2>
          <p className="text-xs text-white/70 max-w-xl mx-auto leading-relaxed">
            Ensure your industrial classification and fixed assets line up correctly before submitting.
          </p>
          <Link to="/contact" className="inline-block bg-accent hover:bg-accent-dark text-primary-dark font-semibold text-xs py-3 px-6 rounded transition-all">
            Get Free Eligibility Report
          </Link>
        </div>
      </section>
    </>
  );
}
