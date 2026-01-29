import type { RainbowColor } from "@/types/weather";
import { colorConfig } from "./colorConfig";

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: RainbowColor;
}

export const StatCard = ({
  icon: Icon,
  label,
  value,
  color,
}: StatCardProps) => {
  const config = colorConfig[color];

  return (
    <article
      className="flex flex-col items-center gap-1 lg:flex-row lg:items-center lg:gap-4"
      role="listitem"
      aria-label={`${label}: ${value}`}
    >
      <div
        className={`bg-gradient-to-br ${config.gradient} p-2 lg:p-3 rounded-xl`}
      >
        <Icon className="text-xl lg:text-3xl text-white" aria-hidden="true" />
      </div>
      <div className="text-center lg:text-left">
        <div className="text-[10px] lg:text-sm font-medium text-gray-500 uppercase tracking-wide">
          {label}
        </div>
        <div
          className={`text-lg lg:text-4xl font-extrabold font-display bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}
        >
          {value}
        </div>
      </div>
    </article>
  );
};
