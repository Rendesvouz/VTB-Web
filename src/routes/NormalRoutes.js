import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "../pages/Auth/Login";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";

import RegisterPage from "../pages/Auth/RegisterPage";
import TruckOwnerRegistration from "../pages/Auth/TruckOwnerRegistration";
import EmailVerification from "../pages/Auth/EmailVerification";
import TruckOwnerOnboarding from "../pages/Auth/TruckOwnerOnboarding";
import VanTruckBusRedesign from "../pages/Home/Home3";

function NormalRoutes() {
  return (
    <Router>
      <ScrollToTop />
      {/* <Navbar /> */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<VanTruckBusRedesign />} />

        {/*  Auth section */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/vehicle-owner/register"
          element={<TruckOwnerRegistration />}
        />
        <Route path="/email-verification" element={<EmailVerification />} />

        {/* Truck Onwer Onboarding section */}
        <Route
          path="/vehicle-owner/onboarding"
          element={<TruckOwnerOnboarding />}
        />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default NormalRoutes;
