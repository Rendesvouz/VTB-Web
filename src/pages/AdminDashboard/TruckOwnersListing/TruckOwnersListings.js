import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../../utils/api-client";
import { saveTruckOwnersListings } from "../../../redux/features/user/userSlice";
import TruckOwnersListingTable from "../../../components/adminDashboard/TruckOwnersListingTable";

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

function TruckOwnersListings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfle = state?.user?.user;
  const isTruckOwner = userProfle?.User?.role === "TruckOwner";

  const reduxTruckOwnersListings = state?.user?.truckOwnersListings;
  // console.log("reduxTruckOwnersListings", reduxTruckOwnersListings);

  const [loading, setLoading] = useState(false);

  const fetchTruckOwnersListingsWithTruckInfo = async () => {
    setLoading(true);

    try {
      // 1️⃣ Fetch all truck owners and all truck listings
      const [truckOwnerRes, trucksRes] = await Promise.all([
        axiosInstance.get("api/profile/all-truckownerprofile"),
        axiosInstance.get("api/listings/all-offerings"),
      ]);

      const truckOwners = truckOwnerRes?.data?.data || [];
      const trucks = trucksRes?.data?.data || [];

      console.log("Fetched truckOwners and trucks:", { truckOwners, trucks });

      // 2️⃣ Group trucks by truckOwnerId
      const truckOwnerToTruckMap = {};
      trucks.forEach((truck) => {
        const id = truck.truckOwnerId;
        if (!id) return;

        if (!truckOwnerToTruckMap[id]) {
          truckOwnerToTruckMap[id] = [];
        }
        truckOwnerToTruckMap[id].push(truck);
      });

      // 3️⃣ Enrich truck owners with their matching trucks
      const enrichedTruckOwners = truckOwners.map((owner) => ({
        ...owner,
        assignedTrucks: truckOwnerToTruckMap[owner.truckownerId] || [],
      }));

      // 4️⃣ Save to store and finish
      dispatch(saveTruckOwnersListings(enrichedTruckOwners));
      console.log("Enriched TruckOwners with Truck Info", enrichedTruckOwners);
    } catch (error) {
      console.error("Error fetching truck owners or trucks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTruckOwnersListingsWithTruckInfo();
  }, []);

  return (
    <Container>
      <div className="flex justify-between items-center 500 p-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Vehicle Owners Listing
        </h1>
      </div>

      <TruckOwnersListingTable
        props={reduxTruckOwnersListings}
        tableTitle={"Vehicle Owners Listing"}
      />
    </Container>
  );
}

export default TruckOwnersListings;
