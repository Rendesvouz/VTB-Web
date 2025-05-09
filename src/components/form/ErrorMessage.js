import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ErrorText = styled.p`
  color: #ff3333;
  font-weight: 500;
  margin: 5px 0;
  font-size: 14px;
  text-align: ${({ textAlign }) => textAlign};

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ErrorMessage = ({ message, textAlign }) => {
  return <ErrorText textAlign={textAlign}>{message}</ErrorText>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
