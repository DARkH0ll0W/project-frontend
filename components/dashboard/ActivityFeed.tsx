

export function SensorCards({ latest }: { latest?: { heart_rate?: number; spo2?: number; temperature?: number; gas_level?: number } }) {
  const cards = [
    { label: "Heart Rate", value: latest?.heart_rate, unit: "BPM" },
    { label: "SpO2", value: latest?.spo2, unit: "%" },
    { label: "Temperature", value: latest?.temperature, unit: "°C" },
    { label: "Gas Level", value: latest?.gas_level, unit: "ppm" },
  ];

  return (
    <>
      {cards.map((c, i) => (
        <div
          key={i}
          className="bg-gray-900 p-4 rounded-xl border border-gray-800"
        >
          <p className="text-gray-400">{c.label}</p>
          <h2 className="text-2xl font-bold">
            {c.value ?? "--"} {c.unit}
          </h2>
        </div>
      ))}
    </>
  );
}