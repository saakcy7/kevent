import React, { useState } from "react";
import "./authForm.css";
import image1 from "../../assets/image1.png";
import image3 from "../../assets/image3.png";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
//import {toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

//import {Link} from "react-router-dom";


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    batch: "",
    year: "",
    department: "",
    semester: "",
  });
  //const [error, setError] = useState("");	
  const navigate = useNavigate();
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  const handleChange = ({currentTarget: input}) => {

    setData({ ...data, [input.name]: input.value });
  }

  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Something went wrong");
      }

      const responseData = await response.json();
      localStorage.setItem("token", responseData.token); // Set token in localStorage
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Logged in successfully!",
      });
      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "An error occurred during login.",
      });
      console.error("Error logging in:", error);
    }
  };

const handleSignupSubmit = async(e) => {
e.preventDefault();

try {
  if (data.password.length <= 8) {
    throw new Error("Password must be more than 8 characters.");
  }

  const specialCharacterRegex = /[!@#$%^&*()_+\-={};':"|,.<>?]+/;
  if (!specialCharacterRegex.test(data.password)) {
    throw new Error("Password must contain at least one special character.");
  }

  const response = await fetch("http://localhost:3000/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  Swal.fire({
    icon: "success",
    title: "Success",
    text: "User registered successfully! Please check your email for the verification code.",
  });
  navigate("/verification",{state: { email: data.email } });
}catch(error)
{
  
  Swal.fire({
    icon: "error",
    title: "Error",
    text: error.message,
  });

  
}
};

  return (
    <div className="container">
      {/* Image Section  <ToastContainer /> */}
     
    
      <div className="image-container">{isLogin ? <img className="img1" src={image1} alt="image1" /> : <img className="img2" src={image3} alt="image3"/>}</div>
      {/* Form Section */}
      <div className={`form-container ${isLogin ? "login" : "signup"}`}>
        <div className="form">
          {isLogin ? (
            <>
              <form className="login-form" onSubmit={handleLoginSubmit}>
                <h2>Login</h2>
                <div className="input-group">
                  <label>Email</label>
                  <input type="email" 
                  placeholder="email"
                  name="email" onChange={handleChange} value={data.email}
                  required />
                </div>
                <div className="input-group">
                  <label>Password</label>
                  <input type="password" 
                  placeholder="password"
                  name="password" onChange={handleChange} value={data.password}required />
                </div>
                <div className="forgot">
                  <a href="/forgotpassword" className="forgot">
                    Forgot Password?
                  </a>
                </div>
                <div className="button-container">
                  <button type="submit" className="button1">
                    Login
                  </button>
                </div>

                <p onClick={toggleForm} className="toggle">
                  Don't have an account? Sign up
                </p>
              </form>
            </>
          ) : (
            <>
          <form onSubmit={handleSignupSubmit} className="signup-form" >
                <h2>Sign Up</h2>
                <div className="name">
                  <div className="input-group">
                    <label>First Name</label>
                    <input type="text" placeholder="first-name"
                    name="firstName" onChange={handleChange} value={data.firstName}  required />
                  </div>
                  <div className="input-group">
                    <label>Last Name</label>
                    <input type="text" 
                    name="lastName" 
                    placeholder="last-name" onChange={handleChange} value={data.lastName}  required />
                  </div>
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input type="email" 
                  name="email" 
                  placeholder="email" onChange={handleChange} value={data.email}  required />
                </div>

                <div className="input-group">
                  <label>Department</label>
                  <select 
                  name="department" 
                  placeholder="department" onChange={handleChange} value={data.department} required>
                    <option value="">Select Department</option>
                    <option value="hr">HR</option>
                    <option value="engineering">Engineering</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                  </select>
                  <div className="depart">
                    <div className="input-group">
                      <label>Batch</label>
                      <input type="text"
                      placeholder="batch"
                      name="batch"  onChange={handleChange} value={data.batch}   required />
                    </div>

                    <div className="input-group">
                      <label>Year</label>
                      <input type="text" 
                      placeholder="year"
                      name="year"  onChange={handleChange} value={data.year}  required />
                    </div>
                    <div className="input-group">
                      {/*<label>Semester</label>
                      <input type="text" 
                      placeholder="semester" 
                      name="semester" onChange={handleChange} value={data.semester}  required />*/}
                    </div>
                  </div>
                </div>
                <div className="input-group">
                  <label>Password</label>
                  <input type="password" 
                  placeholder="password"
                  name="password" onChange={handleChange} value={data.password}  required />
                </div>
                
                <div className="button-container">
                  <button type="submit" className="button2">
                    Sign Up
                  
                  </button>
                </div>
                <p onClick={toggleForm} className="toggle">
                  Already have an account? Login
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};


export default AuthForm;
