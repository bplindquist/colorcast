import { useState, type ChangeEvent } from "react";

import { Button, Input } from "@heeler/ui";
import {
  WiDaySunny,
  WiHumidity,
  WiStrongWind,
  WiThermometer,
} from "react-icons/wi";

import { TemperatureCard, WeatherCard } from "@/components/WeatherCard";
import { getWeatherByZip } from "@/data/getWeatherByZip";
import type { OpenWeatherApiData } from "@/types/weather";
import { getColorForValue } from "@/utils/colorScale";

import "./App.css";

export const App = () => {
  const [locationSearch, setLocationSearch] = useState("");
  const [weatherData, setWeatherData] = useState<OpenWeatherApiData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocationSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (!locationSearch.trim()) {
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      const data = await getWeatherByZip(locationSearch);
      setWeatherData(data);
    } catch {
      setError(
        `No results found for "${locationSearch}". Please check the zip code and try again.`
      );
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
    setLocationSearch("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="header-gradient flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-4 gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Colorcast
          </h1>
          <p className="text-sm sm:text-base text-white/80">
            Weather at a colorful glance
          </p>
        </div>
        <div className="flex gap-2 items-center w-full sm:w-auto" role="search">
          <label htmlFor="zip-search" className="sr-only">
            Enter zip code
          </label>
          <Input
            id="zip-search"
            color="blue"
            placeholder="Enter zip code"
            value={locationSearch}
            onChange={handleLocationChange}
            onKeyDown={handleKeyDown}
            className="flex-1 sm:flex-none sm:w-48"
            aria-label="Zip code"
          />
          <Button
            color="violet"
            text={isLoading ? "Loading..." : "Search"}
            onClick={handleSearch}
            size="md"
            aria-label="Search weather by zip code"
          />
        </div>
      </header>

      <main
        id="main-content"
        className="px-4 sm:px-6 py-6 sm:py-8 max-w-5xl mx-auto"
      >
        {isLoading ? (
          <div
            className="space-y-6 animate-pulse"
            role="status"
            aria-busy="true"
            aria-label="Loading weather data"
          >
            <span className="sr-only">Loading weather data...</span>
            <div className="text-center">
              <div
                className="h-6 bg-gray-200 rounded w-32 mx-auto mb-2"
                aria-hidden="true"
              />
              <div
                className="h-8 bg-gray-200 rounded w-48 mx-auto mb-2"
                aria-hidden="true"
              />
              <div
                className="h-4 bg-gray-200 rounded w-36 mx-auto mb-2"
                aria-hidden="true"
              />
              <div
                className="h-5 bg-gray-200 rounded w-28 mx-auto"
                aria-hidden="true"
              />
            </div>

            <div
              className="bg-gray-200 rounded-2xl h-48 sm:h-56"
              aria-hidden="true"
            />

            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
              aria-hidden="true"
            >
              <div className="bg-white rounded-xl p-4 shadow-md border-t-4 border-gray-200">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 bg-gray-200 rounded-full" />
                  <div className="h-4 bg-gray-200 rounded w-16" />
                  <div className="h-6 bg-gray-200 rounded w-20" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-t-4 border-gray-200">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 bg-gray-200 rounded-full" />
                  <div className="h-4 bg-gray-200 rounded w-16" />
                  <div className="h-6 bg-gray-200 rounded w-20" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-t-4 border-gray-200">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 bg-gray-200 rounded-full" />
                  <div className="h-4 bg-gray-200 rounded w-16" />
                  <div className="h-6 bg-gray-200 rounded w-20" />
                </div>
              </div>
            </div>
          </div>
        ) : weatherData ? (
          <section
            className="space-y-6"
            aria-live="polite"
            aria-label={`Weather for ${weatherData.name}`}
          >
            <header className="text-center">
              <h2 className="text-lg sm:text-xl text-gray-600">Weather for</h2>
              <p className="text-2xl sm:text-3xl font-bold text-indigo-600">
                {weatherData.name}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                <span className="sr-only">Coordinates: </span>
                {weatherData.coord.lat.toFixed(2)}°N,{" "}
                {weatherData.coord.lon.toFixed(2)}°W
              </p>
              {weatherData.weather[0] && (
                <p className="text-base text-gray-500 mt-2 capitalize">
                  <span className="sr-only">Current conditions: </span>
                  {weatherData.weather[0].description}
                </p>
              )}
            </header>

            <TemperatureCard temperature={weatherData.main.temp} />
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
              role="list"
              aria-label="Weather details"
            >
              <WeatherCard
                icon={WiThermometer}
                label="Feels Like"
                value={`${Math.round(weatherData.main.feels_like)}°F`}
                color={getColorForValue(
                  weatherData.main.feels_like,
                  "temperature"
                )}
              />
              <WeatherCard
                icon={WiHumidity}
                label="Humidity"
                value={`${weatherData.main.humidity}%`}
                color={getColorForValue(weatherData.main.humidity, "humidity")}
              />
              <WeatherCard
                icon={WiStrongWind}
                label="Wind"
                value={`${weatherData.wind.speed} mph from ${weatherData.wind.deg}°`}
                color={getColorForValue(weatherData.wind.speed, "windSpeed")}
              />
            </div>
          </section>
        ) : (
          <div className="text-center py-16 sm:py-24">
            <div className="rainbow-icon-container mb-6">
              <WiDaySunny className="text-6xl sm:text-8xl text-yellow-500 mx-auto" />
            </div>
            {error ? (
              <div role="alert" aria-live="assertive">
                <h2 className="text-xl sm:text-2xl font-semibold text-red-600 mb-2">
                  Location Not Found
                </h2>
                <p className="text-gray-500 max-w-md mx-auto px-4">{error}</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
                  Welcome to Colorcast
                </h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  Enter a zip code above to get the current weather conditions
                  for any location.
                </p>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
