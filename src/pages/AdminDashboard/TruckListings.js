import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axiosInstance from "../../utils/api-client";
import {
  saveTruckListings,
  signOut,
} from "../../redux/features/user/userSlice";
import DataTable from "../../components/tables/TruckTableList";
import MetricTable from "../../components/adminDashboard/MetricTable";

const Container = styled.div`
  // display: flex;
  // height: auto;
  // justify-content: center;
  // align-items: center;
  //   background: black;
  padding-top: 130px;
  // padding-bottom: 60px;
  // align-content: center;

  @media screen and (max-width: 768px) {
    padding-top: 70px;
    margin-bottom: 0px;
    height: auto;
  }
`;

function TruckListings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const reduxTruckListings = state?.user?.truckListings;
  console.log("reduxTruckListings", reduxTruckListings);

  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("bookings");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTruckListings = async () => {
    setLoading(true);
    try {
      await axiosInstance({
        url: "api/listing/all-offerings",
        method: "GET",
      })
        .then((res) => {
          console.log("fetchTruckListings res", res?.data);
          setLoading(false);

          dispatch(saveTruckListings(res?.data?.data));
        })
        .catch((err) => {
          console.log("fetchTruckListings err", err?.response?.data);
          setLoading(false);

          dispatch(signOut());
          navigate("/");
        });
    } catch (error) {
      console.log("fetchTruckListings error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTruckListings();
  }, []);

  // Sample data based on the image
  const bookings = [
    {
      id: 1,
      client: "James Smith",
      vehicle: "Sedan/ LuxeDrive Aveline",
      plan: "3 Day",
      pickupDate: "12/01/2025",
      returnDate: "15/01/2025",
      status: "Completed",
    },
    {
      id: 2,
      client: "Liam Alexander",
      vehicle: "Sedan/ Elysium Cruiser",
      plan: "2 Day",
      pickupDate: "12/01/2025",
      returnDate: "14/01/2025",
      status: "In Progress",
    },
    {
      id: 3,
      client: "Olivia Grace",
      vehicle: "SUV/ TerraCruiser X5",
      plan: "1 Day",
      pickupDate: "12/01/2025",
      returnDate: "13/01/2025",
      status: "Reserved",
    },
    {
      id: 4,
      client: "Emma Charlotte",
      vehicle: "Electric/ Voltara E1",
      plan: "5 Day",
      pickupDate: "07/01/2025",
      returnDate: "12/01/2025",
      status: "Cancelled",
    },
    {
      id: 5,
      client: "Sophia Elizabeth",
      vehicle: "Sedan/ NexaDrive Eleg..",
      plan: "4 Day",
      pickupDate: "08/01/2025",
      returnDate: "12/01/2025",
      status: "Completed",
    },
    {
      id: 6,
      client: "Anderson Taylor",
      vehicle: "Electric/ Voltara E1",
      plan: "7 Day",
      pickupDate: "04/01/2025",
      returnDate: "11/01/2025",
      status: "Reserved",
    },
  ];

  const users = [
    { id: 1, name: "Alice Johnson", age: 28 },
    { id: 2, name: "Bob Smith", age: 34 },
    { id: 3, name: "Charlie Lee", age: 22 },
    { id: 4, name: "Dana Kim", age: 40 },
    { id: 5, name: "Evan Wright", age: 31 },
  ];

  return (
    <Container>
      <h1>TruckListings</h1>
      <MetricTable users={users} tableTitle={"Truck listings"} />
    </Container>
  );
}

export default TruckListings;
