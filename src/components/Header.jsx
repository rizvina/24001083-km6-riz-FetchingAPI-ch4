import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import { FaPlay } from "react-icons/fa";
import axios from "axios";
import Navbar from "../components/Navbar"; // Import komponen Navbar

export default function Home() {
  const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";
  const elementRef = useRef();
  const [currentMovie, setCurrentMovie] = useState(0);
  const [movies, setMovies] = useState([]);

  // Mengambil data film populer
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results.slice(0, 6));
      } catch (err) {
        console.log("Error fetching movies: ", err);
      }
    };
    fetchPopularMovies();
  }, []);

  useEffect(() => {
    // Set interval untuk mengubah currentMovie setiap 2 detik
    const interval = setInterval(() => {
      setCurrentMovie((prevMovie) => (prevMovie + 1) % movies.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [movies]);

  // Fungsi untuk memutar trailer film
  const playTrailer = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en`
      );
      // Menyimpan hasil respons dari API dalam variabel videos
      const videos = response.data.results;
      if (videos.length > 0) {
        const trailerKey = videos[0].key;
        window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank");
      } else {
        console.log("Tidak ada trailer tersedia untuk film ini.");
      }
    } catch (err) {
      // Tangani kesalahan jika ada kesalahan saat melakukan fetch trailer
      console.log("Error fetching trailer: ", err);
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="carousel-container">
        <div className="carousel">
          {/* Menggunakan method map untuk menampilkan setiap film dari state movies */}
          {movies.map((movie, index) => (
            <div
              key={index} // Set kunci unik untuk setiap elemen dalam daftar
              className={`carousel-slide ${
                index === currentMovie ? "show" : ""
              }`} // Menambahkan kelas "show" pada slide yang sedang ditampilkan
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
            >
              <div className="overlay flex flex-col mb-36 font-extrabold text-white">
                <h1 className="text-6xl whitespace-normal max-w-sm mb-3">
                  {movie.title} {/* Menampilkan judul film */}
                </h1>
                <p className="max-w-sm">{movie.overview.slice(0, 75)}... </p>

                <div className="left-0 p-4 mr-2">
                  {/* Tombol untuk memutar trailer */}
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-500 flex items-center"
                    onClick={() => playTrailer(movies[currentMovie].id)}
                  >
                    <FaPlay className="mr-2" />
                    Trailer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
