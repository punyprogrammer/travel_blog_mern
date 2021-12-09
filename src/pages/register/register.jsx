import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      const newUser = { username, email, password };
      const res = await axios.post(
        "https://amar-blog.herokuapp.com/api/auth/register",
        newUser
      );

      setUsername("");
      setEmail("");
      setPassword("");
      alert("Register sucessful ,Kindly Login!!");
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
      error && alert("Something went wrong");
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={formSubmit}>
        <label className="formLabel">Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="formLabel">Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="formLabel">Password</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
        <button className="registerLoginButton">
          <Link to="/login" className="link">
            Login
          </Link>{" "}
        </button>
      </form>
    </div>
  );
};

export default Register;
