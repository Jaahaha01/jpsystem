"use client";

import { useEffect } from "react";
import { Container } from "@/components/Container";

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
    <div className="flex min-h-[50vh] flex-col items-center justify-center bg-white py-16">
      <Container>
        <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Something went wrong!
        </h2>
        <p className="mt-4 text-base text-slate-600">
          We apologize for the inconvenience. Our team has been notified of the issue.
        </p>
        <button
          onClick={() => reset()}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-700 hover:shadow-md"
        >
          Try again
        </button>
        </div>
      </Container>
    </div>
  );
}
