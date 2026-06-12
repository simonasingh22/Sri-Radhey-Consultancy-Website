import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({ baseURL: API_BASE, withCredentials: false });

const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('admin_token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('admin_token');
    delete api.defaults.headers.common['Authorization'];
  }
};

const getToken = () => localStorage.getItem('admin_token');

// initialize token if present
if (getToken()) setAuthToken(getToken());

export { api, setAuthToken, getToken };
