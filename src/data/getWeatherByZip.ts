import type { OpenWeatherApiData } from "@/types/weather";

export const getWeatherByZip = async (
  zipCode: string
): Promise<OpenWeatherApiData> => {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=${
      import.meta.env.VITE_OPENWEATHER_API_KEY
    }`
  );

  if (!data.ok) {
    throw new Error("Failed to fetch weather data");
  }
  const json = await data.json();

  return json;
};
