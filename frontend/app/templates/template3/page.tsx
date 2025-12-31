'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Template3Page() {
  const [formData, setFormData] = useState({
    // Header
    groomName: 'Hải Đăng',
    brideName: 'Tuyết Nhi',
    
    // Groom's Family
    groomFamilyTitle: 'Ông Bà',
    groomFamilyName1: 'Nguyễn Văn Tuấn',
    groomFamilyName2: 'Lê Mỹ Ngọc',
    groomFamilyAddress: 'Hồ Chí Minh',
    
    // Bride's Family
    brideFamilyTitle: 'Ông Bà',
    brideFamilyName1: 'Nguyễn Văn Tuấn',
    brideFamilyName2: 'Lê Mỹ Ngọc',
    brideFamilyAddress: 'Hà Nội',
    
    // Couple Info
    groomFullName: 'Nguyễn Văn Tuấn',
    groomTitle: 'ÚT NAM',
    brideFullName: 'Lê Mỹ Ngọc',
    brideTitle: 'ÚT NỮ',
    
    // Wedding Info
    weddingTime: '23:30',
    weddingDay: 'THỨ BẢY',
    weddingDate: '18',
    weddingMonth: 'THÁNG 10',
    weddingYear: '2025',
    lunarDate: 'Tức ngày 27/08 Ất Tỵ',
    
    // Venue
    venueAddress: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    
    // Messages
    thankYouMessage: 'Cảm ơn tất cả tình cảm của cô dì chú bác, bạn bè và anh chị em đã dành cho Hải Đăng & Tuyết Nhi!',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [guestbookMessages, setGuestbookMessages] = useState([
    {
      name: 'A Thành',
      message: 'Mong hai em luôn giữ được yêu thương như ngày đầu về chung một nhà.',
      time: '18:57:21 18/12/2025',
    },
    {
      name: 'LD Thường',
      message: 'Chúc hai em trăm năm hạnh phúc, vợ chồng đồng lòng',
      time: '18:56:58 18/12/2025',
    },
  ]);
  const [newMessage, setNewMessage] = useState({ name: '', message: '' });

  const handleSubmitMessage = () => {
    if (newMessage.name && newMessage.message) {
      const message = {
        ...newMessage,
        time: new Date().toLocaleString('vi-VN'),
      };
      setGuestbookMessages([message, ...guestbookMessages]);
      setNewMessage({ name: '', message: '' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Edit Panel */}
      {isEditing && (
        <div className="fixed top-0 right-0 w-96 h-full bg-white border-l-2 border-dark-200 shadow-2xl z-50 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display font-bold text-dark-900">
              Chỉnh sửa Template 3
            </h2>
            <button
              onClick={() => setIsEditing(false)}
              className="text-dark-500 hover:text-dark-900 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-dark-700 mt-4 mb-2">Header</h3>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Tên chú rể</label>
              <input
                type="text"
                value={formData.groomName}
                onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Tên cô dâu</label>
              <input
                type="text"
                value={formData.brideName}
                onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>

            <h3 className="font-semibold text-dark-700 mt-6 mb-2">Nhà trai</h3>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Tiêu đề</label>
              <input
                type="text"
                value={formData.groomFamilyTitle}
                onChange={(e) => setFormData({ ...formData, groomFamilyTitle: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Tên ông</label>
              <input
                type="text"
                value={formData.groomFamilyName1}
                onChange={(e) => setFormData({ ...formData, groomFamilyName1: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Tên bà</label>
              <input
                type="text"
                value={formData.groomFamilyName2}
                onChange={(e) => setFormData({ ...formData, groomFamilyName2: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Địa chỉ</label>
              <input
                type="text"
                value={formData.groomFamilyAddress}
                onChange={(e) => setFormData({ ...formData, groomFamilyAddress: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>

            <h3 className="font-semibold text-dark-700 mt-6 mb-2">Nhà gái</h3>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Tiêu đề</label>
              <input
                type="text"
                value={formData.brideFamilyTitle}
                onChange={(e) => setFormData({ ...formData, brideFamilyTitle: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Tên ông</label>
              <input
                type="text"
                value={formData.brideFamilyName1}
                onChange={(e) => setFormData({ ...formData, brideFamilyName1: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Tên bà</label>
              <input
                type="text"
                value={formData.brideFamilyName2}
                onChange={(e) => setFormData({ ...formData, brideFamilyName2: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Địa chỉ</label>
              <input
                type="text"
                value={formData.brideFamilyAddress}
                onChange={(e) => setFormData({ ...formData, brideFamilyAddress: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>

            <h3 className="font-semibold text-dark-700 mt-6 mb-2">Thông tin tiệc cưới</h3>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Giờ</label>
              <input
                type="text"
                value={formData.weddingTime}
                onChange={(e) => setFormData({ ...formData, weddingTime: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Ngày</label>
              <input
                type="text"
                value={formData.weddingDate}
                onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Tháng</label>
              <input
                type="text"
                value={formData.weddingMonth}
                onChange={(e) => setFormData({ ...formData, weddingMonth: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Năm</label>
              <input
                type="text"
                value={formData.weddingYear}
                onChange={(e) => setFormData({ ...formData, weddingYear: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Ngày âm lịch</label>
              <input
                type="text"
                value={formData.lunarDate}
                onChange={(e) => setFormData({ ...formData, lunarDate: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Địa chỉ</label>
              <input
                type="text"
                value={formData.venueAddress}
                onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Image Gallery Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-3xl z-10"
            >
              ×
            </button>
            <div className="bg-white rounded-lg p-4">
              <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-400">Ảnh {selectedImage + 1}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Design */}
      <div className="relative">
        {/* Edit Button */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="fixed top-4 right-4 z-40 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105"
        >
          {isEditing ? 'Đóng' : 'Chỉnh sửa'}
        </button>

        {/* Section 1: Header with Names */}
        <section className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-800 mb-4">
              {formData.groomName}
            </h1>
            <p className="text-4xl text-gray-600 mb-4">&</p>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-800">
              {formData.brideName}
            </h1>
          </div>
        </section>

        {/* Section 2: Photo Album */}
        <section className="min-h-screen bg-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-display font-bold text-center text-gray-800 mb-12">
              ALBUM ẢNH CƯỚI
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(i - 1)}
                  className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg cursor-pointer hover:scale-105 transition-transform flex items-center justify-center shadow-lg"
                >
                  <span className="text-gray-600 font-semibold">Ảnh cưới {i}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Family Info */}
        <section className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Groom's Family */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {formData.groomFamilyTitle}
                </h3>
                <p className="text-xl text-gray-700 mb-2">{formData.groomFamilyName1}</p>
                <p className="text-xl text-gray-700 mb-2">{formData.groomFamilyName2}</p>
                <p className="text-lg text-gray-600">{formData.groomFamilyAddress}</p>
              </div>

              {/* Bride's Family */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {formData.brideFamilyTitle}
                </h3>
                <p className="text-xl text-gray-700 mb-2">{formData.brideFamilyName1}</p>
                <p className="text-xl text-gray-700 mb-2">{formData.brideFamilyName2}</p>
                <p className="text-lg text-gray-600">{formData.brideFamilyAddress}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Main Announcement */}
        <section className="min-h-screen bg-white py-12 flex items-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              TRÂN TRỌNG BÁO TIN
            </h2>
            <p className="text-2xl md:text-3xl text-gray-700 mb-12">
              LỄ THÀNH HÔN CỦA CON CHÚNG TÔI
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-2">
                  {formData.groomFullName}
                </h3>
                <p className="text-xl text-gray-600">{formData.groomTitle}</p>
              </div>

              <p className="text-4xl text-gray-400">&</p>

              <div>
                <h3 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-2">
                  {formData.brideFullName}
                </h3>
                <p className="text-xl text-gray-600">{formData.brideTitle}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Wedding Date & Time */}
        <section className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 py-12 flex items-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              TIỆC CƯỚI DIỄN RA VÀO LÚC
            </h2>
            
            <div className="bg-white rounded-2xl p-8 shadow-2xl mb-6">
              <p className="text-5xl md:text-6xl font-bold text-primary-600 mb-4">
                {formData.weddingTime}
              </p>
              <div className="text-2xl md:text-3xl text-gray-700">
                <p className="font-semibold">{formData.weddingDay}</p>
                <p className="text-4xl md:text-5xl font-bold text-gray-800 my-2">
                  {formData.weddingDate}
                </p>
                <p className="font-semibold">{formData.weddingMonth}</p>
                <p className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
                  {formData.weddingYear}
                </p>
                <p className="text-lg text-gray-600 mt-4">({formData.lunarDate})</p>
              </div>
            </div>

            <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold">
              Thêm vào Calendar
            </button>
          </div>
        </section>

        {/* Section 6: Venue & Map */}
        <section className="min-h-screen bg-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
              TIỆC CƯỚI SẼ TỔ CHỨC TẠI
            </h2>
            
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 shadow-xl mb-6">
              <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                {formData.venueAddress}
              </p>
              
              <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">BẢN ĐỒ</h3>
              
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-500">Bản đồ sẽ được hiển thị ở đây</span>
              </div>
              
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold">
                Xem Chỉ Đường
              </button>
            </div>

            <p className="text-center text-xl text-gray-700 italic">
              Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!
            </p>
          </div>
        </section>

        {/* Section 7: Guestbook */}
        <section className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-display font-bold text-center text-gray-800 mb-4">
              SỔ LƯU BÚT
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Cảm ơn bạn rất nhiều vì đã gửi những lời chúc mừng tốt đẹp nhất đến đám cưới của chúng tôi!
            </p>

            {/* Message Form */}
            <div className="bg-white rounded-2xl p-6 shadow-xl mb-8">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Tên của bạn"
                  value={newMessage.name}
                  onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
                <textarea
                  placeholder="Lời chúc của bạn..."
                  value={newMessage.message}
                  onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg h-32 focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={handleSubmitMessage}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  GỬI LỜI CHÚC
                </button>
              </div>
            </div>

            {/* Messages List */}
            <div className="space-y-4">
              {guestbookMessages.map((msg, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-gray-800">{msg.name}</p>
                    <p className="text-sm text-gray-500">{msg.time}</p>
                  </div>
                  <p className="text-gray-700">{msg.message}</p>
                </div>
              ))}
            </div>

            {/* Thank You Message */}
            <div className="mt-12 text-center">
              <p className="text-xl text-gray-700 italic">{formData.thankYouMessage}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}



