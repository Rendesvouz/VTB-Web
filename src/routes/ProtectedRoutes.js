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

import TruckListings from "../pages/AdminDashboard/TruckListings";
import Dashboard from "../pages/AdminDashboard/Dashboard";
import CreateTruck from "../pages/AdminDashboard/TruckListing/CreateTruck";
import EditTruck from "../pages/AdminDashboard/TruckListing/EditTruck";
import TruckCategories from "../pages/AdminDashboard/TruckCategories";
import TruckDetailsPage from "../pages/AdminDashboard/TruckDetailsPage";
import DriverListing from "../pages/AdminDashboard/DriversListing/DriverListing";
import TruckOwnersListings from "../pages/AdminDashboard/TruckOwnersListing/TruckOwnersListings";
import TruckOwnerListingProfile from "../pages/AdminDashboard/TruckOwnersListing/TruckOwnerListingProfile";
import UsersListing from "../pages/AdminDashboard/UsersListing";

function ProtectedRoutes() {
  return (
    <Router>
      <ScrollToTop />
      <ToastContainer />
      <Sidebar />
      <Routes>
        <Route path="*" element={<Navigate to="/admin-dashboard" replace />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />

        {/* Drivers section */}
        <Route path="/driver-listings" element={<DriverListing />} />

        {/* Truck Categories */}
        <Route path="/truck-categories" element={<TruckCategories />} />

        {/* Trucks section */}
        <Route path="/truck-listings" element={<TruckListings />} />
        <Route path="/add-truck" element={<CreateTruck />} />
        <Route path="/edit-truck/:id" element={<EditTruck />} />
        <Route path="/truck-details/:id" element={<TruckDetailsPage />} />

        {/*  Truck owners section */}
        <Route
          path="/truck-owners-listings"
          element={<TruckOwnersListings />}
        />
        <Route
          path="/truck-owner/profile/:id"
          element={<TruckOwnerListingProfile />}
        />

        {/* All Users section */}
        <Route path="/all-users" element={<UsersListing />} />

        {/*  Support section */}
      </Routes>

      {/* <Footer /> */}
    </Router>
  );
}

export default ProtectedRoutes;
