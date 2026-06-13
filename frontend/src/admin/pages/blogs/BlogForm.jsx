import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Layout from '../../layout/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { api } from '../../AuthService';
import { slugify } from '../../utils/slugify';
import { BLOG_CATEGORIES } from '../../constants/blogCategories';

const BlogForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: '',
      metaTitle: '',
      metaDescription: '',
      keywords: '',
      featuredImage: '',
      published: false,
    },
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [slugManual, setSlugManual] = useState(false);

  const title = watch('title');
  const metaTitle = watch('metaTitle');

  useEffect(() => {
    if (!slugManual && title) {
      setValue('slug', slugify(title));
    }
  }, [title, slugManual, setValue]);

  useEffect(() => {
    if (!metaTitle && title) {
      setValue('metaTitle', title);
    }
  }, [title, metaTitle, setValue]);

  useEffect(() => {
    if (!isEdit) return;
    api
      .get(`/blogs/id/${id}`)
      .then((res) => {
        const blog = res.data;
        reset({
          title: blog.title || '',
          slug: blog.slug || '',
          excerpt: blog.excerpt || '',
          content: blog.content || '',
          category: blog.category || '',
          metaTitle: blog.metaTitle || '',
          metaDescription: blog.metaDescription || '',
          keywords: (blog.keywords || []).join('\n'),
          featuredImage: blog.featuredImage || '',
          published: Boolean(blog.published),
        });
        setSlugManual(true);
      })
      .catch(() => alert('Blog post not found'))
      .finally(() => setLoading(false));
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    const payload = {
      title: data.title,
      slug: data.slug || slugify(data.title),
      excerpt: data.excerpt,
      content: data.content,
      category: data.category,
      metaTitle: data.metaTitle || data.title,
      metaDescription: data.metaDescription,
      keywords: data.keywords
        ? data.keywords.split('\n').map((s) => s.trim()).filter(Boolean)
        : [],
      featuredImage: data.featuredImage,
      published: Boolean(data.published),
    };
    try {
      if (isEdit) {
        await api.put(`/blogs/${id}`, payload);
      } else {
        await api.post('/blogs', payload);
      }
      navigate('/admin/blogs');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save blog post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner label="Loading blog post..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl space-y-6">
        <Link
          to="/admin/blogs"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary"
        >
          <ArrowLeft size={16} /> Back to Blogs
        </Link>

        <div>
          <h2 className="text-2xl font-display font-bold text-primary">
            {isEdit ? 'Edit Blog Post' : 'Create Blog Post'}
          </h2>
          <p className="text-sm text-text-muted mt-1">
            Write subsidy guides with SEO metadata for the public website
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <section className="bg-white rounded-lg shadow-premium p-6 space-y-4">
            <h3 className="font-display font-semibold text-primary">Post Content</h3>
            <Field label="Title *" register={register('title', { required: true })} />
            <div>
              <label className="block">
                <span className="text-sm font-medium text-text-muted">Slug</span>
                <input
                  {...register('slug')}
                  onChange={(e) => {
                    setSlugManual(true);
                    setValue('slug', e.target.value);
                  }}
                  className="mt-1 block w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </label>
              <p className="text-xs text-text-muted mt-1">Auto-generated from title. Edit to customize.</p>
            </div>
            <Field label="Excerpt" register={register('excerpt')} textarea rows={2} />
            <Field label="Content" register={register('content')} textarea rows={12} />
            <label className="block">
              <span className="text-sm font-medium text-text-muted">Category</span>
              <input
                {...register('category')}
                list="blog-categories"
                className="mt-1 block w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
                placeholder="e.g. MSME Subsidy"
              />
              <datalist id="blog-categories">
                {BLOG_CATEGORIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </label>
            <Field label="Featured Image URL" register={register('featuredImage')} />
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register('published')}
                type="checkbox"
                className="rounded border-gray-300 text-primary focus:ring-accent"
              />
              <span className="text-sm font-medium text-primary">Publish immediately</span>
            </label>
          </section>

          <section className="bg-white rounded-lg shadow-premium p-6 space-y-4">
            <h3 className="font-display font-semibold text-primary">SEO Settings</h3>
            <Field label="Meta Title" register={register('metaTitle')} />
            <Field label="Meta Description" register={register('metaDescription')} textarea rows={2} />
            <Field
              label="Keywords (one per line)"
              register={register('keywords')}
              textarea
              rows={3}
            />
          </section>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-light disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

const Field = ({ label, register, textarea, rows = 4, ...rest }) => (
  <label className="block">
    <span className="text-sm font-medium text-text-muted">{label}</span>
    {textarea ? (
      <textarea
        {...register}
        rows={rows}
        className="mt-1 block w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
        {...rest}
      />
    ) : (
      <input
        {...register}
        className="mt-1 block w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
        {...rest}
      />
    )}
  </label>
);

export default BlogForm;
