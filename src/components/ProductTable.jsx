import React, { useContext, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";

const ProductTable = ({ onEdit }) => {
  const { products, deleteProduct, loading, error } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const renderPromoName = (promo) => {
    if (!promo) return "Không";
    switch (promo.name) {
      case "giamgia": return "Giảm giá";
      case "tragop": return "Trả góp";
      case "giareonline": return "Giá rẻ online";
      case "moiramat": return "Mới ra mắt";
      default: return "Không";
    }
  };

  const handleDelete = (masp) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      deleteProduct(masp);
      alert("Xóa sản phẩm thành công!");
    }
  };

  if (loading) return <div className="text-center text-gray-500 py-4">Đang tải...</div>;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8 overflow-x-auto">
      <div className="shadow-sm rounded-lg w-full">
        <table className="min-w-full border-collapse bg-white text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700 font-semibold">
              <th className="py-2 px-2 text-left">Stt</th>
              <th className="py-2 px-2 text-left hidden sm:table-cell">Mã</th>
              <th className="py-2 px-2 text-left">Tên</th>
              <th className="py-2 px-2 text-left">Giá</th>
              <th className="py-2 px-2 text-left hidden sm:table-cell">Khuyến mãi</th>
              <th className="py-2 px-2 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr key={product.masp} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="py-2 px-2 text-gray-600">{indexOfFirstProduct + index + 1}</td>
                <td className="py-2 px-2 text-gray-600 hidden sm:table-cell">{product.masp}</td>
                <td className="py-2 px-2 text-gray-800 font-medium">{product.name}</td>
                <td className="py-2 px-2 text-gray-600">{product.price} ₫</td>
                <td className="py-2 px-2 text-gray-600 hidden sm:table-cell">{renderPromoName(product.promo)}</td>
                <td className="py-2 px-2 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-colors mb-2 sm:mb-0 w-full sm:w-auto"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(product.masp)}
                    className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 transition-colors w-full sm:w-auto"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300 disabled:opacity-50"
        >
          Trước
        </button>
        <span className="px-4 py-2 bg-gray-100 text-gray-700">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default ProductTable;