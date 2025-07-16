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
    title: "Truck Owners",
    path: "/truck-owners-listings",
    icon: <FaBuildingUser />,
  },
  {
    title: "Drivers",
    path: "/driver-listings",
    icon: <BsPersonVcard />,
  },
  {
    title: "Trucks",
    path: "/truck-listings",
    icon: <BsTruck />,
  },
  {
    title: "Users",
    path: "/all-users",
    icon: <FaUsers />,
  },
  {
    title: "Truck Category",
    path: "/truck-categories",
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
    path: "/truck-owner/dashboard",
    icon: <GrProjects />,
  },
  {
    title: "My Trucks",
    path: "/truck-owner/truck-listings",
    icon: <BsTruck />,
  },
  {
    title: "My Drivers",
    path: "/truck-owner/drivers",
    icon: <BsPersonVcard />,
  },
  {
    title: "My Bookings",
    path: "/truck-owner/bookings",
    icon: <IoReceiptOutline />,
  },
  {
    title: "Notifications",
    path: "/truck-owner/notifications",
    icon: <FaBell />,
  },
  {
    title: "Account",
    path: "/truck-owner/profile",
    icon: <MdOutlineAccountCircle />,
  },
  {
    title: "Settings",
    path: "/truck-owner/edit-profile",
    icon: <IoSettingsOutline />,
  },
];
