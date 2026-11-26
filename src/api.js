const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

const API_KEY = process.env.VISUAL_CROSSING_API_KEY;

export function buildUrl(location, apiKey = API_KEY) {
  const encodedLocation = encodeURIComponent(location.trim());
  const params = new URLSearchParams({
    unitGroup: "metric",
    include: "days,current",
    contentType: "json",
    key: apiKey || "",
  });

  return `${BASE_URL}/${encodedLocation}/next7days?${params.toString()}`;
}

export async function fetchWeather(location) {
  if (!location || !location.trim()) {
    throw new Error("Please enter a location.");
  }

  const keyToUse = API_KEY || "ZSGMG4T2W4DSBS5T7H22HNV93";

  let response;
  try {
    response = await fetch(buildUrl(location, keyToUse));
  } catch {
    throw new Error("Network error. Check your connection and try again.");
  }

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error(`Could not find a location called "${location}".`);
    }
    if (response.status === 401 || response.status === 403) {
      throw new Error("The API key was rejected. Check VISUAL_CROSSING_API_KEY.");
    }
    if (response.status === 429) {
      throw new Error("Daily API limit reached. Try again tomorrow.");
    }
    throw new Error(`Weather service error (${response.status}).`);
  }

  return response.json();
}