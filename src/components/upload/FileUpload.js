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
  fileType = "*/*",
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

  const renderPreview = () => {
    const type = selectedFile?.type;

    if (!selectedFile) return null;

    if (type?.startsWith("video/")) {
      return (
        <VideoPreview controls>
          <source src={previewUrl} type={type} />
          Your browser does not support the video tag.
        </VideoPreview>
      );
    } else if (type?.startsWith("image/")) {
      return <PreviewImage src={previewUrl} alt="Preview" />;
    } else if (type === "application/pdf") {
      return (
        <iframe
          src={previewUrl}
          title="PDF Preview"
          width="100%"
          height="400px"
          style={{ border: "1px solid #ccc", borderRadius: "8px" }}
        />
      );
    } else {
      return (
        <PreviewText>
          📄 {selectedFile.name || "Unsupported preview – file selected."}
        </PreviewText>
      );
    }
  };

  return (
    <div>
      {selectedFile ? (
        <FilePreviewContainer>
          <CancelIcon onClick={handleCancel}>
            <IoCloseSharp size={20} color="white" />
          </CancelIcon>
          {renderPreview()}
        </FilePreviewContainer>
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
