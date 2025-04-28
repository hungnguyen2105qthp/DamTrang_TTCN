import React, { useState, useEffect } from "react";

const CustomerModal = ({ customer, onClose, onSubmit, onCustomerUpdate }) => {
  const [formData, setFormData] = useState({
    ho: "",
    ten: "",
    email: "",
    username: "",
    pass: "",
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        ho: customer.ho || "",
        ten: customer.ten || "",
        email: customer.email || "",
        username: customer.username || "",
        pass: customer.pass || "",
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === "function") {
      onSubmit(formData);
    } else {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (customer) {
        const existingCustomer = users.find((u) => u.username === customer.username);
        const orders = existingCustomer?.orders || [];
        const products = existingCustomer?.products || [];
        const updated = users.map((u) =>
          u.username === customer.username ? { ...formData, products, orders } : u
        );
        localStorage.setItem("users", JSON.stringify(updated));
        alert("Cập nhật khách hàng thành công!");
        if (typeof onCustomerUpdate === "function") {
          onCustomerUpdate(updated);
        }
      } else {
        if (users.some((u) => u.username === formData.username)) {
          alert("Username đã tồn tại!");
          return;
        }
        const newUsers = [...users, { ...formData, products: [], orders: [] }];
        localStorage.setItem("users", JSON.stringify(newUsers));
        alert("Thêm khách hàng thành công!");
        if (typeof onCustomerUpdate === "function") {
          onCustomerUpdate(newUsers);
        }
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md sm:max-w-lg max-h-[80vh] overflow-y-auto p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
          {customer ? "Sửa khách hàng" : "Thêm khách hàng"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Họ", name: "ho", type: "text" },
            { label: "Tên", name: "ten", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Username", name: "username", type: "text", disabled: !!customer },
            { label: "Mật khẩu", name: "pass", type: "password" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                disabled={field.disabled}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50"
              />
            </div>
          ))}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 sm:pt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors w-full sm:w-auto mb-2 sm:mb-0"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              {customer ? "Cập nhật" : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;