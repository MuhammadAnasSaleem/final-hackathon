import LandingPage from "../pages/LandingPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Signup from "../pages/Signup.jsx";
import Login from "../pages/Login.jsx";
import WeddingLoan from "../pages/WeddingLoans.jsx";
import HomeContainerLoan from "../pages/HomeConstructionLoan.jsx";
import EducationLoan from "../pages/Education.jsx";
import BuisnessLoan from "../pages/BuisnessLoan.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={<LandingPage />} />
        <Route path="/wedding" element={<WeddingLoan />} />
        <Route path="/buisness" element={<BuisnessLoan />} />
        <Route path="/education" element={<EducationLoan />} />
        <Route path="/home" element={<HomeContainerLoan />} />
        <Route path="/" element={<LandingPage />} />

        {/* <Route path="/protected" element={<ProtectedPage />} /> */}

        {/* */}
      </Routes>
    </Router>
  );
}

export default App;
