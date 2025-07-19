import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PaginationComponent from "./PaginationComp";
import { formatDate, getAgeFromDOB } from "../../Library/Common";
import TransparentBtn from "../form/TransparentBtn";
import { getEmploymentStyles } from "../../Library/Precedence";
import axiosInstance from "../../utils/api-client";
import {
  saveDriversListings,
  saveSelectedDriver,
} from "../../redux/features/user/userSlice";

function DriversListingTable({ props = [], tableTitle }) {
  console.log("driverTable props", props);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfle = state?.user?.user;
  const isTruckOwner = userProfle?.User?.role == "TruckOwner";
  const loggedInTruckOwnerId = userProfle?.truckownerId;

  const assignedDrivers = props?.filter(
    (driver) => driver?.truckownerId === loggedInTruckOwnerId
  );

  const checkIfIsTruckOwnerToDisplayDrivers = isTruckOwner
    ? assignedDrivers
    : props;

  const [loading, setLoading] = useState(false);
  const [loadingDriverId, setLoadingDriverId] = useState(null);
  const [actionType, setActionType] = useState(null);

  const [sortOption, setSortOption] = useState("alphabetical");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedDrivers = checkIfIsTruckOwnerToDisplayDrivers?.sort((a, b) => {
    if (sortOption === "alphabetical") {
      return a?.username?.localeCompare(b?.username);
    } else if (sortOption === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const sortedPaginatedDrivers = sortedDrivers?.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const totalPages = Math.ceil(props?.length / itemsPerPage);

  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleSuspend = async (driverInfo) => {
    console.log("driverInfo", driverInfo);

    const currentStatus = driverInfo?.User?.verification?.verificationStatus;

    let newStatus = currentStatus;
    let action = "";

    // Decide action and target status
    if (currentStatus === "pending" || currentStatus === "rejected") {
      newStatus = "verified";
      action = "activate";
    } else if (currentStatus === "verified") {
      newStatus = "rejected";
      action = "suspend";
    }

    setActionType(action);
    setLoadingDriverId(driverInfo?.driverId);
    console.log("newStatus", newStatus);

    try {
      console.log("newStatus", newStatus);

      const res = await axiosInstance({
        url: `api/verification/status/${driverInfo?.driverId}`,
        method: "PUT",
        data: {
          verificationStatus: newStatus,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("handleSuspend res", res?.data);

      fetchDriversListingsWithTruckInfo();
    } catch (err) {
      console.log("handleSuspend err", err?.response?.data);
    } finally {
      setLoadingDriverId(null);
      setActionType(null);
    }
  };

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

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold text-gray-900">
              {tableTitle} Management
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage and monitor user accounts and their statuses.
            </p>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="sort"
              className="text-sm font-medium text-gray-700 mr-2"
            >
              Sort:
            </label>
            <select
              value={sortOption}
              id="sort"
              name="sort"
              onChange={handleSortChange}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="alphabetical">Alphabetical</option>
              <option value="recent">Recent</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                // Driver Info
                "Driver FullName",
                "Age",

                // driver info
                "Assigned Vehicle",

                // Employer info
                "Employer",

                "Employment Status",

                "Created At",
                "Action",
              ]?.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPaginatedDrivers?.map((driver, i) => {
              const employmentInfo = getEmploymentStyles(driver?.status);

              return (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={driver?.profilePicture}
                          alt={driver?.fullName}
                        />
                      </div>
                      <p className="text-sm text-gray-900 ml-2">
                        {driver?.fullName}
                      </p>
                    </div>
                  </td>

                  {/* driver Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getAgeFromDOB(driver?.dateOfBirth)}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {driver?.assignedTruck
                        ? driver?.assignedTruck?.car_name
                        : null}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {driver?.assignedTruck?.truckOwnerProfile?.companyName}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${employmentInfo.bgClass} ${employmentInfo.textClass}`}
                    >
                      {employmentInfo?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {formatDate(driver?.createdAt)}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                    {!isTruckOwner && (
                      <button
                        onClick={() => handleSuspend(driver)}
                        disabled={loadingDriverId === driver?.driverId}
                        className={`px-3 py-1 text-sm font-medium rounded ${
                          loadingDriverId === driver?.driverId
                            ? "bg-gray-300 text-white cursor-not-allowed"
                            : driver?.User?.verification?.verificationStatus ===
                              "verified"
                            ? "text-red-600 bg-red-100 hover:bg-red-200"
                            : "text-green-600 bg-green-100 hover:bg-green-200"
                        }`}
                      >
                        {loadingDriverId === driver?.driverId
                          ? actionType === "suspend"
                            ? "Suspending..."
                            : "Activating..."
                          : driver?.User?.verification?.verificationStatus ===
                            "verified"
                          ? "Suspend"
                          : "Verify"}
                      </button>
                    )}

                    <button
                      onClick={() => {
                        // save data to redux
                        dispatch(saveSelectedDriver(driver));

                        isTruckOwner
                          ? // navigate to the profile
                            navigate(
                              `/vehicle-owner/driver/profile/${driver?.driverId}`
                            )
                          : navigate(`/driver/profile/${driver?.driverId}`);
                      }}
                      className="px-3 py-1 text-sm font-medium text-blue-600 bg-white-100 border-2 border-blue-400 rounded"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-4 bg-gray-50 border-t border-gray-200">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={props?.length}
          itemsPerPage={itemsPerPage}
          onPrev={prevPage}
          onNext={nextPage}
        />
      </div>
    </div>
  );
}

export default DriversListingTable;
