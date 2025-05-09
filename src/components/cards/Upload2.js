import React from "react";
import styled from "styled-components";
import { MdFileUpload } from "react-icons/md";

import TransparentBtn from "../form/TransparentBtn";

const Card = styled.div`
  border: 1px solid #333;
  border-radius: 8px;
  padding: 20px;
  flex: 1;
  margin: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

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

function Upload2({ title, description, formats, uploadBtnTitle, handleClick }) {
  return (
    <Card onClick={handleClick}>
      <Title>{title}</Title>
      <UploadArea>
        <UploadText>Supported formats: {formats}</UploadText>
      </UploadArea>
      <DescriptionText>{description}</DescriptionText>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        <TransparentBtn
          title={uploadBtnTitle}
          onClick={handleClick}
          width={"100%"}
          marginLeft={"0px"}
          color={"black"}
          marginTop={10}
          btnIcon={
            <MdFileUpload
              style={{ color: "white", marginRight: 7, fontSize: 16 }}
            />
          }
        />
      </div>
    </Card>
  );
}

export default Upload2;
