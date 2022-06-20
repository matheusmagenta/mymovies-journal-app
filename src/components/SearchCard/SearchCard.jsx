import React from "react";
import { Link } from "react-router-dom";
import noPoster from "../../assets/noPoster.jpg";
import imdbLogo from "../../assets/imdbLogo.png";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const SearchCard = ({ poster_path, original_title, vote_average, id }) => {
  return (
    <Card
      className="search-card"
      style={{ width: "8rem", padding: "0", margin: "25px", border: "none" }}
    >
      <Card.Img
        variant="top"
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : noPoster
        }
      />
      <Card.Body
        style={{
          padding: "0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Card.Title style={{ fontSize: "16px" }}>{original_title}</Card.Title>
        <Card.Text style={{ padding: "0", fontSize: "12px" }}>
          <img className="imdb-logo" src={imdbLogo} />
          {vote_average !== 0 ? vote_average : "no rating"}
        </Card.Text>
        <Link data-id={id} to={"/search/movies/" + id}>
          <Button
            variant="outline-dark"
            size="sm"
            style={{
              padding: "4px",
              fontSize: "12px",
              borderRadius: "0px",
              borderColor: "#BEBEBE",
            }}
          >
            see details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default SearchCard;
