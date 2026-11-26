// Turns the big API response into just the data the app needs.
export function processWeather(data) {
  const current = data.currentConditions || data.days[0];

  return {
    location: data.resolvedAddress,
    description: data.description,
    current: {
      tempC: current.temp,
      feelsLikeC: current.feelslike,
      conditions: current.conditions,
      icon: current.icon,
      humidity: current.humidity,
      windSpeed: current.windspeed,
      precipProb: current.precipprob ?? data.days[0].precipprob ?? 0,
    },
    days: data.days.slice(0, 7).map((day) => ({
      date: day.datetime,
      maxC: day.tempmax,
      minC: day.tempmin,
      icon: day.icon,
      conditions: day.conditions,
      precipProb: day.precipprob ?? 0,
    })),
  };
}

export function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

export function formatTemp(celsius, unit) {
  const value = unit === "F" ? toFahrenheit(celsius) : celsius;
  return `${Math.round(value)}°${unit}`;
}

// Maps Visual Crossing icon names to an emoji + a background theme.
const ICONS = {
  "clear-day": "☀️",
  "clear-night": "🌙",
  "partly-cloudy-day": "⛅",
  "partly-cloudy-night": "☁️",
  cloudy: "☁️",
  rain: "🌧️",
  showers: "🌦️",
  snow: "❄️",
  fog: "🌫️",
  wind: "💨",
  thunder: "⛈️",
};

export function getIcon(icon) {
  const key = Object.keys(ICONS).find((k) => icon.startsWith(k) || icon === k);
  return ICONS[icon] || (key ? ICONS[key] : "🌡️");
}

export function getTheme(icon = "") {
  if (icon.includes("thunder")) return "thunder";
  if (icon.includes("snow") || icon.includes("hail") || icon.includes("sleet")) return "snow";
  if (icon.includes("rain") || icon.includes("showers")) return "rain";
  if (icon.includes("fog")) return "fog";
  if (icon.includes("clear-night")) return "night";
  if (icon.includes("clear")) return "sunny";
  if (icon.includes("cloud")) return "cloudy";
  if (icon.includes("wind")) return "cloudy";
  return "default";
}
