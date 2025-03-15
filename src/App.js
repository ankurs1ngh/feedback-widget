import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./components/Login";
import FeedbackWidget from "./components/FeedbackWidget";
import QuestionPage from "./pages/Question"; // ✅ Import the Question Page
import "./index.css";

const AuthMiddleware = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return token && role === "admin" ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AuthMiddleware><Admin /></AuthMiddleware>} />  {/* ✅ Protected Admin Route */}
        <Route path="/question" element={<AuthMiddleware><QuestionPage /></AuthMiddleware>} /> {/* ✅ Protected Question Page */}
        <Route path="/widget" element={<FeedbackWidget />} />
      </Routes>
    </Router>
  );
}

export default App;
