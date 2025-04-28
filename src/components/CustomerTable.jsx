import React, { useState, useEffect } from "react";

const CustomerTable = ({ onEdit, customers, setCustomers }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("users") || "[]");
      const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      setCustomers(stored);
      setOrders(storedOrders);
    } catch (err) {
      setError("Lỗi tải dữ liệu khách hàng");
    } finally {
      setLoading(false);
    }
  }, [setCustomers]);

  const countUserOrders = (username) => {
    return orders.filter((order) => order.user.username === username).length;
  };

  const handleDelete = (username) => {
    if (!window.confirm("Bạn có chắc muốn xóa khách hàng này?")) return;
    if (orders.some((o) => o.user.username === username)) {
      alert("Không thể xóa khách hàng này vì họ có đơn hàng!");
      return;
    }
    const updated = customers.filter((c) => c.username !== username);
    localStorage.setItem("users", JSON.stringify(updated));
    setCustomers(updated);
    alert("Xóa khách hàng thành công!");
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(customers.length / customersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) return <div className="text-center text-gray-500 py-4">Đang tải...</div>;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;
  if (customers.length === 0) return <div className="text-center text-gray-500 py-4">Không có khách hàng nào</div>;

  return (
    <div className="px-2 sm:px-4 lg:px-8 overflow-x-auto">
      <div className="shadow-sm rounded-lg bg-white">
        <table className="min-w-full border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700 font-semibold">
              <th className="py-2 px-2 text-left">STT</th>
              <th className="py-2 px-2 text-left">Tên</th>
              <th className="py-2 px-2 text-left hidden sm:table-cell">Email</th>
              <th className="py-2 px-2 text-left">Username</th>
              <th className="py-2 px-2 text-left hidden sm:table-cell">Đơn hàng</th>
              <th className="py-2 px-2 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((c, idx) => (
              <tr key={c.username} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="py-2 px-2 text-gray-600">{indexOfFirstCustomer + idx + 1}</td>
                <td className="py-2 px-2 text-gray-800 font-medium">{c.ho} {c.ten}</td>
                <td className="py-2 px-2 text-gray-600 hidden sm:table-cell">{c.email}</td>
                <td className="py-2 px-2 text-gray-600">{c.username}</td>
                <td className="py-2 px-2 text-gray-600 hidden sm:table-cell">{countUserOrders(c.username)} đơn</td>
                <td className="py-2 px-2 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => onEdit(c)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto mb-2 sm:mb-0"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(c.username)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors w-full sm:w-auto"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Phân trang giữ nguyên */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Hiển thị <span className="font-medium">{indexOfFirstCustomer + 1}</span> đến{" "}
                <span className="font-medium">{Math.min(indexOfLastCustomer, customers.length)}</span>{" "}
                trong <span className="font-medium">{customers.length}</span> khách hàng
              </p>
            </div>
            <div>
              <nav className="flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${
                      currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-500 hover:bg-gray-50"
                    } border-gray-300`}
                  >
                    <span className="sr-only">Trang trước</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`relative inline-flex items-center px-4 py-2 border ${
                        currentPage === pageNumber ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                      } border-gray-300`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${
                      currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-500 hover:bg-gray-50"
                    } border-gray-300`}
                  >
                    <span className="sr-only">Trang sau</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;