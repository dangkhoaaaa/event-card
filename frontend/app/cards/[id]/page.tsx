'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCardById } from '@/store/slices/cardsSlice';
import Link from 'next/link';

export default function CardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentCard, loading } = useAppSelector((state) => state.cards);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchCardById(params.id as string));
    }
  }, [params.id, dispatch]);

  if (loading || !currentCard) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-dark-700 border-t-primary-600"></div>
          <p className="mt-4 text-white">Đang tải...</p>
        </div>
      </div>
    );
  }

  const template =
    typeof currentCard.templateId === 'object' ? currentCard.templateId : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-dark-900 text-white py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/cards"
            className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
          >
            ← Quay lại danh sách
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-black mb-2">
            {currentCard.title}
          </h1>
          <p className="text-xl text-gray-300">Người tổ chức: {currentCard.hostName}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="bg-white border-2 border-dark-200 rounded-2xl p-8 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-display font-bold text-dark-900">
              Thông tin thiệp
            </h2>
            <Link
              href={`/cards/${currentCard._id}/guests`}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Quản lý khách mời
            </Link>
          </div>

          {template && (
            <div className="mb-6 p-6 bg-dark-50 rounded-xl">
              <h3 className="text-xl font-display font-semibold mb-4 text-dark-900">
                Nội dung thiệp
              </h3>
              <div className="space-y-3">
                {Object.entries(currentCard.content).map(([key, value]) => (
                  <div key={key} className="flex items-start">
                    <span className="font-semibold text-dark-700 min-w-[120px]">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                    </span>
                    <span className="text-dark-900 flex-1">
                      {typeof value === 'string' ? value : value.url}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-dark-200">
            <div>
              <span className="text-sm text-dark-500 block mb-1">Lượt xem</span>
              <span className="text-2xl font-bold text-dark-900">{currentCard.viewCount}</span>
            </div>
            <div>
              <span className="text-sm text-dark-500 block mb-1">Trạng thái</span>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  currentCard.isPublished
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {currentCard.isPublished ? 'Đã xuất bản' : 'Bản nháp'}
              </span>
            </div>
            <div>
              <span className="text-sm text-dark-500 block mb-1">Ngày tạo</span>
              <span className="text-sm font-medium text-dark-900">
                {new Date(currentCard.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>
            <div>
              <span className="text-sm text-dark-500 block mb-1">Link chia sẻ</span>
              <a
                href={`${typeof window !== 'undefined' ? window.location.origin : ''}/card/${currentCard.slug}`}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium break-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                Xem link →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
