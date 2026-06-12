import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { HelpCircle, ChevronDown, BookOpen, ShieldAlert, FileText } from 'lucide-react';

const faqCategories = [
  {
    name: "Subsidies & Eligibility",
    icon: <BookOpen className="w-4 h-4" />,
    items: [
      {
        q: "What is the capital subsidy rate under the UP MSME Promotion Policy 2022?",
        a: "The capital subsidy ranges from 10% to 25% of the value of investment in plant and machinery, depending on the industrial region of UP. Micro units are eligible for up to 25%, Small units up to 20%, and Medium units up to 15%. Districts in Bundelkhand and Purvanchal (e.g., Gorakhpur) generally qualify for the higher brackets."
      },
      {
        q: "What constitutes 'existing unit expansion' for eligibility?",
        a: "An existing manufacturing unit can apply for incentives under the expansion clause if it increases its production capacity by at least 25% through fresh investment in new plant, machinery, or buildings."
      },
      {
        q: "Are interest subsidies available on working capital loans?",
        a: "No. The state interest subsidy is strictly applicable to term loans taken for purchasing capital assets (plant, machinery, and factory buildings) from recognized banking institutions."
      }
    ]
  },
  {
    name: "Clearances & Compliance",
    icon: <ShieldAlert className="w-4 h-4" />,
    items: [
      {
        q: "What is the difference between CTE and CTO in Pollution NOC?",
        a: "CTE (Consent to Establish) must be obtained before starting construction of the industrial unit. CTO (Consent to Operate) is applied for after construction is complete and must be secured before beginning commercial production."
      },
      {
        q: "When is a formal Factory License mandatory?",
        a: "A Factory License is legally required under the Factories Act for any manufacturing premises employing 10 or more workers (operating with power connection) or 20 or more workers (operating without power)."
      },
      {
        q: "How long does a Fire NOC remain valid?",
        a: "For industrial buildings in Uttar Pradesh, a Fire Safety NOC is generally valid for 3 years (for high-risk industries, yearly audits are recommended). It must be renewed prior to expiration to maintain licensing compliance."
      }
    ]
  },
  {
    name: "Process & Documentation",
    icon: <FileText className="w-4 h-4" />,
    items: [
      {
        q: "What is a Detailed Project Report (DPR), and why is it critical?",
        a: "A DPR is a comprehensive layout planning booklet outlining project economics, machinery itemization, vendor details, power allocation plans, and cash flow forecasts. It is the primary file audited by DIC screening panels. Simple clerical mistakes in a DPR can lead to immediate application rejection."
      },
      {
        q: "What is the Nivesh Mitra portal?",
        a: "Nivesh Mitra is the single-window clearance portal of the Uttar Pradesh Government. All industrial application filings, NOC CTE/CTO uploads, stamp duty exemption requests, and subsidy claims are channeled digitally through this portal."
      },
      {
        q: "How does Sri Radhey Consultancy assist in offline DIC coordination?",
        a: "We do not just file online. Our team prints and indexes physically bound portfolios, submits them directly to the local DIC desk, prepares answers for query alerts, coordinates physical site inspections, and follows up until the formal sanction letter is cleared."
      }
    ]
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | Sri Radhey Consultancy</title>
        <meta name="description" content="Answers to queries regarding UP industrial subsidies, Udyam registration, Pollution NOC, and DIC processing timelines." />
      </Helmet>

      {/* Hero Banner */}
      <section className="bg-primary text-white py-16 px-6 text-center border-b border-accent/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-accent text-xs font-bold uppercase tracking-widest">Help Center</span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">Frequently Asked Questions</h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Find answers regarding documentation checklists, eligibility parameters, and UP government processing timelines.
          </p>
        </div>
      </section>

      {/* FAQs Categorized */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Categories Tab selector - Left 4 cols */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-display font-semibold text-xs text-text-muted uppercase tracking-wider pl-2 mb-4">FAQ Categories</h3>
            {faqCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveCategory(idx);
                  setActiveFaq(null);
                }}
                className={`w-full text-left px-4 py-3.5 rounded-lg border text-sm font-semibold flex items-center gap-3 transition-all ${
                  activeCategory === idx
                    ? 'bg-primary text-white border-primary shadow-premium'
                    : 'bg-background-alt text-primary border-black/5 hover:bg-white hover:border-accent'
                }`}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Accordion List - Right 8 cols */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="font-display font-semibold text-xs text-text-muted uppercase tracking-wider pl-2 mb-4">
              Category: {faqCategories[activeCategory].name}
            </h3>
            
            <div className="space-y-3">
              {faqCategories[activeCategory].items.map((item, idx) => (
                <div 
                  key={idx}
                  className="border border-primary/10 rounded-lg overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full text-left px-6 py-4 bg-background-alt hover:bg-accent/5 font-display font-semibold text-sm text-primary flex justify-between items-center transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`w-4 h-4 text-primary/60 transition-transform ${activeFaq === idx ? 'rotate-180 text-accent-dark' : ''}`} />
                  </button>
                  {activeFaq === idx && (
                    <div className="px-6 py-4 bg-white text-xs sm:text-sm text-text-muted leading-relaxed border-t border-primary/5 animate-[fadeIn_0.2s_ease-out]">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
