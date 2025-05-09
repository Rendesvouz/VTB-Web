import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Sidebar from "../components/sidebar/Sidebar";

import ScrollToTop from "../components/scrollToTop/ScrollToTop";

// import Home from "../pages/Home/Home";
import Footer from "../pages/Footer";
import TruckListings from "../pages/AdminDashboard/TruckListings";
import Dashboard from "../pages/AdminDashboard/Dashboard";

function ProtectedRoutes() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log("state", state);

  return (
    <Router>
      <ScrollToTop />
      <ToastContainer />
      <Sidebar />
      <Routes>
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/truck-listings" element={<TruckListings />} />

        {/*  Support section */}
      </Routes>

      {/* <Footer /> */}
    </Router>
  );
}

export default ProtectedRoutes;
