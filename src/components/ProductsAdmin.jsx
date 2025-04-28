import React, { useState } from "react";
import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal";

const ProductsAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  return (
    <div className="admin-page overflow-x-auto">
      <div className="admin-container flex flex-col sm:flex-row w-full max-w-full">
        <main className="main-content flex-1 p-2 sm:p-4 md:p-6">
          <div className="dashboard-header flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Quản lý sản phẩm</h1>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto"
              onClick={handleAddProduct}
            >
              <i className="fa fa-plus mr-2"></i> Thêm sản phẩm
            </button>
          </div>
          <ProductTable onEdit={handleEditProduct} />
          {showModal && <ProductModal product={editingProduct} onClose={handleCloseModal} />}
        </main>
      </div>
    </div>
  );
};

export default ProductsAdmin;