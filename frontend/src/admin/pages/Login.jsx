import React from 'react';
import { useForm } from 'react-hook-form';
import { api, setAuthToken } from '../AuthService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/login', data);
      const token = res.data.token;
      setAuthToken(token);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl mb-6">Admin Login</h2>
        <label className="block mb-3">
          <span className="text-gray-700">Email</span>
          <input {...register('email')} className="mt-1 block w-full" type="email" required />
        </label>
        <label className="block mb-3">
          <span className="text-gray-700">Password</span>
          <input {...register('password')} className="mt-1 block w-full" type="password" required />
        </label>
        <button className="mt-4 w-full bg-blue-700 text-white py-2 rounded">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
