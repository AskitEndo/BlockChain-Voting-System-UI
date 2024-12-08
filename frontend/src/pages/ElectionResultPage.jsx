import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ElectionResultPage() {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const { userRole, completedElections } = useAuth();

  // Find the completed election
  const election = completedElections.find(e => e.id === parseInt(electionId));

  if (!election) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate(userRole === 'admin' ? '/admin' : '/user')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{election.title}</h1>
            <div className="flex gap-4 mt-2">
              <span className="text-sm text-gray-600">
                Completed: {election.completedDate}
              </span>
              <span className="text-sm text-gray-600">
                Total Votes: {election.totalVotes}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Final Results</h2>
            <div className="space-y-4">
              {election.results.map((result, index) => (
                <div 
                  key={index}
                  className="border rounded-md p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900">{result.candidate}</h3>
                    <span className="text-gray-600">{result.votes} votes</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${(result.votes / election.totalVotes) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-green-800">
              Winner: <span className="font-semibold">{election.winner}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 