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
   
    try {
      const response = await fetch("http://localhost:3000/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({email, password }),
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