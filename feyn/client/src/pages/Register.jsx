import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("users/register/", formData);
      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      const data = error.response?.data;
      if (data?.username) setError(data.username[0]);
      else if (data?.email) setError(data.email[0]);
      else if (data?.password) setError(data.password[0]);
      else setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">F</div>
          <span className="auth-logo-text">Feyn</span>
        </div>

        <h2 className="auth-title">Create account</h2>
        <p className="auth-subtitle">Join Feyn and start shopping today</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label className="auth-label">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              className="auth-input"
              onChange={handleChange}
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="auth-input"
              onChange={handleChange}
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="auth-input"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-btn">Create Account</button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
