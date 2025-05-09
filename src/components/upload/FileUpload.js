import React, { useRef } from "react";
import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";
import TransparentBtn from "../form/TransparentBtn";

const DottedBorderContainer = styled.div`
  border: 2px dashed #aaa;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  margin: 20px 0;
  color: white;
`;

const FilePreviewContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 2px solid #aaa;
  border-radius: 8px;
  margin: 20px 0;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin-bottom: 10px;
`;

const VideoPreview = styled.video`
  max-width: 100%;
  max-height: 300px;
  margin-bottom: 10px;
`;

const PreviewText = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

const CancelIcon = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  color: #ccc;
`;

function FileUpload({
  fileType,
  onFileUpload,
  selectedFile,
  previewUrl,
  handleFileChange,
  handleCancel,
  loading,
}) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      {selectedFile ? (
        selectedFile?.type?.startsWith("video/") ? (
          <FilePreviewContainer>
            <CancelIcon onClick={handleCancel}>
              <IoCloseSharp size={20} color="white" />
            </CancelIcon>
            <VideoPreview controls>
              <source src={previewUrl} type={selectedFile.type} />
              Your browser does not support the video tag.
            </VideoPreview>
            <PreviewText>{selectedFile.name}</PreviewText>
            <TransparentBtn
              title={"Upload Video"}
              onClick={onFileUpload}
              color={"black"}
              loading={loading}
              width={"100%"}
              loadingTitle={"Uploading ..."}
            />
          </FilePreviewContainer>
        ) : selectedFile?.type?.startsWith("image/") ? (
          <FilePreviewContainer>
            <CancelIcon onClick={handleCancel}>
              <IoCloseSharp size={20} color="white" />
            </CancelIcon>
            {previewUrl && <PreviewImage src={previewUrl} alt="Preview" />}
            <PreviewText>{selectedFile.name}</PreviewText>
            <TransparentBtn
              title={"Upload Video"}
              onClick={onFileUpload}
              loading={loading}
              color={"black"}
              width={"100%"}
              loadingTitle={"Uploading Video ..."}
            />
          </FilePreviewContainer>
        ) : (
          <DottedBorderContainer onClick={handleClick}>
            Unsupported file type
          </DottedBorderContainer>
        )
      ) : (
        <DottedBorderContainer onClick={handleClick}>
          Click here to select a file
        </DottedBorderContainer>
      )}
      <HiddenInput
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept={fileType}
      />
    </div>
  );
}

export default FileUpload;
