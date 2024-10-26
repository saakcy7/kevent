import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AuthForm from "./pages/auth/authForm";
import UserProfile from "./pages/Profile/userProfile";
import VerifyEmail from "./pages/auth/OtpPage";
import ForgotPassword from "./pages/auth/forgotPassword";
import ChangePassword from "./pages/auth/changepassword";
import Dashboard from "./pages/dashboard/dashboard";
import CreateEvent from "./pages/Event/CreateEvent";
import React from "react";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<AuthForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/verification" element={<VerifyEmail/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/change-password" element={<ChangePassword/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/createevent" element={<CreateEvent/>}/>
      </Routes>
    </div>
  );
}
export default App;
