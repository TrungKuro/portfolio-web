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

### ⚙️ Các tính năng của `JSONHosting`

1. `Multiple Access Points`
   - Every JSON document gets two URLs: a raw endpoint for direct access and an API endpoint with metadata.

     ```
     Raw: /api/json/abc123/raw
     API: /api/json/abc123
     ```

     | So sánh        | `Raw Endpoint`       | `API Endpoint`           |
     | -------------- | -------------------- | ------------------------ |
     | Dữ liệu trả về | Chỉ JSON gốc         | JSON + metadata          |
     | Dễ đọc cho máy | ✅ (thuần JSON)      | ❌ (có wrapper)          |
     | Dành cho       | Frontend, fetch data | Backend, quản lý dữ liệu |
     | Có metadata    | ❌                   | ✅                       |
     | Giống như      | File JSON tĩnh       | Bản ghi API có info      |

   - 🔹 Raw Endpoint `(/raw)`
     - Trả về chỉ _"dữ liệu JSON gốc"_ mà bạn đã lưu.
     - Không có thêm bất kỳ thông tin nào như thời gian tạo, phiên bản, ID, v.v.
     - Header thường là:
       ```
       Content-Type: application/json
       ```
     - Thích hợp khi bạn muốn dùng JSON đó trực tiếp trong code hoặc frontend (fetch data để render UI).

   - 🔹 API Endpoint `(/)`
     - Trả về _"metadata + dữ liệu JSON gốc"_, giúp bạn biết thêm thông tin quản lý.
     - Phục vụ cho dashboard, API clients, hoặc khi bạn muốn biết dữ liệu tạo khi nào, sửa lần cuối khi nào, ai tạo, v.v.
     - 📌 Ứng dụng thực tế:
       ```
       - Dùng khi bạn cần quản lý dữ liệu (CRUD: tạo, xem, sửa, xóa).
       - Dùng trong admin dashboard hoặc script server-side.
       - Giúp kiểm tra phiên bản, kiểm soát dữ liệu, audit log...
       ```

2. `Secret Edit Keys`
   - Each document comes with a secure edit key. Keep it safe to update or delete your JSON later.

     ```
     edit_key: a1b2c3d4e5f6...
     ```

3. `Privacy First`
   - No accounts required, no tracking, no data mining. Your JSON is stored securely and accessed only via the URLs you share.

4. `Global CDN`
   - Powered by Cloudflare's global network for lightning-fast access from anywhere in the world.

### 🧪 Example JSON

```json
{
  "name": "Trung",
  "job": "Developer",
  "skills": ["Web", "Mobile", "Embedded"]
}
```

- **JSON saved successfully!**
  - _Your JSON is now live and accessible via multiple endpoints._
  - `Raw JSON Endpoint:`
    ```
    https://jsonhosting.com/api/json/4087c506/raw
    ```
  - `API Endpoint:`
    ```
    https://jsonhosting.com/api/json/4087c506
    ```
  - `Edit Key (keep this secure):`

    ```
    5360893b...
    ```

    - _Save this key to update or delete your JSON later. It won't be shown again._
    - _ID: 4087c506_
    - _Size: 108 bytes_
    - _Cached for 24h_

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

## 📊 Phân tích hướng nâng cấp Portfolio

👉🏻 Hiện **Portfolio** có dạng _"render"_ là `SSG`.

- Toàn bộ nội dung văn bản được <u>đọc</u> từ `JSON Local` <u>một lần</u> và đóng gói thành các **File Static** trong _"build time"_.
- `JSON Local` cũng cung cấp **path** cho ảnh, trong đó:
  - **Image inside** được đóng gói cùng thành các **File Static** khi _"build"_.
  - Còn **Image outside**, mỗi khi **Client** truy cập sẽ được tải _"run time"_ về trên trình duyệt.
- ✅ Ưu điểm:
  - Trang **Portfolio** sẽ được tải cực nhanh, <u>5 chỉ số hiệu suất quan trọng</u> đều được tối ưu:
  - `FCP (First Contentful Paint)` ➡️ Phản ánh cảm giác trang đã bắt đầu hiển thị gì đó
  - `LCP (Largest Contentful Paint)` ➡️ Phản ánh cảm giác nội dung chính đã xuất hiện
  - `TBT (Total Blocking Time)` ➡️ Phản ánh trải nghiệm tương tác (bấm, cuộn, nhập liệu có bị delay hay không)
  - `CLS (Cumulative Layout Shift)` ➡️ Phản ánh cảm giác trang có ổn định hay bị xô lệch khi đang xem
  - `SI (Speed Index)` ➡️ Phản ánh trải nghiệm thị giác (nội dung hiển thị nhanh hay chậm)
- ❌ Nhược điểm:
  - Mỗi lần muốn cập nhập nội dung mới sẽ cần cập nhập vào `JSON`, và phải _"re-build"_ cả trang web, thì **Portfolio** mới được cập nhập.
- ⭐️ Chấp nhận và Tối ưu:
  - Dạng `SSG` phù hợp khi tần suất thay đổi nội dung rất ít.
  - Cân nhắc đến những ảnh có thể cần cập nhập _(cả file ảnh hoặc path ảnh)_ và chuyển đổi các ảnh _"inside"_ ra _"ouside"_, để giảm kích thước _"build"_ và tăng tốc _"deploy"_.

### Phân tích khi dùng **[ JSON Storage Service ]**

👉🏻 Việc chuyển từ dùng `JSON Local` (inside) sang `JSON-Hosting` (outside).

- ⚠️ **Portfolio** không thể _"render"_ dạng `SSG` được nữa.
  - Vì `SSG` → yêu cầu mọi dữ liệu phải có sẵn tại _"build time"_, nên dùng `JSON Local` được.
  - Còn khi dùng `JSON-Hosting` dữ liệu chỉ có tại _"run time"_ (lúc **Client** truy cập), nên **Next.js** không thể _"build"_ ra file `HTML tĩnh` chứa sẵn nội dung đó.

- 🔁 Khi đó mình có <u>3 hướng</u> phát triển:

  | Hướng                           | Mô tả                                          | Loại render   |
  | ------------------------------- | ---------------------------------------------- | ------------- |
  | **1. SSR (getServerSideProps)** | Fetch JSONHosting mỗi request                  | Server render |
  | **2. CSR (fetch client)**       | Fetch JSONHosting trực tiếp trên browser       | Client render |
  | **3. ISR (revalidate)**         | Fetch JSONHosting tại build + cập nhật định kỳ | SSG lai động  |

- 👉🏻 Hướng _"render"_ theo dạng `SSR`.
  - ✅ Ưu điểm:
    - Bảo mật được **URL** của `JSON`, **Client** ko thấy được, chỉ có **Server** mới biết.
    - Tuy nhiên thì điều này ko cần thiết, vì `JSON-Hosting` có `Edit Key` sẵn rồi.
  - ❌ Nhược điểm:
    - Mỗi **Client** truy cập trang, thậm chí tải lại trang. Tương ứng **Server** sẽ gửi một _"request"_ đến `JSON-Hosting`.
    - Nhưng bên `JSON-Hosting` họ có giới hạn mỗi **IP** chỉ được _100 request/h_.
    - Vậy nên khi có càng nhiều **Client** truy cập cùng lúc, **Server** rất nhanh chóng chạm tới _"giới hạn cho phép" (quota)_ sử dụng dịch vụ này.

  ```
  ➡️ Hướng này không khả thi ‼️
  ```

- 👉🏻 Hướng _"render"_ theo dạng `CSR`.
  - ✅ Ưu điểm:
    - Lúc này mỗi khi **Client** truy cập trang, sẽ gửi một _"request"_ đến `JSON-Hosting` với **IP** của riêng họ.
    - Thì mức giới hạn _100 request/h per IP_ hoàn toàn đáp ứng được. Trừ khi họ tự _"spam"_.
    - Chỉ cần _"build"_ một lần. Về sau nếu chỉ muốn cập nhập nội dung cho trang, chỉ cần cập nhập trên `JSON-Hosting` và nội dung mới sẽ hiển thị ngay lập tức khi **Client** truy cập.
  - ❌ Nhược điểm:
    - **Client** sẽ thấy **URL** của `JSON`, nhưng ko lo vì họ không có `Edit Key` để sửa nội dung `JSON`.
    - Tốc độ hiển thị ra nội dung trang chậm hơn nhiều, vì cần khoảng thời gian tải `JSON` về (tốc độ hoàn toàn phụ thuộc vào bên cung cấp dịch vụ), để có nội dung mà _"render"_ rồi mới hiển thị được.
    - Khung hiển thị bố cục nội dung trang bị thay đổi trước và sau khi có `JSON`, tạo cảm giác trang không ổn định, hay bị xô lệch khi xem.
  - ⭐️ Tối ưu:
    - Để sử dụng tối ưu _"quota"_ của `JSON-Hosting`, có thể <u>gom toàn bộ</u> `JSON` thành <u>một</u> `JSON`.
    - Thậm chí kết hợp thêm bộ nhớ `Cache` để lưu `JSON` trên trình duyệt của **Client**, trong một thời gian nhất định và tự làm mới lại qua thông số `TTL (Time To Live)`.
    - Như vậy, **Client** chỉ phải gửi một _"request"_ khi lần đầu truy cập trang, những lần sau thì không cần nữa mà sử dụng trực tiếp từ bộ nhớ `Cache` trên trình duyệt.

      ```
      🔑 Client Fetch + Cache (browser)

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

    - 🏆 Kết quả:
      - Mỗi **client** `(IP)` chỉ tốn _"1 request/h"_ thay vì hàng chục _"request"_ mỗi lần **user** reload trang.
      - Không vượt quá _"rate limit 100 requests/h/IP"_ của **JSONHosting**.

  ```
  ➡️ Hướng này khả thi 👍
  ➡️ Nhưng ko tạo được hiệu suất tối ưu nhất ‼️
  ➡️ Ảnh hưởng nhiều đến trải nghiệm UI người dùng ‼️
  ```

- 👉🏻 Hướng _"render"_ theo dạng `ISR`.
  - 💎 `ISR` là sự kết hợp giữa `SSG` và `SSR` → Trang vẫn là **HTML tĩnh** (như `SSG`), nhưng <u>có thể tự tái tạo lại nội dung định kỳ</u> (như `SSR`).
  - 🧠 `ISR` không _"re-build"_ toàn bộ project như `SSG`, mà chỉ _"re-render"_ lại `HTML` từ dữ liệu mới bằng hàm `getStaticProps()`.
  - ✅ Ưu điểm:
    - Tận dụng được ưu điểm hiệu suất y như của `SSG` mang lại cho trang.
      - Nếu khi dùng `SSG`, nội dung được _"build"_ từ `JSON Local`.
      - Thì `ISR` cũng cho gửi một _"request"_ đến `JSONHosting` để lấy nội dung trong _"build time"_.
    - `JSON` từ _"inside"_ được đem ra _"outside"_, mỗi lần chỉnh sửa nội dung cũng không cần _"re-build"_ project.
    - Ngoài ra `ISR` có cơ chế _"revalidate"_ để xác định khi nào cần _"re-render"_ trang một cách tự động.
  - ❌ Nhược điểm:
    - Nếu dùng _"revalidate"_ theo chu kỳ.
      - Khi bạn cập nhập nội dung `JSON` mới, **Client** truy cập sau đó cũng chỉ thấy nội dung cũ. Chỉ khi kết thúc chu kỳ _"revalidate"_, trang mới được _"re-render"_.
      - Nhưng nếu bạn không có cập nhập nội dung `JSON` mới, khi kết thúc chu kỳ trang cũng tự _"re-render"_ lại chính nội dung cũ, rất dư thừa lãng phí tài nguyên **Server** ko cần thiết.
    - Khi hết _"revalidate"_, trang ko tự _"re-render"_, chỉ đến khi có **Client** nào đó truy cập, quá trình này mới được kích hoạt.
      - Tất nhiên, lúc này nội dung mà **Client** đó thấy là nội dung cũ, trong khi chờ nội dung mới đang _"render"_.
      - Chỉ những **Client** sau đó trở đi mới thấy nội dung mới.
  - ⭐️ Tối ưu:
    - 🔑 `On-Demand Revalidation`
      - Bạn tạo _"API endpoint riêng"_.
      - Khi dữ liệu **JSON** thay đổi, bạn gửi _"request"_ tới **EndPoint** này để báo **Next.js** _"revalidate"_ ngay.
    - ✅ Ưu điểm, chỉ _"revalidate"_ khi có thay đổi thật.
    - ⚙️ Cách triển khai:
      - 📄 Thiết lập _"trang tĩnh"_, chỉ _"re-render"_ lại khi có lệnh _"revalidate"_.
      - 🚀 Tạo _"API Revalidation Endpoint"_, có `token` ⇒ bảo mật, để người khác không tự ý gọi `API` này.
      - 🔑 Thêm biến môi trường bảo mật ⇒ `REVALIDATE_SECRET`.
      - 📡 Gửi yêu cầu _"revalidate"_ khi **JSON** đổi ⇒ **Next.js** sẽ tự động _"re-render"_ lại trang.

  ```
  ➡️ Hướng này khả thi.
      - Tận dụng được ưu điểm hiệu suất của SSR.
      - Có thể cập nhập JSON, chủ động Revalidate để "re-render" nội dung.
      - Không cần "deploy" hay "re-build" lại toàn project.
  ```

### Phân tích khi dùng **[ Image Storage Service ]**

⚖️ Cân đối giữa dùng `Image Local` (inside) và `Image External` (outsise)

- 🧠 Về “tốc độ hiển thị ảnh”
  - ⚠️ Tốc độ ảnh không phụ thuộc vào “nó ở đâu”.
  - 🔑 Mà phụ thuộc vào độ gần `CDN` + `cache` + _"định dạng ảnh"_ + **Optimization**.

| Tiêu chí                                       | 🏠 **Image Local (inside project)**                                                    | 🌐 **Image External (CDN / JSONHosting / Cloudflare / S3 …)**                                          |
| ---------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **1️⃣ Tốc độ tải ảnh**                          | Nhanh **nếu có build-time optimization**, nhưng phụ thuộc vào hosting gốc của web.     | Rất nhanh nếu CDN có **Edge caching gần người dùng**, nhưng phụ thuộc vào **server bên thứ ba**.       |
| **2️⃣ SEO & Indexing**                          | ✅ Tối ưu tốt cho SEO vì ảnh cùng domain → Google dễ crawl và tính điểm PageSpeed.     | ⚠️ SEO yếu hơn nếu domain ảnh khác domain web (cross-domain). Cần `crossOrigin` hoặc `allow indexing`. |
| **3️⃣ Caching**                                 | Caching do **web server bạn** kiểm soát. Có thể tối ưu TTL / ETag dễ dàng.             | Caching phụ thuộc vào chính sách của **CDN hoặc dịch vụ ngoài**, ít kiểm soát.                         |
| **4️⃣ Build & Deploy**                          | ❌ Làm tăng kích thước build → thời gian build, deploy, và bandwidth lớn hơn.          | ✅ Giảm tải cho server của bạn, **HTML nhẹ hơn**, dễ cập nhật ảnh mà không rebuild.                    |
| **5️⃣ Thay đổi nội dung ảnh**                   | Mỗi khi ảnh đổi → cần **rebuild** lại project.                                         | ✅ Chỉ cần **update ảnh ở nguồn ngoài**, không cần rebuild web.                                        |
| **6️⃣ Bảo trì & Quản lý**                       | Ảnh nằm trong codebase → dễ quản lý phiên bản, backup cùng code.                       | Có thể rủi ro nếu bên thứ ba đổi link, xóa ảnh hoặc lỗi CDN.                                           |
| **7️⃣ Bảo mật (CORS)**                          | Không lo lỗi `CORS`. Ảnh load nội bộ.                                                  | Có thể gặp lỗi `CORS` nếu quên config `Access-Control-Allow-Origin`.                                   |
| **8️⃣ Tối ưu hóa (Next.js Image Optimization)** | ✅ Hoạt động trực tiếp với `next/image`, được tối ưu kích thước, lazyload, responsive. | ⚠️ Cần cấu hình `domains[]` trong `next.config.js` mới được Next.js optimize.                          |
| **9️⃣ Chi phí / Tài nguyên**                    | Tốn **storage & bandwidth** của host bạn.                                              | Có thể miễn phí hoặc rẻ nếu dùng CDN có caching mạnh (Cloudflare, Vercel, S3).                         |
| **🔟 Tính ổn định / Phụ thuộc**                | Độc lập, không phụ thuộc bên thứ ba.                                                   | Phụ thuộc vào độ ổn định của **dịch vụ bên ngoài**.                                                    |

🏆 Kết hợp tối ưu (thực tế nhất):

| Loại ảnh                                                   | Nên đặt ở đâu                                    |
| ---------------------------------------------------------- | ------------------------------------------------ |
| Logo, icon, favicon, ảnh UI cố định                        | 🏠 Local                                         |
| Ảnh bài viết, dự án, sản phẩm, banner thay đổi             | 🌐 External CDN                                  |
| Ảnh user-upload hoặc dynamic content                       | 🌐 External (S3 / Cloudinary / Supabase Storage) |
| Ảnh nền tĩnh cho layout                                    | 🏠 Local                                         |
| Ảnh nền động hoặc theo theme (portfolio cập nhật liên tục) | 🌐 External                                      |

## 🫵🏻 Lựa chọn hướng nâng cấp Portfolio

```
🔑 Từ [ SSG ] nâng lên [ ISR ] dùng kỹ thuật "On-Demand Revalidation"
```

- **👉🏻 JSON Storage Service:**
  - 📄 `JSON`:
    - ?!

- **👉🏻 Image Storage Service:**
  - ⚙️ [imagekit.io](https://imagekit.io) → đăng ký bằng _"TK Gmail"_
    - **Select your data processing and storage region**:
      - The processing region is crucial as it determines where your media files are stored and processed. Choose your processing region based on integration strategy, compliance needs, and audience location.
      - Select region ➡️ _Singapore (Singapore)_
    - **Set-up ImageKit ID**:
      - ImageKit ID is an alphanumeric identifier that uniquely identifies your account and assets. No special characters allowed.
      - The chosen ImageKit ID will be used in asset URLs: https://ik.imagekit.io/[imagekit_ID]/path/to/myimage.jpg
      - ImageKit ID ➡️ _trungkur0_
  - 📦 `Digital Asset Management`:
    - [Upload media to ImageKit storage](https://imagekit.io/docs/dam/upload-assets) ➡️ _Upload assets → From the dashboard_
  - 🌐 `Image External` _(outside project)_
    - Những ảnh thường cần cập nhập theo JSON.
  - 🏠 `Image Local` _(inside project)_
    - Những ảnh còn lại, hầu như không cần thay đổi.
  - 🔗 `Domain-level restriction`:
    - ?!
