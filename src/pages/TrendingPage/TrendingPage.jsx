import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MoviesService from "../../services/MoviesService";
import imdbLogo from "../../assets/imdbLogo.png";
import noPoster from "../../assets/noPoster.jpg";
import SearchCard from "../../components/SearchCard/SearchCard";

const TrendingPage = () => {
  const [trendingList, setTrendingList] = useState([]);

  useEffect(() => {
    MoviesService.getTrendingListFromApi().then(
      (data) => {
        // console.log("data: ", data.data);
        setTrendingList(data.data);
      },
      (error) => {
        console.log(error);
        setTrendingList([]);
      }
    );
  }, []);

  return (
    <div className="movie-grid">
      {trendingList.map((movie, key) => {
        return (
          <SearchCard
            poster_path={movie.poster_path}
            original_title={movie.original_title}
            vote_average={movie.vote_average}
            id={movie.id}
            key={key}
          />
        );
      })}
    </div>
  );
};

export default TrendingPage;
