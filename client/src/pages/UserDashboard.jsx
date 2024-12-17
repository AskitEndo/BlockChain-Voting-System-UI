import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ElectionCard from "../components/ElectionCard";
import VoteModal from "../components/VoteModal";
import { VoteIllustration } from "../components/illustrations/VoteIllustration";

export default function UserDashboard() {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [showVoteModal, setShowVoteModal] = useState(false);
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

  const handleVote = async (electionId, candidateId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/elections/${electionId}/vote`,
        {
          userId: user.id,
          candidateId,
        }
      );
      fetchElections();
      setShowVoteModal(false);
    } catch (error) {
      console.error("Error casting vote:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-blue via-pastel-indigo to-pastel-purple">
      <nav className="glass-card border-0 rounded-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-display font-bold text-gray-800">
                Voting Dashboard
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
                Active Elections
              </h2>
              <p className="text-gray-600 font-body">
                Cast your vote in ongoing elections
              </p>
            </div>
            <VoteIllustration />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loading-dots text-2xl text-primary-600">
                Loading
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {elections.map((election) => (
                <ElectionCard
                  key={election._id}
                  election={election}
                  onVote={() => {
                    setSelectedElection(election);
                    setShowVoteModal(true);
                  }}
                  userId={user?.id}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {showVoteModal && selectedElection && (
        <VoteModal
          election={selectedElection}
          onClose={() => setShowVoteModal(false)}
          onVote={handleVote}
        />
      )}
    </div>
  );
}
