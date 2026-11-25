import { formatTemp, getIcon, getTheme } from "./process";

const $ = (id) => document.getElementById(id);

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text; // textContent keeps API data safe from XSS
  return node;
}

export function showLoading(isLoading) {
  $("loading").hidden = !isLoading;
}

export function showError(message) {
  const box = $("error");
  box.textContent = message || "";
  box.hidden = !message;
}

export function renderWeather(weather, unit) {
  const section = $("weather");
  section.replaceChildren();

  // Current conditions card
  const card = el("div", "current");
  card.append(
    el("h2", "current__place", weather.location),
    el("div", "current__icon", getIcon(weather.current.icon)),
    el("div", "current__temp", formatTemp(weather.current.tempC, unit)),
    el("div", "current__conditions", weather.current.conditions),
    el("p", "current__feels", `Feels like ${formatTemp(weather.current.feelsLikeC, unit)}`)
  );

  const stats = el("div", "stats");
  [
    ["Humidity", `${Math.round(weather.current.humidity)}%`],
    ["Wind", `${Math.round(weather.current.windSpeed)} km/h`],
    ["Rain chance", `${Math.round(weather.current.precipProb)}%`],
  ].forEach(([label, value]) => {
    const stat = el("div", "stat");
    stat.append(el("span", "stat__label", label), el("span", "stat__value", value));
    stats.append(stat);
  });
  card.append(stats);

  if (weather.description) card.append(el("p", "current__desc", weather.description));

  // 7-day forecast
  const forecast = el("div", "forecast");
  weather.days.forEach((day) => {
    const item = el("div", "day");
    const name = new Date(`${day.date}T12:00:00`).toLocaleDateString(undefined, {
      weekday: "short",
    });
    item.append(
      el("span", "day__name", name),
      el("span", "day__icon", getIcon(day.icon)),
      el("span", "day__temps", `${formatTemp(day.maxC, unit)} / ${formatTemp(day.minC, unit)}`)
    );
    forecast.append(item);
  });

  section.append(card, forecast);
  section.hidden = false;

  // Change the look of the page based on the weather
  document.body.dataset.weather = getTheme(weather.current.icon);
}

export function updateToggle(unit) {
  $("unit-toggle").textContent = `°${unit}`;
}
