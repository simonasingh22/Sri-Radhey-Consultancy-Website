import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronRight, FileText, HelpCircle, PhoneCall, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useSettings } from '../context/SettingsContext';
import SEO, { SITE_URL } from '../components/SEO';

export default function PolicyDetail() {
  const { slug } = useParams();
  const { settings } = useSettings();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await axios.get(`/api/policies/${slug}`);
        setPolicy(res.data);
      } catch (err) {
        console.error('Failed to load policy details:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicy();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
        <p className="text-sm text-text-muted">Loading policy guidelines...</p>
      </div>
    );
  }

  if (error || !policy) {
    return (
      <div className="max-w-md mx-auto py-24 text-center px-6">
        <h1 className="text-3xl font-bold text-primary font-display mb-4">Policy Not Found</h1>
        <p className="text-text-muted text-sm mb-6">The requested policy scheme could not be located in our database.</p>
        <Link to="/policies" className="bg-primary text-white text-xs font-semibold py-2.5 px-6 rounded">
          Back to Policies
        </Link>
      </div>
    );
  }

  // Parse fields or use defaults
  const benefitsList = policy.benefits 
    ? policy.benefits.split('\n').map(b => b.trim()).filter(Boolean)
    : [];
  
  const documentsRequired = policy.requiredDocuments || [];
  
  const processSteps = policy.applicationProcess
    ? policy.applicationProcess.split('\n').map(p => p.trim()).filter(Boolean)
    : [];

  return (
    <>
      <SEO
        title={`${policy.title} Guidelines UP`}
        description={`Detailed guidelines for ${policy.title} in UP. Read about eligibility, required documents checklist, timeline, and application process.`}
        path={`/policies/${policy.slug}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: `${policy.title} Guidelines UP`,
          description: policy.overview || `Detailed guidelines for ${policy.title} in Uttar Pradesh.`,
          url: `${SITE_URL}/policies/${policy.slug}`,
          author: {
            '@type': 'Organization',
            name: 'Sri Radhey Consultancy',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Sri Radhey Consultancy',
          },
        }}
      />

      {/* Hero Banner */}
      <section className="bg-primary text-white py-16 px-6 relative border-b border-accent/20">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link to="/policies" className="text-accent hover:text-white text-xs font-semibold flex items-center gap-1 mb-2">
            <ArrowLeft className="w-4 h-4" /> All Policies
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold font-display">{policy.title}</h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
            {policy.overview ? policy.overview.substring(0, 160) + '...' : ''}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Details Left */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview */}
            {policy.overview && (
              <div className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-primary font-display">Scheme Overview</h2>
                <div className="h-0.5 w-12 bg-accent"></div>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed whitespace-pre-line">
                  {policy.overview}
                </p>
              </div>
            )}

            {/* Benefits */}
            {benefitsList.length > 0 && (
              <div className="space-y-4 pt-2">
                <h3 className="text-lg font-bold text-primary font-display">Eligible Incentives & Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefitsList.map((benefit, idx) => (
                    <div key={idx} className="border border-black/5 bg-background-alt p-4 rounded flex gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                      <span className="text-xs font-semibold text-primary">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Eligibility */}
            {policy.eligibility && (
              <div className="space-y-3 pt-2">
                <h3 className="text-lg font-bold text-primary font-display">Eligibility Benchmarks</h3>
                <div className="border border-accent/20 bg-accent/5 p-5 rounded-lg text-xs sm:text-sm text-text-muted leading-relaxed whitespace-pre-line">
                  {policy.eligibility}
                </div>
              </div>
            )}

            {/* Documents Required */}
            {documentsRequired.length > 0 && (
              <div className="bg-background-alt rounded-lg p-6 border border-primary/5 space-y-4">
                <h3 className="text-lg font-bold text-primary font-display flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" />
                  Required Application Dossier
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {documentsRequired.map((doc, idx) => (
                    <div key={idx} className="text-xs text-text-muted flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Application Process */}
            {processSteps.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-primary font-display">Application Submission Process</h3>
                <div className="space-y-3">
                  {processSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm text-text-muted">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar Right */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* CTA Box */}
            <div className="bg-primary-dark text-white rounded-xl p-8 border border-accent/20 shadow-premium space-y-6">
              <h3 className="font-display font-bold text-lg text-white">Apply Under This Policy</h3>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Ensure compliance parameters and DPR structures are formatted perfectly. Let our liaison desk file it.
              </p>
              
              <Link 
                to="/contact" 
                className="block text-center bg-accent hover:bg-accent-dark text-primary-dark font-semibold text-xs py-3 rounded transition-all shadow-premium"
              >
                Start Subsidy Claim
              </Link>
              
              <div className="pt-4 border-t border-white/10 flex items-center gap-3 justify-center text-xs text-white/80">
                <PhoneCall className="w-4 h-4 text-accent" />
                <span>Call Expert: {settings.phone}</span>
              </div>
            </div>

            {/* General Info */}
            <div className="border border-primary/5 rounded-xl p-6 bg-background-alt space-y-3">
              <h4 className="font-display font-semibold text-sm text-primary">Key Metrics</h4>
              <ul className="text-xs text-text-muted space-y-2">
                <li>• Timeline: <strong className="text-primary">{policy.timeline || '3-6 Months'}</strong></li>
                <li>• Portal: <strong className="text-primary">Nivesh Mitra (UP)</strong></li>
                <li>• Audit Needed: <strong className="text-primary">Yes</strong></li>
              </ul>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
