/* eslint-disable import/no-anonymous-default-export */

// svgo.config.mjs (SVGO v3)
export default {
  multipass: true, // Chạy nhiều lần để tối ưu tối đa
  js2svg: {
    pretty: false, // Không format code để giảm kích thước
    indent: 0,
    eol: "lf", // Dùng line feed để tối ưu
  },
  plugins: [
    // Loại bỏ thuộc tính không cần thiết
    { name: "removeDoctype", active: true },
    { name: "removeXMLProcInst", active: true },
    { name: "removeComments", active: true },
    { name: "removeMetadata", active: true },
    { name: "removeXMLNS", active: false }, // Giữ xmlns cho trình duyệt
    // Tối ưu thuộc tính và phần tử
    { name: "removeDesc", active: true },
    { name: "removeUselessDefs", active: true },
    { name: "removeEditorsNSData", active: true },
    { name: "removeEmptyAttrs", active: true },
    { name: "removeHiddenElems", active: true },
    { name: "removeEmptyText", active: true },
    { name: "removeEmptyContainers", active: true },
    // Tối ưu màu và path
    {
      name: "convertColors",
      params: {
        currentColor: true,
        names2hex: true,
        rgb2hex: true,
        shorthex: true,
      },
    },
    {
      name: "convertPathData",
      params: {
        applyTransforms: true,
        floatPrecision: 2, // Giảm độ chính xác để tiết kiệm byte
      },
    },
    {
      name: "convertTransform",
      params: {
        floatPrecision: 2,
      },
    },
    // Tối ưu cấu trúc
    { name: "removeUnknownsAndDefaults", active: true },
    { name: "removeNonInheritableGroupAttrs", active: true },
    { name: "removeUselessStrokeAndFill", active: true },
    { name: "removeUnusedNS", active: true },
    { name: "collapseGroups", active: true },
    {
      name: "mergePaths",
      params: {
        force: true,
        floatPrecision: 2,
      },
    },
    { name: "sortAttrs", active: true },
    // Giữ thuộc tính quan trọng để tránh lỗi hiển thị
    { name: "removeViewBox", active: false }, // Giữ viewBox để hiển thị đúng
    { name: "removeDimensions", active: true }, // Xóa width/height nếu có viewBox
    {
      name: "addAttributesToSVGElement",
      params: {
        attributes: [{ "aria-hidden": "true" }], // Thêm cho accessibility nếu cần
      },
    },
  ],
};

/* ------------------------------------------------------------------------- */
/*                                    ...                                    */
/* ------------------------------------------------------------------------- */

/***
 * Định dạng ".mjs":
 * - Sử dụng ES Module (export default) thay vì CommonJS (module.exports) để tương thích với các project hiện đại và SVGO v3.
 *
 * Tối ưu mạnh mẽ:
 * - Loại bỏ metadata, comment, DOCTYPE, thuộc tính dư thừa để giảm kích thước (ví dụ: SVG 200KB có thể xuống 10-20KB).
 * - Tối ưu path và transform với (floatPrecision: 2) để cân bằng chất lượng và kích thước.
 * - Gộp path và nhóm để tối ưu cấu trúc.
 *
 * Tránh lỗi hiển thị:
 * - Giữ [viewBox] (removeViewBox: false) và [xmlns] (removeXMLNS: false) để SVG hiển thị đúng trong <img> hoặc <Image>.
 * - Thêm [aria-hidden] cho accessibility nếu SVG là hình trang trí.
 *
 * Hiệu suất:
 * - (multipass: true) chạy nhiều lần để nén tối đa, giảm tổng byte weight.
 ***/
