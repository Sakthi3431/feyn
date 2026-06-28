import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/Auth.css";
import login from '../services/api';
function Login() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(formData.email, formData.password);
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">F</div>
          <span className="auth-logo-text">Feyn</span>
        </div>

        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Sign in to your account to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label className="auth-label">Email</label>
            <input
              type="text"
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
              placeholder="Enter your password"
              className="auth-input"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-btn">Sign In</button>
        </form>

        <p className="auth-footer">
          Don't have an account?
          <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
