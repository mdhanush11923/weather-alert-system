import WeatherForecastCard from "./WeatherForecastCard";

export default function ForecastGrid({ weather, showAll }) {
  const limit = showAll ? 24 : 6;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
      {weather.time.slice(0, limit).map((time, i) => (
        <WeatherForecastCard
          key={i}
          time={new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          temperature={weather.temperature_2m[i]}
          humidity={weather.relative_humidity_2m[i]}
          rain={weather.precipitation[i]}
          wind={weather.windspeed_10m[i]}
        />
      ))}
    </div>
  );
}
