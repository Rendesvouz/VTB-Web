import React from "react";
import styled from "styled-components";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const Container = styled.div`
  display: flex;
  //   background: black;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const HeaderTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: white;
`;

const IconsSection = styled.div`
  display: flex;
  flex-direction: row;
  //   background: green;
  align-items: center;
`;

const ArrowBack = styled(IoIosArrowRoundBack)`
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

const ArrowForward = styled(IoIosArrowRoundForward)`
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

function ProfileInfoTitle({ title, onLeftArrowClick, onRightArrowClick }) {
  return (
    <Container>
      <HeaderTitle>{title}</HeaderTitle>
      <IconsSection>
        <ArrowBack onClick={onLeftArrowClick} />
        <ArrowForward onClick={onRightArrowClick} />
      </IconsSection>
    </Container>
  );
}

export default ProfileInfoTitle;
