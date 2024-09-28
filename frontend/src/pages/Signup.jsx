import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!email || !password || !name) {
      toast.error("Fill all the fields !");
      return;
    }
    const response = await fetch(`/api/signup`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ Name: name, email: email, password: password }),
    });
    const json = await response.json();
    if (!response.ok) {
      toast.error(json.error);
    }
    if (response.ok) {
      toast.success("Sign up Successfully");
      sessionStorage.setItem("User", JSON.stringify(json));
      navigate("/");
      setName("");
      setEmail("");
      setPassword("");
    }
  };
  const handlegooglesignup = async (email,Name) => {
    try {
      const response = await fetch(`/api/googlesignup`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ Name: Name, email: email }),
      });
      const json = await response.json();
      if (!response.ok) {
        toast.error(json.error);
      }
      if (response.ok) {
        toast.success("Sign up Successfully");
        sessionStorage.setItem("User", JSON.stringify(json));
        navigate("/");
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="form-box">
      <div className="form">
        <span className="title">Sign up</span>
        <span className="subtitle">Create a free account with your email.</span>
        {/* Use form element to capture onSubmit */}
        <div className="form-container">
          <input
            type="text"
            className="input"
            placeholder="User Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Use button type="submit" to ensure form submission */}
        </div>
          <button onClick={(e)=>handleSubmit(e)} className="submit-button">Sign up</button>
          <div className="google">
        <GoogleLogin
                size="large"
                width="200px"
                logo_alignment="left"
                text="signup_with"
                onSuccess={async(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  await handlegooglesignup(decoded.email,decoded.given_name);
                }}
                onError={() => {
                  console.log("Signup Failed");
                }}
              />
          </div>
      </div>
      <div className="form-section">
        <p>
          Have an account?{" "}
          <div className="linked" onClick={() => navigate("/login")}>
            Log in
          </div>
        </p>
      </div>
    </div>
  );
}

export default Signup;
