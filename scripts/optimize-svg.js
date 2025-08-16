// optimize-svg.js (SVGO v3)
import { optimize } from "svgo";
import fs from "fs";
import path from "path";
import svgoConfig from "../svgo.config.mjs";

const dirPath = process.argv[2];

if (!dirPath) {
  console.error("❌ Vui lòng cung cấp đường dẫn thư mục chứa SVG");
  console.log("Ví dụ: node scripts/optimize-svg.js ./public/images/misc");
  process.exit(1);
}

fs.readdirSync(dirPath).forEach((file) => {
  if (path.extname(file).toLowerCase() === ".svg") {
    const filePath = path.join(dirPath, file);
    const svgData = fs.readFileSync(filePath, "utf-8");
    const result = optimize(svgData, { path: filePath, ...svgoConfig });
    const fileNameWithoutExt = path.basename(file, ".svg");
    const outputFilePath = path.join(dirPath, `${fileNameWithoutExt}.min.svg`);
    fs.writeFileSync(outputFilePath, result.data);
    console.log(`✅ Nén thành công: ${file} → ${fileNameWithoutExt}.min.svg`);
  }
});

/* ------------------------------------------------------------------------- */
/*                                    ...                                    */
/* ------------------------------------------------------------------------- */

/***
 * Trỏ Terminal tới thư mục gốc project (root)
 * Nhập lệnh: ➡️ node scripts/optimize-svg.js public/images
 * - [ public/images ] là thư mục chứa file (.svg)
 *
 * Đoạn "script" này sẽ nén tất cả file SVG (input) có trong thư mục bạn cung cấp
 * File SVG (output) đã nén sẽ có thêm tên "hậu tố" là (.min)
 * File cấu hình cách nén SVG được lưu trong file (.svgo.config.mjs)
 ***/
