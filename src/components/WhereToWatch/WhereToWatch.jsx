import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MoviesService from "../../services/MoviesService";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";

const WhereToWatch = () => {
  const [whereToWatch, setWhereToWatch] = useState({});

  let { id } = useParams();

  useEffect(
    () =>
      MoviesService.getMovieCard(id).then(
        (data) => {
          // console.log("data.data.whereToWatch: ", data.data.whereToWatch);
          data.data.whereToWatch
            ? setWhereToWatch(data.data.whereToWatch)
            : setWhereToWatch({});
        },
        (error) => {
          console.log(error);
          setWhereToWatch({});
        }
      ),
    []
  );
  return (
    <>
      <div className="streaming">
        {whereToWatch.flatrate ? (
          <Container>
            <Row>
              <Col>
                {whereToWatch.flatrate ? (
                  <div className="flatrate">
                    <div className="streaming-category">stream</div>
                    <ListGroup variant="flush">
                      {whereToWatch.flatrate.map((service) => (
                        <ListGroup.Item key={service.item}>
                          <img
                            className="platform-logo"
                            src={
                              "https://image.tmdb.org/t/p/w500" + service.logo
                            }
                          />
                          <p>{service.item}</p>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                ) : (
                  <div className="streaming-category">stream</div>
                )}
              </Col>
              <Col>
                {whereToWatch.rent ? (
                  <div className="rent">
                    <div className="streaming-category">rent</div>
                    <ListGroup variant="flush">
                      {whereToWatch.rent.map((service) => (
                        <ListGroup.Item
                          className="streaming-item"
                          key={service.item}
                        >
                          <img
                            className="platform-logo"
                            src={
                              "https://image.tmdb.org/t/p/w500" + service.logo
                            }
                          />
                          <p>{service.item}</p>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                ) : (
                  ""
                )}
              </Col>
              <Col>
                {whereToWatch.buy ? (
                  <div className="buy">
                    <div className="streaming-category">buy</div>
                    <ListGroup variant="flush">
                      {whereToWatch.buy.map((service) => (
                        <ListGroup.Item
                          className="streaming-item"
                          key={service.item}
                        >
                          <img
                            className="platform-logo"
                            src={
                              "https://image.tmdb.org/t/p/w500" + service.logo
                            }
                          />
                          <p>{service.item}</p>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </Container>
        ) : (
          "n/a"
        )}

        <p style={{ fontSize: "7px", textAlign: "center" }}>by justwatch</p>
      </div>
    </>
  );
};
export default WhereToWatch;
