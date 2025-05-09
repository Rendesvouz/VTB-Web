import React from "react";

import {
  IoDiscOutline,
  IoMusicalNotesOutline,
  IoSettingsOutline,
  IoPerson,
  IoVideocamOutline,
} from "react-icons/io5";
import { SlPlaylist } from "react-icons/sl";
import { GrProjects } from "react-icons/gr";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaHandshakeAngle } from "react-icons/fa6";
import { FaLink, FaBell } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";
import { MdFileUpload } from "react-icons/md";
import { BsTruck } from "react-icons/bs";

export const SidebarData = [
  // {
  //   title: "Discover",
  //   path: "/discover",
  //   icon: <IoDiscOutline />,
  // },
  // {
  //   title: "Search",
  //   path: "/search",
  //   icon: <IoSearch />,
  // },
  // {
  //   title: "Profile",
  //   path: "/profile",
  //   icon: <IoPerson />,
  // },
  {
    title: "Dashboard",
    path: "/admin-dashboard",
    icon: <GrProjects />,
  },
  {
    title: "Truck Listings",
    path: "/truck-listings",
    icon: <BsTruck />,
  },
  {
    title: "Settings",
    path: "/edit-profile",
    icon: <IoSettingsOutline />,
  },
  // {
  //   title: "Upload Music",
  //   path: "/upload",
  //   icon: <MdFileUpload />,
  // },
  {
    title: "Account",
    path: "/account",
    icon: <MdOutlineAccountCircle />,
  },

  {
    title: "Notifications",
    path: "/notifications",
    icon: <FaBell />,
  },
  // {
  //   title: "FanLink",
  //   path: "/fanlinks",
  //   icon: <FaLink />,
  // },
  // {
  //   title: "Takedown Song or Album",
  //   path: "/takedown-song",
  //   icon: <IoIosRemoveCircle />,
  // },
  // {
  //   title: "Partnerships",
  //   path: "/partnership-procedure",
  //   icon: <FaHandshakeAngle />,
  // },
  // {
  //   title: "Face Video",
  //   path: "/face-video",
  //   icon: <IoVideocamOutline />,
  // },
  // {
  //   title: "Dance  Video",
  //   path: "/dance-video",
  //   icon: <IoVideocamOutline />,
  // },
];
