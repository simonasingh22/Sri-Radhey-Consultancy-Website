import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowUpDown } from 'lucide-react';
import Layout from '../../layout/Layout';
import StatusBadge from '../../components/StatusBadge';
import Pagination from '../../components/Pagination';
import LoadingSpinner from '../../components/LoadingSpinner';
import { api } from '../../AuthService';
import { LEAD_STATUSES } from '../../constants/leadStatuses';

const LeadsList = () => {
  const [leads, setLeads] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0, limit: 20 });
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    district: '',
    serviceRequired: '',
    assignedTo: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const fetchLeads = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: 20, ...filters };
      Object.keys(params).forEach((k) => {
        if (!params[k]) delete params[k];
      });
      const res = await api.get('/leads', { params });
      setLeads(res.data.leads || []);
      setPagination({
        page: res.data.page,
        pages: res.data.pages,
        total: res.data.total,
        limit: res.data.limit,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    api.get('/auth/admins').then((res) => setAdmins(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchLeads(1), 300);
    return () => clearTimeout(timer);
  }, [fetchLeads]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSort = (field) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'desc' ? 'asc' : 'desc',
    }));
  };

  return (
    <Layout>
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl font-display font-bold text-primary">Lead Management</h2>
            <p className="text-sm text-text-muted">Search, filter, and manage subsidy leads</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-premium p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <div className="relative lg:col-span-2">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search name, email, phone..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            <option value="">All Statuses</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="District"
            value={filters.district}
            onChange={(e) => handleFilterChange('district', e.target.value)}
            className="text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <input
            type="text"
            placeholder="Service"
            value={filters.serviceRequired}
            onChange={(e) => handleFilterChange('serviceRequired', e.target.value)}
            className="text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <select
            value={filters.assignedTo}
            onChange={(e) => handleFilterChange('assignedTo', e.target.value)}
            className="text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            <option value="">All Assignees</option>
            {admins.map((a) => (
              <option key={a._id} value={a._id}>{a.name}</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-premium overflow-hidden">
          {loading ? (
            <LoadingSpinner label="Loading leads..." />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background-alt text-left">
                    <tr>
                      {[
                        ['name', 'Name'],
                        ['district', 'District'],
                        ['serviceRequired', 'Service'],
                        ['status', 'Status'],
                        ['createdAt', 'Created'],
                      ].map(([field, label]) => (
                        <th key={field} className="px-4 py-3 font-medium text-text-muted">
                          <button
                            type="button"
                            onClick={() => toggleSort(field)}
                            className="inline-flex items-center gap-1 hover:text-primary"
                          >
                            {label}
                            <ArrowUpDown size={14} />
                          </button>
                        </th>
                      ))}
                      <th className="px-4 py-3 font-medium text-text-muted">Assigned</th>
                      <th className="px-4 py-3 font-medium text-text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-12 text-center text-text-muted">
                          No leads found
                        </td>
                      </tr>
                    ) : (
                      leads.map((lead) => (
                        <tr key={lead._id} className="border-t hover:bg-background-alt/50">
                          <td className="px-4 py-3">
                            <p className="font-medium text-primary">{lead.name}</p>
                            <p className="text-xs text-text-muted">{lead.companyName || lead.company}</p>
                          </td>
                          <td className="px-4 py-3">{lead.district}</td>
                          <td className="px-4 py-3">{lead.serviceRequired}</td>
                          <td className="px-4 py-3">
                            <StatusBadge status={lead.status} />
                          </td>
                          <td className="px-4 py-3 text-text-muted">
                            {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                          </td>
                          <td className="px-4 py-3 text-text-muted">
                            {lead.assignedTo?.name || '—'}
                          </td>
                          <td className="px-4 py-3">
                            <Link
                              to={`/admin/leads/${lead._id}`}
                              className="text-accent-dark hover:text-primary font-medium"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <Pagination
                page={pagination.page}
                pages={pagination.pages}
                total={pagination.total}
                onPageChange={fetchLeads}
              />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LeadsList;
