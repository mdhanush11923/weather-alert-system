export const getAlerts = (sensor, weather) => {
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
      condition: sensor?.light === 0,
      message:
        "🌑 No light detected. Consider moving your plant to a brighter area.",
    },
    {
      condition: sensor?.light === 1,
      message:
        "🔆 Light detected. If it's too intense, ensure your plant isn't getting scorched.",
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
