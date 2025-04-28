import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ toggleSidebar }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-gray-800 text-gray-100 flex flex-col min-h-screen shadow-lg">
      <div className="p-4 text-center text-xl font-semibold border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="flex-grow p-4">
        <ul className="space-y-2">
          <li>
            <span className="text-xs font-semibold text-gray-400 uppercase px-4">
              Menu
            </span>
          </li>
          <li>
            <Link
              to="/admin/dashboard"
              className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                isActive("/admin/dashboard")
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={toggleSidebar}
            >
              <i className="fas fa-home w-5 mr-3"></i> Trang Chủ
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                isActive("/admin/products")
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={toggleSidebar}
            >
              <i className="fas fa-th-large w-5 mr-3"></i> Sản Phẩm
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                isActive("/admin/orders")
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={toggleSidebar}
            >
              <i className="fas fa-table w-5 mr-3"></i> Đơn Hàng
            </Link>
          </li>
          <li>
            <Link
              to="/admin/customers"
              className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                isActive("/admin/customers")
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={toggleSidebar}
            >
              <i className="fas fa-address-book w-5 mr-3"></i> Khách Hàng
            </Link>
          </li>
        </ul>

        <hr className="my-4 border-gray-700" />
        <ul>
          <li>
            <Link
              to="/"
              className="flex items-center px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
              onClick={toggleSidebar}
            >
              <i className="fas fa-arrow-left w-5 mr-3"></i> Về trang chủ
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Admin Panel
      </div>
    </aside>
  );
};

export default Sidebar;