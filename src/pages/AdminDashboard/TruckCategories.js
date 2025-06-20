import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axiosInstance from "../../utils/api-client";
import { saveTruckCategories } from "../../redux/features/user/userSlice";

import FormButton from "../../components/form/FormButton";
import TruckCategoriesTable from "../../components/adminDashboard/TruckCategoriesTable";
import Modal from "../../components/modal/Modal";
import FormInput from "../../components/form/FormInput";
import { toast } from "react-toastify";

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

function TruckCategories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const reduxTruckCategories = state?.user?.truckCategories;
  console.log("reduxTruckCategories", reduxTruckCategories);

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [truckType, setTruckType] = useState("");
  const [truckBaseFare, setTruckBaseFare] = useState("");
  const [truckCapacity, setTruckCapacity] = useState("");
  const [truckDimension, setTruckDimension] = useState("");

  const closeModal = () => {
    setOpenModal(!openModal);
  };

  const createCategory = async () => {
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
        url: "api/listing/category",
        method: "POST",
        data: categorydata,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("createCategory res", res?.data);
          setLoading(false);
          toast.success("Truck category created successfully");
          closeModal();
          fetchTruckCategories();
        })
        .catch((err) => {
          console.log("createCategory err", err?.response?.data);
          setLoading(false);
          toast.error(
            "An error occured while creating category, please try again later"
          );
        });
    } catch (error) {
      console.log("createCategory error", error);
      setLoading(false);
      toast.error(
        "An error occured while creating category, please try again later"
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
    fetchTruckCategories();
  }, []);

  return (
    <Container>
      <div className="flex justify-between items-center 500 p-4">
        <h1 className="text-2xl font-bold text-gray-900">Truck Categories</h1>
        <FormButton
          title={"Create Category"}
          width={"100%"}
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </div>

      {reduxTruckCategories && (
        <TruckCategoriesTable
          categories={reduxTruckCategories}
          tableTitle={"Truck Categories"}
        />
      )}

      <Modal
        title="Create Truck Category"
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
          title={"Create Category"}
          width={"100%"}
          marginLeft={"0px"}
          onClick={createCategory}
          loading={loading}
        />
      </Modal>
    </Container>
  );
}

export default TruckCategories;
