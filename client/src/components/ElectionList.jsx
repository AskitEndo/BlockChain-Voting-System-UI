import moment from "moment";
import { useState } from "react";

export default function ElectionList({ elections, onDelete }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this election?")) {
      setDeletingId(id);
      try {
        await onDelete(id);
      } catch (error) {
        console.error("Error deleting election:", error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (!elections || elections.length === 0) {
    return (
      <div className="col-span-full text-center py-8">
        <p className="text-gray-600 font-body">No elections found</p>
      </div>
    );
  }

  return (
    <>
      {elections.map((election) => (
        <div key={election._id} className="glass-card rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-display font-semibold text-gray-800 mb-1">
                {election.title}
              </h3>
              <p className="text-sm font-body text-gray-600">
                {election.description}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold font-body ${
                election.status === "upcoming"
                  ? "bg-yellow-100/80 text-yellow-800"
                  : election.status === "ongoing"
                  ? "bg-green-100/80 text-green-800"
                  : "bg-gray-100/80 text-gray-800"
              }`}
            >
              {election.status}
            </span>
          </div>

          <div className="space-y-3 mb-4">
            <p className="text-sm font-body text-gray-600">
              <span className="font-semibold">Candidates:</span>{" "}
              {election.candidates.length}
            </p>
            <p className="text-sm font-body text-gray-600">
              <span className="font-semibold">Ends:</span>{" "}
              {moment(election.endDate).format("MMMM Do YYYY, h:mm a")}
            </p>
          </div>

          <button
            onClick={() => handleDelete(election._id)}
            disabled={deletingId === election._id}
            className={`glass-button w-full py-2 px-4 text-red-600 font-display font-semibold rounded-lg 
              ${
                deletingId === election._id
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:text-red-700 hover:animate-glow"
              }`}
          >
            {deletingId === election._id ? (
              <span className="loading-dots">Deleting</span>
            ) : (
              "Delete Election"
            )}
          </button>
        </div>
      ))}
    </>
  );
}
