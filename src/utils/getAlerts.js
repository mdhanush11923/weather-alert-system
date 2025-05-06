export const getAlerts = (sensor, weather) => {
  const soilMoisturePercent = Math.round((sensor?.soilMoisture / 1023) * 100);
  const alerts = [];

  const sensorAlerts = [
    {
      condition: sensor?.temperature > 35,
      message:
        "🔥 It's getting too hot for your plant! Consider moving it to shade or watering it.",
    },
    {
      condition: sensor?.humidity !== null && sensor?.humidity < 30,
      message:
        "🌬️ The air is quite dry. You might want to increase humidity or mist your plant.",
    },
    {
      condition: soilMoisturePercent < 25,
      message: "💧 The soil is too dry. It's time to water your plant!",
    },
    {
      condition: soilMoisturePercent > 85,
      message: "🚫 The soil is too wet. Avoid overwatering your plant.",
    },
    {
      condition: sensor?.light === 0,
      message:
        "🌑 No light detected. Move your plant to a brighter area if it's daytime.",
    },
    {
      condition: sensor?.light === 1 && sensor?.temperature > 37,
      message:
        "🔆 Bright light with high heat detected. Make sure your plant isn't overheating.",
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
