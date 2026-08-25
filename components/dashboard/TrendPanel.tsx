

type Reading = {
  heart_rate: number;
  spo2: number;
  temperature: number;
  timestamp: string | number | Date;
};

export function ActivityFeed({ readings }: { readings: Reading[] }) {
  return (
    <div className="bg-gray-900 p-4 rounded-xl">
      <h2 className="font-bold mb-3">Live Feed</h2>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {readings.slice(0, 10).map((r, i) => (
          <div key={i} className="text-sm text-gray-300 border-b border-gray-800 pb-2">
            <div>
              HR: {r.heart_rate} | SpO2: {r.spo2} | Temp: {r.temperature}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(r.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}