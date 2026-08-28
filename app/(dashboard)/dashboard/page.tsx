'use client'
import GasLevelCard from "@/components/Cards/GasLevelCard";
import MetricGaugeCard from "@/components/Cards/MetricGaugeCard";
import TemperatureCard, { getTemperatureStatus } from "@/components/Cards/TemperatureCard";
import HeartRateCard from "@/components/Cards/HeartRateCard";
import GasLevelRateCard from "@/components/Cards/GasLevelRateCard";
import MotionCard from "@/components/motion";

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
  motion_status: "normal" | "fall_detected";
  gas_status?: string;
  mq135: number;
  mq2: number;
  device_details: any;
  device?: Device;
  heart_rate?: number;
  spo2?: number;
  temperature?: number | null;
  gas_level?: number;
  timestamp?: string;
}

// --- Status pill helpers for the 6-across row -----------------------------

const getHeartRatePillStatus = (bpm: number) => {
  if (bpm < 60) return { label: "Low", color: "#3B82F6" };
  if (bpm <= 100) return { label: "Normal", color: "#22C55E" };
  return { label: "High", color: "#EF4444" };
};

const getSpo2PillStatus = (spo2: number) => {
  if (spo2 < 90) return { label: "Critical", color: "#991B1B" };
  if (spo2 < 95) return { label: "Low", color: "#EAB308" };
  return { label: "Normal", color: "#22C55E" };
};

// Distinct from Air Quality (MQ-135-based, in MotionCard): this one reads
// MQ-2, which senses combustible gas/smoke rather than general air quality.
const getGasLevelPillStatus = (mq2: number) => {
  if (mq2 <= 50) return { label: "Normal", color: "#22C55E" };
  if (mq2 <= 100) return { label: "Moderate", color: "#EAB308" };
  if (mq2 <= 200) return { label: "High", color: "#EF4444" };
  return { label: "Critical", color: "#991B1B" };
};

interface StatusPillProps {
  label: string;
  status: { label: string; color: string };
}

const StatusPill: React.FC<StatusPillProps> = ({ label, status }) => (
  <div className="bg-gray-900 rounded-xl p-4">
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-lg font-semibold" style={{ color: status.color }}>
      {status.label}
    </p>
  </div>
);

// --- Trend chart panel (unchanged from before) ----------------------------

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

const Dashboard = () => {
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

  const latest = readings[0] || ({} as Reading);

  const heartRate = latest?.heart_rate ?? 0;
  const spo2 = latest?.spo2 ?? 0;
  const temperature = latest?.temperature ?? null;
  const mq2 = latest?.mq2 ?? 0;
  const mq135 = latest?.mq135 ?? 0;

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-black text-white">
      {/* TOP STATUS BAR */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-gray-900 p-4 rounded-xl">
        <div>
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-slate-500 text-sm">
            {latest?.device_details?.name ?? "Unknown Device"} · Sector B, Floor 2
          </p>
        </div>

        <div className="flex gap-4 text-sm">
          <span>System: 🟢 LIVE</span>
          <span>
            Last Update:{" "}
            {latest?.timestamp ? new Date(latest.timestamp).toLocaleTimeString() : "—"}
          </span>
        </div>
      </div>

      {/* 6-ACROSS STATUS ROW: Heart Rate / SpO2 / Temperature / Gas Level /
          Air Quality / Activity. The last two are rendered by MotionCard,
          which already lays itself out as 2 equal cells, so it spans the
          last 2 of 6 grid columns here rather than being duplicated. */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-6">
        <StatusPill label="Heart Rate" status={getHeartRatePillStatus(heartRate)} />
        <StatusPill label="SpO2" status={getSpo2PillStatus(spo2)} />
        <StatusPill label="Ambient Temperature" status={getTemperatureStatus(temperature)} />
        <StatusPill label="Gas Level" status={getGasLevelPillStatus(mq2)} />
        <div className="col-span-2 sm:col-span-1 md:col-span-2">
          <MotionCard motionStatus={latest?.motion_status ?? "normal"} mq135={mq135} />
        </div>
      </div>

      {/* LIVE HEART RATE / TEMPERATURE / SPO2 ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <HeartRateCard value={heartRate} data={readings} />
        <TemperatureCard value={temperature} />
        <MetricGaugeCard title="SpO2" value={spo2} unit="%" />
      </div>

      {/* GAS LEVEL DETAIL — sits under the Temperature/SpO2 columns per the
          sketch, not full width under Heart Rate too. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="hidden md:block" />
        <div className="md:col-span-2">
          <GasLevelCard gasStatus={latest?.gas_status} mq135={mq135} mq2={mq2} />
        </div>
      </div>

      {/* TRENDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ChartPanel title="Heart Rate Trend" data={readings} dataKey="heart_rate" color="#ff4d4d" />
        <ChartPanel title="SpO2 Trend" data={readings} dataKey="spo2" color="#4dd2ff" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ChartPanel title="Temperature Trend" data={readings} dataKey="temperature" color="#ffcc00" />
        <GasLevelRateCard data={readings} gasStatus={latest?.gas_status} />
      </div>
    </div>
  );
};

export default Dashboard;
