import { useState, type ChangeEvent } from "react";

import { Button, Input } from "@heeler/ui";
import {
  WiDaySunny,
  WiHumidity,
  WiStrongWind,
  WiThermometer,
} from "react-icons/wi";

import { TemperatureCard, WeatherCard } from "@/components/WeatherCard";
import { getWeatherByZip } from "@/data/mockWeather";
import type { OpenWeatherApiData } from "@/types/weather";
import { getColorForValue } from "@/utils/colorScale";

import "./App.css";

export const App = () => {
  const [locationSearch, setLocationSearch] = useState("");
  const [weatherData, setWeatherData] = useState<OpenWeatherApiData | null>(
    null
  );

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

    const data = await getWeatherByZip(locationSearch);
    setWeatherData(data);
    setLocationSearch("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="header-gradient flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-4 gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Colorcast
          </h1>
          <p className="text-sm sm:text-base text-white/80">
            Weather at a colorful glance
          </p>
        </div>
        <div className="flex gap-2 items-center w-full sm:w-auto">
          <Input
            color="blue"
            placeholder="Enter zip code"
            value={locationSearch}
            onChange={handleLocationChange}
            onKeyDown={handleKeyDown}
            className="flex-1 sm:flex-none sm:w-48"
          />
          <Button
            color="violet"
            text="Search"
            onClick={handleSearch}
            size="md"
          />
        </div>
      </header>

      <main className="px-4 sm:px-6 py-6 sm:py-8 max-w-5xl mx-auto">
        {weatherData ? (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-lg sm:text-xl text-gray-600">Weather for</h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-indigo-600">
                {weatherData.name}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {weatherData.coord.lat.toFixed(2)}°N,{" "}
                {weatherData.coord.lon.toFixed(2)}°W
              </p>
              {weatherData.weather[0] && (
                <p className="text-base text-gray-500 mt-2 capitalize">
                  {weatherData.weather[0].description}
                </p>
              )}
            </div>

            <TemperatureCard temperature={weatherData.main.temp} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
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
          </div>
        ) : (
          <div className="text-center py-16 sm:py-24">
            <div className="rainbow-icon-container mb-6">
              <WiDaySunny className="text-6xl sm:text-8xl text-yellow-500 mx-auto" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
              Welcome to Colorcast
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Enter a zip code above to get the current weather conditions for
              any location.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
