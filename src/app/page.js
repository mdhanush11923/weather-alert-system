"use client";
import { useEffect, useState } from "react";

const SensorData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Fetching sensor data..."); // Log when the request is triggered

    fetch("https://weather-alert-system-sand.vercel.app/api/data", {
      method: "GET",
    })
      .then((res) => {
        console.log("Response status:", res.status); // Log response status
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        console.log("Data received:", data); // Log the actual data
        setData(data);
      })
      .catch((err) => {
        setError(err.message);
        console.error("Error fetching data:", err);
      });
  }, []);

  if (error) return <div className="text-red-500">❌ Error: {error}</div>;
  if (!data)
    return <div className="text-yellow-400">⏳ Loading sensor data...</div>;

  return (
    <div className="flex flex-col gap-5 p-16 rounded-3xl border-2 border-stone-500 text-xl shadow bg-stone-700 text-white">
      <h2 className="text-3xl font-bold mb-3">🌡 Sensor Data</h2>
      <p>🌡 Temperature: {data.temperature} °C</p>
      <p>💧 Humidity: {data.humidity} %</p>
      <p>🔆 Light: {data.light}</p>
      <p>🌱 Soil Moisture: {data.soilMoisture}</p>
    </div>
  );
};

export default SensorData;
