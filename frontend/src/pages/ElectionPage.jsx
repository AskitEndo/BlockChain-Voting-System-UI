import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ElectionPage() {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const { userRole, currentElections, castVote } = useAuth();
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Find the current election from the context
  const election = currentElections.find(e => e.id === parseInt(electionId));

  useEffect(() => {
    // Redirect if not user or election not found
    if (!userRole || userRole === 'admin' || !election) {
      navigate('/');
    }
  }, [userRole, election, navigate]);

  if (!election) {
    return null;
  }

  const handleVote = async () => {
    if (selectedCandidate !== null) {
      await castVote(election.id, selectedCandidate);
      navigate('/user'); // Return to user dashboard after voting
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate('/user')}
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
                Total Votes: {election.totalVotes}
              </span>
              <span className="text-sm text-gray-600">
                Ends: {election.endDate}
              </span>
            </div>
          </div>

          {election.hasVoted ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-green-800">You have already voted in this election.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Candidates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {election.candidates.map((candidate, index) => (
                    <label
                      key={index}
                      className={`block border rounded-lg cursor-pointer transition-all transform hover:scale-105
                        ${selectedCandidate === index 
                          ? 'border-blue-500 ring-2 ring-blue-400 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <input
                        type="radio"
                        name="candidate"
                        className="hidden"
                        checked={selectedCandidate === index}
                        onChange={() => setSelectedCandidate(index)}
                      />
                      <div className="p-4">
                        {/* Placeholder Image */}
                        <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src={candidate.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&background=random`}
                            alt={candidate.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Candidate Info */}
                        <div className="text-center">
                          <h3 className="font-medium text-lg text-gray-900 mb-2">
                            {candidate.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {candidate.description}
                          </p>
                        </div>

                        {/* Selection Indicator */}
                        <div className={`mt-4 text-center ${
                          selectedCandidate === index 
                            ? 'text-blue-600' 
                            : 'text-gray-400'
                        }`}>
                          <div className="inline-block border-2 rounded-full p-1 transition-colors
                            ${selectedCandidate === index 
                              ? 'border-blue-500' 
                              : 'border-gray-300'
                            }">
                            {selectedCandidate === index ? (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <div className="w-4 h-4"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleVote}
                disabled={selectedCandidate === null}
                className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors
                  ${selectedCandidate !== null
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'}`}
              >
                Cast Vote
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 