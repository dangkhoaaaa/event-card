'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCardById, updateCard } from '@/store/slices/cardsSlice';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { TEMPLATE2_DECORATIVE_IMAGES } from '../constants';
import { AnimatedText } from '../components/AnimatedText';
import { AnimatedImage } from '../components/AnimatedImage';

export default function Template2EditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const dispatch = useAppDispatch();
  const { currentCard, loading } = useAppSelector((state) => state.cards);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    if (id) {
      dispatch(fetchCardById(id));
    }
  }, [id, dispatch, isAuthenticated, router]);

  const [formData, setFormData] = useState({
    // Basic Info
    title: 'Thiệp Mời Cưới',
    hostName: '',
    
    // Section 1: Envelope
    invitationTitle: 'THIỆP',
    invitationSubtitle: 'Mời Cưới',
    groomName: 'Anh Từ',
    brideName: 'Diệu Nhi',
    weddingDate: '31.03',
    weddingYear: '2025',
    weddingTime: '10 giờ 00',
    weddingDay: 'THỨ 5',
    
    // Section 2: Main invitation
    mainTitle: 'Thư Mời Cưới',
    groomFamilyTitle: 'NHÀ TRAI',
    groomFamilyName1: 'ÔNG CẦN VĂN AN',
    groomFamilyName2: 'BÀ NGUYỄN THỊ HẢI',
    groomFamilyAddress: 'Quận 8, Hồ Chí Minh',
    brideFamilyTitle: 'NHÀ GÁI',
    brideFamilyName1: 'ÔNG CẦN VĂN AN',
    brideFamilyName2: 'BÀ NGUYỄN THỊ HẢI',
    brideFamilyAddress: 'Quận 8, Hồ Chí Minh',
    announcement: 'Trân Trọng Báo Tin Lễ Thành Hôn Của',
    groomNameFull: 'Nguyễn Anh Tú',
    brideNameFull: 'Trần Diệu Nhi',
    
    // Section 4: Main photo with text
    invitationText: 'Trân Trọng Kính Mời',
    celebrationText: 'MỪNG LỄ THÀNH',
    
    // Section 5: Thank you
    thankYouText: 'thankyou',
    thankYouMessage: 'Rất hân hạnh, được đón tiếp!',
    
    // Section 6: RSVP
    venueName: 'The ADORA Center',
    venueAddress: 'xxx, Phường xxx, Quận xxx, Hồ Chí Minh',
    rsvpTitle: 'Xác Nhận Tham Dự & Gửi Lời Chúc',
  });

  const [images, setImages] = useState<Record<string, File>>({});
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>({});
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedCard, setSavedCard] = useState<any>(null);

  // Load data from card when it's fetched
  useEffect(() => {
    if (currentCard) {
      // Update formData with card data
      if (currentCard.title) setFormData((prev) => ({ ...prev, title: currentCard.title }));
      if (currentCard.hostName) setFormData((prev) => ({ ...prev, hostName: currentCard.hostName }));
      
      // Load content fields
      if (currentCard.content) {
        const content = currentCard.content;
        setFormData((prev) => {
          const updated = { ...prev };
          Object.keys(content).forEach((key) => {
            const value = content[key];
            if (typeof value === 'string') {
              updated[key as keyof typeof updated] = value;
            } else if (value && typeof value === 'object' && 'url' in value) {
              // Image field - set preview URL
              setImagePreviews((prevPreviews) => ({
                ...prevPreviews,
                [key]: value.url,
              }));
            }
          });
          return updated;
        });
      }
      
      setSavedCard(currentCard);
    }
  }, [currentCard]);

  const onDrop = (acceptedFiles: File[], imageKey: string) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImages((prev) => ({ ...prev, [imageKey]: file }));
      const preview = URL.createObjectURL(file);
      setImagePreviews((prev) => ({ ...prev, [imageKey]: preview }));
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.hostName) {
      alert('Vui lòng điền tiêu đề và tên người tổ chức');
      return;
    }

    setIsSaving(true);
    try {
      // Prepare content
      const content: Record<string, string | { url: string }> = {};
      Object.keys(formData).forEach((key) => {
        if (key !== 'title' && key !== 'hostName') {
          // Check if there's a new image for this key
          if (images[key]) {
            // New image uploaded, will be handled separately
            content[key] = '__IMAGE_PLACEHOLDER__';
          } else if (imagePreviews[key] && !images[key]) {
            // Keep existing image URL
            const existingValue = currentCard?.content?.[key];
            if (existingValue && typeof existingValue === 'object' && 'url' in existingValue) {
              content[key] = existingValue;
            }
          } else {
            // Regular text field
            content[key] = (formData as any)[key];
          }
        }
      });

      // Add new image keys to content
      Object.keys(images).forEach((imageKey) => {
        if (!content[imageKey]) {
          content[imageKey] = '__IMAGE_PLACEHOLDER__';
        }
      });

      // Update card (note: update API may not support image uploads, so we update text only for now)
      // For images, user may need to delete and recreate, or we need to enhance update API
      if (Object.keys(images).length > 0) {
        alert('Cập nhật ảnh hiện chưa được hỗ trợ. Vui lòng tạo card mới để thay đổi ảnh.');
        setIsSaving(false);
        return;
      }

      const result = await dispatch(
        updateCard({
          id: id,
          data: {
            title: formData.title,
            hostName: formData.hostName,
            content: content,
          },
        }),
      ).unwrap();

      setSavedCard(result);
      setIsEditing(false);
      alert('Đã cập nhật thành công!');
    } catch (error: any) {
      console.error('Error updating card:', error);
      alert('Có lỗi xảy ra khi cập nhật: ' + (error.message || 'Unknown error'));
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !currentCard) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-dark-700 border-t-primary-600"></div>
          <p className="mt-4 text-dark-700">Đang tải thiệp...</p>
        </div>
      </div>
    );
  }

  // Helper function to get image URL for display
  const getImageUrl = (key: string): string | null => {
    // First check if there's a new preview (from uploaded file or existing URL)
    if (imagePreviews[key]) {
      return imagePreviews[key];
    }
    // Then check existing card content
    const value = currentCard?.content?.[key];
    if (value && typeof value === 'object' && 'url' in value) {
      return value.url;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Edit Panel */}
      {isEditing && (
        <div className="fixed top-0 right-0 w-96 h-full bg-white border-l-2 border-dark-200 shadow-2xl z-50 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display font-bold text-dark-900">
              Chỉnh sửa Template 2
            </h2>
            <button
              onClick={() => setIsEditing(false)}
              className="text-dark-500 hover:text-dark-900 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-primary-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-dark-900 mb-2">Thông tin cơ bản</h3>
              <div>
                    <label className="block text-sm font-semibold text-dark-700 mb-2">
                  Tiêu đề thiệp *
                    </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
                />
                    </div>
              <div className="mt-3">
                    <label className="block text-sm font-semibold text-dark-700 mb-2">
                  Tên người tổ chức *
                    </label>
                    <input
                      type="text"
                  value={formData.hostName}
                  onChange={(e) => setFormData({ ...formData, hostName: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
                  placeholder="Tên của bạn"
                />
              </div>
            </div>

            <h3 className="font-semibold text-dark-700 mt-6 mb-2">Section 1: Phong bì</h3>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Tiêu đề</label>
              <input
                type="text"
                value={formData.invitationTitle}
                onChange={(e) => setFormData({ ...formData, invitationTitle: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Phụ đề</label>
              <input
                type="text"
                value={formData.invitationSubtitle}
                onChange={(e) => setFormData({ ...formData, invitationSubtitle: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>
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
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Ngày cưới</label>
              <input
                type="text"
                value={formData.weddingDate}
                onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
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
              <label className="block text-sm font-semibold text-dark-700 mb-2">Giờ cưới</label>
              <input
                type="text"
                value={formData.weddingTime || ''}
                onChange={(e) => setFormData({ ...formData, weddingTime: e.target.value })}
                placeholder="10 giờ 00"
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Thứ trong tuần (tùy chọn)</label>
              <input
                type="text"
                value={formData.weddingDay || ''}
                onChange={(e) => setFormData({ ...formData, weddingDay: e.target.value })}
                placeholder="THỨ 5"
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>

            <h3 className="font-semibold text-dark-700 mt-6 mb-2">Section 2: Thư mời</h3>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Tiêu đề</label>
              <input
                type="text"
                value={formData.mainTitle}
                onChange={(e) => setFormData({ ...formData, mainTitle: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Tên chú rể (đầy đủ)</label>
              <input
                type="text"
                value={formData.groomNameFull}
                onChange={(e) => setFormData({ ...formData, groomNameFull: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
                    />
                  </div>
            <div>
              <label className="block text-sm font-semibold text-dark-700 mb-2">Tên cô dâu (đầy đủ)</label>
              <input
                type="text"
                value={formData.brideNameFull}
                onChange={(e) => setFormData({ ...formData, brideNameFull: e.target.value })}
                className="w-full px-4 py-2 border-2 border-dark-200 rounded-lg"
              />
          </div>

            <h3 className="font-semibold text-dark-700 mt-6 mb-2">Upload ảnh</h3>
            <ImageUploadZone
              label="Ảnh trong phong bì"
              imageKey="envelopePhoto"
              onDrop={(files) => onDrop(files, 'envelopePhoto')}
              preview={getImageUrl('envelopePhoto') || undefined}
            />
            <ImageUploadZone
              label="Ảnh chính section 4"
              imageKey="mainPhoto"
              onDrop={(files) => onDrop(files, 'mainPhoto')}
              preview={getImageUrl('mainPhoto') || undefined}
            />
            <ImageUploadZone
              label="Ảnh 1 (section 4)"
              imageKey="photo1"
              onDrop={(files) => onDrop(files, 'photo1')}
              preview={getImageUrl('photo1') || undefined}
            />
            <ImageUploadZone
              label="Ảnh 2 (section 4)"
              imageKey="photo2"
              onDrop={(files) => onDrop(files, 'photo2')}
              preview={getImageUrl('photo2') || undefined}
            />
            <ImageUploadZone
              label="Ảnh 3 (section 4)"
              imageKey="photo3"
              onDrop={(files) => onDrop(files, 'photo3')}
              preview={getImageUrl('photo3') || undefined}
            />
            <ImageUploadZone
              label="Ảnh cảm ơn 1"
              imageKey="thankPhoto1"
              onDrop={(files) => onDrop(files, 'thankPhoto1')}
              preview={getImageUrl('thankPhoto1') || undefined}
            />
            <ImageUploadZone
              label="Ảnh cảm ơn 2"
              imageKey="thankPhoto2"
              onDrop={(files) => onDrop(files, 'thankPhoto2')}
              preview={getImageUrl('thankPhoto2') || undefined}
            />
            <ImageUploadZone
              label="Ảnh cảm ơn chính"
              imageKey="thankMainPhoto"
              onDrop={(files) => onDrop(files, 'thankMainPhoto')}
              preview={getImageUrl('thankMainPhoto') || undefined}
            />

          <div className="mt-8 pt-6 border-t border-dark-200">
            <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {isSaving ? 'Đang lưu...' : '💾 Cập nhật thiệp'}
            </button>
            
              {savedCard && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm font-semibold text-green-800 mb-2">Đã cập nhật thành công!</p>
                  <p className="text-xs text-green-700 mb-2">Link chia sẻ:</p>
                  <input
                    type="text"
                    readOnly
                    value={`${typeof window !== 'undefined' ? window.location.origin : ''}/card/${savedCard.slug}`}
                    className="w-full px-3 py-2 bg-white border border-green-300 rounded text-xs"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
            <button
              onClick={() => {
                      const url = `${window.location.origin}/card/${savedCard.slug}`;
                navigator.clipboard.writeText(url);
                      alert('Đã copy link!');
              }}
                    className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
            >
                    Copy link
            </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Template Design - Scrollable */}
      <div className="relative">
        {/* Edit Button */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="fixed top-4 right-4 z-40 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105"
        >
          {isEditing ? 'Đóng' : 'Chỉnh sửa & Lưu'}
        </button>

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
                {formData.invitationTitle}
            </h1>
            </AnimatedText>
            <AnimatedText animationType="slideUp" delay={200}>
            <p className="text-4xl font-cursive text-gray-800 mb-8">
                {formData.invitationSubtitle}
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
                      sizes="(max-width: 768px) 100vw, 400px"
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
                <p className="text-2xl font-cursive text-gray-800">{formData.groomName}</p>
                <span className="text-red-600 text-2xl animate-pulse-slow">❤</span>
                <p className="text-2xl font-cursive text-gray-800">{formData.brideName}</p>
            </div>
            </AnimatedText>
            
            {/* Date */}
            <AnimatedText animationType="slideRight" delay={600}>
            <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">{formData.weddingDate}</p>
                <p className="text-xl text-gray-700">{formData.weddingYear}</p>
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
                  {formData.mainTitle.split(' ').map((word, i) => (
                    <AnimatedText key={i} animationType="slideUp" delay={i * 100}>
                      <span className="block">{word}</span>
                    </AnimatedText>
                  ))}
              </h1>
              </AnimatedText>

              {/* Groom's Family */}
              <AnimatedText animationType="slideLeft" delay={200}>
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">{formData.groomFamilyTitle}</h2>
                  <p className="text-base text-gray-800">{formData.groomFamilyName1}</p>
                  <p className="text-base text-gray-800">{formData.groomFamilyName2}</p>
                  <p className="text-sm text-gray-600 mt-1">{formData.groomFamilyAddress}</p>
                </div>
              </AnimatedText>

              {/* Bride's Family */}
              <AnimatedText animationType="slideRight" delay={300}>
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">{formData.brideFamilyTitle}</h2>
                  <p className="text-base text-gray-800">{formData.brideFamilyName1}</p>
                  <p className="text-base text-gray-800">{formData.brideFamilyName2}</p>
                  <p className="text-sm text-gray-600 mt-1">{formData.brideFamilyAddress}</p>
                </div>
              </AnimatedText>

              {/* Announcement */}
              <AnimatedText animationType="fadeIn" delay={400}>
                <div className="text-center mb-8">
                  <p className="text-base text-gray-700 italic">{formData.announcement}</p>
                </div>
              </AnimatedText>

              {/* Couple Names */}
              <AnimatedText animationType="scale" delay={400}>
                <div className="text-center mb-8">
                  <p className="text-3xl font-cursive text-gray-800 mb-2">{formData.groomNameFull}</p>
                  <span className="text-2xl text-red-600 mx-4 animate-fadeInOut">&</span>
                  <p className="text-3xl font-cursive text-gray-800 mt-2">{formData.brideNameFull}</p>
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
            <h2 className="text-3xl font-display font-bold text-center text-gray-800 mb-8">
              Khoảnh Khắc Đẹp
            </h2>
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
                <p className="text-3xl font-cursive text-white mb-2">{formData.groomNameFull}</p>
                <span className="text-2xl text-white mx-4 animate-pulse-slow">&</span>
                <p className="text-3xl font-cursive text-white">{formData.brideNameFull}</p>
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
                {formData.invitationText}
              </p>
            </AnimatedText>

            {/* Three Small Photos */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[1, 2, 3].map((i) => {
                const photoKey = `photo${i}`;
                return (
                  <AnimatedImage key={i} animationType="zoomIn" delay={400 + i * 100}>
                    <div className="relative aspect-square bg-red-700 border-2 border-red-800 rounded-lg overflow-hidden">
                      {getImageUrl(photoKey) ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={getImageUrl(photoKey)!}
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
                {formData.celebrationText}
              </p>
            </AnimatedText>

            {/* Wedding Date & Time Display */}
            <WeddingDateTime 
              weddingTime={formData.weddingTime || '10 giờ 00'}
              weddingDate={formData.weddingDate || '31.03'}
              weddingYear={formData.weddingYear || '2025'}
              weddingDay={formData.weddingDay}
            />

            {/* Calendar */}
            <WeddingCalendar weddingDate={formData.weddingDate || '31.03'} weddingYear={formData.weddingYear || '2025'} />
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
                return (
                  <AnimatedImage key={i} animationType="zoomIn" delay={i * 200}>
                    <div className="relative aspect-square bg-white rounded-lg shadow-lg overflow-hidden">
                      {getImageUrl(photoKey) ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={getImageUrl(photoKey)!}
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
                <p className="text-5xl font-cursive text-white mb-4 animate-fadeInOut">{formData.thankYouText}</p>
                <p className="text-xl font-cursive text-white">{formData.thankYouMessage}</p>
              </div>
            </AnimatedText>
          </div>
        </section>

        {/* Section 6: RSVP with Map */}
        <section className="min-h-screen bg-white overflow-hidden">
          <div className="max-w-md mx-auto">
            {/* Venue Info */}
            <div className="p-6 bg-white">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{formData.venueName}</h2>
              <p className="text-gray-600 mb-4">{formData.venueAddress}</p>
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
              <h3 className="text-xl font-bold text-white mb-6">{formData.rsvpTitle}</h3>
              
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

function ImageUploadZone({
  label,
  imageKey,
  onDrop,
  preview,
}: {
  label: string;
  imageKey: string;
  onDrop: (files: File[]) => void;
  preview?: string;
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    multiple: false,
  });

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-dark-700 mb-2">{label}</label>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : preview
            ? 'border-dark-300'
            : 'border-dark-300 hover:border-primary-500 hover:bg-dark-50'
        }`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative h-32 w-full rounded overflow-hidden">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="py-4">
            <div className="text-2xl mb-2">📷</div>
            <p className="text-dark-600 text-sm">
              {isDragActive ? 'Thả ảnh vào đây...' : 'Click hoặc kéo thả ảnh'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
