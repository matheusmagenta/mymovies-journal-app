import React, { useState, useEffect, useContext } from "react";
import UsersService from "../../services/UsersService";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { isLogged, setIsLogged, setRefreshToken, setUserLogged } =
    useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    UsersService.postRegisterUser({
      name,
      email,
      password,
    }).then(
      // when successful request
      (response) => {
        console.log("response: ", response);
        if (response.status === 200) {
          UsersService.postLoginUser({
            email,
            password,
          })
            .then((response) => {
              // console.log("response: ", response);
              if (response.status === 200) {
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

          Toastify({
            text: `registered and logged`,
            style: { background: "#d2b878" },
            duration: 1000,
          }).showToast();
        }
      },
      // when error in request
      (error) => {
        Toastify({
          text: `email already registered! try again`,
          style: { background: "#d2b878" },
          duration: 2000,
        }).showToast();
        console.log("error: ", error);
      }
    );

    navigate("/");
  };

  return (
    <Form>
      <Form.Label htmlFor="name" visuallyHidden="true">
        name
      </Form.Label>
      <Form.Control
        type="text"
        name="name"
        id="name"
        onChange={(event) => setName(event.target.value)}
        value={name}
        placeholder="type your name"
        required
      />
      <Form.Label htmlFor="email" visuallyHidden="true">
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
      <Form.Label htmlFor="password" visuallyHidden="true">
        password
      </Form.Label>
      <Form.Control
        type="password"
        name="password"
        id="password"
        placeholder="type your password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        required
      />

      <Button
        onClick={handleSubmit}
        type="submit"
        size="sm"
        variant="outline-dark"
        style={{ marginTop: "5px" }}
      >
        register
      </Button>
    </Form>
  );
};

export default RegisterPage;
