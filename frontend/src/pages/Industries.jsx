import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Building2, Leaf, Box, Scissors, Wrench, FlaskConical, Cpu, ShieldAlert, CheckCircle2 } from 'lucide-react';

const industryDetails = [
  {
    name: "Manufacturing",
    icon: <Building2 className="w-6 h-6 text-primary" />,
    desc: "Machinery fabrication, metal components, plastic modeling, and household products.",
    policies: ["MSME Promotion Policy 2022", "Capital Subsidy", "Stamp Duty Exemption"],
    rules: "Requires structural factory license and labour NOC if worker count exceeds 10 with power."
  },
  {
    name: "Food Processing",
    icon: <Leaf className="w-6 h-6 text-primary" />,
    desc: "Cold storage facilities, flour mills, rice mills, oil extracts, and dairy products packaging.",
    policies: ["UP Food Processing Industry Policy", "Interest Subsidy", "SGST Reimbursement"],
    rules: "FSSAI registration, groundwater extraction approval, and UPPCB consent to operate (CTO)."
  },
  {
    name: "Packaging",
    icon: <Box className="w-6 h-6 text-primary" />,
    desc: "Corrugated boxes manufacturing, paper board printing, flexible plastics, and bags.",
    policies: ["MSME Promotion Policy 2022", "Technology Upgradation Scheme"],
    rules: "High-load power clearances, fire hazard NOCs, and UPPCB emissions clearances."
  },
  {
    name: "Textiles",
    icon: <Scissors className="w-6 h-6 text-primary" />,
    desc: "Spinning mills, garment weaving units, embroidery workshops, and fabric dyeing.",
    policies: ["UP Textile Policy", "Women Entrepreneur Schemes", "Interest Subsidy"],
    rules: "Water discharge treatments control approval (ETP NOC) and labor welfare registers."
  },
  {
    name: "Engineering",
    icon: <Wrench className="w-6 h-6 text-primary" />,
    desc: "Foundries, machining units, metal casting, and auto component fabrication.",
    policies: ["Technology Upgradation Scheme 2019", "Capital Subsidy"],
    rules: "High-tension electricity NOC, crane hoist certificates, and noise pollution compliance."
  },
  {
    name: "Chemicals",
    icon: <FlaskConical className="w-6 h-6 text-primary" />,
    desc: "Specialty chemicals, adhesives, paint processing, and laboratory reagents.",
    policies: ["MSME Policy 2022", "Export Promotion Schemes"],
    rules: "UPPCB Hazardous Waste Authorization, strict fire hydrants clearances, and explosive licenses."
  },
  {
    name: "Electronics",
    icon: <Cpu className="w-6 h-6 text-primary" />,
    desc: "PCB board printing, LED assembly lines, and electrical adapter units.",
    policies: ["UP Electronics Policy", "Capital Subsidy", "ODOP Schemes"],
    rules: "Static discharge safety measures audits and clean room licenses."
  },
  {
    name: "Pharma",
    icon: <ShieldAlert className="w-6 h-6 text-primary" />,
    desc: "Drug formulation labs, capsules manufacturing, and herbal extracts processing.",
    policies: ["UP Pharmaceutical Policy", "Technology Upgradation Scheme"],
    rules: "Drug controller license, clean water discharge systems, and medical waste compliance."
  }
];

export default function Industries() {
  return (
    <>
      <Helmet>
        <title>Industries We Serve | Sri Radhey Consultancy</title>
        <meta name="description" content="Subsidies and compliance regulations tailored for Manufacturing, Food Processing, Packaging, and other sectors in UP." />
      </Helmet>

      {/* Hero Banner */}
      <section className="bg-primary text-white py-16 px-6 text-center border-b border-accent/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-accent text-xs font-bold uppercase tracking-widest">Sectors We Support</span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">Industries We Serve</h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Review specific legislative policy benefits and regulatory compliances mapped for your sector.
          </p>
        </div>
      </section>

      {/* Industries list layout */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industryDetails.map((ind, idx) => (
              <div 
                key={idx}
                className="bg-background-alt border border-primary/5 rounded-xl p-8 space-y-5 shadow-sm hover:shadow-premium transition-shadow duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center">
                    {ind.icon}
                  </div>
                  <h3 className="text-lg font-bold text-primary font-display">{ind.name}</h3>
                </div>
                
                <p className="text-xs text-text-muted leading-relaxed">
                  {ind.desc}
                </p>

                <div className="border-t border-black/5 pt-4 space-y-3">
                  <div className="text-xs text-text-muted">
                    <strong className="text-primary block mb-1">Applicable Incentives:</strong>
                    <div className="flex flex-wrap gap-2">
                      {ind.policies.map((pol, id) => (
                        <span key={id} className="px-2.5 py-0.5 bg-accent/15 text-accent-dark font-semibold text-[10px] rounded-full">
                          {pol}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-xs text-text-muted">
                    <strong className="text-primary block mb-1">Key Compliance Rule:</strong>
                    <p className="text-[11px] leading-relaxed italic text-secondary-dark">{ind.rules}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16 px-6 text-center border-t border-accent/20">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold font-display">Need Custom Mapping For Your Factory?</h2>
          <p className="text-xs text-white/70 max-w-xl mx-auto leading-relaxed">
            Every facility has unique layouts and power connections. Contact us to audit your specific parameters.
          </p>
          <Link to="/contact" className="inline-block bg-accent hover:bg-accent-dark text-primary-dark font-semibold text-xs py-3 px-6 rounded transition-all">
            Get Custom Industry Mapping
          </Link>
        </div>
      </section>
    </>
  );
}
