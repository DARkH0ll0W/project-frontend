"use client";

import { useEffect, useState } from "react";

interface Reading {
  heart_rate: number;
  spo2: number;
  temperature: number;
}

async function fetchReadings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/readings/`);
  return res.json();
}

export default function UserPage() {
  const [readings, setReadings] = useState<Reading[]>([]);

  const loadData = async () => {
    try {
      const data = await fetchReadings();
      setReadings(data);
    } catch (err) {
      console.error("Failed to fetch readings", err);
    }
  };

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Sensor Dashboard</h2>

      {readings.map((r, i) => (
        <div key={i}>
          Heart Rate: {r.heart_rate} | SpO2: {r.spo2} | Temp: {r.temperature}
        </div>
      ))}
    </div>
  );
}