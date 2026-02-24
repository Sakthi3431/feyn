import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import React from "react";
import "./App.css";

function App() {
  return (
    <div className="app">

      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
    </Routes>


      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">

          <h1>Find Nearby Shops & Products Instantly</h1>

          <p>
            Discover local stores near you, browse products,
            and order easily from your phone.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Get Started</button>
            <button className="secondary-btn">Learn More</button>
          </div>

        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
          alt="shopping"
          className="hero-image"
        />

      </section>


      {/* Features Section */}
      <section className="features" id="features">

        <h2>Why Choose Feyn?</h2>

        <div className="feature-box">

          <div className="card">
            <h3>📍 Location Based</h3>
            <p>See shops near your current location.</p>
          </div>

          <div className="card">
            <h3>🛒 Easy Shopping</h3>
            <p>Browse and order products instantly.</p>
          </div>

          <div className="card">
            <h3>💬 Chat Support</h3>
            <p>Chat directly with shop owners.</p>
          </div>

        </div>

      </section>


      {/* About Section */}
      <section className="about" id="about">

        <h2>Support Your Local Business</h2>

        <p>
          Our platform helps small shop owners connect
          with customers easily and grow their business.
        </p>

      </section>


      {/* CTA Section */}
      <section className="cta">

        <h2>Start Shopping Locally Today</h2>

        <p>Login and explore nearby shops now.</p>

        <button className="primary-btn">Login Now</button>

      </section>


      {/* Footer */}
      <footer className="footer">

        <p>© 2026 Feyn | All Rights Reserved</p>

      </footer>

    </div>
  );
}

export default App;