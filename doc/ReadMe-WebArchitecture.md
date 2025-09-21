# 🌐 Web Architecture Classification

```
Web Architecture
│
├── 1️⃣ By Application Structure
│   ├── Static Website
│   ├── Single Page Website
│   ├── SPA (Single Page Application)
│   └── MPA (Multi Page Application)
│
├── 2️⃣ By Rendering Pattern
│   ├── CSR (Client-Side Rendering)
│   ├── SSR (Server-Side Rendering)
│   ├── SSG (Static Site Generation)
│   └── ISR (Incremental Static Regeneration)
│
├── 3️⃣ By Architectural Style
│   ├── JAMstack (JavaScript, APIs, Markup)
│   └── Hybrid Architecture (SPA + SSR/SSG mix)
│
└── General Terms
    ├── Web Architecture (umbrella term)
    ├── Website Architecture (content sites)
    ├── Web Application Architecture (apps)
    └── Web Rendering Patterns (render strategies)
```

## 👉🏻 General Terms

- `Web Architecture`: Kiến trúc web ➡️ thuật ngữ chung cho tất cả các cấu trúc.

  - `Website Architecture`: Kiến trúc website (thiên về site nội dung) ➡️ tập trung vào các _"trang web có nhiều nội dung" (`content-heavy site`)_.

  - `Web Application Architecture`: Kiến trúc ứng dụng web ➡️ tập trung vào các _"trang web ứng dụng" (`app`)_.

  - `Web Rendering Patterns`: Mẫu kết xuất web ➡️ về các phương pháp _"kết xuất" (`render`)_ cụ thể.

## 1️⃣ Application Structure

- **Website Architecture**:

  - `Static Website` → plain HTML/CSS/JS, no backend.
  - `Single Page Website` → one route only (like a landing page).

```
👉 Khác nhau ở mức độ nội dung & bố cục.
```

- **Web Application Architecture**:

  - `SPA` **(Single Page Application)** → one HTML entry, client-side routing (React, Vue, Angular).
  - `MPA` **(Multi Page Application)** → multiple routes/pages rendered separately (traditional websites).

```
👉 Khác nhau ở số lượng "bộ định tuyến" (route)
              và cách "điều hướng" (navigation)
```

---

### 👉🏻 Static Website: _"Trang tĩnh"_

- ➡️ Đặc điểm:
  - HTML/CSS/JS cố định, không Backend động.
  - Không có Database.
- ⚙️ Ví dụ:
  - _Ứng dụng như Landing page, Portfolio._
  - _Phù hợp với Landing page, CV, trang giới thiệu._
- ✅ Ưu điểm:
  - Load nhanh, rẻ.
  - Dễ deploy.
- ❌ Nhược điểm:
  - Nội dung không thay đổi theo user.
  - Khó mở rộng tính năng động.

### 👉🏻 Single Page Website: _"Một trang duy nhất"_

- ➡️ Đặc điểm:
  - Chỉ 1 route (/).
  - Nội dung chia section, cuộn xuống.
- ⚙️ Ví dụ ứng dụng:
  - _Ứng dụng như Startup landing, sự kiện._
  - _Phù hợp với Landing page, sự kiện, quảng cáo sản phẩm._
- ✅ Ưu điểm:
  - Đơn giản.
  - Trải nghiệm mượt.
- ❌ Nhược điểm:
  - Không tốt cho SEO nếu nội dung quá nhiều.
  - Khó tổ chức nội dung lớn.

### 🔎 [Static Website] vs [Single Page Website]

| Tiêu chí            | **Static Website**                                                                                                      | **Single Page Website**                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Định nghĩa**      | Website có nhiều trang HTML tĩnh, mỗi trang là 1 file `.html` độc lập.                                                  | Website chỉ có **1 route duy nhất** (`/`), toàn bộ nội dung nằm trong cùng một trang.                     |
| **Cấu trúc**        | Nhiều file (ví dụ: `index.html`, `about.html`, `contact.html`).<br>Điều hướng sang trang mới → load file mới từ server. | Một file chính (ví dụ: `index.html`).<br>Điều hướng bằng scroll (cuộn xuống) hoặc anchor link (#section). |
| **Nội dung**        | Có thể nhiều trang nhỏ, mỗi trang chuyên cho 1 chủ đề (About, Services, Contact…).                                      | Tất cả nội dung dồn trên một trang, chia thành nhiều section (Hero, Features, Pricing, Contact…).         |
| **Điều hướng**      | Khi click menu → reload sang trang mới.                                                                                 | Khi click menu → cuộn (scroll) trong cùng trang.                                                          |
| **UX**              | Truyền thống, giống website “cổ điển”.                                                                                  | Trải nghiệm liền mạch, giống một Landing Page marketing.                                                  |
| **Ví dụ điển hình** | Website công ty nhỏ với 3-5 trang tĩnh.                                                                                 | Landing page quảng cáo sản phẩm/dịch vụ.                                                                  |

---

### 👉🏻 `SPA` (Single Page Application): _"Ứng dụng web một trang"_

- ➡️ Đặc điểm:
  - Ứng dụng chạy 1 file HTML chính.
  - Điều hướng Client-Side (không reload).
  - Thường dùng React, Vue, Angular.
- ⚙️ Ví dụ:
  - _Ứng dụng như Gmail, Trello, Notion, ..._
  - _Phù hợp với Web app tương tác nhiều, dashboard._
- ✅ Ưu điểm:
  - UX mượt, giống app.
  - API-first, dễ kết hợp mobile app.
- ❌ Nhược điểm:
  - SEO khó hơn.
  - Initial load chậm nếu app lớn.

### 👉🏻 `MPA` (Multi Page Application): _"Ứng dụng web nhiều trang"_

- ➡️ Đặc điểm:
  - Nhiều trang HTML riêng biệt.
  - Server render mỗi lần load route.
- ⚙️ Ví dụ:
  - _Ứng dụng cho Website báo chí, eCommerce truyền thống, ..._
  - _Phù hợp với E-commerce, báo điện tử, blog nhiều nội dung._
- ✅ Ưu điểm:
  - SEO tốt.
  - Tổ chức nội dung lớn dễ dàng.
- ❌ Nhược điểm:
  - UX không mượt như SPA.
  - Reload khi đổi trang.

## 2️⃣ Rendering Pattern

```
- Applies mainly to [SPAs], [MPAs]
- Or "hybrid" frameworks like: Next.js/Nuxt
```

- `CSR` **(Client-Side Rendering)**

  - Render happens entirely in the browser.
  - Example:
    - _Pure React SPA_

- `SSR` **(Server-Side Rendering)**

  - Rendered on the server per request, HTML sent to client.
  - Example:
    - _Next.js SSR_
    - _PHP Laravel_

- `SSG` **(Static Site Generation)**

  - Pre-rendered HTML at build time.
  - Example:
    - _Gatsby_
    - _Next.js SSG_

- `ISR` **(Incremental Static Regeneration)**
  - Hybrid of SSG + regeneration on demand.
  - Example:
    - _Next.js ISR_

```
👉 Đây là cách render nội dung (ở 1️⃣ client, 2️⃣ server hay 3️⃣ build time).
👉 Có thể áp dụng cho cả [Website] lẫn [Web Application].

⚠️ Các thuật ngữ CSR, SSR, SSG, ISR
❌ Không nói về toàn bộ [Website/WebApp]
✅ Mà nói về cách render của từng "route" (mỗi "page")
```

- 📌 Ý nghĩa chính xác:
  - Một **WebApp/Website** có thể kết hợp nhiều _"rendering patterns"_ khác nhau.
  - Ví dụ:
    - `/` _(home)_ dùng `SSG` để **build** sẵn.
    - `/blog/[id]` dùng `ISR` để tái tạo nội dung định kỳ.
    - `/dashboard` dùng `SSR` để lấy **data real-time** cho **user**.
    - Một số **component** nhỏ dùng `CSR` (_"fetch"_ dữ liệu sau khi _"load"_).

---

**📝 Bảng So Sánh `CSR` – `SSR` – `SSG` – `ISR`**

| Pattern                                   | Cơ chế hoạt động                                                            | Thời điểm render                                                         | Ví dụ điển hình        | Ưu điểm                                                                         | Nhược điểm                                                      | Phù hợp cho                                          |
| ----------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------- |
| **CSR** (Client-Side Rendering)           | Server gửi **HTML rỗng + JS bundle**, trình duyệt chạy JS → render UI.      | Render **tại client (trình duyệt)**.                                     | React SPA, Vue SPA.    | - UX giống app native.<br>- Chuyển trang mượt.<br>- Tách biệt frontend/backend. | - SEO kém (Google phải chờ JS).<br>- Tốc độ load ban đầu chậm.  | Dashboard, web app nội bộ, ứng dụng tương tác nhiều. |
| **SSR** (Server-Side Rendering)           | Server render HTML sẵn → gửi client.<br>JS sau đó hydrate để tương tác.     | Render **mỗi request trên server**.                                      | Next.js SSR, Nuxt SSR. | - SEO tốt.<br>- Nội dung hiển thị ngay.<br>- Dữ liệu động theo user.            | - Server tốn tài nguyên.<br>- Tốc độ phụ thuộc server response. | E-commerce, blog động, trang cần SEO mạnh.           |
| **SSG** (Static Site Generation)          | HTML được build **tại build time** → lưu file tĩnh deploy trên CDN.         | Render **trước khi deploy (build time)**.                                | Gatsby, Next.js SSG.   | - Rất nhanh (CDN cache).<br>- Chi phí rẻ.<br>- Bảo mật cao.                     | - Không real-time.<br>- Update chậm (phải rebuild toàn site).   | Blog cá nhân, docs, landing page ít thay đổi.        |
| **ISR** (Incremental Static Regeneration) | Giống SSG nhưng có cơ chế **regenerate từng trang khi có request** sau TTL. | Render **ban đầu tại build time**, sau đó refresh từng phần trên server. | Next.js ISR.           | - Nhanh như SSG.<br>- Cập nhật gần real-time.<br>- Không rebuild toàn site.     | - Hạ tầng phức tạp.<br>- Chỉ có ở framework hỗ trợ (Next.js).   | News site, e-commerce, blog nhiều nội dung cập nhật. |

```
👉 Tóm lại:

  CSR → app-like, UX mượt, SEO kém.
  SSR → SEO tốt, dynamic, nhưng tốn server.

  SSG → nhanh, rẻ, tốt cho site ít thay đổi.
  ISR → cân bằng: nhanh + SEO + update gần real-time.
```

---

- 🔹 Với `component` trong **React/Next.js**

  - Các thuật ngữ `CSR / SSR / SSG / ISR` ⚠️ **không áp dụng trực tiếp cho component**.
  - Chúng chỉ áp dụng cho ✅ **route (page)** hoặc rộng hơn là **một phần output của router**.

- 🔹 Vậy _"component render"_ kiểu gì?

  - Trong **Next.js** `(App Router)`:

    - **Server Component (mặc định)**

      - Chạy ở **server**, không gửi `JS` xuống **client** (chỉ gửi `HTML`).
      - Tốt cho _"performance"_, `SEO`.

    - **Client Component (`"use client"`)**

      - Chạy ở **client** _(browser)_.
      - Cần khi có `state`, `hooks` hoặc `event listener`.

---

```
💎 Trong Next.js, mặc định [page] sẽ được "render" theo cách khác nhau tùy bạn dùng "data fetching" nào!
```

- 🚦 Quy tắc mặc định của <u>một `page` duy nhất</u>:

  - **Nếu không `fetch data` gì** ➡️ page được **Static Site Generation `(SSG)`**.

    > HTML được build sẵn lúc `next build`.

  - Nếu... ➡️ page thành **`SSR`**.

    - dùng `getServerSideProps` (Page Router)
    - hoặc `fetch({ cache: 'no-store' })` (App Router)

  - Nếu... ➡️ page thành **`ISR`**.

    - dùng `getStaticProps` + `revalidate` (Page Router)
    - hoặc `fetch({ next: { revalidate: ... } })` (App Router)

  - **Nếu mọi data load ở Client `(useEffect, fetch browser)`** ➡️ page thành **`CSR`**.

- 👉 Nói cách khác:

  - **Một `route` duy nhất** không đồng nghĩa mặc định là `SSG`.
  - **Mặc định (không `data fetching`)** thì đúng là `SSG`.
  - Nhưng chỉ cần bạn thay đổi cách _"fetch data"_, nó sẽ đổi sang `SSR`, `ISR` hoặc `CSR`.

## 3️⃣ Architectural Style

- `JAMstack` (JavaScript, APIs, Markup)

  - Decoupled frontend + backend APIs.
  - Example:
    - _Netlify_
    - _Headless CMS_

- `Hybrid Architecture`

  - Mix of `SPA` + `SSR`/`SSG` depending on the route.
  - Example:
    - _Next.js App Router_
    - _Remix_
    - _Nuxt_

---

### 👉🏻 `JAMstack`

- ➡️ Đặc điểm:
  - Dựa trên JavaScript + API + Markup.
  - Tách frontend (static) và backend (API).
- ⚙️ Ví dụ:
  - _Ứng dụng cho Netlify CMS, headless CMS_
  - _Phù hợp với Startup, site tốc độ cao, kết nối API nhiều._
- ✅ Ưu điểm:
  - Bảo mật cao.
  - Scale dễ.
  - Dùng CDN.
- ❌ Nhược điểm:
  - Phụ thuộc API/3rd-party.
  - Cần CI/CD.

### 👉🏻 `Hybrid`

- ➡️ Đặc điểm:
  - Kết hợp SPA + SSR/SSG + API.
  - Tùy trang mà render khác nhau.
- ⚙️ Ví dụ:
  - _Ứng dụng cho Next.js App Router, Remix_
  - _Phù hợp với Startup scale lớn, web app phức tạp._
- ✅ Ưu điểm:
  - Linh hoạt.
  - SEO + UX tốt.
  - Tối ưu performance.
- ❌ Nhược điểm:
  - Cấu trúc phức tạp.
  - DevOps khó hơn.
