"use client";
import { useEffect, useState } from "react";
import {
  Thermometer,
  Droplets,
  Sun,
  Sprout,
  Wind,
  CloudRain,
  CloudSun,
} from "lucide-react";

const colorClasses = {
  red: "bg-red-500/20 text-red-200",
  sky: "bg-sky-500/20 text-sky-200",
  amber: "bg-amber-500/20 text-amber-200",
  lime: "bg-lime-500/20 text-lime-200",
};

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

    // Fetch initially
    fetchWeather();
    fetchSensorData();

    // Set interval for auto refresh every 10 seconds
    const interval = setInterval(() => {
      fetchWeather();
      fetchSensorData();
    }, 10000); // 10000ms = 10s

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, []);

  const visibleHours = showAll ? 24 : 3;

const getAlerts = (sensor, weather) => {
  const alerts = [];

  const sensorAlerts = [
    {
      condition: sensor?.temperature > 30,
      message:
        "🔥 It's getting too hot for your plant! Consider watering it to avoid heat stress.",
    },
    {
      condition: sensor?.humidity < 40,
      message:
        "🌬️ The air is dry. You might want to increase humidity or water your plant.",
    },
    {
      condition: sensor?.soilMoisture < 40,
      message: "💧 The soil is too dry. It's time to water your plant!",
    },
    {
      condition: sensor?.soilMoisture > 80,
      message: "🚫 The soil is too wet. Avoid overwatering your plant.",
    },
    {
      condition: sensor?.light < 200,
      message:
        "🌑 Light is too low. Consider moving your plant to a brighter area.",
    },
    {
      condition: sensor?.light > 900,
      message:
        "🔆 Light is very strong. Ensure your plant isn’t getting scorched.",
    },
  ];

  const weatherAlerts = [
    {
      condition: weather?.precipitation?.[0] > 0,
      message: "☔ It’s going to rain soon. No need to water your plant today!",
    },
    {
      condition: weather?.temperature_2m?.[0] < 10,
      message:
        "❄️ It's getting cold. Consider protecting your plant from frost.",
    },
    {
      condition: weather?.windspeed_10m?.[0] > 30,
      message: "💨 High winds expected. Move delicate plants to shelter.",
    },
  ];

  [...sensorAlerts, ...weatherAlerts].forEach((alert) => {
    if (alert.condition) alerts.push(alert.message);
  });

  return alerts;
};

const alerts = getAlerts(sensor, weather);

  // console.log("Sensor Data:", sensor);
  // console.log("Weather Precipitation First Hour:", weather?.precipitation[0]);
  // console.log("Alerts:", checkAlerts());


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-slate-800 to-teal-900 text-white px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex items-center justify-center gap-3 my-6">
          <CloudSun className="w-8 h-8 text-blue-500" />
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Weather Alert System
          </h2>
        </div>
        <div className="flex items-center px-5 mt-12">
          <div className="w-4 h-4 rounded-full border-2 border-gray-700 mx-4"></div>
          <hr className="flex-grow border-t-2 border-gray-700" />
          <div className="w-4 h-4 rounded-full border-2 border-gray-700 mx-4"></div>
        </div>
        <div className="pb-10 rounded-2xl shadow-2xl px-6 sm:px-10">
          <h2 className="text-xl sm:text-3xl font-bold mb-8">
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
        <div className=" rounded-2xl shadow-2xl py-6 px-6 sm:px-10">
          <h2 className="text-xl sm:text-3xl font-bold mb-6">
            Plant Health Status
          </h2>
          {sensorLoading ? (
            <p className="text-center text-yellow-400">
              ⏳ Loading sensor data...
            </p>
          ) : sensorError ? (
            <p className="text-center text-red-500">❌ Error: {sensorError}</p>
          ) : (
            <div className="space-y-4">
              {sensorLoading ? (
                <p className="text-center text-yellow-400">
                  ⏳ Loading sensor data...
                </p>
              ) : sensorError ? (
                <p className=" text-red-500">
                  ❌ Error: {sensorError}
                </p>
              ) : sensor?.message === "No sensor data received yet" ? (
                <div className="bg-yellow-900/20 text-yellow-300 p-4 rounded-lg">
                  ⚠️ No sensor data received yet.
                </div>
              ) : alerts.length > 0 ? (
                alerts().map((alert, index) => (
                  <div
                    key={index}
                    className="bg-red-950/80 text-white p-4 rounded-lg"
                  >
                    {alert}
                  </div>
                ))
              ) : (
                <div className="bg-green-950/20 text-white p-4 rounded-lg">
                  ✅ Your plant is doing great!
                </div>
              )}
            </div>
          )}
        </div>

        <div className=" rounded-2xl shadow-2xl py-6 px-6 sm:px-10">
          <h2 className="text-xl sm:text-3xl font-bold mb-6">
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
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-4 w-full py-2 text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 cursor-pointer rounded-lg"
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
  const colorClass = colorClasses[color] || "bg-gray-800 text-white";
  return (
    <div className={`${colorClass} p-6 rounded-xl flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6" />
          <span className="text-lg font-medium">{title}</span>
        </div>
        <div>
          <span className="text-2xl font-semibold">{value}</span>
        </div>
      </div>
      <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
