import React, { useState } from "react";
import "./authForm.css";
import image1 from "../../assets/image1.png";
import image3 from "../../assets/image3.png";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
//import {toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar/Navbar";

//import {Link} from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
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
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // Validation;
     if (!data.email || !data.password) {
       Swal.fire("Error", "Please fill in all fields.", "error");
       return;
     }

     if (!validateEmail(data.email)) {
       Swal.fire("Error", "Please enter a valid email address.", "error");
       return;
    }

    if (data.password.length <= 8) {
      Swal.fire("Error", "Password must be at least 8 characters long.", "error");
       return;
     }
     if (data.password.length <= 8) {
      throw new Error("Password must be more than 8 characters.");
    }

    const specialCharacterRegex = /[!@#$%^&*()_+\-={};':"|,.<>?]+/;
    if (!specialCharacterRegex.test(data.password)) {
      throw new Error("Password must contain at least one special character.");
    }

    const numberRegex = /[0-9]+/;
    if (!numberRegex.test(data.password)) {
      throw new Error("Password must contain at least one number.");
    }

    const upperCaseRegex = /[A-Z]+/;
    if (!upperCaseRegex.test(data.password)) {
      throw new Error("Password must contain at least one uppercase letter.");
    }
    try {
      const response = await fetch("https://kevent-server.onrender.com/users/login", {
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

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      if (data.password.length <= 8) {
        throw new Error("Password must be more than 8 characters.");
      }

      const specialCharacterRegex = /[!@#$%^&*()_+\-={};':"|,.<>?]+/;
      if (!specialCharacterRegex.test(data.password)) {
        throw new Error("Password must contain at least one special character.");
      }

      const numberRegex = /[0-9]+/;
      if (!numberRegex.test(data.password)) {
        throw new Error("Password must contain at least one number.");
      }

      const upperCaseRegex = /[A-Z]+/;
      if (!upperCaseRegex.test(data.password)) {
        throw new Error("Password must contain at least one uppercase letter.");
      }

      const response = await fetch("https://kevent-server.onrender.com/users/register", {
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
      navigate("/verification", { state: { email: data.email } });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleGoogleSignup = () => {
    const backendOrigin = "https://kevent-server.onrender.com";
    const googleWindow = window.open(`${backendOrigin}/auth/google`, "_blank", "width=600,height=800");
  
    const signupWithGoogle = async (access_token) => {
      try {
        const response = await fetch(`${backendOrigin}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ access_token }),
        });
        const data = await response.json();
  
        if (response.ok && data.token) {
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
        } else {
          // Check if the account already exists
          if (data.message && (data.message.includes("already associated with a different account") || data.message.includes("Account already exists with this Google ID"))) {
            alert(data.message); // Show the error message
          } else {
            alert("Authentication failed!");
          }
        }
      } catch (error) {
        console.error("Error during signup:", error.message);
      }
    };
  
    const messageHandler = (event) => {
      if (event.origin !== backendOrigin) return;
      const { access_token } = event.data;
      if (access_token) {
        signupWithGoogle(access_token);
        window.removeEventListener("message", messageHandler);
        googleWindow?.close();
      }
    };
  
    window.addEventListener("message", messageHandler, false);
  };

  const handleGoogleLogin = () => {
    const backendOrigin = "https://kevent-server.onrender.com";
    const googleWindow = window.open(`${backendOrigin}/auth/google`, "_blank", "width=600,height=800");
    const loginWithGoogle = async (access_token) => {
      try {
        const response = await fetch(`${backendOrigin}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ access_token }),
        });
        const data = await response.json();
        if (response.ok && data.token) {
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
        } else {
          alert(data.message || "Authentication failed!");
        }
      } catch (error) {
        console.error("Error during login:", error.message);
      }
    };

    const messageHandler = (event) => {
      if (event.origin !== backendOrigin) return;

      const { access_token } = event.data;

      if (access_token) {
        loginWithGoogle(access_token);
        window.removeEventListener("message", messageHandler);
        googleWindow?.close();
      }
    };
    window.addEventListener("message", messageHandler, false);
  };

  return (
    <div>
      <Navbar />
    <div className="container">
      {/* Image Section  <ToastContainer /> */}

      <div className="image-container">{isLogin ? <img className="img1" src={image1} alt="image1" /> : <img className="img2" src={image3} alt="image3" />}</div>
      {/* Form Section */}
      <div className={`form-container ${isLogin ? "login" : "signup"}`}>
        <div className="form">
          {isLogin ? (
            <>
              <form className="login-form" onSubmit={handleLoginSubmit}>
                <h2>Login</h2>
                <div className="input-group">
                  <label>Email</label>
                  <input type="email" placeholder="email" name="email" onChange={handleChange} value={data.email} required />
                </div>
                <div className="input-group">
                  <label>Password</label>
                  <input type={passwordVisible ? "text" : "password"} placeholder="password" name="password" onChange={handleChange} value={data.password} required />

                  <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className="icon" />
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
                  <button type="button" className="google-button" onClick={handleGoogleLogin}>
                    Sign in with Google
                  </button>
                </div>

                <p onClick={toggleForm} className="toggle">
                  Don't have an account? Sign up
                </p>
              </form>
            </>
          ) : (
            <>
              <form onSubmit={handleSignupSubmit} className="signup-form">
                <h2>Sign Up</h2>
                <div className="name">
                  <div className="input-group">
                    <label>First Name</label>
                    <input type="text"placeholder="first-name" className="first" name="firstName" onChange={handleChange} value={data.firstName} required />
                  </div>
                  <div className="input-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" className="last" placeholder="last-name" onChange={handleChange} value={data.lastName} required />
                  </div>
                </div>

                <div className="input-group">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="email" onChange={handleChange} value={data.email} required />
                </div>
                <div className="input-group">
                  <label>Contact Number</label>
                  <input type="text" placeholder="contact-number" name="contactNumber" onChange={handleChange} value={data.contactNumber} required />
                </div>

                <div className="input-group">
                  <label>Department</label>
                  <select name="department" placeholder="department" onChange={handleChange} value={data.department} required>
                    <option value="">Select Department</option>
                    <option value="hr">HR</option>
                    <option value="engineering">Engineering</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                  </select>
                  <div className="depart">
                    <div className="input-group">
                      <label>Batch</label>
                      <input type="text" placeholder="batch" className="batch" name="batch" onChange={handleChange} value={data.batch} required />
                    </div>

                    <div className="input-group">
                      <label>Year</label>
                      <input type="text" placeholder="year" className="year" name="year" onChange={handleChange} value={data.year} required />
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
                  <input type="password" placeholder="password" name="password" onChange={handleChange} value={data.password} required />
                </div>

                <div className="button-container">
                  <button type="submit" className="button2">
                    Sign Up
                  </button>
                  <div className="google">
                    <button onClick={handleGoogleSignup} className="google-button1">Signup with Google</button>
                  </div>
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
    </div>
  );
};

export default AuthForm;
