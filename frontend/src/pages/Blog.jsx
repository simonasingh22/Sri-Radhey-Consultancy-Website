import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ChevronRight } from 'lucide-react';

export const blogPosts = [
  {
    slug: "how-to-apply-for-msme-subsidy-in-up",
    title: "How to Apply for MSME Subsidy in UP",
    excerpt: "A step-by-step handbook covering Udyam registration, Nivesh Mitra uploads, DPR formatting, and offline files submission to the DIC.",
    content: "Detailed walkthrough regarding the filing parameters. First, register on Udyam portal. Second, compile a detailed project report (DPR). Third, apply on Nivesh Mitra under the MSME Promotion Policy 2022. Lastly, print bound copies and coordinate inspections with local DIC teams.",
    author: "Consultancy Desk",
    date: "June 10, 2026",
    readTime: "6 min read",
    tags: ["MSME", "Subsidy Guide"]
  },
  {
    slug: "latest-msme-policy-benefits",
    title: "Latest MSME Policy Benefits",
    excerpt: "Breakdown of capital grants, interest waivers, SGST refunds, and stamp duty exemption percentages across different zones in UP.",
    content: "An audit of the UP MSME Promotion Policy 2022. It divides Uttar Pradesh into zones: Purvanchal and Bundelkhand are placed in the highest incentive tier. Capital subsidies reach up to 25% for micro units, alongside term-loan interest refunds up to 6% per annum.",
    author: "Policy Advisor",
    date: "June 02, 2026",
    readTime: "5 min read",
    tags: ["Policy", "Incentives"]
  },
  {
    slug: "dic-documentation-guide",
    title: "DIC Documentation Guide",
    excerpt: "Avoid common clerical mistakes. Checklist of land deeds, machinery banking certificates, and project reports formatting.",
    content: "A documentation audit. Over 30% of subsidy applications in UP are delayed or rejected due to tiny clerical errors: misaligned dates, mismatched bank receipt names, or incomplete vendor declarations. This checklist outlines the exact files required.",
    author: "Liaison Desk",
    date: "May 28, 2026",
    readTime: "8 min read",
    tags: ["DIC", "Documentation"]
  },
  {
    slug: "pollution-noc-process",
    title: "Pollution NOC Process in Uttar Pradesh",
    excerpt: "Understanding the CTE and CTO application steps, water/air clearances, and board inspections in Gorakhpur and Lucknow.",
    content: "A guide to Pollution NOC. Operating a plant without Consent to Establish (CTE) and Consent to Operate (CTO) leads to severe regulatory fines and blocks eligibility for government subsidies. Learn how to draft emissions statements and pass UPPCB audits.",
    author: "Compliance Specialist",
    date: "May 15, 2026",
    readTime: "6 min read",
    tags: ["UPPCB", "Compliance"]
  },
  {
    slug: "technology-upgradation-subsidy",
    title: "Technology Upgradation Subsidy Highlights",
    excerpt: "How existing manufacturing units can claim grants to modernize machines, automate panels, and secure certifications.",
    content: "A study of the Technology Upgradation Scheme 2019. It supports existing manufacturing industries that are modernizing machinery. The program refunds 15% of machinery purchase invoices and covers ISO certification fees.",
    author: "Technical Consultant",
    date: "May 04, 2026",
    readTime: "5 min read",
    tags: ["Technology", "Modernization"]
  }
];

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Industrial Subsidy & Policy Blog | Sri Radhey Consultancy</title>
        <meta name="description" content="Read our current insights and guides on UP MSME subsidies, Pollution NOC CTE/CTO, and DIC liaisoning documentation." />
      </Helmet>

      {/* Hero Banner */}
      <section className="bg-primary text-white py-16 px-6 text-center border-b border-accent/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-accent text-xs font-bold uppercase tracking-widest">Industry Insights</span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">Latest News & Policy Guides</h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Stay updated with current government notifications, documentation parameters, and compliance guidelines.
          </p>
        </div>
      </section>

      {/* Blog list */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          
          <div className="space-y-8">
            {blogPosts.map((post, idx) => (
              <article 
                key={idx}
                className="bg-white rounded-xl border border-primary/5 p-6 sm:p-8 shadow-sm hover:shadow-premium transition-shadow duration-300 space-y-4"
              >
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {post.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                  <div className="flex gap-1.5 ml-auto">
                    {post.tags.map((tag, id) => (
                      <span key={id} className="px-2 py-0.5 bg-background-alt text-primary font-semibold text-[10px] rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-primary font-display hover:text-accent-dark transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="pt-2">
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="text-primary hover:text-accent-dark font-bold text-xs flex items-center gap-1.5"
                  >
                    Read Full Article <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
