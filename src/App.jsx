import React, { useState, useEffect } from "react";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SearchPage from "./pages/SearchPage/SearchPage";
import ShowMyMoviesPage from "./pages/ShowMyMoviesPage/ShowMyMoviesPage";
import ShowMoviePage from "./pages/ShowMoviePage/ShowMoviePage";
import TrendingPage from "./pages/TrendingPage/TrendingPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import LogoutPage from "./pages/LogoutPage/LogoutPage";
import { UserContext } from "./context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");
  const [userLogged, setUserLogged] = useState({});
  const [reviewEditing, setReviewEditing] = useState({});
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider
          value={{
            isLogged,
            setIsLogged,
            refreshToken,
            setRefreshToken,
            userLogged,
            setUserLogged,
            reviewEditing,
            setReviewEditing,
            showRegisterModal,
            setShowRegisterModal,
            showLoginModal,
            setShowLoginModal,
          }}
        >
          <Header />
          {showRegisterModal && <RegisterModal />}
          {showLoginModal && <LoginModal />}

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/trending" element={<TrendingPage />} />
            <Route path="/search/movies/:id" element={<ShowMoviePage />} />
            <Route path="/movielist" element={<ShowMyMoviesPage />} />
            <Route path="/logout" element={<LogoutPage />} />

            <Route element={<RequireAuth />}></Route>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
