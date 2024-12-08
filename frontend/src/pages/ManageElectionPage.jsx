import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ManageElectionPage() {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const { userRole, currentElections, updateElection } = useAuth();
  
  // Find the current election
  const election = currentElections.find(e => e.id === parseInt(electionId));
  
  const [formData, setFormData] = useState({
    title: election?.title || '',
    endDate: election?.endDate || '',
    candidates: election?.candidates || []
  });

  const [newCandidate, setNewCandidate] = useState({
    name: '',
    description: ''
  });

  if (userRole !== 'admin' || !election) {
    navigate('/admin');
    return null;
  }

  const handleUpdateElection = async (e) => {
    e.preventDefault();
    await updateElection(election.id, formData);
    navigate('/admin');
  };

  const handleAddCandidate = () => {
    if (newCandidate.name && newCandidate.description) {
      setFormData(prev => ({
        ...prev,
        candidates: [...prev.candidates, newCandidate]
      }));
      setNewCandidate({ name: '', description: '' });
    }
  };

  const handleRemoveCandidate = (index) => {
    setFormData(prev => ({
      ...prev,
      candidates: prev.candidates.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Admin Dashboard
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Election</h1>

          <form onSubmit={handleUpdateElection} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Election Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={e => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Candidates</h2>
              
              <div className="space-y-4 mb-4">
                {formData.candidates.map((candidate, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-md">
                    <div className="flex-1">
                      <h3 className="font-medium">{candidate.name}</h3>
                      <p className="text-sm text-gray-600">{candidate.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCandidate(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium">Add New Candidate</h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Candidate Name"
                    value={newCandidate.name}
                    onChange={e => setNewCandidate(prev => ({ ...prev, name: e.target.value }))}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                  <textarea
                    placeholder="Candidate Description"
                    value={newCandidate.description}
                    onChange={e => setNewCandidate(prev => ({ ...prev, description: e.target.value }))}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={handleAddCandidate}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Add Candidate
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 