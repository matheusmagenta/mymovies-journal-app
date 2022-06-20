import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MoviesService from "../../services/MoviesService";
import { UserContext } from "../../context/UserContext";
import { Rating } from "react-simple-star-rating";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const MovieAddReview = ({ movieProfile }) => {
  let { id } = useParams();
  let navigate = useNavigate();

  const { userLogged } = useContext(UserContext);
  const [starRating, setStarRating] = useState(0);

  const [movieAddReview, setMovieAddReview] = useState({});
  const [formData, setFormData] = useState({
    movieTitle: "",
    description: "",
    title: "",
    posterPath: "",
    voteAverage: "",
    idMovieApi: id,
  });

  useEffect(() => {
    setMovieAddReview(movieProfile.moviewHasReview);
  }, []);

  const handleChange = (event) => {
    // console.log("event.target: ", event.target);
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    // console.log("formData: ", formData);
  };

  const handleStarRating = (rate) => {
    setStarRating(rate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("formData to be added: ", formData);
    const movieViaAxios = {
      idMovieApi: id,
      movieTitle: movieProfile.movieDetails.original_title,
      posterPath: movieProfile.movieDetails.poster_path,
      voteAverage: movieProfile.movieDetails.vote_average,
      watchlist: true,
      title: formData.title,
      description: formData.description,
      userId: userLogged._id,
      userName: userLogged.name,
      starRating: starRating,
    };
    MoviesService.addToMovieListInDB(movieViaAxios).then(
      // TODO: when is successful, do this
      // TODO: implement toast to alert success
      (response) => {
        Toastify({
          text: "Movie added to my list ",
          style: { background: "#d2b878" },
          duration: 1000,
        }).showToast();
        // alert("review added");
        // TODO: refactor to update review
      },
      (error) => {
        // TODO: refactor to implement toast alerting the error
        Toastify({
          text: "Couldn't add the movie review",
          style: { background: "#d2b878" },
          duration: 1000,
        }).showToast();
        // alert("sorry, an error has ocurred" + error.message);
      }
    );
    // TODO: handle error (if this movie is not available anymore, or server is down)
  };

  return (
    <Form>
      <Form.Group>
        <Form.Control
          size="sm"
          type="text"
          placeholder="review title"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <Form.Control
          size="sm"
          as="textarea"
          rows={4}
          type="text"
          placeholder="review description"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Rating
        onClick={handleStarRating}
        ratingValue={starRating}
        allowHalfIcon={true}
        showTooltip={false}
        size={"25px"}
        style={{ marginTop: "10px" }}
      />

      <Button
        variant="outline-dark"
        size="sm"
        type="submit"
        style={{ marginTop: "10px", marginBottom: "20px" }}
        onClick={(event) => {
          handleSubmit(event);
          setTimeout(() => {
            navigate("/movielist");
          }, 1000);
        }}
      >
        add review
      </Button>
    </Form>
  );
};

export default MovieAddReview;
