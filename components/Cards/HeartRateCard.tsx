'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Reading {
  heart_rate?: number | null;
  timestamp?: string;
}

interface HeartRateCardProps {
  value: number | null;
  data: Reading[];
}

const getHeartRateStatus = (bpm: number | null) => {
  if (bpm === null) {
    return { label: "Poor Contact", color: "#94A3B8" };
  }

  if (bpm < 60) {
    return { label: "Low BPM", color: "#3B82F6" };
  }

  if (bpm <= 100) {
    return { label: "Normal BPM", color: "#22C55E" };
  }

  if (bpm <= 110) {
    return { label: "Mild BPM", color: "#EAB308" };
  }

  if (bpm <= 120) {
    return { label: "Moderate BPM", color: "#F97316" };
  }

  return { label: "High BPM", color: "#EF4444" };
};

// Takes value + data as props from the parent's single shared poll instead
// of fetching its own copy every second — previously this component ran an
// independent fetch loop and ignored the `value` prop entirely, so it could
// show a different instant than the rest of the dashboard.
const HeartRateCard: React.FC<HeartRateCardProps> = ({ value, data }) => {
  const status = getHeartRateStatus(value);

  return (
    <div className="bg-gray-900 p-4 rounded-lg h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Heart Rate</h3>

        <div
          className="px-3 py-1 rounded-full text-sm font-medium"
          style={{
            backgroundColor: `${status.color}20`,
            color: status.color,
          }}
        >
          {status.label}
        </div>
      </div>

      <div className="mb-4">
        <span className="text-4xl font-bold" style={{ color: status.color }}>
          {value === null ? "—" : Math.round(value)}
        </span>
        <span className="ml-2 text-gray-400">BPM</span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="heart_rate"
            stroke={status.color}
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HeartRateCard;
