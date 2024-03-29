import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";

const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  // Fungsi renderRatingStars digunakan untuk menghasilkan tampilan bintang rating berdasarkan nilai rating yang diberikan.
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
    return stars; // Kembalikan array yang berisi elemen-elemen bintang yang telah dibuat
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

const MovieSlider = ({ title, movies }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        setPopularMovies(popularResponse.data.results.slice(0, 8));

        const topRatedResponse = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${API_KEY}`
        );
        setTopRatedMovies(topRatedResponse.data.results.slice(0, 8));

        const trendingResponse = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            params: {
              api_key: API_KEY,
            },
          }
        );
        setTrendingMovies(trendingResponse.data.results.slice(0, 8));

        const nowPlayingResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
        );
        setNowPlayingMovies(nowPlayingResponse.data.results.slice(0, 8));

        const upcomingResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
        );
        setUpcomingMovies(upcomingResponse.data.results.slice(0, 8));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-red-800 min-h-screen">
      <Navbar />
      <Header />
      <div className="container mx-auto p-4">
        <div className="mb-20 mt-20">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Top Rated Movies
            </h2>
            <Link to="/all-top-rated" className="text-white mt-4 block">
              View All Top Rated Movies
            </Link>
          </div>
          <MovieSlider movies={topRatedMovies} />
        </div>
        <div className="mb-20">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Trending Movies
            </h2>
            <Link to="/all-trending-movies" className="text-white mt-4 block">
              View All Trending Movies
            </Link>
          </div>
          <MovieSlider movies={trendingMovies} />
        </div>
        <div className="mb-20">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Now Playing</h2>
            <Link to="/all-now-playing" className="text-white mt-4 block">
              View All Now Playing Movies
            </Link>
          </div>
          <MovieSlider movies={nowPlayingMovies} />
        </div>
        <div className="mb-20">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Popular Movies
            </h2>
            <Link to="/all-popular-movies" className="text-white mt-4 block">
              View All Popular Movies
            </Link>
          </div>
          <MovieSlider movies={popularMovies} />
        </div>
        <div className="mb-20">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Upcoming Movies
            </h2>
            <Link to="/all-upcoming-movies" className="text-white mt-4 block">
              View All Upcoming Movies
            </Link>
          </div>
          <MovieSlider movies={upcomingMovies} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
