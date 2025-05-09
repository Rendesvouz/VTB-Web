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

function FormInput({
  formTitle,
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
  inputBackgroundColor,
  inputColor,
}) {
  return (
    <InputContainer width={width}>
      <label
        style={{ marginBottom: "0.5rem", fontSize: "0.9rem", color: "white" }}
        htmlFor="referral-code"
      >
        {formTitle}
      </label>

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
          fontFamily: "Montserrat, sans-serif",
          backgroundColor: inputBackgroundColor
            ? inputBackgroundColor
            : "black",
          color: inputColor ? inputColor : "white",
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
            color: "gray",
          }}
        />
      ) : null}
      <ErrorMessage message={errorMessage} />
    </InputContainer>
  );
}

export default FormInput;
