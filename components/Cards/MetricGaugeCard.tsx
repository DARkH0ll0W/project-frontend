interface MetricGaugeCardProps {
  title: string;
  value: number | null;
  unit: string;
  color?: string;
}

const getStatus = (value: number | null) => {
  if (value === null) return "Poor Contact";
  if (value < 90) return "Critical";
  if (value < 95) return "Low";
  return "Normal";
};

const getGaugeColor = (value: number | null) => {
  if (value === null) return "#94A3B8";
  if (value < 90) return "#EF4444";
  if (value < 95) return "#EAB308";
  return "#22C55E";
};

export default function MetricGaugeCard({
  title,
  value,
  unit,
  color = "#22C55E",
}: MetricGaugeCardProps) {
  const gaugeColor = getGaugeColor(value);
  const gaugeValue = value ?? 0;
  const radius = 90;
  const circumference = Math.PI * radius; // Half circle

  const progress = Math.max(0, Math.min(gaugeValue, 100)) / 100;

  const filledLength = circumference * progress;
  const remainingLength = circumference - filledLength;

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-sm">
      <h3 className="text-slate-400 text-lg font-medium">
        {title}
      </h3>

      <div className="flex justify-center mt-8">
        <div className="relative">
          {/* Gauge */}
          <svg width="220" height="120">
            {/* Background Arc */}
            <path
              d="M20 100 A90 90 0 0 1 200 100"
              fill="none"
              stroke="#334155"
              strokeWidth="16"
              strokeLinecap="round"
            />

            {/* Progress Arc */}
            <path
              d="M20 100 A90 90 0 0 1 200 100"
              fill="none"
              stroke={gaugeColor}
              strokeWidth="16"
              strokeLinecap="round"
              pathLength={100}
                
            />
          </svg>

          <div className="absolute left-1/2 top-24 -translate-x-1/2 text-center">
            <h2 className="text-5xl font-bold">{value === null ? "—" : value.toFixed(1)}</h2>
            <p className="text-slate-400">{unit}</p>
          <div className="absolute left-1/2 top-32 -translate-x-1/2 text-center">
            <p className="text-slate-400" style={{ color: gaugeColor }}>
              {getStatus(value)}
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}