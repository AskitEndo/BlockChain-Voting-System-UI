import moment from "moment";
import ResultsChart from "./ResultsChart";

export default function ElectionCard({ election, onVote, userId }) {
  const hasVoted = election.votes.some((vote) => vote.userId === userId);
  const isOngoing = new Date(election.endDate) > new Date();

  // Find user's vote and the corresponding candidate
  const userVote = election.votes.find((vote) => vote.userId === userId);
  const votedCandidate = userVote
    ? election.candidates.find(
        (candidate) => candidate._id === userVote.candidateId
      )
    : null;

  return (
    <div className="glass-card rounded-xl p-6 transform transition-all duration-300 hover:scale-105">
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
          <span className="font-semibold">Ends:</span>{" "}
          {moment(election.endDate).format("MMMM Do YYYY, h:mm a")}
        </p>
        <p className="text-sm font-body text-gray-600">
          <span className="font-semibold">Total Votes:</span>{" "}
          {election.votes.length}
        </p>
        {hasVoted && votedCandidate && (
          <div className="mt-2 p-3 bg-primary-50/50 backdrop-blur-sm rounded-lg">
            <p className="text-sm font-body text-gray-800">
              <span className="font-semibold">Your Vote:</span>{" "}
              <span className="text-primary-600">{votedCandidate.name}</span>
            </p>
            <p className="text-xs font-body text-gray-600 mt-1">
              <span className="font-semibold">Party:</span>{" "}
              {votedCandidate.party}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-xs font-body text-gray-500">
                Voted {moment(userVote.timestamp).fromNow()}
              </span>
              <span className="ml-2 w-2 h-2 rounded-full bg-primary-400/50" />
            </div>
          </div>
        )}
      </div>

      {isOngoing && !hasVoted && (
        <button
          onClick={onVote}
          className="glass-button w-full py-2 px-4 text-primary-600 font-display font-semibold rounded-lg hover:animate-glow"
        >
          Cast Vote
        </button>
      )}

      {(hasVoted || !isOngoing) && (
        <div className="mt-4">
          <h4 className="text-sm font-display font-semibold text-gray-800 mb-2">
            Results
          </h4>
          <ResultsChart election={election} />
        </div>
      )}
    </div>
  );
}
