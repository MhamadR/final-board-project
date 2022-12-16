import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function TopNav() {
  return (
    <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
      <Container>
        <Navbar.Brand as={NavLink} to="/boards">
          Planit
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link as={NavLink} to="/boards">
              Boards
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/completed-tasks">
              Completed-Tasks
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav;
