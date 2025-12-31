export type RainbowColor =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "violet";

export interface WeatherData {
  cityName: string;
  temperature: number;
  feelsLike: number;
  dewPoint: number;
  humidity: number;
  uvIndex: number;
  windSpeed: number;
  windDirection: string;
}
