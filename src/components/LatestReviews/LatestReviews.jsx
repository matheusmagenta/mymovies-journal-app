import React, { useState, useEffect } from "react";
import MoviesService from "../../services/MoviesService";
import Spinner from "react-bootstrap/Spinner";
import { Card } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { Slider } from "@lifarl/react-scroll-snap-slider";
import { BiFastForward } from "react-icons/bi";

const LatestReviews = () => {
  const [loading, setLoading] = useState(false);
  const [latestReviews, setLatestReviews] = useState([]);

  useEffect(() => {
    setLoading(true);

    MoviesService.getLatestReviewsFromDB().then(
      (data) => {
        // console.log("data.data: ", data.data);
        setLatestReviews(data.data);
        //console.log("latestReviews: ", latestReviews);
      },
      (error) => {
        console.log(error);
        setLatestReviews([]);
      }
    );
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Spinner animation="border" />}
      <h5 style={{ fontWeight: "100", marginTop: "20px" }}>
        {" "}
        <BiFastForward /> latest reviews
      </h5>
      {!loading && (
        <div>
          <Slider slidesPerPageSettings={3}>
            {latestReviews.map((review, key) => {
              return (
                <Card
                  data-idmongo={review._id}
                  key={key}
                  border="light"
                  style={{ padding: "0" }}
                >
                  <Card.Body
                    style={{
                      width: "180px",
                      display: "flex",
                      flexDirection: "column",
                      padding: "0px px",
                    }}
                  >
                    <Card.Title>
                      {" "}
                      <h5 style={{ fontWeight: "400" }}>{review.title}</h5>
                      <p
                        style={{
                          fontWeight: "100",
                          fontSize: "12px",
                          marginBottom: "0px",
                        }}
                      >
                        by {review.user.name}
                      </p>
                      <Rating
                        ratingValue={review.starRating}
                        size={"15px"}
                        readonly={true}
                      />
                    </Card.Title>
                    <span
                      style={{
                        display: "inline-block",
                        whiteSpace: "pre-wrap",
                        height: "150px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        padding: "3px",
                        fontStyle: "italic",
                      }}
                    >
                      <p> {review.description}</p>
                    </span>
                  </Card.Body>
                </Card>
              );
            })}
          </Slider>
        </div>
      )}
    </>
  );
};

export default LatestReviews;
