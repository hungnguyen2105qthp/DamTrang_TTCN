import React, { useState } from "react";
import CustomerTable from "../components/CustomerTable";
import CustomerModal from "../components/CustomerModal";

const CustomersAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setShowModal(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCustomer(null);
  };

  const handleCustomerUpdate = (updatedCustomers) => {
    setCustomers(updatedCustomers);
  };

  return (
    <div className="admin-page overflow-x-auto">
      <div className="admin-container flex flex-col sm:flex-row w-full max-w-full">
        <main className="main-content flex-1 p-2 sm:p-4 md:p-6">
          <div className="dashboard-header flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
              Quản lý khách hàng
            </h1>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
              onClick={handleAddCustomer}
            >
              <i className="fa fa-plus mr-2"></i> Thêm khách hàng
            </button>
          </div>
          <CustomerTable
            onEdit={handleEditCustomer}
            customers={customers}
            setCustomers={setCustomers}
          />
          {showModal && (
            <CustomerModal
              customer={editingCustomer}
              onClose={handleCloseModal}
              onCustomerUpdate={handleCustomerUpdate}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default CustomersAdmin;