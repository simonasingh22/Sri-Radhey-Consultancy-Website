import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({ baseURL: API_BASE, withCredentials: false });

const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('admin_token', token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem('admin_token');
    delete api.defaults.headers.common.Authorization;
  }
};

const setAdmin = (admin) => {
  if (admin) {
    localStorage.setItem('admin_user', JSON.stringify(admin));
  } else {
    localStorage.removeItem('admin_user');
  }
};

const getToken = () => localStorage.getItem('admin_token');

const getAdmin = () => {
  try {
    const raw = localStorage.getItem('admin_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const logout = () => {
  setAuthToken(null);
  setAdmin(null);
};

if (getToken()) setAuthToken(getToken());

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      logout();
      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(err);
  }
);

export { api, setAuthToken, setAdmin, getToken, getAdmin, logout };
