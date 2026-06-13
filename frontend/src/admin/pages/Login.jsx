import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { api, setAuthToken, setAdmin, getToken } from '../AuthService';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getToken()) navigate('/admin/dashboard', { replace: true });
  }, [navigate]);

  const onSubmit = async (data) => {
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', data);
      setAuthToken(res.data.token);
      setAdmin(res.data.admin);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-white">Sri Radhey Consultancy</h1>
          <p className="text-accent mt-1 text-sm">Industrial Subsidy CRM Portal</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-premium p-8 space-y-5"
        >
          <h2 className="text-xl font-display font-semibold text-primary">Admin Login</h2>
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
          <label className="block">
            <span className="text-sm font-medium text-text-muted">Email</span>
            <input
              {...register('email')}
              type="email"
              required
              className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
              placeholder="admin@sriradheyconsultancy.com"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-text-muted">Password</span>
            <input
              {...register('password')}
              type="password"
              required
              className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
