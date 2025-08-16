# SEO

👉🏻 `SEO (Search Engine Optimization)` là tối ưu hóa website để công cụ tìm kiếm (như Google) hiểu nội dung và xếp hạng cao hơn → giúp người dùng dễ tìm thấy khi họ tìm kiếm từ khóa liên quan.

- 📌 Mục tiêu chính của SEO:

  - Tăng khả năng hiển thị trên kết quả tìm kiếm.
  - Tăng lưu lượng truy cập tự nhiên (organic traffic).
  - Cải thiện trải nghiệm người dùng (tốc độ, nội dung, cấu trúc site).

- 📌 Các yếu tố quan trọng:

  - On-page SEO: Tối ưu nội dung, tiêu đề, meta description, heading, hình ảnh (alt), URL.
  - Technical SEO: Tốc độ tải, cấu trúc HTML, mobile-friendly, sitemap, robots.txt.
  - Off-page SEO: Backlinks, chia sẻ mạng xã hội, thương hiệu.

- 📌 Kết quả:

  - SEO tốt → xếp hạng cao → nhiều click hơn → nhiều khách hàng/độc giả hơn mà không cần trả tiền quảng cáo.

## Meta Description

- Thẻ _"meta description"_ trong phần `<head>` của trang web.
- Cung cấp mô tả ngắn gọn về nội dung trang, thường hiển thị dưới tiêu đề khi trang xuất hiện trên kết quả tìm kiếm (Google, Bing…).
- Nếu thiếu, Google sẽ tự lấy một đoạn văn từ trang để hiển thị, nhưng thường không tối ưu cho `SEO` hoặc _"tỷ lệ click"_ `(CTR)`.

👉🏻 **Best practice cho meta description:**

- Độ dài: 50–160 ký tự (Google có thể cắt nếu quá dài).
- Mỗi trang nên có mô tả duy nhất, liên quan trực tiếp đến nội dung trang đó.
- Chứa từ khóa chính nhưng vẫn tự nhiên, không nhồi từ khóa.
- Viết như một lời mời click (call-to-action nhẹ).

## Open Graph

👉🏻 `Open Graph (Open Graph Protocol)` là tiêu chuẩn siêu dữ liệu do `Facebook` phát triển, giúp website định nghĩa rõ cách nội dung hiển thị khi chia sẻ lên mạng xã hội **(Facebook, LinkedIn, Zalo…)**.

- 📌 Mục đích:

  - Khi bạn chia sẻ link, mạng xã hội sẽ đọc thẻ OG (og:title, og:description, og:image, …) để hiển thị ảnh, tiêu đề, mô tả đẹp và chính xác, thay vì lấy ngẫu nhiên từ trang.

- 📌 Kết quả:

  - Link chia sẻ đẹp hơn, đồng bộ hình + text.
  - Tăng tỷ lệ click (CTR) khi chia sẻ trên mạng xã hội.

## Twitter Card

👉🏻 `Twitter Card` là tiêu chuẩn siêu dữ liệu của `Twitter` (tương tự `Open Graph`) giúp website xác định cách hiển thị khi link được chia sẻ lên **Twitter/X**.

- 📌 Mục đích:

  - Hiển thị ảnh, tiêu đề, mô tả đẹp và đồng bộ khi share link.
  - Giúp bài tweet thu hút hơn và tăng lượt click.

- 📌 Kết quả:

  - Link chia sẻ trên Twitter/X trông đẹp, rõ ràng, nhiều thông tin.
  - Tăng tỷ lệ click (CTR) khi tweet có link website.

## Canonical URL

👉🏻 `Canonical URL` là đường dẫn chuẩn mà bạn muốn công cụ tìm kiếm **(Google, Bing, …)** coi là <u>phiên bản chính thức của một trang</u>, nhằm <u>tránh trùng lặp nội dung</u> khi <u>có nhiều URL dẫn tới cùng nội dung</u>.

- 📌 Mục đích:

  - Tránh Google đánh giá duplicate content.
  - Tập trung toàn bộ sức mạnh SEO vào một URL duy nhất.

- 📌 Ví dụ:

  - Giả sử trang của bạn có thể truy cập bằng cả:
    - https://example.com
    - https://www.example.com
    - https://example.com/index.html
  - Bạn muốn Google chỉ index https://example.com, thì thêm:

  ```html
  <link rel="canonical" href="https://example.com" />
  ```

- 📌 Kết quả:

  - **Google** chỉ xếp hạng **URL canonical**.
  - Không chia nhỏ thứ hạng giữa nhiều bản sao nội dung.

## Structured Data (JSON-LD)

- Định dạng dữ liệu có cấu trúc theo chuẩn `Schema.org`, viết bằng `JSON-LD (JavaScript Object Notation for Linked Data)`.

  - Mục đích: Giúp <u>công cụ tìm kiếm</u> (Google, Bing, …) hiểu rõ nội dung trang (loại trang, tác giả, sản phẩm, bài viết, sự kiện…).
  - Lợi ích: Có thể hiển thị `Rich Snippets` trên kết quả tìm kiếm (VD: sao đánh giá, giá sản phẩm, breadcrumb, logo…).

- Verification Codes [ Google ] vs [ Bing ]
  - <u>Mã xác minh</u> (HTML meta tag hoặc file) để <u>chứng minh quyền sở hữu website</u> với `Google Search Console` hoặc `Bing Webmaster Tools`.
  - Mục đích:
    - Cho phép bạn xem dữ liệu tìm kiếm, xếp hạng.
    - Gửi sitemap, theo dõi SEO, khắc phục lỗi index.

## [ sitemap.xml ] và [ robots.txt ]

👉🏻 `sitemap.xml`

- Là gì: File XML liệt kê tất cả URL quan trọng của website.
- Mục đích: Giúp công cụ tìm kiếm thu thập dữ liệu nhanh và đầy đủ hơn.
- Lợi ích: Tăng khả năng index, kiểm soát trang nào được ưu tiên.

👉🏻 `robots.txt`

- Là gì: File văn bản hướng dẫn công cụ tìm kiếm biết trang nào được phép hoặc không được phép thu thập.
- Mục đích: Kiểm soát quyền truy cập bot vào các phần của website.

📌 Tóm tắt:

- `sitemap.xml` → Danh sách URL muốn Google/Bing index.
- `robots.txt` → Quy định bot được / không được vào đâu.
