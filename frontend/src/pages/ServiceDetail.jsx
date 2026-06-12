import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, CheckCircle2, ChevronRight, FileText, HelpCircle, PhoneCall } from 'lucide-react';
import { servicesData } from './Services';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = servicesData.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="max-w-md mx-auto py-24 text-center px-6">
        <h1 className="text-3xl font-bold text-primary font-display mb-4">Service Not Found</h1>
        <p className="text-text-muted text-sm mb-6">The requested consultancy service could not be located in our directory.</p>
        <Link to="/services" className="bg-primary text-white text-xs font-semibold py-2.5 px-6 rounded">
          Back to All Services
        </Link>
      </div>
    );
  }

  // Sourced detail grids based on categories
  const checklist = service.category === "Subsidy" 
    ? ["Detailed machinery invoice compilation", "Detailed project report (DPR) formatting", "Bank interest certs verification", "Digital portal submission through Nivesh Mitra", "Liaison representation at the district committee"]
    : ["Site layout drawing review against fire safety codes", "Effluent disposal planning disclosures", "Safety apparatus documentation check", "Liaison checks at regulatory inspectorates", "Secure delivery of CTO/CTE certifications"];

  const docs = service.category === "Subsidy"
    ? ["Udyam Registration Certificate", "Lease Deed or Sale Deed of land", "Machinery bank valuation reports", "Detailed project appraisal booklet", "Audited balance sheet files"]
    : ["Industrial Land possession certificates", "Factory building map drawings", "Equipment specs data sheets", "Water/Air emission reports", "No-objection NOC declarations"];

  return (
    <>
      <Helmet>
        <title>{service.name} in UP | Sri Radhey Consultancy</title>
        <meta name="description" content={`Claim benefits or secure NOC for ${service.name} in Uttar Pradesh. We format files and represent your application at the DIC and state offices.`} />
      </Helmet>

      {/* Hero Banner */}
      <section className="bg-primary text-white py-16 px-6 relative border-b border-accent/20">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link to="/services" className="text-accent hover:text-white text-xs font-semibold flex items-center gap-1 mb-2">
            <ArrowLeft className="w-4 h-4" /> All Services
          </Link>
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest px-2 py-0.5 bg-accent/25 rounded border border-accent/20">
            {service.category} Service
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold font-display">{service.name}</h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
            {service.shortDesc}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Details Left */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-primary font-display">Service Overview</h2>
              <div className="h-0.5 w-12 bg-accent"></div>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                {service.description} The process begins with a systematic mapping of your facility details. Our team coordinates with plant managers to extract equipment receipts, land allocation bills, and technical drawings to formulate a comprehensive approval dossier.
              </p>
            </div>

            {/* What we do */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-primary font-display">What We Do</h3>
              <ul className="space-y-3">
                {checklist.map((item, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-text-muted flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Documents */}
            <div className="bg-background-alt rounded-lg p-6 border border-primary/5 space-y-4">
              <h3 className="text-lg font-bold text-primary font-display flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                Required Documents Checklist
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {docs.map((item, idx) => (
                  <div key={idx} className="text-xs text-text-muted flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Right */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Consultation Form box */}
            <div className="bg-primary-dark text-white rounded-xl p-8 border border-accent/20 shadow-premium space-y-6">
              <h3 className="font-display font-bold text-lg text-white">Inquire About This Service</h3>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Send your industrial parameters directly to our Gorakhpur desk. We will audit your eligibility for **{service.name}** within 24 hours.
              </p>
              
              <Link 
                to="/contact" 
                className="block text-center bg-accent hover:bg-accent-dark text-primary-dark font-semibold text-xs py-3 rounded transition-all shadow-premium"
              >
                Inquire Now
              </Link>
              
              <div className="pt-4 border-t border-white/10 flex items-center gap-3 justify-center text-xs text-white/80">
                <PhoneCall className="w-4 h-4 text-accent" />
                <span>Call Center: +91-9999999999</span>
              </div>
            </div>

            {/* Quick Policy links */}
            <div className="border border-primary/5 rounded-xl p-6 bg-background-alt space-y-4">
              <h4 className="font-display font-semibold text-sm text-primary">Related Schemes & Policies</h4>
              <div className="space-y-2 text-xs font-sans">
                <Link to="/policies" className="flex items-center justify-between text-text-muted hover:text-accent-dark p-2 bg-white rounded border border-black/5">
                  <span>UP MSME Policy 2022</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <Link to="/policies" className="flex items-center justify-between text-text-muted hover:text-accent-dark p-2 bg-white rounded border border-black/5">
                  <span>Stamp Duty Exemption Rules</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
