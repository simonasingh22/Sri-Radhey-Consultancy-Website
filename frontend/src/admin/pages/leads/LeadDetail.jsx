import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MessageSquare, RefreshCw } from 'lucide-react';
import Layout from '../../layout/Layout';
import StatusBadge from '../../components/StatusBadge';
import LoadingSpinner from '../../components/LoadingSpinner';
import { api } from '../../AuthService';
import { LEAD_STATUSES } from '../../constants/leadStatuses';

const LeadDetail = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchLead = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/leads/${id}`);
      setLead(res.data);
      setNewStatus(res.data.status || '');
      setAssignedTo(res.data.assignedTo?._id || res.data.assignedTo || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchLead();
    api.get('/auth/admins').then((res) => setAdmins(res.data)).catch(console.error);
  }, [fetchLead]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setActionLoading(true);
    try {
      const res = await api.post(`/leads/${id}/notes`, { text: noteText.trim() });
      setLead(res.data);
      setNoteText('');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add note');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!newStatus) return;
    setActionLoading(true);
    try {
      const res = await api.post(`/leads/${id}/status`, { status: newStatus });
      setLead(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await api.patch(`/leads/${id}/assign`, {
        assignedTo: assignedTo || null,
      });
      setLead(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to assign lead');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner label="Loading lead details..." />
      </Layout>
    );
  }

  if (!lead) {
    return (
      <Layout>
        <p className="text-text-muted">Lead not found.</p>
      </Layout>
    );
  }

  const history = [...(lead.statusHistory || [])].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
  const notes = [...(lead.notes || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/leads"
            className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary"
          >
            <ArrowLeft size={16} /> Back to Leads
          </Link>
          <button
            type="button"
            onClick={fetchLead}
            className="inline-flex items-center gap-1 text-sm text-accent-dark hover:text-primary ml-auto"
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-premium p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-display font-bold text-primary">{lead.name}</h2>
              <p className="text-text-muted text-sm mt-1">
                {lead.companyName || lead.company || 'No company'} · {lead.district}
              </p>
            </div>
            <StatusBadge status={lead.status} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 text-sm">
            <Detail label="Phone" value={lead.phone} />
            <Detail label="WhatsApp" value={lead.whatsappNumber || '—'} />
            <Detail label="Email" value={lead.email} />
            <Detail label="Industry" value={lead.industry || '—'} />
            <Detail label="Company" value={lead.companyName || lead.company || '—'} />
            <Detail label="District" value={lead.district} />
            <Detail label="Service Required" value={lead.serviceRequired} />
            <Detail label="Assigned To" value={lead.assignedTo?.name || 'Unassigned'} />
            <Detail label="Created" value={new Date(lead.createdAt).toLocaleString('en-IN')} />
          </div>
          {lead.message && (
            <div className="mt-4 p-4 bg-background-alt rounded-lg text-sm">
              <p className="font-medium text-primary mb-1">Initial Message</p>
              <p className="text-text-muted">{lead.message}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-lg shadow-premium p-5">
              <h3 className="font-display font-semibold text-primary mb-4">Status Timeline</h3>
              {history.length === 0 ? (
                <p className="text-sm text-text-muted">No status history yet.</p>
              ) : (
                <ol className="relative border-l-2 border-accent/30 ml-3 space-y-6">
                  {history.map((entry, i) => (
                    <li key={i} className="ml-6">
                      <span className="absolute -left-[7px] w-3 h-3 rounded-full bg-accent border-2 border-white" />
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge status={entry.status} />
                        <span className="text-xs text-text-muted">
                          {new Date(entry.updatedAt).toLocaleString('en-IN')}
                        </span>
                      </div>
                      {entry.updatedBy?.name && (
                        <p className="text-xs text-text-muted mt-1">by {entry.updatedBy.name}</p>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </section>

            <section className="bg-white rounded-lg shadow-premium p-5">
              <h3 className="font-display font-semibold text-primary mb-4 flex items-center gap-2">
                <MessageSquare size={18} /> Internal Notes
              </h3>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {notes.length === 0 ? (
                  <p className="text-sm text-text-muted">No notes yet.</p>
                ) : (
                  notes.map((note, i) => (
                    <div key={i} className="p-3 bg-background-alt rounded-lg text-sm">
                      <p>{note.text}</p>
                      <p className="text-xs text-text-muted mt-2">
                        {note.addedBy?.name || 'Admin'} ·{' '}
                        {new Date(note.createdAt).toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add internal note..."
                  className="flex-1 text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
                <button
                  type="submit"
                  disabled={actionLoading || !noteText.trim()}
                  className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg disabled:opacity-50"
                >
                  Add
                </button>
              </form>
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-white rounded-lg shadow-premium p-5">
              <h3 className="font-display font-semibold text-primary mb-4">Update Status</h3>
              <form onSubmit={handleUpdateStatus} className="space-y-3">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
                >
                  {LEAD_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full py-2 text-sm font-medium bg-accent text-primary rounded-lg hover:bg-accent-light disabled:opacity-50"
                >
                  Update Status
                </button>
              </form>
            </section>

            <section className="bg-white rounded-lg shadow-premium p-5">
              <h3 className="font-display font-semibold text-primary mb-4">Assign Lead</h3>
              <form onSubmit={handleAssign} className="space-y-3">
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
                >
                  <option value="">Unassigned</option>
                  {admins.map((a) => (
                    <option key={a._id} value={a._id}>{a.name}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full py-2 text-sm font-medium border border-primary text-primary rounded-lg hover:bg-primary hover:text-white disabled:opacity-50 transition-colors"
                >
                  Assign
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-xs text-text-muted uppercase tracking-wide">{label}</p>
    <p className="font-medium text-primary mt-0.5">{value}</p>
  </div>
);

export default LeadDetail;
