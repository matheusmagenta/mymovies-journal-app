import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MoviesService from "../../services/MoviesService";
import MovieAddReview from "../MovieAddReview/MovieAddReview";
import MovieEditReview from "../MovieEditReview/MovieEditReview";
import { UserContext } from "../../context/UserContext";
import { Rating } from "react-simple-star-rating";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

const ShowMovieReview = ({ movieProfile, toggleEditing }) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(false);

  const { reviewEditing, setReviewEditing, userLogged } =
    useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    setReviews(movieProfile.movieHasReview);

    //console.log("reviews:", reviews);
    setLoading(false);
  }, []);

  const handleDelete = async (event) => {
    // event.preventDefault();

    const movieViaAxios = {
      idMongo: event.target.parentElement.previousSibling.dataset.idmongo,
    };
    console.log("movieViaAxios to be delete:", movieViaAxios);
    await MoviesService.deleteFromMovieListFromDB(movieViaAxios.idMongo, id);
  };

  return (
    <>
      {loading && <Spinner animation="border" />}
      {!loading &&
        reviews.map((review, key) => {
          //console.log("review", review);

          if (userLogged._id !== review.user._id) {
            return (
              <Card data-idmongo={review._id} key={key} border="light">
                <Card.Body>
                  <Card.Title>
                    {" "}
                    <h3>{review.title}</h3>
                    <p style={{ fontWeight: "100", fontSize: "12px" }}>
                      by {review.user.name}
                    </p>
                    <Rating
                      ratingValue={review.starRating}
                      size={"25px"}
                      readonly={true}
                    />
                  </Card.Title>
                  <Card.Text>{review.description}</Card.Text>
                </Card.Body>
              </Card>
            );
          }
          if (userLogged._id === review.user._id) {
            return (
              <Card data-idmongo={review._id} key={key} border="light">
                <Card.Body>
                  <Card.Title>
                    {" "}
                    <h3>{review.title}</h3>
                    <p style={{ fontWeight: "100", fontSize: "12px" }}>
                      by {review.user.name}
                    </p>
                    <Rating
                      ratingValue={review.starRating}
                      size={"25px"}
                      readonly={true}
                    />
                  </Card.Title>
                  <Card.Text>{review.description}</Card.Text>
                  <Card.Footer>
                    <Button
                      type="submit"
                      className="edit-review"
                      variant="outline-dark"
                      size="sm"
                      onClick={() => {
                        setReviewEditing({
                          title: review.title,
                          description: review.description,
                          idMongo: review._id,
                          starRating: review.starRating,
                        });
                        toggleEditing();
                      }}
                    >
                      edit review
                    </Button>
                    <Button
                      type="submit"
                      variant="outline-dark"
                      size="sm"
                      className="delete-review"
                      onClick={(event) => {
                        handleDelete(event);
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
                      delete review
                    </Button>
                  </Card.Footer>
                </Card.Body>
              </Card>
            );
          }
        })}
    </>
  );
};

export default ShowMovieReview;
