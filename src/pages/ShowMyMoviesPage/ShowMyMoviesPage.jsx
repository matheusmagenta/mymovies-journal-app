import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MoviesService from "../../services/MoviesService";
import imdbLogo from "../../assets/imdbLogo.png";
import noPoster from "../../assets/noPoster.jpg";
import SearchCard from "../../components/SearchCard/SearchCard";
import { UserContext } from "../../context/UserContext";
import { Spinner } from "react-bootstrap";

const ShowMyMoviesPage = () => {
  const [moviesList, setMoviesList] = useState([]);

  const [loading, setLoading] = useState(false);

  const { isLogged, setIsLogged, userLogged } = useContext(UserContext);

  // TODO: if loading, show loading message. otherwise, return the view (materialUI icon)

  useEffect(() => {
    setLoading(true);

    // console.log("userLogged: ", userLogged);
    MoviesService.getUserReviewsFromDB(userLogged._id).then(
      (data) => {
        // console.log("data: ", data.data.reviews);

        // removing duplicates (same movie with multiple reviews)
        const idsMyMovies = data.data.reviews.map((o) => o.idMovieApi);
        const filteredMyMovies = data.data.reviews.filter(
          ({ idMovieApi }, index) =>
            !idsMyMovies.includes(idMovieApi, index + 1)
        );
        //console.log("filteredMyMovies: ", filteredMyMovies);

        setMoviesList(filteredMyMovies);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setMoviesList([]);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="movie-grid">
      {loading && <Spinner animation="border" />}
      {!loading &&
        moviesList.map((movie, key) => {
          return (
            <SearchCard
              poster_path={movie.posterPath}
              original_title={movie.movieTitle}
              vote_average={movie.voteAverage}
              id={movie.idMovieApi}
              key={key}
            />
          );
        })}
    </div>
  );
};

export default ShowMyMoviesPage;
