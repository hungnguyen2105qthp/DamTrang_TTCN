import React, { useState, useEffect } from "react";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("orders") || "[]");
      setOrders(stored);
    } catch (err) {
      setError("Lỗi tải dữ liệu đơn hàng");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    localStorage.setItem("orders", JSON.stringify(updated));
    setOrders(updated);
    alert("Cập nhật trạng thái đơn hàng thành công!");
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calcTotal = (products) =>
    products
      .reduce((sum, p) => sum + parseInt(p.price.replace(/\./g, "")) * p.quantity, 0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  if (loading) return <div className="text-center text-gray-500 py-4">Đang tải...</div>;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;
  if (orders.length === 0) return <div className="text-center text-gray-500 py-4">Không có đơn hàng nào</div>;

  return (
    <div className="px-2 sm:px-4 lg:px-8">
      <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
          <thead className="bg-gray-50">
            <tr className="text-gray-700 font-semibold">
              <th className="py-2 px-2 text-left">STT</th>
              <th className="py-2 px-2 text-left">Mã đơn</th>
              <th className="py-2 px-2 text-left">Khách hàng</th>
              <th className="py-2 px-2 text-left hidden sm:table-cell">Ngày đặt</th>
              <th className="py-2 px-2 text-left">Tổng tiền</th>
              <th className="py-2 px-2 text-left">Trạng thái</th>
              <th className="py-2 px-2 text-left hidden sm:table-cell">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {currentOrders.map((order, idx) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-2 px-2">{indexOfFirstOrder + idx + 1}</td>
                <td className="py-2 px-2">{order.id}</td>
                <td className="py-2 px-2">{order.user.username}</td>
                <td className="py-2 px-2 hidden sm:table-cell">{formatDate(order.date)}</td>
                <td className="py-2 px-2">{calcTotal(order.products)} ₫</td>
                <td className="py-2 px-2">
                  {order.status === "pending" && <span className="text-yellow-600">Đang xử lý</span>}
                  {order.status === "processing" && <span className="text-blue-600">Đang giao</span>}
                  {order.status === "completed" && <span className="text-green-600">Đã giao</span>}
                  {order.status === "cancelled" && <span className="text-red-600">Đã hủy</span>}
                </td>
                <td className="py-2 px-2 hidden sm:table-cell">
                  {order.status !== "completed" && order.status !== "cancelled" ? (
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="border rounded-md p-1 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Đang xử lý</option>
                      <option value="processing">Đang giao</option>
                      <option value="completed">Đã giao</option>
                      <option value="cancelled">Đã hủy</option>
                    </select>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4">
          <div className="text-sm text-gray-700 mb-2 sm:mb-0">
            Hiển thị <span className="font-medium">{indexOfFirstOrder + 1}</span> đến{" "}
            <span className="font-medium">{Math.min(indexOfLastOrder, orders.length)}</span> trong{" "}
            <span className="font-medium">{orders.length}</span> đơn hàng
          </div>
          <div className="flex space-x-1">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded-l-md ${
                currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`px-3 py-1 border ${
                  currentPage === pageNumber ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded-r-md ${
                currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;