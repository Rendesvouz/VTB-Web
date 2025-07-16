import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "../pages/Navbar";
import Login from "../pages/Auth/Login";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";

import Footer from "../pages/Footer";
import Home from "../pages/Home/Home";
import RegisterPage from "../pages/Auth/RegisterPage";
import TruckOwnerRegistration from "../pages/Auth/TruckOwnerRegistration";
import EmailVerification from "../pages/Auth/EmailVerification";
import TruckOwnerOnboarding from "../pages/Auth/TruckOwnerOnboarding";

function NormalRoutes() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />

        {/*  Auth section */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/truck-owner/register"
          element={<TruckOwnerRegistration />}
        />
        <Route path="/email-verification" element={<EmailVerification />} />

        {/* Truck Onwer Onboarding section */}
        <Route
          path="/truck-owner/onboarding"
          element={<TruckOwnerOnboarding />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default NormalRoutes;
