import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaTimes } from "react-icons/fa";
import { auth, provider, signInWithPopup } from "~/firebase/firebase";

// đang nhập bằng gg 

const Login = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: ""
  });
  const [error, setError] = useState("");

  // Hàm chuyển đổi giữa đăng nhập và đăng ký
  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Xử lý đăng nhập
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Kiểm tra form
    if (!formData.username || !formData.password) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Tìm người dùng
    const user = users.find(u => 
      (u.username === formData.username || u.email === formData.username) && 
      u.password === formData.password
    );

    if (user) {
      // Lưu thông tin người dùng đang đăng nhập
      localStorage.setItem("currentUser", JSON.stringify(user));
      
      // Gọi hàm callback để thông báo đăng nhập thành công
      onLoginSuccess(user);
      
      // Đóng modal
      onClose();
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  // Xử lý đăng ký
  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");

    // Kiểm tra form
    if (!formData.username || !formData.password || !formData.fullName || !formData.phone) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu nhập lại không khớp!");
      return;
    }

    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Kiểm tra xem tên đăng nhập đã tồn tại chưa
    if (users.some(user => user.username === formData.username)) {
      setError("Tên đăng nhập đã tồn tại!");
      return;
    }

    // Tạo người dùng mới
    const newUser = {
      id: Date.now().toString(),
      username: formData.username,
      email: formData.username, // Sử dụng cùng giá trị cho email và username
      password: formData.password,
      fullName: formData.fullName,
      phone: formData.phone
    };

    // Thêm vào danh sách người dùng
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Đăng nhập luôn sau khi đăng ký
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    
    // Gọi hàm callback để thông báo đăng nhập thành công
    onLoginSuccess(newUser);
    
    // Đóng modal
    onClose();
  };
  // xử lí đăng nhập bằNg gg 
  const handleLoginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        id: user.uid,
        username: user.email,
        email: user.email,
        fullName: user.displayName,
        phone: user.phoneNumber || "",
        avatar: user.photoURL,
        password: ""
      };

      localStorage.setItem("currentUser", JSON.stringify(userData));
      onLoginSuccess(userData);
      onClose();
    } catch (error) {
      console.error("Lỗi đăng nhập Google:", error);
      setError("Đăng nhập bằng Google thất bại!");
    }
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

        {/* Hiển thị lỗi nếu có */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
          {/* Email hoặc tên đăng nhập */}
          <div>
            <label className="block text-xl font-medium text-gray-700 mb-1">
              Tên đăng nhập / Email
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Nhập email hoặc tên đăng nhập"
            />
          </div>
          
          {/* Họ và tên - chỉ hiện khi đăng ký */}
          {isSignUp && (
            <>
              <div>
                <label className="block text-xl font-medium text-gray-700 mb-1">
                  Nhập họ và tên
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
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
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
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
          <button
          onClick={handleLoginWithGoogle}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition duration-300">
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
            type="button"
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