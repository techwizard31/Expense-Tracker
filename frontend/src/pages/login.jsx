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

  let work = 0;
  const generateRandomColor = () => {
    const worked = work;
    work++;
    return `${worked * 34} 65% 50%`;
  };

  const handlegooglelogin = async(email) =>{
    const response = await fetch(`${import.meta.env.VITE_APP_LINKED}/googlelogin`, {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: { "Content-type": "application/json" },
    });
    const json = await response.json();
    if (!response.ok) {
      toast.error(json.error);
    }
    if (response.ok) {
      toast.success("Logged In Successfully");
      sessionStorage.setItem("User", JSON.stringify(json));
      const responsed = await fetch(`${import.meta.env.VITE_APP_LINKED}/expense/`, {
        method: "POST",
        headers: { "Content-type": "application/json" ,
          Authorization: `Bearer ${json.token}`,
        },
        body: JSON.stringify({ user_id: json.user._id }),
      });
      
      const jsoned = await responsed.json();
      if(responsed.ok){
        if(jsoned != []){
          const expensives = [];
          jsoned.map((item)=>{
            item['color'] = generateRandomColor();
            const expenses = item.expenses;
            if (Array.isArray(expenses) && expenses.length > 0) {
              expenses.map((expense) => {
                  expense.budgetId = item._id; // Modify each expense object
                  expensives.push(expense); // Add the modified expense to expensives array
              });
          }
          })
          sessionStorage.setItem("budgets", JSON.stringify(jsoned));
          sessionStorage.setItem("expenses", JSON.stringify(expensives));
        }
      }else if(!responsed.ok){
        toast.error(jsoned.error);
      }
      navigate("/");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!email || !password ) {
      toast.error("Fill all the fields !");
      return;
    }
    const response = await fetch(`${import.meta.env.VITE_APP_LINKED}/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });
    const json = await response.json();
    if (!response.ok) {
      toast.error(json.error);
    }
    if (response.ok) {
      toast.success("Logged In Successfully");
      sessionStorage.setItem("User", JSON.stringify(json));
      const responsed = await fetch(`http://localhost:4000/expense/`, {
        method: "POST",
        headers: { "Content-type": "application/json" ,
          Authorization: `Bearer ${json.token}`,
        },
        body: JSON.stringify({ user_id: json.user._id }),
      });
      
      const jsoned = await responsed.json();
      if(responsed.ok){
        if(jsoned != []){
          const expensives = [];
          jsoned.map((item)=>{
            item['color'] = generateRandomColor();
            const expenses = item.expenses;
            if (Array.isArray(expenses) && expenses.length > 0) {
              expenses.map((expense) => {
                  expense.budgetId = item._id; // Modify each expense object
                  expensives.push(expense); // Add the modified expense to expensives array
              });
          }
          })
          sessionStorage.setItem("budgets", JSON.stringify(jsoned));
          sessionStorage.setItem("expenses", JSON.stringify(expensives));
        }
      }else if(!responsed.ok){
        toast.error(jsoned.error);
      }
      navigate("/");
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div class="form-box">
      <div class="form">
        <span class="title">Login</span>
        <span class="subtitle">Login your account with your email</span>
        <div className="form-container" >
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
        </div>
        <button onClick={(e)=>handleSubmit(e)} className="submit-button">Login</button>
          <div className="google">
        <GoogleLogin
                size="large"
                width="200px"
                logo_alignment="left"
                onSuccess={(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  handlegooglelogin(decoded.email)
                }}
                onError={() => {
                  console.log("Login Failed");
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
