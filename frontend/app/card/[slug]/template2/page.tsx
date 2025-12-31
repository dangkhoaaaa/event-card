'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCardBySlug } from '@/store/slices/cardsSlice';
import { markAsViewed } from '@/services/api/guestApi';
import Image from 'next/image';
import { TEMPLATE2_DECORATIVE_IMAGES } from '@/app/templates/template2/constants';
import { AnimatedText } from '@/app/templates/template2/components/AnimatedText';
import { AnimatedImage } from '@/app/templates/template2/components/AnimatedImage';

export default function PublicTemplate2Page() {
  const params = useParams();
  const slug = params.slug as string;
  const dispatch = useAppDispatch();
  const { currentCard, loading } = useAppSelector((state) => state.cards);

  const [guestName, setGuestName] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(fetchCardBySlug(slug));
      // Get guest name from localStorage if exists
      const savedName = localStorage.getItem(`guestName_${slug}`);
      if (savedName) {
        setGuestName(savedName);
        setShowCard(true);
      }
    }
  }, [slug, dispatch]);

  const handleViewCard = async () => {
    if (!guestName.trim() || !currentCard) return;

    try {
      await markAsViewed(currentCard._id, guestName.trim());
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

  const content = currentCard.content || {};

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

  const getImageUrl = (key: string): string | null => {
    const value = content[key];
    if (value && typeof value === 'object' && 'url' in value) {
      return value.url;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Red Envelope */}
      <section className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4 overflow-hidden relative">
        {/* Background decorative image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src={TEMPLATE2_DECORATIVE_IMAGES.background1}
            alt="Background decorative"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="max-w-md w-full text-center relative z-10">
          <AnimatedText animationType="fadeIn" delay={0}>
            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">
              {content.invitationTitle || 'THIỆP'}
            </h1>
          </AnimatedText>
          <AnimatedText animationType="slideUp" delay={200}>
            <p className="text-4xl font-cursive text-gray-800 mb-8">
              {content.invitationSubtitle || 'Mời Cưới'}
            </p>
          </AnimatedText>
          
          {/* Red Envelope */}
          <div 
            className="relative mx-auto w-80 h-96 mb-8 cursor-pointer"
            onClick={() => setIsEnvelopeOpen(!isEnvelopeOpen)}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-red-600 to-red-700 rounded-lg shadow-2xl transform rotate-1"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-red-700 to-red-800 rounded-lg shadow-xl"></div>
            
            {/* Envelope Flap - Mở ra khi click */}
            <div 
              className={`absolute top-0 left-0 right-0 h-32 bg-red-800 rounded-t-lg transform origin-top transition-all duration-1000 ease-out ${
                isEnvelopeOpen 
                  ? 'transform rotate-[-180deg] opacity-0' 
                  : 'transform -skew-y-1 opacity-100'
              }`}
            ></div>
            
            {/* Wax Seal - Ẩn khi mở */}
            <div 
              className={`absolute top-20 right-8 w-16 h-16 bg-amber-800 rounded-full border-4 border-amber-900 shadow-lg flex items-center justify-center transition-all duration-500 ${
                isEnvelopeOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`}
            >
              <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🌳</span>
              </div>
            </div>
            
            {/* Photo - Hiển thị khi mở */}
            <div 
              className={`absolute top-32 left-4 right-4 bottom-16 bg-white rounded-lg shadow-inner overflow-hidden transition-all duration-1000 ${
                isEnvelopeOpen 
                  ? 'opacity-100 scale-100 transform translate-y-0' 
                  : 'opacity-0 scale-95 transform translate-y-4'
              }`}
            >
              {getImageUrl('envelopePhoto') ? (
                <div className="relative w-full h-full">
                  <Image
                    src={getImageUrl('envelopePhoto')!}
                    alt="Envelope photo"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  Ảnh cô dâu chú rể
                </div>
              )}
            </div>
            
            {/* Hint text khi chưa mở */}
            {!isEnvelopeOpen && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm font-semibold animate-pulse">
                👆 Click để mở thiệp
              </div>
            )}
          </div>
          
          {/* Names */}
          <AnimatedText animationType="slideLeft" delay={400}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <p className="text-2xl font-cursive text-gray-800">{content.groomName || 'Anh Từ'}</p>
              <span className="text-red-600 text-2xl animate-pulse-slow">❤</span>
              <p className="text-2xl font-cursive text-gray-800">{content.brideName || 'Diệu Nhi'}</p>
            </div>
          </AnimatedText>
          
          {/* Date */}
          <AnimatedText animationType="slideRight" delay={600}>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{content.weddingDate || '31.03'}</p>
              <p className="text-xl text-gray-700">{content.weddingYear || '2025'}</p>
            </div>
          </AnimatedText>
          
          {/* Double Dragon decorative */}
          <div className="absolute bottom-4 left-4 opacity-30">
            <Image
              src={TEMPLATE2_DECORATIVE_IMAGES.doubleDragon}
              alt="Double dragon"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          {/* Double Happiness Symbol */}
          <div className="absolute bottom-4 right-4 text-pink-200 text-4xl">囍</div>
        </div>
      </section>

      {/* Section 2: Main Invitation with Red Banner */}
      <section className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src={TEMPLATE2_DECORATIVE_IMAGES.nen2}
            alt="Background"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="max-w-md w-full bg-white shadow-2xl min-h-screen relative overflow-hidden">
          {/* Decorative left border */}
          <div className="absolute top-0 left-0 w-16 h-full opacity-30">
            <Image
              src={TEMPLATE2_DECORATIVE_IMAGES.nen}
              alt="Decorative border"
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          {/* Red Banner */}
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-b from-red-600 to-red-700 flex items-center justify-center">
            <div className="text-white text-6xl font-bold transform -rotate-90 whitespace-nowrap">
              囍
            </div>
          </div>

          <div className="p-8 pr-24">
            <AnimatedText animationType="fadeIn" delay={0}>
              <h1 className="text-4xl font-serif font-bold text-gray-800 mb-8 leading-tight">
                {(content.mainTitle || 'Thư Mời Cưới').split(' ').map((word: string, i: number) => (
                  <AnimatedText key={i} animationType="slideUp" delay={i * 100}>
                    <span className="block">{word}</span>
                  </AnimatedText>
                ))}
              </h1>
            </AnimatedText>

            {/* Groom's Family */}
            <AnimatedText animationType="slideLeft" delay={200}>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-2">{content.groomFamilyTitle || 'NHÀ TRAI'}</h2>
                <p className="text-base text-gray-800">{content.groomFamilyName1 || ''}</p>
                <p className="text-base text-gray-800">{content.groomFamilyName2 || ''}</p>
                <p className="text-sm text-gray-600 mt-1">{content.groomFamilyAddress || ''}</p>
              </div>
            </AnimatedText>

            {/* Bride's Family */}
            <AnimatedText animationType="slideRight" delay={300}>
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-2">{content.brideFamilyTitle || 'NHÀ GÁI'}</h2>
                <p className="text-base text-gray-800">{content.brideFamilyName1 || ''}</p>
                <p className="text-base text-gray-800">{content.brideFamilyName2 || ''}</p>
                <p className="text-sm text-gray-600 mt-1">{content.brideFamilyAddress || ''}</p>
              </div>
            </AnimatedText>

            {/* Announcement */}
            <AnimatedText animationType="fadeIn" delay={400}>
              <div className="text-center mb-8">
                <p className="text-base text-gray-700 italic">{content.announcement || 'Trân Trọng Báo Tin Lễ Thành Hôn Của'}</p>
              </div>
            </AnimatedText>

            {/* Couple Names */}
            <AnimatedText animationType="scale" delay={400}>
              <div className="text-center mb-8">
                <p className="text-3xl font-cursive text-gray-800 mb-2">{content.groomNameFull || 'Nguyễn Anh Tú'}</p>
                <span className="text-2xl text-red-600 mx-4 animate-fadeInOut">&</span>
                <p className="text-3xl font-cursive text-gray-800 mt-2">{content.brideNameFull || 'Trần Diệu Nhi'}</p>
              </div>
            </AnimatedText>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-2 bg-red-600"></div>
        </div>
      </section>

      {/* Section 3: Photo Gallery */}
      <section className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4 overflow-hidden relative">
        {/* Background decorative */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src={TEMPLATE2_DECORATIVE_IMAGES.rong}
            alt="Dragon decorative"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="max-w-4xl mx-auto py-12 relative z-10">
          {/* Decorative phoenix at top */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 opacity-20">
            <Image
              src={TEMPLATE2_DECORATIVE_IMAGES.phung}
              alt="Phoenix decorative"
              width={120}
              height={60}
              className="object-contain"
            />
          </div>
          <AnimatedText animationType="fadeIn" delay={0}>
            <h2 className="text-3xl font-display font-bold text-center text-gray-800 mb-8">
              Khoảnh Khắc Đẹp
            </h2>
          </AnimatedText>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center text-gray-400"
              >
                Ảnh {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Main Photo with Text */}
      <section className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4 overflow-hidden relative">
        {/* Background decorative */}
        <div className="absolute inset-0 opacity-15">
          <Image
            src={TEMPLATE2_DECORATIVE_IMAGES.nen2}
            alt="Background"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {/* Decorative dragons at corners */}
        <div className="absolute top-4 left-4 opacity-20">
          <Image
            src={TEMPLATE2_DECORATIVE_IMAGES.doubleDragon}
            alt="Dragon decorative"
            width={60}
            height={60}
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-4 right-4 opacity-20">
          <Image
            src={TEMPLATE2_DECORATIVE_IMAGES.doubleDragon}
            alt="Dragon decorative"
            width={60}
            height={60}
            className="object-contain rotate-180"
          />
        </div>
        <div className="max-w-md w-full relative z-10">
          {/* Names */}
          <AnimatedText animationType="fadeIn" delay={0}>
            <div className="text-center mb-6">
              <p className="text-3xl font-cursive text-white mb-2">{content.groomNameFull || 'Nguyễn Anh Tú'}</p>
              <span className="text-2xl text-white mx-4 animate-pulse-slow">&</span>
              <p className="text-3xl font-cursive text-white">{content.brideNameFull || 'Trần Diệu Nhi'}</p>
            </div>
          </AnimatedText>

          {/* Main Photo */}
          <AnimatedImage animationType="scale" delay={200}>
            <div className="relative w-full h-96 mb-6 border-4 border-red-700 rounded-lg overflow-hidden">
              {getImageUrl('mainPhoto') ? (
                <div className="relative w-full h-full">
                  <Image
                    src={getImageUrl('mainPhoto')!}
                    alt="Main photo"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 bg-red-700 flex items-center justify-center">
                  <div className="text-white text-sm">Ảnh cô dâu chú rể</div>
                </div>
              )}
            </div>
          </AnimatedImage>

          {/* Invitation Text */}
          <AnimatedText animationType="slideUp" delay={300}>
            <p className="text-2xl font-cursive text-white text-center mb-8">
              {content.invitationText || 'Trân Trọng Kính Mời'}
            </p>
          </AnimatedText>

          {/* Three Small Photos */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[1, 2, 3].map((i) => {
              const photoKey = `photo${i}`;
              const photoUrl = getImageUrl(photoKey);
              return (
                <AnimatedImage key={i} animationType="zoomIn" delay={400 + i * 100}>
                  <div className="relative aspect-square bg-red-700 border-2 border-red-800 rounded-lg overflow-hidden">
                    {photoUrl ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={photoUrl}
                          alt={`Photo ${i}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 33vw, 100px"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-white text-xs">Ảnh {i}</div>
                      </div>
                    )}
                  </div>
                </AnimatedImage>
              );
            })}
          </div>

          {/* Celebration Text */}
          <AnimatedText animationType="fadeIn" delay={500}>
            <p className="text-lg font-cursive text-white text-center mb-8 animate-fadeInOut">
              {content.celebrationText || 'MỪNG LỄ THÀNH'}
            </p>
          </AnimatedText>

          {/* Wedding Date & Time Display */}
          <WeddingDateTime 
            weddingTime={content.weddingTime || '10 giờ 00'}
            weddingDate={content.weddingDate || '31.03'}
            weddingYear={content.weddingYear || '2025'}
            weddingDay={content.weddingDay}
          />

          {/* Calendar */}
          <WeddingCalendar 
            weddingDate={content.weddingDate || '31.03'} 
            weddingYear={content.weddingYear || '2025'} 
          />
        </div>
      </section>

      {/* Section 5: Thank You */}
      <section className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4 overflow-hidden relative">
        {/* Background decorative */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src={TEMPLATE2_DECORATIVE_IMAGES.background1}
            alt="Background decorative"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {/* Decorative phoenix */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 opacity-25">
          <Image
            src={TEMPLATE2_DECORATIVE_IMAGES.phung}
            alt="Phoenix decorative"
            width={150}
            height={75}
            className="object-contain"
          />
        </div>
        <div className="max-w-md w-full text-center relative z-10">
          {/* Two Small Photos */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[1, 2].map((i) => {
              const photoKey = `thankPhoto${i}`;
              const photoUrl = getImageUrl(photoKey);
              return (
                <AnimatedImage key={i} animationType="zoomIn" delay={i * 200}>
                  <div className="relative aspect-square bg-white rounded-lg shadow-lg overflow-hidden">
                    {photoUrl ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={photoUrl}
                          alt={`Thank photo ${i}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 150px"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        Ảnh {i}
                      </div>
                    )}
                  </div>
                </AnimatedImage>
              );
            })}
          </div>

          {/* Main Photo */}
          <AnimatedImage animationType="scale" delay={400}>
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden shadow-2xl">
              {getImageUrl('thankMainPhoto') ? (
                <div className="relative w-full h-full">
                  <Image
                    src={getImageUrl('thankMainPhoto')!}
                    alt="Thank you main photo"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
                  <div className="text-gray-400">Ảnh cô dâu chú rể</div>
                </div>
              )}
            </div>
          </AnimatedImage>

          {/* Thank You Banner */}
          <AnimatedText animationType="scale" delay={0}>
            <div className="bg-pink-500 rounded-lg p-8 mb-4">
              <p className="text-5xl font-cursive text-white mb-4 animate-fadeInOut">{content.thankYouText || 'thankyou'}</p>
              <p className="text-xl font-cursive text-white">{content.thankYouMessage || 'Rất hân hạnh, được đón tiếp!'}</p>
            </div>
          </AnimatedText>
        </div>
      </section>

      {/* Section 6: RSVP with Map */}
      <section className="min-h-screen bg-white overflow-hidden">
        <div className="max-w-md mx-auto">
          {/* Venue Info */}
          <div className="p-6 bg-white">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{content.venueName || 'The ADORA Center'}</h2>
            <p className="text-gray-600 mb-4">{content.venueAddress || ''}</p>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold">
              Xem Chỉ Đường
            </button>
          </div>

          {/* Map */}
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            <div className="text-gray-400">Bản đồ</div>
          </div>

          {/* RSVP Form */}
          <div className="bg-red-800 p-6">
            <h3 className="text-xl font-bold text-white mb-6">{content.rsvpTitle || 'Xác Nhận Tham Dự & Gửi Lời Chúc'}</h3>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Tên của bạn là?"
                className="w-full px-4 py-3 rounded-lg"
              />
              <input
                type="text"
                placeholder="Bạn là gì của Dâu Rể nhỉ?"
                className="w-full px-4 py-3 rounded-lg"
              />
              <textarea
                placeholder="Gửi lời chúc đến Dâu Rể nhé!"
                className="w-full px-4 py-3 rounded-lg h-24"
              />
              <select className="w-full px-4 py-3 rounded-lg">
                <option>Bạn Có Tham Dự Không?</option>
                <option>Có</option>
                <option>Không</option>
                <option>Có thể</option>
              </select>
              
              <button className="w-full bg-red-900 hover:bg-red-950 text-white px-6 py-4 rounded-lg font-semibold">
                GỬI NGAY
              </button>
              
              <button className="w-full bg-red-900 hover:bg-red-950 text-white px-6 py-4 rounded-lg font-semibold">
                GỬI MỪNG CƯỚI
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function WeddingDateTime({ 
  weddingTime, 
  weddingDate, 
  weddingYear, 
  weddingDay 
}: { 
  weddingTime: string; 
  weddingDate: string; 
  weddingYear: string; 
  weddingDay?: string;
}) {
  // Parse wedding date
  const parseDate = () => {
    const parts = weddingDate.replace(/[./]/g, '.').split('.');
    if (parts.length >= 2) {
      return {
        day: parseInt(parts[0]) || 1,
        month: parseInt(parts[1]) || 1,
      };
    }
    return { day: 1, month: 1 };
  };

  const { day, month } = parseDate();
  const year = parseInt(weddingYear) || new Date().getFullYear();
  
  // Calculate day of week if not provided
  const getDayOfWeek = () => {
    if (weddingDay) return weddingDay;
    const date = new Date(year, month - 1, day);
    const dayNames = ['CN', 'THỨ 2', 'THỨ 3', 'THỨ 4', 'THỨ 5', 'THỨ 6', 'THỨ 7'];
    return dayNames[date.getDay()];
  };

  const monthNames = [
    'THÁNG 01', 'THÁNG 02', 'THÁNG 03', 'THÁNG 04', 'THÁNG 05', 'THÁNG 06',
    'THÁNG 07', 'THÁNG 08', 'THÁNG 09', 'THÁNG 10', 'THÁNG 11', 'THÁNG 12'
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8">
      <h3 className="text-xl font-bold text-center text-gray-800 mb-6">Vào Lúc</h3>
      
      <div className="grid grid-cols-3 gap-4 items-center">
        {/* Left: Time */}
        <div className="text-center border-r-2 border-gray-200 pr-4">
          <p className="text-2xl md:text-3xl font-semibold text-gray-800">
            {weddingTime || '10 giờ 00'}
          </p>
        </div>

        {/* Center: Day, Date, Month */}
        <div className="text-center border-r-2 border-gray-200 pr-4">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            {getDayOfWeek()}
          </p>
          <p className="text-6xl md:text-7xl font-bold text-gray-900 mb-2">
            {day}
          </p>
          <p className="text-xl font-semibold text-gray-700">
            {monthNames[month - 1] || `THÁNG ${month.toString().padStart(2, '0')}`}
          </p>
        </div>

        {/* Right: Year */}
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-semibold text-gray-800">
            Năm {year}
          </p>
        </div>
      </div>
    </div>
  );
}

function WeddingCalendar({ weddingDate, weddingYear }: { weddingDate: string; weddingYear: string }) {
  // Parse wedding date (format: "31.03" or "15/03")
  const parseDate = () => {
    const parts = weddingDate.replace(/[./]/g, '.').split('.');
    if (parts.length >= 2) {
      return {
        day: parseInt(parts[0]) || 1,
        month: parseInt(parts[1]) || 1,
      };
    }
    return { day: 1, month: 1 };
  };

  const { day: weddingDay, month: weddingMonth } = parseDate();
  const year = parseInt(weddingYear) || new Date().getFullYear();
  
  // Get first day of month and number of days
  const firstDay = new Date(year, weddingMonth - 1, 1).getDay();
  const daysInMonth = new Date(year, weddingMonth, 0).getDate();
  
  // Vietnamese day names
  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  
  // Vietnamese month names
  const monthNames = [
    'THÁNG 01', 'THÁNG 02', 'THÁNG 03', 'THÁNG 04', 'THÁNG 05', 'THÁNG 06',
    'THÁNG 07', 'THÁNG 08', 'THÁNG 09', 'THÁNG 10', 'THÁNG 11', 'THÁNG 12'
  ];

  // Generate calendar days
  const days = [];
  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {monthNames[weddingMonth - 1]} - {year}
      </h3>
      
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((date, index) => {
          if (date === null) {
            return <div key={index} className="aspect-square"></div>;
          }
          const isWeddingDay = date === weddingDay;
          return (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center rounded-lg transition-all relative ${
                isWeddingDay
                  ? 'bg-red-600 text-white font-bold'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {date}
              {isWeddingDay && (
                <div className="absolute -top-1 -right-1 text-red-500 text-xl">
                  ❤
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

