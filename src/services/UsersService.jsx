import axios from "axios";

const postRegisterUser = (data) => {
  return axios.post(
    "https://mymovies-journal.herokuapp.com/api/users/register",
    data
  );
};

const postLoginUser = (data) => {
  return axios.post(
    "https://mymovies-journal.herokuapp.com/api/users/login",
    data
  );
};

const deleteLogoutUser = (data) => {
  return axios.post(
    "https://mymovies-journal.herokuapp.com/api/users/logout",
    data
  );
};

const UsersService = {
  postRegisterUser,
  postLoginUser,
  deleteLogoutUser,
};

export default UsersService;
