import app_logo_url from "../../assets/logo.jpeg";
import "./styles/index.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <div className="logo-img">
          <img src={app_logo_url} alt="App Logo" />
        </div>
      </div>
      <ul className="nav-list" role="list">
        <li>
          <a href="#" className="nav-link">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="nav-link">
            Map
          </a>
        </li>
        <li>
          <a href="#" className="nav-link">
            About
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
