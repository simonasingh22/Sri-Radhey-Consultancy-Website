import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2, ExternalLink } from 'lucide-react';
import Layout from '../../layout/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { api } from '../../AuthService';
import { BLOG_CATEGORIES } from '../../constants/blogCategories';

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [published, setPublished] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;
      if (published) params.published = published;
      const res = await api.get('/blogs/manage/all', { params });
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, category, published]);

  useEffect(() => {
    const timer = setTimeout(fetchBlogs, 300);
    return () => clearTimeout(timer);
  }, [fetchBlogs]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete blog post "${title}"?`)) return;
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete blog post');
    }
  };

  return (
    <Layout>
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl font-display font-bold text-primary">Blog Management</h2>
            <p className="text-sm text-text-muted">Create subsidy guides and policy articles</p>
          </div>
          <Link
            to="/admin/blogs/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light"
          >
            <Plus size={16} /> New Post
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-premium p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search title, slug, excerpt..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            <option value="">All Categories</option>
            {BLOG_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={published}
            onChange={(e) => setPublished(e.target.value)}
            className="text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            <option value="">All Status</option>
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-premium overflow-hidden">
          {loading ? (
            <LoadingSpinner label="Loading blog posts..." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-background-alt text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium text-text-muted">Title</th>
                    <th className="px-4 py-3 font-medium text-text-muted">Category</th>
                    <th className="px-4 py-3 font-medium text-text-muted">Status</th>
                    <th className="px-4 py-3 font-medium text-text-muted">Updated</th>
                    <th className="px-4 py-3 font-medium text-text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-text-muted">
                        No blog posts found
                      </td>
                    </tr>
                  ) : (
                    blogs.map((blog) => (
                      <tr key={blog._id} className="border-t hover:bg-background-alt/50">
                        <td className="px-4 py-3">
                          <p className="font-medium text-primary">{blog.title}</p>
                          <p className="text-xs text-text-muted">{blog.slug}</p>
                        </td>
                        <td className="px-4 py-3 text-text-muted">{blog.category || '—'}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              blog.published
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {blog.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-text-muted">
                          {new Date(blog.updatedAt).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {blog.published && (
                              <a
                                href={`/blog/${blog.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-text-muted hover:text-primary"
                                title="View on site"
                              >
                                <ExternalLink size={16} />
                              </a>
                            )}
                            <Link
                              to={`/admin/blogs/${blog._id}/edit`}
                              className="text-primary hover:text-accent-dark"
                            >
                              <Pencil size={16} />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDelete(blog._id, blog.title)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogsList;
