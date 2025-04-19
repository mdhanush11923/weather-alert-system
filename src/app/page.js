"use client";
import { useEffect, useState } from "react";
import {
  Thermometer,
  Droplets,
  Sun,
  Sprout,
  Wind,
  CloudRain,
} from "lucide-react";

export default function WeatherPage() {
  const [weather, setWeather] = useState(null);
  const [sensor, setSensor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sensorLoading, setSensorLoading] = useState(true);
  const [sensorError, setSensorError] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const lat = 16.5062;
        const lon = 80.648;
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,precipitation,windspeed_10m&forecast_days=2&timezone=auto`
        );
        const data = await res.json();
        setWeather(data.hourly);
      } catch (err) {
        console.error("Failed to load weather data:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchSensorData = async () => {
      try {
        const res = await fetch(
          "https://weather-alert-system-sand.vercel.app/api/data"
        );
        if (!res.ok) throw new Error("Failed to fetch sensor data");
        const data = await res.json();
        setSensor(data);
      } catch (err) {
        setSensorError(err.message);
      } finally {
        setSensorLoading(false);
      }
    };

    fetchWeather();
    fetchSensorData();
  }, []);

  const visibleHours = showAll ? 24 : 3;

  const checkAlerts = () => {
    const alerts = [];

    // Temperature Alert
    if (sensor.temperature > 30) {
      alerts.push(
        "🔥 It's getting too hot for your plant! Consider watering it to avoid heat stress."
      );
    }

    // Humidity Alert
    if (sensor.humidity < 40) {
      alerts.push(
        "🌬️ The air is dry. You might want to increase humidity or water your plant."
      );
    }

    // Soil Moisture Alert
    if (sensor.soilMoisture < 40) {
      alerts.push("💧 The soil is too dry. It's time to water your plant!");
    } else if (sensor.soilMoisture > 80) {
      alerts.push("🚫 The soil is too wet. Avoid overwatering your plant.");
    }

    // Weather Alerts
    if (weather && weather.precipitation[0] > 0) {
      alerts.push(
        "☔ It’s going to rain soon. No need to water your plant today!"
      );
    }

    return alerts;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Alerts Section */}
        <div className="bg-zinc-900 border-2 border-zinc-800 rounded-2xl shadow-2xl py-6 px-6 sm:px-10">
          <h2 className="text-3xl font-bold text-center mb-6">
            ⚠️ Plant Care Alerts
          </h2>
          {sensorLoading ? (
            <p className="text-center text-yellow-400">
              ⏳ Loading sensor data...
            </p>
          ) : sensorError ? (
            <p className="text-center text-red-500">❌ Error: {sensorError}</p>
          ) : (
            <div className="space-y-4">
              {checkAlerts().length > 0 ? (
                checkAlerts().map((alert, index) => (
                  <div
                    key={index}
                    className="bg-red-950 text-white p-4 rounded-lg"
                  >
                    {alert}
                  </div>
                ))
              ) : (
                <div className="bg-green-950 text-white p-4 rounded-lg">
                  ✅ Your plant is doing great!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sensor Data */}
        <div className="bg-zinc-900 border-2 border-zinc-800 rounded-2xl shadow-2xl py-10 px-6 sm:px-10">
          <h2 className="text-3xl font-bold text-center mb-8">
            🌿 Live Sensor Data
          </h2>

          {sensorLoading ? (
            <p className="text-center text-yellow-400">
              ⏳ Loading sensor data...
            </p>
          ) : sensorError ? (
            <p className="text-center text-red-500">❌ Error: {sensorError}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InfoCard
                Icon={Thermometer}
                title="Temperature"
                color="red"
                value={sensor.temperature}
                description="Current air temperature. High temperatures may indicate heat stress, while low temperatures may signal frost risk."
              />
              <InfoCard
                Icon={Droplets}
                title="Humidity"
                color="sky"
                value={sensor.humidity}
                description="Percentage of moisture in the air. High humidity may cause discomfort, while low humidity may affect plant growth."
              />
              <InfoCard
                Icon={Sun}
                title="Light"
                color="amber"
                value={sensor.light}
                description="Light intensity. Plants need sufficient light for photosynthesis; low light can hinder growth."
              />
              <InfoCard
                Icon={Sprout}
                title="Soil Moisture"
                color="lime"
                value={sensor.soilMoisture}
                description="Indicates how much water is in the soil. Low moisture means plants may need watering, and high moisture could indicate overwatering."
              />
            </div>
          )}
        </div>

        {/* Weather Forecast */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-6">
            ⛅ Weather Forecast
          </h2>

          {loading ? (
            <p className="text-center text-yellow-400">
              ⏳ Loading weather forecast...
            </p>
          ) : weather ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {weather.time.slice(0, visibleHours).map((time, i) => (
                  <div
                    key={time}
                    className="bg-slate-800 p-5 rounded-xl shadow flex flex-col gap-2"
                  >
                    <p className="text-sm text-gray-300">
                      {new Date(time).toLocaleString()}
                    </p>
                    <p className="text-lg font-semibold flex items-center gap-2">
                      <Thermometer className="w-4 h-4" />{" "}
                      {weather.temperature_2m[i]}°C
                    </p>
                    <p className="text-lg font-semibold flex items-center gap-2">
                      <Droplets className="w-4 h-4" />{" "}
                      {weather.relative_humidity_2m[i]}%
                    </p>
                    <p className="text-lg font-semibold flex items-center gap-2">
                      <CloudRain className="w-4 h-4" />{" "}
                      {weather.precipitation[i]} mm
                    </p>
                    <p className="text-lg font-semibold flex items-center gap-2">
                      <Wind className="w-4 h-4" /> {weather.windspeed_10m[i]}{" "}
                      km/h
                    </p>
                  </div>
                ))}
              </div>

              {/* Show more / less toggle */}
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-4 py-2 text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 rounded-lg"
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-red-500">
              ❌ Failed to load weather data.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const InfoCard = ({ Icon, title, color, value, description }) => {
  return (
    <div
      className={`bg-${color}-800/20 text-${color}-200 p-6 rounded-xl flex flex-col gap-3`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6" />
          <span className="text-lg font-medium">{title}</span>
        </div>
        <div>
          <span className="text-2xl font-semibold">{value}</span>
        </div>
      </div>
      <p className="text-sm text-zinc-300 mt-2">{description}</p>
    </div>
  );
};
