import React, { useState, useEffect } from "react";
import MoviesService from "../../services/MoviesService.jsx";
import SearchCard from "../SearchCard/SearchCard.jsx";
import { Button } from "react-bootstrap";

const Pagination = ({ search }) => {
  const [totalPages, setTotalPages] = useState("");
  const [movies, setMovies] = useState([]);

  const [pagination, setPagination] = useState(1);

  useEffect(() => {
    MoviesService.getMoviesSearchFromApi(search, pagination).then(
      (res) => {
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [search, pagination]);

  const handlePagination = (event) => {
    event.preventDefault();
    const getNavigation = event.target.className;
    console.log("getNavigation: ", getNavigation);
    if (getNavigation.includes("previous-page")) {
      setPagination(() => pagination - 1);
      // console.log("pagination: ", pagination);
    }
    if (getNavigation.includes("next-page")) {
      setPagination(() => pagination + 1);
      // console.log("pagination: ", pagination);
    }
  };

  return (
    <>
      {pagination === 1 && pagination < totalPages && (
        <div className="pagination-nav">
          <div className="pagination-text">
            page {pagination} of {totalPages}
          </div>
          <Button
            variant="outline-dark"
            className="next-page"
            onClick={handlePagination}
          >
            →
          </Button>
        </div>
      )}
      {pagination > 1 && pagination < totalPages && (
        <div className="pagination-nav">
          <Button
            variant="outline-dark"
            className="previous-page"
            onClick={handlePagination}
          >
            ←
          </Button>

          <div className="pagination-text">
            page {pagination} of {totalPages}
          </div>
          <Button
            variant="outline-dark"
            className="next-page"
            onClick={handlePagination}
          >
            →
          </Button>
        </div>
      )}
      {pagination === totalPages && (
        <div className="pagination-nav">
          <Button
            variant="outline-dark"
            className="previous-page"
            onClick={handlePagination}
          >
            ←
          </Button>

          <div className="pagination-text">
            page {pagination} of {totalPages}
          </div>
        </div>
      )}

      <div className="movie-grid">
        {movies &&
          movies.map((movie) => {
            return (
              <SearchCard
                poster_path={movie.poster_path}
                original_title={movie.original_title}
                vote_average={movie.vote_average}
                id={movie.id}
                key={movie.id}
              />
            );
          })}
      </div>
    </>
  );
};

export default Pagination;
