import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Chart from '../components/Chart';

function AdminPage() {
  const { userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if user is not admin
    if (userRole !== 'admin') {
      navigate('/');
    }
  }, [userRole, navigate]);

  // If not admin, don't render the admin content
  if (userRole !== 'admin') {
    return null;
  }

  const [elections, setElections] = useState([
    { id: 1, title: 'Student Council Election', status: 'active' },
    { id: 2, title: 'Class Representative', status: 'completed' },
  ]);

  const [newElection, setNewElection] = useState({
    title: '',
    candidates: '',
    startDate: '',
    endDate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with backend
    console.log('New election:', newElection);
  };

  // Mock data for the chart
  const resultData = {
    labels: ['Candidate A', 'Candidate B', 'Candidate C'],
    datasets: [{
      label: 'Votes',
      data: [12, 19, 3],
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
        <h2 className="text-2xl font-bold mb-4">Create New Election</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Election Title
            </label>
            <input
              type="text"
              value={newElection.title}
              onChange={(e) => setNewElection({...newElection, title: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Candidates (comma-separated)
            </label>
            <input
              type="text"
              value={newElection.candidates}
              onChange={(e) => setNewElection({...newElection, candidates: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="datetime-local"
                value={newElection.startDate}
                onChange={(e) => setNewElection({...newElection, startDate: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="datetime-local"
                value={newElection.endDate}
                onChange={(e) => setNewElection({...newElection, endDate: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Election
          </button>
        </form>
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Current Elections</h2>
        <div className="space-y-4">
          {elections.map((election) => (
            <div
              key={election.id}
              className="border p-4 rounded-md flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{election.title}</h3>
                <span className={`text-sm ${
                  election.status === 'active' ? 'text-green-500' : 'text-gray-500'
                }`}>
                  {election.status}
                </span>
              </div>
              <button className="text-blue-500 hover:text-blue-600">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Election Results</h2>
        <Chart data={resultData} title="Latest Election Results" />
      </section>
    </div>
  );
}

export default AdminPage; 