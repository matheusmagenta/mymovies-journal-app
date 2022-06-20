import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import MoviesService from "../../services/MoviesService";
import { Slider } from "@lifarl/react-scroll-snap-slider";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiFastForward } from "react-icons/bi";

const MostReviewed = ({ poster_path }) => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    MoviesService.getMostReviewedFromDB().then(
      (data) => {
        setLoading(true);
        // console.log("data.data", data.data);
        data = data.data.map(
          (movie) =>
            (movie = {
              id: movie._id.idMovieApi,
              poster_path: `https://image.tmdb.org/t/p/w500${movie._id.posterPath}`,
            })
        );
        // console.log("data: ", data);

        setGallery(data);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setGallery([]);
      }
    );
  }, []);

  return (
    <>
      {loading && <Spinner animation="border" />}
      <h5 style={{ fontWeight: "100", marginTop: "20px", marginBottom: "5px" }}>
        {" "}
        <BiFastForward /> most reviewed
      </h5>
      {!loading && (
        <Slider slidesPerPageSettings={4}>
          {gallery.map((movie, key) => {
            return (
              <Link to={"/search/movies/" + movie.id} key={key}>
                <img src={movie.poster_path} style={{ height: "180px" }} />
              </Link>
            );
          })}
        </Slider>
      )}
    </>
  );
};

export default MostReviewed;
