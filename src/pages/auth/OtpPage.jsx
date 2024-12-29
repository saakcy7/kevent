import React, { useState, useEffect } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import "./OtpPage.css";
import image1 from "../../assets/image1.png";



const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  //const param=useParams();

  useEffect(() => {
    if (!state || !state.email) {
      Swal.fire("Error", "Email not provided. Redirecting to signup page...", "error");
      navigate("/signup");
    } else {
      console.log("State in OtpPage component:", state);
    }
  }, [state, navigate]);

  const handleInputChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const handleVerifyEmail = async (event) => {
    event.preventDefault();
    if (!state || !state.email) {
      Swal.fire("Error", "Email not provided. Cannot verify OTP.", "error");
      return;
    }
    try {
      console.log("Sending OTP verification request...", { email: state.email, verificationCode });
      const response = await fetch("https://kevent-server.onrender.com/users/verifyemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: state.email, verificationCode }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Something went wrong");
      }

      Swal.fire({
        icon: "success",
        title: "Verified",
        text: "Your email has been verified successfully! Now you can login.",
      });

      event.target.reset();
      navigate("/signup");
    } catch (error) {
      console.error("Error verifying OTP:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });

      event.target.reset();
    }
  };

  return (
    <div class="container1">
    <div class="left-section">
        <img src={image1} alt="Illustration"></img>
    </div>
        <div class="right-section">
        <div class="form-container1">
          <form onSubmit={handleVerifyEmail}>
            <h1>WELCOME TO KEVENT</h1>

            <h2>Enter OTP</h2>
            <input type="text" name="otp" placeholder="OTP" value={verificationCode} onChange={handleInputChange} required />
           
              <button type="submit" className="btn">Verify OTP</button>
            
          </form>
        </div>
      </div>
     
    </div>
  
  );
};

export default VerifyEmail;