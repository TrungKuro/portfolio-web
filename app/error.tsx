"use client"; //! Error boundaries must be Client Components

import { useEffect } from "react";
import { debugError } from "@/lib/logger";
import { ErrorPage } from "@/components/layout/ErrorPage";

/* ------------------------------------------------------------------------- */

/**
 * ⚙️ 1. Cơ chế thực của app/error.tsx
 * - error.tsx là "Error Boundary cấp route", được Next.js tự động wrap quanh route đó
 * - Nó chỉ kích hoạt khi có lỗi runtime xảy ra trong quá trình render Server Component hoặc Client Component của route
 *
 * ❌ Với page.tsx là SSG (Static Site Generation)
 * - Không có bất kỳ runtime fetch hoặc render dynamic nào → Toàn bộ trang được build sẵn tại build-time
 *
 * ➡️ Kết quả:
 * - Nếu có lỗi trong lúc build → Next.js báo lỗi tại terminal, không hiển thị error.tsx
 * - Nếu không lỗi, thì runtime không bao giờ chạy lại logic đó, nên error.tsx cũng không được kích hoạt
 *
 * 🧩 Nói ngắn gọn:
 * - error.tsx chỉ chạy tại runtime
 * - trong khi SSG chỉ render ở build-time → nên không chạy
 */

/* ------------------------------------------------------------------------- */

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
