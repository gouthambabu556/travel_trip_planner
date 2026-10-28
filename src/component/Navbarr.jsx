
// import React from "react";
// import { Link, NavLink } from "react-router-dom";

// function Navbarr() {
//   return (
//     <nav className="navbar">
//       <Link to="/login">Login</Link>
//       <Link to="/" className="brand">
//         <span className="brand-icon">✈</span>
//         TravelMate
//       </Link>

//       <div className="nav-links">
//         <NavLink to="/" end>Home</NavLink>
//         <NavLink to="/explore">Explore</NavLink>
//         <a href="#about">About</a>
//       </div>

//       <Link to="/explore" className="nav-button">
//         Plan a Trip
//       </Link>
//     </nav>
//   );
// }

// export default Navbarr;

import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbarr() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">✈</span>
        TravelMate
      </Link>

      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/explore">Explore</NavLink>
        <NavLink to="/trips">My Trips</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>

      <div className="nav-actions">
        <Link to="/trips/new" className="nav-button">
          Plan a Trip
        </Link>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbarr;
