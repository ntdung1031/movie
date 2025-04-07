import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaTimes } from "react-icons/fa";

const Login = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  // Hàm chuyển đổi giữa đăng nhập và đăng ký
  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
        {/* Nút đóng */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          {isSignUp ? "Đăng Ký Tài Khoản" : "Đăng Nhập"}
        </h2>

        <form className="space-y-4">
          {/* Email hoặc tên đăng nhập */}
          <div>
            <label className="block text-xl font-medium text-gray-700 mb-1">
              Tên đăng nhập / Email
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Nhập email hoặc tên đăng nhập"
            />
          </div>
          {/* Các trường bổ sung khi đăng ký */}
          {isSignUp && (
            <>
                    <div>
                    <label className="block text-xl font-medium text-gray-700 mb-1">
                    Nhập họ và tên
                    </label>
                    <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Nhập họ và tên"
                    />
                </div>
            </>
          )}

          {/* Mật khẩu */}
          <div>
            <label className="block text-xl font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Nhập mật khẩu"
            />
          </div>

          {/* Các trường bổ sung khi đăng ký */}
          {isSignUp && (
            <>
            
              <div>
                <label className="block text-xl font-medium text-gray-700 mb-1">
                  Nhập lại mật khẩu
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Nhập lại mật khẩu"
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Nhập số điện thoại"
                />
              </div>
            </>
          )}

          {/* Nút Đăng nhập / Đăng ký */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
          >
            {isSignUp ? "Đăng Ký" : "Đăng Nhập"}
          </button>
        </form>

        {/* Đường kẻ phân cách */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-500">Hoặc</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Đăng nhập với Google và Facebook */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition duration-300">
            <FaGoogle className="text-red-500" size={20} />
            <span>Đăng nhập bằng Google</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
            <FaFacebook size={20} />
            <span>Đăng nhập bằng Facebook</span>
          </button>
        </div>

        {/* Chuyển đổi giữa đăng nhập/đăng ký */}
        <p className="mt-4 text-center text-gray-600">
          {isSignUp ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
          <button
            onClick={toggleSignUp}
            className="text-purple-600 font-medium hover:underline"
          >
            {isSignUp ? "Đăng nhập ngay" : "Đăng ký ngay"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;