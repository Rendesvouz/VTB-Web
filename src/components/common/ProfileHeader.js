import React from "react";
import styled from "styled-components";
import { MdVerified } from "react-icons/md";
import { BsDashCircleFill } from "react-icons/bs";
import { GrStatusGood } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const ImageContainer = styled.div`
  width: 100%;
  height: 330px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 30px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 330px;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  text-align: center;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const Name = styled.h2`
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
`;

const Stats = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
`;

const VerificationContainer = styled.div`
  display: flex;
  margin-top: 0.5rem;
  justify-content: center;
  align-items: center;
  align-self: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const VerificationStatus = styled.span`
  display: flex;
  align-items: center;
  margin-right: 1.4rem;
  color: ${(props) => (props.verified ? "green" : "red")};
  font-weight: bold;
`;

const VerificationButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
`;

const ProfileHeader = ({ fullName, imgSrc, isVerified }) => {
  const navigate = useNavigate();

  return (
    <ImageContainer>
      <ProfileImage src={imgSrc} alt="Profile" />
      <InfoContainer>
        <Name>{fullName}</Name>
        <Stats></Stats>
        <VerificationContainer>
          <VerificationStatus verified={isVerified}>
            {isVerified ? (
              <>
                <MdVerified style={{ color: "green", marginRight: "5px" }} />
                Verified
              </>
            ) : (
              <>
                <BsDashCircleFill
                  style={{ color: "red", marginRight: "5px" }}
                />
                Unverified
              </>
            )}
          </VerificationStatus>
          {!isVerified && (
            <>
              <GrStatusGood style={{ color: "green", marginRight: "5px" }} />
              <VerificationButton
                onClick={() => {
                  navigate("/verification");
                }}
              >
                Click here to verify
              </VerificationButton>
            </>
          )}
        </VerificationContainer>
      </InfoContainer>
    </ImageContainer>
  );
};

export default ProfileHeader;
