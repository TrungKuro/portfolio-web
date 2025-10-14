// import { LoadingPage } from "@/components/layout/LoadingPage";

/* ------------------------------------------------------------------------- */

/**
 * ✅ loading.tsx chỉ tự động hiển thị trong React Server Components (RSC)
 * - khi một Server Component (trong route tương ứng) chưa được load xong
 * - và Next.js hiển thị fallback trong khi đang “streaming” dữ liệu
 *
 * ❌ Nhưng: Với page.tsx là SSG (Static Site Generation)
 * - tức là bạn không có bất kỳ async data fetch nào ở server runtime
 * - và nội dung được build sẵn 100% tại build-time → loading.tsx sẽ KHÔNG bao giờ chạy
 *
 * 👉 Vì lúc người dùng vào trang:
 * - Next.js chỉ phục vụ file HTML tĩnh đã build xong → không cần loading UI trung gian
 */

/* ------------------------------------------------------------------------- */

export default function Loading() {
  // return <LoadingPage />;

  //! Tắt Loading Page, vì hiện page render dạng SSG
  //! Chỉ bật Loading Page, khi page chuyển sang render dạng SSR
  return null;
}
