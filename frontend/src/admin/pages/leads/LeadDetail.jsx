import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { api } from '../../AuthService';

const LeadDetail = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await api.get(`/leads/${id}`);
        setLead(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLead();
  }, [id]);

  if (!lead) return <Layout><div>Loading...</div></Layout>;

  return (
    <Layout>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">{lead.name}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><strong>Company:</strong> {lead.company}</div>
          <div><strong>Phone:</strong> {lead.phone}</div>
          <div><strong>WhatsApp:</strong> {lead.whatsappNumber}</div>
          <div><strong>Email:</strong> {lead.email}</div>
          <div><strong>District:</strong> {lead.district}</div>
          <div><strong>Service:</strong> {lead.serviceRequired}</div>
          <div className="col-span-2"><strong>Message:</strong><p>{lead.message}</p></div>
        </div>
      </div>
    </Layout>
  );
};

export default LeadDetail;
