import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const endpoint = currState === "Login" ? "/api/auth/login" : "/api/auth/createuser";

    try {
      console.log("Sending request to:", `${BACKEND_URL}${endpoint}`, data);
      const response = await axios.post(`${BACKEND_URL}${endpoint}`, data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.authToken);
        console.log("Token saved:", response.data.authToken);
        navigate("/home");
      } else {
        alert(response.data.message || "Something went wrong");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||  
        "Something went wrong";

      alert(errorMsg);;
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={onSubmitHandler} className="auth-form">
        <h2>{currState}</h2>
        <div className="auth-inputs">
          {currState === "Sign Up" && (
            <input
              name="name"
              type="text"
              placeholder="Your name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="auth-terms">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">By continuing, I agree to the Terms of Use & Policy</label>
        </div>
        {currState === "Login" ? (
          <p>
            Don't have an account?{" "}
            <span onClick={() => setCurrState("Sign Up")} style={{ cursor: "pointer", color: "#007bff" }}>
              Sign up
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")} style={{ cursor: "pointer", color: "#007bff" }}>
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Auth;
