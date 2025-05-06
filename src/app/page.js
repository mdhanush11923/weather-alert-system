"use client";
import { useEffect, useState, useRef } from "react";
import {
  Thermometer,
  Droplets,
  Sun,
  Sprout,
  Wind,
  CloudRain,
  CloudSun,
} from "lucide-react";
import InfoCard from "@/components/InfoCard";
import { getAlerts } from "@/utils/getAlerts";
import {
  getHumidityDescription,
  getLightDescription,
  getSoilMoistureDescription,
  getTemperatureDescription,
} from "@/utils/descriptions";
import { toast } from "sonner";

export default function WeatherPage() {
  const [weather, setWeather] = useState(null);
  const [sensor, setSensor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sensorLoading, setSensorLoading] = useState(true);
  const [sensorError, setSensorError] = useState("");
  const [showAll, setShowAll] = useState(false);

  const hasShownToastRef = useRef(false);

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

  const alerts = getAlerts(sensor, weather);

useEffect(() => {
  if (sensorLoading) return;

  const showBrowserNotification = (title, body) => {
    if (
      typeof Notification !== "undefined" &&
      Notification.permission === "granted"
    ) {
      new Notification(title, { body });
    }
  };

  const cooldown = 60 * 1000; // 60 seconds
  const lastAlertData = JSON.parse(
    localStorage.getItem("lastAlertData") || "{}"
  );
  const now = Date.now();

  const createHash = (arr) => JSON.stringify(arr.sort());

  const currentHash = createHash(alerts);

  // Already shown or within cooldown
  if (
    hasShownToastRef.current ||
    (lastAlertData.hash === currentHash &&
      now - lastAlertData.timestamp < cooldown)
  ) {
    return;
  }

  if (sensorError) {
    toast.error(`Sensor Error: ${sensorError}`);
    showBrowserNotification("Sensor Error", sensorError);
  } else if (sensor?.message === "No sensor data received yet") {
    toast.warning("No sensor data received yet.");
    showBrowserNotification("Sensor Status", "No sensor data received yet.");
  } else if (alerts.length > 0) {
    alerts.forEach((alert) => {
      toast.error(alert);
      showBrowserNotification("⚠️ Alert", alert);
    });
  } else {
    toast.success("Your plant is doing great!");
    showBrowserNotification("🌿 Status", "Your plant is doing great!");
  }

  // Save last shown hash and time
  localStorage.setItem(
    "lastAlertData",
    JSON.stringify({ hash: currentHash, timestamp: now })
  );
  hasShownToastRef.current = true;
}, [sensorLoading, sensor, alerts, sensorError]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 py-10">
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
        {sensor != null && sensor.temperature != null && (
          <div className="pb-10 rounded-2xl shadow-2xl px-6 sm:px-10">
            <h2 className="text-xl sm:text-3xl font-bold mb-8">
              🌿 Live Sensor Data
            </h2>
            {sensorLoading ? (
              <p className="text-yellow-400">⏳ Loading sensor data...</p>
            ) : sensorError ? (
              <p className="text-red-500">❌ Error: {sensorError}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InfoCard
                  Icon={Thermometer}
                  title="Temperature"
                  color="red"
                  value={sensor.temperature}
                  description={getTemperatureDescription(sensor.temperature)}
                />
                <InfoCard
                  Icon={Droplets}
                  title="Humidity"
                  color="sky"
                  value={sensor.humidity}
                  description={getHumidityDescription(sensor.humidity)}
                />
                <InfoCard
                  Icon={Sun}
                  title="Light"
                  color="amber"
                  value={sensor.light}
                  description={getLightDescription(sensor.light)}
                />
                <InfoCard
                  Icon={Sprout}
                  title="Soil Moisture"
                  color="lime"
                  value={sensor.soilMoisture}
                  description={getSoilMoistureDescription(sensor.soilMoisture)}
                />
              </div>
            )}
          </div>
        )}

        <div className="shadow-xl rounded-2xl py-6 px-6 sm:px-10">
          <h2 className="text-xl sm:text-3xl font-bold mb-6">
            Plant Health Status
          </h2>
          {sensorLoading ? (
            <p className="text-yellow-400">⏳ Loading sensor data...</p>
          ) : sensorError ? (
            <p className="text-red-500">❌ Error: {sensorError}</p>
          ) : (
            <div className="space-y-4">
              {sensorLoading ? (
                <p className="text-yellow-400">⏳ Loading sensor data...</p>
              ) : sensorError ? (
                <p className=" text-red-500">❌ Error: {sensorError}</p>
              ) : sensor?.message === "No sensor data received yet" ? (
                <div className="bg-yellow-900/20 text-yellow-300 p-4 rounded-lg">
                  ⚠️ No sensor data received yet.
                </div>
              ) : alerts.length > 0 ? (
                alerts.map((alert, index) => (
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

        <div className="shadow-xl rounded-2xl py-6 px-6 sm:px-10">
          <h2 className="text-xl sm:text-3xl font-bold mb-6">
            ⛅ Weather Forecast
          </h2>
          {loading ? (
            <p className="text-yellow-400">⏳ Loading weather forecast...</p>
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
                  {showAll ? "Show Less" : "Show 24 Hours"}
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
