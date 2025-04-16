"use client";
import { useEffect, useState } from "react";
import { Thermometer, Droplets, Sun, Sprout } from "lucide-react";

const SensorData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
   fetch("https://weather-alert-system-sand.vercel.app/api/data", {
     method: "GET",
   })
     .then((res) => {
       if (!res.ok) throw new Error("Failed to fetch data");
       return res.json();
     })
     .then((data) => {
       setData(data);
       setIsLoading(false);
     })
     .catch((err) => {
       setError(err.message);
       setIsLoading(false);
     });
 }, []);

  if (isLoading) {
    return (
      <div className="text-yellow-400 text-lg text-center p-6">
        ⏳ Loading sensor data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-lg text-center p-6">
        ❌ Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-5 sm:p-10 w-full max-w-4xl mx-auto bg-zinc-900 border-2 border-zinc-800 rounded-2xl shadow-2xl py-16">
      <h2 className="text-3xl uppercase font-bold mb-10 text-gray-200">
        Sensor Data
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Temperature */}
        <div className="bg-red-800/20 text-red-200 p-6 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Thermometer className="w-6 h-6" />
            <span className="text-lg font-medium">Temperature</span>
          </div>
          <span className="text-2xl font-semibold">{data.temperature}</span>
        </div>

        {/* Humidity */}
        <div className="bg-sky-800/20 text-sky-200 p-6 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Droplets className="w-6 h-6" />
            <span className="text-lg font-medium">Humidity</span>
          </div>
          <span className="text-2xl font-semibold">{data.humidity}</span>
        </div>

        {/* Light */}
        <div className="bg-amber-800/20 text-amber-200 p-6 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sun className="w-6 h-6" />
            <span className="text-lg font-medium">Light</span>
          </div>
          <span className="text-2xl font-semibold">{data.light}</span>
        </div>

        {/* Soil Moisture */}
        <div className="bg-lime-800/20 text-lime-200 p-6 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sprout className="w-6 h-6" />
            <span className="text-lg font-medium">Soil Moisture</span>
          </div>
          <span className="text-2xl font-semibold">{data.soilMoisture}</span>
        </div>
      </div>
    </div>
  );
};

export default SensorData;
