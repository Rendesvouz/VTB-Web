import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: ${({ scrollNav }) =>
    scrollNav ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.4)"};
  height: 85px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  padding: 20;
  z-index: 12;
  width: 100%;
  transition: background 0.3s ease-in-out;

  @media screen and (max-width: 768px) {
    height: 55px;
  }
`;

export const NavLink = styled(Link)`
  color: ${({ color }) => (color ? color : "#000")};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  font-size: 18;
  font-weight: 600;
  cursor: pointer;
  &.active {
    color: #000;
  }
`;

export const Bars = styled(FaBars)`
  // display: ${({ isOpen }) => (isOpen ? "none" : "block")};
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.4rem;
    cursor: pointer;
  }
`;

export const Times = styled(IoMdClose)`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.4rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  margin-left: 20px;

  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #808080;
  padding: 10px 22px;
  color: #000000;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;

export const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 50%;
  height: 100%;
  background-color: #fff;
  transition: left 0.3s ease;
  justify-content: center;
  padding-top: 20px;
`;
