import React from "react";
import { TransparentFormBtn } from "./FormElements";

function TransparentBtn({
  title,
  onClick,
  width,
  marginLeft,
  color,
  marginTop,
  btnIcon,
  hoverColor,
  mobileWidth,
  loading,
  loadingTitle,
}) {
  return (
    <div style={{ marginTop: marginTop }}>
      <TransparentFormBtn
        width={width}
        marginLeft={marginLeft}
        onClick={onClick}
        color={color}
        hoverColor={hoverColor}
        mobileWidth={mobileWidth}
        disabled={loading}
      >
        {btnIcon ? btnIcon : null}
        {loading ? loadingTitle : title}
      </TransparentFormBtn>
    </div>
  );
}

export default TransparentBtn;
