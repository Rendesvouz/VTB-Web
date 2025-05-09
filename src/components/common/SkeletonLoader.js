import React from "react";
import styled, { keyframes } from "styled-components";

const skeletonAnimation = keyframes`
  0% {
    background-color: #333;
  }
  100% {
    background-color: #333;
  }
`;

const SkeletonElement = styled.div`
  width: 100%;
  height: 50vh;
  background-color: #333;
  animation: ${skeletonAnimation} 1s infinite alternate;
  margin-bottom: 10px; /* Adjust spacing between skeleton elements */
`;

const SkeletonLoader = () => {
  return (
    <div>
      <SkeletonElement />
    </div>
  );
};

export default SkeletonLoader;
