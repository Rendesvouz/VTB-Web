import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axiosInstance from "../../utils/api-client";
import { saveTruckListings } from "../../redux/features/user/userSlice";

import FormButton from "../../components/form/FormButton";
import TruckListingTable from "../../components/adminDashboard/TruckListingTable";

const Container = styled.div`
  padding-top: 130px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 60px;
  align-content: center;
  padding: auto;

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

  const fetchTruckListings = async () => {
    setLoading(true);
    try {
      await axiosInstance({
        url: "api/listings/all-offerings",
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
        });
    } catch (error) {
      console.log("fetchTruckListings error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTruckListings();
  }, []);

  return (
    <Container>
      <div className="flex justify-between items-center 500 p-4">
        <h1 className="text-2xl font-bold text-gray-900">TruckListings</h1>
        <FormButton
          title={"Create Truck"}
          width={"100%"}
          onClick={() => {
            navigate("/add-truck");
          }}
        />
      </div>

      <TruckListingTable
        bookings={reduxTruckListings}
        tableTitle={"Truck listings"}
      />
    </Container>
  );
}

export default TruckListings;
