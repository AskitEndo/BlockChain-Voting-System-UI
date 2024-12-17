import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

export default function ResultsChart({ election }) {
  // Calculate vote percentages for each candidate
  const totalVotes = election.votes.length;
  const voteCounts = election.candidates.map((candidate) => ({
    name: candidate.name,
    party: candidate.party,
    votes: election.votes.filter((vote) => vote.candidateId === candidate._id)
      .length,
    percentage: totalVotes
      ? Math.round(
          (election.votes.filter((vote) => vote.candidateId === candidate._id)
            .length /
            totalVotes) *
            100
        )
      : 0,
  }));

  const data = {
    labels: voteCounts.map(
      (count) => `${count.name} (${count.party}) - ${count.percentage}%`
    ),
    datasets: [
      {
        data: voteCounts.map((count) => count.votes),
        backgroundColor: [
          "#3B82F6", // blue
          "#EF4444", // red
          "#10B981", // green
          "#F59E0B", // yellow
          "#6366F1", // indigo
          "#EC4899", // pink
        ],
        borderWidth: 1,
        borderColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const count = voteCounts[context.dataIndex];
            return `${count.name}: ${count.votes} votes (${count.percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div>
      {totalVotes === 0 ? (
        <div className="text-center text-gray-500 py-4">No votes yet</div>
      ) : (
        <div className="h-64">
          <Pie data={data} options={options} />
        </div>
      )}
      <div className="mt-4 space-y-2">
        {voteCounts.map((count, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm text-gray-600"
          >
            <span>
              {count.name} ({count.party})
            </span>
            <span className="font-medium">
              {count.votes} votes ({count.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
