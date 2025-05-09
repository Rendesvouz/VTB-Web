import React from "react";
import styled from "styled-components";
import { MdVerified } from "react-icons/md";

const ImageContainer = styled.div`
  width: 100%;
  height: 350px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 30px;
`;

const BlurredBackground = styled.div`
  background-image: url(${(props) => props.imgSrc});
  background-size: cover;
  background-position: center;
  filter: blur(10px);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6); /* Dark overlay */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 20px;
`;

const ProfileImage = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;

const Name = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
`;

const Description = styled.p`
  margin: 10px 0;
  font-size: 1rem;
  line-height: 1.5;
  width: 70%;
`;

const VerificationContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const VerificationBadge = styled(MdVerified)`
  color: green;
  margin-left: 10px;
  font-size: 1.5rem;
`;

const ProfileHeader2 = ({ fullName, imgSrc, isVerified, description }) => {
  return (
    <ImageContainer>
      <BlurredBackground imgSrc={imgSrc} />
      <Overlay>
        <ProfileImage src={imgSrc} alt="Profile" />
        <InfoContainer>
          <Name>
            {fullName} {isVerified && <VerificationBadge />}
          </Name>
          <Description>{description}</Description>
        </InfoContainer>
      </Overlay>
    </ImageContainer>
  );
};

export default ProfileHeader2;
