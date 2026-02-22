import "../App.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <h2>LocalConnect</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Nearby Shops & Products Instantly</h1>

          <p>
            Discover local stores near you, browse products,
            and order easily from your phone.
          </p>

          <div className="hero-buttons">
            <Link to="/login">
              <button className="primary-btn">Get Started</button>
            </Link>
          </div>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
          alt="shopping"
          className="hero-image"
        />
      </section>

    </div>
  );
}

export default Landing;