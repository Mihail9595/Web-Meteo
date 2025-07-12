import { apiKey, baseUrl } from "../api/apiKeyAndHost.js";
import { getForecast, getWeather } from "../api/getWeatherAndForecast.js";
import { renderCurrentWeather } from "./currentWeather.js";
import { renderDailyForecast } from "./dailyForecast.js";
import { showError } from "./error.js";
import { renderHourlyForecast } from "./hourlyForecast.js";

export function geoLacation() {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const { latitude, longitude } = await getBrowserGeoLacation();
      const locationName = await geoLacationName(latitude, longitude);
      await fetchWeatherByCoords(latitude, longitude, locationName);
    } catch (error) {
      console.error("ошибка при получении геолокации:", error.message);
      showError(
        "Не удалось определить ваше местоположение. Пожалуйста введеите город вручную"
      );
    }
  });
}

const getBrowserGeoLacation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Геолокация не поддерживается вашим браузером"));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => reject(error)
      );
    }
  });
};

const geoLacationName = async (latitude, longitude) => {
  const reverseGeocodingingUrl = new URL(`${baseUrl}/geo/1.0/reverse`);

  const queryParams = new URLSearchParams({
    lat: latitude,
    lon: longitude,
    limit: 1,
    appid: apiKey,
  });

  const url = `${reverseGeocodingingUrl}?${queryParams.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.length > 0) {
      const { local_names } = data[0];
      const russianName = local_names?.ru || data[0].name;
      return `${russianName}`;
    } else {
      throw new Error("Название места не найдено");
    }
  } catch (error) {
    console.error("Ошибка при получении названия места:", error.message);
    showError("Ошибка при получении названия места");
  }
};

const fetchWeatherByCoords = async (latitude, longitude, locationName) => {
  try {
    const weatherData = await getWeather(latitude, longitude);
    const forecastData = await getForecast(latitude, longitude);

    renderCurrentWeather(weatherData, locationName);
    renderHourlyForecast(forecastData);
    renderDailyForecast(forecastData);
  } catch (error) {
    console.error(error.message);
    showError(
      "Не удалось получить данные о погоде. Пожалуйста попробуйте позже"
    );
  }
};
