import React, { useEffect, useState } from 'react';
import Layout from '../../layout/Layout';
import { api } from '../../AuthService';
import { Link } from 'react-router-dom';

const LeadsList = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await api.get('/leads');
        setLeads(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLeads();
  }, []);

  return (
    <Layout>
      <h2 className="text-xl mb-4">Leads</h2>
      <div className="bg-white rounded shadow">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Company</th>
              <th className="p-2">Phone</th>
              <th className="p-2">District</th>
              <th className="p-2">Service</th>
              <th className="p-2">Status</th>
              <th className="p-2">Created</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l._id} className="border-t">
                <td className="p-2">{l.name}</td>
                <td className="p-2">{l.company}</td>
                <td className="p-2">{l.phone}</td>
                <td className="p-2">{l.district}</td>
                <td className="p-2">{l.serviceRequired}</td>
                <td className="p-2">{l.status}</td>
                <td className="p-2">{new Date(l.createdAt).toLocaleDateString()}</td>
                <td className="p-2"><Link to={`/admin/leads/${l._id}`} className="text-blue-600">View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default LeadsList;
