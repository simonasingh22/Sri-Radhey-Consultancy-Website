import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShieldCheck, Leaf, Zap, Shield, HardHat, FileText, ChevronRight } from 'lucide-react';

const complianceList = [
  {
    slug: "pollution-noc",
    name: "Pollution NOC (UPPCB)",
    department: "UP Pollution Control Board",
    desc: "Mandatory Consent to Establish (CTE) before plant setup and Consent to Operate (CTO) before starting production.",
    timeline: "30 to 45 Days",
    icon: <Leaf className="w-6 h-6 text-secondary" />
  },
  {
    slug: "labour-noc",
    name: "Labour NOC & Registration",
    department: "UP Labour Department",
    desc: "Worker safety registries, employee compliance checklists, and registration under Shops & Establishments / Factories Act.",
    timeline: "15 to 30 Days",
    icon: <HardHat className="w-6 h-6 text-secondary" />
  },
  {
    slug: "electrical-safety-noc",
    name: "Electrical Safety NOC",
    department: "Directorate of Electrical Safety",
    desc: "Approval of line layout blueprints and insulation testing for high-tension cables and transformer installations.",
    timeline: "20 to 30 Days",
    icon: <Zap className="w-6 h-6 text-secondary" />
  },
  {
    slug: "factory-license",
    name: "Factory License",
    department: "Directorate of Factories UP",
    desc: "Blueprint layouts safety evaluation and regular operational licensing updates for factory premises.",
    timeline: "30 to 60 Days",
    icon: <ShieldCheck className="w-6 h-6 text-secondary" />
  },
  {
    slug: "fire-noc",
    name: "Fire NOC",
    department: "UP Fire Service Department",
    desc: "Building fire resistance appraisals and fire hydrant setups safety approvals for commercial structures.",
    timeline: "15 to 25 Days",
    icon: <Shield className="w-6 h-6 text-secondary" />
  }
];

export default function Compliance() {
  return (
    <>
      <Helmet>
        <title>Industrial Compliance & NOC Services UP | Sri Radhey Consultancy</title>
        <meta name="description" content="Secure your industrial NOCs. Pollution NOC (CTO/CTE), Labour safety, Electrical inspection and Factory licenses in Gorakhpur and UP." />
      </Helmet>

      {/* Hero Banner */}
      <section className="bg-primary text-white py-16 px-6 text-center border-b border-accent/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-accent text-xs font-bold uppercase tracking-widest">Regulatory Clearances</span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">Industrial Compliance & NOCs</h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Acquire operating clearances from UP regulatory authorities without administrative delays.
          </p>
        </div>
      </section>

      {/* Compliance cards */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {complianceList.map((comp, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-lg border border-primary/5 shadow-premium hover:shadow-premium-hover transition-all duration-300 p-8 flex flex-col justify-between hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-secondary/5 rounded-lg flex items-center justify-center">
                    {comp.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary font-display">{comp.name}</h3>
                    <span className="text-[10px] text-accent-dark font-semibold tracking-wider uppercase">
                      {comp.department}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {comp.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-black/5 mt-6 flex justify-between items-center text-xs">
                  <span className="text-text-muted">Avg Timeline: <strong className="text-primary">{comp.timeline}</strong></span>
                  <Link 
                    to={`/services/${comp.slug}`} 
                    className="text-primary hover:text-accent-dark font-bold flex items-center gap-1"
                  >
                    View Checklist <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Notice info */}
          <div className="bg-background-alt border border-primary/5 rounded-xl p-8 max-w-4xl mx-auto flex flex-col sm:flex-row gap-6 items-center">
            <div className="w-12 h-12 rounded-full bg-accent/15 text-accent-dark flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="font-display font-bold text-sm text-primary">Need Multi-NOC Packages for a New Factory Setup?</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                If you are building a new manufacturing facility, we offer bundled services covering land registrations, structural blueprints approval, pollution CTO, fire hydrants safety clearances, and labour safety setups.
              </p>
              <Link to="/contact" className="inline-block text-xs font-bold text-accent-dark hover:underline">
                Request Multi-NOC Package Details
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16 px-6 text-center border-t border-accent/20">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold font-display">Secure Your Clearances Fast</h2>
          <p className="text-xs text-white/70 max-w-xl mx-auto leading-relaxed">
            Avoid stop-work notices or regulatory penalties. Speak with our liaison specialists to clear pending NOCs.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="bg-accent hover:bg-accent-dark text-primary-dark font-semibold text-xs py-3 px-6 rounded transition-all">
              File Compliance
            </Link>
            <a 
              href="https://wa.me/919999999999?text=Hello,%20I%20would%20like%20to%20discuss%20compliance%20filing%20for%20my%20industry." 
              target="_blank" 
              rel="noreferrer"
              className="bg-secondary hover:bg-secondary-light text-white font-semibold text-xs py-3 px-6 rounded transition-all"
            >
              WhatsApp Compliance Team
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
