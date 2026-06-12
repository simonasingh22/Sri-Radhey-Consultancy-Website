import React from 'react';
import { setAuthToken } from '../AuthService';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    setAuthToken(null);
    navigate('/admin/login');
  };

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <div className="font-semibold">Admin Dashboard</div>
      <div>
        <button onClick={logout} className="px-3 py-1 bg-red-600 text-white rounded">Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
