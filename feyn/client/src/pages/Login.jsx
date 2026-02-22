import "../App.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-page">

      <div className="login-box">

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button className="primary-btn login-submit">
          Login
        </button>

        <p>
          Don't have an account?
          <Link to="/"> Sign up</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;