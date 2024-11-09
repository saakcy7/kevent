import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import image1 from "../../assets/image1.png";
import './OtpPage.css';

const VerifyResetOTP = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60); // 60 seconds countdown
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  if (!email) {
    navigate("/forgot-password");
  }

  useEffect(() => {
    let interval;
    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsResendDisabled(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled]);

  const handleInputChange = (event) => {
    setOtp(event.target.value);
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Something went wrong");
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "OTP verified!",
      });
      navigate("/change-password", { state: { email } });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/resendOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Something went wrong");
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "OTP resent successfully!",
      });
      setIsResendDisabled(true);
      setTimer(60); // Reset the timer to 60 seconds
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="container1">
      <div className="left-section">
        <img src={image1} alt="Illustration" />
      </div>
      <div className="right-section">
        <div className="form-container1">
          <form onSubmit={handleVerifyOtp}>
            <h2>Enter OTP</h2>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="btn">Verify OTP</button>
          </form>
          <p onClick={handleResendOtp} disabled={isResendDisabled}>Didn't receive OTP?Resend OTP{isResendDisabled && `(${timer}s)`}</p>

        </div>
      </div>
    </div>
  );
};

export default VerifyResetOTP;