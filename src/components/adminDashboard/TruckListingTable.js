import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FormButton from "../form/FormButton";
import PaginationComponent from "./PaginationComp";
import { formatDate } from "../../Library/Common";
import { getAvailabilityStyles } from "../../Library/Precedence";
import axiosInstance from "../../utils/api-client";
import {
  saveEditTruckData,
  saveTruckListings,
} from "../../redux/features/user/userSlice";

const TruckListingTable = ({ bookings, tableTitle }) => {
  console.log("ddd", bookings);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [loading, setLoading] = useState(false);
  const [loadingTruckId, setLoadingTruckId] = useState(null);
  const [actionType, setActionType] = useState(null);

  const [sortOption, setSortOption] = useState("alphabetical");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedBookings = [...bookings]?.sort((a, b) => {
    if (sortOption === "alphabetical") {
      return a?.username?.localeCompare(b?.username);
    } else if (sortOption === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const sortedPaginatedBookings = sortedBookings?.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const totalPages = Math.ceil(bookings?.length / itemsPerPage);

  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const exportTableToCSV = () => {
    // Implementation of CSV export
  };

  const handleEdit = async (truckInfo) => {
    console.log("truckInfo", truckInfo);
    dispatch(saveEditTruckData(truckInfo));
    navigate(`/edit-truck/${truckInfo?.id}`);
  };

  const handleDelete = async (truckId) => {
    setLoadingTruckId(truckId);
    setActionType("delete");
    try {
      await axiosInstance({
        url: `api/listing/offering/${truckId}`,
        method: "DELETE",
      })
        .then((res) => {
          console.log("handleDelete res", res?.data);
          setLoading(false);

          fetchTruckListings();
          setLoadingTruckId(null);
          setActionType(null);
        })
        .catch((err) => {
          console.log("handleDelete err", err?.response?.data);
          setLoadingTruckId(null);
          setActionType(null);
        });
    } finally {
      setLoadingTruckId(null);
      setActionType(null);
    }
  };

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
            <FormButton title="Download CSV" onClick={exportTableToCSV} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                // Truck Info
                "Truck Images",
                "Truck Name",
                "Truck Model",
                "Truck Type",
                "Truck Capacity",
                "Truck Location",
                "Truck Prices",
                "Truck Model",

                "Status",
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
            {sortedPaginatedBookings?.map((truck, i) => {
              const statusInfo = getAvailabilityStyles(truck?.availability);

              return (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={truck?.pictures}
                          alt=""
                        />
                      </div>
                      {/* <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user?.username}
                        </div>
                      </div> */}
                    </div>
                  </td>

                  {/* Truck Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {truck?.car_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{truck?.model}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{truck?.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {truck?.capacity}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {truck?.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {truck?.price?.[0]}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {truck?.car_name}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusInfo.bgClass} ${statusInfo.textClass}`}
                    >
                      {statusInfo.label}
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
                      {formatDate(truck?.createdAt)}
                    </div>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <TransparentBtn title={"View"} />
                  </td> */}

                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(truck)}
                      className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded hover:bg-blue-200"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(truck?.id)}
                      disabled={
                        loadingTruckId === truck.id && actionType === "delete"
                      }
                      className={`px-3 py-1 text-sm font-medium rounded ${
                        loadingTruckId === truck.id && actionType === "delete"
                          ? "bg-red-300 text-white cursor-not-allowed"
                          : "text-red-600 bg-red-100 hover:bg-red-200"
                      }`}
                    >
                      {loadingTruckId === truck.id && actionType === "delete"
                        ? "Deleting..."
                        : "Delete"}
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
          totalItems={bookings?.length}
          itemsPerPage={itemsPerPage}
          onPrev={prevPage}
          onNext={nextPage}
        />
      </div>
    </div>
  );
};

export default TruckListingTable;
