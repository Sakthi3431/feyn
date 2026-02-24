import "../App.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <h2>Feyn</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Landing;