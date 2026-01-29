export const LoadingSkeleton = () => {
  return (
    <div
      className="animate-pulse"
      role="status"
      aria-busy="true"
      aria-label="Loading weather data"
    >
      <span className="sr-only">Loading weather data...</span>

      <div className="text-center pt-12" aria-hidden="true">
        <div className="h-14 bg-gray-200 rounded-2xl w-64 mx-auto mb-4" />
        <div className="h-4 bg-gray-100 rounded-full w-48 mx-auto" />
      </div>

      <div className="py-12 text-center" aria-hidden="true">
        <div className="h-40 sm:h-52 bg-gray-200 rounded-3xl w-72 sm:w-96 mx-auto" />
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-5 pb-12" aria-hidden="true">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-2xl h-32 sm:h-40" />
        ))}
      </div>
    </div>
  );
};
