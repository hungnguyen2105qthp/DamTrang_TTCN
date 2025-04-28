import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';

const PromoProducts = () => {
  const { products } = useContext(ProductContext);
  const { promoType } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  const promoNames = {
    moiramat: 'Mới ra mắt',
    giamgia: 'Giảm giá',
    tragop: 'Trả góp',
    giareonline: 'Giá rẻ online',
  };

  const filteredProducts = products.filter(
    (product) => product.promo && product.promo.name === promoType
  );

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const indexOfFirstProduct = (currentPage - 1) * productsPerPage;
  const indexOfLastProduct = indexOfFirstProduct + productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const renderStars = (count) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <i
          key={i}
          className={`fa fa-star ${
            i < count ? 'text-yellow-400' : 'text-gray-300'
          }`}
        ></i>
      ));
  };

  const renderProductCard = (product) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0">
      <Link to={`/products/${product.masp}`} className="block">
        <div className="p-4">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-44 object-contain mb-4"
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
              {product.promo.name === 'giamgia' && (
                <span className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                  Giảm {formatPrice(product.promo.value)}₫
                </span>
              )}
              {product.promo.name === 'tragop' && (
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                  Trả góp {product.promo.value}%
                </span>
              )}
              {product.promo.name === 'giareonline' && (
                <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                  Giá rẻ online
                </span>
              )}
              {product.promo.name === 'moiramat' && (
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

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Sản phẩm {promoNames[promoType] || promoType}
        </h1>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <i className="fa fa-times-circle text-red-500 text-4xl mb-4"></i>
            <p className="text-gray-600 text-lg">
              Không có sản phẩm nào thuộc danh mục này.
            </p>
          </div>
        ) : (
          <>
      
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {currentProducts.map((product, index) => (
                <div key={index}>{renderProductCard(product)}</div>
              ))}
            </div>

          
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 mb-12">
                <nav className="inline-flex rounded-md shadow">
                  <button
                    onClick={() =>
                      paginate(currentPage > 1 ? currentPage - 1 : 1)
                    }
                    disabled={currentPage === 1}
                    className={`px-4 py-2 text-sm font-medium rounded-l-md flex items-center justify-center ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
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
                          className={`px-4 py-2 text-sm font-medium ${
                            currentPage === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
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
                    onClick={() =>
                      paginate(
                        currentPage < totalPages ? currentPage + 1 : totalPages
                      )
                    }
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 text-sm font-medium rounded-r-md flex items-center justify-center ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <i className="fa fa-chevron-right"></i>
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PromoProducts;