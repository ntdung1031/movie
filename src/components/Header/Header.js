import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineLanguage } from "react-icons/md";
import '~/components/Header/Header.scss';
import logo from "~/assets/img/logo.jpg"; // Thay bằng logo thực tế
import { movieData } from "~/data/Movie"; // Import dữ liệu mẫu
import Login from "~/components/Login/Login"; // Import component Login

const Header = () => {
  const [selectedTheater, setSelectedTheater] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [dateList, setDateList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [timeList, setTimeList] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Kiểm tra người dùng đã đăng nhập khi tải trang
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  // Khi chọn rạp -> cập nhật danh sách phim
  const handleTheaterChange = (e) => {
    const theaterName = e.target.value;
    setSelectedTheater(theaterName);

    // Lọc danh sách phim theo rạp
    const selectedMovies = movieData.find((t) => t.theater === theaterName);
    setMovieList(selectedMovies ? selectedMovies.movies : []);

    // Reset các lựa chọn sau
    setSelectedMovie("");
    setDateList([]);
    setSelectedDate("");
    setTimeList([]);
  };

  // Khi chọn phim -> cập nhật danh sách ngày
  const handleMovieChange = (e) => {
    const movieName = e.target.value;
    setSelectedMovie(movieName);

    // Lọc danh sách ngày theo phim
    const selectedMovieData = movieList.find((m) => m.name === movieName);
    setDateList(selectedMovieData ? selectedMovieData.showtimes : []);

    // Reset các lựa chọn sau
    setSelectedDate("");
    setTimeList([]);
  };

  // Khi chọn ngày -> cập nhật danh sách suất chiếu
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);

    // Lọc danh sách suất chiếu theo ngày
    const selectedShowtime = dateList.find((d) => d.date === date);
    setTimeList(selectedShowtime ? selectedShowtime.times : []);
  };

  // Hàm mở modal đăng nhập
  const openLoginModal = () => {
    setIsLoginOpen(true);
  };

  // Hàm đóng modal đăng nhập
  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  // Xử lý khi đăng nhập thành công
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setShowUserMenu(false);
  };

  // Hiển thị/ẩn menu người dùng
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <>
      <header className="text-white w-full mt-6 mb-6">
        {/* Thanh trên */}
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <img src={logo} alt="Cinestar" className="h-12" />

          {/* Nút đặt vé & đặt bắp nước */}
          <div className="flex gap-4">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold">
              📱 ĐẶT VÉ NGAY
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold">
              🍿 ĐẶT BẮP NƯỚC
            </button>
          </div>

          {/* Đăng nhập & Ngôn ngữ */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              // Hiển thị thông tin người dùng đã đăng nhập
              <div className="relative">
                <button 
                  className="flex items-center gap-2 font-medium" 
                  onClick={toggleUserMenu}
                >
                  <FaUserCircle size={24} />
                  <span>{currentUser.fullName || currentUser.username}</span>
                  <IoMdArrowDropdown size={20} />
                </button>
                
                {/* Menu dropdown khi đã đăng nhập */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <button
                        className="block w-full text-left px-4 py-2 text-xl text-gray-700 hover:bg-gray-100"
                      >
                        Thông tin tài khoản
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-xl text-gray-700 hover:bg-gray-100"
                      >
                        Lịch sử đặt vé
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-xl text-red-600 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Hiển thị nút đăng nhập nếu chưa đăng nhập
              <>
                <FaUserCircle size={24} />
                <button className="font-medium" onClick={openLoginModal}>Đăng nhập</button>
              </>
            )}
            <MdOutlineLanguage size={24} />
            <span className="font-medium">VN</span>
          </div>
        </div>

        {/* Thanh dưới */}
        <div className="color-down text-black px-10 py-4 rounded-lg mt-12 mb-6 shadow-md">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">ĐẶT VÉ NHANH</span>
            <div className="flex gap-4">
              {/* Chọn Rạp */}
              <select
                className="color-choise-mv border px-6 py-3 rounded-lg text-2xl font-medium"
                onChange={handleTheaterChange}
                value={selectedTheater}
              >
                <option value="">1. Chọn Rạp</option>
                {movieData.map((theater) => (
                  <option key={theater.id} value={theater.theater}>
                    {theater.theater}
                  </option>
                ))}
              </select>

              {/* Chọn Phim */}
              <select
                className="color-choise-mv border px-6 py-3 rounded-lg text-2xl font-medium"
                onChange={handleMovieChange}
                value={selectedMovie}
                disabled={!selectedTheater}
              >
                <option value="">2. Chọn Phim</option>
                {movieList.map((movie) => (
                  <option key={movie.id} value={movie.name}>
                    {movie.name}
                  </option>
                ))}
              </select>

              {/* Chọn Ngày */}
              <select
                className="color-choise-mv border px-6 py-3 rounded-lg text-2xl font-medium"
                onChange={handleDateChange}
                value={selectedDate}
                disabled={!selectedMovie}
              >
                <option value="">3. Chọn Ngày</option>
                {dateList.map((date) => (
                  <option key={date.date} value={date.date}>
                    {date.date}
                  </option>
                ))}
              </select>

              {/* Chọn Suất */}
              <select className="color-choise-mv border px-6 py-3 rounded-lg text-2xl font-medium" disabled={!selectedDate}>
                <option value="">4. Chọn Suất</option>
                {timeList.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>

              {/* Nút ĐẶT NGAY */}
              <button className="bg-purple-700 text-white px-6 py-3 text-lg font-bold rounded-md shadow-md 
                                hover:bg-purple-800 transition duration-300">
                ĐẶT NGAY
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <Login 
        isOpen={isLoginOpen} 
        onClose={closeLoginModal} 
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Header;