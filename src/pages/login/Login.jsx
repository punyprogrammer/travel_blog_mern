import React, { useContext, useRef } from "react";
import Loader from "react-loader-spinner";
import "./login.css";
import { Link } from "react-router-dom";
import { Context } from "../../contexts/Context";
import axios from "axios";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "https://amar-blog.herokuapp.com/api/auth/login",
        {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label className="formLabel">Username</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your username"
          ref={usernameRef}
        />
        <label className="formLabel">Password</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your password"
          ref={passwordRef}
        />
        <button className="loginButton" type="submit">
          Login
        </button>
        <button className="loginRegisterButton">
          <Link className="link" to="/register">
            Register
          </Link>
        </button>
      </form>
    </div>
  );
};

export default Login;
