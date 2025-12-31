'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Template1Page() {
  const [formData, setFormData] = useState({
    title: 'Thư Mời Cưới',
    groomFamilyTitle: 'NHÀ TRAI',
    groomFamilyName1: 'ÔNG CẦN VĂN AN',
    groomFamilyName2: 'BÀ NGUYỄN THỊ HẢI',
    groomFamilyAddress: 'Quận 8, Hồ Chí Minh',
    brideFamilyTitle: 'NHÀ GÁI',
    brideFamilyName1: 'ÔNG CẦN VĂN AN',
    brideFamilyName2: 'BÀ NGUYỄN THỊ HẢI',
    brideFamilyAddress: 'Quận 8, Hồ Chí Minh',
    announcement: 'Trân Trọng Báo Tin Lễ Thành Hôn Của',
    groomName: 'Nguyễn Anh Tú',
    brideName: 'Trần Diệu Nhi',
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Edit Panel */}
      {isEditing && (
        <div className="fixed top-0 right-0 w-96 h-full bg-white border-l-2 border-dark-200 shadow-2xl z-50 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display font-bold text-dark-900">
              Chỉnh sửa
            </h2>
            <button
              onClick={() => setIsEditing(false)}
              className="text-dark-500 hover:text-dark-900 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">
                Tiêu đề
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">
                Tiêu đề nhà trai
              </label>
              <input
                type="text"
                value={formData.groomFamilyTitle}
                onChange={(e) =>
                  setFormData({ ...formData, groomFamilyTitle: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">
                Tên ông nhà trai
              </label>
              <input
                type="text"
                value={formData.groomFamilyName1}
                onChange={(e) =>
                  setFormData({ ...formData, groomFamilyName1: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">
                Tên bà nhà trai
              </label>
              <input
                type="text"
                value={formData.groomFamilyName2}
                onChange={(e) =>
                  setFormData({ ...formData, groomFamilyName2: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">
                Địa chỉ nhà trai
              </label>
              <input
                type="text"
                value={formData.groomFamilyAddress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    groomFamilyAddress: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">
                Tiêu đề nhà gái
              </label>
              <input
                type="text"
                value={formData.brideFamilyTitle}
                onChange={(e) =>
                  setFormData({ ...formData, brideFamilyTitle: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">
                Tên ông nhà gái
              </label>
              <input
                type="text"
                value={formData.brideFamilyName1}
                onChange={(e) =>
                  setFormData({ ...formData, brideFamilyName1: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">
                Tên bà nhà gái
              </label>
              <input
                type="text"
                value={formData.brideFamilyName2}
                onChange={(e) =>
                  setFormData({ ...formData, brideFamilyName2: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">
                Địa chỉ nhà gái
              </label>
              <input
                type="text"
                value={formData.brideFamilyAddress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    brideFamilyAddress: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">
                Thông báo
              </label>
              <input
                type="text"
                value={formData.announcement}
                onChange={(e) =>
                  setFormData({ ...formData, announcement: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">
                Tên chú rể
              </label>
              <input
                type="text"
                value={formData.groomName}
                onChange={(e) =>
                  setFormData({ ...formData, groomName: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">
                Tên cô dâu
              </label>
              <input
                type="text"
                value={formData.brideName}
                onChange={(e) =>
                  setFormData({ ...formData, brideName: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Template Design */}
      <div className="relative min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        {/* Edit Button */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="fixed top-4 right-4 z-40 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105"
        >
          {isEditing ? 'Đóng' : 'Chỉnh sửa'}
        </button>

        {/* Main Card */}
        <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen relative overflow-hidden">
          {/* Red Banner with Double Happiness Symbol */}
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-b from-red-600 to-red-700 flex items-center justify-center">
            <div className="text-white text-6xl font-bold transform -rotate-90 whitespace-nowrap">
              囍
            </div>
          </div>

          {/* Content */}
          <div className="p-8 pr-24">
            {/* Title */}
            <div className="mb-8">
              <h1 className="text-4xl font-serif font-bold text-gray-800 leading-tight">
                {formData.title.split(' ').map((word, i) => (
                  <span key={i} className="block">
                    {word}
                  </span>
                ))}
              </h1>
            </div>

            {/* Groom's Family */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {formData.groomFamilyTitle}
              </h2>
              <p className="text-base text-gray-800">{formData.groomFamilyName1}</p>
              <p className="text-base text-gray-800">{formData.groomFamilyName2}</p>
              <p className="text-sm text-gray-600 mt-1">
                {formData.groomFamilyAddress}
              </p>
            </div>

            {/* Bride's Family */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {formData.brideFamilyTitle}
              </h2>
              <p className="text-base text-gray-800">{formData.brideFamilyName1}</p>
              <p className="text-base text-gray-800">{formData.brideFamilyName2}</p>
              <p className="text-sm text-gray-600 mt-1">
                {formData.brideFamilyAddress}
              </p>
            </div>

            {/* Announcement */}
            <div className="text-center mb-8">
              <p className="text-base text-gray-700 italic">
                {formData.announcement}
              </p>
            </div>

            {/* Couple Names */}
            <div className="text-center mb-8">
              <p className="text-3xl font-cursive text-gray-800 mb-2">
                {formData.groomName}
              </p>
              <span className="text-2xl text-red-600 mx-4">&</span>
              <p className="text-3xl font-cursive text-gray-800 mt-2">
                {formData.brideName}
              </p>
            </div>
          </div>

          {/* Bottom Red Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-red-600"></div>
        </div>
      </div>
    </div>
  );
}



