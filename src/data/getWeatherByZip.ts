import type { OpenWeatherApiData } from "@/types/weather";

export const getWeatherByZip = async (
  zipCode: string
): Promise<OpenWeatherApiData> => {
  const response = await fetch(`/api/weather?zip=${zipCode}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Failed to fetch weather data");
  }

  return response.json();
};
