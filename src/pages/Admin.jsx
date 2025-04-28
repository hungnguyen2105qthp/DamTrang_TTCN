import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardChart from "../components/DashboardChart";
import { ProductContext } from "../contexts/ProductContext";

const Admin = () => {
  const navigate = useNavigate();
  const [dashboardStats, setDashboardStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    completedOrders: 0,
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.username !== "admin") {
      alert("Bạn không có quyền truy cập trang này!");
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const totalProducts = products.length;

    const categories = new Set(products.map((p) => p.company).filter(Boolean));
    const totalCategories = categories.size;

    const completedOrders = orders.filter(o => o.status === "completed").length;

    let totalRevenue = 0;
    orders
      .filter(o => o.status === "completed")
      .forEach((order) => {
        order.products.forEach((p) => {
          if (p.price) {
            const price = parseInt(p.price.replace(/\./g, "")) || 0;
            const quantity = p.quantity || 0;
            totalRevenue += price * quantity;
          }
        });
      });

    const totalOrders = orders.length;

    const totalCustomers = users.length;

    setDashboardStats({
      totalProducts,
      totalCategories,
      totalRevenue,
      totalOrders,
      totalCustomers,
      completedOrders,
    });
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="admin-page">
      <div className="admin-container flex">
        <main className="main-content flex-1 p-6">
          <div className="dashboard-header">
            <h1 className="text-2xl font-bold mb-4">Bảng điều khiển</h1>
          </div>

          <div className="stats-cards grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            <div className="stat-card bg-white p-4 rounded-lg shadow">
              <div className="stat-card-icon products text-blue-600">
                <i className="fa fa-mobile"></i>
              </div>
              <div className="stat-card-info">
                <h3>Sản phẩm</h3>
                <p>{dashboardStats.totalProducts}</p>
              </div>
            </div>
            <div className="stat-card bg-white p-4 rounded-lg shadow">
              <div className="stat-card-icon categories text-green-600">
                <i className="fa fa-tags"></i>
              </div>
              <div className="stat-card-info">
                <h3>Danh mục</h3>
                <p>{dashboardStats.totalCategories}</p>
              </div>
            </div>
            <div className="stat-card bg-white p-4 rounded-lg shadow">
              <div className="stat-card-icon revenue text-yellow-600">
                <i className="fas fa-coins"></i>
              </div>
              <div className="stat-card-info">
                <h3>Doanh thu</h3>
                <p>{formatCurrency(dashboardStats.totalRevenue)}</p>
              </div>
            </div>
            <div className="stat-card bg-white p-4 rounded-lg shadow">
              <div className="stat-card-icon orders text-purple-600">
                <i className="fa fa-shopping-cart"></i>
              </div>
              <div className="stat-card-info">
                <h3>Đơn hàng</h3>
                <p>{dashboardStats.totalOrders} <span className="text-xs text-gray-500">({dashboardStats.completedOrders} hoàn thành)</span></p>
              </div>
            </div>
            <div className="stat-card bg-white p-4 rounded-lg shadow">
              <div className="stat-card-icon customers text-red-600">
                <i className="fa fa-users"></i>
              </div>
              <div className="stat-card-info">
                <h3>Khách hàng</h3>
                <p>{dashboardStats.totalCustomers}</p>
              </div>
            </div>
          </div>

          <div className="dashboard-charts grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="chart-container bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Số lượng bán ra theo hãng</h2>
              <DashboardChart
                id="salesChart"
                type="bar"
                title="Số lượng bán ra theo hãng"
                chartType="sales"
              />
            </div>
            <div className="chart-container bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Doanh thu theo hãng</h2>
              <DashboardChart
                id="revenueChart"
                type="pie"
                title="Doanh thu theo hãng"
                chartType="revenue"
              />
            </div>
            <div className="chart-container bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Phân bố sản phẩm theo giá</h2>
              <DashboardChart
                id="priceRangeChart"
                type="bar"
                title="Phân bố sản phẩm theo giá"
                chartType="price-range"
              />
            </div>
            <div className="chart-container bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Đơn hàng theo tháng</h2>
              <DashboardChart
                id="monthlyOrdersChart"
                type="line"
                title="Đơn hàng theo tháng"
                chartType="monthly-orders"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;