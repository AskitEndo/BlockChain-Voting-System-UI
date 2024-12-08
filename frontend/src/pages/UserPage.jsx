import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function UserPage() {
  const { userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole || userRole === 'admin') {
      navigate('/');
    }
  }, [userRole, navigate]);

  if (!userRole || userRole === 'admin') {
    return null;
  }

  const [currentElections] = useState([
    {
      id: 1,
      title: 'Student Council Election 2024',
      status: 'Active',
      totalVotes: 145,
      endDate: '2024-03-25',
      hasVoted: false
    },
    {
      id: 2,
      title: 'Class Representative Election',
      status: 'Active',
      totalVotes: 89,
      endDate: '2024-03-20',
      hasVoted: true
    },
    {
      id: 3,
      title: 'Department Head Election',
      status: 'Pending',
      totalVotes: 0,
      endDate: '2024-04-01',
      hasVoted: false
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

  const handleElectionClick = (election) => {
    console.log('Clicked election:', election);
    try {
      setTimeout(() => {
        navigate(`/election/${election.id}`);
        console.log('Navigation attempted with delay');
      }, 100);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleResultClick = (electionId) => {
    navigate(`/election-result/${electionId}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
        
      </div>

      <div className="flex gap-8">
        <section className="bg-white p-6 rounded-lg shadow-lg flex-1">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Current Elections</h2>
          <div className="space-y-4">
            {currentElections.map((election) => (
              <button
                key={election.id}
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Button clicked for election:', election.title);
                  handleElectionClick(election);
                }}
                disabled={election.status !== 'Active'}
                className={`w-full text-left border border-gray-200 p-4 rounded-md transition-colors ${
                  election.status === 'Active' 
                    ? 'hover:bg-gray-50 cursor-pointer'
                    : 'opacity-75 cursor-not-allowed bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">{election.title}</h3>
                    <div className="flex gap-4 mt-1">
                      <span className="text-sm text-gray-600">
                        Total Votes: {election.totalVotes}
                      </span>
                      <span className="text-sm text-gray-600">
                        Ends: {election.endDate}
                      </span>
                      <span className={`text-sm ${
                        election.status === 'Active' 
                          ? 'text-green-600'
                          : 'text-gray-600'
                      }`}>
                        Status: {election.status}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    election.hasVoted 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {election.hasVoted ? 'Voted' : 'Not Voted'}
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
                onClick={() => handleResultClick(election.id)}
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
