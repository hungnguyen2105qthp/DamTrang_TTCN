import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { CartContext } from "../contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { getProductById, products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  const sampleImages = [
    "../assets/img/chitietsanpham/oppo-f9-mau-do-1-org.jpg",
    "../assets/img/chitietsanpham/oppo-f9-mau-do-2-org.jpg",
    "../assets/img/chitietsanpham/oppo-f9-mau-do-3-org.jpg",
  ];

  useEffect(() => {
    const productData = getProductById(id);
    if (productData) {
      setProduct(productData);
      setCurrentImage(productData.img);
      const related = products
        .filter((p) => p.company === productData.company && p.masp !== id)
        .slice(0, 5);
      setRelatedProducts(related);
    }
    window.scrollTo(0, 0);
  }, [id, getProductById, products]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const openCertain = () => {
    setShowOverlay(true);
  };

  const closeCertain = () => {
    setShowOverlay(false);
  };

  const changePic = (src) => {
    setCurrentImage(src);
  };

  const renderStars = (count) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <i
          key={i}
          className={`fas fa-star ${
            i < count ? "text-yellow-400" : "text-gray-300"
          }`}
        ></i>
      ));
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-red-600 mb-4 flex items-center">
          <i className="fas fa-exclamation-triangle mr-2"></i>Không tìm thấy sản
          phẩm
        </h1>
        <Link
          to="/"
          className="text-blue-600 underline hover:text-blue-800 flex items-center"
        >
          <i className="fas fa-home mr-2"></i>Quay lại trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <i className="fas fa-mobile-alt mr-3 text-blue-600"></i>Điện thoại{" "}
          {product.name}
        </h1>

        <div className="flex items-center mb-6">
          {renderStars(product.star)}
          <span className="ml-3 text-gray-600 text-sm flex items-center">
            <i className="fas fa-comment-alt mr-2"></i>
            {product.rateCount} đánh giá
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-auto rounded-md cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={openCertain}
            />
            <div className="flex gap-2 mt-4 justify-center">
              {sampleImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  onClick={() => changePic(img)}
                  className={`w-14 h-14 rounded-md cursor-pointer transition-opacity duration-300 ${
                    currentImage === img
                      ? "border-2 border-blue-600 opacity-100"
                      : "opacity-70"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <strong className="text-lg text-gray-900 flex items-center">
                <i className="fas fa-gift mr-2 text-blue-600"></i>Khuyến mãi
              </strong>
              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="flex items-center gap-3">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <div className="text-gray-700 text-sm">
                    {product.promo && product.promo.name === "giamgia" && (
                      <p>Giảm {formatPrice(product.promo.value)}₫</p>
                    )}
                    {product.promo && product.promo.name === "tragop" && (
                      <p>Trả góp 0%</p>
                    )}
                    {product.promo && product.promo.name === "moiramat" && (
                      <p>Mới ra mắt</p>
                    )}
                    {product.promo && product.promo.name === "giareonline" && (
                      <p>Giá rẻ online</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden">
              <img
                src="../assets/img/chitietsanpham/clock-152067_960_720.png"
                alt="Clock"
              />
              <div>NHẬN HÀNG TRONG 1 GIỜ</div>
            </div>

            <div>
              <strong className="text-lg text-gray-900 flex items-center">
                <i className="fas fa-shield-alt mr-2 text-blue-600"></i>Chính
                sách
              </strong>
              <div className="border-t border-gray-200 mt-2 pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <i className="fas fa-box-open text-blue-600"></i>
                  <p className="text-gray-700 text-sm">
                    Trong hộp có: Sạc, Tai nghe, Sách hướng dẫn, Cây lấy sim, Ốp
                    lưng
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-shield-alt text-blue-600"></i>
                  <p className="text-gray-700 text-sm">
                    Bảo hành chính hãng 12 tháng.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-exchange-alt text-blue-600"></i>
                  <p className="text-gray-700 text-sm">
                    1 đổi 1 trong 1 tháng nếu lỗi, đổi sản phẩm tại nhà trong 1
                    ngày.
                  </p>
                </div>
                <div className="border-t border-gray-200 mt-2 pt-4">
                  <strong className="text-2xl text-red-600 font-bold">
                    {product.price}₫
                  </strong>
                  {product.promo && product.promo.name === "giamgia" && (
                    <div className="flex items-center gap-3 mt-2">
                      <del className="text-gray-500 text-base">
                        {formatPrice(
                          parseInt(product.price.replace(/\./g, "")) +
                            parseInt(product.promo.value)
                        )}
                        ₫
                      </del>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                        <i className="fas fa-tags mr-1"></i>-
                        {formatPrice(product.promo.value)}₫
                      </span>
                    </div>
                  )}
                </div>
                <button
                  className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 flex items-center gap-2 w-full justify-center transition-colors duration-300 mt-4 text-base"
                  onClick={handleAddToCart}
                >
                  <i className="fas fa-cart-plus"></i>
                  <span className="font-semibold">Thêm vào giỏ hàng</span>
                </button>
                <p className="text-center text-gray-600 text-sm mt-2 flex items-center justify-center">
                  <i className="fas fa-truck mr-2"></i>Giao trong 1 giờ hoặc
                  nhận tại cửa hàng
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <i className="fas fa-cogs mr-2 text-blue-600"></i>Thông số kỹ thuật
          </h2>
          <div className="border-t border-gray-200 pt-4">
            <ul className="text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex justify-between py-2 border-b border-gray-100">
                <p className="font-semibold text-sm">
                  <i className="fas fa-desktop mr-2"></i>Màn hình:
                </p>{" "}
                <div className="text-sm">{product.detail.screen}</div>
              </li>
              <li className="flex justify-between py-2 border-b border-gray-100">
                <p className="font-semibold text-sm">
                  <i className="fas fa-microchip mr-2"></i>Hệ điều hành:
                </p>{" "}
                <div className="text-sm">{product.detail.os}</div>
              </li>
              <li className="flex justify-between py-2 border-b border-gray-100">
                <p className="font-semibold text-sm">
                  <i className="fas fa-camera mr-2"></i>Camera sau:
                </p>{" "}
                <div className="text-sm">{product.detail.camara}</div>
              </li>
              <li className="flex justify-between py-2 border-b border-gray-100">
                <p className="font-semibold text-sm">
                  <i className="fas fa-camera-retro mr-2"></i>Camera trước:
                </p>{" "}
                <div className="text-sm">{product.detail.camaraFront}</div>
              </li>
              <li className="flex justify-between py-2 border-b border-gray-100">
                <p className="font-semibold text-sm">
                  <i className="fas fa-microchip mr-2"></i>CPU:
                </p>{" "}
                <div className="text-sm">{product.detail.cpu}</div>
              </li>
              <li className="flex justify-between py-2 border-b border-gray-100">
                <p className="font-semibold text-sm">
                  <i className="fas fa-memory mr-2"></i>RAM:
                </p>{" "}
                <div className="text-sm">{product.detail.ram}</div>
              </li>
              <li className="flex justify-between py-2 border-b border-gray-100">
                <p className="font-semibold text-sm">
                  <i className="fas fa-hdd mr-2"></i>Bộ nhớ trong:
                </p>{" "}
                <div className="text-sm">{product.detail.rom}</div>
              </li>
              <li className="flex justify-between py-2 border-b border-gray-100">
                <p className="font-semibold text-sm">
                  <i className="fas fa-sd-card mr-2"></i>Thẻ nhớ:
                </p>{" "}
                <div className="text-sm">{product.detail.microUSB}</div>
              </li>
              <li className="flex justify-between py-2">
                <p className="font-semibold text-sm">
                  <i className="fas fa-battery-full mr-2"></i>Dung lượng pin:
                </p>{" "}
                <div className="text-sm">{product.detail.battery}</div>
              </li>
            </ul>
          </div>
        </div>

        {showOverlay && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative bg-white p-6 rounded-lg max-w-3xl w-full">
              <div
                className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={closeCertain}
              >
                <i className="fas fa-times"></i>
              </div>
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-auto rounded-md"
              />
              <div className="flex gap-2 mt-4 justify-center">
                {sampleImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    onClick={() => changePic(img)}
                    className={`w-16 h-16 rounded-md cursor-pointer transition-opacity duration-300 ${
                      currentImage === img
                        ? "border-2 border-blue-600 opacity-100"
                        : "opacity-70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <i className="fas fa-thumbs-up mr-2 text-blue-600"></i>Sản phẩm
            tương tự
          </h2>
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {relatedProducts.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
                >
                  <Link to={`/products/${item.masp}`}>
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-md mb-2 transition-transform duration-300 hover:scale-105"
                    />
                    <h3 className="text-base font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <div className="text-red-600 font-bold text-base">
                      {item.price}₫
                    </div>
                    <div className="flex items-center mt-2">
                      {renderStars(item.star)}
                      <span className="ml-2 text-gray-600 text-sm">
                        {item.rateCount} đánh giá
                      </span>
                    </div>
                    {item.promo && (
                      <div className="mt-2 text-xs text-gray-600 flex items-center">
                        <i className="fas fa-tag mr-1 text-blue-600"></i>
                        {item.promo.name === "giamgia" && (
                          <span>Giảm {formatPrice(item.promo.value)}₫</span>
                        )}
                        {item.promo.name === "tragop" && (
                          <span>Trả góp {item.promo.value}%</span>
                        )}
                        {item.promo.name === "giareonline" && (
                          <span>Giá rẻ online</span>
                        )}
                        {item.promo.name === "moiramat" && (
                          <span>Mới ra mắt</span>
                        )}
                      </div>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
