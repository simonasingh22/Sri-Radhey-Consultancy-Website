import React, { useEffect, useState } from 'react';
import { Users, UserPlus, Clock, CheckCircle, IndianRupee } from 'lucide-react';
import Layout from '../layout/Layout';
import StatCard from '../components/StatCard';
import StatusDistributionChart from '../components/StatusDistributionChart';
import LeadPipelineChart from '../components/LeadPipelineChart';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../AuthService';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [distribution, setDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, distRes] = await Promise.all([
          api.get('/leads/stats'),
          api.get('/leads/status-distribution'),
        ]);
        setStats(statsRes.data);
        setDistribution(distRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner label="Loading dashboard..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-primary">Dashboard Overview</h2>
          <p className="text-sm text-text-muted mt-1">
            Lead pipeline and subsidy case analytics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          <StatCard label="Total Leads" value={stats?.totalLeads} icon={Users} accent="primary" />
          <StatCard label="New Leads" value={stats?.newLeads} icon={UserPlus} accent="accent" />
          <StatCard label="In Process" value={stats?.inProcess} icon={Clock} accent="secondary" />
          <StatCard label="Approved" value={stats?.approved} icon={CheckCircle} accent="green" />
          <StatCard
            label="Subsidy Received"
            value={stats?.subsidyReceived}
            icon={IndianRupee}
            accent="gold"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-premium p-5">
            <h3 className="font-display font-semibold text-primary mb-4">
              Lead Status Distribution
            </h3>
            <StatusDistributionChart data={distribution} />
          </div>
          <div className="bg-white rounded-lg shadow-premium p-5">
            <h3 className="font-display font-semibold text-primary mb-4">Lead Pipeline</h3>
            <LeadPipelineChart distribution={distribution} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
