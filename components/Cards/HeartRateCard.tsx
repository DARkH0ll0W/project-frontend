'use client';
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Device {
  name?: string;
}

interface Reading {
  device_details: any;
  device?: Device;
  heart_rate?: number;
  spo2?: number;
  temperature?: number;
  gas_level?: number;
  timestamp?: string;
}

interface ChartPanelProps {
  title: string;
  data: Reading[];
  dataKey: keyof Reading;
  color: string;
}

const ChartPanel: React.FC<ChartPanelProps> = ({ title, data, dataKey, color }) => (
  <div className="bg-gray-900 p-4 rounded-lg">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={dataKey} stroke={color} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);


interface HeartRateCardProps {
  value: number;
}

const HeartRateCard: React.FC<HeartRateCardProps> = ({ value }) => {

  const [readings, setReadings] = useState<Reading[]>([]);

    const fetchReadings = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/readings/`);

        const data = await res.json();
        setReadings(data);
    };

    useEffect(() => {
        fetchReadings();
        const interval = setInterval(fetchReadings, 1000);
        return () => clearInterval(interval);
    }, []);

    const latest = readings[0] || {};

const getHeartRateStatus = (bpm: number) => {
  if (bpm < 60) {
    return {
      label: "Low BPM",
      color: "#3B82F6", // Blue
    };
  }

  if (bpm <= 100) {
    return {
      label: "Normal BPM",
      color: "#22C55E", // Green
    };
  }

  return {
    label: "High BPM",
    color: "#EF4444", // Red
  };
};

const getPointColor = (bpm: number) => {
  if (bpm < 60) return "#3B82F6";
  if (bpm <= 100) return "#22C55E";
  return "#EF4444";
};

const latestReading = readings[0] || {};

const heartRate = latestReading?.heart_rate ?? 0;

const status = getHeartRateStatus(heartRate);

return (
  <div className="bg-gray-900 p-4 rounded-lg">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold">
      Heart Rate
    </h3>

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
    <span
      className="text-4xl font-bold"
      style={{ color: status.color }}
    >
      {heartRate}
    </span>

    <span className="ml-2 text-gray-400">
      BPM
    </span>
  </div>

  <ResponsiveContainer
    width="100%"
    height={500}
  >
    <LineChart data={readings}>
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
}

export default HeartRateCard;