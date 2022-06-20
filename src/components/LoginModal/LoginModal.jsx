import React, { useState, useEffect, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UsersService from "../../services/UsersService";
import { UserContext } from "../../context/UserContext";
import { Modal, Button, Form } from "react-bootstrap";

const LoginModal = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);

  const {
    isLogged,
    setIsLogged,
    setRefreshToken,
    setUserLogged,
    showLoginModal,
    setShowLoginModal,
  } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    UsersService.postLoginUser({
      email,
      password,
    })
      .then((response) => {
        // console.log("response: ", response);
        if (response.status === 200) {
          Toastify({
            text: `welcome back, ${response.data.data.name}`,
            style: { background: "#d2b878" },
            duration: 1000,
          }).showToast();
          setIsLogged(true);
          setRefreshToken(response.data.refreshToken);
          setUserLogged({
            email: response.data.data.email,
            name: response.data.data.name,
            _id: response.data.data._id,
            reviews: response.data.data.reviews,
          });
        }
      })
      .catch(() => {
        Toastify({
          text: `wrong login or password! try again`,
          style: { background: "#d2b878" },
          duration: 1000,
        }).showToast();
      });

    // return to the page that triggered the login request
    // navigate(from, { replace: true });
  };

  const handleSubmitAndCloseModal = (event) => {
    handleSubmit(event);
    handleCloseLoginModal();
  };

  return (
    <Modal
      show={showLoginModal}
      onHide={handleCloseLoginModal}
      centered
      size="sm"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Label htmlFor="email" visuallyHidden={true}>
            email
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            placeholder="type your email"
            required
          />
          <Form.Label htmlFor="password" visuallyHidden={true}>
            password
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            placeholder="type your password"
            required
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={handleSubmitAndCloseModal}
          type="submit"
          size="sm"
          variant="outline-dark"
        >
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
