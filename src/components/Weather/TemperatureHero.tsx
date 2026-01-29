import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

import type { RainbowColor } from "@/types/weather";
import { getColorForValue } from "@/utils/colorScale";
import { colorConfig } from "./colorConfig";

interface TemperatureHeroProps {
  temperature: number;
  weatherCondition?: string;
}

const WeatherIconMap = {
  thunder: WiThunderstorm,
  rain: WiRain,
  drizzle: WiRain,
  snow: WiSnow,
  fog: WiFog,
  mist: WiFog,
  haze: WiFog,
  cloud: WiCloudy,
  overcast: WiCloudy,
  clear: WiDaySunny,
} as const;

const getWeatherIconKey = (condition?: string): keyof typeof WeatherIconMap => {
  if (!condition) return "clear";
  const lower = condition.toLowerCase();
  for (const key of Object.keys(WeatherIconMap) as Array<
    keyof typeof WeatherIconMap
  >) {
    if (lower.includes(key)) return key;
  }
  return "clear";
};

export const TemperatureHero = ({
  temperature,
  weatherCondition,
}: TemperatureHeroProps) => {
  const color: RainbowColor = getColorForValue(temperature, "temperature");
  const config = colorConfig[color];
  const roundedTemp = Math.round(temperature);
  const iconKey = getWeatherIconKey(weatherCondition);
  const Icon = WeatherIconMap[iconKey];

  return (
    <div className="text-center lg:text-left flex flex-col justify-center">
      <Icon
        className={`text-6xl lg:text-7xl ${config.text} mx-auto lg:mx-0`}
        aria-hidden="true"
      />
      <div
        className={`font-display text-[8rem] sm:text-[10rem] lg:text-[14rem] font-extrabold leading-none tracking-tighter bg-gradient-to-b ${config.gradient} bg-clip-text text-transparent`}
        aria-label={`Current temperature: ${roundedTemp} degrees Fahrenheit`}
      >
        {roundedTemp}°
      </div>
    </div>
  );
};
