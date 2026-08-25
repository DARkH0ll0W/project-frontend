export interface SensorData {
  id: number;

  heart_rate: number;
  spo2: number;
  temperature: number;

  mq135: number;
  mq2: number;

  created_at: string;
}

export interface SensorChartData {
  time: string;
  value: number;
}