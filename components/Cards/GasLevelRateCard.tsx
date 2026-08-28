'use client';
import { AlertTriangle, ShieldAlert, Smile } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Reading {
  mq135?: number;
  mq2?: number;
  timestamp?: string;
}

interface GasLevelRateCardProps {
  data: Reading[];
  gasStatus?: string;
}

// Previously self-fetched its own data (ignoring all props) and plotted
// `spo2` and a `gasLevel` field that doesn't exist anywhere in the backend's
// SensorReading model — that line was always silently empty. Now takes the
// parent's shared readings and plots the two real gas sensor fields.
const GasLevelRateCard: React.FC<GasLevelRateCardProps> = ({ data, gasStatus }) => {
  const status =
  gasStatus === "Safe"
    ? {
        label: "Safe",
        description: "Below warning threshold",
        color: "#22C55E",
        icon: <Smile size={28} style={{ color: "#22C55E" }} />,
      }
    : gasStatus === "Warning"
    ? {
        label: "Warning",
        description: "Gas response above baseline",
        color: "#EF4444",
        icon: <AlertTriangle size={28} style={{ color: "#EF4444" }} />,
      }
    : {
        label: "Unavailable",
        description: "No normalized reading",
        color: "#94A3B8",
        icon: <ShieldAlert size={28} style={{ color: "#94A3B8" }} />,
      };

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold">Gas Level Trend (ADC)</h3>
        {status.icon}
        <span className="text-sm font-medium" style={{ color: status.color }}>
          {status.label}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="mq135" stroke="#f97316" name="MQ-135" dot={false} />
          <Line type="monotone" dataKey="mq2" stroke="#ef4444" name="MQ-2" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GasLevelRateCard;
