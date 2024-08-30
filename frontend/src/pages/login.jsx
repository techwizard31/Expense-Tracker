import './signup.css';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div class="form-box">
      <div class="form">
        <span class="title">Login</span>
        <span class="subtitle">Login your account with your email</span>
        <form className="form-container" onSubmit={(e)=>handleSubmit(e)}>
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
        </form>
        <button type="submit" className="submit-button">Login</button>
          <div className="google">
        <GoogleLogin
                size="large"
                width="200px"
                logo_alignment="left"
                onSuccess={(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  console.log(decoded.email);
                }}
                onError={() => {
                  console.log("Signup Failed");
                }}
              />
          </div>
      </div>
      <div class="form-section">
        <p>
          Don't have an account? <div className="linked" onClick={()=>navigate('/signup')}>Sign Up</div>
        </p>
      </div>
    </div>
  );
}

export default Login;
