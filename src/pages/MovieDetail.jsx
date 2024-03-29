import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";

export default function MovieDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [detail, setDetail] = useState({});

  const detailMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${location.state.id}?language=en-US&api_key=${API_KEY}`
      );
      setDetail(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    detailMovie();
  }, []);

  // Function to play trailer
  const playTrailer = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
      );
      const videos = response.data.results;
      if (videos.length > 0) {
        const trailerKey = videos[0].key;
        window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank");
      } else {
        console.log("No trailer available for this movie.");
      }
    } catch (err) {
      console.log("Error fetching trailer: ", err);
    }
  };

  return (
    <div>
      <div
        className="bg-cover bg-fixed bg-no-repeat bg-gray-500 bg-blend-multiply h-auto"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${detail?.backdrop_path})`,
        }}
      >
        <div className="flex justify-center container mx-auto py-20 gap-10 items-center backdrop-blur-sm">
          <img
            src={`https://image.tmdb.org/t/p/w500/${detail?.poster_path}`}
            alt={detail?.title}
            className="w-auto h-auto rounded-lg"
          />
          <div
            className="text-white font-sans bg-gray-600/75 rounded-xl shadow-lg p-10"
            key={detail?.id}
          >
            <div className="p-4">
              <h2 className="text-3xl font-semibold mb-2">{detail?.title}</h2>
              <p className="text-lg mb-2 border-b-2 pb-3">{detail?.overview}</p>
              <p className="text-lg">Release Date: {detail?.release_date}</p>
              <p className="text-lg">
                Vote Average: {parseFloat(detail?.vote_average).toFixed(1)}/10
              </p>
              <p className="text-lg">Popularity: {detail?.popularity}</p>
              <p className="text-lg">Votes: {detail?.vote_count}</p>
              <p className="text-lg">Duration: {detail?.runtime} minutes</p>
              <p className="text-lg">
                Language:{" "}
                {detail?.spoken_languages?.map((lang) => lang.name).join(", ")}
              </p>
              <p className="text-lg">
                Genres: {detail?.genres?.map((genre) => genre.name).join(", ")}
              </p>
            </div>
            <div className="left-0 p-4 mr-2">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-500 flex items-center"
                onClick={() => playTrailer(detail.id)}
              >
                <FaPlay className="mr-2" />
                Trailer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
