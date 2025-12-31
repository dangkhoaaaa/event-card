'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCards } from '@/store/slices/cardsSlice';
import Link from 'next/link';
import Image from 'next/image';

export default function CardsPage() {
  const dispatch = useAppDispatch();
  const { cards, loading } = useAppSelector((state) => state.cards);
  const [hostName, setHostName] = useState('');

  useEffect(() => {
    dispatch(fetchCards(hostName || undefined));
  }, [dispatch, hostName]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-dark-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-display font-black mb-2">
                THIỆP CỦA TÔI
              </h1>
              <p className="text-xl text-gray-300">
                Quản lý và chia sẻ thiệp mời của bạn
              </p>
            </div>
            <Link
              href="/templates"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              + Tạo thiệp mới
            </Link>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-dark-50 border-b border-dark-200 py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-md">
            <label className="block text-sm font-semibold text-dark-700 mb-2">
              Lọc theo tên người tổ chức
            </label>
            <input
              type="text"
              placeholder="Nhập tên để lọc..."
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white"
            />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-dark-200 border-t-primary-600"></div>
            <p className="mt-4 text-dark-600">Đang tải thiệp...</p>
          </div>
        ) : cards.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl text-dark-600 mb-2">Bạn chưa có thiệp nào</p>
            <p className="text-dark-500 mb-8">Tạo thiệp đầu tiên của bạn ngay bây giờ</p>
            <Link
              href="/templates"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Tạo thiệp đầu tiên →
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => {
              const template =
                typeof card.templateId === 'object'
                  ? card.templateId
                  : null;
              return (
                <div
                  key={card._id}
                  className="group bg-white border-2 border-dark-200 rounded-2xl overflow-hidden hover:border-primary-600 transition-all transform hover:scale-105 hover:shadow-xl"
                >
                  {template && (
                    <div className="relative h-64 w-full bg-dark-100 overflow-hidden">
                      <Image
                        src={template.thumbnail}
                        alt={card.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            card.isPublished
                              ? 'bg-green-500 text-white'
                              : 'bg-yellow-500 text-white'
                          }`}
                        >
                          {card.isPublished ? 'Đã xuất bản' : 'Bản nháp'}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display font-bold text-xl text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-dark-500 mb-4">
                      👤 {card.hostName}
                    </p>
                    <div className="flex items-center justify-between text-xs text-dark-400 mb-4">
                      <span>👁️ {card.viewCount} lượt xem</span>
                      <span>📅 {new Date(card.createdAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/cards/${card._id}`}
                        className="flex-1 bg-dark-900 hover:bg-dark-800 text-white px-4 py-2.5 rounded-lg text-center text-sm font-semibold transition-all"
                      >
                        Xem chi tiết
                      </Link>
                      <Link
                        href={`/cards/${card._id}/guests`}
                        className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg text-center text-sm font-semibold transition-all"
                      >
                        Quản lý khách
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
