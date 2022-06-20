import { Outlet, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { MdOutlineMovie } from "react-icons/md";

export default function Header() {
  const { isLogged, setShowRegisterModal, setShowLoginModal } =
    useContext(UserContext);

  useEffect(() => {
    setShowRegisterModal(false);
    setShowLoginModal(false);
  }, []);

  return (
    <>
      <Navbar collapseOnSelect bg="light" expand="sm" fixed="top">
        <Container>
          <Nav.Link eventKey="1">
            <Navbar.Brand as={Link} to="/">
              <MdOutlineMovie /> mymovies
            </Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/search" eventKey="2">
                search
              </Nav.Link>
              {!isLogged && (
                <>
                  <Nav.Link as={Link} to="/search/trending" eventKey="3">
                    trending
                  </Nav.Link>
                  <Nav.Link
                    eventKey="4"
                    onClick={() => setShowLoginModal(true)}
                  >
                    login
                  </Nav.Link>
                  <Nav.Link
                    eventKey="5"
                    onClick={() => setShowRegisterModal(true)}
                  >
                    register
                  </Nav.Link>
                </>
              )}

              {isLogged && (
                <>
                  <Nav.Link as={Link} to="/movielist" eventKey="6">
                    movielist
                  </Nav.Link>
                  <Nav.Link as={Link} to="/logout" eventKey="7">
                    logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
