"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="grid place-items-center h-[70vh] text-center">
      <div>
        <h2 className="text-5xl text-red-500 font-bold">
          Something went wrong!
        </h2>
        <h2 className="mt-5 font-bold text-lg">
          Error: <span className="font-normal">{error.message}</span>
        </h2>
        <button
          className="mt-8 bg-gray-300 px-8 py-1.5 rounded-sm"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}
