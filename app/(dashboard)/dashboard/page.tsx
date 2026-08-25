'use client'
import GasLevelCard from "@/components/Cards/GasLevelCard";
import MetricGaugeCard from "@/components/Cards/MetricGaugeCard";
import TemperatureCard from "@/components/Cards/TemperatureCard";
import { Heart } from "lucide-react";
import HeartRateCard from "@/components/Cards/HeartRateCard";

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
import MotionCard from "@/components/motion";

interface Device {
  name?: string;
}

interface Reading {
  motion_status: string;
  gas_status: number | undefined;
  mq135: number;
  mq2: number;
  device_details: any;
  device?: Device;
  heart_rate?: number;
  spo2?: number;
  temperature?: number;
  gas_level?: number;
  timestamp?: string;
}

interface MetricCardProps {
  label: string;
  value?: number;
  unit: string;
  critical?: boolean;
}

const Card: React.FC<MetricCardProps> = ({ label, value, unit, critical }) => (
  <div className={'bg-gray-900 p-4 rounded-lg '}>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-3xl font-semibold">
      {value ?? "—"}
      <span className="text-base font-normal ml-2">{unit ?? ""}</span>
    </p>
  </div>
);

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

const Dashbaord = () => {
    const hour = new Date().getHours();

    const currentShift = hour >= 6 && hour < 14 ? 'Morning (06:00 - 13:59)'
          : hour >= 14 && hour < 22 ? 'Afternoon (14:00 - 21:59)'
          : 'Night (22:00 - 05:59)';
    
    const upTime = '00:00:00';
    
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
    
    <div className="flex-1 overflow-y-auto p-6 bg-black text-white p-6">
      
      {/* TOP STATUS BAR */}
      <div className="flex justify-between items-center bg-gray-900 p-4 rounded-xl">
        <div>
            <h2 className="text-xl font-semibold ">
                John Doe
            </h2>
            <p className="text-slate-500 text-sm">
                {latest?.device_details?.name ?? "Unknown Device"} · Sector B, Floor 2
            </p>
        </div>

        <div className="flex gap-4 text-sm">
          <span>System: 🟢 LIVE</span>
          <span>
            Last Update:{" "}
            {latest?.timestamp
              ? new Date(latest.timestamp).toLocaleTimeString()
              : "—"}
          </span>
        </div>
        <MotionCard motionStatus={(latest?.motion_status as "idle" | "walking" | "falling") ?? "idle"} />
      </div>

      {/* LIVE CARDS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
       <Card
          label="Heart Rate"
          value={latest?.heart_rate}
          unit="BPM"
          critical={latest?.heart_rate !== undefined && latest.heart_rate > 100}
        />
        <Card
          label="SpO2"
          value={latest?.spo2}
          unit="%"
          critical={latest?.spo2 !== undefined && latest.spo2 < 92}
        />
        <Card
          label="Temperature"
          value={latest?.temperature}
          unit="°C"
          critical={latest?.temperature !== undefined && latest.temperature > 38}
        />
        <Card
          label="Gas Level"
          value={latest?.gas_status}
          unit=""
          critical={latest?.gas_level !== undefined && latest.gas_level > 50}
        /> 
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <HeartRateCard value={latest?.heart_rate ?? 0} />

          <div className="p-4 rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MetricGaugeCard
              title="SpO2"
              value={latest?.spo2 ?? 0}
              unit="%"
              />
            <div className="flex flex-col gap-6">
            <TemperatureCard value={latest?.temperature ?? 0} />
            <GasLevelCard
              {...({ mq135: latest?.mq135 ?? 0, mq2: latest?.mq2 ?? 0 } as any)}
              />
          </div>
        
      </div>
        
      </div>
        

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
       
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
      </div>
      <GasLevelRateCard value={latest?.gas_level ?? 0} />
    </div>  
  )
}

export default Dashbaord