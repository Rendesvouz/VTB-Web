import React, { useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const ImagePreview = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: #f0f0f0;
  cursor: pointer;
  margin-bottom: 10px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UploadButton = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #555;
  font-size: 14px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ProfilePictureUpload = ({ profileImg, handleFileChange }) => {
  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Container>
      <ImagePreview onClick={handleClick}>
        {/* Optionally, show a preview of the uploaded image here */}
        {profileImg ? (
          <img src={profileImg} alt="Profile" />
        ) : (
          <img
            src="https://img.icons8.com/material-outlined/24/000000/upload.png"
            alt="Upload Icon"
          />
        )}
      </ImagePreview>
      <UploadButton onClick={handleClick}>
        <span style={{ color: "white" }}>Upload Picture</span>
      </UploadButton>
      <HiddenInput
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
      />
    </Container>
  );
};

export default ProfilePictureUpload;
