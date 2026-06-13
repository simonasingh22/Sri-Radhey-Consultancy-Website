import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ChevronRight, Loader2 } from 'lucide-react';
import axios from 'axios';
import SEO, { SITE_URL } from '../components/SEO';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/blogs');
        setPosts(res.data || []);
      } catch (err) {
        console.error('Failed to load blog posts:', err);
        setError('Unable to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <SEO
        title="Industrial Subsidy & Policy Blog"
        description="Read current insights and guides on UP MSME subsidies, Pollution NOC CTE/CTO, DIC liaisoning, and industrial documentation."
        path="/blog"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Sri Radhey Consultancy Blog',
          url: `${SITE_URL}/blog`,
        }}
      />

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
        <div className="max-w-5xl mx-auto px-6">
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-10 h-10 text-accent animate-spin" />
              <p className="text-sm text-text-muted">Fetching latest industry updates...</p>
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
          ) : posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-primary/5 p-8 shadow-sm space-y-4">
              <p className="text-base text-primary font-display font-semibold">No Articles Published Yet</p>
              <p className="text-xs text-text-muted max-w-sm mx-auto">
                Our consultancy desk is currently drafting new guidelines. Please check back soon or consult our expert directly.
              </p>
              <Link to="/contact" className="inline-block bg-accent hover:bg-accent-dark text-primary-dark text-xs font-semibold py-2.5 px-6 rounded shadow-premium">
                Contact Advisory Desk
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => {
                const formattedDate = new Date(post.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                });
                
                const words = post.content ? post.content.split(/\s+/).length : 0;
                const readTime = Math.max(1, Math.ceil(words / 200)) + " min read";
                const tags = [post.category, ...(post.keywords || [])].filter(Boolean);

                return (
                  <article 
                    key={post._id}
                    className="bg-white rounded-xl border border-primary/5 p-6 sm:p-8 shadow-sm hover:shadow-premium transition-shadow duration-300 space-y-4"
                  >
                    {/* Meta details */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-accent/80" /> {formattedDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-accent/80" /> Consultancy Desk
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-accent/80" /> {readTime}
                      </span>
                      <div className="flex flex-wrap gap-1.5 ml-auto">
                        {tags.map((tag, id) => (
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
                );
              })}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
