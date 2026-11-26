import "./style.css";
import { fetchWeather } from "./api";
import { processWeather } from "./process";
import { renderWeather, showError, showLoading, updateToggle } from "./ui";

let unit = "C";
let currentWeather = null;

const form = document.getElementById("search-form");
const input = document.getElementById("location-input");
const toggle = document.getElementById("unit-toggle");

async function search(location) {
  showError("");
  showLoading(true);
  try {
    const raw = await fetchWeather(location);
    
    currentWeather = processWeather(raw);
    console.log(currentWeather);
    renderWeather(currentWeather, unit);
  } catch (err) {
    showError(err.message);
  } finally {
    showLoading(false);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  search(input.value);
});

toggle.addEventListener("click", () => {
  unit = unit === "C" ? "F" : "C";
  updateToggle(unit);
  if (currentWeather) renderWeather(currentWeather, unit);
});

// Load something on first visit
search("Kigali");
