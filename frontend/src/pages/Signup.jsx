import React from "react";
import './signup.css';
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
  return (
    <div className="form-box">
      <form className="form">
        <span className="title">Sign up</span>
        <span className="subtitle">Create a free account with your email.</span>
        <div className="form-container">
          <input type="text" className="input" placeholder="User Name" />
          <input type="email" className="input" placeholder="Email" />
          <input type="password" className="input" placeholder="Password" />
        </div>
        <button>Sign up</button>
      </form>
      <div className="form-section">
        <p>
          Have an account? <div className="linked" onClick={()=>navigate('/login')}>Log in</div>
        </p>
      </div>
    </div>
  );
}

export default Signup;
