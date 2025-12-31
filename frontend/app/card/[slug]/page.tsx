'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCardBySlug } from '@/store/slices/cardsSlice';
import { guestApi } from '@/services/api/guestApi';
import Image from 'next/image';

export default function PublicCardPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const dispatch = useAppDispatch();
  const { currentCard, loading } = useAppSelector((state) => state.cards);

  const [guestName, setGuestName] = useState('');
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(fetchCardBySlug(slug));
    }
  }, [slug, dispatch]);

  useEffect(() => {
    if (currentCard && !showCard) {
      // Check if template is frontend template (template2, template3, etc.)
      const template = typeof currentCard.templateId === 'object' ? currentCard.templateId : null;
      if (template && (template as any).design?.type === 'frontend') {
        const componentName = (template as any).design?.component || 'template2';
        // Store guest name and redirect to specific template page
        if (guestName) {
          localStorage.setItem(`guestName_${slug}`, guestName);
        }
        router.push(`/card/${slug}/${componentName}`);
        return;
      }
    }
  }, [currentCard, slug, router, showCard, guestName]);

  const handleViewCard = async () => {
    if (!guestName.trim() || !currentCard) return;

    try {
      await guestApi.markAsViewed(currentCard._id, guestName.trim());
      setShowCard(true);
    } catch (error) {
      console.error('Error marking as viewed:', error);
      setShowCard(true);
    }
  };

  if (loading || !currentCard) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-dark-700 border-t-primary-600"></div>
          <p className="mt-4 text-white">Đang tải thiệp...</p>
        </div>
      </div>
    );
  }

  const template =
    typeof currentCard.templateId === 'object' ? currentCard.templateId : null;

  if (!showCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">💒</div>
            <h2 className="text-3xl font-display font-black text-dark-900 mb-2">
              Thiệp Mời Cưới
            </h2>
            <p className="text-dark-600">
              Vui lòng nhập tên của bạn để xem thiệp mời
            </p>
          </div>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleViewCard()}
            placeholder="Tên của bạn"
            className="w-full px-4 py-4 border-2 border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all mb-6 text-lg"
            autoFocus
          />
          <button
            onClick={handleViewCard}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Xem thiệp →
          </button>
        </div>
      </div>
    );
  }

  // Default template rendering (for old templates)
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="bg-white border-2 border-dark-200 rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-display font-black text-center mb-8 text-dark-900">
            {currentCard.title}
          </h1>

          {template && (
            <div className="mb-8">
              {template.design.backgroundImage && (
                <div className="relative h-96 w-full mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={template.design.backgroundImage}
                    alt="Background"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="space-y-6 mb-8">
                {Object.entries(currentCard.content).map(([key, value]) => {
                  const textStyle = template.design.textStyles[key];
                  if (!textStyle) return null;

                  return (
                    <div
                      key={key}
                      style={{
                        fontFamily: textStyle.fontFamily,
                        fontSize: `${textStyle.fontSize}px`,
                        color: textStyle.color,
                        fontWeight: textStyle.fontWeight,
                      }}
                      className="text-center"
                    >
                      {typeof value === 'string' ? value : value.url}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="text-center mt-12 pt-8 border-t border-dark-200">
            <p className="text-dark-600 text-lg mb-2">
              Người tổ chức: <strong className="text-dark-900">{currentCard.hostName}</strong>
            </p>
            {guestName && (
              <p className="text-dark-500 mt-4">
                Xin chào, <strong className="text-primary-600">{guestName}</strong>! 💕
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
