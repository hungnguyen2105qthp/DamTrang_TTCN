import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";

const ProductModal = ({ product, onClose }) => {
  const { addProduct, updateProduct } = useContext(ProductContext);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    img: "",
    price: "",
    star: 0,
    rateCount: 0,
    promo: { name: "", value: "" },
    detail: {
      screen: "",
      os: "",
      camara: "",
      camaraFront: "",
      cpu: "",
      ram: "",
      rom: "",
      microUSB: "",
      battery: "",
    },
  });
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        company: product.company || "",
        img: product.img || "",
        price: product.price.replace(/\./g, "") || "",
        star: product.star || 0,
        rateCount: product.rateCount || 0,
        promo: product.promo || { name: "", value: "" },
        detail: product.detail || {
          screen: "",
          os: "",
          camara: "",
          camaraFront: "",
          cpu: "",
          ram: "",
          rom: "",
          microUSB: "",
          battery: "",
        },
      });
      setPreviewUrl(product.img || "");
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("promo.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({ ...prev, promo: { ...prev.promo, [key]: value } }));
    } else if (name.startsWith("detail.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({ ...prev, detail: { ...prev.detail, [key]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreviewUrl(base64String);
        setFormData(prev => ({ ...prev, img: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const data = {
      ...formData,
      price: formData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      star: parseInt(formData.star, 10),
      rateCount: parseInt(formData.rateCount, 10),
      promo: formData.promo.name ? formData.promo : null,
    };

    if (product) {
      updateProduct(product.masp, data);
      alert("Cập nhật sản phẩm thành công!");
    } else {
      addProduct(data);
      alert("Thêm sản phẩm thành công!");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg sm:max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
          {product ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hãng</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VNĐ)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Chọn ảnh</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-2 w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-md border border-gray-200"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loại khuyến mãi</label>
            <select
              name="promo.name"
              value={formData.promo.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Không</option>
              <option value="giamgia">Giảm giá</option>
              <option value="tragop">Trả góp</option>
              <option value="giareonline">Giá rẻ online</option>
              <option value="moiramat">Mới ra mắt</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá trị khuyến mãi</label>
            <input
              type="text"
              name="promo.value"
              value={formData.promo.value}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sao đánh giá</label>
            <input
              type="number"
              name="star"
              value={formData.star}
              onChange={handleChange}
              min="0"
              max="5"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số lượt đánh giá</label>
            <input
              type="number"
              name="rateCount"
              value={formData.rateCount}
              onChange={handleChange}
              min="0"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="col-span-1 sm:col-span-2 pt-4">
            <h3 className="text-lg font-medium text-gray-700">Chi tiết sản phẩm</h3>
          </div>
          {Object.entries(formData.detail).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{key}</label>
              <input
                type="text"
                name={`detail.${key}`}
                value={value}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 sm:pt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors w-full sm:w-auto mb-2 sm:mb-0"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            {product ? "Cập nhật" : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;