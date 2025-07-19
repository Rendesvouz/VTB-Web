import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TransparentBtn from "../form/TransparentBtn";
import DriverCards from "./DriverCards";

const DriverSelectionDisplay = ({
  driversArray,
  truckOwnerDriversArray,
  assignedDriverIds,
  onDriverSelected,
  onCloseDisplay,
}) => {
  console.log(
    "driversArray",
    driversArray,
    truckOwnerDriversArray,
    assignedDriverIds
  );
  const state = useSelector((state) => state);

  const loggedInUser = state?.user?.user;
  console.log("loggedInUser", loggedInUser);

  const verifiedDrivers = driversArray?.filter((driver) => driver?.isVerified);
  console.log("verifiedDrivers", verifiedDrivers);

  const [selectedDriver, setSelectedDriver] = useState(null);

  const handleAssignDriver = async (driver) => {
    console.log("Assigning driver:", driver);
    setSelectedDriver(driver);

    if (onDriverSelected) {
      onDriverSelected(driver);
    }
  };

  const handleViewProfile = (driver) => {
    console.log("Viewing profile:", driver);
    setSelectedDriver(driver);
  };

  return (
    <div className="max-w-9xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Employed Drivers Section */}
      <div className="mb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Your Employed Drivers
          </h1>
          <p className="text-gray-600">
            Drivers currently employed under your fleet
          </p>
        </div>

        {/* Driver Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {truckOwnerDriversArray?.length ? (
            truckOwnerDriversArray?.map((driver, i) => (
              <DriverCards
                key={i}
                props={driver}
                onClick={handleAssignDriver}
                disabled={
                  assignedDriverIds?.includes(driver?.driverId) ||
                  (driver?.status == "employed" &&
                    driver?.truckownerId != loggedInUser?.userId)
                }
              />
            ))
          ) : (
            <div className="col-span-full">
              <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">
                  You currently don't have any employed drivers at this moment
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Hire drivers from the available pool below
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Visual Separator */}
      <div className="relative mb-12">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-gray-50 px-6 py-2 text-sm font-medium text-gray-500 rounded-full border border-gray-300">
            Available for Hire
          </span>
        </div>
      </div>

      {/* Available Drivers Section */}
      <div className="mb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Available Drivers on VTB for Hire
          </h1>
          <p className="text-gray-600">
            Select a driver for your truck employment
          </p>
        </div>

        {/* Driver Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {verifiedDrivers?.length ? (
            verifiedDrivers?.map((driver, i) => (
              <DriverCards
                key={i}
                props={driver}
                onClick={handleAssignDriver}
                disabled={
                  assignedDriverIds?.includes(driver?.driverId) ||
                  (driver?.status === "employed" &&
                    driver?.truckownerId !== loggedInUser?.userId)
                }
                assignedDriverIds={assignedDriverIds}
              />
            ))
          ) : (
            <div className="col-span-full">
              <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">
                  There are currently no onboarded drivers
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Check back later for new driver registrations
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <p className="text-gray-600">
              <span className="font-semibold">
                {truckOwnerDriversArray?.length || 0}
              </span>
              Employed Drivers
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">{driversArray?.length || 0}</span>{" "}
              Available for Hire
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium">
              Refresh List
            </button>
            <TransparentBtn
              title={"Close"}
              onClick={() => {
                onCloseDisplay();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverSelectionDisplay;
