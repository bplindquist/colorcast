import { useState, type ChangeEvent } from "react";

import { Button, Input } from "@heeler/ui";
import { TbUvIndex } from "react-icons/tb";
import {
  WiDaySunny,
  WiHumidity,
  WiRaindrop,
  WiStrongWind,
  WiThermometer,
} from "react-icons/wi";

import { TemperatureCard, WeatherCard } from "@/components/WeatherCard";
import { getWeatherByZip } from "@/data/mockWeather";
import type { WeatherData } from "@/types/weather";
import { getColorForValue } from "@/utils/colorScale";

import "./App.css";

export const App = () => {
  const [locationSearch, setLocationSearch] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocationSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (!locationSearch.trim()) {
      return;
    }

    const data = getWeatherByZip(locationSearch);
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
                {weatherData.cityName}
              </h3>
            </div>

            <TemperatureCard temperature={weatherData.temperature} />

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              <WeatherCard
                icon={WiThermometer}
                label="Feels Like"
                value={`${weatherData.feelsLike}°F`}
                color={getColorForValue(weatherData.feelsLike, "temperature")}
              />
              <WeatherCard
                icon={WiRaindrop}
                label="Dew Point"
                value={`${weatherData.dewPoint}°F`}
                color={getColorForValue(weatherData.dewPoint, "dewPoint")}
              />
              <WeatherCard
                icon={WiHumidity}
                label="Humidity"
                value={`${weatherData.humidity}%`}
                color={getColorForValue(weatherData.humidity, "humidity")}
              />
              <WeatherCard
                icon={TbUvIndex}
                label="UV Index"
                value={`${weatherData.uvIndex}`}
                color={getColorForValue(weatherData.uvIndex, "uvIndex")}
              />
              <WeatherCard
                icon={WiStrongWind}
                label="Wind"
                value={`${weatherData.windSpeed} mph ${weatherData.windDirection}`}
                color={getColorForValue(weatherData.windSpeed, "windSpeed")}
                className="col-span-2 lg:col-span-1"
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
