import React from "react";
import './signup.css';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <div class="form-box">
      <form class="form">
        <span class="title">Login</span>
        <span class="subtitle">Login your account with your email</span>
        <div class="form-container">
          <input type="email" class="input" placeholder="Email" />
          <input type="password" class="input" placeholder="Password" />
        </div>
        <button>Login</button>
      </form>
      <div class="form-section">
        <p>
          Don't have an account? <div className="linked" onClick={()=>navigate('/signup')}>Sign Up</div>
        </p>
      </div>
    </div>
  );
}

export default Login;
