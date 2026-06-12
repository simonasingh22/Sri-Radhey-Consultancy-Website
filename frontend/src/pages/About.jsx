import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Award, Compass, Eye, ShieldCheck, Zap, Handshake, Network, CalendarRange } from 'lucide-react';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Sri Radhey Consultancy - Industrial Incentive Advisors</title>
        <meta name="description" content="Learn more about Sri Radhey Consultancy. We are Uttar Pradesh's leading consultancy team for MSME promotion policies and factory compliance NOCs." />
      </Helmet>

      {/* Hero Banner */}
      <section className="bg-primary text-white py-16 px-6 text-center border-b border-accent/20 relative">
        <div className="absolute inset-0 bg-[#0A1931] opacity-50 z-0"></div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="text-accent text-xs font-bold uppercase tracking-widest">Our Profile</span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">About Sri Radhey Consultancy</h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Uttar Pradesh's trusted partner for securing state government subsidies and establishing legal factory clearances.
          </p>
        </div>
      </section>

      {/* Profile & History */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-primary font-display">Helping Industries Claim Incentives Seamlessly</h2>
            <div className="h-0.5 w-16 bg-accent"></div>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              Based in Uttar Pradesh, **Sri Radhey Consultancy** was established to address the critical gaps in industrial incentive administration. While the state government offers generous benefits under programs like the *MSME Promotion Policy 2022*, many factory owners fail to qualify due to minor documentation mistakes, incorrect file formatting, or missed deadlines.
            </p>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              We specialize in preparing detailed project reports (DPRs), organizing financial audits, resolving DIC registry issues, and representing applicants before state review desks. Our compliance division similarly assists factories in obtaining regulatory permits like UPPCB Pollution NOCs, Electrical Safety certifications, and Fire safety clear documents.
            </p>
          </div>
          <div className="lg:col-span-5 bg-background-alt border border-primary/5 rounded-xl p-8 shadow-premium space-y-4">
            <h3 className="font-display font-bold text-lg text-primary">Key Credentials</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-text-muted"><strong className="text-primary">100% Legal Route:</strong> Every application is filed through formal government portals like Nivesh Mitra with strict audit trails.</p>
              </div>
              <div className="flex gap-3">
                <Handshake className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-text-muted"><strong className="text-primary">DIC Liaisoning:</strong> Experienced managers representing applications directly inside district committees.</p>
              </div>
              <div className="flex gap-3">
                <Zap className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-text-muted"><strong className="text-primary">Fast CTO/CTE:</strong> Accelerated processing pathways for pollution and labor registrations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-background-alt border-y border-primary/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="bg-white rounded-lg p-8 border border-primary/5 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 text-accent-dark flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-primary font-display">Our Mission</h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              To empower industrial growth in Uttar Pradesh by making state subsidies and compliances simple, accurate, and completely transparent for manufacturing units.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-lg p-8 border border-primary/5 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 text-accent-dark flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-primary font-display">Our Vision</h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              To be Uttar Pradesh's most trusted industrial compliance consultancy, recognized for procedural integrity, high success rates, and contribution to MSME growth.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-accent-dark text-xs font-bold uppercase tracking-widest">Principles</span>
            <h2 className="text-2xl md:text-3xl font-bold text-primary font-display">Our Core Values</h2>
            <div className="h-0.5 w-16 bg-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            <div className="p-6 bg-background-alt border border-black/5 rounded-lg text-center space-y-3">
              <div className="w-10 h-10 rounded bg-primary text-white flex items-center justify-center mx-auto"><ShieldCheck className="w-5 h-5" /></div>
              <h4 className="font-display font-bold text-sm text-primary">Absolute Integrity</h4>
              <p className="text-[11px] text-text-muted leading-relaxed">We strictly practice ethical guidelines, avoiding shortcut filings that risk blacklisting.</p>
            </div>
            <div className="p-6 bg-background-alt border border-black/5 rounded-lg text-center space-y-3">
              <div className="w-10 h-10 rounded bg-primary text-white flex items-center justify-center mx-auto"><Award className="w-5 h-5" /></div>
              <h4 className="font-display font-bold text-sm text-primary">Technical Excellence</h4>
              <p className="text-[11px] text-text-muted leading-relaxed">Formatting documents to government standards to assure approvals on primary checks.</p>
            </div>
            <div className="p-6 bg-background-alt border border-black/5 rounded-lg text-center space-y-3">
              <div className="w-10 h-10 rounded bg-primary text-white flex items-center justify-center mx-auto"><Network className="w-5 h-5" /></div>
              <h4 className="font-display font-bold text-sm text-primary">Active Liaisoning</h4>
              <p className="text-[11px] text-text-muted leading-relaxed">Maintaining boots-on-the-ground coordinate lines at Gorakhpur and Lucknow desks.</p>
            </div>
            <div className="p-6 bg-background-alt border border-black/5 rounded-lg text-center space-y-3">
              <div className="w-10 h-10 rounded bg-primary text-white flex items-center justify-center mx-auto"><Zap className="w-5 h-5" /></div>
              <h4 className="font-display font-bold text-sm text-primary">Client Transparency</h4>
              <p className="text-[11px] text-text-muted leading-relaxed">Providing real-time updates and checklist statuses via active WhatsApp threads.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory timeline */}
      <section className="py-20 bg-background-alt border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-accent-dark text-xs font-bold uppercase tracking-widest">Timeline</span>
            <h2 className="text-2xl md:text-3xl font-bold text-primary font-display">Our General Engagement Timeline</h2>
            <div className="h-0.5 w-16 bg-accent mx-auto"></div>
          </div>

          <div className="relative border-l-2 border-accent max-w-2xl mx-auto text-left pl-6 space-y-8 py-4">
            <div className="relative">
              <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-accent"></span>
              <h4 className="font-display font-bold text-sm text-primary">Week 1: Checklist & Verification</h4>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">Reviewing plant records, machinery investment bills, checking baseline eligibility constraints.</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-accent"></span>
              <h4 className="font-display font-bold text-sm text-primary">Week 2-3: DPR Formatting & Digital Filing</h4>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">Structuring DPR files, preparing audit balances, and executing uploads to Nivesh Mitra system.</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-accent"></span>
              <h4 className="font-display font-bold text-sm text-primary">Week 4-6: Physical Dossier Submission & DIC Inspections</h4>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">Submitting bound dossiers offline, coordinating inspections with local DIC regulatory teams.</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-accent"></span>
              <h4 className="font-display font-bold text-sm text-primary">Month 2-6: Committee Clearances & Bank Credit (DBT)</h4>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">Tracking approval committee meetings, issuing sanctions, and securing direct bank credit credits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16 px-6 text-center border-t border-accent/20">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold font-display">Ready to Secure Your Industrial Benefits?</h2>
          <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto">
            Book a consultation session with our liaison experts to review your factory plans.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/contact" className="bg-accent hover:bg-accent-dark text-primary-dark font-semibold text-xs py-3 px-6 rounded transition-all shadow-premium">
              Book a Consultation
            </a>
            <a 
              href="https://wa.me/919999999999?text=Hello,%20I%20would%20like%20to%20discuss%20subsidy%20eligibility%20for%20my%20industry." 
              target="_blank" 
              rel="noreferrer"
              className="bg-secondary hover:bg-secondary-light text-white font-semibold text-xs py-3 px-6 rounded transition-all"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
