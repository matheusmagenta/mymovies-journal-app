import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MoviesService from "../../services/MoviesService";
import { UserContext } from "../../context/UserContext";
import { Rating } from "react-simple-star-rating";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const MovieEditReview = ({ movieProfile, toggleEditing }) => {
  let { id } = useParams();
  let navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({});

  const { reviewEditing, setReviewEditing, userLogged } =
    useContext(UserContext);

  const [starRating, setStarRating] = useState(0);

  useEffect(() => {
    console.log("reviewEditing: ", reviewEditing);
    setFormData({
      title: reviewEditing.title,
      description: reviewEditing.description,
    });
    setIsLoaded(true);
    setStarRating(reviewEditing.starRating);
  }, []);

  const handleStarRating = (rate) => {
    setStarRating(rate);
  };

  const handleChange = (event) => {
    // console.log("event.target: ", event.target);
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    // console.log("formData: ", formData);
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    // console.log("event.target: ", event.target.parentElement);
    // console.log("formData to be added: ", formData);
    const movieViaAxios = {
      idMovieApi: id,
      movieTitle: movieProfile.movieDetails.original_title,
      posterPath: movieProfile.movieDetails.poster_path,
      voteAverage: movieProfile.movieDetails.vote_average,
      userId: userLogged._id,
      userName: userLogged.name,
      watchlist: true,
      title: formData.title,
      description: formData.description,
      starRating: starRating,
      idMongo: reviewEditing.idMongo,
    };
    //  console.log("movieViaAxios: ", movieViaAxios);
    await MoviesService.postToUpdateMovieListInDB(movieViaAxios, id);
  };

  const handleDelete = async () => {
    await MoviesService.deleteFromMovieListFromDB(reviewEditing.idMongo, id);
  };

  return (
    <>
      {isLoaded && (
        <Form>
          <Form.Group>
            <Form.Control
              size="sm"
              type="text"
              name="title"
              id="title"
              cols="30"
              rows="2"
              value={formData.title}
              onChange={handleChange}
            />

            <Form.Control
              name="description"
              id="description"
              cols="30"
              rows="20"
              value={formData.description}
              onChange={handleChange}
              placeholder="review text"
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
            style={{ marginTop: "10px", marginBottom: "10px" }}
            onClick={(event) => {
              handleEdit(event);
              // TODO: refactor to use THEN
              Toastify({
                text: "Movie review updated",
                style: { background: "#d2b878" },
                duration: 1000,
              }).showToast();
              setTimeout(() => {
                toggleEditing();
                navigate("/movielist");
              }, 1000);
            }}
          >
            update
          </Button>
          <Button
            type="submit"
            size="sm"
            variant="outline-dark"
            className="delete-review"
            onClick={(event) => {
              handleDelete(event);
              // TODO: refactor to use THEN
              Toastify({
                text: "Movie review deleted",
                style: { background: "#d2b878" },
                duration: 1000,
              }).showToast();
              setTimeout(() => {
                navigate("/movielist");
              }, 1000);
            }}
          >
            delete
          </Button>
        </Form>
      )}
    </>
  );
};

export default MovieEditReview;
