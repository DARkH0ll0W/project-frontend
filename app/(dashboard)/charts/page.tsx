'use client'
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
import GasLevelRateCard from "@/components/Cards/GasLevelRateCard";

interface Device {
  name?: string;
}

interface Reading {
  device_details: any;
  device?: Device;
  heart_rate?: number;
  spo2?: number;
  temperature?: number;
  mq135?: number;
  mq2?: number;
  gas_status?: string;
  timestamp?: string;
}

interface ChartPanelProps {
  title: string;
  data: Reading[];
  dataKey: keyof Reading;
  color: string;
}

// Full-width, taller version of the trend chart used on the dashboard.
// "Fully extended" here means each chart gets its own full-width row
// and more vertical space (420px) instead of being squeezed into a grid.
const ChartPanel: React.FC<ChartPanelProps> = ({ title, data, dataKey, color }) => (
  <div className="bg-gray-900 p-6 rounded-2xl w-full">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={420}>
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

const ChartPage = () => {
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

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-black text-white">
      <h1 className="text-2xl font-semibold mb-6">Trends</h1>

      <div className="flex flex-col gap-6">
        <ChartPanel
          title="Heart Rate Trend"
          data={readings}
          dataKey="heart_rate"
          color="#ff4d4d"
        />
        <ChartPanel
          title="SpO2 Trend"
          data={readings}
          dataKey="spo2"
          color="#4dd2ff"
        />
        <ChartPanel
          title="Temperature Trend"
          data={readings}
          dataKey="temperature"
          color="#ffcc00"
        />
        <GasLevelRateCard data={readings} gasStatus={latest?.gas_status} />
      </div>
    </div>
  )
}

export default ChartPage
