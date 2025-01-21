import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AuthForm from "./pages/auth/authForm";
import About from "./pages/About/About";
import UserProfile from "./pages/Profile/userProfile";
import VerifyEmail from "./pages/auth/OtpPage";
import ForgotPassword from "./pages/auth/forgotPassword";
import ChangePassword from "./pages/auth/changepassword";
import Dashboard from "./pages/dashboard/dashboard";
import CreateEvent from "./pages/Event/CreateEvent";
import EventDetails from "./pages/EventDetails/EventDetails";
import SearchEvent from "./pages/Event/searchEvent";
import BookTicket from "./pages/Tickets/BookTicket";
import VerifyResetOTP from "./pages/auth/VerifyOtp";
import EditEvent from "./pages/Event/EditEvent";
import React from "react";
import Category from "./pages/Category/category";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<AuthForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/verification" element={<VerifyEmail/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/change-password" element={<ChangePassword/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/createevent" element={<CreateEvent/>}/>
        <Route path="/events/:id" element={<EventDetails/>}/>
        <Route path="/searchevent" element={<SearchEvent/>}/>
        <Route path="/booktickets/:id" element={<BookTicket/>}/>
        <Route path="/verifyresetotp" element={<VerifyResetOTP/>}/>
        <Route path="/editevent/:id" element={<EditEvent/>}/>
        <Route path="/events/category" element={<Category/>}/>
      </Routes>
    </div>
  );
}
export default App;
