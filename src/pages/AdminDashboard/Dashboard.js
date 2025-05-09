import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import DashboardCards from "../../components/cards/DashboardCards";
import FinancialCharts from "../../components/adminDashboard/FinancialCharts";
import MetricTable from "../../components/adminDashboard/MetricTable";

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

  const users = [
    { id: 1, name: "Alice Johnson", age: 28 },
    { id: 2, name: "Bob Smith", age: 34 },
    { id: 3, name: "Charlie Lee", age: 22 },
    { id: 4, name: "Dana Kim", age: 40 },
    { id: 5, name: "Evan Wright", age: 31 },
  ];

  return (
    <Container>
      <DashboardCards vehicles={[]} bookings={[]} />

      {/* Chart */}
      <FinancialCharts financialData={financialData} />

      {/* Bookings Table */}
      <MetricTable users={users} tableTitle={"Truck Bookings"} />
    </Container>
  );
}

export default Dashboard;
