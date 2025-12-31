'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTemplateById } from '@/store/slices/templatesSlice';
import { createCard } from '@/store/slices/cardsSlice';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import Link from 'next/link';

export default function CreateCardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('templateId');
  const dispatch = useAppDispatch();

  const { currentTemplate, loading: templateLoading } = useAppSelector(
    (state) => state.templates,
  );
  const { loading: cardLoading } = useAppSelector((state) => state.cards);

  const [formData, setFormData] = useState({
    title: '',
    hostName: '',
    content: {} as Record<string, string>,
  });
  const [images, setImages] = useState<Record<string, File>>({});
  const [imagePreviews, setImagePreviews] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (templateId) {
      dispatch(fetchTemplateById(templateId));
    }
  }, [templateId, dispatch]);

  useEffect(() => {
    if (currentTemplate) {
      const initialContent: Record<string, string> = {};
      Object.keys(currentTemplate.design.textStyles).forEach((key) => {
        initialContent[key] = '';
      });
      setFormData((prev) => ({
        ...prev,
        content: initialContent,
      }));
    }
  }, [currentTemplate]);

  const onDrop = (acceptedFiles: File[], placeholderId: string) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImages((prev) => ({ ...prev, [placeholderId]: file }));
      const preview = URL.createObjectURL(file);
      setImagePreviews((prev) => ({ ...prev, [placeholderId]: preview }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateId || !currentTemplate) return;

    const content: Record<string, string | { url: string }> = {
      ...formData.content,
    };

    try {
      await dispatch(
        createCard({
          cardData: {
            templateId,
            title: formData.title,
            hostName: formData.hostName,
            content,
            isPublished: false,
          },
          images: Object.keys(images).length > 0 ? images : undefined,
        }),
      ).unwrap();
      router.push('/cards');
    } catch (error) {
      console.error('Error creating card:', error);
      alert('Có lỗi xảy ra khi tạo thiệp');
    }
  };

  if (templateLoading || !currentTemplate) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-dark-700 border-t-primary-600"></div>
          <p className="mt-4 text-white">Đang tải template...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-dark-900 text-white py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/templates"
            className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
          >
            ← Quay lại chọn template
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-black">
            TẠO THIỆP MỚI
          </h1>
          <p className="text-xl text-gray-300 mt-2">
            {currentTemplate.name}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-white border-2 border-dark-200 rounded-2xl p-8">
            <h2 className="text-2xl font-display font-bold text-dark-900 mb-6">
              Thông tin cơ bản
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-dark-700 mb-2">
                  Tiêu đề thiệp *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-4 py-3 border-2 border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  placeholder="Ví dụ: Thư mời cưới của..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark-700 mb-2">
                  Tên người tổ chức *
                </label>
                <input
                  type="text"
                  value={formData.hostName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, hostName: e.target.value }))
                  }
                  className="w-full px-4 py-3 border-2 border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  placeholder="Tên của bạn"
                  required
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          {Object.keys(currentTemplate.design.textStyles).length > 0 && (
            <div className="bg-white border-2 border-dark-200 rounded-2xl p-8">
              <h2 className="text-2xl font-display font-bold text-dark-900 mb-6">
                Nội dung text
              </h2>
              
              <div className="space-y-6">
                {Object.keys(currentTemplate.design.textStyles).map((key) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-dark-700 mb-2">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} *
                    </label>
                    <input
                      type="text"
                      value={formData.content[key] || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          content: { ...prev.content, [key]: e.target.value },
                        }))
                      }
                      className="w-full px-4 py-3 border-2 border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      placeholder={`Nhập ${key}...`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image Uploads */}
          {currentTemplate.design.imagePlaceholders.length > 0 && (
            <div className="bg-white border-2 border-dark-200 rounded-2xl p-8">
              <h2 className="text-2xl font-display font-bold text-dark-900 mb-6">
                Upload ảnh
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {currentTemplate.design.imagePlaceholders.map((placeholder) => (
                  <div key={placeholder.id}>
                    <label className="block text-sm font-semibold text-dark-700 mb-2">
                      {placeholder.id}
                    </label>
                    <ImageUploadZone
                      placeholderId={placeholder.id}
                      onDrop={(files) => onDrop(files, placeholder.id)}
                      preview={imagePreviews[placeholder.id]}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={cardLoading}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {cardLoading ? 'Đang tạo...' : 'Tạo thiệp'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-4 border-2 border-dark-300 text-dark-700 rounded-lg font-semibold hover:bg-dark-50 transition-all"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ImageUploadZone({
  placeholderId,
  onDrop,
  preview,
}: {
  placeholderId: string;
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
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
        isDragActive
          ? 'border-primary-500 bg-primary-50'
          : preview
          ? 'border-dark-300'
          : 'border-dark-300 hover:border-primary-500 hover:bg-dark-50'
      }`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-dark-900/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white font-semibold">Thay đổi ảnh</span>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <div className="text-4xl mb-4">📷</div>
          <p className="text-dark-600 font-medium">
            {isDragActive
              ? 'Thả ảnh vào đây...'
              : 'Kéo thả ảnh hoặc click để chọn'}
          </p>
          <p className="text-sm text-dark-500 mt-2">
            JPG, PNG, GIF hoặc WEBP (tối đa 5MB)
          </p>
        </div>
      )}
    </div>
  );
}
