import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { zip } = request.query;

  if (!zip || typeof zip !== "string") {
    return response.status(400).json({ error: "Zip code is required" });
  }

  // Validate zip code format (US 5-digit)
  if (!/^\d{5}$/.test(zip)) {
    return response.status(400).json({ error: "Invalid zip code format" });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    console.error("OPENWEATHER_API_KEY is not configured");
    return response.status(500).json({ error: "Server configuration error" });
  }

  try {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=${apiKey}`
    );

    if (!weatherResponse.ok) {
      if (weatherResponse.status === 404) {
        return response.status(404).json({ error: "Location not found" });
      }
      return response.status(weatherResponse.status).json({
        error: "Failed to fetch weather data",
      });
    }

    const data = await weatherResponse.json();

    // Set cache headers for better performance (cache for 5 minutes)
    response.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");

    return response.status(200).json(data);
  } catch (error) {
    console.error("Weather API error:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
}
