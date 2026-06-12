import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const items = [
    ['/', 'Dashboard'],
    ['/admin/leads', 'Lead Management'],
    ['/admin/policies', 'Policies'],
    ['/admin/blogs', 'Blogs'],
    ['/admin/success-stories', 'Success Stories'],
    ['/admin/faqs', 'FAQs'],
    ['/admin/testimonials', 'Testimonials'],
    ['/admin/settings', 'Settings'],
  ];

  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-4 font-bold">Sri Radhey Admin</div>
      <nav className="p-2">
        {items.map(([to, label]) => (
          <NavLink key={to} to={to} className={({ isActive }) => `block px-4 py-2 rounded mb-1 ${isActive ? 'bg-blue-100' : 'hover:bg-gray-50'}`}>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
