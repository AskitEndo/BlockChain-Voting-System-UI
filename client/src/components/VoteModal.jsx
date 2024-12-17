export default function VoteModal({ election, onClose, onVote }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-card rounded-2xl p-8 max-w-md w-full animate-enter">
        <h2 className="text-2xl font-display font-bold text-gray-800 mb-4">
          Cast Your Vote
        </h2>
        <p className="text-gray-600 font-body mb-6">{election.title}</p>

        <div className="space-y-3">
          {election.candidates.map((candidate) => (
            <button
              key={candidate._id}
              onClick={() => onVote(election._id, candidate._id)}
              className="glass-button w-full p-4 text-left rounded-lg group hover:animate-glow"
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-gray-800 font-display font-semibold group-hover:text-primary-600">
                    {candidate.name}
                  </p>
                  <p className="text-sm text-gray-600 font-body">
                    {candidate.party}
                  </p>
                </div>
                <div className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="glass-button px-4 py-2 text-gray-600 font-display font-semibold rounded-lg hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
