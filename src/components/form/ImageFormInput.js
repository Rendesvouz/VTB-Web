import React from "react";
import { IoCopyOutline } from "react-icons/io5";
import styled from "styled-components";
import ErrorMessage from "./ErrorMessage";

const InputContainer = styled.div`
  width: ${({ width }) => width};
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const FormImageContainer = styled.img`
  width: 20%;
  height: 40px;
  margin-bottom: 0.5rem;
  background: ${(props) =>
    `url(${
      props.backgroundImage
        ? props.backgroundImage
        : require("../../assets/supatunezLogo.jpeg")
    }) no-repeat center center`};

  background-size: cover;

  @media screen and (max-width: 768px) {
    width: 45%;
    height: 30px;
  }
`;

function ImageFormInput({
  formImage,
  inputPlaceholder,
  value,
  onChange,
  inputId,
  multiple,
  width,
  type,
  errorMessage,
  copyIcon,
  onCopyIconClick,
}) {
  return (
    <InputContainer width={width}>
      <FormImageContainer backgroundImage={formImage} />

      <input
        type={type}
        id={inputId}
        placeholder={inputPlaceholder}
        value={value}
        onChange={onChange}
        multiple={multiple}
        style={{
          padding: "0.75rem",
          borderRadius: 5,
          fontSize: "1rem",
          border: "1px solid grey",
          backgroundColor: "black",
          color: "white",
        }}
      />
      {copyIcon ? (
        <IoCopyOutline
          onClick={onCopyIconClick}
          style={{
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "#ccc",
          }}
        />
      ) : null}
      <ErrorMessage message={errorMessage} />
    </InputContainer>
  );
}

export default ImageFormInput;
