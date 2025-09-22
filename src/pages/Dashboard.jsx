import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import Navbar from '../components/Navbar';
import BugForm from '../components/BugForm';
import BugTable from '../components/BugTable';

export default function Dashboard() {
  const navigate = useNavigate();
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    severity: '',
    status: '',
    search: '',
  });

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    fetchBugs();
  }, [navigate]);

  const fetchBugs = async () => {
    try {
      setLoading(true);
      const response = await api.get('/bugs', {
        params: {
          ...filters,
        },
      });
      setBugs(response.data);
    } catch (err) {
      setError('Failed to fetch bugs');
      console.error('Fetch bugs error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, [filters]);

  const handleBugCreated = (newBug) => {
    setBugs((prevBugs) => [newBug, ...prevBugs]);
  };

  const handleBugUpdated = (updatedBug) => {
    setBugs((prevBugs) =>
      prevBugs.map((bug) => (bug.id === updatedBug.id ? updatedBug : bug))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage and track bugs efficiently
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Bug Form */}
            <div className="lg:col-span-1">
              <BugForm onBugCreated={handleBugCreated} />
            </div>

            {/* Right Panel - Bug List & Filters */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Bug List</h2>
                  <span className="text-sm text-gray-500">
                    {bugs.length} {bugs.length === 1 ? 'bug' : 'bugs'} found
                  </span>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Search by title..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm"
                      value={filters.search}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, search: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <select
                      value={filters.severity}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, severity: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm"
                    >
                      <option value="">All Severities</option>
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                    </select>
                  </div>
                  <div>
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, status: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm"
                    >
                      <option value="">All Statuses</option>
                      <option value="OPEN">Open</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                  </div>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <BugTable bugs={bugs} onBugUpdated={handleBugUpdated} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}