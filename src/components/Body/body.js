import React from "react";
import { movies } from "~/data/mv-coming"; // Import dữ liệu phim từ file mv-coming.js

const Body = () => {
  return (
    <div className="p-4 bg-gray-900 text-white">
      <h2 className="text-7xl font-bold mb-4 text-center mt-7 mb-10">Phim Đang Chiếu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {movies.map((movie, index) => (
          <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
            {/* Ảnh phim */}
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-40 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 h-full"
            />
            
            {/* Lớp phủ hiển thị thông tin khi hover */}
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-sm">{movie.genre} | {movie.duration} phút</p>
              <p className="text-sm">{movie.country} - {movie.language}</p>
              <button className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                Xem Trailer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;