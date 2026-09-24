import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Award, ShieldCheck, ChevronRight, FileText, Settings,
  HelpCircle, MessageSquare, PhoneCall, CheckCircle2, ChevronDown,
  Building2, Scissors, Pill, Cpu, ClipboardCheck, SearchCheck, Files,
  Landmark, BadgeCheck, Send, CircleCheck, Calendar, Quote, ArrowRight, ArrowLeft
} from 'lucide-react';
import logoImg from '../assets/logo.png';
import { useSettings } from '../context/SettingsContext';
import SEO, { SITE_URL, createOrganizationSchema } from '../components/SEO';

export default function Home() {
  const { settings } = useSettings();
  const [activeFaq, setActiveFaq] = useState(null);
  const [heroPhrase, setHeroPhrase] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const heroPhrases = ['MSME Subsidy Experts', 'NOC & Compliance Desk', 'Gorakhpur to Greater Noida'];
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setHeroPhrase((prev) => (prev + 1) % heroPhrases.length), 2600);
    return () => clearInterval(timer);
  }, [heroPhrases.length]);

  useEffect(() => {
    if (isCarouselPaused) return undefined;
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isCarouselPaused]);

  return (
    <>
      <SEO
        title="Government Subsidy & Industrial Compliance Consultant in UP"
        description="Secure MSME subsidies, capital and interest subsidies, SGST reimbursement, Pollution NOC, and Factory licensing in Uttar Pradesh with trusted DIC liaison partners."
        path="/"
        keywords="MSME subsidy consultant in UP, Industrial subsidy consultant, Capital subsidy consultant, DIC consultant, Pollution NOC consultant, Technology upgradation subsidy consultant, Government subsidy consultant"
        jsonLd={[
          createOrganizationSchema(settings),
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: 'Sri Radhey Consultancy',
            url: SITE_URL,
            publisher: { '@id': `${SITE_URL}/#organization` },
          },
        ]}
      />

      {/* SECTION 1: HERO */}
      <section className="relative isolate overflow-hidden bg-[#071426] py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(196,151,55,0.16),transparent_34%),linear-gradient(120deg,#071426_0%,#0d2340_58%,#102c4a_100%)]" />
        <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1 }} className="absolute inset-x-0 bottom-0 h-48 opacity-80" aria-hidden="true">
          <div className="absolute inset-x-0 bottom-0 h-24 bg-[#06101f]" />
          <div className="absolute bottom-24 left-[4%] h-24 w-28 bg-[#091b30] md:h-32 md:w-40" />
          <div className="absolute bottom-24 left-[18%] h-16 w-24 bg-[#091b30] md:h-24 md:w-32" />
          <div className="absolute bottom-24 right-[10%] h-28 w-36 bg-[#091b30] md:h-40 md:w-52" />
          <div className="absolute bottom-24 left-[10%] h-32 w-3 bg-[#06101f] md:h-44" />
          <div className="absolute bottom-24 left-[11.5%] h-2 w-20 bg-[#06101f] md:w-32" />
          <div className="absolute bottom-24 right-[24%] h-40 w-4 bg-[#06101f] md:h-56" />
          <div className="absolute bottom-[16rem] right-[23.4%] h-2 w-28 bg-[#06101f] md:w-44" />
          <div className="absolute bottom-24 left-[40%] h-20 w-2 bg-[#06101f] md:h-28" />
          <div className="absolute bottom-[9rem] left-[40%] h-2 w-24 rotate-[24deg] bg-[#06101f] md:w-40" />
        </motion.div>
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent"><Award className="h-3.5 w-3.5" /> Industrial growth, handled end to end</div>
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">Build with confidence. <span className="text-accent">Claim what you&apos;re entitled to.</span></h1>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base md:text-lg">Strategic subsidy advisory and regulatory support for ambitious industrial units across Uttar Pradesh.</p>
            <div className="mt-4 flex min-h-6 items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent"><span className="h-2 w-2 animate-pulse rounded-full bg-accent" /> <AnimatePresence mode="wait"><motion.span key={heroPhrases[heroPhrase]} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }}>{heroPhrases[heroPhrase]}</motion.span></AnimatePresence></div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="inline-flex items-center justify-center gap-2 rounded bg-accent px-6 py-3 text-sm font-bold text-primary-dark shadow-premium transition hover:-translate-y-0.5 hover:bg-accent-dark"><Calendar className="h-4 w-4" /> Book Consultation</a>
              <a href={`https://wa.me/${settings.whatsapp}?text=Hello,%20I%20would%20like%20to%20discuss%20subsidy%20eligibility%20for%20my%20industry.`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded border border-white/35 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"><MessageSquare className="h-4 w-4" /> WhatsApp Expert</a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="hidden min-h-[270px] items-end justify-end md:flex">
            <div className="w-full max-w-sm border-l border-accent/40 pl-6"><p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Sri Radhey Consultancy</p><p className="mt-3 font-display text-2xl font-semibold leading-tight text-white">From project setup to approved disbursement.</p><div className="mt-6 flex items-center gap-3 text-sm text-white/60"><span className="h-px w-10 bg-accent" /> Uttar Pradesh industrial desk</div></div>
          </motion.div>
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

      {/* SECTION 3: HOW WE WORK */}
      <section className="bg-white py-16" aria-labelledby="workflow-heading">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-dark">Our Method</span>
            <h2 id="workflow-heading" className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">A clear path from idea to incentive</h2>
            <div className="mx-auto mt-4 h-0.5 w-20 bg-accent" />
            <p className="mt-4 text-sm leading-relaxed text-text-muted">We drive each application through structured phases to reduce uncertainty, rework, and delay.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {workflowSteps.map((step, idx) => {
              const StepIcon = [ClipboardCheck, SearchCheck, MessageSquare, Files, Settings, Landmark, BadgeCheck, Send, CircleCheck, Award][idx] || CheckCircle2;
              return (
                <motion.article key={step.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: idx * 0.05, duration: 0.45 }} className="group rounded-xl border border-primary/10 bg-background-alt p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-white hover:shadow-premium">
                  <div className="flex items-center justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-accent transition-colors group-hover:bg-accent group-hover:text-primary-dark"><StepIcon className="h-5 w-5" /></div><span className="font-display text-xs font-bold tracking-widest text-primary/35">{String(idx + 1).padStart(2, '0')}</span></div>
                  <h3 className="mt-6 font-display text-sm font-bold text-primary">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-text-muted">{step.shortText}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED POLICY TEASER */}

      {/* SECTION 5: FEATURED POLICY TEASER */}
      <section className="bg-background-alt border-y border-primary/5 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-2xl bg-primary text-white px-6 py-8 md:px-10 md:py-9 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-premium">
            <div className="max-w-2xl space-y-2">
              <span className="text-accent text-xs font-bold uppercase tracking-widest">UP State Subsidies</span>
              <h2 className="text-2xl md:text-3xl font-bold font-display">Featured Government Policy</h2>
              <p className="text-sm text-white/70 leading-relaxed">
                Explore active UP incentive frameworks and find the policy route that best fits your industrial investment.
              </p>
            </div>
            <a href="/featured-policy" className="inline-flex shrink-0 items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-primary-dark font-semibold text-sm py-3 px-6 rounded transition-all hover:-translate-y-0.5">
              Know More <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 6: MANUFACTURING SECTOR COVERAGE */}
      <section className="bg-white py-20" aria-labelledby="sector-coverage-heading">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-dark">Manufacturing Sector Coverage</span>
            <h2 id="sector-coverage-heading" className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">Focused support for high-growth units</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">We map sector-specific incentives and compliance requirements to help each unit move forward with confidence.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {sectorCoverage.map((sector) => (
              <div key={sector.name} className="group min-h-[156px] rounded-xl border border-primary/10 bg-background-alt p-5 transition-all hover:-translate-y-1 hover:border-accent/60 hover:bg-primary hover:shadow-premium">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-accent group-hover:text-primary-dark">{sector.icon}</div>
                <h3 className="font-display text-sm font-bold text-primary group-hover:text-white">{sector.name}</h3>
                <p className="mt-1 text-[11px] leading-relaxed text-text-muted group-hover:text-white/70">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: PARTNER POSITIONING */}
      <section className="relative overflow-hidden bg-primary py-20 text-white" aria-labelledby="partner-heading">
        <div className="absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border border-white/10" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Our regional advantage</span>
            <h2 id="partner-heading" className="mt-4 font-display text-3xl font-bold text-white md:text-5xl">Gorakhpur <span className="mx-2 text-accent" aria-hidden="true">→</span> Greater Noida</h2>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/75 md:text-base">We are not just documentation agents; we coordinate actively with regulatory desks to drive claims from registration to disbursal.</p>
          </div>
          <div className="mt-10 grid gap-4 border-t border-white/15 pt-8 sm:grid-cols-3">
            {whyChooseUsList.slice(0, 3).map((item) => (
              <div key={item.title} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div><h3 className="font-display text-sm font-bold">{item.title}</h3><p className="mt-1 text-xs leading-relaxed text-white/60">{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: SUCCESS STORIES */}
      <section id="success-stories-faq" className="overflow-hidden bg-background-alt py-20" aria-labelledby="success-stories-heading">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-dark">Success Stories</span>
              <h2 id="success-stories-heading" className="font-display text-3xl font-bold text-primary md:text-4xl">Outcomes that move businesses forward</h2>
              <p className="text-sm leading-relaxed text-text-muted">Practical results from industrial units that needed accurate documentation and persistent follow-through.</p>
            </div>
            <div className="flex gap-2" aria-label="Carousel controls">
              <button type="button" aria-label="Previous success story" onClick={() => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)} className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-white text-primary transition hover:border-accent hover:text-accent-dark"><ArrowLeft className="h-4 w-4" /></button>
              <button type="button" aria-label="Next success story" onClick={() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length)} className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-white text-primary transition hover:border-accent hover:text-accent-dark"><ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
          <div onMouseEnter={() => setIsCarouselPaused(true)} onMouseLeave={() => setIsCarouselPaused(false)} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {testimonials.map((story, idx) => {
                const position = (idx - testimonialIndex + testimonials.length) % testimonials.length;
                return (
                  <motion.article key={story.name} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: position * 0.04 }} className={`flex min-h-[260px] flex-col rounded-xl border bg-white p-6 shadow-sm ${position === 0 ? 'border-accent ring-1 ring-accent/20' : 'border-primary/10'}`}>
                    <div className="flex items-center justify-between gap-3"><span className="rounded-full bg-primary/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">{story.sector}</span><Quote className="h-5 w-5 text-accent" /></div>
                    <h3 className="mt-6 font-display text-lg font-bold text-primary">{story.outcome}</h3>
                    <p className="mt-3 text-xs leading-relaxed text-text-muted">&quot;{story.feedback}&quot;</p>
                    <div className="mt-auto border-t border-primary/10 pt-4"><p className="text-xs font-bold text-primary">{story.name}</p><p className="mt-1 text-[10px] text-text-muted">{story.location}</p></div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
          <div className="mt-8 flex justify-center gap-2" aria-label="Success story slides">
            {testimonials.map((story, idx) => <button key={story.name} type="button" aria-label={`Show success story ${idx + 1}`} aria-current={testimonialIndex === idx ? 'true' : undefined} onClick={() => setTestimonialIndex(idx)} className={`h-2 rounded-full transition-all ${testimonialIndex === idx ? 'w-8 bg-accent' : 'w-2 bg-primary/20'}`} />)}
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQS */}
      <section className="bg-white py-20" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-10 space-y-3 text-center"><span className="text-xs font-bold uppercase tracking-widest text-accent-dark">Success Stories & FAQ</span><h2 id="faq-heading" className="font-display text-3xl font-bold text-primary md:text-4xl">Frequently answered queries</h2><p className="text-sm text-text-muted">Clear answers before you begin your subsidy or compliance journey.</p></div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return <div key={faq.question} className="overflow-hidden rounded-xl border border-primary/10"><button type="button" aria-expanded={isOpen} onClick={() => setActiveFaq(isOpen ? null : idx)} className="flex w-full items-center justify-between gap-4 bg-background-alt px-5 py-4 text-left font-display text-sm font-semibold text-primary transition hover:bg-accent/5"><span>{faq.question}</span><ChevronDown className={`h-4 w-4 shrink-0 text-primary/60 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-dark' : ''}`} /></button><AnimatePresence initial={false}>{isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}><div className="border-t border-primary/5 bg-white px-5 py-4 text-sm leading-relaxed text-text-muted">{faq.answer}</div></motion.div>}</AnimatePresence></div>;
            })}
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
              href={`https://wa.me/${settings.whatsapp}?text=Hello,%20I%20would%20like%20to%20discuss%20subsidy%20eligibility%20for%20my%20industry.`} 
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

const sectorCoverage = [
  { name: "Textiles", desc: "Spinning, weaving and garments.", icon: <Scissors className="h-5 w-5" /> },
  { name: "MSME", desc: "Guidance for growing units.", icon: <Building2 className="h-5 w-5" /> },
  { name: "Electronics", desc: "Assembly and hardware units.", icon: <Cpu className="h-5 w-5" /> },
  { name: "Pharma", desc: "Formulations and extracts.", icon: <Pill className="h-5 w-5" /> },
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
  { name: "Agrawal Agro Industries", location: "Gorakhpur, UP", sector: "MSME", outcome: "Capital subsidy sanctioned", feedback: "The sanctioned incentive was credited through DBT after careful DIC coordination." },
  { name: "Trishul Packaging Products", location: "Basti, UP", sector: "Manufacturing", outcome: "Five compliances secured", feedback: "Their dossier preparation helped us obtain Pollution NOC and Electrical Safety clearance." },
  { name: "Jaiswal Food Processors", location: "Lucknow, UP", sector: "Food Processing", outcome: "Interest subsidy approved", feedback: "We secured stamp duty exemption and interest subsidy with accurate documentation." },
  { name: "UP Electronics Unit", location: "Greater Noida, UP", sector: "Electronics", outcome: "Technology upgrade mapped", feedback: "The team connected our expansion plan to the right incentive route before filing." },
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
