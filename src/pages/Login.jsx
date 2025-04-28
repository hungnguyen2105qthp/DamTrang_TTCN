import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import users from '../data/users.json';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const pass = formData.get('pass');

    const allUsers = JSON.parse(localStorage.getItem('users') || JSON.stringify(users));
    
    localStorage.setItem('users', JSON.stringify(allUsers));

    const user = allUsers.find(u => u.username === username && u.pass === pass);

    if (!user) {
      setError('Tên tài khoản hoặc mật khẩu không đúng!');
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Đăng nhập thành công!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
          <i className="fas fa-sign-in-alt mr-2 text-blue-600"></i>Đăng nhập
        </h2>
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4 flex items-center">
            <i className="fas fa-exclamation-circle mr-2"></i>{error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
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
            <i className="fas fa-sign-in-alt mr-2"></i>Đăng nhập
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">Đăng ký</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;