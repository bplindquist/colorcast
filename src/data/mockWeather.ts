import type { WeatherData } from "@/types/weather";

const mockWeatherByZip: Record<string, WeatherData> = {
  "53718": {
    cityName: "Madison, WI",
    temperature: 30,
    feelsLike: 25,
    dewPoint: 20,
    humidity: 72,
    uvIndex: 1,
    windSpeed: 12,
    windDirection: "NW",
  },
  "85001": {
    cityName: "Phoenix, AZ",
    temperature: 105,
    feelsLike: 110,
    dewPoint: 55,
    humidity: 15,
    uvIndex: 11,
    windSpeed: 8,
    windDirection: "SW",
  },
  "28401": {
    cityName: "Wilmington, NC",
    temperature: 68,
    feelsLike: 65,
    dewPoint: 52,
    humidity: 55,
    uvIndex: 5,
    windSpeed: 6,
    windDirection: "E",
  },
};

const DEFAULT_ZIP = "53718";

export const getWeatherByZip = (zipCode: string): WeatherData => {
  return mockWeatherByZip[zipCode.trim()] || mockWeatherByZip[DEFAULT_ZIP];
};
