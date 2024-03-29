import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const renderRatingStars = (rating) => {
    const stars = [];
    const numStars = Math.round(rating / 2);
    for (let i = 0; i < 5; i++) {
      if (i < numStars) {
        stars.push(
          <span key={i} className="text-yellow-400">
            &#9733;
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-400">
            &#9733;
          </span>
        );
      }
    }
    return stars;
  };

  const handleClick = () => {
    navigate("/movie-detail", { state: { id: movie.id } });
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg"
      onClick={handleClick}
    >
      <img
        className="w-full h-auto"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt=""
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-2 text-white">{movie.title}</h2>
        <p className="text-gray-300">Release date: {movie.release_date}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            {renderRatingStars(movie.vote_average)}
            <span className="text-white ml-1">
              {movie?.vote_average?.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllNowPlayingMovies = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [sortBy, setSortBy] = useState(""); // State untuk menyimpan pilihan pengurutan

  useEffect(() => {
    // Fungsi async untuk mengambil data film yang sedang diputar saat ini
    const fetchNowPlayingMovies = async () => {
      try {
        // Mengirimkan permintaan GET ke API untuk mendapatkan data film yang sedang diputar
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${currentPage}`
        );
        // Menambahkan data film yang baru diambil ke dalam state nowPlayingMovies dengan menyebarkan array yang ada dan hasil dari response
        setNowPlayingMovies([...nowPlayingMovies, ...response.data.results]);
        // Menetapkan halaman terakhir ke halaman saat ini untuk memperbarui state lastPage
        setLastPage(lastPage + 1);
      } catch (error) {
        console.error("Error fetching now playing movies: ", error); // Menangani kesalahan jika gagal mengambil data film
      }
    };
    // Memanggil fungsi fetchNowPlayingMovies hanya jika halaman terakhir tidak sama dengan halaman saat ini
    if (lastPage !== currentPage) {
      fetchNowPlayingMovies(); // Memanggil fungsi untuk mengambil data film
    }
  }, [currentPage]); // useEffect akan dipanggil setiap kali currentPage berubah

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&language=en-US&page=${currentPage}`
      );

      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      alert("Please enter a search query.");
      return;
    }
    setCurrentPage(1);
    searchMovies();
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      setMovies([]);
    }
    setQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const renderMovies = () => {
    let sortedMovies = [...nowPlayingMovies]; // Salin array nowPlayingMovies agar tidak mempengaruhi state

    if (sortBy === "latest") {
      sortedMovies.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      ); // Urutkan berdasarkan tanggal rilis terbaru
    } else if (sortBy === "oldest") {
      sortedMovies.sort(
        (a, b) => new Date(a.release_date) - new Date(b.release_date)
      ); // Urutkan berdasarkan tanggal rilis terlama
    } else if (sortBy === "title-asc") {
      sortedMovies.sort((a, b) => a.title.localeCompare(b.title)); // Urutkan secara A-Z berdasarkan judul
    } else if (sortBy === "title-desc") {
      sortedMovies.sort((a, b) => b.title.localeCompare(a.title)); // Urutkan secara Z-A berdasarkan judul
    }
    return query.length >= 3 && movies.length !== 0 ? movies : sortedMovies;
  };

  return (
    <div className="bg-red-800">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="mb-40"></div>
        <div className="flex justify-between items-center mb-6">
          <div className="">
            <form onSubmit={handleSubmit} className="flex justify-start">
              <input
                type="text"
                placeholder="Search Movie"
                value={query}
                onChange={handleChange}
                className="rounded-xl h-8 bg-[#3a3333] text-white w-96 px-2"
              />
              <button
                type="submit"
                className="bg-orange-400 px-2 py-1 rounded-lg ml-2 text-white"
              >
                Search
              </button>
            </form>
          </div>
          <div className="flex items-center">
            <label className="text-white mr-2">Sort by:</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="bg-gray-900 text-white border border-gray-700 rounded-md px-2 py-1"
            >
              <option value="">Select</option>
              <option value="latest">Latest Release</option>
              <option value="oldest">Oldest Release</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
            </select>
          </div>
          <h1 className="text-4xl text-center font-bold text-white">
            ALL NOW PLAYING MOVIES
          </h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {renderMovies().map((movie, index) => (
            <MovieCard
              key={`${movie.id}-${index}`}
              movie={movie}
              onClick={() => {
                navigate("/movie-detail", { state: { id: movie.id } });
              }}
            />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="bg-yellow-400 text-white py-3 px-6 rounded-full font-bold text-xl shadow-md hover:bg-yellow-500 transition duration-300"
          >
            Load More
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllNowPlayingMovies;
