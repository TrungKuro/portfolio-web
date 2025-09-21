"use client"; //! Error boundaries must be Client Components

import { useEffect } from "react";
import { debugError } from "@/lib/logger";
import { ErrorPage } from "@/components/layout/ErrorPage";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    //! Log the error to an error reporting service
    debugError(error);
  }, [error]);

  return <ErrorPage error={error} reset={reset} />;
}
