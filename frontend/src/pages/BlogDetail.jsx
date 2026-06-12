import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, User, Clock, PhoneCall } from 'lucide-react';
import { blogPosts } from './Blog';

export default function BlogDetail() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-md mx-auto py-24 text-center px-6">
        <h1 className="text-3xl font-bold text-primary font-display mb-4">Post Not Found</h1>
        <p className="text-text-muted text-sm mb-6">The requested article could not be located in our blog archive.</p>
        <Link to="/blog" className="bg-primary text-white text-xs font-semibold py-2.5 px-6 rounded">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Sri Radhey Consultancy Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
      </Helmet>

      {/* Hero Banner */}
      <section className="bg-primary text-white py-16 px-6 relative border-b border-accent/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link to="/blog" className="text-accent hover:text-white text-xs font-semibold flex items-center gap-1 mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {post.author}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Main content body */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Post body */}
          <div className="lg:col-span-8 space-y-6">
            <p className="text-xs sm:text-sm text-text font-medium leading-relaxed bg-background-alt p-4 rounded-lg border border-black/5">
              {post.excerpt}
            </p>
            <div className="text-xs sm:text-sm text-text-muted leading-relaxed whitespace-pre-line space-y-4">
              {post.content} Our consultancy monitors these regulations daily. Applying under any state incentive framework requires structured balance sheets, valid Udyam certificates, and verified invoices compiled according to regulatory inspection criteria.
            </div>
          </div>

          {/* Quick contact panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-primary text-white p-6 rounded-lg border border-accent/20 shadow-premium space-y-4 text-center">
              <h3 className="font-display font-semibold text-sm text-white">Need Advisory Help?</h3>
              <p className="text-[10px] text-white/70 leading-relaxed">
                If you have questions regarding the rules discussed in this article, schedule a diagnostic check.
              </p>
              <Link 
                to="/contact" 
                className="block text-center bg-accent hover:bg-accent-dark text-primary-dark font-semibold text-xs py-2 rounded"
              >
                Inquire Details
              </Link>
              <div className="pt-2 border-t border-white/10 text-[10px] text-white/60 flex items-center justify-center gap-1">
                <PhoneCall className="w-3 h-3 text-accent" />
                <span>+91-9999999999</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
