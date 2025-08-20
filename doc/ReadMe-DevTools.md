# Dev Tools

👉🏻 Sử dụng công cụ như `Lighthouse` hoặc `WebPageTest` để kiểm tra hiệu suất trang và trải nghiệm người dùng.

- 📌 `Audits` là gì?

  - Nghĩa gốc là kiểm tra, đánh giá, rà soát
  - Thường chỉ quá trình phân tích website

  ```
  Audit = một bản “kiểm toán” nhưng áp dụng cho mã nguồn, hiệu suất, bảo mật, SEO, accessibility…

  Kết quả audit thường là báo cáo kèm đề xuất cải thiện.
  ```

- 📌 `Metrics` là gì?

  - Nghĩa là các chỉ số đo lường — trong lập trình và đặc biệt là web performance
  - Nó là những con số định lượng dùng để đánh giá tình trạng hoặc hiệu suất của một hệ thống

  ```
  Metric = đơn vị đo lường kết quả, giúp bạn biết "tốt" hay "xấu" dựa trên dữ liệu thực tế, thay vì cảm tính.

  Trong web/app, metrics thường được thu thập tự động (tracking, logging, analytics).
  ```

- 📌 `Waterfall` là gì?

  - Biểu đồ thác nước -> biểu đồ thời gian load
  - Trong bối cảnh _"web performance"_ là một <u>biểu đồ thời gian tải tài nguyên</u> cho thấy:
    - Mỗi request (HTML, CSS, JS, ảnh, font, video, API call…) bắt đầu và kết thúc khi nào.
    - Trình tự tải các tài nguyên (cái nào tải song song, cái nào chờ).
    - Mất bao lâu ở từng giai đoạn:
      - DNS Lookup
      - TCP/TLS handshake
      - Request/Response (TTFB – Time To First Byte)
      - Download
      - Blocking / Queuing
      - Rendering

  ```
  Tài nguyên              0ms   200ms   400ms   600ms   800ms  ...
  index.html              ███████████████
  style.css                   █████████
  main.js                          ██████████████████████
  image.jpg                                 ███████████████
  font.woff2                                          ████
  ```

  - Mỗi dòng là 1 request và chiều dài thanh màu thể hiện thời gian tải.
    - Thanh dài → tài nguyên đó tải lâu → có thể cần tối ưu.
    - Thanh bị chồng hoặc xếp nối tiếp → cho thấy tài nguyên này phụ thuộc vào cái khác

- 🎯 Lợi ích khi xem Waterfall:

  - Xác định _"nút cổ chai"_ `(bottleneck)` trong quá trình tải.
  - Phát hiện tài nguyên tải quá chậm hoặc tải sớm không cần thiết.
  - Biết được thứ tự ưu tiên của trình duyệt khi tải file.
  - Phân tích tại sao `LCP`, `TTI`, `TBT` lại cao.

## Google Lighthouse

👉🏻 [What Is Google Lighthouse and How to Use It?](https://www.youtube.com/watch?v=VyaHwvPWuZU)

- [Extension Lighthouse](https://chromewebstore.google.com/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)
- Ví dụ: chạy báo cáo trên trang web chạy cục bộ tại URL _"http://localhost:3000/"_ bằng extension `Lighthouse` trên trình duyệt `Brave` của hệ điều hành `MacOS`.
  - Với kết quả của bản ghi `JSON` _"20250814T021541"_
  - Tức bản báo cáo của ngày **14-08-2025** vào lúc **2am15:41**

👉🏻 Tổng quát các danh mục `Audits`:

- `HIỆU SUẤT (Performance)`: **(41 điểm ❌)**
  - 📌 Đo hiệu suất tải trang
    - Phản ánh: Trang web tải nhanh hay chậm, nội dung hiển thị mượt hay bị trễ.
    - Dựa trên: Các chỉ số như `FCP` **(10 điểm ✅)**, `LCP` **(1 điểm ❌)**, `TBT` **(0 điểm ❌)**, `CLS` **(25 điểm ✅)** `SI` **(5 điểm ⚠️)**, …
    - Mục tiêu: Cải thiện trải nghiệm người dùng về tốc độ và độ mượt.
    - Ảnh hưởng: Trực tiếp đến tỷ lệ thoát, mức độ hài lòng và `SEO`.
- `KHẢ NĂNG TIẾP CẬN (Accessibility)`: **(99 điểm ✅)**
  - 📌 Kiểm tra truy cập cho người khuyết tật
    - Phản ánh: Người dùng, kể cả người khuyết tật (thị giác, thính giác…), có thể truy cập và sử dụng trang hay không.
    - Dựa trên: Các tiêu chuẩn như `WCAG (Web Content Accessibility Guidelines)`.
    - Ví dụ kiểm tra:
      - Có text thay thế (alt) cho ảnh
      - Tương phản màu sắc đủ cao
      - Thứ tự tab hợp lý
      - Hỗ trợ screen reader
    - Mục tiêu: Trang dễ sử dụng cho mọi người, kể cả trên thiết bị trợ năng.
- `THỰC HÀNH TỐT NHẤT (Best Practices)`: **(96 điểm ✅)**
  - 📌 Kiểm tra thân thiện di động
    - Phản ánh: Trang tuân thủ các quy tắc an toàn, kỹ thuật tối ưu và coding hiện đại hay không.
    - Dựa trên:
      - Sử dụng HTTPS
      - Không dùng API hoặc JS lỗi thời
      - Không load tài nguyên không an toàn
      - Kích thước ảnh, font hợp lý
    - Mục tiêu: Đảm bảo trang hoạt động ổn định, an toàn, hiệu quả.
- `TỐI ƯU CÔNG CỤ TÌM KIẾM (SEO)`: **(91 điểm ✅)**
  - 📌 Phân tích SEO cơ bản
    - Phản ánh: Trang có thân thiện với công cụ tìm kiếm (Google, Bing…) hay không.
    - Dựa trên:
      - Cấu trúc HTML hợp lệ
      - Thẻ `<title>` và `<meta description>` đầy đủ
      - Heading cấu trúc hợp lý
      - Mobile-friendly
    - Mục tiêu: Giúp trang dễ được tìm thấy và xếp hạng cao trên kết quả tìm kiếm.

💡 Nói gọn:

```
1️⃣ [ Performance    ] → Nhanh và mượt.
2️⃣ [ Accessibility  ] → Ai cũng dùng được.
3️⃣ [ Best Practices ] → An toàn và đúng chuẩn.
4️⃣ [ SEO            ] → Dễ tìm thấy trên Google.
```

👉🏻 Sử dụng AI đế lấy kết quả phân tích từ file _"localhost_3000-20250814T021541.json"_:

- ⏱️ `Timing`: Tổng thời gian thực hiện báo cáo là **8465 ms**.
- 💯 `Score`: Từ 0-1 (1 là tốt nhất; dưới 0.9 thường cần cải thiện).
- Scores tổng quát:

  - Performance: **0.54** (thấp, cần cải thiện lớn về tốc độ và hiệu suất).
  - Accessibility: **0.92** (tốt, nhưng vẫn có một số vấn đề nhỏ).
  - Best Practices: **0.85** (tốt, nhưng có vấn đề về cache và JavaScript).
  - SEO: **0.98** (rất tốt, gần như hoàn hảo).

- `Metrics` (chỉ số quan trọng)

  - `FCP (First Contentful Paint)` : **1.035s** ✅ Tốt
    - 📌 Thời gian từ lúc tải trang đến khi nội dung đầu tiên (text, ảnh, SVG…) xuất hiện trên màn hình
    - 🏆 Mục tiêu tốt (**≤ 1.8 giây**)
    - 💎 Phản ánh cảm giác trang đã bắt đầu hiển thị gì đó
  - `LCP (Largest Contentful Paint)` : **4.085s** ⚠️ Cần cải thiện
    - 📌 Thời gian từ lúc tải trang đến khi phần tử nội dung lớn nhất trong viewport render xong (thường là ảnh hero hoặc khối text lớn)
    - 🏆 Mục tiêu tốt (**≤ 2.5 giây**)
    - 💎 Phản ánh cảm giác nội dung chính đã xuất hiện
  - `SI (Speed Index)`: **2.199s** ✅ Khá ổn
    - 📌 Đo thời gian nội dung nhìn thấy được của trang xuất hiện nhanh như thế nào. Giá trị càng thấp nghĩa là người dùng thấy trang hiển thị gần đầy đủ càng sớm
    - 🏆 Mục tiêu tốt (**≤ 3.4 giây**)
    - 💎 Phản ánh trải nghiệm thị giác (nội dung hiển thị nhanh hay chậm)

  ```
  FCP / LCP / SI → liên quan đến "thị giác" (thấy gì và khi nào)
    ├── FCP: đo thời điểm đầu tiên bạn thấy được một phần nội dung.
    ├── LCP: đo thời điểm nội dung lớn nhất hiển thị xong.
    └── SI: đo tốc độ tổng thể mà toàn bộ vùng nhìn thấy (viewport) được lấp đầy nội dung theo thời gian.
  ```

  - `TTI (Time to Interactive)` : _10.227s_ ❌ Rất chậm → JS nặng hoặc block
    - 📌 Thời gian từ lúc tải trang đến khi trang hoàn toàn sẵn sàng tương tác (không còn tác vụ JS dài gây block)
    - 🏆 Mục tiêu tốt (**≤ 3.8 giây**)
    - 💎 Phản ánh cảm giác trang đã sẵn sàng để thao tác mà không bị delay
  - `FID (First Input Delay)` : ?
    - 📌 Độ trễ giữa tương tác đầu tiên của người dùng (click, tap, keypress) và khi browser thực sự xử lý sự kiện đó
    - 🏆 Mục tiêu tốt (**≤ 100 mili giây**)
    - 💎 Phản ánh cảm giác trang phản hồi nhanh khi bấm lần đầu
  - `TBT (Total Blocking Time)` : **7.777s** ❌ Quá cao, ảnh hưởng tương tác
    - 📌 Tổng thời gian mà _"main thread"_ bị chặn bởi các tác vụ JavaScript dài (mỗi tác vụ **>50ms**), làm người dùng không thể tương tác
    - 🏆 Mục tiêu tốt (**≤ 200 mili giây**)
    - 💎 Phản ánh trải nghiệm tương tác (bấm, cuộn, nhập liệu có bị delay hay không)

  ```
  TTI / FID / TBT → liên quan đến "tương tác" (có phản hồi nhanh hay không)
  ├── TTI: đo thời điểm trang đã sẵn sàng để người dùng thao tác mà không bị delay.
  ├── FID: đo độ trễ giữa tương tác đầu tiên của người dùng (click, tap, nhập) và khi trình duyệt bắt đầu phản hồi.
  └── TBT: đo tổng thời gian main thread bị chặn bởi tác vụ dài (>50ms), khiến trang không phản hồi kịp với thao tác người dùng.
  ```

  - `CLS (Cumulative Layout Shift)` : 0.00086 ✅ Rất tốt
    - 📌 Đo mức độ dịch chuyển layout không mong muốn trong quá trình tải trang (ảnh chưa có kích thước, font thay đổi…)
    - 🏆 Mục tiêu tốt (**≤ 0.1**)
    - 💎 Phản ánh cảm giác trang có ổn định hay bị xô lệch khi đang xem

  ```
  CLS → liên quan đến sự "ổn định" (layout có bị nhảy hay không)
  └── CLS: đo mức độ dịch chuyển bố cục không mong muốn trong quá trình tải trang (ví dụ: ảnh, quảng cáo, hoặc nội dung mới xuất hiện làm các phần tử khác bị đẩy xuống/xô lệch).
  ```

- 💡 Mẹo tối ưu nhanh theo nhóm:

  ```
  ├── FCP / LCP / SI  → tối ưu ảnh, giảm render-blocking CSS/JS, preload font/ảnh chính
  ├── TTI / TBT / FID → giảm JS, lazy load script, chia nhỏ bundle, tối ưu logic event handler
  └── CLS             → đặt kích thước cố định cho ảnh/video, tránh chèn nội dung bất ngờ
  ```

- ⛑️ Chuẩn đoán (`Diagnostics`):

  - Số request: 27 (ổn).
  - Tổng dung lượng tải: ~ 11.16 MB 🚨 Rất lớn → cần tối ưu ảnh/video.
  - Font: 2 fonts.
  - Script: 6 scripts.
  - CSS: 1 file.
  - Nhiều tác vụ JS dài: 4 tác vụ >500ms → gây lag.

- 🔑 <u>Giải pháp tối ưu</u>:
  - 🔹 Ưu tiên cao 1️⃣:
    - Giảm `LCP` từ 4.0s xuống < 2.5s
      - Dùng `priority` cho `<Image>` hero.
      - Dùng `WebP/AVIF` cho ảnh lớn.
      - Tối ưu kích thước ảnh khớp `viewport`.
    - Giảm `TTI` & `TBT`
      - Chia nhỏ `bundle JS`, `lazy load component` không cần ngay.
      - Loại bỏ JS thừa (đặc biệt thư viện nặng).
      - Sử dụng React.lazy() và dynamic import trong Next.js.
    - Giảm dung lượng trang (~11MB)
      - Nén ảnh (sử dụng `next/image` hoặc `sharp`).
      - Tránh ảnh/video full-HD nếu không cần.
      - Dùng `video streaming` nếu cần hiển thị animation dài.
  - 🔹 Ưu tiên trung bình 2️⃣:
    - `Preconnect` đến `domain img/font/script` ngoài.
    - `HTTP/2` nếu server chưa bật.
    - `Lazy-load` cho ảnh ngoài `viewport` `(loading="lazy")`.
  - 🔹 Ưu tiên thấp 3️⃣:
    - `Minify CSS/JS` (Next.js build production tự làm).
    - Remove `legacy polyfill` nếu chỉ nhắm tới browser hiện đại.

## File Môi Trường [ .env* ]

👉🏻 **Next.js** sử dụng thư viện `dotenv` để tải các biến môi trường từ các file `.env*`

- Các file môi trường được ưu tiên theo thứ tự sau (từ cao đến thấp):

  - 1️⃣ `.env.local`:
    - File này được sử dụng cho <u>môi trường cục bộ</u> (local development)
    - Có <u>ưu tiên cao nhất</u> trong mọi trường hợp
  - 2️⃣ `.env.development`:
    - Được sử dụng khi chạy `next dev` (hoặc `npm run dev`), nhưng chỉ nếu không có `.env.local`
    - Nếu bạn có `.env.local`, các biến trong file này sẽ <u>ghi đè</u> các biến cùng tên trong `.env.development` hoặc `.env`
  - 2️⃣ `.env.production`:
    - Được sử dụng khi chạy `next build` hoặc `next start` (hoặc `npm run build` và `npm run start`), nhưng chỉ nếu không có `.env.local`
    - Nếu bạn có `.env.local`, các biến trong file này sẽ <u>ghi đè</u> các biến cùng tên trong `.env.production` hoặc `.env`
  - 3️⃣ `.env`:
    - File <u>mặc định</u>, được tải trong mọi trường hợp (`dev`, `build`, `start`)
    - Nhưng có <u>ưu tiên thấp nhất</u> và sẽ <u>bị ghi đè</u> bởi các file khác nếu có cùng `[key]`.

  ```
  [ npm run dev   ] .env.local ➡️ .env.development ➡️ .env

  [ npm run build ] .env.local ➡️ .env.production  ➡️ .env
  ```

👉🏻 Môi trường được xác định bởi `NODE_ENV`:

- `npm run dev` đặt `NODE_ENV=development`.
- `npm run build` và `npm run start` đặt `NODE_ENV=production`.

👉🏻 **Client Variables** vs **Server Variables**:

- Trong **Next.js**, các <u>biến môi trường</u> bắt đầu bằng `NEXT_PUBLIC_` được _"expose"_ cho **client-side (browser)** còn các biến khác chỉ dùng ở **server-side**
- ⚠️ Đảm bảo bạn đặt các <u>biến nhạy cảm</u> (như API keys) không có _"prefix"_ `NEXT_PUBLIC_`

## Các kỹ thuật cải thiện "Performance"

👉🏻 **Lighthouse `Treemap` View**:

- Công cụ giúp bạn thấy "kích thước" và "thành phần" `Bundle JS` khi build Next.js.

  - **Tổng dung lượng**: `http://localhost:3000/ ? MiB` → là tổng dung lượng JS đang tải cho trang này (thường nên giữ dưới `1 MB` nếu có thể).
  - **Treemap**: mỗi ô là một `Bundle JS` hoặc `Chunk JS` → diện tích ô = dung lượng file tương ứng.
  - **Name + Transfer bytes**: liệt kê chi tiết từng file bundle gồm "đường dẫn và kích thước".

- `Treemap` này giúp bạn thấy chỗ nào cần `code splitting`, `dynamic import`, `SSR/SSG` để <u>giảm JS cần load ban đầu</u>.

### Cải thiện `LCP`

?

### Cải thiện `TBT`

?
