import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-700 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-display font-black mb-6 leading-tight">
              EVENT
              <span className="block text-primary-500">CARD</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
              Tạo thiệp mời online chuyên nghiệp
              <span className="block mt-2">Cho sự kiện đáng nhớ của bạn</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/templates"
              className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Chọn template
            </Link>
            <Link
              href="/cards"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-dark-900 px-10 py-4 rounded-lg font-semibold text-lg transition-all"
            >
              Xem thiệp của tôi
            </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold text-center text-dark-900 mb-16">
            Chọn loại thiệp phù hợp
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group relative bg-dark-900 text-white p-8 rounded-2xl overflow-hidden transform transition-all hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-5xl mb-6">💒</div>
                <h3 className="text-2xl font-display font-bold mb-4">Thiệp cưới</h3>
                <p className="text-gray-300 leading-relaxed">
                  Thiết kế sang trọng, lãng mạn cho ngày cưới đáng nhớ
                </p>
              </div>
            </div>
            
            <div className="group relative bg-white border-2 border-dark-200 text-dark-900 p-8 rounded-2xl overflow-hidden transform transition-all hover:scale-105 hover:border-primary-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-5xl mb-6">🎂</div>
                <h3 className="text-2xl font-display font-bold mb-4">Sinh nhật</h3>
                <p className="text-dark-600 leading-relaxed">
                  Thiệp mời sinh nhật độc đáo và đầy màu sắc
                </p>
              </div>
            </div>
            
            <div className="group relative bg-primary-600 text-white p-8 rounded-2xl overflow-hidden transform transition-all hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-5xl mb-6">🎉</div>
                <h3 className="text-2xl font-display font-bold mb-4">Sự kiện khác</h3>
                <p className="text-gray-100 leading-relaxed">
                  Thôi nôi, kỷ niệm và các sự kiện đặc biệt
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Sẵn sàng tạo thiệp đầu tiên?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Chọn từ hàng trăm template đẹp mắt và tùy chỉnh theo phong cách của bạn
          </p>
          <Link
            href="/templates"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Khám phá templates →
          </Link>
        </div>
      </section>
    </main>
  );
}

