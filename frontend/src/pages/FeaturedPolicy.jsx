import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileText, Landmark, Search } from 'lucide-react';
import SEO, { SITE_URL } from '../components/SEO';

const policies = [
  {
    name: 'MSME Promotion Policy 2022',
    category: 'State Policy',
    description: 'Extensive incentives for new and expanding MSMEs, offering capital subsidies on plant and machinery investments.',
    incentive: 'Up to 25% capital subsidy',
    eligibility: 'New and expanding MSMEs',
  },
  {
    name: 'Technology Upgradation Scheme 2019',
    category: 'Technology',
    description: 'Capital grants for modernization, high-tech installations, and international quality certifications.',
    incentive: '15% modernization grant',
    eligibility: 'Manufacturing units upgrading technology',
  },
  {
    name: 'Capital Subsidy Scheme',
    category: 'Capital investment',
    description: 'State support for fixed asset investments across mega projects, industrial parks, and eligible units in UP.',
    incentive: '10%–25% on investment value',
    eligibility: 'Eligible fixed-asset investors',
  },
  {
    name: 'Interest Subsidy Scheme',
    category: 'Interest exemption',
    description: 'Relief on bank loan interest for term loans used to fund plant, machinery, and industrial expansion.',
    incentive: '5%–6% annual refund',
    eligibility: 'Units with qualifying term loans',
  },
  {
    name: 'SGST Reimbursement',
    category: 'SGST refund',
    description: 'Reimbursement of State GST paid on intra-state sales, supporting manufacturing cash flows during operations.',
    incentive: 'Up to 100% SGST refund',
    eligibility: 'Registered manufacturing units',
  },
  {
    name: 'Stamp Duty Exemption',
    category: 'Duty exemption',
    description: 'Complete or partial exemption during industrial land registration and factory plot acquisition.',
    incentive: 'Up to 100% exemption',
    eligibility: 'Industrial land purchasers',
  },
];

export default function FeaturedPolicy() {
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(policies.map((policy) => policy.category))];
  const filteredPolicies = useMemo(
    () => category === 'All' ? policies : policies.filter((policy) => policy.category === category),
    [category]
  );

  return (
    <>
      <SEO
        title="Featured Government Policies | Sri Radhey Consultancy"
        description="Explore featured Uttar Pradesh industrial subsidy and incentive policies with eligibility guidance from Sri Radhey Consultancy."
        path="/featured-policy"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Featured Government Policies',
          url: `${SITE_URL}/featured-policy`,
        }}
      />

      <section className="relative overflow-hidden bg-primary text-white py-16 md:py-24 border-b border-accent/20">
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-accent/50" />
          <div className="absolute right-12 top-12 h-40 w-40 rounded-full border border-white/20" />
          <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-primary-dark/50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Policy intelligence desk</span>
          <h1 className="mt-4 max-w-3xl text-4xl md:text-6xl font-bold font-display leading-tight">Find the right incentive framework for your next industrial move.</h1>
          <p className="mt-5 max-w-2xl text-sm md:text-base text-white/75 leading-relaxed">A practical guide to featured Uttar Pradesh policies, from first eligibility checks to claim documentation and disbursement.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/70">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Eligibility-first guidance</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2"><Landmark className="h-4 w-4 text-accent" /> UP industrial schemes</span>
          </div>
        </div>
      </section>

      <main className="bg-background py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <span className="text-accent-dark text-xs font-bold uppercase tracking-widest">Featured schemes</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary font-display">Policy routes worth exploring</h2>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-primary/10 bg-white px-3 py-2 text-text-muted shadow-sm">
              <Search className="h-4 w-4" aria-hidden="true" />
              <label htmlFor="policy-category" className="sr-only">Filter policies by category</label>
              <select id="policy-category" value={category} onChange={(event) => setCategory(event.target.value)} className="bg-transparent text-xs font-semibold text-primary outline-none">
                {categories.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPolicies.map((policy) => (
              <article key={policy.name} className="group flex min-h-[315px] flex-col justify-between rounded-xl border border-primary/5 bg-white p-7 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-hover">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-accent/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-dark">{policy.category}</span>
                    <FileText className="h-5 w-5 text-primary/25" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-primary font-display">{policy.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{policy.description}</p>
                </div>
                <div className="mt-7 border-t border-black/5 pt-5">
                  <p className="text-xs font-semibold text-primary">Potential support: <span className="text-secondary">{policy.incentive}</span></p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-text-muted">Eligible: {policy.eligibility}</span>
                    <Link to="/contact" className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-primary hover:text-accent-dark">Know More <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="mt-16 rounded-2xl bg-primary px-6 py-10 text-center text-white md:px-10">
            <h2 className="text-2xl font-bold font-display">Not sure which policy applies?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/70">Share your industry, location, investment, and project stage. Our team will map the most relevant incentive route before you file.</p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded bg-accent px-6 py-3 text-sm font-semibold text-primary-dark transition-all hover:-translate-y-0.5 hover:bg-accent-dark">Book an eligibility review <ArrowRight className="h-4 w-4" /></Link>
          </section>
        </div>
      </main>
    </>
  );
}

export { policies };

