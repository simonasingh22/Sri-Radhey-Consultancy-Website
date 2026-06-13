import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, PhoneCall, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useSettings } from '../context/SettingsContext';
import SEO, { SITE_URL } from '../components/SEO';

export default function BlogDetail() {
  const { slug } = useParams();
  const { settings } = useSettings();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/blogs/${slug}`);
        setPost(res.data);
      } catch (err) {
        console.error('Failed to load blog post:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
        <p className="text-sm text-text-muted">Loading article details...</p>
      </div>
    );
  }

  if (error || !post) {
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

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const words = post.content ? post.content.split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(words / 200)) + " min read";
  const tags = [post.category, ...(post.keywords || [])].filter(Boolean);
  const metaTitle = post.metaTitle || `${post.title} | Sri Radhey Consultancy Blog`;
  const metaDescription = post.metaDescription || post.excerpt;

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        path={`/blog/${post.slug}`}
        type="article"
        image={post.featuredImage}
        keywords={post.keywords}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: metaDescription,
          image: post.featuredImage,
          datePublished: post.createdAt,
          dateModified: post.updatedAt || post.createdAt,
          url: `${SITE_URL}/blog/${post.slug}`,
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
        <div className="max-w-4xl mx-auto space-y-4">
          <Link to="/blog" className="text-accent hover:text-white text-xs font-semibold flex items-center gap-1 mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-accent" /> {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-accent" /> Consultancy Desk
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-accent" /> {readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Main content body */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Post body */}
          <div className="lg:col-span-8 space-y-6">
            {post.excerpt && (
              <p className="text-xs sm:text-sm text-text font-medium leading-relaxed bg-background-alt p-4 rounded-lg border border-black/5">
                {post.excerpt}
              </p>
            )}
            
            {post.featuredImage && (
              <div className="w-full rounded-xl overflow-hidden border border-black/5 max-h-[350px] mb-4">
                <img 
                  src={post.featuredImage} 
                  alt={post.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover" 
                />
              </div>
            )}

            <div className="text-xs sm:text-sm text-text-muted leading-relaxed whitespace-pre-line space-y-4">
              {post.content}
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
                <span>{settings.phone}</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
