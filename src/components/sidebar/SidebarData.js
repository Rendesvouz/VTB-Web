import React from "react";

import { IoSettingsOutline, IoReceiptOutline } from "react-icons/io5";
import { GrProjects } from "react-icons/gr";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import { BsPersonVcard } from "react-icons/bs";
import { FaBuildingUser, FaUsers } from "react-icons/fa6";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/admin-dashboard",
    icon: <GrProjects />,
  },
  {
    title: "Bookings",
    path: "/bookings",
    icon: <IoReceiptOutline />,
  },
  {
    title: "Vehicle Owners",
    path: "/vehicle-owners-listings",
    icon: <FaBuildingUser />,
  },
  {
    title: "Drivers",
    path: "/driver-listings",
    icon: <BsPersonVcard />,
  },
  {
    title: "Vehicles",
    path: "/vehicle-listings",
    icon: <BsTruck />,
  },
  {
    title: "Users",
    path: "/all-users",
    icon: <FaUsers />,
  },
  {
    title: "Vehicle Category",
    path: "/vehicle-categories",
    icon: <BiCategory />,
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: <FaBell />,
  },
  {
    title: "Account",
    path: "/account",
    icon: <MdOutlineAccountCircle />,
  },
  {
    title: "Settings",
    path: "/edit-profile",
    icon: <IoSettingsOutline />,
  },
];

export const TruckOwnerSidebarData = [
  {
    title: "Dashboard",
    path: "/vehicle-owner/dashboard",
    icon: <GrProjects />,
  },
  {
    title: "My Vehicles",
    path: "/vehicle-owner/vehicle-listings",
    icon: <BsTruck />,
  },
  {
    title: "My Drivers",
    path: "/vehicle-owner/drivers",
    icon: <BsPersonVcard />,
  },
  {
    title: "My Bookings",
    path: "/vehicle-owner/bookings",
    icon: <IoReceiptOutline />,
  },
  {
    title: "Notifications",
    path: "/vehicle-owner/notifications",
    icon: <FaBell />,
  },
  {
    title: "Account",
    path: "/vehicle-owner/profile",
    icon: <MdOutlineAccountCircle />,
  },
  {
    title: "Settings",
    path: "/vehicle-owner/edit-profile",
    icon: <IoSettingsOutline />,
  },
];
