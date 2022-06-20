import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MoviesService from "../../services/MoviesService";
import imdbLogo from "../../assets/imdbLogo.png";
import noPoster from "../../assets/noPoster.jpg";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const MovieCard = ({ movieProfile }) => {
  let { id } = useParams();

  const [movieCard, setMovieCard] = useState({});

  useEffect(() => {
    setMovieCard(movieProfile.movieDetails);
  }, []);

  // console.log("movieProfile:", movieProfile);

  return (
    <Card border="light">
      <div className="movie-profile">
        <Card.Img
          src={
            movieCard.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movieCard.poster_path}`
              : noPoster
          }
          alt="movie-poster"
          className="movie-poster"
        />
        <Card.Body>
          <Card.Title>{movieCard.original_title} </Card.Title>

          <Card.Subtitle
            className="movie-year"
            style={{ fontSize: "12px", fontWeight: "200" }}
          >
            {movieCard.release_date
              ? movieCard.release_date.slice(0, 4)
              : "n/a"}
          </Card.Subtitle>
          <Card.Subtitle
            className="vote-average"
            style={{
              fontSize: "12px",
              fontWeight: "200",
              marginTop: "3px",
              marginBottom: "10px",
            }}
          >
            <Card.Img className="imdb-logo" src={imdbLogo} />
            {movieCard.vote_average}/10
          </Card.Subtitle>

          <Card.Text className="overview">{movieCard.overview}</Card.Text>
        </Card.Body>
      </div>
    </Card>
  );
};

export default MovieCard;
