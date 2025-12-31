# Event Card - Hệ thống quản lý thiệp mời online

Hệ thống tạo và quản lý thiệp mời online với nhiều loại template (cưới hỏi, sinh nhật, kỷ niệm, thôi nôi, v.v.)

## 🚀 Tính năng

- **Template đa dạng**: Hỗ trợ nhiều loại thiệp (cưới, sinh nhật, kỷ niệm, thôi nôi)
- **Tạo thiệp dễ dàng**: Chọn template, nhập thông tin và upload ảnh
- **Quản lý khách mời hàng loạt**: Thêm nhiều khách mời cùng lúc với tên khác nhau
- **Theo dõi trạng thái**: Xem ai đã xem thiệp, ai đã phản hồi
- **Chia sẻ dễ dàng**: Mỗi thiệp có link riêng để chia sẻ
- **Lưu trữ ảnh trên Cloudinary**: Ảnh được tối ưu và lưu trữ an toàn

## 🛠️ Công nghệ

### Backend
- **NestJS** - Framework Node.js
- **MongoDB** - Database
- **Cloudinary** - Image storage
- **TypeScript** - Type safety

### Frontend
- **Next.js 14** - React framework với App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **React Hook Form** - Form handling

## 📁 Cấu trúc dự án

```
EventCard/
├── backend/          # NestJS API
│   ├── src/
│   │   ├── cards/    # Card management
│   │   ├── templates/ # Template management
│   │   ├── guests/   # Guest management
│   │   └── cloudinary/ # Image upload service
│   └── package.json
│
└── frontend/         # Next.js application
    ├── app/          # Next.js App Router pages
    ├── store/        # Redux store
    ├── services/     # API services
    └── types/        # TypeScript types
```

## 🚦 Bắt đầu

### Yêu cầu
- Node.js 18+
- MongoDB
- Tài khoản Cloudinary (miễn phí)

### Backend Setup

```bash
cd backend
npm install

# Tạo file .env từ .env.example
cp .env.example .env

# Cấu hình .env với thông tin của bạn:
# - MONGODB_URI
# - CLOUDINARY_CLOUD_NAME
# - CLOUDINARY_API_KEY
# - CLOUDINARY_API_SECRET

# Seed templates mẫu
npm run seed:templates

# Hoặc tạo Template 1 riêng
npm run create:template1

# Chạy development server
npm run start:dev
```

Backend sẽ chạy tại `http://localhost:3001`

### Frontend Setup

```bash
cd frontend
npm install

# Tạo file .env.local từ .env.local.example
cp .env.local.example .env.local

# Cấu hình .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:3001

# Chạy development server
npm run dev
```

Frontend sẽ chạy tại `http://localhost:3000`

## 📖 Hướng dẫn sử dụng

### 1. Seed Templates Mẫu

Sau khi setup backend, chạy lệnh để tạo các template mẫu:

```bash
cd backend
npm run seed:templates
```

Các template sẽ được tạo bao gồm:
- Thư Mời Cưới Mẫu Đỏ Trắng
- Thư Mời Cưới Mẫu Đồ Trắng
- Thiệp Mời Cưới Phong Bì Đỏ
- Trang Xác Nhận Tham Dự
- Trang Cảm Ơn

### 2. Tạo Thiệp

1. Vào trang `/templates` để chọn template
2. Click vào template muốn dùng
3. Điền thông tin và upload ảnh
4. Click "Tạo thiệp"

### 3. Quản lý Khách Mời

1. Vào trang quản lý thiệp: `/cards/[id]/guests`
2. Click "Thêm hàng loạt"
3. Nhập danh sách tên khách mời (mỗi tên một dòng)
4. Click "Thêm khách mời"

### 4. Chia sẻ Thiệp

Mỗi thiệp có link dạng: `/card/[slug]`
- Gửi link này cho khách mời
- Khi khách mời mở link và nhập tên, hệ thống tự động đánh dấu đã xem

## 🎨 Thiết kế Template

Template được định nghĩa với cấu trúc:
- `textStyles`: Định nghĩa các trường text và style
- `imagePlaceholders`: Định nghĩa vị trí các ảnh
- `backgroundImage` hoặc `backgroundColor`: Nền của thiệp

## 🔐 API Endpoints

### Templates
- `GET /templates` - Lấy danh sách templates (optional ?type=wedding filter)
- `GET /templates/:id` - Lấy template theo ID
- `POST /templates` - Tạo template mới

### Cards
- `GET /cards` - Lấy danh sách cards (optional ?hostName filter)
- `GET /cards/:id` - Lấy card theo ID
- `GET /cards/slug/:slug` - Lấy card theo slug (public)
- `POST /cards` - Tạo card mới
- `PATCH /cards/:id` - Cập nhật card
- `DELETE /cards/:id` - Xóa card

### Guests
- `GET /guests?cardId=xxx` - Lấy danh sách khách mời
- `GET /guests/statistics/:cardId` - Thống kê khách mời
- `POST /guests` - Thêm khách mời đơn lẻ
- `POST /guests/bulk` - Thêm khách mời hàng loạt
- `GET /guests/view/:cardId/:name` - Đánh dấu đã xem
- `DELETE /guests/:id` - Xóa khách mời

## 🎯 Tính năng nổi bật

### Quản lý khách mời thông minh
- Mỗi khách mời có tên riêng
- Tự động theo dõi ai đã xem thiệp
- Thống kê chi tiết về phản hồi

### Template linh hoạt
- Dễ dàng thêm template mới
- Hỗ trợ nhiều loại thiệp
- Tùy chỉnh vị trí text và ảnh

### Clean Code Architecture
- Separation of concerns
- Type-safe với TypeScript
- Modular structure
- Error handling
- Validation với class-validator

## 📝 Ghi chú

- Ảnh được upload lên Cloudinary và tự động tối ưu
- Mỗi card có slug duy nhất để chia sẻ
- Guest name được normalize (trim) để tránh trùng lặp
- Hệ thống tự động đánh dấu guest đã xem khi họ mở link
- Templates mẫu sử dụng placeholder images từ Unsplash, bạn có thể thay thế bằng ảnh thật

## 🤝 Đóng góp

Dự án này được xây dựng với phong cách clean code, dễ mở rộng và bảo trì.

## 📄 License

MIT
# event-card
