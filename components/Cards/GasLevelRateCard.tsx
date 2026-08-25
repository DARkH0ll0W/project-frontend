'use client';
import { useEffect, useState } from "react";
import { AlertTriangle, ShieldAlert, Smile } from "lucide-react";
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
  gas_status: any;
  device_details: any;
  device?: Device;
  heart_rate?: number;
  spo2?: number;
  temperature?: number;
  
  timestamp?: string;
}

interface ChartPanelProps {
  title: string;
  data: Reading[];
  dataKey: keyof Reading;
  color: string;
}

// const ChartPanel: React.FC<ChartPanelProps> = ({ title, data, dataKey, color }) => (
//   <div className="bg-gray-900 p-4 rounded-lg">
//     <h3 className="text-lg font-semibold mb-4">{title}</h3>
//     <ResponsiveContainer width="100%" height={50}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="timestamp" />
//         <YAxis />
//         <Tooltip />
//         <Line type="monotone" dataKey={dataKey} stroke={color} dot={false} />
//       </LineChart>
//     </ResponsiveContainer>
//   </div>
// );


interface GasRateCardProps {
  value: number;
}

const GasLevelRateCard: React.FC<GasRateCardProps> = ({ value }) => {

  const [readings, setReadings] = useState<Reading[]>([]);

    const fetchReadings = async () => {
        const res = await fetch("http://127.0.0.1:8000/api/auth/readings/");

        const data = await res.json();
        setReadings(data);
    };

    useEffect(() => {
        fetchReadings();
        const interval = setInterval(fetchReadings, 1000);
        return () => clearInterval(interval);
    }, []);
    
    const latest = readings[0] || {};
    const gasLevel = latest?.gas_status ?? 0;


    const status =
    gasLevel === "Safe"
      ? {
          label: "Safe",
          description: "Normal",
          color: "#22C55E",
          icon : <Smile size={40} style={{ color: "#22C55E" }} />,
        }
      : gasLevel === "Moderate"
      ? {
          label: "Moderate",
          description: "Monitor",
          color: "#EAB308",
          icon : <ShieldAlert size={40} style={{ color: "#EAB308" }} />,
        }
      : gasLevel === "Danger"
      ? {
          label: "Danger",
          description: "Poor Air Quality",
          color: "#EF4444",
          icon : <AlertTriangle size={40} style={{ color: "#EF4444" }} />,
        }
      : {
          label: "Critical",
          description: "Evacuate Area",
          color: "#991B1B",
          icon : <ShieldAlert size={40} style={{ color: "#991B1B" }} />,
        };

return (
  <div className="bg-gray-900 p-4 m-10 rounded-lg">
  <div className="flex flex-1 items-center mb-4">
        <h2 className="text-lg font-semibold">
        Gas Level
        </h2>
        <h3 className="m-3 p-3 text-lg font-semibold">{status.label}</h3>
            
            
        <p className="m-2 p-2">{status.description}</p>
        
    
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
            dataKey="spo2"
            stroke="#3b82f6"
            name="SpO₂ (%)"
            />
        <Line
            type="monotone"
            dataKey="mq135"
            stroke="#f97316"
            name="MQ-135"
            />
        <Line
            type="monotone"
            dataKey="mq2"
            stroke="#ef4444"
            name="MQ-2"
            />
        <Line
            type="monotone"
            dataKey="gasLevel"
            stroke="#a855f7"
            name="Gas Level"
            />
    </LineChart>
  </ResponsiveContainer>
</div>
);
}

export default GasLevelRateCard;