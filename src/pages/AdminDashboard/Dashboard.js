import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import DashboardCards from "../../components/cards/DashboardCards";
import FinancialCharts from "../../components/adminDashboard/FinancialCharts";
import MetricTable from "../../components/adminDashboard/MetricTable";
import axiosInstance from "../../utils/api-client";
import {
  saveBookedTrucks,
  saveTruckCategories,
  saveTruckListings,
  saveTruckOnwerTrucksListings,
} from "../../redux/features/user/userSlice";
import TruckLocationMap from "../../components/adminDashboard/TruckLocationMapView";

const Container = styled.div`
  // display: flex;
  // height: auto;
  // justify-content: center;
  // align-items: center;
  //   background: red;
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

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfle = state?.user?.user;
  console.log("userProfle", userProfle);

  const reduxTruckListings = state?.user?.truckListings;
  const reduxBookedTrucks = state?.user?.bookedTrucks;
  const reduxPlatformUsers = state?.user?.platformUsers;

  console.log("reduxBookedTrucks", reduxBookedTrucks, reduxTruckListings);

  const [loading, setLoading] = useState(false);

  const fetchTruckListings = async () => {
    try {
      await axiosInstance({
        url: "api/listings/all-offerings",
        method: "GET",
      })
        .then((res) => {
          console.log("fetchTruckListings res", res?.data);
          dispatch(saveTruckListings(res?.data?.data));
        })
        .catch((err) => {
          console.log("fetchTruckListings err", err?.response?.data);
        });
    } catch (error) {
      console.log("fetchTruckListings error", error);
    }
  };

  const fetchTruckOwnerTrucksListings = async () => {
    setLoading(true);

    try {
      const truckListingResponse = await axiosInstance({
        url: "api/listing/all-truckowner-listing",
        method: "GET",
      });

      console.log("truckListingResponse", truckListingResponse?.data);

      if (truckListingResponse?.data) {
        const matchedResponses = truckListingResponse?.data;

        const matchedResponseWithProfiles = await Promise.all(
          matchedResponses?.map(async (listing) => {
            const matchedDriverProfile = await getDriversProfile(
              listing?.driverId
            );
            return { ...listing, matchedDriverProfile };
          })
        );

        console.log(
          "fetchTruckOwnerTrucksListings",
          matchedResponseWithProfiles
        );
        dispatch(saveTruckOnwerTrucksListings(matchedResponseWithProfiles));
        setLoading(false);
      }
    } catch (error) {
      console.log("fetchTruckOwnerTrucksListings error", error?.response);
      setLoading(false);
    }
  };

  const getDriversProfile = async (driverId) => {
    try {
      const response = await axiosInstance({
        url: `api/profile/driverprofiles/${driverId}`,
        method: "GET",
      });
      console.log("getDriversProfile res", response?.data);
      return response?.data?.data?.profile;
    } catch (error) {
      console.error(
        `getDriversProfile error for driverId ${driverId}:`,
        error?.response
      );

      return null;
    }
  };

  const getAllBookings = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("api/books/all-booking");

      const userBookings = res?.data;

      if (!userBookings) return;

      const enrichedBookingData = await Promise.all(
        userBookings.map(async (booking) => {
          try {
            const [listingRes, userProfileRes] = await Promise.all([
              axiosInstance.get(`api/listings/offerings/${booking?.listingId}`),
              axiosInstance.get(`api/profile/profiles/${booking?.userId}`),
            ]);

            return {
              ...booking,
              listingData: listingRes?.data?.data || null,
              userProfile: userProfileRes?.data || null,
            };
          } catch (error) {
            console.error(
              `Error enriching booking for ID ${booking?.id}`,
              error
            );
            return {
              ...booking,
              listingData: null,
              userProfile: null,
            };
          }
        })
      );

      console.log("enrichedBookingData", enrichedBookingData);
      dispatch(saveBookedTrucks(enrichedBookingData));
    } catch (error) {
      console.log("getAllBookings error", error?.response);
    } finally {
      setLoading(false);
    }
  };
  const fetchTruckCategories = async () => {
    setLoading(true);
    try {
      await axiosInstance({
        url: "api/listing/category",
        method: "GET",
      })
        .then((res) => {
          console.log("fetchTruckCategories res", res?.data);
          setLoading(false);

          dispatch(saveTruckCategories(res?.data?.data));
        })
        .catch((err) => {
          console.log("fetchTruckCategories err", err?.response?.data);
          setLoading(false);
        });
    } catch (error) {
      console.log("fetchTruckCategories error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBookings();
    fetchTruckListings();
    fetchTruckCategories();
    fetchTruckOwnerTrucksListings();
  }, []);

  // Financial and bookings data for charts
  const financialData = [
    { name: "Jan", income: 24000, expenses: 18000, bookings: 42 },
    { name: "Feb", income: 26000, expenses: 17500, bookings: 45 },
    { name: "Mar", income: 27500, expenses: 19000, bookings: 48 },
    { name: "Apr", income: 26000, expenses: 20000, bookings: 46 },
    { name: "May", income: 28000, expenses: 21000, bookings: 52 },
    { name: "Jun", income: 32000, expenses: 22000, bookings: 58 },
    { name: "Jul", income: 34000, expenses: 22500, bookings: 62 },
    { name: "Aug", income: 36000, expenses: 23000, bookings: 65 },
    { name: "Sep", income: 34000, expenses: 22000, bookings: 60 },
    { name: "Oct", income: 32000, expenses: 21000, bookings: 56 },
    { name: "Nov", income: 30000, expenses: 20000, bookings: 52 },
    { name: "Dec", income: 28000, expenses: 19000, bookings: 48 },
  ];

  return (
    <Container>
      <DashboardCards
        vehicles={reduxTruckListings}
        vehicleCount={reduxTruckListings?.length}
        bookings={reduxBookedTrucks}
        onTruckClick={() => {
          navigate("/vehicle-listings");
        }}
        showPlatformUsers={true}
        onPlatformUsers={() => {
          navigate("/all-users");
        }}
        platformUsersCount={reduxPlatformUsers?.length}
      />

      {/* Chart */}
      <FinancialCharts financialData={financialData} />

      {/* mapview */}
      <TruckLocationMap />

      {/* Bookings Table */}
      {reduxBookedTrucks && (
        <MetricTable
          bookings={reduxBookedTrucks}
          tableTitle={"Truck Bookings"}
        />
      )}
    </Container>
  );
}

export default Dashboard;
