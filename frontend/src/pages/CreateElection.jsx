import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateElection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    endDate: '',
    candidates: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCandidate = () => {
    if (formData.candidateName) {
      setFormData((prev) => ({
        ...prev,
        candidates: [...prev.candidates, { name: formData.candidateName, description: formData.candidateDescription }],
      }));
      setFormData((prev) => ({ ...prev, candidateName: '', candidateDescription: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save the election (e.g., API call)
    console.log('Election created:', formData);
    navigate('/admin'); // Redirect to admin page after creation
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-900">Create New Election</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Election Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Candidate Name</label>
          <input
            type="text"
            name="candidateName"
            value={formData.candidateName || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Candidate Description</label>
          <input
            type="text"
            name="candidateDescription"
            value={formData.candidateDescription || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <button type="button" onClick={handleAddCandidate} className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Add Candidate
        </button>
        <div>
          <h2 className="text-lg font-medium text-gray-900">Candidates</h2>
          <ul>
            {formData.candidates.map((candidate, index) => (
              <li key={index} className="mt-2">
                {candidate.name} - {candidate.description}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md">
          Create Election
        </button>
      </form>
    </div>
  );
}

export default CreateElection; 