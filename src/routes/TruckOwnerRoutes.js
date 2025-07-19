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
import DriverListingProfile from "../pages/AdminDashboard/DriversListing/DriverListingProfile";

function TruckOwnerRoutes() {
  return (
    <Router>
      <ScrollToTop />
      <ToastContainer />
      <Sidebar />
      <Routes>
        <Route
          path="*"
          element={<Navigate to="/vehicle-owner/dashboard" replace />}
        />

        <Route
          path="/vehicle-owner/dashboard"
          element={<TruckOwnerDashboard />}
        />

        <Route path="/vehicle-owner/profile" element={<TruckOwnerProfile />} />

        {/* Vehicles section */}
        <Route
          path="/vehicle-owner/vehicle-listings"
          element={<TruckListings />}
        />
        <Route path="/vehicle-details/:id" element={<TruckDetailsPage />} />

        <Route path="/vehicle-owner/add-vehicle" element={<CreateTruck />} />
        <Route path="/vehicle-owner/edit-vehicle/:id" element={<EditTruck />} />

        {/* Drivers section */}
        <Route path="/vehicle-owner/drivers" element={<DriverListing />} />

        {/* Profile section */}
        <Route
          path="/vehicle-owner/driver/profile/:id"
          element={<DriverListingProfile />}
        />

        {/* Truck Categories */}
      </Routes>
    </Router>
  );
}

export default TruckOwnerRoutes;
