import styled from "styled-components";
import { COLORS } from "../../theme/theme";

export const Box = styled.div`
  padding: 5% 2.5%;
  background: ${COLORS.footerColor};
  bottom: 0;
  width: 95%;
  // position: fixed;
  height: 50%;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  // max-width: 1000px;
  margin: 0 auto;
  // background: brown;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  margin: 0 20px;
  flex: 1;
  min-width: 200px;
  // background: green;

  @media (max-width: 1000px) {
    margin: 10px 0;
  }
`;

export const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: black;
    transition: 200ms ease-in;
  }
`;

export const Heading = styled.p`
  font-size: 24px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: bold;
`;
