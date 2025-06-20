import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axiosInstance from "../../utils/api-client";
import { saveTruckListings } from "../../redux/features/user/userSlice";

import FormButton from "../../components/form/FormButton";
import TruckListingTable from "../../components/adminDashboard/TruckListingTable";
import { toast } from "react-toastify";
import DriverSelectionDisplay from "../../components/cards/DriverDisplayCards";
import Modal from "../../components/modal/Modal";

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
  const [showDrivers, setShowDrivers] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(!openModal);
  };

  const [selectedTruckForAssignment, setSelectedTruckForAssignment] =
    useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const [truckOwnerDrivers, setTruckOwnerDrivers] = useState([]);
  const [driversListing, setDriverslisting] = useState([]);

  const fetchTruckListings = async () => {
    setLoading(true);

    try {
      const truckListingResponse = await axiosInstance({
        url: "api/listings/all-offerings",
        method: "GET",
      });

      console.log("truckListingResponse", truckListingResponse?.data);

      if (truckListingResponse?.data?.data) {
        const matchedResponses = truckListingResponse?.data?.data;

        const matchedResponseWithProfiles = await Promise.all(
          matchedResponses?.map(async (listing) => {
            const matchedDriverProfile = await getDriversProfile(
              listing?.driverId
            );
            return { ...listing, matchedDriverProfile };
          })
        );

        console.log("matchedResponseWithProfiles", matchedResponseWithProfiles);
        dispatch(saveTruckListings(matchedResponseWithProfiles));
        setLoading(false);
      }
    } catch (error) {
      console.log("fetchTruckListings error", error?.response);
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

  const fetchDriversListings = async () => {
    setLoading(true);
    try {
      await axiosInstance({
        url: "api/profile/all-driverprofile",
        method: "GET",
      })
        .then((res) => {
          console.log("fetchDriversListings res", res?.data);
          setLoading(false);

          setDriverslisting(res?.data?.data);
        })
        .catch((err) => {
          console.log("fetchDriversListings err", err?.response?.data);
          setLoading(false);
        });
    } catch (error) {
      console.log("fetchDriversListings error", error);
      setLoading(false);
    }
  };

  const fetchTruckOwnerDrivers = async () => {
    setLoading(true);
    try {
      await axiosInstance({
        url: "api/truckowner/get-drivers",
        method: "GET",
      })
        .then((res) => {
          console.log("fetchTruckOwnerDrivers res", res?.data);
          setLoading(false);

          setTruckOwnerDrivers(res?.data?.data);
        })
        .catch((err) => {
          console.log("fetchTruckOwnerDrivers err", err?.response?.data);
          setLoading(false);
        });
    } catch (error) {
      console.log("fetchTruckOwnerDrivers error", error);
      setLoading(false);
    }
  };

  const handleEmployDriverToTruck = async () => {
    setLoading(true);

    const assignData = {
      driverId: selectedDriver?.id,
      truckId: selectedTruckForAssignment?.id,
      status: "assign",
      startDate: Date.now(),
      endDate: null,
    };

    try {
      await axiosInstance({
        url: "api/truckowner/assign-truck",
        method: "POST",
        data: assignData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("handleAssignDriverToTruck res", res?.data);
          setLoading(false);
          setShowDrivers(false);

          toast.success(
            `Successfully assigned ${selectedDriver?.fullName} to ${selectedTruckForAssignment?.car_name}`
          );

          fetchTruckListings();
        })
        .catch((err) => {
          console.log("handleAssignDriverToTruck err", err?.response?.data);
          setLoading(false);
          toast.error("An error occured while assigning driver to truck");
        });
    } catch (error) {
      console.log("handleAssignDriverToTruck error", error?.response);
      setLoading(false);
      toast.error("An error occured while assigning driver to truck");
    }
  };

  const handleAssignDriverToTruck = async () => {
    setLoading(true);

    const assignData = {
      driverId: selectedDriver?.id,
      truckId: selectedTruckForAssignment?.id,
      status: "assign",
      startDate: Date.now(),
      endDate: null,
    };

    try {
      await axiosInstance({
        url: "api/truckowner/assign-truck",
        method: "POST",
        data: assignData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("handleAssignDriverToTruck res", res?.data);
          setLoading(false);
          setShowDrivers(false);

          toast.success(
            `Successfully assigned ${selectedDriver?.fullName} to ${selectedTruckForAssignment?.car_name}`
          );

          fetchTruckListings();
        })
        .catch((err) => {
          console.log("handleAssignDriverToTruck err", err?.response?.data);
          setLoading(false);
          toast.error("An error occured while assigning driver to truck");
        });
    } catch (error) {
      console.log("handleAssignDriverToTruck error", error?.response);
      setLoading(false);
      toast.error("An error occured while assigning driver to truck");
    }
  };

  useEffect(() => {
    fetchTruckListings();
  }, []);

  useEffect(() => {
    fetchDriversListings();
    fetchTruckOwnerDrivers();
  }, [showDrivers]);

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

      {showDrivers && selectedTruckForAssignment && (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Assign Driver to: {selectedTruckForAssignment?.car_name}
          </h2>

          {loading ? (
            <p>Please wait while we aggregate the drivers list</p>
          ) : (
            <DriverSelectionDisplay
              driversArray={driversListing}
              truckOwnerDriversArray={truckOwnerDrivers}
              onDriverSelected={(driver) => {
                console.log("Selected Driver in Parent:", driver);
                setSelectedDriver(driver);
                setOpenModal(true);
              }}
            />
          )}

          {selectedDriver && (
            <Modal
              title={"Truck Assignment"}
              isOpen={openModal}
              onClose={closeModal}
            >
              <div className="mt-4">
                <p className="text-lg font-semibold text-center mb-3">
                  Assign {selectedDriver?.fullName} to{" "}
                  {selectedTruckForAssignment?.car_name} ?
                </p>

                <FormButton
                  title={`Confirm Assignment`}
                  onClick={() => handleEmployDriverToTruck(selectedDriver)}
                  loading={loading}
                />
              </div>
            </Modal>
          )}
        </div>
      )}

      <TruckListingTable
        bookings={reduxTruckListings}
        tableTitle={"Truck listings"}
        assignDriver={(truck) => {
          setSelectedTruckForAssignment(truck);
          setShowDrivers(true);
        }}
      />
    </Container>
  );
}

export default TruckListings;
