import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';
import Layout from '../layout/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../AuthService';

const Settings = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api
      .get('/settings')
      .then((res) => {
        const s = res.data;
        reset({
          companyName: s.companyName || '',
          tagline: s.tagline || '',
          phone: s.phone || '',
          whatsapp: s.whatsapp || '',
          email: s.email || '',
          address: s.address || '',
          logo: s.logo || '',
          facebook: s.socialLinks?.facebook || '',
          twitter: s.socialLinks?.twitter || '',
          linkedin: s.socialLinks?.linkedin || '',
          instagram: s.socialLinks?.instagram || '',
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    setMessage('');
    try {
      const payload = {
        companyName: data.companyName,
        tagline: data.tagline,
        phone: data.phone,
        whatsapp: data.whatsapp,
        email: data.email,
        address: data.address,
        logo: data.logo,
        socialLinks: {
          facebook: data.facebook,
          twitter: data.twitter,
          linkedin: data.linkedin,
          instagram: data.instagram,
        },
      };
      await api.put('/settings', payload);
      setMessage('Settings saved successfully.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner label="Loading settings..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl space-y-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-primary">Company Settings</h2>
          <p className="text-sm text-text-muted mt-1">
            Manage company profile shown on the public website
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-premium p-6 space-y-5">
          {message && (
            <div
              className={`text-sm px-3 py-2 rounded-lg ${
                message.includes('success')
                  ? 'bg-green-50 text-green-700 border border-green-100'
                  : 'bg-red-50 text-red-700 border border-red-100'
              }`}
            >
              {message}
            </div>
          )}

          <Field label="Company Name" register={register('companyName')} />
          <Field label="Tagline" register={register('tagline')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Phone" register={register('phone')} />
            <Field label="WhatsApp" register={register('whatsapp')} />
          </div>
          <Field label="Email" register={register('email')} type="email" />
          <Field label="Address" register={register('address')} textarea />
          <Field label="Logo URL" register={register('logo')} />

          <h3 className="font-display font-semibold text-primary pt-2">Social Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Facebook" register={register('facebook')} />
            <Field label="Twitter" register={register('twitter')} />
            <Field label="LinkedIn" register={register('linkedin')} />
            <Field label="Instagram" register={register('instagram')} />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-light disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

const Field = ({ label, register, type = 'text', textarea }) => (
  <label className="block">
    <span className="text-sm font-medium text-text-muted">{label}</span>
    {textarea ? (
      <textarea
        {...register}
        rows={3}
        className="mt-1 block w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
      />
    ) : (
      <input
        {...register}
        type={type}
        className="mt-1 block w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
      />
    )}
  </label>
);

export default Settings;
