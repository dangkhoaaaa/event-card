# Hướng dẫn thêm Template mới

Mỗi template là một Next.js page riêng trong thư mục `app/templates/`.

## Cách thêm Template mới

### Bước 1: Tạo thư mục và file page

Tạo thư mục mới cho template:
```bash
mkdir frontend/app/templates/template2
```

Tạo file `page.tsx` trong thư mục đó:
```bash
touch frontend/app/templates/template2/page.tsx
```

### Bước 2: Code template

Copy cấu trúc từ `template1/page.tsx` và chỉnh sửa design theo ý bạn:

```tsx
'use client';

import { useState } from 'react';

export default function Template2Page() {
  const [formData, setFormData] = useState({
    // Các field của bạn
    title: 'Tiêu đề',
    // ...
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Edit Panel */}
      {isEditing && (
        <div className="fixed top-0 right-0 w-96 h-full bg-white border-l-2 border-dark-200 shadow-2xl z-50 overflow-y-auto p-6">
          {/* Form chỉnh sửa */}
        </div>
      )}

      {/* Template Design */}
      <div className="relative min-h-screen">
        {/* Nút chỉnh sửa */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="fixed top-4 right-4 z-40 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
        >
          {isEditing ? 'Đóng' : 'Chỉnh sửa'}
        </button>

        {/* Design của template */}
        <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen">
          {/* Nội dung template */}
        </div>
      </div>
    </div>
  );
}
```

### Bước 3: Thêm vào danh sách templates

Mở file `app/templates/page.tsx` và thêm template mới vào mảng `templates`:

```tsx
const templates = [
  {
    id: 'template1',
    name: 'Template 1',
    description: 'Thiệp cưới truyền thống với banner đỏ và ký tự 囍',
    thumbnail: '💒',
    color: 'bg-red-600',
  },
  {
    id: 'template2',  // ← Thêm template mới
    name: 'Template 2',
    description: 'Mô tả template 2',
    thumbnail: '🎂',
    color: 'bg-blue-600',
  },
];
```

## Cấu trúc Template

Mỗi template nên có:
1. **State management** với `useState` để quản lý form data
2. **Edit panel** (sidebar bên phải) để chỉnh sửa nội dung
3. **Design section** hiển thị thiệp với design đẹp
4. **Responsive design** để hiển thị tốt trên mobile và desktop

## Ví dụ Template 1

Template 1 có:
- Banner đỏ dọc bên phải với ký tự "囍"
- Form chỉnh sửa với tất cả các field
- Design truyền thống Việt Nam
- Responsive và đẹp mắt

Bạn có thể copy và chỉnh sửa từ Template 1 để tạo template mới!



