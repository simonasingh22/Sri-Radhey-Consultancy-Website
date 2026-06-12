import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Award, ShieldCheck, ChevronRight, FileText, Settings, 
  HelpCircle, MessageSquare, PhoneCall, CheckCircle2, ChevronDown,
  Building2, Leaf, Box, Scissors, Wrench, FlaskConical, Cpu, ShieldAlert,
  Calendar, Star, Quote, ArrowRight, ArrowLeft
} from 'lucide-react';
import logoImg from '../assets/logo.png';

// Sub-component for Animated Counters
function AnimatedCounter({ value, duration = 2 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Extract numeric value from string (e.g. 50 from 50+)
    const numericPart = parseInt(value.replace(/\D/g, '')) || 0;
    if (numericPart === 0) return;

    let start = 0;
    const totalSteps = 60;
    const stepDuration = (duration * 1000) / totalSteps;
    const increment = Math.ceil(numericPart / totalSteps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericPart) {
        clearInterval(timer);
        setCount(numericPart);
      } else {
        setCount(start);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, duration]);

  // Extract non-numeric parts (e.g. "₹" or "+ Cr") to append around the count
  const prefix = value.startsWith('₹') ? '₹' : '';
  const suffix = value.replace(/[0-9₹]/g, '');

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Auto sliding testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Government Subsidy & Industrial Compliance Consultant in UP | Sri Radhey Consultancy</title>
        <meta name="description" content="Secure MSME subsidies, capital & interest subsidies, Stamp Duty exemptions, Pollution NOC, and Factory licensing in Uttar Pradesh. Trusted DIC liaison partners." />
        <meta name="keywords" content="MSME subsidy consultant in UP, Industrial subsidy consultant, Capital subsidy consultant, DIC consultant, Pollution NOC consultant, Technology upgradation subsidy consultant, Government subsidy consultant" />
        {/* Schema Markup for Local Business */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Sri Radhey Consultancy",
              "image": "${window.location.origin}/src/assets/logo.png",
              "@id": "${window.location.origin}",
              "url": "${window.location.origin}",
              "telephone": "+91-9999999999",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "District Industries Centre Liaison Road",
                "addressLocality": "Gorakhpur",
                "addressRegion": "UP",
                "postalCode": "273001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "26.7588",
                "longitude": "83.3697"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:30",
                "closes": "18:30"
              },
              "sameAs": [
                "https://wa.me/919999999999"
              ]
            }
          `}
        </script>
      </Helmet>

      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden bg-[#0A1931] py-24 md:py-32 flex items-center border-b border-accent/20">
        {/* Orbital Background Effects */}
        <div className="absolute inset-0 z-0">
          {/* Subtle concentric orbit rings in background */}
          <div className="absolute top-1/2 left-3/4 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-white/5 animate-[spin_80s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-3/4 -translate-y-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full border border-accent/10 animate-[spin_40s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-3/4 -translate-y-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full border border-white/10 animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute top-10 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/20 text-accent font-semibold text-xs tracking-wider uppercase">
              <Award className="w-3.5 h-3.5" /> Approved Government Subsidy Partner
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white leading-[1.15] tracking-tight">
              Helping Industries Across Uttar Pradesh Secure <span className="text-accent">Government Subsidies</span> & Regulatory Approvals
            </h1>
            
            <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal">
              Complete assistance for MSME subsidies, DIC applications, industrial compliances, policy benefits, and subsidy claims—from documentation to DBT disbursement.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="/contact" 
                className="bg-accent hover:bg-accent-dark text-primary-dark font-semibold text-sm py-3 px-6 rounded shadow-premium transition-all hover:-translate-y-0.5 hover:shadow-premium-hover flex items-center gap-1.5"
              >
                Book Consultation <Calendar className="w-4 h-4" />
              </a>
              <a 
                href="#eligibility" 
                className="bg-primary hover:bg-primary-light text-white border border-accent/30 font-semibold text-sm py-3 px-6 rounded transition-all hover:-translate-y-0.5"
              >
                Check Eligibility
              </a>
              <a 
                href="https://wa.me/919999999999?text=Hello,%20I%20would%20like%20to%20discuss%20subsidy%20eligibility%20for%20my%20industry." 
                target="_blank" 
                rel="noreferrer"
                className="bg-secondary hover:bg-secondary-light text-white font-semibold text-sm py-3 px-6 rounded transition-all hover:-translate-y-0.5 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Expert
              </a>
            </div>
          </div>

          {/* Right Visual Column (Interactive Workflow Circle & Logo) */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
              
              {/* Outer Orbit Path */}
              <div className="absolute inset-0 rounded-full border border-dashed border-accent/30 animate-[spin_60s_linear_infinite]" />
              
              {/* Inner Orbit Circle */}
              <div className="absolute w-[80%] h-[80%] rounded-full border border-white/10 flex items-center justify-center">
                {/* Center Core Logo with Orbital Frame */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#081326] border-2 border-accent/40 flex items-center justify-center p-4 shadow-2xl z-20 group">
                  <img 
                    src={logoImg} 
                    alt="Sri Radhey Core Brand Orbit" 
                    className="w-28 h-28 object-contain transition-transform duration-500 group-hover:scale-105" 
                  />
                  {/* Subtle inner gold accent ring */}
                  <div className="absolute inset-2 rounded-full border border-accent/10 pointer-events-none group-hover:border-accent/40 transition-colors duration-500"></div>
                </div>
              </div>

              {/* Orbiting Nodes (Workflow Indicators) */}
              <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary border border-accent flex items-center justify-center shadow-lg text-[10px] font-bold text-accent z-30" title="1. Setup Guidance">01</div>
              <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary border border-accent flex items-center justify-center shadow-lg text-[10px] font-bold text-accent z-30" title="2. DIC Approval">02</div>
              <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary border border-accent flex items-center justify-center shadow-lg text-[10px] font-bold text-accent z-30" title="3. Claim Verified">03</div>
              <div className="absolute left-[8%] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary border border-accent flex items-center justify-center shadow-lg text-[10px] font-bold text-accent z-30" title="4. DBT Disbursed">04</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST INDICATORS */}
      <section className="bg-primary py-8 text-white relative border-b border-accent/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-white/10">
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-accent mb-1">
              <AnimatedCounter value="50+" /> Cr
            </div>
            <div className="text-[10px] sm:text-xs text-white/70 uppercase tracking-widest font-semibold">Subsidy Assistance</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-accent mb-1">
              <AnimatedCounter value="300+" />
            </div>
            <div className="text-[10px] sm:text-xs text-white/70 uppercase tracking-widest font-semibold">Clients Assisted</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-accent mb-1">
              <AnimatedCounter value="20+" />
            </div>
            <div className="text-[10px] sm:text-xs text-white/70 uppercase tracking-widest font-semibold">Districts Covered</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-accent mb-1">
              <AnimatedCounter value="15+" />
            </div>
            <div className="text-[10px] sm:text-xs text-white/70 uppercase tracking-widest font-semibold">Policies Managed</div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES OVERVIEW */}
      <section className="py-20 bg-background-alt">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-accent-dark text-xs font-bold uppercase tracking-widest">Our Offerings</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-display">Specialized Industrial Consultancy Services</h2>
            <div className="h-0.5 w-20 bg-accent mx-auto mt-2"></div>
            <p className="text-text-muted text-sm sm:text-base mt-3">
              We guide you step-by-step through government systems to unlock maximum subsidies and ensure total regulatory compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
            
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-lg border border-primary/5 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 bg-primary/5 text-primary flex items-center justify-center rounded-lg mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">Subsidy Consultancy</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Maximizing payouts from MSME incentive schemes, capital grants, and power subsidies across all UP districts.
                </p>
              </div>
              <a href="/services" className="text-accent-dark hover:text-accent font-semibold text-xs mt-6 flex items-center justify-center gap-1 group/link">
                Learn More <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-lg border border-primary/5 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 bg-primary/5 text-primary flex items-center justify-center rounded-lg mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">Compliance NOCs</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Liaisoning for critical clearances like Pollution NOC, labor registration, electrical safety, and factory safety layouts.
                </p>
              </div>
              <a href="/compliance" className="text-accent-dark hover:text-accent font-semibold text-xs mt-6 flex items-center justify-center gap-1 group/link">
                Learn More <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-lg border border-primary/5 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 bg-primary/5 text-primary flex items-center justify-center rounded-lg mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">Documentation Setup</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Accurate formatting of detail project reports (DPRs), balance sheet indexing, and industrial certificates processing.
                </p>
              </div>
              <a href="/services" className="text-accent-dark hover:text-accent font-semibold text-xs mt-6 flex items-center justify-center gap-1 group/link">
                Learn More <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-lg border border-primary/5 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 bg-primary/5 text-primary flex items-center justify-center rounded-lg mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">Government Liaison</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Representation and active follow-up at District Industries Centres (DIC) and UP regulatory state desks.
                </p>
              </div>
              <a href="/services" className="text-accent-dark hover:text-accent font-semibold text-xs mt-6 flex items-center justify-center gap-1 group/link">
                Learn More <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: HOW WE WORK (TIMELINE) */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-accent-dark text-xs font-bold uppercase tracking-widest">Our Method</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-display">Step-by-Step Engagement Workflow</h2>
            <div className="h-0.5 w-20 bg-accent mx-auto mt-2"></div>
            <p className="text-text-muted text-sm mt-3">
              We drive each application manually through structured phases to avoid rejection and delay.
            </p>
          </div>

          {/* Grid Layout containing Timeline list left and Dynamic Details Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Timeline Selection Stack (10 steps) - 7 cols */}
            <div className="lg:col-span-7 space-y-3">
              {workflowSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTimelineStep(idx)}
                  className={`w-full text-left px-5 py-4 rounded-lg border transition-all duration-300 flex items-center gap-4 group ${
                    activeTimelineStep === idx
                      ? 'bg-primary text-white border-primary shadow-premium'
                      : 'bg-background-alt border-black/5 text-primary hover:bg-white hover:border-accent'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    activeTimelineStep === idx
                      ? 'bg-accent text-primary'
                      : 'bg-primary/5 text-primary font-bold'
                  }`}>
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <div className="flex-grow">
                    <h4 className="font-display font-semibold text-sm leading-none">{step.title}</h4>
                    <p className={`text-[11px] mt-1 ${activeTimelineStep === idx ? 'text-white/70' : 'text-text-muted'}`}>
                      {step.shortText}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    activeTimelineStep === idx ? 'text-accent translate-x-1' : 'text-primary/40 group-hover:translate-x-1'
                  }`} />
                </button>
              ))}
            </div>

            {/* Dynamic Step Details card - 5 cols */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 bg-primary-dark text-white rounded-xl p-8 border border-accent/20 shadow-2xl relative overflow-hidden">
              {/* Orbital aura highlight */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded text-[10px] font-semibold tracking-wider uppercase">
                  Step {activeTimelineStep + 1} of 10
                </div>
                
                <h3 className="text-2xl font-bold font-display text-white">
                  {workflowSteps[activeTimelineStep].title}
                </h3>
                
                <p className="text-sm text-white/80 leading-relaxed font-sans min-h-[120px]">
                  {workflowSteps[activeTimelineStep].description}
                </p>

                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Required Action / Deliverable</h4>
                  <ul className="space-y-2">
                    {workflowSteps[activeTimelineStep].deliverables.map((item, id) => (
                      <li key={id} className="text-xs text-white/70 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button 
                    onClick={() => setActiveTimelineStep((prev) => (prev - 1 + 10) % 10)}
                    className="p-2 border border-white/10 rounded hover:bg-white/5 text-white/80"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-white/40">Use arrows to toggle</span>
                  <button 
                    onClick={() => setActiveTimelineStep((prev) => (prev + 1) % 10)}
                    className="p-2 border border-accent/40 rounded bg-accent/15 text-accent hover:bg-accent/30"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: FEATURED POLICIES */}
      <section className="py-20 bg-background-alt border-y border-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-accent-dark text-xs font-bold uppercase tracking-widest">UP State Subsidies</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-display">Featured Government Policies & Schemes</h2>
            <div className="h-0.5 w-20 bg-accent mx-auto mt-2"></div>
            <p className="text-text-muted text-sm mt-3">
              We assist industrial applicants in applying under specific legislative policies of the UP Government.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPolicies.map((policy, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-lg border border-primary/5 shadow-premium hover:shadow-premium-hover transition-all duration-300 p-8 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-accent-dark uppercase tracking-wider px-2.5 py-1 bg-accent/10 rounded-full">
                      {policy.category}
                    </span>
                    <span className="text-xs text-text-muted font-mono">2026 Active</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-3 font-display">
                    {policy.name}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed mb-6">
                    {policy.description}
                  </p>
                </div>
                
                <div className="border-t border-black/5 pt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary">Incentive: <span className="text-secondary">{policy.incentive}</span></span>
                  <a href="/policies" className="text-primary hover:text-accent-dark text-xs font-bold flex items-center gap-1">
                    Details <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: INDUSTRIES SERVED */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-accent-dark text-xs font-bold uppercase tracking-widest">Sectors Covered</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-display">Manufacturing & Processing Industries Served</h2>
            <div className="h-0.5 w-20 bg-accent mx-auto mt-2"></div>
            <p className="text-text-muted text-sm mt-3">
              We specialize in mapping sector-specific compliance rules to optimize eligibility.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industriesServed.map((ind, idx) => (
              <div 
                key={idx}
                className="border border-primary/5 bg-background-alt p-6 rounded-lg text-center flex flex-col items-center hover:bg-primary hover:text-white transition-all duration-300 group shadow-sm hover:shadow-premium hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-primary/5 text-primary flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-primary transition-colors duration-300">
                  {ind.icon}
                </div>
                <h4 className="font-display font-bold text-sm tracking-wide group-hover:text-white text-primary">
                  {ind.name}
                </h4>
                <p className="text-[10px] text-text-muted group-hover:text-white/70 mt-1">
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: WHY CHOOSE US */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full border border-white"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-accent text-xs font-bold uppercase tracking-widest">Why Partner With Us</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white">UP's Leading Industrial Regulatory & Incentive Advisory</h2>
            <p className="text-white/80 text-sm leading-relaxed">
              We are not just documentation agents. We coordinate actively with regulatory desks in Gorakhpur and Lucknow to drive claims from registration to disbursal.
            </p>
            <div className="pt-2">
              <a href="/about" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-primary-dark font-semibold text-xs py-3 px-6 rounded transition-all">
                More About Our Credentials <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Checklist Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyChooseUsList.map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-5 flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-sm text-white mb-1">{item.title}</h4>
                  <p className="text-[11px] text-white/70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: TESTIMONIALS */}
      <section className="py-20 bg-background-alt overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-accent-dark text-xs font-bold uppercase tracking-widest">Client Reviews</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-display">Success Stories from Factory Owners</h2>
            <div className="h-0.5 w-20 bg-accent mx-auto mt-2"></div>
          </div>

          <div className="max-w-3xl mx-auto relative px-8">
            {/* Slider Content */}
            <div className="bg-white border border-primary/5 p-8 sm:p-12 rounded-xl shadow-premium relative">
              <Quote className="absolute top-6 left-6 text-primary/5 w-16 h-16 pointer-events-none" />
              
              <div className="flex gap-1.5 text-accent mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              
              <p className="text-sm sm:text-base text-text-muted italic leading-relaxed mb-6 font-sans">
                "{testimonials[testimonialIndex].feedback}"
              </p>
              
              <div className="flex justify-between items-end border-t border-black/5 pt-6">
                <div>
                  <h4 className="font-display font-bold text-sm text-primary">{testimonials[testimonialIndex].name}</h4>
                  <span className="text-[11px] text-accent-dark font-medium">{testimonials[testimonialIndex].designation}</span>
                  <p className="text-[10px] text-text-muted mt-0.5">{testimonials[testimonialIndex].location}</p>
                </div>
                <div className="bg-background-alt px-3 py-1.5 rounded border border-black/5 text-[10px] font-mono text-primary">
                  Policy: {testimonials[testimonialIndex].policy}
                </div>
              </div>
            </div>

            {/* Slider controls */}
            <div className="flex justify-center gap-4 mt-8">
              <button 
                onClick={() => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-primary/10 hover:border-accent bg-white flex items-center justify-center text-primary hover:text-accent-dark transition-all shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-primary/10 hover:border-accent bg-white flex items-center justify-center text-primary hover:text-accent-dark transition-all shadow-sm"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQS */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-3 mb-16">
            <span className="text-accent-dark text-xs font-bold uppercase tracking-widest">Help Desk</span>
            <h2 className="text-3xl font-bold text-primary font-display">Frequently Answered Queries</h2>
            <div className="h-0.5 w-20 bg-accent mx-auto mt-2"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-primary/10 rounded-lg overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-4 bg-background-alt hover:bg-accent/5 font-display font-semibold text-sm text-primary flex justify-between items-center transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-primary/60 transition-transform ${activeFaq === idx ? 'rotate-180 text-accent-dark' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 py-4 bg-white text-xs sm:text-sm text-text-muted leading-relaxed border-t border-primary/5 animate-[fadeIn_0.2s_ease-out]">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: FINAL CTA */}
      <section className="py-16 bg-[#0A1931] text-white border-t border-accent/20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 animate-[spin_50s_linear_infinite]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
            Need Expert Assistance Claiming Government Subsidies?
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
            Ensure document accuracy and avoid DIC registry rejections. Talk to our regulatory consultants today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a 
              href="/contact" 
              className="bg-accent hover:bg-accent-dark text-primary-dark font-semibold text-sm py-3 px-6 rounded shadow-premium transition-all hover:-translate-y-0.5"
            >
              Book Free Consultation
            </a>
            <a 
              href="https://wa.me/919999999999?text=Hello,%20I%20would%20like%20to%20discuss%20subsidy%20eligibility%20for%20my%20industry." 
              target="_blank" 
              rel="noreferrer"
              className="bg-secondary hover:bg-secondary-light text-white font-semibold text-sm py-3 px-6 rounded transition-all hover:-translate-y-0.5 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// Static Data Structures

const workflowSteps = [
  {
    title: "Lead Consultation",
    shortText: "Briefing and initial check.",
    description: "Our consultancy team reviews your manufacturing unit's profile, including plant scale, machinery investment value, power connections, and location details to define baseline parameters.",
    deliverables: ["Establishment registration document check", "Machinery investment verification"]
  },
  {
    title: "Policy Discussion",
    shortText: "Identifying best schemes.",
    description: "Aligning your setup with active policy frameworks, such as the UP MSME Promotion Policy 2022 or the Capital Subsidy directives to match highest eligible benefits.",
    deliverables: ["Policy mapping report", "Estimated subsidy payout summary"]
  },
  {
    title: "WhatsApp Group Creation",
    shortText: "Direct messaging thread.",
    description: "We set up a dedicated WhatsApp group including you, your accounts team, and our DIC liaison officers for instant coordination, document requests, and processing updates.",
    deliverables: ["WhatsApp group setup", "Client project coordinator assignment"]
  },
  {
    title: "Document Collection",
    shortText: "Compilation checklist.",
    description: "Gathering necessary documents like industrial land lease/purchase records, building approvals, electrical connection bills, machinery bank appraisals, and audit files.",
    deliverables: ["Centralized document checklist", "Secure digital upload folder access"]
  },
  {
    title: "Document Formatting",
    shortText: "DPR and indexing setup.",
    description: "Converting raw factory data into government-compliant detailed project reports (DPRs), indexing balances, and formatting annexures exactly as specified by regulatory guides.",
    deliverables: ["Completed DPR booklet", "Audited balance sheet summaries"]
  },
  {
    title: "Application Filing",
    shortText: "Digital portal uploads.",
    description: "Uploading finalized documents to Nivesh Mitra portal and other official regulatory systems, verifying digital signatures, and mapping correct scheme application IDs.",
    deliverables: ["Portal application acknowledgement slip", "Unique tracking ID registration"]
  },
  {
    title: "Offline Submission",
    shortText: "Hard-copy file setup.",
    description: "Printing high-quality color-indexed dossier sets, getting mandatory signatures, and physically submitting bound copy files to the Gorakhpur / District office.",
    deliverables: ["Physically indexed dossier copy", "Office receipt stamp verification"]
  },
  {
    title: "DIC Coordination",
    shortText: "Liaisoning and queries.",
    description: "Proactive communication with DIC inspectors. Resolving administrative queries (objections) and coordinating physical inspections if mandated by regulations.",
    deliverables: ["DIC inspection schedule coordination", "Query resolution answers preparation"]
  },
  {
    title: "Follow-Up",
    shortText: "Committee approvals.",
    description: "Tracking the file status through district/state-level approval committees, representing the client during review hearings, and securing formal subsidy sanction letters.",
    deliverables: ["Formal government sanction letter copy", "Sanction records registration"]
  },
  {
    title: "DBT Subsidy Disbursement",
    shortText: "Direct bank transfer.",
    description: "Securing bank clearance for direct bank transfer (DBT) credit transactions and tracking disbursement schedules until the subsidy amount is successfully credited to your bank account.",
    deliverables: ["Subsidy disbursement confirmation receipt", "Direct credit check in bank ledger"]
  }
];

const featuredPolicies = [
  {
    name: "MSME Promotion Policy 2022",
    category: "State Policy",
    description: "Extensive incentives for new and expanding MSMEs, offering capital subsidies up to 25% on plant and machinery investments.",
    incentive: "Up to 25% Capital Subsidy",
  },
  {
    name: "Technology Upgradation Scheme 2019",
    category: "Technology",
    description: "Incentivizes technology shifts. Provides capital grants for modernization, high-tech installations, and international quality certifications.",
    incentive: "15% Capital Modernization Grant",
  },
  {
    name: "Capital Subsidy Scheme",
    category: "Capital investment",
    description: "Core state grant on capital building blocks. Covers fixed asset investments for mega projects and industrial parks in UP.",
    incentive: "10% to 25% on Investment Value",
  },
  {
    name: "Interest Subsidy Scheme",
    category: "Interest Exemption",
    description: "Exemptions on bank loan interest charges for term loans taken to fund plant machinery purchases or industrial expansion.",
    incentive: "5% to 6% per annum refund",
  },
  {
    name: "SGST Reimbursement",
    category: "SGST Refund",
    description: "Reimbursement of State Goods and Services Tax (SGST) paid on intra-state sales, supporting manufacturing units with operational cash flows.",
    incentive: "Up to 100% SGST refund for 10 yrs",
  },
  {
    name: "Stamp Duty Exemption",
    category: "Duty Exemption",
    description: "Complete or partial exemption of stamp duty fees during industrial land registration and factory plot acquisition.",
    incentive: "Up to 100% exemption on Land purchase",
  }
];

const industriesServed = [
  {
    name: "Manufacturing",
    desc: "Heavy & light manufacturing setups",
    icon: <Building2 className="w-5 h-5" />
  },
  {
    name: "Food Processing",
    desc: "Cold storage, flour & rice mills",
    icon: <Leaf className="w-5 h-5" />
  },
  {
    name: "Packaging",
    desc: "Cartons, plastics & paper mills",
    icon: <Box className="w-5 h-5" />
  },
  {
    name: "Textiles",
    desc: "Spinning, weaving & garments units",
    icon: <Scissors className="w-5 h-5" />
  },
  {
    name: "Engineering",
    desc: "Casting, fabrication & machining",
    icon: <Wrench className="w-5 h-5" />
  },
  {
    name: "Chemicals",
    desc: "Industrial reagents & specialty compounds",
    icon: <FlaskConical className="w-5 h-5" />
  },
  {
    name: "Electronics",
    desc: "Hardware assembly & board manufacturing",
    icon: <Cpu className="w-5 h-5" />
  },
  {
    name: "Pharma",
    desc: "Drug formulations & botanical extracts",
    icon: <ShieldAlert className="w-5 h-5" />
  }
];

const whyChooseUsList = [
  {
    title: "End-to-End Handling",
    desc: "From initial baseline analysis and document formatting to final DBT bank credit."
  },
  {
    title: "District-Level Expertise",
    desc: "Deep awareness of local DIC regulations and requirements throughout Uttar Pradesh."
  },
  {
    title: "DIC Coordination",
    desc: "Representing files in review committees and resolving administrative queries."
  },
  {
    title: "Documentation Accuracy",
    desc: "Precision project reports (DPRs) to ensure zero rejections during screening."
  },
  {
    title: "Compliance Support",
    desc: "Filing and sourcing necessary Pollution NOC, electrical safety, and factory licensing."
  },
  {
    title: "Dedicated Follow-Up",
    desc: "Constant tracking via dedicated client WhatsApp threads for active files."
  }
];

const testimonials = [
  {
    name: "Shri Rajesh Agrawal",
    designation: "Owner, Agrawal Agro Industries",
    location: "Gorakhpur, UP",
    feedback: "Sri Radhey Consultancy handled our capital subsidy application under the MSME Policy 2022. They formatted our project reports and coordinated with the DIC Gorakhpur. The entire sanctioned incentive amount was credited to our bank account via DBT without any hassle.",
    policy: "MSME Policy 2022",
    rating: 5
  },
  {
    name: "Shri Amit Mishra",
    designation: "Director, Trishul Packaging Products",
    location: "Basti, UP",
    feedback: "Getting a Pollution NOC and Electrical Safety clearance was a major headache for our new factory setup. The Sri Radhey team compiled the dossiers and obtained all five compliances in record time. Excellent liaison services.",
    policy: "UPPCB Pollution NOC & Safety License",
    rating: 5
  },
  {
    name: "Shri Sanjay Jaiswal",
    designation: "Managing Partner, Jaiswal Food Processors",
    location: "Lucknow, UP",
    feedback: "Thanks to Sri Radhey Consultancy, we secured stamp duty exemption and a 5% interest subsidy on our bank term loan. Their documentation accuracy is excellent. Highly recommended for any UP industrialist.",
    policy: "Interest Subsidy & Stamp Duty Exemption",
    rating: 5
  }
];

const faqs = [
  {
    question: "What types of subsidies are available for new manufacturing industries in UP?",
    answer: "New industrial units in UP are eligible for multiple benefits under policies like the MSME Promotion Policy 2022. This includes: (1) Capital Subsidies up to 25% on plant and machinery investment, (2) Interest Subsidies on term loans (up to 6%), (3) Complete or partial Stamp Duty exemptions (up to 100%), and (4) State GST reimbursements for up to 10 years."
  },
  {
    question: "How long does the entire subsidy approval and disbursement process take?",
    answer: "The timeline depends on the complexity of the application and the scheme. Standard MSME subsidy applications take between 4 to 8 months. This includes document collection, dossier preparation, online filing on portals like Nivesh Mitra, DIC screening committee reviews, inspection scheduling, sanctioning, and subsequent direct bank transfer (DBT) credit."
  },
  {
    question: "What documents are required to start a capital subsidy application?",
    answer: "The baseline requirements are: (1) Industry Registration (Udyam Registration), (2) Land deeds, lease documents, or rent agreements, (3) Detailed Project Report (DPR), (4) Copy of bank term-loan sanction letter and disbursement slips, (5) Certified valuation bills of machinery, (6) Valid pollution control board clearances (NOC), and (7) Audited balance sheets."
  },
  {
    question: "Can an existing factory apply for a subsidy under the Technology Upgradation Scheme?",
    answer: "Yes. Existing units undertaking modernization, diversification, or technology changes are eligible for incentives under the Technology Upgradation Scheme. This covers capital grants for purchasing advanced high-efficiency machinery and achieving global quality standards."
  },
  {
    question: "What are compliance NOCs, and why are they necessary before claiming subsidies?",
    answer: "Compliance NOCs (No Objection Certificates) are regulatory permits required to operate an industrial facility. Standard ones include Pollution NOC (CTE & CTO from UPPCB), Labour registration, Fire Safety NOC, and Factory License. Most government subsidy programs require valid operational compliance certificates as a pre-condition for releasing direct cash funds."
  }
];
