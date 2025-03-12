// import { Navbar, Container, Nav } from "react-bootstrap";
// import { Link, NavLink } from "react-router-dom";

// const NavbarComponent = () => {
//   return (
//     <Navbar expand="lg" className="shadow-md fixed-top bg-white">
//       <Container>
//         <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
//           QURRANT
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <div className=" join d-flex gap-4">
//             <Link to="/loginregis" className="btn btn-outline-primary">
//               Join With Us
//             </Link>
//           </div>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavbarComponent;


import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const NavbarComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Cek apakah token ada
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Hapus token saat logout
    setIsLoggedIn(false);
    window.location.reload(); // Refresh halaman supaya update
  };

  return (
    <Navbar expand="lg" className="shadow-md fixed-top bg-white">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          QURRANT
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="join d-flex gap-4">
            {isLoggedIn ? (
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/loginregis" className="btn btn-outline-primary">
                Join With Us 
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
