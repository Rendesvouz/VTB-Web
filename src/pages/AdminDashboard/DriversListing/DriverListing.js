import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../../utils/api-client";
import { saveDriversListings } from "../../../redux/features/user/userSlice";
import DriversListingTable from "../../../components/adminDashboard/DriversListingTable";

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

function DriverListing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfle = state?.user?.user;
  const isTruckOwner = userProfle?.User?.role === "TruckOwner";

  const reduxDriversListings = state?.user?.driversListings;
  console.log("reduxDriversListings", reduxDriversListings);

  const [loading, setLoading] = useState(false);

  const fetchDriversListingsWithTruckInfo = async () => {
    setLoading(true);
    try {
      const [driversRes, trucksRes] = await Promise.all([
        axiosInstance.get("api/profile/all-driverprofile"),
        axiosInstance.get("api/listings/all-offerings"),
      ]);

      const drivers = driversRes?.data?.data || [];
      const trucks = trucksRes?.data?.data || [];
      console.log("fetchDriversListingsWithTruckInfo", drivers, trucks);

      // Fetch truck owner profiles for each truck
      const enrichedTrucks = await Promise.all(
        trucks?.map(async (truck) => {
          try {
            const ownerRes = await axiosInstance.get(
              `api/profile/truckprofiles/${truck?.truckOwnerId}`
            );
            console.log("ownerRes", ownerRes?.data);
            return {
              ...truck,
              truckOwnerProfile: ownerRes?.data || null,
            };
          } catch (err) {
            console.error(`Failed to fetch owner for truck ${truck?.id}`, err);
            return {
              ...truck,
              truckOwnerProfile: null,
            };
          }
        })
      );

      // Build a map of driverId -> truck info
      const driverToTruckMap = {};
      enrichedTrucks?.forEach((truck) => {
        if (truck?.driverId) {
          driverToTruckMap[truck?.driverId] = truck;
        }
      });

      // Append assigned truck info to each driver
      const enrichedDrivers = drivers?.map((driver) => ({
        ...driver,
        assignedTruck: driverToTruckMap[driver?.driverId] || null,
      }));

      dispatch(saveDriversListings(enrichedDrivers));
      setLoading(false);

      console.log("Enriched Drivers with Truck Info", enrichedDrivers);
    } catch (error) {
      console.log("Error fetching drivers or truck listings:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDriversListingsWithTruckInfo();
  }, []);

  return (
    <Container>
      <div className="flex justify-between items-center 500 p-4">
        <h1 className="text-2xl font-bold text-gray-900">Drivers Listing</h1>
      </div>

      <DriversListingTable
        props={reduxDriversListings}
        tableTitle={"Drivers Listing"}
      />
    </Container>
  );
}

export default DriverListing;
