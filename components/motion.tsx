import { useEffect, useState } from "react";
import { AlertTriangle, ShieldAlert, Smile } from "lucide-react";

interface MotionProps {
  motionStatus: "idle" | "walking" | "falling";
}

interface Reading {
  gas_status?: "Safe" | "Moderate" | "Danger" | string;
}

export default function MotionCard({ motionStatus }: MotionProps) {

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
    const gasLevel = latest?.gas_status ?? 0;

    const getMotionStatus = (
    motion: "idle" | "walking" | "falling"
    ) => {
    switch (motion) {
        case "walking":
        return {
            label: "Walking",
            color: "#3B82F6",
            emoji: "🚶",
        };

        case "falling":
        return {
            label: "Fall Detected",
            color: "#DC2626",
            emoji: "🚨",
        };

        default:
        return {
            label: "Standing",
            color: "#22C55E",
            emoji: "🧍",
        };
    }
    };

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

    const overallStatus = () => {
    if (motionStatus === "falling") {
        return {
        label: "Emergency",
        color: "#DC2626",
        };
    }

    if (
        gasLevel === "Critical"
    ) {
        return {
        label: "Hazard Detected",
        color: "#DC2626",
        };
    }

    return {
        label: "Monitoring",
        color: "#22C55E",
    };
    };

    const motion = getMotionStatus(motionStatus);
    return (
    <div className="grid grid-cols-2 gap-4 mt-4">

  <div className="rounded-xl border border-slate-700 p-4">
    <p className="text-slate-400">
      Air Quality
    </p>

    <h3
      className="text-lg font-semibold"
      style={{ color: status.color }}
    >
      {status.label}
    </h3>
  </div>

  <div className="rounded-xl border border-slate-700 p-4">
    <p className="text-slate-400">
      Activity
    </p>

    <h3
      className="text-lg font-semibold"
      style={{ color: motion.color }}
    >
      {motion.emoji} {motion.label}
    </h3>
  </div>

</div>
);
}