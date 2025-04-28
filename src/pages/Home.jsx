import React, { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import { ProductContext } from "../contexts/ProductContext";

const Home = () => {
  const { products } = useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [openFilter, setOpenFilter] = useState(null);
  const [filters, setFilters] = useState({
    price: null,
    promotion: null,
    stars: null,
    sort: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const companies = [
    { name: "Apple", img: "/src/assets/img/company/Apple.jpg" },
    { name: "Samsung", img: "/src/assets/img/company/Samsung.jpg" },
    { name: "Oppo", img: "/src/assets/img/company/Oppo.jpg" },
    { name: "Nokia", img: "/src/assets/img/company/Nokia.jpg" },
    { name: "Huawei", img: "/src/assets/img/company/Huawei.jpg" },
    { name: "Xiaomi", img: "/src/assets/img/company/Xiaomi.png" },
    { name: "Realme", img: "/src/assets/img/company/Realme.png" },
    { name: "Vivo", img: "/src/assets/img/company/Vivo.jpg" },
    { name: "Philips", img: "/src/assets/img/company/Philips.jpg" },
    { name: "Mobell", img: "/src/assets/img/company/Mobell.jpg" },
    { name: "Mobiistar", img: "/src/assets/img/company/Mobiistar.jpg" },
    { name: "Itel", img: "/src/assets/img/company/Itel.jpg" },
    { name: "Coolpad", img: "/src/assets/img/company/Coolpad.png" },
    { name: "HTC", img: "/src/assets/img/company/HTC.jpg" },
    { name: "Motorola", img: "/src/assets/img/company/Motorola.jpg" },
  ];

  const banners = [
    { src: "/src/assets/img/banners/banner0.png" },
    { src: "/src/assets/img/banners/banner1.png" },
    { src: "/src/assets/img/banners/banner2.png" },
    { src: "/src/assets/img/banners/banner3.png" },
    { src: "/src/assets/img/banners/banner4.png" },
    { src: "/src/assets/img/banners/banner5.png" },
    { src: "/src/assets/img/banners/banner6.png" },
    { src: "/src/assets/img/banners/banner7.png" },
    { src: "/src/assets/img/banners/banner8.png" },
    { src: "/src/assets/img/banners/banner9.png" },
  ];

  const filterOptions = {
    price: [
      { value: "0-2000000", text: "Dưới 2 triệu" },
      { value: "2000000-4000000", text: "Từ 2 - 4 triệu" },
      { value: "4000000-7000000", text: "Từ 4 - 7 triệu" },
      { value: "7000000-13000000", text: "Từ 7 - 13 triệu" },
      { value: "13000000-999999999", text: "Trên 13 triệu" },
    ],
    promotion: [
      { value: "giamgia", text: "Giảm giá" },
      { value: "tragop", text: "Trả góp" },
      { value: "moiramat", text: "Mới ra mắt" },
      { value: "giareonline", text: "Giá rẻ online" },
    ],
    stars: [
      { value: "5", text: "5 sao" },
      { value: "4", text: "4 sao trở lên" },
      { value: "3", text: "3 sao trở lên" },
      { value: "2", text: "2 sao trở lên" },
      { value: "1", text: "1 sao trở lên" },
    ],
    sort: [
      { value: "price-asc", text: "Giá tăng dần" },
      { value: "price-desc", text: "Giá giảm dần" },
      { value: "star-desc", text: "Đánh giá cao nhất" },
      { value: "star-asc", text: "Đánh giá thấp nhất" },
      { value: "name-asc", text: "Tên A-Z" },
      { value: "name-desc", text: "Tên Z-A" },
    ],
  };

  useEffect(() => {
    if (products && products.length) {
      applyFilters();
    }
  }, [products, filters, searchTerm]);

  const applyFilters = () => {
    let result = [...products];

    if (filters.price) {
      const [min, max] = filters.price.split("-").map(Number);
      result = result.filter((p) => {
        const price = Number(p.price.replace(/\./g, ""));
        return price >= min && price <= max;
      });
    }

    if (filters.promotion) {
      result = result.filter(
        (p) => p.promo && p.promo.name === filters.promotion
      );
    }

    if (filters.stars) {
      const minStars = Number(filters.stars);
      result = result.filter((p) => p.star >= minStars);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.company.toLowerCase().includes(term)
      );
    }

    if (filters.sort) {
      const [field, direction] = filters.sort.split("-");
      result.sort((a, b) => {
        let valueA, valueB;

        if (field === "price") {
          valueA = Number(a.price.replace(/\./g, ""));
          valueB = Number(b.price.replace(/\./g, ""));
        } else if (field === "star") {
          valueA = a.star;
          valueB = b.star;
        } else if (field === "name") {
          valueA = a.name;
          valueB = b.name;
          return direction === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        return direction === "asc" ? valueA - valueB : valueB - valueA;
      });
    }

    setFilteredProducts(result);
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? null : value,
    }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      price: null,
      promotion: null,
      stars: null,
      sort: null,
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleCompanyClick = (company) => {
    setSearchTerm(company);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const gotoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 10000);

    return () => clearInterval(interval); 
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const renderStars = (count) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <i
          key={i}
          className={`fa fa-star ${
            i < count ? "text-yellow-400" : "text-gray-300"
          }`}
        ></i>
      ));
  };

  const getProductsByPromoType = (promoType) => {
    if (!products || !products.length) return [];
    return products.filter(product => product.promo && product.promo.name === promoType).slice(0, 10);
  };

  const renderProductCard = (product) => (
    <div className="min-w-[250px] max-w-[250px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0 mx-2">
      <Link to={`/products/${product.masp}`} className="block">
        <div className="p-4">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-48 object-contain mb-4"
          />
          <h3 className="text-lg font-medium text-gray-800 mb-2 line-clamp-2 h-14">
            {product.name}
          </h3>
          <div className="text-xl font-bold text-red-600 mb-2">
            {product.price}₫
          </div>
          <div className="flex items-center mb-2">
            <div className="flex mr-2">{renderStars(product.star)}</div>
            <span className="text-sm text-gray-500">
              {product.rateCount} đánh giá
            </span>
          </div>
          {product.promo && (
            <div className="mt-2">
              {product.promo.name === "giamgia" && (
                <span className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                  Giảm {formatPrice(product.promo.value)}₫
                </span>
              )}
              {product.promo.name === "tragop" && (
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                  Trả góp {product.promo.value}%
                </span>
              )}
              {product.promo.name === "giareonline" && (
                <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                  Giá rẻ online
                </span>
              )}
              {product.promo.name === "moiramat" && (
                <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                  Mới ra mắt
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );

  const scrollContainerRefs = {
    moiramat: useRef(null),
    giamgia: useRef(null),
    tragop: useRef(null),
    giareonline: useRef(null)
  };
  
  const scrollLeft = (promoType) => {
    if (scrollContainerRefs[promoType]?.current) {
      scrollContainerRefs[promoType].current.scrollBy({ left: -500, behavior: 'smooth' });
    }
  };

  const scrollRight = (promoType) => {
    if (scrollContainerRefs[promoType]?.current) {
      scrollContainerRefs[promoType].current.scrollBy({ left: 500, behavior: 'smooth' });
    }
  };
  
  const renderPromoProductsContainer = (promoType, title, bgColor) => {
    const promoProducts = getProductsByPromoType(promoType);
    if (!promoProducts.length) return null;

    return (
      <div className={`mb-10 ${bgColor} rounded-lg p-6`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <Link to={`/promo/${promoType}`} className="text-blue-600 hover:text-blue-800 font-medium">
            Xem tất cả <i className="fa fa-arrow-right ml-1"></i>
          </Link>
        </div>
        <div className="relative">
          <button 
            onClick={() => scrollLeft(promoType)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 rounded-full shadow-md hover:bg-opacity-100 focus:outline-none flex items-center justify-center w-10 h-10"
            aria-label="Cuộn sang trái"
          >
            <i className="fa fa-chevron-left text-gray-700"></i>
          </button>
          
          <div 
            ref={scrollContainerRefs[promoType]}
            className="flex overflow-x-auto pb-4 gap-4 px-8" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            <style dangerouslySetInnerHTML={{ __html: `
              .flex.overflow-x-auto::-webkit-scrollbar {
                display: none;
              }
            `}} />
            {promoProducts.map((product, index) => (
              <div key={index} className="flex-shrink-0">
                {renderProductCard(product)}
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => scrollRight(promoType)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 rounded-full shadow-md hover:bg-opacity-100 focus:outline-none flex items-center justify-center w-10 h-10"
            aria-label="Cuộn sang phải"
          >
            <i className="fa fa-chevron-right text-gray-700"></i>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50">
      <div className="relative overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="min-w-full">
              <img
                src={banner.src}
                alt={`Banner ${index}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            ></button>
          ))}
        </div>

        <button
          onClick={() =>
            setCurrentIndex(
              (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full hover:bg-opacity-75 w-10 h-10 flex items-center justify-center"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full hover:bg-opacity-75 w-10 h-10 flex items-center justify-center"
        >
         <i className="fas fa-arrow-right"></i>
        </button>
      </div>

      <div className="container mx-auto px-4 py-6">
        <img
          src="/src/assets/img/banners/blackFriday.gif"
          alt="Black Friday"
          className="w-full mb-6"
        />
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4 mb-8">
          {companies.map((company, index) => (
            <button
              key={index}
              onClick={() => handleCompanyClick(company.name)}
              className="flex flex-col items-center p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={company.img}
                alt={company.name}
                className="h-auto w-auto mb-2"
              />
              <span className="text-sm text-gray-700">{company.name}</span>
            </button>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-4 mb-6">
          {Object.entries(filterOptions).map(([filterType, options], index) => (
            <div className="relative" key={index}>
              <button
                className="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() =>
                  setOpenFilter(openFilter === filterType ? null : filterType)
                }
              >
                {filterType === "price"
                  ? "Giá tiền"
                  : filterType === "promotion"
                  ? "Khuyến mãi"
                  : filterType === "stars"
                  ? "Số lượng sao"
                  : "Sắp xếp"}
                <i className="fa fa-chevron-down ml-2"></i>
              </button>
              {openFilter === filterType && (
                <div className="absolute z-10 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg">
                  {options.map((option, i) => (
                    <a
                      key={i}
                      href="#"
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                        filters[filterType] === option.value
                          ? "bg-blue-50 text-blue-700"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleFilterChange(filterType, option.value);
                        setOpenFilter(null);
                      }}
                    >
                      {option.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(filters).some(([_, value]) => value !== null) && (
            <button
              className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-red-200 transition-colors"
              onClick={clearAllFilters}
            >
              Xóa bộ lọc <i className="fa fa-times ml-1"></i>
            </button>
          )}

          {Object.entries(filters).map(([type, value]) => {
            if (!value) return null;

            let filterText = "";
            if (type === "price") {
              filterText = filterOptions.price.find(
                (o) => o.value === value
              )?.text;
            } else if (type === "promotion") {
              filterText = filterOptions.promotion.find(
                (o) => o.value === value
              )?.text;
            } else if (type === "stars") {
              filterText = filterOptions.stars.find(
                (o) => o.value === value
              )?.text;
            } else if (type === "sort") {
              filterText = filterOptions.sort.find(
                (o) => o.value === value
              )?.text;
            }

            return filterText ? (
              <div
                key={type}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center"
              >
                {filterText}
                <button
                  className="ml-2 focus:outline-none"
                  onClick={() => handleFilterChange(type, value)}
                >
                  <i className="fa fa-times"></i>
                </button>
              </div>
            ) : null;
          })}

          {searchTerm && (
            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              Tìm kiếm: {searchTerm}
              <button
                className="ml-2 focus:outline-none"
                onClick={() => setSearchTerm("")}
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
          )}
        </div>
        
 
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <i className="fa fa-search text-gray-400"></i>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">TẤT CẢ SẢN PHẨM</h2>
        <div className="mb-8">
          {currentProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <i className="fa fa-times-circle text-red-500 text-4xl mb-4"></i>
              <p className="text-gray-600 text-lg">
                Không có sản phẩm nào phù hợp với tiêu chí tìm kiếm
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link to={`/products/${product.masp}`} className="block">
                    <div className="p-4">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-48 object-contain mb-4"
                      />
                      <h3 className="text-lg font-medium text-gray-800 mb-2 line-clamp-2 h-14">
                        {product.name}
                      </h3>
                      <div className="text-xl font-bold text-red-600 mb-2">
                        {product.price}₫
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {renderStars(product.star)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {product.rateCount} đánh giá
                        </span>
                      </div>
                      {product.promo && (
                        <div className="mt-2">
                          {product.promo.name === "giamgia" && (
                            <span className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                              Giảm {formatPrice(product.promo.value)}₫
                            </span>
                          )}
                          {product.promo.name === "tragop" && (
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                              Trả góp {product.promo.value}%
                            </span>
                          )}
                          {product.promo.name === "giareonline" && (
                            <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                              Giá rẻ online
                            </span>
                          )}
                          {product.promo.name === "moiramat" && (
                            <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                              Mới ra mắt
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
      
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 mb-12">
            <nav className="inline-flex rounded-md shadow">
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-sm font-medium rounded-l-md flex items-center justify-center ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                <i className="fa fa-chevron-left"></i>
              </button>
              
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={i}
                      onClick={() => paginate(pageNum)}
                      className={`px-4 py-2 text-sm font-medium ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  pageNum === currentPage - 2 ||
                  pageNum === currentPage + 2
                ) {
                  return (
                    <button
                      key={i}
                      className="px-4 py-2 text-sm font-medium bg-white text-gray-700"
                      disabled
                    >
                      ...
                    </button>
                  );
                }
                return null;
              })}
              
              <button
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-sm font-medium rounded-r-md flex items-center justify-center ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                <i className="fa fa-chevron-right"></i>
              </button>
            </nav>
          </div>
        )}
        </div>
        
       
        {renderPromoProductsContainer("moiramat", "SẢN PHẨM MỚI", "bg-purple-50")}
        {renderPromoProductsContainer("giamgia", "GIẢM GIÁ SỐC", "bg-red-50")}
        {renderPromoProductsContainer("tragop", "TRẢ GÓP 0%", "bg-blue-50")}
        {renderPromoProductsContainer("giareonline", "GIÁ RẺ ONLINE", "bg-green-50")}

        
      </div>

      <button
        onClick={gotoTop}
        className="fixed bottom-6 right-20 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-12 h-12 flex items-center justify-center"
      >
        <i className="fa fa-arrow-up"></i>
      </button>


      <ChatBox />
    </div>
  );
};

export default Home;
