import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Chart from '../components/Chart';

function UserPage() {
  const { userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if user is not authenticated or is admin
    if (!userRole || userRole === 'admin') {
      navigate('/');
    }
  }, [userRole, navigate]);

  // If not user, don't render the content
  if (!userRole || userRole === 'admin') {
    return null;
  }

  const [activeElections, setActiveElections] = useState([
    {
      id: 1,
      title: 'Student Council Election',
      candidates: ['John Doe', 'Jane Smith', 'Bob Johnson'],
      hasVoted: false,
    },
    {
      id: 2,
      title: 'Class Representative',
      candidates: ['Alice Brown', 'Charlie Davis'],
      hasVoted: true,
    },
  ]);

  const handleVote = (electionId, candidateIndex) => {
    // TODO: Integrate with backend
    console.log(`Voted for candidate ${candidateIndex} in election ${electionId}`);
  };

  // Mock data for completed election results
  const completedElectionData = {
    labels: ['Candidate A', 'Candidate B', 'Candidate C'],
    datasets: [{
      label: 'Votes',
      data: [15, 12, 8],
      backgroundColor: [
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(75, 192, 192, 0.5)',
      ],
    }],
  };

  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Active Elections</h2>
        <div className="space-y-6">
          {activeElections.map((election) => (
            <div key={election.id} className="border p-4 rounded-md">
              <h3 className="text-xl font-semibold mb-2">{election.title}</h3>
              {!election.hasVoted ? (
                <div className="space-y-2">
                  {election.candidates.map((candidate, index) => (
                    <button
                      key={index}
                      onClick={() => handleVote(election.id, index)}
                      className="w-full text-left p-2 rounded-md hover:bg-blue-50 
                               border border-gray-200 transition duration-150"
                    >
                      {candidate}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-green-500">You have already voted in this election</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Completed Elections</h2>
        <Chart data={completedElectionData} title="Previous Election Results" />
      </section>
    </div>
  );
}

export default UserPage; 