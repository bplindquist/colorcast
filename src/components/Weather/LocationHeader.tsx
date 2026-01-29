interface LocationHeaderProps {
  name: string;
  lat: number;
  lon: number;
  description?: string;
}

export const LocationHeader = ({
  name,
  lat,
  lon,
  description,
}: LocationHeaderProps) => {
  return (
    <header className="text-center lg:text-left pt-8 sm:pt-10">
      <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
        {name}
      </h2>
      <div className="mt-2 flex items-center justify-center lg:justify-start gap-3 text-sm text-gray-400">
        <span>
          {lat.toFixed(2)}°N, {lon.toFixed(2)}°W
        </span>
        {description && (
          <>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="capitalize">{description}</span>
          </>
        )}
      </div>
    </header>
  );
};
