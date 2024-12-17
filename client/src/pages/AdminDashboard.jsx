import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import CreateElection from "../components/CreateElection";
import ElectionList from "../components/ElectionList";
import { ElectionSettingsIllustration } from "../components/illustrations/VoteIllustration";

export default function AdminDashboard() {
  const [elections, setElections] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5000/api/elections");
      setElections(response.data);
    } catch (error) {
      console.error("Error fetching elections:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/elections/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setElections(elections.filter((election) => election._id !== id));
    } catch (error) {
      console.error("Error deleting election:", error);
      alert("Failed to delete election. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-blue via-pastel-indigo to-pastel-purple">
      <nav className="glass-card border-0 rounded-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-display font-bold text-gray-800">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-body">
                Welcome, {user?.id}
              </span>
              <button
                onClick={logout}
                className="glass-button px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-3xl font-display font-bold text-gray-800 mb-2">
                Manage Elections
              </h2>
              <p className="text-gray-600 font-body">
                Create and manage election events
              </p>
            </div>
            <ElectionSettingsIllustration />
          </div>

          <div className="mb-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="glass-button px-6 py-3 text-primary-600 font-display font-semibold rounded-lg hover:animate-glow"
            >
              Create New Election
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loading-dots text-2xl text-primary-600">
                Loading
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ElectionList elections={elections} onDelete={handleDelete} />
            </div>
          )}

          {showCreateModal && (
            <CreateElection
              onClose={() => setShowCreateModal(false)}
              onElectionCreated={fetchElections}
            />
          )}
        </div>
      </main>
    </div>
  );
}
