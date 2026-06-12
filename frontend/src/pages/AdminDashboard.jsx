import React from 'react';
import { Helmet } from 'react-helmet-async';
import Dashboard from '../admin/pages/Dashboard';

export default function AdminDashboard() {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Sri Radhey Consultancy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Dashboard />
    </>
  );
}
