import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const Profile = () => {
  const navigate = useNavigate();
  const { formatPrice } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("currentUser");
    const userData = JSON.parse(loggedInUser);
    setUser(userData);

    const allOrders = localStorage.getItem("orders");
    if (allOrders) {
      const parsedOrders = JSON.parse(allOrders);
      const userOrders = parsedOrders.filter(
        (order) => order.user.username === userData.username
      );
      setOrders(userOrders);
    }

    window.scrollTo(0, 0);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const updateUserInfo = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const updatedUser = {
      ...user,
      ho: formData.get("ho"),
      ten: formData.get("ten"),
      email: formData.get("email"),
      newPassword: formData.get("newPassword") || user.password,
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = allUsers.map((u) =>
      u.username === user.username ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setUser(updatedUser);

    alert("Cập nhật thông tin thành công!");
  };

  const calculateOrderTotal = (order) => {
    return order.products.reduce((total, product) => {
      const price = parseInt(product.price.replace(/\./g, ""));
      return total + price * product.quantity;
    }, 0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCancelOrder = (orderId) => {
    if (!window.confirm("Bạn có chắc muốn hủy đơn hàng này?")) {
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const updatedOrders = allOrders.map((order) =>
      order.id === orderId && order.status === "pending"
        ? { ...order, status: "cancelled" }
        : order
    );
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId && order.status === "pending"
          ? { ...order, status: "cancelled" }
          : order
      )
    );

    alert("Đơn hàng đã được hủy thành công!");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <div className="bg-white rounded-lg shadow-md p-8 w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
            <i className="fas fa-exclamation-circle mr-2 text-red-600"></i>
            Vui lòng đăng nhập để xem thông tin tài khoản
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm font-semibold whitespace-nowrap"
            >
              Đăng ký
            </button>
            <div className="text-gray-600 text-sm font-medium">hoặc</div>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm font-semibold whitespace-nowrap"
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <img
        src="src/assets/img/banners/blackFriday.gif"
        alt="Black Friday"
        className="w-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center mb-6">
              <img
                src={`https://ui-avatars.com/api/?name=${user.ho}+${user.ten}&background=random&color=fff&size=128`}
                alt="Avatar"
                className="w-24 h-24 rounded-full mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-900">
                {user.ho} {user.ten}
              </h3>
            </div>
            <ul className="space-y-2">
              <li
                className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-50 transition-colors ${
                  activeTab === "info"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab("info")}
              >
                <i className="fas fa-user"></i>
                Thông tin tài khoản
              </li>
              <li
                className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-50 transition-colors ${
                  activeTab === "orders"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab("orders")}
              >
                <i className="fas fa-shopping-bag"></i>
                Đơn hàng của tôi
              </li>
              {JSON.parse(localStorage.getItem('currentUser'))?.username === 'admin' && (
              <li
                className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-50 transition-colors text-red-600"
                onClick={() => navigate("/admin")}
              >
                <i className="fas fa-lock"></i>
                Truy cập quản trị
              </li>
            )}
              <li
                className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-50 transition-colors text-gray-700"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i>
                Đăng xuất
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-6">
            {activeTab === "info" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="fas fa-user mr-2 text-blue-600"></i>Thông tin
                  tài khoản
                </h2>
                <div className="border-t border-gray-200 pt-4">
                  <form onSubmit={updateUserInfo} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Tài khoản:
                        </label>
                        <input
                          type="text"
                          value={user.username}
                          disabled
                          className="mt-1 w-full p-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Họ:
                        </label>
                        <input
                          type="text"
                          name="ho"
                          defaultValue={user.ho}
                          required
                          className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Tên:
                        </label>
                        <input
                          type="text"
                          name="ten"
                          defaultValue={user.ten}
                          required
                          className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email:
                        </label>
                        <input
                          type="email"
                          name="email"
                          defaultValue={user.email}
                          required
                          className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Mật khẩu mới:
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          placeholder="Để trống nếu không đổi"
                          className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      Cập nhật
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="fas fa-shopping-bag mr-2 text-blue-600"></i>Đơn
                  hàng của tôi
                </h2>
                <div className="border-t border-gray-200 pt-4">
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <i className="fas fa-shopping-cart text-4xl text-gray-400 mb-4"></i>
                      <p className="text-gray-600">Bạn chưa có đơn hàng nào</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                            <div className="text-sm font-semibold text-gray-900">
                              Đơn hàng #{order.id}
                            </div>
                            <div className="text-sm text-gray-600">
                              Ngày đặt: {formatDate(order.date)}
                            </div>
                            <div
                              className={`text-sm font-semibold ${
                                order.status === "pending"
                                  ? "text-yellow-600"
                                  : order.status === "processing"
                                  ? "text-blue-600"
                                  : order.status === "completed"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {order.status === "pending"
                                ? "Đang xử lý"
                                : order.status === "processing"
                                ? "Đang giao hàng"
                                : order.status === "completed"
                                ? "Đã giao hàng"
                                : order.status === "cancelled"
                                ? "Đã hủy"
                                : order.status}
                            </div>
                          </div>
                          <div className="border-t border-gray-200 pt-4">
                            {order.products.map((product, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-4 mb-4"
                              >
                                <img
                                  src={product.img}
                                  alt={product.name}
                                  className="w-16 h-16 object-cover rounded-md"
                                />
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-900">
                                    {product.name}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    Số lượng: {product.quantity}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Đơn giá: {product.price}₫
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <div className="text-sm font-semibold text-gray-900">
                              Tổng tiền:{" "}
                              {formatPrice(calculateOrderTotal(order))}₫
                            </div>
                            {order.status === "pending" && (
                              <button
                                onClick={() => handleCancelOrder(order.id)}
                                className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition-colors text-sm mt-2 sm:mt-0"
                              >
                                Hủy đơn hàng
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <i
          className="fas fa-arrow-up fixed bottom-6 right-6 text-2xl text-blue-600 cursor-pointer hover:text-blue-700"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        ></i>
      </div>
    </>
  );
};

export default Profile;
