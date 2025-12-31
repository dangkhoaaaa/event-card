'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchGuests,
  fetchStatistics,
  createBulkGuests,
  deleteGuest,
} from '@/store/slices/guestsSlice';
import { fetchCardById } from '@/store/slices/cardsSlice';
import Link from 'next/link';

export default function GuestsManagementPage() {
  const params = useParams();
  const cardId = params.id as string;
  const dispatch = useAppDispatch();

  const { guests, statistics, loading } = useAppSelector(
    (state) => state.guests,
  );
  const { currentCard } = useAppSelector((state) => state.cards);

  const [bulkNames, setBulkNames] = useState('');
  const [showBulkForm, setShowBulkForm] = useState(false);

  useEffect(() => {
    if (cardId) {
      dispatch(fetchCardById(cardId));
      dispatch(fetchGuests(cardId));
      dispatch(fetchStatistics(cardId));
    }
  }, [cardId, dispatch]);

  const handleBulkAdd = async () => {
    if (!bulkNames.trim()) return;

    const names = bulkNames
      .split('\n')
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    if (names.length === 0) return;

    try {
      await dispatch(
        createBulkGuests({
          cardId,
          names,
        }),
      ).unwrap();
      setBulkNames('');
      setShowBulkForm(false);
      dispatch(fetchGuests(cardId));
      dispatch(fetchStatistics(cardId));
    } catch (error) {
      console.error('Error adding guests:', error);
      alert('Có lỗi xảy ra khi thêm khách mời');
    }
  };

  const handleDelete = async (guestId: string) => {
    if (!confirm('Bạn có chắc muốn xóa khách mời này?')) return;

    try {
      await dispatch(deleteGuest(guestId)).unwrap();
      dispatch(fetchGuests(cardId));
      dispatch(fetchStatistics(cardId));
    } catch (error) {
      console.error('Error deleting guest:', error);
      alert('Có lỗi xảy ra khi xóa khách mời');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-dark-900 text-white py-12">
        <div className="container mx-auto px-4">
          <Link
            href={`/cards/${cardId}`}
            className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
          >
            ← Quay lại
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-black mb-2">
            QUẢN LÝ KHÁCH MỜI
          </h1>
          <p className="text-xl text-gray-300">
            {currentCard?.title}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Bulk Add Form */}
        <div className="mb-8">
          <button
            onClick={() => setShowBulkForm(!showBulkForm)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            {showBulkForm ? '✕ Đóng' : '+ Thêm hàng loạt'}
          </button>

          {showBulkForm && (
            <div className="mt-6 bg-dark-50 border-2 border-dark-200 rounded-2xl p-8">
              <h2 className="text-2xl font-display font-bold text-dark-900 mb-4">
                Thêm khách mời hàng loạt
              </h2>
              <p className="text-sm text-dark-600 mb-4">
                Nhập tên khách mời, mỗi tên một dòng:
              </p>
              <textarea
                value={bulkNames}
                onChange={(e) => setBulkNames(e.target.value)}
                placeholder="Nguyễn Văn A&#10;Trần Thị B&#10;Lê Văn C"
                className="w-full h-32 px-4 py-3 border-2 border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white mb-4 font-mono"
              />
              <button
                onClick={handleBulkAdd}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Thêm khách mời
              </button>
            </div>
          )}
        </div>

        {/* Statistics */}
        {statistics && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-dark-900 text-white p-6 rounded-xl text-center">
              <div className="text-3xl font-bold mb-2">{statistics.total}</div>
              <div className="text-sm text-gray-300">Tổng số</div>
            </div>
            <div className="bg-green-600 text-white p-6 rounded-xl text-center">
              <div className="text-3xl font-bold mb-2">{statistics.viewed}</div>
              <div className="text-sm text-green-100">Đã xem</div>
            </div>
            <div className="bg-primary-600 text-white p-6 rounded-xl text-center">
              <div className="text-3xl font-bold mb-2">{statistics.responded}</div>
              <div className="text-sm text-primary-100">Đã phản hồi</div>
            </div>
            <div className="bg-blue-600 text-white p-6 rounded-xl text-center">
              <div className="text-3xl font-bold mb-2">{statistics.attending}</div>
              <div className="text-sm text-blue-100">Sẽ tham gia</div>
            </div>
            <div className="bg-red-600 text-white p-6 rounded-xl text-center">
              <div className="text-3xl font-bold mb-2">{statistics.notAttending}</div>
              <div className="text-sm text-red-100">Không tham gia</div>
            </div>
          </div>
        )}

        {/* Guests Table */}
        <div className="bg-white border-2 border-dark-200 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-dark-200 border-t-primary-600"></div>
              <p className="mt-4 text-dark-600">Đang tải...</p>
            </div>
          ) : guests.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">👥</div>
              <p className="text-xl text-dark-600 mb-2">Chưa có khách mời nào</p>
              <p className="text-dark-500">Thêm khách mời để bắt đầu</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-900 text-white">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold">Tên</th>
                    <th className="text-left py-4 px-6 font-semibold">Email</th>
                    <th className="text-center py-4 px-6 font-semibold">Đã xem</th>
                    <th className="text-center py-4 px-6 font-semibold">Phản hồi</th>
                    <th className="text-center py-4 px-6 font-semibold">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.map((guest, index) => (
                    <tr
                      key={guest._id}
                      className={`border-b border-dark-100 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-dark-50'
                      } hover:bg-primary-50 transition-colors`}
                    >
                      <td className="py-4 px-6 font-medium text-dark-900">
                        {guest.name}
                      </td>
                      <td className="py-4 px-6 text-dark-600">
                        {guest.email || '-'}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {guest.hasViewed ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold">
                            ✓
                          </span>
                        ) : (
                          <span className="text-dark-400">-</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {guest.response ? (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              guest.response === 'attending'
                                ? 'bg-blue-100 text-blue-700'
                                : guest.response === 'not_attending'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {guest.response === 'attending'
                              ? 'Sẽ tham gia'
                              : guest.response === 'not_attending'
                              ? 'Không tham gia'
                              : 'Có thể'}
                          </span>
                        ) : (
                          <span className="text-dark-400">-</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleDelete(guest._id)}
                          className="text-red-600 hover:text-red-800 font-semibold hover:underline transition-colors"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Share Link */}
        {currentCard && (
          <div className="mt-8 bg-primary-50 border-2 border-primary-200 rounded-2xl p-6">
            <p className="text-sm font-semibold text-dark-700 mb-2">
              🔗 Link chia sẻ thiệp:
            </p>
            <div className="bg-white border-2 border-dark-200 rounded-lg p-4 mb-4">
              <p className="text-primary-600 break-all font-mono text-sm">
                {typeof window !== 'undefined' &&
                  `${window.location.origin}/card/${currentCard.slug}`}
              </p>
            </div>
            <p className="text-xs text-dark-600">
              Gửi link này cho khách mời. Khi họ mở link và nhập tên, hệ thống sẽ tự động đánh dấu là đã xem.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
