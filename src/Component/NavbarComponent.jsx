import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="shadow-md fixed-top bg-white">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          QURRANT
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="mx-auto gap-4">
            <Nav.Link as={NavLink} to="/" className="text-gray-600 hover:text-blue-500">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="text-gray-600 hover:text-blue-500">
              About
            </Nav.Link>
          </Nav> */}
          <div className="join d-flex gap-4">
            <Link to="/loginregis" className="btn btn-outline-primary">
              Join With Us
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
