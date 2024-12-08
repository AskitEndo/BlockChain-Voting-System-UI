import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminPage() {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== 'admin') {
      navigate('/');
    }
  }, [userRole, navigate]);

  if (userRole !== 'admin') {
    return null;
  }

  const [currentElections] = useState([
    {
      id: 1,
      title: 'Student Council Election 2024',
      status: 'Active',
      totalVotes: 145,
      endDate: '2024-03-25',
    },
    {
      id: 2,
      title: 'Class Representative Election',
      status: 'Active',
      totalVotes: 89,
      endDate: '2024-03-20',
    },
    {
      id: 3,
      title: 'Department Head Election',
      status: 'Pending',
      totalVotes: 0,
      endDate: '2024-04-01',
    },
  ]);

  const [completedElections] = useState([
    {
      id: 101,
      title: 'Student Council Election 2023',
      completedDate: 'December 2023',
      totalVotes: 256,
      winner: 'John Smith',
    },
    {
      id: 102,
      title: 'Sports Committee Election',
      completedDate: 'November 2023',
      totalVotes: 189,
      winner: 'Sarah Johnson',
    },
    {
      id: 103,
      title: 'Cultural Committee Election',
      completedDate: 'October 2023',
      totalVotes: 210,
      winner: 'Mike Brown',
    },
  ]);

  const handleCreateElection = () => {
    navigate('/create-election');
  };

  const handleManageElection = (electionId) => {
    navigate(`/manage-election/${electionId}`);
  };

  const handleViewResult = (electionId) => {
    navigate(`/election-result/${electionId}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        
      </div>

      <div className="mb-8">
        <button
          onClick={handleCreateElection}
          className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 
                   transition-colors flex items-center gap-2"
        >
          <span>Create New Election</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="flex gap-8">
        <section className="bg-white p-6 rounded-lg shadow-lg flex-1">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Current Elections</h2>
          <div className="space-y-4">
            {currentElections.map((election) => (
              <button
                key={election.id}
                onClick={() => handleManageElection(election.id)}
                className="w-full text-left border border-gray-200 p-4 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">{election.title}</h3>
                    <div className="flex gap-4 mt-1">
                      <span className="text-sm text-gray-600">
                        Votes: {election.totalVotes}
                      </span>
                      <span className="text-sm text-gray-600">
                        Ends: {election.endDate}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    election.status === 'Active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {election.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="w-px bg-gray-200 self-stretch"></div>

        <section className="bg-white p-6 rounded-lg shadow-lg flex-1">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Election Results</h2>
          <div className="space-y-4">
            {completedElections.map((election) => (
              <button
                key={election.id}
                onClick={() => handleViewResult(election.id)}
                className="w-full text-left border border-gray-200 p-4 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{election.title}</h3>
                  <div className="flex gap-4 mt-1">
                    <span className="text-sm text-gray-600">
                      {election.completedDate}
                    </span>
                    <span className="text-sm text-gray-600">
                      Total Votes: {election.totalVotes}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    Winner: {election.winner}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminPage; 