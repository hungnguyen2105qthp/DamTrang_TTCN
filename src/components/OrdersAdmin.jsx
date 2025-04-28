import React from "react";
import OrderTable from "../components/OrderTable";

const OrdersAdmin = () => {
  return (
    <div className="admin-page overflow-x-auto">
      <div className="admin-container flex flex-col sm:flex-row w-full max-w-full">
        <main className="main-content flex-1 p-2 sm:p-4 md:p-6">
          <div className="dashboard-header mb-4 sm:mb-6">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Quản lý đơn hàng</h1>
          </div>
          <OrderTable />
        </main>
      </div>
    </div>
  );
};

export default OrdersAdmin;