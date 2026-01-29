import { WiDaySunny } from "react-icons/wi";

interface EmptyStateProps {
  error?: string | null;
}

export const EmptyState = ({ error }: EmptyStateProps) => {
  return (
    <div className="text-center py-20 sm:py-32">
      {error ? (
        <div role="alert" aria-live="assertive">
          <div className="text-8xl sm:text-9xl font-display font-extrabold text-red-500/20 mb-4">
            !
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Location Not Found
          </h2>
          <p className="text-gray-500 max-w-sm mx-auto">{error}</p>
        </div>
      ) : (
        <>
          <WiDaySunny className="text-8xl sm:text-9xl text-yellow-400 mx-auto mb-4" />
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Check the weather
          </h2>
          <p className="text-gray-500 text-lg">
            Enter a zip code to get started
          </p>
        </>
      )}
    </div>
  );
};
