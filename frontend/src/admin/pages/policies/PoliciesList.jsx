import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import Layout from '../../layout/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { api } from '../../AuthService';

const PoliciesList = () => {
  const [policies, setPolicies] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const res = await api.get('/policies');
      setPolicies(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete policy "${title}"?`)) return;
    try {
      await api.delete(`/policies/${id}`);
      setPolicies((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete policy');
    }
  };

  const filtered = policies.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.title?.toLowerCase().includes(q) ||
      p.slug?.toLowerCase().includes(q) ||
      p.status?.toLowerCase().includes(q)
    );
  });

  return (
    <Layout>
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl font-display font-bold text-primary">Policy Management</h2>
            <p className="text-sm text-text-muted">Create and manage subsidy policy pages</p>
          </div>
          <Link
            to="/admin/policies/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light"
          >
            <Plus size={16} /> New Policy
          </Link>
        </div>

        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search policies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <div className="bg-white rounded-lg shadow-premium overflow-hidden">
          {loading ? (
            <LoadingSpinner label="Loading policies..." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-background-alt text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium text-text-muted">Title</th>
                    <th className="px-4 py-3 font-medium text-text-muted">Slug</th>
                    <th className="px-4 py-3 font-medium text-text-muted">Status</th>
                    <th className="px-4 py-3 font-medium text-text-muted">Updated</th>
                    <th className="px-4 py-3 font-medium text-text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-text-muted">
                        No policies found
                      </td>
                    </tr>
                  ) : (
                    filtered.map((policy) => (
                      <tr key={policy._id} className="border-t hover:bg-background-alt/50">
                        <td className="px-4 py-3 font-medium text-primary">{policy.title}</td>
                        <td className="px-4 py-3 text-text-muted">{policy.slug}</td>
                        <td className="px-4 py-3">
                          <StatusPill status={policy.status} />
                        </td>
                        <td className="px-4 py-3 text-text-muted">
                          {new Date(policy.updatedAt).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Link
                              to={`/admin/policies/${policy._id}/edit`}
                              className="text-primary hover:text-accent-dark"
                            >
                              <Pencil size={16} />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDelete(policy._id, policy.title)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const StatusPill = ({ status }) => {
  const colors = {
    draft: 'bg-gray-100 text-gray-700',
    published: 'bg-green-100 text-green-800',
    archived: 'bg-amber-100 text-amber-800',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || colors.draft}`}>
      {status}
    </span>
  );
};

export default PoliciesList;
