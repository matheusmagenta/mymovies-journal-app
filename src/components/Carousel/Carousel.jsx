import React, { useState, useEffect } from "react";
import { Carousel, Button } from "react-bootstrap";
import MoviesService from "../../services/MoviesService";
import { Link } from "react-router-dom";
import { BiFastForward } from "react-icons/bi";

const CarouselTrending = () => {
  const [trendingList, setTrendingList] = useState([]);

  useEffect(() => {
    MoviesService.getTrendingListFromApi().then(
      (data) => {
        // console.log("data: ", data.data);
        setTrendingList(data.data.slice(0, 11));
      },
      (error) => {
        console.log(error);
        setTrendingList([]);
      }
    );
  }, []);

  return (
    <>
      <h5 style={{ fontWeight: "100", marginBottom: "3px" }}>
        {" "}
        <BiFastForward /> trending
      </h5>
      <Carousel fade>
        {trendingList.map((movie, key) => {
          return (
            <Carousel.Item
              as={Link}
              to={"/search/movies/" + movie.id}
              key={key}
            >
              <img
                className="landing-image"
                src={
                  "https://image.tmdb.org/t/p/original" + movie.backdrop_path
                }
              />
              <Carousel.Caption style={{ textShadow: "2px #000000" }}>
                {movie.original_title}
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
};

export default CarouselTrending;
