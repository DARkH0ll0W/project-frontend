import { Thermometer } from "lucide-react";

interface TemperatureCardProps {
  value: number;
}



const getTemperatureStatus = (temp: number) => {
  if (temp < 34.4) {
    return {
      label: "Critical Low",
      color: "#DC2626",
      icon: "🚨",
    };
  }

  if (temp <= 36.7) {
    return {
      label: "Normal",
      color: "#22C55E",
      icon: "🟢",
    };
  }

  if (temp <= 37.4) {
    return {
      label: "Low-Grade Fever",
      color: "#EAB308",
      icon: "🟡",
    };
  }

  if (temp <= 38.8) {
    return {
      label: "High Fever",
      color: "#EF4444",
      icon: "🔴",
    };
  }

  return {
    label: "Critical High",
    color: "#991B1B",
    icon: "🚨",
  };
};


export default function TemperatureCard({
  value,
}: TemperatureCardProps) {
  const minTemp = 34;
  const maxTemp = 40;

  const progress = Math.max(
    0,
    Math.min(
      ((value - minTemp) / (maxTemp - minTemp)) * 100,
      100
    )
  );

  const status = getTemperatureStatus(value);

  return (
    <div className="bg-gray-900 rounded-3xl p-6 shadow-sm">
      <h3 className="text-gray-400 text-xl font-semibold mb-8">
        BODY TEMPERATURE
      </h3>

      <div className="flex items-center gap-6">
       
        <div className="w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center">
          <Thermometer
            size={40}
            style={{ color: status.color }}
          />
        </div>

         <div>
            <h2 className="text-5xl font-bold text-white">
              {value}
              <span className="text-2xl">°C</span>
            </h2>

            <p
              className="text-lg font-medium"
              style={{ color: status.color }}
            >
              {status.icon} {status.label}
            </p>
          </div>
      </div>

      <div className="mt-8 bg-orange-50 rounded-2xl p-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 h-3 bg-orange-200 rounded-full">
          <div
            className="h-3 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              backgroundColor: status.color,
            }}
          />
        </div>

        <span
          className="font-semibold"
          style={{ color: status.color }}
        >
          {status.label}
        </span>
      </div>
    </div>
    </div>
  );
}