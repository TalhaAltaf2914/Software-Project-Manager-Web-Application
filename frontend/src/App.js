import "./App.css";
import { Route, Routes, useHistory } from "react-router-dom";
// import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import UserContext from "./context/UserContext";
import Home from "./pages/Home/Home";
import { useState } from "react";

function App() {
  let [userDetails, setUserDetails] = useState({});
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserContext.Provider
      value={{ userDetails, setUserDetails, isLoggedIn, setIsLoggedIn }}
    >
      <Routes>
        {/* {/*  /> */}
        {/* <Route path="/" element={isLoggedIn ? <Home /> : <Login />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<Home />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
