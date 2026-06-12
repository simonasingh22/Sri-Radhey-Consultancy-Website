import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Landmark, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp } from 'lucide-react';

const caseStudies = [
  {
    industry: "Food Processing (Rice Mill)",
    location: "Gorakhpur, UP",
    policy: "MSME Promotion Policy 2022",
    problem: "The client was struggling to claim a 25% capital subsidy due to indexation query rejections from the local DIC office regarding machinery vendor invoices.",
    solution: "Sri Radhey Consultancy re-audited the invoices, prepared a revised DPR complying with DIC query indices, and represented the files before the screening committee.",
    outcome: "Subsidy of Rs. 48.5 Lakhs successfully sanctioned and credited directly via DBT."
  },
  {
    industry: "Corrugated Box Manufacturing",
    location: "Basti, UP",
    policy: "Technology Upgradation Scheme & Stamp Duty Exemption",
    problem: "Filing stamp duty waivers was rejected due to missing state zone registrations; the unit was also facing delays in getting UPPCB Pollution CTO.",
    solution: "We obtained the correct zonal certificate, refiled the stamp duty claim, and compiled air/water emission reports to expedite the CTO permit from UPPCB.",
    outcome: "Stamp duty waiver of Rs. 6.2 Lakhs secured and Pollution CTO issued in 32 days, allowing plant commissioning."
  },
  {
    industry: "Textile Weaving Unit",
    location: "Khalilabad, UP",
    policy: "Women Entrepreneur Incentive & Interest Subsidy",
    problem: "A female-owned startup was facing high interest loads on term-loans due to incorrect categorization by their primary bank, preventing eligibility claims.",
    solution: "We restructured their partnership records to prove 51% female management controls and filed for interest refunds directly on Nivesh Mitra.",
    outcome: "Sanctioned 5% annual interest refund for 5 years, providing Rs. 14 Lakhs total loan interest relief."
  },
  {
    industry: "Chemical & Packaging Unit",
    location: "Lucknow, UP",
    policy: "SGST Reimbursement & Capital Subsidy",
    problem: "A mega Packaging Unit had pending SGST claims for 3 consecutive quarters due to incorrect tax ledger formatting.",
    solution: "Our compliance team formatted the monthly ledger records matching UP tax desk rules and represented claims to the state tax division.",
    outcome: "Reclaimed Rs. 38.2 Lakhs in pending SGST refunds, stabilizing operating cash flows."
  }
];

export default function SuccessStories() {
  return (
    <>
      <Helmet>
        <title>Success Stories & Case Studies | Sri Radhey Consultancy</title>
        <meta name="description" content="Read case studies of how we helped UP industrial units secure major government subsidies and regulatory clearance approvals." />
      </Helmet>

      {/* Hero Banner */}
      <section className="bg-primary text-white py-16 px-6 text-center border-b border-accent/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-accent text-xs font-bold uppercase tracking-widest">Case Studies</span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">Success Stories</h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Real outcomes showing how we resolve complex subsidy documentation and liaison queries in UP.
          </p>
        </div>
      </section>

      {/* Case Studies grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((cs, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl border border-primary/5 p-8 shadow-premium space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top line */}
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-primary font-display">{cs.industry}</h3>
                      <span className="text-xs text-text-muted">{cs.location}</span>
                    </div>
                    <span className="text-[10px] font-bold text-accent-dark px-2.5 py-1 bg-accent/15 rounded-full shrink-0">
                      {cs.policy}
                    </span>
                  </div>

                  <div className="h-px bg-black/5"></div>

                  {/* Problem & Solution block */}
                  <div className="space-y-3 text-xs leading-relaxed text-text-muted">
                    <p>
                      <strong className="text-primary block font-display text-[13px] mb-0.5">Problem Statement:</strong>
                      {cs.problem}
                    </p>
                    <p>
                      <strong className="text-primary block font-display text-[13px] mb-0.5">Liaison Solution:</strong>
                      {cs.solution}
                    </p>
                  </div>
                </div>

                {/* Outcome block */}
                <div className="bg-secondary/5 border border-secondary/15 rounded-lg p-4 flex gap-3 items-center">
                  <TrendingUp className="w-5 h-5 text-secondary shrink-0" />
                  <div>
                    <span className="text-[10px] text-secondary-dark font-bold uppercase tracking-wider block">Disbursement Outcome</span>
                    <p className="text-xs font-semibold text-primary">{cs.outcome}</p>
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
          <h2 className="text-2xl font-bold font-display">Achieve Similar Outcomes for Your Industry</h2>
          <p className="text-xs text-white/70 max-w-xl mx-auto leading-relaxed">
            Let us evaluate your eligibility and design an error-free filing dossier.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="bg-accent hover:bg-accent-dark text-primary-dark font-semibold text-xs py-3 px-6 rounded transition-all">
              Evaluate My Case
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
