import React, { useState, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import WhereToWatch from "../../components/WhereToWatch/WhereToWatch";
import MovieAddReview from "../../components/MovieAddReview/MovieAddReview";
import MovieEditReview from "../../components/MovieEditReview/MovieEditReview";
import ShowMovieReview from "../../components/ShowMovieReview/ShowMovieReview";
import LoginPage from "../../pages/LoginPage/LoginPage";
import { UserContext } from "../../context/UserContext";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import MoviesService from "../../services/MoviesService";

const ShowMoviePage = () => {
  let { id } = useParams();
  // console.log("id: ", id);

  const [movieProfile, setMovieProfile] = useState({});
  const { isLogged } = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(
    () =>
      MoviesService.getMovieCard(id).then(
        (data) => {
          // console.log("data.data: ", data.data);
          setMovieProfile(data.data);
        },
        (error) => {
          console.log(error);
          setMovieProfile({});
        }
      ),
    [isLogged]
  );

  // console.log("movieProfile: ", movieProfile);
  // console.log("isLogged: ", isLogged);

  return (
    <>
      {movieProfile.movieDetails && <MovieCard movieProfile={movieProfile} />}

      {movieProfile.movieHasReview ? (
        <>
          {isEditing ? (
            <Tabs>
              <Tab eventKey="edit-review" title="edit review">
                <MovieEditReview
                  movieProfile={movieProfile}
                  toggleEditing={() => {
                    setIsEditing(false);
                  }}
                />
              </Tab>
              {isLogged ? (
                <Tab eventKey="add-review" title="add review">
                  <MovieAddReview movieProfile={movieProfile} />
                </Tab>
              ) : (
                <Tab eventKey="add-review" title="add review">
                  <LoginPage />
                </Tab>
              )}

              <Tab eventKey="streaming" title="streaming">
                <WhereToWatch movieProfile={movieProfile} />
              </Tab>
            </Tabs>
          ) : (
            <Tabs>
              <Tab eventKey="reviews" title="reviews">
                <ShowMovieReview
                  movieProfile={movieProfile}
                  toggleEditing={() => {
                    setIsEditing(true);
                  }}
                />
              </Tab>
              {isLogged ? (
                <Tab eventKey="add-review" title="add review">
                  <MovieAddReview movieProfile={movieProfile} />
                </Tab>
              ) : (
                <Tab eventKey="add-review" title="add review">
                  <LoginPage />
                </Tab>
              )}
              <Tab eventKey="streaming" title="streaming">
                <WhereToWatch movieProfile={movieProfile} />
              </Tab>
            </Tabs>
          )}
        </>
      ) : (
        <Tabs>
          <Tab eventKey="streaming" title="streaming">
            <WhereToWatch movieProfile={movieProfile} />
          </Tab>

          {isLogged ? (
            <Tab eventKey="add-review" title="add review">
              <MovieAddReview movieProfile={movieProfile} />
            </Tab>
          ) : (
            <Tab eventKey="add-review" title="add review">
              <LoginPage />
            </Tab>
          )}
        </Tabs>
      )}
    </>
  );
};

export default ShowMoviePage;
