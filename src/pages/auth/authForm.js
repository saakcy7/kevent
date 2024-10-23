import React, { useState } from "react";
import "./authForm.css";
import image1 from "../../assets/image1.png";
import image3 from "../../assets/image3.png";


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container">
      {/* Image Section */}
     
     
      <div className="image-container">
            {isLogin ? (<img className="img1" src={image1}/>) : (<img className="img2" src={image3}/>)}
        </div>
      {/* Form Section */}
      <div className={`form-container ${isLogin ? "login" : "signup"}`}>
     
        <div className="form">
       
      
        
          {isLogin ? (
            <>
            
            <form className="login-form">
              <h2>Login</h2>
              <div className="input-group">
                <label>Email</label>
                <input type="email" required />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" required />
              </div>
              <div className="forgot">
                <a href="#" className="forgot">Forgot Password?</a>
                </div>
              <div className="button-container">
              <button type="submit" className="button1">Login</button>
                </div>
             
              <p onClick={toggleForm} className="toggle">
                Don't have an account? Sign up
              </p>
            </form>
            </>
          ) : (
            <>
            <form className="signup-form">
              <h2>Sign Up</h2>
              <div className="name">
              <div className="input-group">
                <label>First Name</label>
                <input type="text" required />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input type="email" required />
              </div>
                </div>
              <div className="input-group">
                <label>Email</label>
                <input type="password" required />
              </div>
              
              <div className="input-group">
                <label>Department</label>
                <select required>
    <option value="">Select Department</option>
    <option value="hr">HR</option>
    <option value="engineering">Engineering</option>
    <option value="marketing">Marketing</option>
    <option value="sales">Sales</option>
  </select>
  <div className="depart">
  <div className="input-group">
                <label>Batch</label>
                <input type="text" required />
              </div>

              <div className="input-group">
                <label>Year</label>
                <input type="text" required />
              </div>
              <div className="input-group">
                <label>Semester</label>
                <input type="text" required />
              </div>
                
              </div>

              </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" required />
                </div>

                <div className="button-container">
  <button type="submit" className="button2">Sign Up</button>
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
