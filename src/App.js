import "./App.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import NormalRoutes from "./routes/NormalRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  // console.log("state", state);

  const loggedInUser = state?.user?.user;
  console.log("loggedInUser", loggedInUser);

  return <>{loggedInUser ? <ProtectedRoutes /> : <NormalRoutes />}</>;
}

export default App;
