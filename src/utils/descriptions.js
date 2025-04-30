export const getTemperatureDescription = (temp) => {
  if (temp < 10)
    return "The atmosphere feels crisp and chilly, with a refreshing coldness in the air. It’s perfect for a cozy indoor setting or bundling up outdoors.";
  if (temp < 20)
    return "A cool breeze fills the air, creating a fresh, pleasant ambiance. It's that perfect balance between crisp and comfortable.";
  if (temp < 30)
    return "Warmth envelops the surroundings, creating a comfortable and inviting atmosphere. The air feels just right for spending time outside.";
  return "The air is hot and intense, giving a summery, sweltering feel to the surroundings. It creates an energy that's both vibrant and a little overwhelming.";
};

export const getHumidityDescription = (humidity) => {
  if (humidity < 30)
    return "The air feels dry, with a crispness that makes the atmosphere feel light and refreshing. There's a slight arid quality to the surroundings.";
  if (humidity < 60)
    return "A moderate level of humidity fills the air, creating a balanced, neutral atmosphere that's neither too dry nor too sticky.";
  return "The atmosphere feels thick and damp, with high humidity creating a heavier, almost tropical feeling to the air. There's a sense of moisture in the environment.";
};

export const getLightDescription = (light) => {
  if (light === 0)
    return "The environment is shrouded in darkness or thick clouds, giving a sense of calm stillness. It feels serene, with little to no light penetrating.";
  if (light === 1)
    return "Sunlight brightens the atmosphere, filling the surroundings with a warm, vibrant energy. The clear daylight creates a lively and refreshing vibe.";
  return "Light levels are shifting, creating a soft, changing ambiance. The atmosphere has a dynamic quality, with light filtering through clouds or changing throughout the day.";
};

export const getSoilMoistureDescription = (moisture) => {
  if (moisture < 30)
    return "The soil feels dry and parched, with a sense of stillness in the ground. The environment carries an arid quality, with little moisture to be found.";
  if (moisture < 70)
    return "The soil is balanced, with just the right amount of moisture. The ground feels stable, offering a neutral atmosphere where everything seems in harmony.";
  return "The soil is rich and saturated, with an earthy dampness in the air. The environment feels lush and thriving, as if nourished by recent rainfall.";
};
