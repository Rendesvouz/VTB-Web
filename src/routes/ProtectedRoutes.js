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
import DriverListingProfile from "../pages/AdminDashboard/DriversListing/DriverListingProfile";

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
        <Route path="/driver/profile/:id" element={<DriverListingProfile />} />

        {/* Truck Categories */}
        <Route path="/vehicle-categories" element={<TruckCategories />} />

        {/* Trucks section */}
        <Route path="/vehicle-listings" element={<TruckListings />} />
        <Route path="/add-vehicle" element={<CreateTruck />} />
        <Route path="/edit-vehicle/:id" element={<EditTruck />} />
        <Route path="/vehicle-details/:id" element={<TruckDetailsPage />} />

        {/*  Truck owners section */}
        <Route
          path="/vehicle-owners-listings"
          element={<TruckOwnersListings />}
        />
        <Route
          path="/vehicle-owner/profile/:id"
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
