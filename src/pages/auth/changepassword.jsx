import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import './OtpPage.css';
import image2 from "../../assets/image2.png";


const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  useEffect(() => {
    if (!email) {
      navigate("/change-password");
    }
  }, [email, navigate]);

  const handleInputChange = (event) => {
    setPassword(event.target.value);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
   
    console.log('Email:', email);
    console.log('New Password:', password);

   
    try {
      if (password.length <= 8) {
        throw new Error("Password must be more than 8 characters.");
      }
  
      const specialCharacterRegex = /[!@#$%^&*()_+\-={};':"|,.<>?]+/;
      if (!specialCharacterRegex.test(password)) {
        throw new Error("Password must contain at least one special character.");
      }
  
      const numberRegex = /[0-9]+/;
      if (!numberRegex.test(password)) {
        throw new Error("Password must contain at least one number.");
      }
  
      const upperCaseRegex = /[A-Z]+/;
      if (!upperCaseRegex.test(password)) {
        throw new Error("Password must contain at least one uppercase letter.");
      }
      const response = await fetch("https://kevent-server.onrender.com/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({email,password}),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Something went wrong");
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password reset successful!",
      });
      navigate("/signup");
    } 
    catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div class="container1">
    <div class="left-section">
        <img src={image2} alt="Illustration"></img>
    </div>
        <div class="right-section">
        <div class="form-container1">
          <form onSubmit={handleResetPassword}>
           
            <h2>Enter New Password</h2>
            <input type="password" name="password" placeholder="New Password" value={password} onChange={handleInputChange} required />
           
              <button type="submit" className="btn">Reset Password</button>
            
          </form>
        </div>
      </div>
     
    </div>
  );
};

export default ChangePassword;