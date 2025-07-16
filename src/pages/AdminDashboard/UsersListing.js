import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axiosInstance from "../../utils/api-client";

import PlatformUsersTable from "../../components/adminDashboard/PlatformUsersTable";
import { savePlatformUsers } from "../../redux/features/user/userSlice";

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

function UsersListing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const reduxPlatformUsers = state?.user?.platformUsers;
  console.log("reduxPlatformUsers", reduxPlatformUsers);

  const [loading, setLoading] = useState(false);

  const fetchAllPlatformBUsers = async () => {
    setLoading(true);
    try {
      await axiosInstance({
        url: "api/auth/all-user",
        method: "GET",
      })
        .then((res) => {
          console.log("fetchAllPlatformBUsers res", res?.data);
          setLoading(false);

          dispatch(savePlatformUsers(res?.data?.data));
        })
        .catch((err) => {
          console.log("fetchAllPlatformBUsers err", err?.response?.data);
          setLoading(false);
        });
    } catch (error) {
      console.log("fetchAllPlatformBUsers error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPlatformBUsers();
  }, []);

  return (
    <Container>
      <div className="flex justify-between items-center 500 p-4">
        <h1 className="text-2xl font-bold text-gray-900">VTB Users</h1>
      </div>

      <PlatformUsersTable props={reduxPlatformUsers} tableTitle={"VTB Users"} />
    </Container>
  );
}

export default UsersListing;
