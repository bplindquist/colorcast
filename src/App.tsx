import { useState, type ChangeEvent } from "react";

import { WiHumidity, WiStrongWind, WiThermometer } from "react-icons/wi";

import { Header } from "@/components/Layout";
import {
  EmptyState,
  LoadingSkeleton,
  LocationHeader,
  StatCard,
  TemperatureHero,
} from "@/components/Weather";
import { getWeatherByZip } from "@/data/getWeatherByZip";
import type { OpenWeatherApiData } from "@/types/weather";
import { getColorForValue } from "@/utils/colorScale";

import "./App.css";

export const App = () => {
  const [locationSearch, setLocationSearch] = useState("");
  const [weatherData, setWeatherData] = useState<OpenWeatherApiData | null>(
    null,
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
    if (!locationSearch.trim()) return;

    setError(null);
    setIsLoading(true);

    try {
      const data = await getWeatherByZip(locationSearch);
      setWeatherData(data);
    } catch {
      setError(
        `No results found for "${locationSearch}". Please check the zip code and try again.`,
      );
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }

    setLocationSearch("");
  };

  return (
    <div className="min-h-screen bg-white">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header
        searchValue={locationSearch}
        onSearchChange={handleLocationChange}
        onSearchKeyDown={handleKeyDown}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      <main
        id="main-content"
        className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      >
        {isLoading ? (
          <LoadingSkeleton />
        ) : weatherData ? (
          <section
            aria-live="polite"
            aria-label={`Weather for ${weatherData.name}`}
          >
            <LocationHeader
              name={weatherData.name}
              lat={weatherData.coord.lat}
              lon={weatherData.coord.lon}
              description={weatherData.weather[0]?.description}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 sm:py-12">
              <TemperatureHero
                temperature={weatherData.main.temp}
                weatherCondition={weatherData.weather[0]?.description}
              />

              <div
                className="flex justify-center gap-8 lg:flex-col lg:items-start lg:justify-center lg:gap-8"
                role="list"
                aria-label="Weather details"
              >
                <StatCard
                  icon={WiThermometer}
                  label="Feels Like"
                  value={`${Math.round(weatherData.main.feels_like)}°`}
                  color={getColorForValue(
                    weatherData.main.feels_like,
                    "temperature",
                  )}
                />
                <StatCard
                  icon={WiHumidity}
                  label="Humidity"
                  value={`${weatherData.main.humidity}%`}
                  color={getColorForValue(
                    weatherData.main.humidity,
                    "humidity",
                  )}
                />
                <StatCard
                  icon={WiStrongWind}
                  label="Wind"
                  value={`${Math.round(weatherData.wind.speed)} mph`}
                  color={getColorForValue(weatherData.wind.speed, "windSpeed")}
                />
              </div>
            </div>
          </section>
        ) : (
          <EmptyState error={error} />
        )}
      </main>
    </div>
  );
};
