import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

function Header() {
  const { totalItems } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex-shrink-0">
              <Link to="/">
                <img src="/src/assets/img/logo.jpg" alt="Smartphone Store" className="h-10 md:h-12" />
              </Link>
            </div>

            <nav className="hidden md:block flex-grow mx-6">
              <ul className="flex items-center justify-center space-x-6">
                <li className={location.pathname === '/' ? 'text-orange-500 font-semibold' : 'text-gray-700 hover:text-orange-500'}>
                  <Link to="/" className="flex items-center">
                    <i className="fas fa-home mr-1 hidden lg:inline"></i> Trang chủ
                  </Link>
                </li>
                <li className={location.pathname === '/news' ? 'text-orange-500 font-semibold' : 'text-gray-700 hover:text-orange-500'}>
                  <Link to="/news">Tin tức</Link>
                </li>
                <li className={location.pathname === '/careers' ? 'text-orange-500 font-semibold' : 'text-gray-700 hover:text-orange-500'}>
                  <Link to="/careers">Tuyển dụng</Link>
                </li>
                <li className={location.pathname === '/about' ? 'text-orange-500 font-semibold' : 'text-gray-700 hover:text-orange-500'}>
                  <Link to="/about">Giới thiệu</Link>
                </li>
                
                <li className={location.pathname === '/contact' ? 'text-orange-500 font-semibold' : 'text-gray-700 hover:text-orange-500'}>
                  <Link to="/contact">Liên hệ</Link>
                </li>

                <li className={location.pathname === '/warranty' ? 'text-orange-500 font-semibold' : 'text-gray-700 hover:text-orange-500'}>
                  <Link to="/warranty">Trung tâm bảo hành</Link>
                </li>


              </ul>
            </nav>

            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative text-gray-700 hover:text-orange-500 transition-colors">
                <i className="fas fa-shopping-cart text-xl"></i>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              <Link to="/profile" className="text-gray-700 hover:text-orange-500 transition-colors">
                <i className="fas fa-user-circle text-xl"></i>
              </Link>

              <button className="md:hidden text-gray-700 hover:text-orange-500 focus:outline-none" onClick={toggleMenu}>
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <div className="px-4 py-3">
            <ul className="space-y-3">
              <li className={location.pathname === '/' ? 'text-orange-500 font-semibold' : 'text-gray-700'}>
                <Link to="/" className="block py-1">
                  <i className="fas fa-home mr-2"></i> Trang chủ
                </Link>
              </li>
              <li className={location.pathname === '/news' ? 'text-orange-500 font-semibold' : 'text-gray-700'}>
                <Link to="/news" className="block py-1">Tin tức</Link>
              </li>
              <li className={location.pathname === '/careers' ? 'text-orange-500 font-semibold' : 'text-gray-700'}>
                <Link to="/careers" className="block py-1">Tuyển dụng</Link>
              </li>
              <li className={location.pathname === '/about' ? 'text-orange-500 font-semibold' : 'text-gray-700'}>
                <Link to="/about" className="block py-1">Giới thiệu</Link>
              </li>
              
              <li className={location.pathname === '/contact' ? 'text-orange-500 font-semibold' : 'text-gray-700'}>
                <Link to="/contact" className="block py-1">Liên hệ</Link>
              </li>
              <li className={location.pathname === '/warranty' ? 'text-orange-500 font-semibold' : 'text-gray-700'}>
                <Link to="/warranty" className="block py-1">Bảo hành</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;