import { WiDaySunny } from "react-icons/wi";

import type { RainbowColor } from "@/types/weather";
import { getColorForValue, tailwindColors } from "@/utils/colorScale";

interface WeatherCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: RainbowColor;
  className?: string;
}

export const WeatherCard = ({
  icon: Icon,
  label,
  value,
  color,
  className = "",
}: WeatherCardProps) => {
  const colors = tailwindColors[color];

  return (
    <div
      className={`bg-white rounded-xl p-4 shadow-md border-t-4 ${colors.border} ${className}`}
    >
      <div className="flex flex-col items-center text-center gap-2">
        <Icon className={`text-3xl ${colors.text}`} />
        <div className="text-xs sm:text-sm text-gray-500 font-medium">
          {label}
        </div>
        <div className="text-lg sm:text-xl font-bold text-gray-800">
          {value}
        </div>
      </div>
    </div>
  );
};

interface TemperatureCardProps {
  temperature: number;
}

export const TemperatureCard = ({ temperature }: TemperatureCardProps) => {
  const color = getColorForValue(temperature, "temperature");
  const colors = tailwindColors[color];

  return (
    <div
      className={`bg-gradient-to-br ${colors.gradient} rounded-2xl p-6 sm:p-8 text-center shadow-lg relative overflow-hidden`}
    >
      <div className="flex items-center justify-center gap-3 mb-2">
        <WiDaySunny className="text-5xl sm:text-6xl text-white/90" />
      </div>
      <div className="text-6xl sm:text-8xl font-bold text-white">
        {temperature}°
      </div>
      <div className="text-lg sm:text-xl text-white/80 mt-2">
        Current Temperature
      </div>
    </div>
  );
};
