// Dựa vào [ process.env.NODE_ENV ] → Bật/tắt Console theo "Chế độ môi trường"
// Đây là biến "built-in", bạn không cần khai báo trong (.env) - Next.js tự set khi build.
//
// Chế độ DEV
// - Khi chạy lệnh [ npm run dev ] trong Terminal
// - Next.js và React tự đặt [ process.env.NODE_ENV = "development" ] khi build
// → ON CONSOLE
//
// Chế độ PRODUCTION
// - Khi chạy lệnh [ npm run build ] trong Terminal
// - Next.js và React tự đặt [ process.env.NODE_ENV = "production" ] khi build
// → OFF CONSOLE

const isDev = process.env.NODE_ENV === "development";
const debugMode = process.env.NEXT_PUBLIC_DEBUG_MODE === "true";

// Hàm helper để in màu trong Console
function styledLog(style: string, label: string, ...args: unknown[]) {
  if (isDev && debugMode) {
    console.log(`%c${label}`, style, ...args);
  }
}

export function debugLog(...args: unknown[]) {
  styledLog(
    "background: #c9f9ac; color: black; font-weight: bold; padding: 2px 4px; border-radius: 4px;",
    "LOG",
    ...args,
  );
}

export function debugWarn(...args: unknown[]) {
  styledLog(
    "background: #f9d7ac; color: black; font-weight: bold; padding: 2px 4px; border-radius: 4px;",
    "WARN",
    ...args,
  );
}

export function debugError(...args: unknown[]) {
  styledLog(
    "background: #f9acac; color: black; font-weight: bold; padding: 2px 4px; border-radius: 4px;",
    "ERROR",
    ...args,
  );
}
