import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

type MetricChartProps = {
  title: string;
  value: string | number;
  unit?: string;
  status?: string;
  data: Array<Record<string, any>>;
  dataKey: string;
  color?: string;
};

export default function MetricChart({
              title,
              value,
              unit,
              status,
              data,
              dataKey,
              color = '#2563eb',

}: MetricChartProps) {
  
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="mb-4">
        <h3 className="text-gray-500 text-sm font-medium">
          {title}
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold">
              {value}
            </span>
            <span className="ml-1 text-gray-500">
              {unit}
            </span>
          </div>

          <span className="text-green-600 font-medium">
            {status}
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <XAxis dataKey="time" hide />
          <YAxis hide />
          <Tooltip />

          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}