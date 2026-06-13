import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Landmark, TrendingUp, Sparkles, UserCheck, Share2, ChevronRight, FileText, Loader2 } from 'lucide-react';
import axios from 'axios';
import SEO, { SITE_URL } from '../components/SEO';

const getPolicyIcon = (slug) => {
  switch (slug) {
    case 'msme-policy-2022':
      return <Award className="w-6 h-6 text-accent" />;
    case 'technology-upgradation-scheme-2019':
      return <TrendingUp className="w-6 h-6 text-accent" />;
    case 'odop-schemes':
      return <Landmark className="w-6 h-6 text-accent" />;
    case 'women-entrepreneur-schemes':
      return <Sparkles className="w-6 h-6 text-accent" />;
    case 'sc-st-schemes':
      return <UserCheck className="w-6 h-6 text-accent" />;
    case 'export-promotion-schemes':
      return <Share2 className="w-6 h-6 text-accent" />;
    default:
      return <FileText className="w-6 h-6 text-accent" />;
  }
};

export default function Policies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await axios.get('/api/policies');
        // Filter for published status only
        const published = (res.data || []).filter((p) => p.status === 'published');
        setPolicies(published);
      } catch (err) {
        console.error('Failed to load policies:', err);
        setError('Unable to load policy schemes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  return (
    <>
      <SEO
        title="UP Government Industrial Subsidies & Policies"
        description="Overview of active Uttar Pradesh government industrial schemes including MSME Policy, ODOP, women entrepreneur schemes, SC/ST schemes, and export promotion benefits."
        path="/policies"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'UP Government Industrial Subsidies and Policies',
          url: `${SITE_URL}/policies`,
        }}
      />

      {/* Hero Banner */}
      <section className="bg-primary text-white py-16 px-6 text-center border-b border-accent/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-accent text-xs font-bold uppercase tracking-widest">Incentive Frameworks</span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">UP State Government Policies</h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Browse through active industrial promotion schemes. Let us guide you on eligibility checks and claim filings.
          </p>
        </div>
      </section>

      {/* Policy list grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-10 h-10 text-accent animate-spin" />
              <p className="text-sm text-text-muted">Loading incentive policies...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-white rounded-xl border border-primary/5 p-8 shadow-sm">
              <p className="text-sm text-red-600 font-semibold mb-4">{error}</p>
              <button 
                onClick={() => { setLoading(true); setError(null); }}
                className="bg-primary hover:bg-primary-light text-white text-xs font-semibold py-2 px-6 rounded transition-all"
              >
                Retry
              </button>
            </div>
          ) : policies.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-primary/5 p-8 shadow-sm space-y-4">
              <p className="text-base text-primary font-display font-semibold">No Policies Available</p>
              <p className="text-xs text-text-muted max-w-sm mx-auto">
                There are currently no active policies listed. Please check back later or contact us directly to inquire about ongoing schemes.
              </p>
              <Link to="/contact" className="inline-block bg-accent hover:bg-accent-dark text-primary-dark text-xs font-semibold py-2.5 px-6 rounded shadow-premium">
                Contact Expert Desk
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {policies.map((policy) => (
                <div 
                  key={policy._id} 
                  className="bg-white rounded-lg border border-primary/5 shadow-premium hover:shadow-premium-hover transition-all duration-300 p-8 flex flex-col justify-between hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center">
                      {getPolicyIcon(policy.slug)}
                    </div>
                    <h3 className="text-lg font-bold text-primary font-display">{policy.title}</h3>
                    <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                      {policy.overview}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-black/5 mt-6 flex justify-between items-center">
                    <span className="text-[11px] text-text-muted">Process: {policy.timeline || '3-6 Months'}</span>
                    <Link 
                      to={`/policies/${policy.slug}`} 
                      className="text-primary hover:text-accent-dark font-bold text-xs flex items-center gap-1"
                    >
                      View Guidelines <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16 px-6 text-center border-t border-accent/20">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold font-display">Verify Your Policy Eligibility</h2>
          <p className="text-xs text-white/70 max-w-xl mx-auto leading-relaxed">
            Ensure your industrial classification and fixed assets line up correctly before submitting.
          </p>
          <Link to="/contact" className="inline-block bg-accent hover:bg-accent-dark text-primary-dark font-semibold text-xs py-3 px-6 rounded transition-all">
            Get Free Eligibility Report
          </Link>
        </div>
      </section>
    </>
  );
}
