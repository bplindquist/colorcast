import type { RainbowColor } from "@/types/weather";

interface ColorScale {
  min: number;
  max: number;
  colors: RainbowColor[];
}

const colorScales: Record<string, ColorScale> = {
  // Temperature: cold (violet) to hot (red)
  // 0-20°F: violet, 20-35°F: indigo, 35-50°F: blue, 50-65°F: green, 65-80°F: yellow, 80-95°F: orange, 95+°F: red
  temperature: {
    min: 0,
    max: 110,
    colors: ["violet", "indigo", "blue", "green", "yellow", "orange", "red"],
  },
  // Dew point comfort scale
  // <50°F: green (comfortable), 50-60°F: yellow, 60-65°F: orange (humid), 65+°F: red (oppressive)
  dewPoint: {
    min: 30,
    max: 75,
    colors: ["green", "yellow", "orange", "red"],
  },
  // Humidity comfort scale (both extremes are uncomfortable)
  // 0-20%: orange (too dry), 20-40%: yellow, 40-60%: green (ideal), 60-80%: yellow, 80-100%: red (very humid)
  humidity: {
    min: 0,
    max: 100,
    colors: ["orange", "yellow", "green", "yellow", "red"],
  },
  // UV Index: EPA scale
  // 0-2: green (low), 3-5: yellow (moderate), 6-7: orange (high), 8-10: red (very high), 11+: violet (extreme)
  uvIndex: {
    min: 0,
    max: 11,
    colors: ["green", "green", "yellow", "orange", "red", "violet"],
  },
  // Wind speed
  // 0-10 mph: green (calm), 10-20 mph: yellow (breezy), 20-30 mph: orange (windy), 30+ mph: red (very windy)
  windSpeed: {
    min: 0,
    max: 40,
    colors: ["green", "yellow", "orange", "red"],
  },
};

export const getColorForValue = (
  value: number,
  scaleKey: string
): RainbowColor => {
  const scale = colorScales[scaleKey];
  if (!scale) return "blue";

  const { min, max, colors } = scale;
  const clampedValue = Math.max(min, Math.min(max, value));
  const normalized = (clampedValue - min) / (max - min);
  const colorIndex = Math.min(
    Math.floor(normalized * colors.length),
    colors.length - 1
  );

  return colors[colorIndex];
};
export const tailwindColors: Record<
  RainbowColor,
  { border: string; text: string; bg: string; gradient: string }
> = {
  red: {
    border: "border-red-400",
    text: "text-red-500",
    bg: "bg-red-500",
    gradient: "from-red-500 to-orange-500",
  },
  orange: {
    border: "border-orange-400",
    text: "text-orange-500",
    bg: "bg-orange-500",
    gradient: "from-orange-500 to-yellow-500",
  },
  yellow: {
    border: "border-yellow-400",
    text: "text-yellow-500",
    bg: "bg-yellow-500",
    gradient: "from-yellow-500 to-green-500",
  },
  green: {
    border: "border-green-400",
    text: "text-green-500",
    bg: "bg-green-500",
    gradient: "from-green-500 to-teal-500",
  },
  blue: {
    border: "border-blue-400",
    text: "text-blue-500",
    bg: "bg-blue-500",
    gradient: "from-blue-500 to-indigo-500",
  },
  indigo: {
    border: "border-indigo-400",
    text: "text-indigo-500",
    bg: "bg-indigo-500",
    gradient: "from-indigo-500 to-violet-500",
  },
  violet: {
    border: "border-violet-400",
    text: "text-violet-500",
    bg: "bg-violet-500",
    gradient: "from-violet-500 to-purple-600",
  },
};
