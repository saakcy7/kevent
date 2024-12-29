import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import './OtpPage.css';
import image2 from "../../assets/image2.png";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
 

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    //const token = localStorage.getItem("token"); 
    /*if (!token) {
        Swal.fire("Error", "Authentication token not found. Please log in again.", "error");
        return;
      }*/
    //console.log("Auth token",token);

    try {
      const response = await fetch("https://kevent-server.onrender.com/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //"Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ email}),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Something went wrong");
      }
      const responseData = await response.json();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "OTP sent to your email!",
      });
      console.log("OTP sent successfully:", responseData);
      navigate("/verifyresetotp",{state:{email}});
    } catch (error) {
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
          <form onSubmit={handleSendOtp}>
        
            <h2>Enter email address</h2>
            <input type="email" name="email" placeholder="email address" value={email} onChange={handleInputChange} required />
           
              <button type="submit" className="btn">Send OTP</button>
            
          </form>
        </div>
      </div>
     
    </div>
  );
};

export default ForgotPassword;