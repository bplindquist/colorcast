import type { RainbowColor } from "@/types/weather";

interface ColorConfig {
  gradient: string;
  border: string;
  text: string;
}

export const colorConfig: Record<RainbowColor, ColorConfig> = {
  red: {
    gradient: "from-red-500 to-orange-500",
    border: "border-red-400",
    text: "text-red-500",
  },
  orange: {
    gradient: "from-orange-500 to-yellow-500",
    border: "border-orange-400",
    text: "text-orange-500",
  },
  yellow: {
    gradient: "from-yellow-500 to-green-500",
    border: "border-yellow-400",
    text: "text-yellow-500",
  },
  green: {
    gradient: "from-green-500 to-teal-500",
    border: "border-green-400",
    text: "text-green-500",
  },
  blue: {
    gradient: "from-blue-500 to-indigo-500",
    border: "border-blue-400",
    text: "text-blue-500",
  },
  indigo: {
    gradient: "from-indigo-500 to-violet-500",
    border: "border-indigo-400",
    text: "text-indigo-500",
  },
  violet: {
    gradient: "from-violet-500 to-purple-600",
    border: "border-violet-400",
    text: "text-violet-500",
  },
};
