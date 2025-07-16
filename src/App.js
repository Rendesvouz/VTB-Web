import "./App.css";
import { useSelector } from "react-redux";
import NormalRoutes from "./routes/NormalRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import TruckOwnerRoutes from "./routes/TruckOwnerRoutes";

function App() {
  const state = useSelector((state) => state);
  // console.log("state", state);

  const loggedInUser = state?.user?.user;
  console.log("loggedInUser", loggedInUser);

  return (
    <>
      {loggedInUser?.User?.role === "TruckOwner" ? (
        <TruckOwnerRoutes />
      ) : loggedInUser?.User?.role === "Admin" ? (
        <ProtectedRoutes />
      ) : (
        <NormalRoutes />
      )}
    </>
  );
}

export default App;
