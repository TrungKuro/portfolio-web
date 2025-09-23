# Service

| Service | Name         |
| ------- | ------------ |
| JSON    | JSON-Hosting |
| Image   | Image-Kit    |
| Hosting | Vercel       |

## ⚡️ `JSON` "Storage" Service

- 👉🏻 Sử dụng [JSON-Hosting](https://jsonhosting.com/)
  - ⁉️ Lý do:
    - Về bảo mật 🛡️:
      - Có `Secret keys để edit` → giúp chỉ bạn có thể chỉnh sửa `JSON` với _"secret key"_ (chỉ bạn có)
    - Về giới hạn tính năng ⚙️:
      - ✅ **Rate limit = 100 requests/giờ/IP**
        - Mỗi địa chỉ IP (client) chỉ được gửi tối đa 100 request mỗi giờ tới endpoint.
      - ✅ **Max 1 MB/JSON**
        - Kích thước tối đa cho mỗi JSON bạn tạo là 1 megabyte.
      - ✅ **No auth needed for GET (public read)**
        - Ai biết URL JSON cũng có thể fetch (đọc) được, không cần đăng nhập, token, hoặc xác thực gì cả.

### 💎 Ưu điểm của `JSONHosting`

| Ưu điểm                        | Giải thích / Lợi ích                                                                                                                                                                                                                                                                                                 |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Global CDN**                 | JSON được phân phát qua **mạng lưới CDN toàn cầu**, nghĩa là dữ liệu sẽ được **cache tại các edge server gần người dùng nhất**. <br>➡️ Người dùng ở bất kỳ đâu (Mỹ, Châu Âu, Châu Á) đều tải JSON nhanh hơn, giảm độ trễ. <br>➡️ Ngoài ra, họ cam kết **99.9% uptime**, tức dịch vụ ổn định, gần như luôn hoạt động. |
| **Fast access (edge caching)** | Khi một client đã request JSON, nội dung đó sẽ được **lưu tạm (cache) ở edge CDN**. Những client khác gần đó sẽ lấy từ cache, không cần gọi lại server gốc. <br>➡️ Kết quả: tăng tốc độ, giảm tải server chính, tiết kiệm băng thông.                                                                                |
| **Version Control**            | Khi bạn chỉnh sửa JSON, JSONHosting sẽ **lưu phiên bản cũ** và tạo phiên bản mới. <br>➡️ Bạn có thể **quay lại bản trước** nếu lỡ sửa sai. <br>➡️ Hữu ích cho việc **iterating** (cập nhật liên tục) nội dung website mà không sợ mất dữ liệu.                                                                       |
| **Secret keys để edit**        | Việc **chỉnh sửa JSON** yêu cầu secret key (chỉ bạn có), nên người khác **không thể sửa** dữ liệu. <br>➡️ Tuy nhiên, GET vẫn public, nên chỉ bảo mật phần edit chứ không bảo mật phần read.                                                                                                                          |

```
👉 Tóm lại: Điểm mạnh nhất của JSONHosting là CDN tốc độ cao và Version Control.
```

### 🔑 Chiến lược _"cache"_ dữ liệu `JSON`

- 👉🏻 `Client Fetch + Cache (browser)`

  ```
  +-----------------------+
  |   JSONHosting (API)   |
  |  Rate limit: 100/h/IP |
  +----------+------------+
            |
    (1st fetch, nếu cache trống)
            |
            v
  +------------------------+
  |  Browser (client app)  |
  |------------------------|
  | - Fetch JSON từ API    |
  | - Lưu vào localStorage |
  | - Lưu vào React state  |
  +------------------------+
            |
    (lần sau load page)
            |
            v
  +------------------------+
  |   Cache kiểm tra TTL   |
  |------------------------|
  | Nếu cache còn hạn dùng |
  | -> Lấy dữ liệu từ đây  |
  | Nếu hết hạn            |
  | -> Fetch lại từ API    |
  +------------------------+
  ```

- ⚡️ Luồng hoạt động chi tiết:
  - Lần đầu load
    - App gọi _"fetch"_ đến **JSONHosting** → nhận `JSON`.
    - Lưu dữ liệu vào `localStorage` + **React** `state`.
    - Render **UI** từ _"cache"_.

  - Những lần tiếp theo trong 1h
    - App kiểm tra _"cache"_ (`localStorage` hoặc `state`).
    - Nếu _"cache"_ còn hạn → dùng dữ liệu _"cache"_ (không gọi `API`).
    - Nếu _"cache"_ hết hạn (ví dụ >1h) → gọi `API` để _"refresh"_.

- ✅ Kết quả:
  - Mỗi **client** `(IP)` chỉ tốn _"1 request/h"_ thay vì hàng chục _"request"_ mỗi lần **user** reload trang.
  - Không vượt quá _"rate limit 100 requests/h/IP"_ của **JSONHosting**.

## ⚡️ `Image` "Storage" Service

- 👉🏻 Sử dụng [Image-Kit](https://imagekit.io/)
- ⁉️ Lý do:
  - Về bảo mật 🛡️:
    - Có `Domain-level restriction (còn gọi là Referrer-based access control)` → giúp chỉ cho phép load ảnh từ **domain** của bạn.
  - Về giới hạn tính năng ⚙️:
    - ✅ **Bandwidth = 20 GB bandwidth/Monthly limit**
      - Điều này sẽ đủ để phân phối khoảng 1 triệu hình ảnh mỗi tháng, hoặc khoảng 20.000 lượt xem trang mỗi tháng.
      - Việc phân phối nội dung sẽ dừng lại khi bạn đạt đến giới hạn này.
      - Giới hạn sẽ được đặt lại vào đầu mỗi tháng dương lịch.
    - ✅ **DAM storage = 3 GB DAM storage/Fixed limit**
      - Dung lượng cơ sở này đủ để lưu trữ trung bình 10.000 tệp.
      - Việc tải tệp mới sẽ dừng lại khi đạt đến giới hạn này.
    - ✅ **URL Endpoints = 2**
      - Mỗi endpoint là một “đường dẫn gốc” (base URL) để bạn phân phát ảnh/video.
      - Bạn có thể thêm 1 endpoint khác cho domain khác.
      - Dùng để quản lý nhiều nguồn ảnh/video (VD: một cho portfolio, một cho blog).
    - ✅ **Image upload size = 25 MB**
      - Kích thước tối đa của mỗi file ảnh/video bạn có thể upload lên ImageKit.
      - Tức là một file không được vượt quá 25 megabytes.
    - ✅ **Output multi-frame image resolution = 25 MP**
      - Đây là giới hạn độ phân giải khi xử lý/biến đổi ảnh nhiều khung (multi-frame) như GIF hoặc ảnh động.
      - Tổng số pixel cho mỗi frame không được vượt quá 25 Megapixels (ví dụ ảnh 5000×5000 px = 25M px).

### 📋 Bảng tính năng & hạn mức của gói _"Forever Free"_

> 🔗 [Pricing plans | ImageKit.io](https://imagekit.io/plans/)

| Tính năng / Thông số                                                              | Giá / Miễn phí    | Hạn mức / Chi tiết                                                                                                           |
| --------------------------------------------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Bandwidth (bandwidth giao hàng hàng tháng)**                                    | Miễn phí          | 20 GB / tháng — phù hợp để deliver \~1 triệu ảnh/tháng hoặc khoảng \~20.000 lượt xem trang / tháng.                          |
| **DAM storage (không gian lưu file media library)**                               | Miễn phí          | 3 GB lưu trữ — lưu được khoảng 10.000 file trung bình.                                                                       |
| **Video processing (“video units”)**                                              | Miễn phí          | 500 “video units” / tháng. Tương đương xử lý video SD hoặc HD mới (tính khi xử lý mới) — giới hạn đạt tới khi dùng vượt mức. |
| **“Extension units” (AI-powered features như background removal, tagging, etc.)** | Miễn phí          | 650 extension units / tháng. Dùng cho các tính năng AI của ImageKit.                                                         |
| **Số người dùng (user seats)**                                                    | Miễn phí          | Giới hạn 2 users (bao gồm admin) trong project.                                                                              |
| **Purge cache requests**                                                          | Miễn phí          | 500 requests/tháng — dùng khi muốn xoá cache ảnh / làm mới CDN nếu cập nhật ảnh/trực tiếp thay đổi content mà URL không đổi. |
| **Media optimization, transformations, streaming**                                | Có                | Tất cả các tính năng này được bao gồm nhưng với hạn mức của gói free.                                                        |
| **Cho phép upload file media (ảnh / media library)**                              | Có                | Lưu trữ ảnh / media lên DAM (digital asset management) trong giới hạn \~3GB.                                                 |
| **Hỗ trợ (support)**                                                              | Community support | Không hỗ trợ premium, không có SLA / hỗ trợ trả phí.                                                                         |

### 🔐 Bảng các _"Secure Media Access"_ của `ImageKit`

> 🔗 [Secure media access with ImageKit](https://imagekit.io/secure-media-access/)

| Tính năng                                                                         | Có / Không / Có hạn chế | Giải thích / chi tiết                                                                                                                                                                                               |
| --------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Signed URLs với expiry tùy chọn**                                               | Có                      | Bạn có thể tạo các link (URL) có chữ ký (signature) và đặt thời gian hết hạn. Sau thời gian đó link không còn hợp lệ. Unsigned URLs có thể bị vô hiệu hóa toàn tài khoản để ảnh gốc không được public ngoài ý muốn. |
| **Watermark khi download (on-demand watermark)**                                  | Có                      | Bạn có thể stamp watermark vào ảnh mỗi khi download nếu muốn.                                                                                                                                                       |
| **Đánh dấu file private & áp restrictions riêng cho nội dung private**            | Có                      | Thay vì áp rule bảo mật cho toàn tài khoản, bạn có thể chỉ áp cho những file private.                                                                                                                               |
| **Restrict unnamed transformations**                                              | Có                      | Bạn có thể whitelist chỉ những “preset” tên định sẵn (ví dụ thumb_320); tránh tình trạng ai đó dùng crop/resize/filter không phép.                                                                                  |
| **Web Application Firewall (WAF)** để chống hot-linking & traffic không mong muốn | Có                      | Có WAF ở edge để block requests dựa trên HTTP referrer, IP hoặc CIDR, User-Agent, địa lý (geo-location).                                                                                                            |
| **Unsigned URLs disable toàn account**                                            | Có                      | Có thể disable tất cả unsigned URLs để đảm bảo mọi ảnh gốc χρείn link public đều phải qua signed URL.                                                                                                               |
| **Tính năng dùng miễn phí có áp dụng các tính năng này không?**                   | Có (miễn phí)           | Trang cho biết “Use for Free, Forever” cho những tính năng Secure Media Access; nghĩa là các tính năng này có thể dùng cả trên gói Free.                                                                            |

## ⚡️ `Hosting` "Deploy" Service

- 👉🏻 Sử dụng [vercel](https://vercel.com/) ➡️ deploy _"Hosting tĩnh"_ `(Static Hosting)`
  - Web sẽ <u>không có _backend_ thực sự</u>, chỉ có `Static File Server`.
  - **Vercel** <u>không tạo _backend_ riêng</u> cho bạn (theo nghĩa có **server** xử lý logic).
  - Thực chất, **Vercel** build ra các `Static File` (như _"HTML, CSS, JS, image…"_) và _"host"_ trên `CDN`.
    - `Host (Hosting)` = nơi đặt và chạy website/app của bạn.
    - `CDN (Content Delivery Network)` = mạng lưới nhiều máy chủ phân tán toàn cầu.
  - Khi _"user"_ truy cập `Domain`, `CDN` trả thẳng file về cho browser.

  ```
  Tóm lại:

  - Vercel cho mình một Server để chứa các "file tĩnh" đã được build từ Project Web này.
  - Server này sẽ cho người khác truy cập qua Internet thông qua Domain.

  - Với những Server thuộc CDN, thì dữ liệu được "cache" và phân phát từ Server gần người dùng nhất
  - Điều này giúp giảm độ trễ, mang lại tốc độ tải nhanh hơn.
  - Cũng như giảm tải cho Server gốc, vì "file" đã "cache".
  ```

- ⁉️ Lý do:
  - 🚀 Kiến trúc web (hiện đang dùng):
    ```
    Web Application Architecture: SPA (Single Page Application)
    Web Rendering Pattern:        SSG (Static Site Generation)
    |
    Data:                         JSON (JsonHosting)
    Media:                        Image (ImageKit)
    ```
  - Vai trò:
    - `Hosting`: dịch vụ _"Vercel"_
      - Trang web sẽ build ra _"HTML tĩnh"_ (do `SSG`).
      - Khi deploy, chỉ còn _"HTML, CSS, JS, asset (file tĩnh)"_.
      - User vào thì <u>trình duyệt load file tĩnh</u> và gọi `API` đến _"JsonHosting"_ và _"ImageKit"_ để lấy dữ liệu & ảnh.
    - `Backend-as-a-Service`: các dịch vụ _"JsonHosting"_ và _"ImageKit"_, còn gọi là ➡️ **Outsource Backend**.
      - Vì trang web không có _"logic backend"_ riêng.
      - Mọi _"dữ liệu dynamic"_ đều do <u>dịch vụ ngoài</u> cung cấp `API`.
      - Nên <u>không cần</u> deploy _"Backend Serverless"_ `(Hosting + Function)`.

  ```
  👉 Với Portfolio (public JSON + public Images) ➡️ chỉ cần "Restrict API Key" 🛡️ theo Domain là đủ.
  ```

### 📊 So sánh Hosting Static vs Hosting Dynamic

| Tiêu chí                      | **Hosting Static**                                              | **Hosting Dynamic (Serverless backend)**                                                       |
| ----------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Bản chất**                  | Chỉ lưu & phân phát **file tĩnh**: HTML, CSS, JS, assets.       | Có **server backend** (serverless function hoặc app server) xử lý logic, API.                  |
| **Ví dụ dịch vụ**             | Vercel (Static Export), Netlify, GitHub Pages, Cloudflare Pages | Vercel (Serverless Functions), Netlify Functions, AWS Lambda, Firebase Functions               |
| **Quy trình build**           | Build → sinh file HTML/JS → upload lên CDN                      | Build → deploy code backend (Node.js, Python, Go...) → serverless function chạy khi có request |
| **Cách xử lý request**        | Request → trả file từ **CDN gần nhất**                          | Request → kích hoạt function/backend code → trả kết quả                                        |
| **Khả năng truy cập dữ liệu** | Không tự xử lý API, chỉ gọi API bên ngoài từ client             | Có thể truy vấn DB, proxy API, xử lý dữ liệu trước khi trả về client                           |
| **Hiệu năng**                 | Cực nhanh 🚀 (chỉ load file từ CDN)                             | Chậm hơn chút (phải chạy function, cold start có thể xảy ra)                                   |
| **Chi phí**                   | Rẻ hoặc free (do chỉ dùng storage + CDN)                        | Tốn hơn (do phải chạy compute khi có request)                                                  |
| **Tính bảo mật**              | API key/service key **phải lộ trên client** (nếu gọi trực tiếp) | Có thể giấu API key trong serverless function → an toàn hơn                                    |
| **Use case điển hình**        | Portfolio, blog, landing page, docs site                        | App cần auth, API bảo mật, xử lý dữ liệu động (e-commerce, SaaS)                               |

### 🟢 `Static Hosting` (chỉ _"file tĩnh"_)

```
Client (Browser)
       │
       ▼
   Request URL
       │
       ▼
   CDN (cache server gần nhất)
       │
       ▼
   Trả về file tĩnh (HTML, CSS, JS, Image)
```

- Toàn bộ `HTML, CSS, JS` đã <u>build sẵn</u> và nằm trên `CDN`.
- Nếu trong `JS` có <u>gọi `API` ngoài</u>, **Client** sẽ <u>gọi trực tiếp</u> `API` đó.
- **API key/public endpoint** sẽ lộ ra ở **Client**.

### 🔵 Dynamic Hosting (Serverless backend / Proxy backend)

```
Client (Browser)
       │
       ▼
   Request URL
       │
       ▼
   CDN / Hosting Provider
       │
       ▼
   Serverless Function (backend proxy)
       │
       ▼
   Gọi đến API thật (Supabase, ImageKit, ... )
       │
       ▼
   Nhận dữ liệu JSON / Image
       │
       ▼
   Trả kết quả về Client
```

- `HTML/JS` vẫn có thể _"cache"_ qua `CDN`.
- Nhưng _"API request"_ đi qua `Backend (Serverless Function)` trước khi đến dịch vụ ngoài.
- **API key** được giữ an toàn trong **Backend**, **Client** không thấy.
- Hơi <u>tốn tài nguyên</u> hơn, có thể <u>có độ trễ</u> thêm chút so với _"static"_.

### 🧩 Luồng xử lý Web

```
Client truy cập URL
   ↓
Hosting trả HTML tĩnh (SSG)
   ↓
React hydrate (attach JS)
   ↓
Suspense fallback hiển thị
   ↓
Component con fetch JSON (JsonHosting) & Image (ImageKit)
   ↓
Suspense resolve → render dữ liệu thật
   ↓
SPA hoàn tất
```

- 👉 Điểm mấu chốt:
  - `SSG` giúp bạn <u>có HTML/khung sẵn</u> (`SEO` tốt, `FCP` nhanh).
  - `<Suspense>` giúp <u>xử lý loading dữ liệu async</u> đẹp đẽ hơn.
  - `[JsonHosting]` + `[ImageKit]` chính là **backend** của bạn (nhưng là _“backend thuê ngoài”_).

- 🌐 Quy trình khi **client** truy cập web `(SPA + SSG, dùng Component Server + <Suspense>)`:
  - 1️⃣ **Client** gửi _"request"_ đến **Hosting**.
    - **Hosting** trả về `HTML` đã build sẵn (do `SSG`).
    - `HTML` này thường chứa: `<head>`, `<body>`, và phần _“khung”_ của **UI**.
    - Các **component** con được bọc trong `<Suspense>` nếu chưa load xong thì ban đầu chỉ _"render fallback"_.

  - 2️⃣ Trình duyệt bắt đầu tải `JS bundle` **(hydration)**.
    - Sau khi `JS` load xong, **React/NextJS hydrate**: gắn _"event"_ và _"logic"_ vào `HTML` đã _"render"_.
    - Lúc này `<Suspense>` mới hoạt động:
      - Nếu **component** con cần _"fetch dữ liệu"_, nó sẽ _"pause rendering"_ cho đến khi dữ liệu xong.
      - Trong thời gian đó, _"fallback"_ hiển thị **UI** tạm.

  - 3️⃣ Fetch dữ liệu từ `API` ngoài.
    - Các **component** con gọi `fetch()` đến `API` ngoài.
    - Đây là **client** → **service** bên ngoài, không đi qua **backend** của bạn.

  - 4️⃣ `<Suspense>` resolve → **component** _"render"_ thật
    - Khi dữ liệu trả về → **component** con _"render"_ với dữ liệu thật.
    - Tất cả được **React** update dần vào `DOM`.

  - 5️⃣ Toàn bộ **UI** hoàn tất
    - Người dùng thấy một `SPA` (dù gốc ban đầu là `SSG`).
    - Nếu bạn chuyển tab → quay lại → `JS` đã _"cache"_ nên load nhanh hơn.
