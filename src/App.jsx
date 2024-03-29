import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AllTopRatedMovies from "./pages/AllTopRatedMovies";
import AllNowPlayingMovies from "./pages/AllNowPlayingMovies";
import MovieDetail from "./pages/MovieDetail";
import AllPopularMovies from "./pages/AllPopularMovies";
import AllTrendingMovies from "./pages/AllTrendingMovies";
import AllUpcomingMovies from "./pages/AllUpcomingMovies";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-top-rated" element={<AllTopRatedMovies />} />
        <Route path="/all-now-playing" element={<AllNowPlayingMovies />} />
        <Route path="/movie-detail" element={<MovieDetail />} />
        <Route path="/all-popular-movies" element={<AllPopularMovies />} />
        <Route path="/all-trending-movies" element={<AllTrendingMovies />} />
        <Route path="/all-upcoming-movies" element={<AllUpcomingMovies />} />
      </Routes>
    </Router>
  );
}

export default App;
