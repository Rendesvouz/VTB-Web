import React from "react";
import { FormBtn } from "./FormElements";
import ErrorMessage from "./ErrorMessage";

function FormButton({
  title,
  onClick,
  width,
  marginLeft,
  marginTop,
  loading,
  btnIcon,
  errorMessage,
  mobileWidth,
}) {
  return (
    <div
      style={{
        marginTop: marginTop,
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        // width: "100%",
        // backgroundColor: "red",
        // width: "100%",
        // alignContent: "center",
        // alignItems: "center",
      }}
    >
      {errorMessage && (
        <ErrorMessage message={errorMessage} textAlign={"center"} />
      )}
      <FormBtn
        width={width}
        marginLeft={marginLeft}
        onClick={onClick}
        disabled={loading}
        mobileWidth={mobileWidth}
      >
        {btnIcon ? btnIcon : null}
        {loading ? "Loading ..." : title}
      </FormBtn>
    </div>
  );
}

export default FormButton;
