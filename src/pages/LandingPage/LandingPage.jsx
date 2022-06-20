import React, { useState, useEffect } from "react";
import MostReviewed from "../../components/MostReviewed/MostReviewed";
import CarouselTrending from "../../components/Carousel/Carousel";
import LatestReviews from "../../components/LatestReviews/LatestReviews";

const LandingPage = () => {
  return (
    <div style={{ padding: "30px" }}>
      <CarouselTrending />
      <MostReviewed />
      <LatestReviews />
    </div>
  );
};

export default LandingPage;
