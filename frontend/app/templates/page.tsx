'use client';

import Link from 'next/link';

export default function TemplatesListPage() {
  const templates = [
    {
      id: 'template1',
      name: 'Template 1',
      description: 'Thiệp cưới truyền thống với banner đỏ và ký tự 囍',
      thumbnail: '💒',
      color: 'bg-red-600',
    },
    {
      id: 'template2',
      name: 'Template 2',
      description: 'Thiệp cưới scroll với 6 sections đẹp mắt',
      thumbnail: '💕',
      color: 'bg-pink-600',
    },
    {
      id: 'template3',
      name: 'Template 3',
      description: 'Thiệp cưới hiện đại với album ảnh và sổ lưu bút',
      thumbnail: '💐',
      color: 'bg-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-dark-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-display font-black text-center mb-4">
            CHỌN TEMPLATE
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-2xl mx-auto">
            Chọn template thiệp mời phù hợp với sự kiện của bạn
          </p>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <Link
              key={template.id}
              href={`/templates/${template.id}`}
              className="group bg-white border-2 border-dark-200 rounded-2xl overflow-hidden hover:border-primary-600 transition-all transform hover:scale-105 hover:shadow-xl"
            >
              <div className={`${template.color} h-48 flex items-center justify-center text-6xl`}>
                {template.thumbnail}
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {template.name}
                </h3>
                <p className="text-sm text-dark-600">{template.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {templates.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl text-dark-600 mb-2">Chưa có template nào</p>
            <p className="text-dark-500">
              Tạo template mới trong thư mục app/templates/
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
