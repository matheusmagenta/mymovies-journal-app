import axios from "axios";

const getMoviesSearchFromApi = (query, page = "1") => {
  return axios.get("https://api.themoviedb.org/3/search/movie", {
    params: {
      api_key: "21545d3f8c898a2b27bafd3db0854b12",
      query: query,
      page: page,
    },
  });
};

const getUserReviewsFromDB = (id) => {
  return axios.get(`https://mymovies-journal.herokuapp.com/api/reviews/${id}`);
};

const getTrendingListFromApi = () => {
  return axios.get(
    "https://mymovies-journal.herokuapp.com/api/search/trending"
  );
};

const getMovieCard = (id) => {
  return axios.get(
    `https://mymovies-journal.herokuapp.com/api/search/movies/${id}`
  );
};

const getLatestReviewsFromDB = () => {
  return axios.get("https://mymovies-journal.herokuapp.com/api/reviews/latest");
};

const getMostReviewedFromDB = () => {
  return axios.get(
    "https://mymovies-journal.herokuapp.com/api/reviews/popular"
  );
};

const addToMovieListInDB = (data) => {
  // console.log("data to be added: ", data);
  return axios.post("https://mymovies-journal.herokuapp.com/api/reviews/", {
    data: data,
  });
};

const postToUpdateMovieListInDB = (data, id) => {
  return axios.post(
    `https://mymovies-journal.herokuapp.com/api/reviews/movies/${id}`,
    {
      data: data,
    }
  );
};

const deleteFromMovieListFromDB = (data, id) => {
  return axios.post(
    `https://mymovies-journal.herokuapp.com/api/reviews/movies/${id}/delete`,
    {
      data: data,
    }
  );
};

// this works as an index
const MoviesService = {
  getUserReviewsFromDB,
  getTrendingListFromApi,
  getMovieCard,
  getMoviesSearchFromApi,
  addToMovieListInDB,
  postToUpdateMovieListInDB,
  deleteFromMovieListFromDB,
  getLatestReviewsFromDB,
  getMostReviewedFromDB,
};

export default MoviesService;
