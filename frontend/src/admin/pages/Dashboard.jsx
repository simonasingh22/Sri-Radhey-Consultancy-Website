import React from 'react';
import Layout from '../layout/Layout';

const Dashboard = () => {
  return (
    <Layout>
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded shadow">Total Leads</div>
        <div className="p-4 bg-white rounded shadow">New Leads</div>
        <div className="p-4 bg-white rounded shadow">In Process</div>
        <div className="p-4 bg-white rounded shadow">Approved</div>
      </div>
      <div className="mt-6 bg-white p-4 rounded shadow">Charts Placeholder</div>
    </Layout>
  );
};

export default Dashboard;
