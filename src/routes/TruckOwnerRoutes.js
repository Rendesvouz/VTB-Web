import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Sidebar from "../components/sidebar/Sidebar";

import ScrollToTop from "../components/scrollToTop/ScrollToTop";
import TruckOwnerDashboard from "../pages/TruckOwnerDashboard/TruckOwnerDashboard";
import TruckListings from "../pages/AdminDashboard/TruckListings";
import CreateTruck from "../pages/AdminDashboard/TruckListing/CreateTruck";
import EditTruck from "../pages/AdminDashboard/TruckListing/EditTruck";
import TruckDetailsPage from "../pages/AdminDashboard/TruckDetailsPage";
import DriverListing from "../pages/AdminDashboard/DriversListing/DriverListing";
import TruckOwnerProfile from "../pages/TruckOwnerDashboard/TruckOwnerProfile";

function TruckOwnerRoutes() {
  return (
    <Router>
      <ScrollToTop />
      <ToastContainer />
      <Sidebar />
      <Routes>
        <Route
          path="*"
          element={<Navigate to="/truck-owner/dashboard" replace />}
        />

        <Route
          path="/truck-owner/dashboard"
          element={<TruckOwnerDashboard />}
        />

        <Route path="/truck-owner/profile" element={<TruckOwnerProfile />} />

        <Route path="/truck-owner/truck-listings" element={<TruckListings />} />
        <Route path="/truck-details/:id" element={<TruckDetailsPage />} />

        <Route path="/truck-owner/add-truck" element={<CreateTruck />} />
        <Route path="/truck-owner/edit-truck/:id" element={<EditTruck />} />

        {/* Drivers section */}
        <Route path="/truck-owner/drivers" element={<DriverListing />} />

        {/* Truck Categories */}
      </Routes>
    </Router>
  );
}

export default TruckOwnerRoutes;
