import React from "react";
import styled from "styled-components";
import SingnifyLogo from "../../assets/NoBgSingnifyLogo.png";

const ImageContainer = styled.div`
  width: 100%;
  height: 330px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 30px;
`;

const Gif = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: black;
`;

const GifLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: black;
`;

const TitleOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent) no-repeat
    center center;
  color: white;
  text-align: center;
  padding: 1rem;
  font-size: 2.5rem;
  font-weight: 700;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

function HeaderTitle({ title, imgSrc, imgAlt }) {
  return (
    <ImageContainer>
      {imgSrc ? (
        <Gif src={imgSrc} alt={imgAlt} />
      ) : (
        <GifLogo src={require("../../assets/supatunezNoBg.png")} alt={imgAlt} />
      )}

      <TitleOverlay>{title}</TitleOverlay>
    </ImageContainer>
  );
}

export default HeaderTitle;
