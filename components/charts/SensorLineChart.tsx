"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

type Reading = {
  timestamp: string;
  [key: string]: string | number;
};

interface SensorLineChartProps {
  title: string;
  data: Reading[];
  dataKey: keyof Reading;

  color?: string;
  unit?: string;
}

const SensorLineChart: React.FC<SensorLineChartProps> = ({ title, data, dataKey, color, unit }) => (
  <div className="bg-gray-900 p-4 rounded-lg">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={250}>
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