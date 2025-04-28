import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import users from '../data/users.json';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newUser = {
      ho: formData.get('ho'),
      ten: formData.get('ten'),
      email: formData.get('email'),
      username: formData.get('username'),
      pass: formData.get('pass'),
      products: [],
      orders: []
    };

    const allUsers = JSON.parse(localStorage.getItem('users') || JSON.stringify(users));

    const isUsernameTaken = allUsers.some(user => user.username === newUser.username);
    const isEmailTaken = allUsers.some(user => user.email === newUser.email);

    if (isUsernameTaken) {
      setError('Tên tài khoản đã tồn tại!');
      return;
    }

    if (isEmailTaken) {
      setError('Email đã được sử dụng!');
      return;
    }

    allUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(allUsers));

    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
          <i className="fas fa-user-plus mr-2 text-blue-600"></i>Đăng ký tài khoản
        </h2>
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4 flex items-center">
            <i className="fas fa-exclamation-circle mr-2"></i>{error}
          </div>
        )}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ:</label>
            <input
              type="text"
              name="ho"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên:</label>
            <input
              type="text"
              name="ten"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên tài khoản:</label>
            <input
              type="text"
              name="username"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu:</label>
            <input
              type="password"
              name="pass"
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors w-full text-sm flex items-center justify-center"
          >
            <i className="fas fa-user-plus mr-2"></i>Đăng ký
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;