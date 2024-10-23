import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AuthForm from "./pages/auth/authForm";
function App() {

  return (
    
    <div className="App">
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<AuthForm/>} />
      </Routes>
    </div>
  );
}
export default App;