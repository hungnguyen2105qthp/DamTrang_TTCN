import React, { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

function PaymentModal({ show, onClose, onDirectPay, totalAmount, onConfirmQR }) {
  const [shipName, setShipName] = useState('');
  const [shipPhone, setShipPhone] = useState('');
  const [shipAddress, setShipAddress] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [error, setError] = useState({});

  const validate = () => {
    let err = {};
    if (!shipName.trim()) err.shipName = 'Vui lòng nhập họ tên';
    if (!shipPhone.trim()) err.shipPhone = 'Vui lòng nhập số điện thoại';
    else if (!/^0[0-9]{9}$/.test(shipPhone)) err.shipPhone = 'Số điện thoại không hợp lệ (bắt đầu bằng 0, 10 chữ số)';
    if (!shipAddress.trim()) err.shipAddress = 'Vui lòng nhập địa chỉ';
    setError(err);
    return Object.keys(err).length === 0;
  };

  const handleQR = () => {
    if (validate()) {
      onConfirmQR({ shipName, shipPhone, shipAddress }, false); 
      setShowQR(true);
    }
  };

  const handleDirect = () => {
    if (validate()) {
      onDirectPay({ shipName, shipPhone, shipAddress });
    }
  };

  const handleConfirmQRPayment = () => {
    if (validate()) {
      onConfirmQR({ shipName, shipPhone, shipAddress }, true); 
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl" onClick={onClose}>
          ×
        </button>
        {!showQR ? (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center flex items-center justify-center">
              <i className="fas fa-truck mr-2 text-blue-600"></i>Thông tin giao hàng
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ tên:
                <input
                  type="text"
                  value={shipName}
                  onChange={(e) => setShipName(e.target.value)}
                  className={`mt-1 w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 ${error.shipName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {error.shipName && <span className="text-red-500 text-xs mt-1">{error.shipName}</span>}
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại:
                <input
                  type="tel"
                  value={shipPhone}
                  onChange={(e) => setShipPhone(e.target.value)}
                  className={`mt-1 w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 ${error.shipPhone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {error.shipPhone && <span className="text-red-500 text-xs mt-1">{error.shipPhone}</span>}
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ:
                <textarea
                  value={shipAddress}
                  onChange={(e) => setShipAddress(e.target.value)}
                  rows="3"
                  className={`mt-1 w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 ${error.shipAddress ? 'border-red-500' : 'border-gray-300'}`}
                />
                {error.shipAddress && <span className="text-red-500 text-xs mt-1">{error.shipAddress}</span>}
              </label>
            </div>
            <div className="flex justify-between mt-6 gap-4">
              <button
                onClick={handleQR}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm flex items-center justify-center"
              >
                <i className="fas fa-qrcode mr-2"></i>Thanh toán qua QR
              </button>
              <button
                onClick={handleDirect}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm flex items-center justify-center"
              >
                <i className="fas fa-money-bill mr-2"></i>Thanh toán trực tiếp
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-center">
              <i className="fas fa-qrcode mr-2 text-blue-600"></i>Thanh toán QR
            </h2>
            <div className="flex justify-center mb-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ThanhToan${totalAmount}`}
                alt="QR Code"
                className="border border-gray-300"
              />
            </div>
            <p className="mb-4 text-gray-700">
              Tổng số tiền cần thanh toán:{' '}
              <span className="font-semibold text-lg text-red-600">{formatCurrency(totalAmount)}</span>
            </p>
            <button
              onClick={handleConfirmQRPayment}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm flex items-center justify-center"
            >
              <i className="fas fa-check mr-2"></i>Đã thanh toán
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CartTable({ cartItems, onUpdateQuantity, onRemoveItem }) {
  const { formatPrice } = useContext(CartContext);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3">Sản phẩm</th>
            <th scope="col" className="px-6 py-3">Tên sản phẩm</th>
            <th scope="col" className="px-6 py-3 text-center">Số lượng</th>
            <th scope="col" className="px-6 py-3 text-right">Đơn giá</th>
            <th scope="col" className="px-6 py-3 text-right">Thành tiền</th>
            <th scope="col" className="px-6 py-3 text-center">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr className="bg-white border-b">
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                <i className="fas fa-shopping-cart text-2xl text-gray-400 mb-2 block"></i>
                Giỏ hàng trống
              </td>
            </tr>
          ) : (
            cartItems.map((item, idx) => (
              <tr key={item.masp || idx} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  {item.img && (
                    <img src={item.img} alt={item.name} className="w-12 h-12 object-contain" />
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.masp, Math.max(1, item.quantity - 1))}
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.masp, item.quantity + 1)}
                      className="px-2 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">{item.price}₫</td>
                <td className="px-6 py-4 text-right font-semibold text-red-600">
                  {formatPrice(Number(item.price.replace(/\./g, '')) * item.quantity)}₫
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onRemoveItem(item.masp)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function Cart() {
  const { cartItems, totalPrice, updateQuantity, removeFromCart, clearCart, formatPrice } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [paid, setPaid] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);

  const handleDirectPay = (shippingInfo) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      alert('Vui lòng đăng nhập để thanh toán!');
      return;
    }

    const order = {
      id: Date.now(),
      user: currentUser,
      products: cartItems,
      date: new Date().toISOString(),
      status: 'pending',
      shippingInfo,
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    setPaymentInfo({ ...shippingInfo, method: 'Direct' });
    setPaid(true);
    clearCart();
    setShowModal(false);
  };

  const handleConfirmQR = (shippingInfo, completePayment) => {
    if (!completePayment) {
      setPaymentInfo({ ...shippingInfo, method: 'QR' });
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      alert('Vui lòng đăng nhập để thanh toán!');
      return;
    }

    const order = {
      id: Date.now(),
      user: currentUser,
      products: cartItems,
      date: new Date().toISOString(),
      status: 'pending',
      shippingInfo,
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    setPaymentInfo({ ...shippingInfo, method: 'QR' });
    setPaid(true);
    clearCart();
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
          <i className="fas fa-shopping-cart mr-2 text-blue-600"></i>Giỏ hàng của bạn
        </h1>

        {paid ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center">
            <strong className="font-bold">Thanh toán thành công!</strong>
            <span className="block sm:inline"> Cảm ơn bạn đã mua hàng.</span>
            {paymentInfo && (
              <div className="mt-4 text-left text-sm">
                <p><strong>Thông tin giao hàng:</strong></p>
                <p>Họ tên: {paymentInfo.shipName}</p>
                <p>SĐT: {paymentInfo.shipPhone}</p>
                <p>Địa chỉ: {paymentInfo.shipAddress}</p>
                <p>Phương thức thanh toán: {paymentInfo.method === 'QR' ? 'QR Code' : 'Trực tiếp'}</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <CartTable
              cartItems={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
            />
            <div className="mt-6 flex flex-col items-end">
              <div className="text-xl font-semibold mb-4">
                Tổng cộng: <span className="text-red-600">{formatPrice(totalPrice)}₫</span>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 text-sm flex items-center justify-center disabled:opacity-50"
                disabled={cartItems.length === 0}
              >
                <i className="fas fa-credit-card mr-2"></i>Tiến hành thanh toán
              </button>
            </div>
            <PaymentModal
              show={showModal}
              onClose={() => setShowModal(false)}
              onDirectPay={handleDirectPay}
              totalAmount={totalPrice}
              onConfirmQR={handleConfirmQR}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;