import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "../pages/Navbar";
import Login from "../pages/Auth/Login";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";

import Footer from "../pages/Footer";
import Home from "../pages/Home/Home";

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default NormalRoutes;
