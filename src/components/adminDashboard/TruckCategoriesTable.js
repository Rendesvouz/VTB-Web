import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import FormButton from "../form/FormButton";
import PaginationComponent from "./PaginationComp";
import { formatDate, formatToNaira } from "../../Library/Common";
import axiosInstance from "../../utils/api-client";
import { saveTruckCategories } from "../../redux/features/user/userSlice";
import Modal from "../modal/Modal";
import FormInput from "../form/FormInput";

const TruckCategoriesTable = ({ categories, tableTitle }) => {
  console.log("categories", categories);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [loading, setLoading] = useState(false);
  const [loadingTruckId, setLoadingTruckId] = useState(null);
  const [actionType, setActionType] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState();
  console.log("selelee", selectedCategory);

  const [truckType, setTruckType] = useState("");
  const [truckBaseFare, setTruckBaseFare] = useState("");
  const [truckCapacity, setTruckCapacity] = useState("");
  const [truckDimension, setTruckDimension] = useState("");

  const closeModal = () => {
    setOpenModal(!openModal);
  };

  const [sortOption, setSortOption] = useState("alphabetical");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedCategories = [...categories]?.sort((a, b) => {
    if (sortOption === "alphabetical") {
      return a?.username?.localeCompare(b?.username);
    } else if (sortOption === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const sortedPaginatedCategories = sortedCategories?.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const totalPages = Math.ceil(categories?.length / itemsPerPage);

  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleEdit = async (categoryInfo) => {
    console.log("categoryInfo", categoryInfo);
    setSelectedCategory(categoryInfo);
    //   open modal here
    setOpenModal(!openModal);
  };

  const handleDelete = async (truckId) => {
    setLoadingTruckId(truckId);
    setActionType("delete");
    try {
      await axiosInstance({
        url: `api/listing/category/${truckId}`,
        method: "DELETE",
      })
        .then((res) => {
          console.log("handleDelete res", res?.data);
          setLoading(false);

          fetchTruckCategories();
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

  const editCategory = async (categoryId) => {
    setLoading(true);

    const categorydata = {
      type: truckType,
      baseFare: truckBaseFare,
      capacity: truckCapacity,
      dimension: truckDimension,
    };
    console.log("categorydata", categorydata);

    try {
      await axiosInstance({
        url: `api/listing/category/${categoryId}`,
        method: "PUT",
        data: categorydata,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("editCategory res", res?.data);
          setLoading(false);
          toast.success("Truck category updated successfully");
          closeModal();
          fetchTruckCategories();
        })
        .catch((err) => {
          console.log("editCategory err", err?.response?.data);
          setLoading(false);
          toast.error(
            "An error occured while updating category, please try again later"
          );
        });
    } catch (error) {
      console.log("createCateeditCategorygory error", error);
      setLoading(false);
      toast.error(
        "An error occured while updating category, please try again later"
      );
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
    if (selectedCategory) {
      setTruckType(selectedCategory.type || "");
      setTruckBaseFare(selectedCategory.baseFare || "");
      setTruckCapacity(selectedCategory.capacity || "");
      setTruckDimension(selectedCategory.dimension || "");
    }
  }, [selectedCategory]);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold text-gray-900">
              {tableTitle} Management
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {/* Manage and monitor user accounts and their statuses. */}
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
                "S/N",
                "Category Name",
                "Category Capacity",
                "Category Price",
                "Category Dimension",

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
            {sortedPaginatedCategories?.map((truck, i) => {
              return (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{i + 1}</div>
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
                      {formatToNaira(truck?.baseFare)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {truck?.dimension}
                    </div>
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
          totalItems={categories?.length}
          itemsPerPage={itemsPerPage}
          onPrev={prevPage}
          onNext={nextPage}
        />
      </div>

      <Modal
        title="Edit Truck Category"
        isOpen={openModal}
        onClose={closeModal}
      >
        <FormInput
          formTitle={"Category Name"}
          inputBackgroundColor="white"
          formTitleColor="black"
          inputColor="black"
          type={"text"}
          value={truckType}
          onChange={(e) => setTruckType(e.target.value)}
        />
        <FormInput
          formTitle={"Category BaseFare"}
          inputBackgroundColor="white"
          formTitleColor="black"
          inputColor="black"
          inputPlaceholder={"N2000"}
          type={"number"}
          value={truckBaseFare}
          onChange={(e) => {
            setTruckBaseFare(e.target.value);
          }}
        />
        <FormInput
          formTitle={"Category Capacity"}
          inputBackgroundColor="white"
          formTitleColor="black"
          inputColor="black"
          type={"number"}
          value={truckCapacity}
          onChange={(e) => {
            setTruckCapacity(e.target.value);
          }}
          inputPlaceholder={"20tons"}
        />
        <FormInput
          formTitle={"Category Dimension"}
          inputBackgroundColor="white"
          formTitleColor="black"
          inputColor="black"
          type={"text"}
          value={truckDimension}
          onChange={(e) => {
            setTruckDimension(e.target.value);
          }}
        />

        <FormButton
          title={"Edit Category"}
          width={"100%"}
          marginLeft={"0px"}
          onClick={() => {
            editCategory(selectedCategory?.id);
          }}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default TruckCategoriesTable;
