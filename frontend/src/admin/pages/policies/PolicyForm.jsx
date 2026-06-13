import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Layout from '../../layout/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { api } from '../../AuthService';
import { slugify } from '../../utils/slugify';

const PolicyForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      title: '',
      slug: '',
      overview: '',
      benefits: '',
      eligibility: '',
      requiredDocuments: '',
      applicationProcess: '',
      timeline: '',
      status: 'draft',
    },
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [slugManual, setSlugManual] = useState(false);

  const title = watch('title');

  useEffect(() => {
    if (!slugManual && title) {
      setValue('slug', slugify(title));
    }
  }, [title, slugManual, setValue]);

  useEffect(() => {
    if (!isEdit) return;
    api
      .get('/policies')
      .then((res) => {
        const policy = res.data.find((p) => p._id === id);
        if (!policy) throw new Error('Not found');
        reset({
          title: policy.title || '',
          slug: policy.slug || '',
          overview: policy.overview || '',
          benefits: policy.benefits || '',
          eligibility: policy.eligibility || '',
          requiredDocuments: (policy.requiredDocuments || []).join('\n'),
          applicationProcess: policy.applicationProcess || '',
          timeline: policy.timeline || '',
          status: policy.status || 'draft',
        });
        setSlugManual(true);
      })
      .catch(() => alert('Policy not found'))
      .finally(() => setLoading(false));
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    const payload = {
      title: data.title,
      slug: data.slug || slugify(data.title),
      overview: data.overview,
      benefits: data.benefits,
      eligibility: data.eligibility,
      requiredDocuments: data.requiredDocuments
        ? data.requiredDocuments.split('\n').map((s) => s.trim()).filter(Boolean)
        : [],
      applicationProcess: data.applicationProcess,
      timeline: data.timeline,
      status: data.status,
    };
    try {
      if (isEdit) {
        await api.put(`/policies/${id}`, payload);
      } else {
        await api.post('/policies', payload);
      }
      navigate('/admin/policies');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save policy');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner label="Loading policy..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl space-y-6">
        <Link
          to="/admin/policies"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary"
        >
          <ArrowLeft size={16} /> Back to Policies
        </Link>

        <div>
          <h2 className="text-2xl font-display font-bold text-primary">
            {isEdit ? 'Edit Policy' : 'Create Policy'}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-premium p-6 space-y-4">
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
          <Field label="Overview" register={register('overview')} textarea />
          <Field label="Benefits" register={register('benefits')} textarea />
          <Field label="Eligibility" register={register('eligibility')} textarea />
          <Field
            label="Required Documents (one per line)"
            register={register('requiredDocuments')}
            textarea
          />
          <Field label="Application Process" register={register('applicationProcess')} textarea />
          <Field label="Timeline" register={register('timeline')} textarea />
          <label className="block">
            <span className="text-sm font-medium text-text-muted">Status</span>
            <select
              {...register('status')}
              className="mt-1 block w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </label>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-light disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? 'Saving...' : isEdit ? 'Update Policy' : 'Create Policy'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

const Field = ({ label, register, textarea, ...rest }) => (
  <label className="block">
    <span className="text-sm font-medium text-text-muted">{label}</span>
    {textarea ? (
      <textarea
        {...register}
        rows={4}
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

export default PolicyForm;
