

type StatusBarProps = {
  latest?: { timestamp?: string | number | Date } | null;
};

export function StatusBar({ latest }: StatusBarProps) {
  return (
    <div className="flex justify-between items-center bg-gray-900 p-4 rounded-xl">
      <h1 className="text-xl font-bold">IoT Control Center</h1>

      <div className="flex gap-4 text-sm">
        <span>System: 🟢 Online</span>
        <span>Devices: 1</span>
        <span>
          Last Update:{" "}
          {latest?.timestamp
            ? new Date(latest.timestamp).toLocaleTimeString()
            : "—"}
        </span>
      </div>
    </div>
  );
}