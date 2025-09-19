import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    await authService.register({ name, email, password, role });
    console.log("Signup as:", role, { name, email, password });
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="title">Create Account</h2>
        <p className="subtitle">Sign up to get started</p>

        <form onSubmit={handleSignup} className="signup-form">
          <div className="role-selection">
            <label
              className={`role-label ${
                role === "client" ? "client-active" : "client-inactive"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="client"
                checked={role === "client"}
                onChange={(e) => setRole(e.target.value)}
                className="hidden-radio"
              />
              Client
            </label>
            <label
              className={`role-label ${
                role === "counselor" ? "counselor-active" : "counselor-inactive"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="counselor"
                checked={role === "counselor"}
                onChange={(e) => setRole(e.target.value)}
                className="hidden-radio"
              />
              Counselor
            </label>
          </div>

          <div>
            <label className="form-label">Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;