import React, { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import styled from "styled-components";
import ErrorMessage from "./ErrorMessage";

function CopyInput({
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
}) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        marginBottom: "1rem",
        width: width,
      }}
    >
      <label
        style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}
        htmlFor="referral-code"
      >
        {formTitle}
      </label>
      <input
        type={type}
        placeholder="Enter your password"
        value={value}
        onChange={onChange}
        style={{
          padding: "0.75rem",
          paddingRight: "2.5rem", // Space for the icon
          fontSize: "1rem",
          borderColor: "gray",
          borderRadius: "5px",
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
    </div>
  );
}

export default CopyInput;
