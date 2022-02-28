import React from "react";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Homepage from "./components/Homepage";
import Jobs from "./components/Jobs";
import About from "./components/About";
import Employers from "./components/Employers";
import Employer from "./components/Employer";
import Auth from "./components/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "@mui/styles";

const App = () => {
  console.log(useTheme());

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="employers" element={<Employers />} />
        <Route path="employers/:id" element={<Employer />} />

        {/* if user manually enters a route, and it is invalid:  */}
        {/* <Route path="*" element={<Employers />} />  <=not working... learn more... */}

        <Route path="about" element={<About />} />
        <Route path="auth" element={<Auth />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
