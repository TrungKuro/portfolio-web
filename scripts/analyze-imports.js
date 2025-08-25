// analyze-imports.js
// - script để quét toàn bộ code và thống kê package nào bạn import nhiều named exports nhất
// - cần cài số gói, nhập lệnh "npm i -D @babel/parser @babel/traverse globby glob"
// - để chạy script, nhập lệnh "node analyze-imports.js"
//
//! Kết quả từ script này: giúp xác định danh sách tên các gói (PACKAGE-LEVEL) có thể cần đưa vào "optimizePackageImports" trong "next.config." để Optimizing package imports
//
// Cách script xử lý:
// - Quét tất cả import trong project.
// - Đối chiếu với dependencies và devDependencies trong package.json.
// - In ra chỉ những package thực sự nằm trong package.json (tức npm package hợp lệ).
// - Bỏ qua alias (@/...), Node.js core modules (fs, path, …), hoặc mấy giá trị rác.
// - Thống kê số lần import mỗi package, để bạn dễ quyết định nên đưa gói nào vào "optimizePackageImports"

import { globby } from "globby";
import fs from "fs";
import path from "path";
import { builtinModules } from "module";
import { fileURLToPath } from "url";

// Lấy rootDir = thư mục chứa package.json
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

// Đọc package.json ở root
const packageJson = JSON.parse(
  fs.readFileSync(path.join(rootDir, "package.json"), "utf-8")
);

const deps = new Set([
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.devDependencies || {}),
]);

const nodeBuiltins = new Set(builtinModules);

// Regex bắt import
const importRegex = /import\s+(?:[\w*\s{},]+from\s*)?["']([^"']+)["']/g;

const files = await globby(
  [
    "app/**/*.{js,jsx,ts,tsx}",
    "components/**/*.{js,jsx,ts,tsx}",
    // "src/**/*.{js,jsx,ts,tsx}",
  ],
  { cwd: rootDir } // chạy từ root
);

const importedCounts = new Map();

//! Chỉ lấy tên phần (PACKAGE-LEVEL)
for (const file of files) {
  const content = fs.readFileSync(path.join(rootDir, file), "utf-8");
  let match;
  while ((match = importRegex.exec(content))) {
    let pkg = match[1];

    // Lấy tên gốc package
    if (pkg.startsWith("@")) {
      const parts = pkg.split("/");
      pkg = parts.length > 1 ? `${parts[0]}/${parts[1]}` : parts[0];
    } else {
      pkg = pkg.split("/")[0];
    }

    // Chỉ giữ package.json deps, bỏ built-in
    if (deps.has(pkg) && !nodeBuiltins.has(pkg)) {
      importedCounts.set(pkg, (importedCounts.get(pkg) || 0) + 1);
    }
  }
}

//! Lấy tên đầy đủ bao gồm cả (PACKAGE-LEVEL) và phần subpath
// for (const file of files) {
//   const content = fs.readFileSync(path.join(rootDir, file), "utf-8");
//   let match;
//   while ((match = importRegex.exec(content))) {
//     let pkgFull = match[1]; // giữ nguyên subpath
//     let pkgCheck;

//     if (pkgFull.startsWith("@")) {
//       const parts = pkgFull.split("/");
//       pkgCheck = parts.length > 1 ? `${parts[0]}/${parts[1]}` : parts[0];
//     } else {
//       pkgCheck = pkgFull.split("/")[0];
//     }

//     // Nếu gói nằm trong deps thì báo cáo subpath đầy đủ
//     if (deps.has(pkgCheck) && !nodeBuiltins.has(pkgCheck)) {
//       importedCounts.set(pkgFull, (importedCounts.get(pkgFull) || 0) + 1);
//     }
//   }
// }

// Xuất kết quả
console.log("📦 Packages imported across project (with usage count):");
[...importedCounts.entries()]
  .sort((a, b) => b[1] - a[1])
  .forEach(([pkg, count]) => {
    console.log(`${pkg.padEnd(25)} ${count} imports`);
  });
