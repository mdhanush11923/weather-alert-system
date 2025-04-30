export default function WeatherForecastCard({
  time,
  temperature,
  humidity,
  rain,
  wind,
}) {
  return (
    <div className="bg-slate-700 p-3 rounded-md text-sm w-full sm:w-[180px]">
      <div className="text-base font-medium mb-1">{time}</div>
      <p>🌡 {temperature}°C</p>
      <p>💧 {humidity}%</p>
      <p>🌧 {rain} mm</p>
      <p>💨 {wind} km/h</p>
    </div>
  );
}
