import { useEffect, useState } from "react";
import { AlertTriangle, ShieldAlert, Smile } from "lucide-react";


interface GasCardProps {
  value: any;
}

interface Device {
  name?: string;
}

interface Reading {
  device_details: any;
  device?: Device;
  heart_rate?: number;
  spo2?: number;
  mq135: number;
  mq2: number;
  temperature?: number;
  gas_status?: any;
  timestamp?: string;
}




export default function GasCard({}: React.FC<GasCardProps>) {
  const [readings, setReadings] = useState<Reading[]>([]);
  const latest = readings[0] || {};
  const gasLevel = latest?.gas_status ?? 0;
  const mq135 = latest?.mq135 ?? 0;
  const mq2 = latest?.mq2 ?? 0;
  
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
    <div className="bg-gray-900 p-4 rounded-lg shadow-sm">
      <h3 className="text-gray-400 text-xl font-semibold mb-8">
        GAS LEVEL
      </h3>

      <div className="flex items-center gap-5 mb-8">
        <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center">
          {status.icon}
        </div>

        <div>
          <h2
            className="text-4xl font-bold"
            style={{ color: status.color }}
          >
            {status.label}
          </h2>

          <p style={{ color: status.color }}>
            {status.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl p-4 border border-slate-700">
          <p style={{ color: status.color }}>
            MQ-135
          </p>

          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-white">
              {mq135}
            </span>

            <span className="font-semibold text-white">
              PPM
            </span>
          </div>
        </div>

        <div className="rounded-2xl p-4 border border-slate-700">
          <p style={{ color: status.color }}>
            MQ-2
          </p>

          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-white">
              {mq2}
            </span>

            <span className="font-semibold text-white">
              PPM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}