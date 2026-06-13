import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAdmin, logout } from '../AuthService';

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const admin = getAdmin();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6 py-4 bg-white border-b shadow-sm">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-background-alt text-primary"
        >
          <Menu size={22} />
        </button>
        <div>
          <h1 className="font-display font-semibold text-primary text-lg">Admin Dashboard</h1>
          {admin && (
            <p className="text-xs text-text-muted hidden sm:block">
              Signed in as {admin.name || admin.email}
            </p>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-light rounded-lg transition-colors"
      >
        <LogOut size={16} />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </header>
  );
};

export default Navbar;
