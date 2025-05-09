import React, { useRef } from "react";
import styled from "styled-components";
import { MdFileUpload } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

import TransparentBtn from "../form/TransparentBtn";
import ErrorMessage from "../form/ErrorMessage";

const Card = styled.div`
  border: 1px solid #333;
  border-radius: 8px;
  padding: 20px;
  flex: 1;
  margin: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: black;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Title = styled.h2`
  color: #05a30b;
  font-size: 24px;
  margin-bottom: 20px;
`;

const UploadArea = styled.div`
  border: 2px dashed #333;
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #000;
`;

const UploadText = styled.p`
  margin: 0;
  color: #fff;
`;

const UploadIcon = styled(MdFileUpload)`
  margin-right: 8px;
`;

const DescriptionText = styled.p`
  text-align: center;
`;

const DottedBorderContainer = styled.div`
  border: 2px dashed #aaa;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  margin: 20px 0;
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

const AudioPreview = styled.audio`
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
  color: #aaa;
  background: white;
`;

const UploadCard = ({
  title,
  description,
  formats,
  uploadBtnTitle,

  selectedFile,
  handleCancel,
  previewUrl,
  onFileUpload,
  loading,
  handleFileChange,
  fileType,
  isFileUploaded,
  UploadedText,
  uploadPercentage,
  fileUploadErrorMessage,
}) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Drag and drop handlers
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      // Call handleFileChange to process the files
      handleFileChange({ target: { files } });
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Card>
      <Title>{title}</Title>
      {selectedFile ? (
        selectedFile?.type?.startsWith("video/") ? (
          <FilePreviewContainer>
            <CancelIcon onClick={handleCancel}>
              <IoCloseSharp size={20} color="black" />
            </CancelIcon>
            <VideoPreview controls>
              <source src={previewUrl} type={selectedFile.type} />
              Your browser does not support the video tag.
            </VideoPreview>
            <PreviewText>{selectedFile.name}</PreviewText>
          </FilePreviewContainer>
        ) : selectedFile?.type?.startsWith("image/") ? (
          <FilePreviewContainer>
            <CancelIcon onClick={handleCancel}>
              <IoCloseSharp size={20} color="black" />
            </CancelIcon>
            {previewUrl && <PreviewImage src={previewUrl} alt="Preview" />}
            <PreviewText>{selectedFile.name}</PreviewText>
          </FilePreviewContainer>
        ) : selectedFile?.type?.startsWith("audio/") ? (
          <FilePreviewContainer>
            <CancelIcon onClick={handleCancel}>
              <IoCloseSharp size={20} color="black" />
            </CancelIcon>
            <AudioPreview controls>
              <source src={previewUrl} type={selectedFile.type} />
              Your browser does not support the audio tag.
            </AudioPreview>
            <PreviewText>{selectedFile.name}</PreviewText>
          </FilePreviewContainer>
        ) : selectedFile?.type == "application/pdf" ? (
          <FilePreviewContainer>
            <CancelIcon onClick={handleCancel}>
              <IoCloseSharp size={20} color="black" />
            </CancelIcon>
            {selectedFile && <embed src={selectedFile} alt="Preview" />}
            <PreviewText>{selectedFile?.name}</PreviewText>
          </FilePreviewContainer>
        ) : (
          <DottedBorderContainer onClick={handleClick}>
            Unsupported file type
          </DottedBorderContainer>
        )
      ) : (
        <UploadArea
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        >
          <UploadIcon style={{ fontSize: 48, color: "#05a30b" }} />
          <UploadText>
            Drag & drop files or{" "}
            <a href="#," style={{ color: "#05a30b" }}>
              Browse
            </a>
          </UploadText>
          <UploadText>Maximum file size should be 100mb</UploadText>
        </UploadArea>
      )}
      <DescriptionText>{description}</DescriptionText>

      <div
        style={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        {fileUploadErrorMessage && (
          <ErrorMessage message={fileUploadErrorMessage} textAlign={"center"} />
        )}

        {!isFileUploaded ? (
          <TransparentBtn
            onClick={onFileUpload}
            loading={loading}
            width={"100%"}
            loadingTitle={`Uploading ${uploadPercentage}%...`}
            title={uploadBtnTitle}
            marginLeft={"0px"}
            color={"black"}
            marginTop={10}
            btnIcon={
              <MdFileUpload
                style={{ color: "white", marginRight: 7, fontSize: 16 }}
              />
            }
          />
        ) : (
          <p>{UploadedText}</p>
        )}
      </div>

      <HiddenInput
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept={fileType}
      />
    </Card>
  );
};

export default UploadCard;
