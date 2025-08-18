# Learn About

👉🏻 Danh sách các khái niệm:

- **Components React**
- **Types of Effects**
- **Types of Layouts**
- **All about the Image**
- **Other Things**

## Components React

### Link

- **Anchor Link** `"#section-id"`
  - Dẫn đến ID cụ thể trong cùng 1 Page - Single Page Application (SPA)
  - Dùng để Navigation nội bộ giữa các Section
- **Relative URL** `"/page"`
  - Dẫn đến một Page khác trong cùng Website/App
  - Dùng Khi muốn chia Website/App thành nhiều Page riêng biệt
- **Absolute URL** `"https://..."`
  - Dẫn đến một trang ngoài, URL đầy đủ
  - Dùng khi muốn mở website ngoài
  - Nên thêm thuộc tính: _target="\_blank" rel="noopener noreferrer"_
  - Để mở tab mới + bảo mật
- **Email** `"mailto:"`
  - Khi click sẽ mở trình soạn email mặc định với địa chỉ được gắn sẵn
- **Phone** `"tel:"`
  - Mở app gọi điện trên điện thoại/máy tính có tích hợp

### `<Link>` vs `<a>`

?

### Google Drive

✅ Cách làm chuẩn: Google Drive → Link download trực tiếp

- Giả sử bạn có link chia sẻ như sau:

  ```
  https://drive.google.com/file/d/1AbCdEfGhIjKlMn/view?usp=sharing
  ```

- 🔁 Bước 1: Lấy FILE_ID

  ```
  FILE_ID = 1AbCdEfGhIjKlMn

  ```

- 🔁 Bước 2: Chuyển sang link download trực tiếp

  ```
  https://drive.google.com/uc?export=download&id=1AbCdEfGhIjKlMn
  ```

- ✅ Bước 3: Gắn vào thẻ <a> với download để mở hộp thoại "Save As"

  ```
  <a
    href="https://drive.google.com/uc?export=download&id=1AbCdEfGhIjKlMn"
    download
  >
    <button>
      📥 Tải CV
    </button>
  </a>
  ```

- ⚠️ Quan trọng:
  - `download` chỉ hoạt động nếu link trả về đúng file PDF mà không _"redirect preview"_.
  - **Google Drive** có thể cảnh báo/quét virus nếu file lớn, lúc đó nó không mở hộp Save trực tiếp.

## Types of Effects

### Scroll Reveal Animation

👉🏻 `Scroll Reveal Animation` là hiệu ứng làm cho nội dung hiện ra từ từ **(fade in, slide in, zoom, v.v.)** khi người dùng cuộn trang đến gần vị trí của nó.

🧠 Mục tiêu của **Scroll Reveal Animation**:

- ✅ Tăng trải nghiệm người dùng (UX) → làm trang web sống động, chuyên nghiệp.
- ✅ Thu hút sự chú ý vào các phần nội dung quan trọng.
- ✅ Tránh hiển thị quá nhiều thông tin cùng lúc → giúp đọc dễ hơn.
- ✅ Làm nổi bật Portfolio / CV khi nhà tuyển dụng lướt nhanh.

🧩 Nguyên lý hoạt động:

- Dựa vào `Intersection Observer`:
  - Trình duyệt "quan sát" phần tử nào đi vào vùng nhìn thấy `(viewport)`.
  - Khi phần tử bắt đầu hiện ra trong màn hình, sẽ thêm một class hoặc trigger animation.

🧪 Các hiệu ứng thường dùng:

- Hiệu ứng
  - `fade-in` : Mờ dần từ 0 → 1
  - `slide-in` : Trượt vào từ trái/phải/lên/xuống
  - `zoom-in` : Phóng to từ nhỏ → kích thước thật
  - `rotate-in` : Quay nhẹ khi hiện ra

## Types of Layouts

### Grid

Grid có 2 chiều độc lập:

- **Inline axis** luôn là trục ngang (trái ↔ phải)
  - `justify-*` = căn chỉnh theo chiều ngang (inline axis)
- **Block axis** luôn là trục dọc (trên ↕ xuống)
  - `align-*` = căn chỉnh theo chiều dọc (block axis)

```
💎 content ~> item → self

CONTENT = căn chỉnh toàn bộ grid tracks trong container
|
|- justify-content: center; 👉🏻 căn giữa tất cả columns
|_ align-content: center;   👉🏻 căn giữa tất cả rows

ITEMS = căn chỉnh mặc định cho items trong cells
|
|- justify-items: center;   👉🏻 căn giữa items trong cell theo ngang
|_ align-items: center;     👉🏻 căn giữa items trong cell theo dọc

SELF = ghi đè căn chỉnh cho item cụ thể */
|
|- justify-self: end;       👉🏻 item này căn phải trong cell
|_ align-self: start;       👉🏻 item này căn trên trong cell
```

- **Shorthand**:
  - `place-content`: <align-content> <justify-content>;
  - `place-items`: <align-items> <justify-items>;
  - `place-self`: <align-self> <justify-self>;

### Flex

Flex có 2 trục độc lập:

- **Main axis** (trục chính) - mặc định là chiều ngang (phụ thuộc vào `flex-direction`)
- **Cross axis** (trục phụ) - mặc định là chiều dọc

```
flex-direction: row;            /* main axis = ngang, cross axis = dọc */
flex-direction: column;         /* main axis = dọc, cross axis = ngang */
flex-direction: row-reverse;    /* main axis = ngang (đảo chiều) */
flex-direction: column-reverse; /* main axis = dọc (đảo chiều) */
```

- `justify-*` = căn chỉnh theo **main axis** (có thể ngang hoặc dọc)
- `align-*` = căn chỉnh theo **cross axis** (có thể dọc hoặc ngang)

```
💎 content ~> item → self

content = căn chỉnh toàn bộ flex trong container
items   = căn chỉnh mặc định cho tất cả flex items
self    = căn chỉnh riêng lẻ từng flex item
```

- ✅ Flexbox chỉ hỗ trợ:
  - `justify-content` 👉🏻 căn chỉnh items dọc theo main axis
  - `align-content` 👉🏻 căn chỉnh các dòng khi wrap
  - `align-items` 👉🏻 căn chỉnh mặc định cho items theo cross axis
  - `align-self` 👉🏻 căn chỉnh riêng lẻ item theo cross axis
- ❌ Flexbox không hỗ trợ:
  - `justify-items` ⚠️ không tồn tại trong flexbox
  - `justify-self` ⚠️ không tồn tại trong flexbox

## All about the Image

### Favicon

- [Favicon là gì? Hướng dẫn cách tạo favicon cho website ấn tượng [Chi tiết từ A-Z]](https://vietnix.vn/favicon-la-gi/)

  - Step 1: Chuẩn bị hình có kích thước vuông, tỉ lệ `1:1`
  - Step 2: Chuyển đổi file ảnh sang định dạng `.ico`
  - Step 3: Chèn đoạn mã favicon HTML vào các trang web

- **Next.Js - Metadata Files**
  - [favicon, icon, and apple-icon](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons)
  - [manifest.json](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest)

### [ object-fit ]

- `fill`
  - ✅ _Mặc định._ Co giãn ảnh để **lấp đầy khung**, có thể **méo ảnh** nếu tỉ lệ khác
  - Dùng khi bạn không quan tâm đến tỉ lệ gốc
- `contain`
  - Ảnh sẽ **thu nhỏ vừa khít trong khung**, **giữ đúng tỉ lệ**, có thể **còn khoảng trống**
  - Dùng khi cần thấy toàn bộ ảnh
- `cover`
  - Ảnh sẽ **phóng to để phủ kín khung**, **giữ đúng tỉ lệ**, có thể **bị cắt ảnh**
  - Dùng cho background, avatar, card,...
- `none`
  - Ảnh giữ nguyên kích thước gốc (theo chiều `width`, `height`)
  - Dùng khi muốn ảnh hiển thị đúng như gốc
- `scale-down`
  - So sánh giữa `none` và `contain`, và dùng cái nào **nhỏ hơn**
  - Dùng khi muốn tối ưu kích thước nhất có thể

### Raster Formats và Vector Formats

👉🏻 Ảnh `Bitmap` còn gọi là **ảnh pixel**:

- Đặc điểm:
  - Được tạo từ lưới các pixel
  - Mỗi pixel có màu sắc riêng
  - Có độ phân giải cố định (ví dụ: 1920x1080)
  - Scale lên → bị mờ/pixelated
  - <u>Thích hợp: photos, complex images</u>
- Các loại phổ biến:
  ```
  📸 JPEG (.jpg, .jpeg) - Ảnh chụp, có nén손실
  🖼️ PNG (.png) - Hỗ trợ trong suốt, không nén손실
  🎨 WebP (.webp) - Định dạng modern, nén tốt
  🎬 GIF (.gif) - Animation, màu hạn chế
  📱 AVIF (.avif) - Định dạng mới nhất, nén rất tốt
  🖥️ BMP (.bmp) - Không nén, file lớn
  ```

🔑 So sánh chi tiết giữa các định dạng _"ảnh raster"_:

| Định dạng              | Đặc điểm chính                                                  | Ưu điểm                                                                                          | Nhược điểm                                                                  | Ứng dụng thường gặp                           |
| ---------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- | --------------------------------------------- |
| **JPEG (.jpg, .jpeg)** | Nén **mất dữ liệu (lossy)**, tối ưu cho ảnh chụp                | - Dung lượng nhỏ<br>- Hỗ trợ 24-bit màu (16,7 triệu màu)<br>- Tương thích rộng rãi               | - Giảm chất lượng khi nén nhiều lần<br>- Không hỗ trợ trong suốt            | Ảnh chụp, website, mạng xã hội                |
| **PNG (.png)**         | Nén **không mất dữ liệu (lossless)**, hỗ trợ alpha transparency | - Giữ nguyên chất lượng<br>- Hỗ trợ trong suốt (alpha 8-bit)<br>- Phù hợp ảnh đồ họa, logo, UI   | - File nặng hơn JPEG/WebP<br>- Không tối ưu cho ảnh chụp nhiều màu          | Logo, icon, UI/UX, đồ họa cần trong suốt      |
| **WebP (.webp)**       | Định dạng hiện đại của Google, hỗ trợ cả lossy & lossless       | - Nén tốt hơn JPEG & PNG<br>- Hỗ trợ trong suốt<br>- Hỗ trợ animation (thay GIF)                 | - Không hỗ trợ 100% trên tất cả phần mềm cũ<br>- Encode/Decode phức tạp hơn | Web tối ưu tốc độ, thay thế JPEG/PNG/GIF      |
| **GIF (.gif)**         | Nén lossless với bảng màu **256 màu**, hỗ trợ animation         | - Hỗ trợ animation đơn giản<br>- Tương thích rất rộng                                            | - Giới hạn 256 màu (8-bit)<br>- File lớn nếu ảnh nhiều màu                  | Meme, ảnh động ngắn, sticker                  |
| **AVIF (.avif)**       | Chuẩn mới dựa trên codec AV1, hỗ trợ HDR                        | - Nén cực tốt, dung lượng nhỏ hơn WebP<br>- Hỗ trợ alpha transparency<br>- Hỗ trợ HDR, animation | - Encode/Decode nặng, chưa hỗ trợ rộng rãi<br>- Xử lý chậm hơn WebP         | Ảnh chất lượng cao, website hiện đại, mobile  |
| **BMP (.bmp)**         | Định dạng ảnh **raw**, không nén                                | - Chất lượng ảnh gốc<br>- Xử lý nhanh, đơn giản                                                  | - File cực lớn<br>- Không tối ưu cho lưu trữ & web                          | Ứng dụng cũ, xử lý ảnh nội bộ, Windows legacy |

📌 Kết luận nhanh:

- 💀 File thô, cũ: `BMP` (không khuyến nghị dùng cho web).
- ⚡️ Ảnh động: `GIF` (cũ, nặng) → `WebP/AVIF` (mới, nhẹ).
- 1️⃣ Ảnh chụp: `JPEG` (phổ biến) → `WebP/AVIF` (tối ưu hơn).
- 2️⃣ Logo, UI cần trong suốt: `PNG` → `WebP/AVIF` (nhẹ hơn).
- 🏆 Chất lượng cao, tiết kiệm dung lượng: `AVIF` > `WebP` > `JPEG/PNG`.

👉🏻 Ảnh Vector (`SVG`) còn gọi là **ảnh toán học**:

- Đặc điểm:
  - Scale không bị mờ ♾️
  - File nhỏ cho hình đơn giản
  - <u>Thích hợp: icons, logos, illustrations</u>

### CDN Caching

- `CDN` đặt ở nhiều vị trí địa lý khác nhau, để người dùng tải nội dung từ **server** gần mình nhất thay vì luôn yêu cầu về **server gốc**.

- 📌 Cách hoạt động:

  - Người dùng truy cập → CDN kiểm tra cache.
  - Nếu có cache → trả về bản sao đã lưu (rất nhanh).
  - Nếu chưa có cache → CDN lấy nội dung từ server gốc, lưu lại, rồi trả cho người dùng.

- 📌 Lợi ích:

  - Tăng tốc tải trang (đặc biệt cho người dùng ở xa server gốc).
  - Giảm tải server gốc (ít request hơn).
  - Tối ưu SEO & Core Web Vitals (FCP, LCP nhanh hơn).

- 📌 Ví dụ:

  - Website host tại Singapore, người ở Mỹ truy cập → CDN có server ở Los Angeles → người đó lấy dữ liệu từ LA thay vì Singapore → nhanh hơn nhiều.

- 💡 Tóm gọn: CDN caching = lưu nội dung ở nhiều nơi → người dùng lấy từ nơi gần nhất → nhanh hơn, tiết kiệm tài nguyên server gốc.

### WebP

👉🏻 `WebP` là định dạng ảnh do `Google` phát triển, giúp <u>giảm dung lượng</u> so với `JPEG/PNG` mà <u>vẫn giữ chất lượng tốt</u>.

- 📌 Ưu điểm

  - Nhỏ hơn ~25–35% so với JPEG/PNG cùng chất lượng.
  - Hỗ trợ nền trong suốt (như PNG).
  - Hỗ trợ ảnh động (như GIF).
  - Giúp tăng tốc độ tải trang, cải thiện SEO & Core Web Vitals.

- 📌 Nhược điểm

  - Một số phần mềm cũ chưa hỗ trợ (nhưng trình duyệt hiện đại hầu hết đã hỗ trợ).

- 💡 Tóm gọn: WebP = ảnh nhẹ hơn, load nhanh hơn, tốt cho SEO.

👉🏻 Dùng `<Image>` của Next.js:

- Next.js tự động chuyển ảnh sang `WebP/AVIF` khi trình duyệt hỗ trợ, nhờ `Image Optimization API`.
  - Trình duyệt hỗ trợ WebP → Next.js gửi `WebP`.
  - Không hỗ trợ → Next.js gửi `JPEG/PNG` gốc.
- ✅ Ưu điểm: Không cần lưu thêm file `(.webp)` riêng, Next.js xử lý tự động.
- ⚠️ Nhược điểm: Chỉ áp dụng nếu dùng `<Image>` (không áp dụng cho `<img>`).

👉🏻 Nếu bắt buộc dùng `<img>`:

- Bạn cần <u>tạo WebP thủ công</u> và _"fallback"_ sang `JPG/PNG` bằng thẻ `<picture>`:

  - Trình duyệt hỗ trợ WebP → dùng `WebP`.
  - Không hỗ trợ → fallback sang `JPG`.

  ```html
  <picture>
    <source srcset="/images/my-photo.webp" type="image/webp" />
    <source srcset="/images/my-photo.jpg" type="image/jpeg" />
    <img
      src="/images/my-photo.jpg"
      alt="Mô tả ảnh"
      loading="lazy"
      decoding="async"
    />
  </picture>
  ```

🔑 **Photo Optimized:**

- Nên chuẩn bị trước **ảnh đã tối ưu hóa**!

  - Mặc dù Next.js `<Image>` có `optimization`, nhưng với những ảnh có tỉ lệ gốc rất cao, như: 2K, 4K, ...
  - Vẫn cần phần "tiền xử lý" **(preprocessing)** ảnh gốc để tối ưu nhất

🎯 **Tại sao nên xử lý trước?:**

- Build time optimization tốt hơn runtime
  - ❌ Nếu chỉ dựa vào Next.js -> chậm lần đầu load
  - ✅ Nếu đã optimize trước -> load nhanh ngay
- Giảm Kích Thước File Gốc: PNG thường rất nặng (ví dụ: 8MB so với 300KB WebP). Tối ưu hóa trước (nén, resize) giúp:
  - Giảm dung lượng lưu trữ trên `server/CDN`.
  - Giảm thời gian xử lý của `Image Optimization API`.
  - Cải thiện `Largest Contentful Paint (LCP)`, đặc biệt nếu `LCP` của bạn cao.
- Hỗ Trợ Môi Trường Tự Host: Nếu không dùng Vercel, Next.js có thể không tối ưu hóa tốt, dẫn đến tải file gốc lớn.
- Tránh Phụ Thuộc Quá Nhiều vào Next.js: Tối ưu hóa trước giúp <u>giảm tải cho server</u> (tiết kiệm bandwidth), đặc biệt khi có nhiều request hình ảnh.

⚙️ **Online Tools:**

- `TinyPNG/TinyJPG`: Nén không mất chất lượng
- `Squoosh`: Google's image optimizer
- `ImageOptim`: Mac app

🏆 **Tự động tạo WebP khi build:**

- Bạn có thể dùng `Sharp` hoặc `imagemin-webp` để convert toàn bộ ảnh trong `/public` sang `WebP` khi chạy `npm run build`.

  - ✅ Nên dùng WebP: `Ảnh bitmap (raster)` như JPG, PNG → WebP giúp giảm dung lượng 25–35% mà vẫn giữ chất lượng gần như gốc (hoặc `AVIF` nếu muốn nhẹ hơn nữa).
  - ❌ Không cần dùng WebP: `Ảnh vector (SVG)` → không bị vỡ khi phóng to/thu nhỏ, dung lượng nhỏ sẵn, không cần convert sang WebP.

  | Tiêu chí         | **Sharp**                      | **imagemin-webp**           |
  | ---------------- | ------------------------------ | --------------------------- |
  | Mục đích         | Xử lý ảnh đa năng              | Chỉ nén & convert sang WebP |
  | Định dạng hỗ trợ | JPEG, PNG, WebP, AVIF, GIF…    | JPEG, PNG → WebP            |
  | Resize/crop      | ✅ Có                          | ❌ Không                    |
  | Hiệu suất        | ⚡ Rất nhanh (libvips)         | Nhanh vừa                   |
  | Cài đặt          | Tương đối nặng (native module) | Nhẹ hơn                     |
  | Dùng khi         | Cần xử lý ảnh phức tạp         | Chỉ cần convert WebP        |

- 💡 Kinh nghiệm chọn
  - Nếu bạn dùng Next.js với `<Image>` → thường không cần cả hai, vì Next.js đã dùng _"Sharp nội bộ"_ để tối ưu ảnh.
  - Nếu bạn xử lý ảnh thủ công trước khi đưa vào `/public`:
  - Muốn resize + tối ưu → dùng `Sharp`.
  - Chỉ muốn convert sang `WebP` → dùng `imagemin-webp` (nhẹ hơn).

### AVIF

👉🏻 Định dạng ảnh nén thế hệ mới (ra mắt 2019).

- Dựa trên codec video AV1 → cho chất lượng ảnh cao hơn với dung lượng nhỏ hơn so với JPEG, PNG, WebP.
- Hỗ trợ cả lossy (mất dữ liệu) và lossless (không mất dữ liệu).

- ✅ Ưu điểm nổi bật:

  - Dung lượng thường nhỏ hơn WebP 20–50% cùng chất lượng.
  - Hỗ trợ HDR, 10-bit, transparency (alpha).

- ❌ Nhược điểm:

  - Encode (chuyển đổi) chậm hơn WebP.
  - Chưa hỗ trợ 100% trên tất cả trình duyệt (nhưng đã khá phổ biến).

👉🏻 So sánh `AVIF` vs `WebP`:

| Tiêu chí           | **WebP**                | **AVIF**                                              |
| ------------------ | ----------------------- | ----------------------------------------------------- |
| Năm ra mắt         | 2010 (Google)           | 2019 (Alliance for Open Media)                        |
| Dung lượng         | Nhỏ hơn JPEG/PNG 25–35% | Nhỏ hơn JPEG/PNG 40–60%, nhỏ hơn WebP \~20–50%        |
| Chất lượng         | Tốt                     | Rất tốt (chi tiết & màu sắc tốt hơn ở dung lượng nhỏ) |
| Hỗ trợ alpha       | ✅ Có                   | ✅ Có                                                 |
| Hỗ trợ animation   | ✅ Có                   | ⚠ Có nhưng ít dùng                                    |
| Tốc độ encode      | Nhanh                   | Chậm hơn WebP                                         |
| Hỗ trợ trình duyệt | Rất rộng                | Rộng nhưng chưa tuyệt đối                             |
| HDR / 10-bit       | ❌ Không                | ✅ Có                                                 |

💡 Kinh nghiệm chọn:

- Nếu ưu tiên dung lượng cực thấp + chất lượng cao → AVIF (khi chắc browser hỗ trợ).
- Nếu cần tốc độ xử lý nhanh + hỗ trợ mọi nơi → WebP.
- Trong thực tế, nhiều website dùng `AVIF` trước, _"fallback"_ sang `WebP`, rồi mới _"fallback"_ `JPEG/PNG` cho các browser rất cũ.

### `<Image>` vs `<img>`

👉🏻 Với SVG, dùng `<img>` thông thường tốt hơn nhiều so với **Next.js** `<Image>`. Đây là lý do:

- `SVG` không cần optimization
  - SVG đã là vector format, không bị pixelated
  - Không cần resize, compress hay generate multiple sizes
  - Next.js Image optimization chỉ lãng phí resources
- Performance tốt hơn
  - Ít JavaScript bundle size hơn
  - Không có processing overhead từ Next.js
  - Load nhanh hơn vì không qua pipeline optimization
- Tương thích tốt hơn
  - Không có layout shift issues
  - Không cần wrapper div với position: relative
  - CSS styling trực tiếp

👉🏻 Khi nào vẫn dùng `<Image>`?

- Chỉ dùng Next.js `<Image>` với:

  - Ảnh raster: `JPG`, `PNG`, `WebP`
  - Ảnh cần optimization: resize, lazy loading, format conversion
  - Ảnh lớn: cần compress để giảm bandwidth

- Yếu tố quyết định quan trọng:

  - Kích thước file gốc (quan trọng nhất)
    - File lớn `(>50KB)` + không phải `SVG` → `<Image>`
    - File nhỏ `(<50KB)` hoặc `SVG` → `<img>`
  - Số lượng ảnh trên trang
    - Nhiều ảnh → `<Image>` với `loading="lazy"`
    - Ngoại lệ: `SVG` dù nhiều vẫn nên dùng `<img>` với `loading="lazy"`
  - Vị trí và độ ưu tiên
    - Critical (header, hero) → `<img>` để load ngay
    - Non-critical → `<Image>` với `lazy loading`

- Quy tắc thực tế:

  - Dùng `<Image>` khi:
    - File gốc `> 50KB` (dù hiển thị nhỏ) + không phải SVG
    - Cần lazy loading (nhiều ảnh)
    - Cần responsive images
    - Ảnh user-generated content
  - Dùng `<img>` khi:
    - File đã được optimize sẵn → File nhỏ (<50KB) hoặc SVG
    - Critical loading (above fold)
    - File rất nhỏ (<10KB)
    - Simple static icons

- Nếu đã dùng `loading="lazy"` thì nên luôn kết hợp với `decoding="async"`! -> Kết hợp cả hai cho performance tốt nhất, đặc biệt với **ảnh raster formats**! 🚀

  - Hoạt động khác nhau nhưng bổ trợ (kết hợp tối ưu)
    - loading="lazy" // Kiểm soát KHI NÀO load
    - decoding="async" // Kiểm soát CÁCH decode (không block)
  - Tác động performance
    - loading="lazy": Chờ loading network request
    - decoding="async": Tránh blocking main thread khi decode
  - Trải nghiệm người dùng
    - Khi user scroll đến ảnh:
    - loading="lazy" → bắt đầu download
    - decoding="async" → decode không làm đơ UI
    - Smooth rendering
  - ⚡️ Lưu ý browser support:
    - loading="lazy": **Chrome 76+, Firefox 75+, Safari 15.4+**
    - decoding="async": **Chrome 65+, Firefox 63+, Safari 11.1+**

### `<Image>`

👉🏻 `[ quality ]` của `<Image>`:

- Được sử dụng để _"điều chỉnh mức độ nén của hình ảnh"_ được tối ưu hóa, ảnh hưởng đến kích thước tệp và độ chi tiết của hình ảnh

  - Phạm vi: Thuộc tính `quality` nhận giá trị là một số nguyên từ 1 đến 100.
    - Giá trị `1`: Chất lượng thấp nhất, nén mạnh nhất, dẫn đến kích thước tệp nhỏ nhưng hình ảnh có thể mất chi tiết nghiêm trọng (pixelated).
    - Giá trị `100`: Chất lượng cao nhất, nén ít nhất, giữ được nhiều chi tiết nhưng kích thước tệp lớn hơn.
  - Giá trị mặc định: `75`. Giá trị này được chọn để cân bằng giữa kích thước tệp và chất lượng hình ảnh, phù hợp cho hầu hết các trường hợp sử dụng mà không cần cấu hình thêm.

- Khi nào nên dùng thuộc tính `quality`? -> Thuộc tính `quality` nên được sử dụng khi bạn muốn:

  - Tối ưu hóa hiệu suất:
    - Giảm kích thước tệp hình ảnh để cải thiện thời gian tải trang, đặc biệt quan trọng cho các trang web có nhiều hình ảnh hoặc nhắm đến người dùng với kết nối mạng chậm.
  - Cân bằng chất lượng và tốc độ:
    - Điều chỉnh chất lượng hình ảnh để phù hợp với mục đích sử dụng (ví dụ: hình ảnh nền không cần chất lượng quá cao, nhưng hình ảnh sản phẩm cần rõ nét).
  - Tối ưu hóa **Core Web Vitals**:
    - Giảm kích thước hình ảnh để cải thiện các chỉ số như **Largest Contentful Paint (LCP)**, giúp tăng thứ hạng **SEO** và trải nghiệm người dùng.
  - Tùy chỉnh theo thiết bị hoặc ngữ cảnh:
    - Kết hợp với thuộc tính `sizes` để phục vụ hình ảnh phù hợp với các thiết bị có độ phân giải khác nhau.

- Dùng giá trị bao nhiêu? -> Việc chọn giá trị `quality` phụ thuộc vào mục tiêu và loại nội dung hình ảnh:

  - `Chất lượng thấp (1-50):`
    - Khi nào dùng: Dùng cho hình ảnh không cần chi tiết cao, như hình nền, hình ảnh trang trí, hoặc khi ưu tiên tốc độ tải trang trên các thiết bị có băng thông thấp.
    - Ví dụ: Hình ảnh thumbnail, biểu tượng nhỏ, hoặc hình ảnh trong các ứng dụng di động nơi kích thước tệp cần được giảm tối đa.
    - Lưu ý: Giá trị quá thấp (ví dụ: 1-30) có thể làm hình ảnh bị pixelated, gây ảnh hưởng xấu đến trải nghiệm người dùng.
  - `Chất lượng trung bình (50-80, mặc định 75):`
    - Khi nào dùng: Phù hợp cho hầu hết các trường hợp, như hình ảnh nội dung chung, bài viết blog, hoặc các trang web thương mại điện tử nơi chất lượng hình ảnh và tốc độ tải đều quan trọng.
    - Ví dụ: Hình ảnh sản phẩm trong danh mục, hình ảnh bài viết, hoặc banner quảng cáo.
    - Lợi ích: Giá trị 75 thường cung cấp sự cân bằng tốt, giữ được độ rõ nét mà không làm tăng kích thước tệp quá nhiều.
  - `Chất lượng cao (80-100):`
    - Khi nào dùng: Dùng cho các hình ảnh yêu cầu chi tiết cao, như ảnh sản phẩm trong các trang chi tiết sản phẩm, ảnh nghệ thuật, hoặc hình ảnh cần hiển thị sắc nét trên màn hình Retina/4K.
    - Ví dụ: Ảnh sản phẩm thời trang, ảnh chụp đồ ăn, hoặc ảnh trong portfolio nhiếp ảnh.
    - Lưu ý: Giá trị cao (gần 100) làm tăng kích thước tệp, có thể ảnh hưởng đến thời gian tải, đặc biệt trên mạng chậm. Chỉ nên dùng khi hình ảnh là yếu tố chính của trải nghiệm người dùng.

- ⚠️ Hình ảnh gốc đã nén: Nếu <u>hình ảnh gốc đã có chất lượng thấp</u>, việc đặt <u>quality cao</u> (ví dụ: 90-100) sẽ <u>không cải thiện chất lượng</u> mà chỉ làm <u>tăng kích thước tệp</u>

👉🏻 `[ fill ]` của `<Image>`:

?

👉🏻 `[ sizes ]` của `<Image>`:

?

👉🏻 `[ height ]` và `[ width ]` của `<Image>`:

?

### Image Optimization Bitmap

👉🏻 **Cách Tối Ưu Hóa Ảnh Gốc (ảnh Bitmap):**

- 1️⃣ _"Chuyển sang WebP"_ (Tùy Chọn):
  - Lossy: Quality 75-85, Effort 4, giữ alpha quality 80-90 (nếu có transparency).
  - Lossless: Dùng cho đồ họa/logo để giữ chi tiết.
- 2️⃣ _"Resize Ảnh"_: điều chỉnh kích thước ảnh gốc về đúng kích thước hiển thị tối đa trên website.
- 3️⃣ _"Nén Ảnh"_: mà không làm mất chất lượng đáng kể.

- 🔑 Công thức dùng _"squoosh"_ của Google:
  - Mục đích:
    - Chuyển ảnh từ `(png)` có _"nền trong suốt"_ sang `(webp)`
    - Không _"resize"_ ảnh, giữ nguyên kích thước ảnh gốc, nhưng có _"nén"_ ảnh
  - Các thông số cấu hình:
    - 📌 _"Edit"_:
      - Resize: ❌ `OFF` (giữ nguyên kích thước)
      - Reduce palette: ❌ `OFF` (giữ đầy đủ màu sắc)
    - 📌 _"Compress"_ -> `WebP`:
      - Lossless: ❌ `UNCHECK` (để giảm file size)
      - Effort: `4` (cân bằng speed/quality)
      - Quality: `75-80` (cho balance tốt) hoặc 85-90 (nếu ảnh quan trọng)
    - 📌 _"Advanced Settings"_:
      - Compress alpha: ✅ `ON` (nén alpha)
      - Alpha quality: `85-90` (vẫn sắc nét, file nhỏ hơn)
      - Alpha filter quality: `1`
      - Auto adjust filter strength: ❌ `OFF` (tự động điều chỉnh cường độ bộ lọc)
      - Filter strength: `40-50` (giảm artifacts, không quá aggressive)
      - Strong filter: ✅ `ON` (bộ lọc mạnh)
      - Filter sharpness: `5-6` (cân bằng giữa crisp và natural)
      - Sharp RGB→YUV conversion: ❌ `OFF` (chuyển đổi RGB→YUV sắc nét)
      - Passes: `1`
      - Spatial noise shaping: `30-40` (giảm processing overhead)
      - Preprocess: `None`
      - Segments: `3` (đủ cho most cases, nhanh hơn)
      - Partitions: `0`
    - ⚠️ **Preserve transparent data**: ✅ CHECK (nếu ảnh có trong suốt - bảo toàn dữ liệu trong suốt)

🏆 **Quy trình tối ưu ảnh (best practice 2025)** ➡️ Để ảnh vừa nhanh vừa đẹp:

- 🔹 Bước 1: <u>Giữ bản gốc</u> chất lượng cao
  - Luôn lưu ảnh gốc (PNG/JPEG) để dễ chỉnh sửa sau này.
- 🔹 Bước 2: `Resize` về kích thước phù hợp
  - Không upload ảnh 4000px nếu web chỉ hiển thị 800px.
  - Dùng <u>Tools</u>:
    - `Sharp` (Node.js)
    - `ImageMagick`
    - `Squoosh`
    - `TinyPng`
    - `Cloudinary`
    - ...
- 🔹 Bước 3: Chuyển sang <u>định dạng modern</u>
  - Ưu tiên: `AVIF` (nhẹ nhất) > `WebP` > `JPEG/PNG`.
    - Nếu ảnh có trong suốt: `PNG` → `WebP/AVIF` (giữ alpha).
    - Nếu ảnh chụp: `JPEG` → `WebP/AVIF` (giảm 30–70%).
- 🔹 Bước 4: Dùng <u>responsive images</u>
  - Với `<img>` sử dụng thuộc tính `srcset` và `sizes` hợp lý
  - Với `<Image>` → Next.js tự sinh nhiều phiên bản (`WebP/AVIF/JPEG` _"fallback"_)
- 🔹 Bước 5: Lazy Loading
  - Dùng `loading="lazy"` (hoặc mặc định của Next.js `<Image>`) để trì hoãn ảnh ngoài `viewport`.

### Image Optimization Vector

👉🏻 **Cách Tối Ưu Hóa Ảnh Gốc (ảnh Vector):**

- Sử dụng Công cụ Tối ưu SVG:
  - `SVGO (SVG Optimizer)`: công cụ phổ biến để nén SVG

## Other Things

### Import

- **Default Import** (Import mặc định)
  - Dùng khi module export một giá trị mặc định duy nhất `(export default)`
  - Bạn có thể đặt tên gì cũng được khi import default
- **Named Imports** (Import theo tên)
  - Dùng khi module export nhiều thứ bằng tên cụ thể `(export const, export function, ...)`
  - Bạn phải dùng đúng tên đã export (hoặc dùng `as` để đổi tên)

### Random

Trong React (hoặc JavaScript nói chung), bạn có thể dùng `Math.random()` để tạo số ngẫu nhiên, rồi **scale** và **dịch chuyển** về khoảng bạn muốn.

- 📌 Tạo số thực ngẫu nhiên:

  ```
  Math.random() * (max - min) + min

  ```

  - `Math.random()` → số ngẫu nhiên _"từ 0 đến < 1"_
  - **(x)** nhân `(max - min)` → **scale** về khoảng độ rộng đơn vị
  - **(+)** cộng min → **dịch chuyển** về vị trí bắt đầu

- 📌 Tạo số nguyên ngẫu nhiên:

  ```
  Math.floor(Math.random() * (max - min + 1)) + min

  ```

⚠️ `Math.random()` là một hàm JavaScript tích hợp sẵn trong môi trường JavaScript, có sẵn trong cả `client-side (trình duyệt)` và `server-side (Node.js, như trong Next.js khi SSR hoặc SSG)`

- Vì vậy, khi bạn gọi `Math.random()` trong một component Next.js, nó sẽ <u>chạy ở cả hai môi trường nếu không được kiểm soát</u>.
- Trong trường hợp component có `"use client"`, code vẫn có thể được pre-render ở server (SSR/SSG) trước khi hydrate ở client, dẫn đến việc Math.random() chạy ở cả hai phía -> **ERROR ❌ Hydration Mismatch 💀**
- Cách đảm bảo `Math.random()` chỉ chạy ở _"client-side"_:
  - Cách 1: Sử dụng **Random** bên trong `useEffect()`
  - Cách 2: Kiểm tra `typeof window` -> Dùng điều kiện `typeof window !== 'undefined'` để đảm bảo code chỉ chạy ở client.
  - Cách 3: Dùng `crypto.getRandomValues()` (an toàn hơn)

👉🏻 Hàm `crypto.getRandomValues()` chỉ chạy ở `client-side (trình duyệt)`, vì nó là một phần của **Web Crypto API (window.crypto)**, không có sẵn trong môi trường `Node.js (server-side)` theo mặc định.

### Unicode

- Kí tự 💻 có tên Unicode là **"Laptop Computer"** với mã Unicode là `U+1F4BB` còn cách viết `\u` trong JS là `\u{1F4BB}`
- Kí tự 🖥️ có tên Unicode là **"Desktop Computer"** với mã Unicode là `U+1F5A5` (`U+FE0F` nếu có variation selector) còn cách viết `\u` trong JS là `\u{1F5A5}` hoặc `\u{1F5A5}\u{FE0F}`
- Kí tự 📱 có tên Unicode là **"Mobile Phone"** với mã Unicode là `U+1F4F1` còn cách viết `\u` trong JS là `{1F4F1}`
- Kí tự 🇻🇳 có tên Unicode là **"Flag: Vietnam"** với mã Unicode là `U+1F1FB U+1F1F3` _(2 Regional Indicator Symbols)_ còn cách viết `\u` trong JS là `\u{1F1FB}\u{1F1F3}`

💡 Lưu ý:

- Một số emoji là kết hợp nhiều mã Unicode (như cờ Việt Nam 🇻🇳 gồm 2 ký tự: `U+1F1FB` + `U+1F1F3`).
- Nếu muốn hiển thị chính xác màu emoji trong HTML, bạn chỉ cần dán thẳng ký tự hoặc dùng `&#xCODE;`.

```
💻 = &#x1F4BB;
🖥️ = &#x1F5A5;&#xFE0F;
📱 = &#x1F4F1;
🇻🇳 = &#x1F1FB;&#x1F1F3;
```

🔑 Dùng `Intl.Segmenter`: (built-in từ ES2022)

- Giúp tách chuỗi thành mảng ký tự hiển thị đúng với emoji nhiều mã.
- Bây giờ 🇻🇳 sẽ được coi là 1 ký tự (thay vì 2).

### Regex

- Regex (Regular Expression) = Biểu thức chính quy.
- Là chuỗi ký tự đặc biệt dùng để tìm kiếm, so khớp, hoặc thay thế mẫu trong văn bản.
- Có trong hầu hết ngôn ngữ lập trình: JS, Python, PHP, Java...

Cấu trúc cơ bản:

| Ký hiệu | Ý nghĩa                       |      |
| ------- | ----------------------------- | ---- |
| `.`     | Bất kỳ ký tự nào              |      |
| `^`     | Bắt đầu chuỗi                 |      |
| `$`     | Kết thúc chuỗi                |      |
| `*`     | Lặp 0 hoặc nhiều lần          |      |
| `+`     | Lặp 1 hoặc nhiều lần          |      |
| `?`     | 0 hoặc 1 lần                  |      |
| `[]`    | Một ký tự trong tập           |      |
| `[^]`   | Một ký tự **không** trong tập |      |
| `{n}`   | Lặp đúng `n` lần              |      |
| `{n,}`  | Lặp ≥ `n` lần                 |      |
| `{n,m}` | Lặp từ `n` đến `m` lần        |      |
| `()`    | Nhóm                          |      |
| \`      | \`                            | Hoặc |
| `\d`    | Số (`[0-9]`)                  |      |
| `\w`    | Ký tự chữ + số + `_`          |      |
| `\s`    | Khoảng trắng                  |      |

### Prompt

- Prompt tạo hình các `'categoryName'` cho **Skill -> Tech Stack**:

```
"Create a minimalist flat-style SVG illustration with a modern UI/UX dashboard aesthetic. Use a harmonious color palette dominated by shades of purple, pink, and blue. The composition should feature 3D-style cards, widgets, or panels arranged in a floating layered layout with soft shadows, rounded corners, and consistent spacing. Include subtle icons or elements that convey the theme of 'categoryName'. Ensure visual balance and use gradients or soft lighting effects to enhance depth and cleanliness. Style should evoke a tech-savvy, futuristic, and professional feel."
```

- Các Prompt lấy công thức chỉnh ảnh bằng tool _"squoosh"_ của Google:

```
Công thức dùng "squoosh" của Google tối ưu. Mục đích chuyển ảnh chụp không có nền trong suốt, từ JPG sang AVIF, có resize ảnh kích thước độ rộng tối đa 1280px, và có nén ảnh mà không làm mất chất lượng đáng kể.
```

- _"Edit"_:
  - `Resize` (Thay đổi kích thước): ✅ `ON`
    - `Method` (Phương pháp): `Lanczos3` (đây là phương pháp tốt nhất cho <u>ảnh chụp thực tế</u>)
    - `Preset` (Cài đặt sẵn): `Custom` (để có thể tùy chỉnh kích thước chính xác)
    - `Width` (Độ rộng): `1280` (theo yêu cầu độ rộng tối đa **1280px**)
    - `Height` (Độ cao): _auto_ ... sẽ tự động điều chỉnh theo tỷ lệ khi bạn đổi `Width`
    - Các tùy chọn khác:
      - `Premultiply alpha channel`: ✅ `ON` (tốt cho chất lượng)
      - `Linear RGB`: ✅ `ON` (màu sắc chính xác hơn)
      - `Maintain aspect ratio`: ✅ `ON` (giữ tỷ lệ ảnh)
  - `Reduce palette` (Giảm bảng màu): ❌ `OFF` (không cần thiết cho ảnh chụp thực tế)
- _"Compress"_: chọn định dạng `AVIF`
  - `Lossless` (Không mất dữ liệu ảnh): ❌ `OFF` (`Lossless` sẽ tạo file rất nặng, không cần thiết cho ảnh chụp)
  - `Quality` (Chất lượng ảnh): `75-80` (mức cân bằng tốt cho ảnh chụp, không làm mất chi tiết)
  - `Effort` (Mức độ nén ảnh): `4` (cho chất lượng nén tốt)
  - Cài đặt nâng cao:
    - `Subsample chroma`: `4:2:0` (tối ưu cho ảnh chụp thông thường)
    - `Sharp YUV Downsampling`: ❌ `OFF` (không cần thiết cho hầu hết ảnh chụp)
    - `Separate alpha quality`: ❌ `OFF` (`JPG` không có `Alpha channel`, không cần)
    - `Extra chroma compression`: ❌ `OFF` (có thể làm giảm chất lượng màu sắc)
    - `Sharpness`: `1-2` (giúp ảnh sau resize sắc nét hơn, khuyến nghị `1` cho ảnh chụp)
    - `Noise synthesis`: `0` (không cần thêm noise cho ảnh thực tế)
    - `Tuning`: `Auto` (để `AVIF` tự động tối ưu)
    - `Log2 of tile rows`: giữ `0` (Giá trị mặc định tốt cho ảnh **1280px**)
    - `Log2 of tile cols`: giữ `0` (Giá trị mặc định tốt cho ảnh **1280px**)

### [ "use client" ]

- Trong App Router (Next.js 13+), **mặc định component là server component**.
- Nếu bạn muốn component đó:
  - <u>Chạy code chỉ có trên `client`</u> (DOM API, state hook…)
  - Dùng các hook như useState, useEffect, useRef…

⇒ Phải thêm `"use client"` ở đầu file.

### [ globe.json ]

- `Mẫu GeoJSON` ban đầu lãnh thổ Việt Nam từ nguồn [Download the globe.json](https://assets.aceternity.com/globe.json)

  ```json
  {
    "type": "Feature",
    "properties": {
      "admin": "Vietnam",
      "name": "Vietnam",
      "continent": "Asia"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [108.05018029178291, 21.55237986906011],
          [106.71506798709007, 20.696850694252014],
          [105.881682163519, 19.752050482659694],
          [105.66200564984628, 19.058165188060567],
          [106.42681684776599, 18.004120998603224],
          [107.36195356651973, 16.69745656988705],
          [108.2694950704296, 16.079742336486145],
          [108.87710656131745, 15.276690578670436],
          [109.33526981001721, 13.42602834721772],
          [109.20013593957395, 11.66685923913776],
          [108.36612999881542, 11.00832062422627],
          [107.22092858279521, 10.36448395430183],
          [106.4051127462034, 9.530839748569317],
          [105.15826378786508, 8.599759629750492],
          [104.79518517458237, 9.2410383162765],
          [105.07620161338559, 9.918490505406806],
          [104.33433475140345, 10.486543687375228],
          [105.19991499229232, 10.889309800658094],
          [106.24967003786944, 10.961811835163585],
          [105.8105237162531, 11.567614650921225],
          [107.49140302941086, 12.337205918827944],
          [107.6145479675624, 13.535530707244202],
          [107.38272749230106, 14.202440904186968],
          [107.56452518110387, 15.202173163305554],
          [107.31270592654558, 15.908538316303177],
          [106.55600792849566, 16.6042839624648],
          [105.925762160264, 17.485315456608955],
          [105.0945984232815, 18.666974595611073],
          [103.8965320170267, 19.2651809758218],
          [104.18338789267891, 19.624668077060214],
          [104.82257368369707, 19.88664175056388],
          [104.43500044150802, 20.758733221921528],
          [103.20386111858643, 20.766562201413745],
          [102.75489627483464, 21.675137233969462],
          [102.17043582561355, 22.464753119389297],
          [102.70699222210008, 22.708795070887668],
          [103.50451460166055, 22.703756618739202],
          [104.47685835166445, 22.81915009204696],
          [105.3292094258866, 23.35206330005691],
          [105.81124718630521, 22.9768924016179],
          [106.72540327354845, 22.794267889898414],
          [106.5672733907353, 22.218204860924768],
          [107.04342003787261, 21.811898912029907],
          [108.05018029178291, 21.55237986906011]
        ]
      ]
    }
  }
  ```

- [Tạo bản đồ Việt Nam gồm 2 quần đảo Trường Sa và Hoàng Sa với react-simple-maps](https://viblo.asia/p/tao-ban-do-viet-nam-gom-2-quan-dao-truong-sa-va-hoang-sa-voi-react-simple-maps-WAyK87wE5xX)

  - [GADM](https://gadm.org/download_country.html)
    - Ở **GADM**, thì dữ liệu trang web này ko bao gồm `Hoàng Sa` và `Trường Sa` ở bản đồ chính `Việt Nam` → _"gadm41_VNM_shp.zip"_.
    - Vì vậy, tiếp tục các bạn tìm thêm:
      - `Paracel Islands (Hoàng Sa)` → _"gadm41_XPI_shp.zip"_
      - `Spratly Islands (Trường Sa)` → _"gadm41_XSP_shp.zip"_
    - Và tải **Shapefile**.
  - [MapShaper](https://mapshaper.org/)
    - Thực hiện **Import** 2 file (.zip) nén vào: _"gadm41_XPI_0"_ ; _"gadm41_XSP_0"_
    - Thực hiện `Simplify` điều chỉnh mức độ chi tiết của bản đồ: giúp đơn giản hóa dữ liệu bản đồ từ **Shapefile** của lãnh thổ Việt Nam, và để sao cho kết quả tương tự như mẫu **GeoJSON Việt Nam** bạn cung cấp (với các tọa độ đã được rút gọn). Bạn cần chọn các thiết lập phù hợp dựa trên đặc điểm của dữ liệu và mục tiêu đơn giản hóa.
      - ✅ **[ Prevent shape removal ]** : Prevent small polygon features from disappearing at high simplification. Keeps the largest ring of multi-ring features.
      - ❌ **[ Use planar geometry ]** : Treat x, y values as Cartesian coordinates on a plane, rather than as longitude, latitude coordinates on a sphere.
      - ❌ **[ Douglas-Peucker ]** : Simplified lines remain within a set distance of original lines. Good for thinning dense points, but spikes tend to form at high simplification.
      - ✅ **[ Visvalingam / effective area ]** : Lines are simplified by iteratively removing the point that forms the least-area triangle with two adjacent points.
      - ❌ **[ Visalingam / weighted area ]** : Points located at the vertex of more acute angles are preferentially removed, for a smoother appearance.
    - Chọn mức `settings = 1%` cho quá trình `Simplify`
    - Cuối cùng thực hiện **Export** ra `file GeoJSON`, nhớ chỉ cần chọn `Layer 0` tương ứng với <u>biên giới quốc gia</u>.
      - Bạn sẽ có 2 file _"gadm41_XPI_0.json"_ (Quần đảo Hoàng Sa) và _"gadm41_XSP_0.json"_ (Quần đảo Trường Sa)

- Dùng AI để bổ sung dữ liệu từ các file trên vào **GeoJSON** gốc của lãnh thổ Việt Nam. Ví dụ, mình dùng `Prompt` như sau...

  ```
  Với 2 file tôi cung cấp, nếu vẫn còn có thể SIMPLIFY, hãy thực hiện, rồi bổ sung dữ liệu đã đơn giản hóa thêm vào JSON gốc.

  Kết quả tạo thành cấu trúc:
  - Đại lục Vietnam (Polygon)
  - Quần đảo Hoàng Sa (MultiPolygon)
  - Quần đảo Trường Sa (MultiPolygon)
  ```

- Quá trình đơn giản hóa:
  - Loại bỏ các tọa độ dư thừa: Giảm từ hàng trăm điểm xuống còn các điểm then chốt cần thiết để duy trì hình dạng cơ bản
  - Làm tròn tọa độ: Từ độ chính xác 14-15 chữ số thập phân xuống 4 chữ số (vẫn đủ chính xác cho việc hiển thị bản đồ)
  - Chỉ giữ lại các đảo lớn nhất:
    - Hoàng Sa: 3 polygon chính thay vì 25 polygon nhỏ
    - Trường Sa: 4 polygon chính thay vì 10+ polygon nhỏ
- JSON mới này bao gồm <u>tổng cộng 8 polygon</u>, thể hiện đầy đủ lãnh thổ Việt Nam bao gồm cả đất liền và các quần đảo trên Biển Đông.

  ```json
  {
    "type": "Feature",
    "properties": {
      "admin": "Vietnam",
      "name": "Vietnam",
      "continent": "Asia"
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [108.05018029178291, 21.55237986906011],
          [106.71506798709007, 20.696850694252014],
          [105.881682163519, 19.752050482659694],
          [105.66200564984628, 19.058165188060567],
          [106.42681684776599, 18.004120998603224],
          [107.36195356651973, 16.69745656988705],
          [108.2694950704296, 16.079742336486145],
          [108.87710656131745, 15.276690578670436],
          [109.33526981001721, 13.42602834721772],
          [109.20013593957395, 11.66685923913776],
          [108.36612999881542, 11.00832062422627],
          [107.22092858279521, 10.36448395430183],
          [106.4051127462034, 9.530839748569317],
          [105.15826378786508, 8.599759629750492],
          [104.79518517458237, 9.2410383162765],
          [105.07620161338559, 9.918490505406806],
          [104.33433475140345, 10.486543687375228],
          [105.19991499229232, 10.889309800658094],
          [106.24967003786944, 10.961811835163585],
          [105.8105237162531, 11.567614650921225],
          [107.49140302941086, 12.337205918827944],
          [107.6145479675624, 13.535530707244202],
          [107.38272749230106, 14.202440904186968],
          [107.56452518110387, 15.202173163305554],
          [107.31270592654558, 15.908538316303177],
          [106.55600792849566, 16.6042839624648],
          [105.925762160264, 17.485315456608955],
          [105.0945984232815, 18.666974595611073],
          [103.8965320170267, 19.2651809758218],
          [104.18338789267891, 19.624668077060214],
          [104.82257368369707, 19.88664175056388],
          [104.43500044150802, 20.758733221921528],
          [103.20386111858643, 20.766562201413745],
          [102.75489627483464, 21.675137233969462],
          [102.17043582561355, 22.464753119389297],
          [102.70699222210008, 22.708795070887668],
          [103.50451460166055, 22.703756618739202],
          [104.47685835166445, 22.81915009204696],
          [105.3292094258866, 23.35206330005691],
          [105.81124718630521, 22.9768924016179],
          [106.72540327354845, 22.794267889898414],
          [106.5672733907353, 22.218204860924768],
          [107.04342003787261, 21.811898912029907],
          [108.05018029178291, 21.55237986906011]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "admin": "Vietnam",
      "name": "Paracel Islands",
      "continent": "Vietnam"
    },
    "geometry": {
      "type": "MultiPolygon",
      "coordinates": [
        [
          [
            [111.2101, 15.79],
            [111.2097, 15.79],
            [111.2094, 15.7903],
            [111.2086, 15.7903],
            [111.2084, 15.7906],
            [111.2081, 15.7906],
            [111.2078, 15.7903],
            [111.2069, 15.7903],
            [111.2069, 15.7902],
            [111.2067, 15.79],
            [111.2061, 15.79],
            [111.2058, 15.7897],
            [111.2053, 15.7897],
            [111.205, 15.79],
            [111.2047, 15.79],
            [111.2044, 15.7897],
            [111.2042, 15.7897],
            [111.2033, 15.7889],
            [111.2031, 15.7889],
            [111.2025, 15.7883],
            [111.2017, 15.7883],
            [111.2014, 15.7881],
            [111.2008, 15.7881],
            [111.2006, 15.7878],
            [111.2003, 15.7878],
            [111.1983, 15.7858],
            [111.1983, 15.7856],
            [111.1978, 15.785],
            [111.1972, 15.785],
            [111.1972, 15.7847],
            [111.1967, 15.7842],
            [111.1967, 15.7839],
            [111.1964, 15.7836],
            [111.1964, 15.7833],
            [111.1961, 15.7831],
            [111.1956, 15.7831],
            [111.1956, 15.7826],
            [111.1956, 15.7825],
            [111.1964, 15.7817],
            [111.1973, 15.7812],
            [111.1975, 15.781],
            [111.1982, 15.7807],
            [111.1987, 15.7804],
            [111.1994, 15.7804],
            [111.2003, 15.7803],
            [111.2014, 15.78],
            [111.2013, 15.7807],
            [111.2013, 15.7811],
            [111.2017, 15.7816],
            [111.2022, 15.7817],
            [111.2027, 15.7815],
            [111.2032, 15.781],
            [111.2032, 15.7804],
            [111.2042, 15.78],
            [111.2056, 15.7803],
            [111.206, 15.7808],
            [111.2065, 15.7809],
            [111.2088, 15.782],
            [111.2092, 15.7831],
            [111.2094, 15.7831],
            [111.21, 15.7836],
            [111.21, 15.7844],
            [111.2103, 15.7847],
            [111.2103, 15.785],
            [111.2108, 15.7856],
            [111.2108, 15.7858],
            [111.2114, 15.7864],
            [111.2114, 15.7867],
            [111.2119, 15.7875],
            [111.2119, 15.7885],
            [111.2112, 15.7892],
            [111.2101, 15.79]
          ]
        ],
        [
          [
            [112.0511, 16.3631],
            [112.0485, 16.3636],
            [112.045, 16.3641],
            [112.0418, 16.3645],
            [112.0378, 16.3649],
            [112.033, 16.3651],
            [112.0282, 16.3649],
            [112.0265, 16.3648],
            [112.0242, 16.3649],
            [112.0205, 16.3638],
            [112.0182, 16.3632],
            [112.016, 16.3629],
            [112.0153, 16.3627],
            [112.0136, 16.3616],
            [112.0129, 16.3612],
            [112.0126, 16.3606],
            [112.0128, 16.3604],
            [112.0137, 16.3604],
            [112.0153, 16.3609],
            [112.0185, 16.3616],
            [112.0213, 16.3621],
            [112.0238, 16.3621],
            [112.0297, 16.3627],
            [112.0318, 16.3632],
            [112.0343, 16.3628],
            [112.0369, 16.363],
            [112.0398, 16.3629],
            [112.043, 16.3627],
            [112.0471, 16.3623],
            [112.0497, 16.3617],
            [112.0512, 16.3614],
            [112.0544, 16.3607],
            [112.0585, 16.3597],
            [112.0621, 16.3584],
            [112.0657, 16.3575],
            [112.069, 16.3567],
            [112.0727, 16.3561],
            [112.0747, 16.3554],
            [112.0773, 16.3549],
            [112.0797, 16.3543],
            [112.0812, 16.3533],
            [112.0832, 16.3523],
            [112.0862, 16.3513],
            [112.0884, 16.3503],
            [112.0894, 16.3502],
            [112.0908, 16.3482],
            [112.0916, 16.3459],
            [112.0923, 16.3439],
            [112.0925, 16.3425],
            [112.0925, 16.3408],
            [112.0919, 16.3389],
            [112.091, 16.3372],
            [112.09, 16.3359],
            [112.0894, 16.3354],
            [112.0887, 16.3351],
            [112.0885, 16.3342],
            [112.0887, 16.3334],
            [112.0896, 16.3337],
            [112.0911, 16.3346],
            [112.0921, 16.3363],
            [112.0931, 16.338],
            [112.0938, 16.3416],
            [112.0944, 16.3442],
            [112.094, 16.3458],
            [112.093, 16.3482],
            [112.0916, 16.3501],
            [112.0906, 16.3513],
            [112.0888, 16.3527],
            [112.0873, 16.3533],
            [112.086, 16.354],
            [112.0834, 16.3549],
            [112.0807, 16.356],
            [112.0789, 16.3567],
            [112.076, 16.3571],
            [112.0728, 16.3579],
            [112.0679, 16.3589],
            [112.0636, 16.36],
            [112.0591, 16.361],
            [112.0551, 16.3621],
            [112.0511, 16.3631]
          ]
        ],
        [
          [
            [112.3083, 16.9661],
            [112.308, 16.9662],
            [112.3078, 16.9664],
            [112.3067, 16.9664],
            [112.3064, 16.9667],
            [112.3056, 16.9667],
            [112.3053, 16.9664],
            [112.3047, 16.9664],
            [112.3045, 16.9662],
            [112.3044, 16.9661],
            [112.3042, 16.9661],
            [112.3039, 16.9658],
            [112.3036, 16.9656],
            [112.3036, 16.965],
            [112.3039, 16.9647],
            [112.3044, 16.9647],
            [112.3047, 16.9644],
            [112.305, 16.9644],
            [112.3053, 16.9642],
            [112.3058, 16.9642],
            [112.3061, 16.9639],
            [112.3067, 16.9639],
            [112.3069, 16.9636],
            [112.3072, 16.9636],
            [112.3075, 16.9633],
            [112.3078, 16.9633],
            [112.3081, 16.9631],
            [112.3083, 16.9631],
            [112.3089, 16.9625],
            [112.3094, 16.9625],
            [112.3097, 16.9622],
            [112.31, 16.9622],
            [112.3103, 16.9619],
            [112.3108, 16.9619],
            [112.3111, 16.9617],
            [112.3114, 16.9617],
            [112.3117, 16.9614],
            [112.3122, 16.9614],
            [112.3125, 16.9611],
            [112.3128, 16.9611],
            [112.3131, 16.9608],
            [112.3133, 16.9608],
            [112.3136, 16.9606],
            [112.3144, 16.9606],
            [112.3147, 16.9603],
            [112.315, 16.9603],
            [112.3153, 16.96],
            [112.3156, 16.96],
            [112.3161, 16.9606],
            [112.3158, 16.9608],
            [112.3158, 16.9614],
            [112.3156, 16.9617],
            [112.315, 16.9617],
            [112.3136, 16.9631],
            [112.3133, 16.9631],
            [112.3125, 16.9639],
            [112.3122, 16.9639],
            [112.3117, 16.9644],
            [112.3114, 16.9644],
            [112.3111, 16.9647],
            [112.3108, 16.9647],
            [112.3106, 16.965],
            [112.3103, 16.965],
            [112.31, 16.9653],
            [112.3097, 16.9653],
            [112.3094, 16.9656],
            [112.3092, 16.9656],
            [112.3089, 16.9658],
            [112.3086, 16.9658],
            [112.3083, 16.9661]
          ]
        ]
      ]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "admin": "Vietnam",
      "name": "Spratly Islands",
      "continent": "Vietnam"
    },
    "geometry": {
      "type": "MultiPolygon",
      "coordinates": [
        [
          [
            [114.4786, 10.3753],
            [114.4803, 10.3736],
            [114.4806, 10.3736],
            [114.4808, 10.3733],
            [114.4811, 10.3736],
            [114.4814, 10.3736],
            [114.4817, 10.3739],
            [114.4817, 10.3747],
            [114.4806, 10.3758],
            [114.4806, 10.3761],
            [114.48, 10.3767],
            [114.4794, 10.3768],
            [114.4789, 10.3767],
            [114.4786, 10.3764],
            [114.4786, 10.3753]
          ]
        ],
        [
          [
            [114.4228, 10.6683],
            [114.4225, 10.6681],
            [114.4225, 10.6675],
            [114.4236, 10.6664],
            [114.4247, 10.6664],
            [114.425, 10.6667],
            [114.4253, 10.6667],
            [114.4253, 10.6669],
            [114.4256, 10.6672],
            [114.4253, 10.6675],
            [114.4253, 10.6678],
            [114.425, 10.6681],
            [114.425, 10.6683],
            [114.4247, 10.6686],
            [114.4247, 10.6689],
            [114.4239, 10.6697],
            [114.4236, 10.6697],
            [114.4228, 10.6689],
            [114.4228, 10.6683]
          ]
        ],
        [
          [
            [115.8025, 10.7311],
            [115.803, 10.7306],
            [115.8033, 10.7302],
            [115.8041, 10.7301],
            [115.8043, 10.7307],
            [115.8043, 10.7313],
            [115.8042, 10.7319],
            [115.8042, 10.7322],
            [115.8044, 10.7325],
            [115.8044, 10.7331],
            [115.8033, 10.7342],
            [115.8028, 10.7342],
            [115.8022, 10.7336],
            [115.8022, 10.7331],
            [115.8019, 10.7328],
            [115.8019, 10.7317],
            [115.8025, 10.7311]
          ]
        ],
        [
          [
            [115.8217, 10.8167],
            [115.8215, 10.8165],
            [115.8214, 10.8158],
            [115.8216, 10.8156],
            [115.8222, 10.8156],
            [115.8231, 10.8164],
            [115.823, 10.8167],
            [115.8228, 10.817],
            [115.8227, 10.8172],
            [115.8223, 10.8173],
            [115.8219, 10.8172],
            [115.8217, 10.8167]
          ]
        ]
      ]
    }
  }
  ```

- Tuy nhiên, vì kích thước các quần đảo quá nhỏ so với kích thước đại lục 😅. Và để hiển thị thấy được trên **Globe** có độ phân giải tương tối (vì cần ưu tiên tính hiệu suất khi render). Nên mình đã thực hiện **SCALE** lãnh thổ các quần đảo lên nhiều lần 🤣.

  - Đầu tiên, mình cần cung cấp data JSON (đã có) của từng nhóm quần đảo vào file _"scale-geometry.js"_.
  - Tiếp theo là chọn hệ số phóng to `(SCALE_FACTOR)`, mình đã chọn:
    - `x100` cho _"Paracel Islands (Hoàng Sa)"_
    - `x300` cho _"Spratly Islands (Trường Sa)"_
  - Sau đó chạy `file (.js)` với lệnh `node scale-geometry.js` để lấy data.
  - Cuối cùng thêm các data GeoJSON đã _"scale"_ trên vào kế bên GeoJSON của _"Đại lục Vietnam"_ trong file `globe.json`.

- Kết quả 💀 (thêm hình ở đây)
