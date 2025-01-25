import LandingPage from "../pages/LandingPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Signup from "../pages/Signup.jsx";
import Login from "../pages/Login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={<LandingPage />} />
        {/* <Route path="/protected" element={<ProtectedPage />} /> */}

        {/* */}
      </Routes>
    </Router>
  );
}

export default App;
