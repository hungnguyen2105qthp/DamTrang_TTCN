import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Về chúng tôi</h3>
            <p className="text-gray-300">
              Chúng tôi chuyên cung cấp các sản phẩm điện thoại chính hãng với giá cả cạnh tranh và dịch vụ hậu mãi tốt nhất.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Trang chủ</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">Giới thiệu</Link></li>
              <li><Link to="/news" className="text-gray-300 hover:text-white transition-colors">Tin tức</Link></li>
              <li><Link to="/policies" className="text-gray-300 hover:text-white transition-colors">Chính sách</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/reviews" className="text-gray-300 hover:text-white transition-colors">Đánh giá</Link></li>
              <li><Link to="/promotions" className="text-gray-300 hover:text-white transition-colors">Khuyến mãi</Link></li>
              <li><Link to="/warranty" className="text-gray-300 hover:text-white transition-colors">Bảo hành</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white transition-colors">Tuyển dụng</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
            <address className="not-italic text-gray-300 mb-6">
              <p>123 Đường ABC, Quận XYZ</p>
              <p>TP. Hồ Chí Minh, Việt Nam</p>
              <p>Email: info@example.com</p>
              <p>Điện thoại: (028) 1234 5678</p>
            </address>
            <h3 className="text-xl font-bold mb-4">Theo dõi chúng tôi</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mobile Shop. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}