import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, BookOpen, Settings, X } from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/leads', label: 'Lead Management', icon: Users },
  { to: '/admin/policies', label: 'Policies', icon: FileText },
  { to: '/admin/blogs', label: 'Blogs', icon: BookOpen },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ mobileOpen, onClose }) => (
  <>
    {mobileOpen && (
      <div
        className="fixed inset-0 bg-primary/40 z-40 lg:hidden"
        onClick={onClose}
        aria-hidden
      />
    )}
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-primary text-white flex flex-col transform transition-transform duration-200 lg:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <div>
          <p className="font-display font-bold text-lg leading-tight">Sri Radhey</p>
          <p className="text-accent text-xs font-medium">Consultancy CRM</p>
        </div>
        <button type="button" onClick={onClose} className="lg:hidden p-1 hover:bg-white/10 rounded">
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-accent text-primary'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10 text-xs text-white/50">
        Industrial Subsidy CRM
      </div>
    </aside>
  </>
);

export default Sidebar;
