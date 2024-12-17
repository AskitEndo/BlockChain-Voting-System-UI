import { useState } from "react";
import axios from "axios";

export default function CreateElection({ onClose, onElectionCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    endDate: "",
    candidates: [{ name: "", party: "", symbol: "" }],
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    // Check if end date is in the future
    const endDate = new Date(formData.endDate);
    const now = new Date();
    if (endDate <= now) {
      setError("End date must be in the future");
      return false;
    }

    // Check for unique candidate properties
    const names = new Set();
    const parties = new Set();
    const symbols = new Set();

    for (const candidate of formData.candidates) {
      if (
        !candidate.name.trim() ||
        !candidate.party.trim() ||
        !candidate.symbol.trim()
      ) {
        setError("All candidate fields are required");
        return false;
      }

      if (names.has(candidate.name.toLowerCase())) {
        setError("Candidate names must be unique");
        return false;
      }
      if (parties.has(candidate.party.toLowerCase())) {
        setError("Party names must be unique");
        return false;
      }
      if (symbols.has(candidate.symbol.toLowerCase())) {
        setError("Party symbols must be unique");
        return false;
      }

      names.add(candidate.name.toLowerCase());
      parties.add(candidate.party.toLowerCase());
      symbols.add(candidate.symbol.toLowerCase());
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const endDate = new Date(formData.endDate);
      const now = new Date();
      const status = endDate > now ? "upcoming" : "completed";

      await axios.post("http://localhost:5000/api/elections", {
        ...formData,
        status,
      });

      onElectionCreated();
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || "Error creating election");
      setIsSubmitting(false);
    }
  };

  const addCandidate = () => {
    if (formData.candidates.length >= 6) {
      setError("Maximum 6 candidates allowed");
      return;
    }
    setFormData({
      ...formData,
      candidates: [...formData.candidates, { name: "", party: "", symbol: "" }],
    });
  };

  const removeCandidate = (index) => {
    if (formData.candidates.length <= 1) {
      setError("At least one candidate is required");
      return;
    }
    const newCandidates = formData.candidates.filter((_, i) => i !== index);
    setFormData({ ...formData, candidates: newCandidates });
  };

  const updateCandidate = (index, field, value) => {
    const newCandidates = [...formData.candidates];
    newCandidates[index][field] = value;
    setFormData({ ...formData, candidates: newCandidates });
    setError(""); // Clear error when user makes changes
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-card rounded-2xl p-8 max-w-2xl w-full animate-enter max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-display font-bold text-gray-800">
            Create New Election
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100/80 backdrop-blur-sm text-red-700 p-4 rounded-lg text-sm font-body animate-enter border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-gray-700 font-display font-semibold">
                Election Title
              </label>
              <input
                type="text"
                required
                className="input-field w-full px-4 py-3 rounded-lg font-body"
                placeholder="Enter election title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-display font-semibold">
                Description
              </label>
              <textarea
                required
                rows="3"
                className="input-field w-full px-4 py-3 rounded-lg font-body resize-none"
                placeholder="Enter election description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-display font-semibold">
                End Date & Time
              </label>
              <input
                type="datetime-local"
                required
                className="input-field w-full px-4 py-3 rounded-lg font-body"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-gray-700 font-display font-semibold">
                  Candidates
                </label>
                <span className="text-sm text-gray-500 font-body">
                  {formData.candidates.length}/6 candidates
                </span>
              </div>

              <div className="space-y-4">
                {formData.candidates.map((candidate, index) => (
                  <div
                    key={index}
                    className="glass-card p-4 rounded-lg space-y-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-display font-semibold text-gray-700">
                        Candidate {index + 1}
                      </span>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeCandidate(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Candidate Name"
                        required
                        className="input-field rounded-lg font-body"
                        value={candidate.name}
                        onChange={(e) =>
                          updateCandidate(index, "name", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        placeholder="Party Name"
                        required
                        className="input-field rounded-lg font-body"
                        value={candidate.party}
                        onChange={(e) =>
                          updateCandidate(index, "party", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        placeholder="Party Symbol"
                        required
                        className="input-field rounded-lg font-body"
                        value={candidate.symbol}
                        onChange={(e) =>
                          updateCandidate(index, "symbol", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addCandidate}
                disabled={formData.candidates.length >= 6}
                className={`glass-button w-full py-3 px-4 text-primary-600 font-display font-semibold rounded-lg 
                  ${
                    formData.candidates.length >= 6
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:animate-glow"
                  }`}
              >
                Add Candidate
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="glass-button px-6 py-3 text-gray-600 font-display font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`glass-button px-6 py-3 text-primary-600 font-display font-semibold rounded-lg
                ${
                  isSubmitting
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:animate-glow"
                }`}
            >
              {isSubmitting ? (
                <span className="loading-dots">Creating Election</span>
              ) : (
                "Create Election"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
