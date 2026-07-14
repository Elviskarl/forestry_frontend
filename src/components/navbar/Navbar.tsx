import { NavLink, Outlet } from "react-router-dom";
import app_logo_url from "../../assets/logo.jpeg";
import "./styles/index.css";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <div className="logo-img">
            <img src={app_logo_url} alt="App Logo" />
          </div>
        </div>
        <ul className="nav-list" role="list">
          <li>
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/map" className="nav-link">
              Map
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
