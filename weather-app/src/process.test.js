import { processWeather, toFahrenheit, formatTemp, getTheme } from "./process";

const sample = {
  resolvedAddress: "Kigali, Rwanda",
  description: "Similar temperatures continuing.",
  currentConditions: {
    temp: 22, feelslike: 22, conditions: "Clear", icon: "clear-day",
    humidity: 50, windspeed: 10, precipprob: 0,
  },
  days: [
    { datetime: "2026-11-25", tempmax: 25, tempmin: 15, icon: "rain", conditions: "Rain", precipprob: 80 },
  ],
};

test("processWeather keeps only the needed fields", () => {
  const result = processWeather(sample);
  expect(result.location).toBe("Kigali, Rwanda");
  expect(result.current.tempC).toBe(22);
  expect(result.days).toHaveLength(1);
  expect(result.days[0].precipProb).toBe(80);
});

test("temperature conversion", () => {
  expect(toFahrenheit(0)).toBe(32);
  expect(formatTemp(100, "F")).toBe("212°F");
  expect(formatTemp(21.6, "C")).toBe("22°C");
});

test("getTheme maps icons to themes", () => {
  expect(getTheme("clear-day")).toBe("sunny");
  expect(getTheme("rain")).toBe("rain");
  expect(getTheme("partly-cloudy-day")).toBe("cloudy");
});
