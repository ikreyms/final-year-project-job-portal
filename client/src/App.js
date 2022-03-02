import React, { useEffect } from "react";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Homepage from "./components/Homepage";
import Jobs from "./components/Jobs";
import About from "./components/About";
import Employers from "./components/Employers";
// import Employer from "./components/Employer";
import Auth from "./components/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "@mui/styles";
import axios from "axios";
import { login } from "./redux/actionCreators";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  const checkIfLoggedIn = async () => {
    const token = localStorage.getItem("joblookupLoginToken");
    try {
      const response = await axios.post(
        "http://localhost:2900/api/auth",
        null,
        {
          headers: {
            contentType: "application/json",
            authorization: token,
          },
        }
      );
      dispatch(login(response.data.user));
      // console.log(response.data.user);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log("server error");
      }
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="employers" element={<Employers />} />
        {/* <Route path="employers/:id" element={<Employer />} /> */}

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
