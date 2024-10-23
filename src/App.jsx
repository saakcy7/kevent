import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AuthForm from "./pages/auth/authForm";
import UserProfile from "./pages/Profile/userProfile";
import React from "react";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<AuthForm />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}
export default App;
