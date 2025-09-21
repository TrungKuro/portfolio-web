# 🔥 Firebase

```
Firebase hiện có rất nhiều dịch vụ (products) chia theo hai nhóm chính:
  1. Build (xây dựng app)
  2. Run (vận hành & cải thiện trải nghiệm).
```

## 🧱 Nhóm `Build` (dành cho xây dựng app)

1. `App Check` — bảo vệ backend, đảm bảo các request/traffic đến từ app thực sự.

2. `App Hosting` — để deploy app web đầy đủ chức năng, dùng với support nhiều framework.

3. `Authentication` — xác thực người dùng (đăng nhập, signup, etc.).

4. `Cloud Functions` — viết logic phía server/serverless, trigger theo sự kiện.

5. `Cloud Storage` — lưu trữ file (ảnh, video, dữ liệu người dùng upload…).

6. `Data Connect` — kết nối app với PostgreSQL (Cloud SQL), quản lý query dễ dàng.

7. `Extensions` — các gói mã sẵn để thêm chức năng thường gặp nhanh chóng.

8. `Firebase ML (Machine Learning / ML Kit)` — thêm các tính năng machine learning, dùng model tuỳ chỉnh hoặc sẵn sàng dùng.

9. `Firestore` — cơ sở dữ liệu NoSQL theo mô hình document/collection, scale toàn cầu.

10. `Genkit` — framework mã nguồn mở + công cụ dev để xây dựng, thử nghiệm, deploy các tính năng AI.

11. `Hosting` — dành cho web tĩnh (static) + CDN để deploy nhanh các trang web tĩnh.

12. `Realtime Database` — database NoSQL realtime, đồng bộ changes tức thì giữa client-server.

13. `Firebase AI Logic client SDKs` — SDK để tích hợp API Gemini & các tính năng AI khác ngay từ client.

## 🏃🏻 Nhóm `Run` (dành cho theo dõi, vận hành, cải thiện trải nghiệm)

1. `A/B Testing` — thử nghiệm các biến thể UI hoặc tính năng để xem cái nào hiệu quả hơn.

2. `App Distribution` — phân phối bản thử nghiệm app cho tester.

3. `Cloud Messaging` — gửi thông báo / tin nhắn cho người dùng.

4. `Crashlytics` — theo dõi lỗi/crash của app, giúp debugging.

5. `Google Analytics` — phân tích hành vi người dùng, chỉ số app.

6. `In-App Messaging` — gửi thông điệp trong app tới người dùng.

7. `Performance Monitoring` — giám sát hiệu năng app (thời gian phản hồi, tốc độ load…).

8. `Remote Config` — cấu hình/feature flags từ xa, thay đổi hành vi app mà không cần deploy lại.

9. `Test Lab` — test app trên nhiều thiết bị thực để phát hiện lỗi tương thích.

## ⚙️ Dịch vụ sử dụng:

```
🎯 Bài toán:
  - Nội dung (text, cấu hình, link ảnh, v.v.) → được quản lý trong JSON.
  - Ảnh → cần upload lên Firebase để portfolio hiển thị.
  - JSON sẽ chứa URL của ảnh để portfolio fetch.
```

- 🔧 **Firebase** dịch vụ phù hợp:

  - 1️⃣ `Firebase Cloud Storage`

    - Dùng để upload ảnh.
    - Mỗi ảnh sau khi upload có một _"public URL"_ hoặc _"download URL"_ có `token`.
    - Portfolio load ảnh trực tiếp qua URL này.

  - 2️⃣ `Firestore (Cloud Firestore)` hoặc `JSON` trong 1️⃣ `Firebase Cloud Storage`
    - Lưu _"metadata JSON"_ (tên ảnh, link, section nào dùng ảnh nào, text hiển thị...).
    - Ảnh chỉ lưu _"địa chỉ (URL)"_, không nhúng trực tiếp vào `JSON`.

- ✅ Tóm lại
  - **Image** → `Cloud Storage`.
  - **JSON** (chứa URL + nội dung text):
    - Nếu chỉ cần file tĩnh → cũng để trong `Cloud Storage`.
    - Nếu muốn chỉnh sửa linh hoạt → để trong `Firestore`.

## 💵 Chi phí dịch vụ:

Chính sách [`Pricing plans`](https://firebase.google.com/pricing) với tài khoản `No-cost (Spark plan)`:

1. `Cloud Storage`
2. `Cloud Firestore`

### 📊 Bảng chi phí **Firebase Cloud Storage**

| Products                                            | No-cost (Spark plan) | Pay as you go (Blaze plan)                                             |
| --------------------------------------------------- | -------------------- | ---------------------------------------------------------------------- |
| **Legacy bucket (`*.appspot.com`)**                 |                      |                                                                        |
| GB stored                                           | 5 GB                 | No-cost up to 5 GB, sau đó **\$0.026/GB**                              |
| GB downloaded                                       | 1 GB/ngày            | No-cost up to 1 GB/ngày, sau đó **\$0.12/GB**                          |
| Upload operations                                   | 20K/ngày             | No-cost up to 20K/ngày, sau đó **\$0.05/10K ops**                      |
| Download operations                                 | 50K/ngày             | No-cost up to 50K/ngày, sau đó **\$0.004/10K ops**                     |
| Multiple buckets per project                        | ❌                   | ✅                                                                     |
| **Modern bucket (`*.firebasestorage.app` + extra)** |                      |                                                                        |
| GB stored                                           | Không áp dụng        | No-cost up to 5 GB-tháng, sau đó tính theo **Cloud Storage pricing**   |
| GB downloaded                                       | Không áp dụng        | No-cost up to 100 GB/tháng, sau đó tính theo **Cloud Storage pricing** |
| Upload operations                                   | Không áp dụng        | No-cost up to 5K/tháng, sau đó tính theo **Cloud Storage pricing**     |
| Download operations                                 | Không áp dụng        | No-cost up to 50K/tháng, sau đó tính theo **Cloud Storage pricing**    |
| Multiple buckets per project                        | Không áp dụng        | ✅                                                                     |

- 📌 Nhận xét nhanh
  - `Spark (free)`:
    - Chỉ có 1 bucket mặc định `(*.appspot.com)`.
    - Giới hạn khá nhỏ (5 GB storage, 1 GB download/ngày).
  - `Blaze (pay as you go)`:
    - Vẫn free quota nhưng rộng hơn (100 GB download/tháng, 5 GB storage free).
    - Hỗ trợ multiple buckets.
    - Sau khi vượt quota sẽ tính theo Google Cloud Storage giá chuẩn.

```
👉 Với portfolio (ảnh + JSON tĩnh)
    - Spark plan đủ dùng nếu traffic thấp (ít hơn ~1GB download/ngày)
    - Nếu có nhiều traffic (nhiều người truy cập tải ảnh), nên chuyển Blaze để tránh giới hạn
```

### 📊 Bảng chi phí **Firebase Cloud Firestore**

| Products                          | No-cost (Spark plan) | Pay as you go (Blaze plan)                                             |
| --------------------------------- | -------------------- | ---------------------------------------------------------------------- |
| **Standard edition**              |                      |                                                                        |
| Stored data                       | 1 GiB total          | No-cost up to 1 GiB, sau đó theo **Google Cloud pricing**              |
| Network egress                    | 10 GiB/tháng         | No-cost up to 10 GiB/tháng, sau đó theo **Google Cloud pricing**       |
| Document writes                   | 20K writes/ngày      | No-cost up to 20K/ngày, sau đó theo **Google Cloud pricing**           |
| Document reads                    | 50K reads/ngày       | No-cost up to 50K/ngày, sau đó theo **Google Cloud pricing**           |
| Document deletes                  | 20K deletes/ngày     | No-cost up to 20K/ngày, sau đó theo **Google Cloud pricing**           |
| **Enterprise edition**            |                      |                                                                        |
| Stored data                       | 1 GiB total          | No-cost up to 1 GiB, sau đó theo **Enterprise edition pricing**        |
| Network egress                    | 10 GiB/tháng         | No-cost up to 10 GiB/tháng, sau đó theo **Enterprise edition pricing** |
| Document writes (bao gồm deletes) | 40K writes/ngày      | No-cost up to 40K/ngày, sau đó theo **Enterprise edition pricing**     |
| Document reads                    | 50K reads/ngày       | No-cost up to 50K/ngày, sau đó theo **Enterprise edition pricing**     |

- 📌 Nhận xét nhanh
  - `Spark (free)`:
    - Bạn có 1 GiB data, 50K reads/ngày, 20K writes/ngày → đủ cho site portfolio hoặc web nhỏ.
  - `Blaze (pay as you go)`:
    - Có 2 lựa chọn: `Standard` (rẻ hơn) hoặc `Enterprise` (quota lớn hơn, chi phí cao hơn).
    - `Enterprise` cho phép 40K writes/ngày free, nhưng thường dành cho hệ thống lớn.

```
👉 Với portfolio (JSON config + text) thì Spark (free) là quá đủ, vì JSON đọc ít, gần như không có writes.
```
