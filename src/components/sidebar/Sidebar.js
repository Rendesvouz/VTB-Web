import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineMenu } from "react-icons/ai";
import * as AiIcons from "react-icons/ai";
import { SidebarData, TruckOwnerSidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut } from "../../redux/features/user/userSlice";
import VTBLogo from "../../assets/VTBNoBgLogo.png";
import { COLORS } from "../../themes/themes";

const Nav = styled.div`
  background: #0b0b0b;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 999;
  width: 100%;
  margin-top: 0px;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: rgba(0, 0, 0, 0.6);
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
  overflow-y: auto;
  max-height: 100vh;

  /* Hide scrollbar */
  overflow-y: auto; /* This allows scrolling but hides the scrollbar */

  /* Hide scrollbar for Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge, and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const SidebarLink = styled(Link)`
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 20px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #000;
    border-left: 4px solid ${COLORS.vtbBtnColor};
    cursor: pointer;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  list-style: none;
  height: 20px;
  text-decoration: none;
  font-size: 13px;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
    border-bottom: 2px solid green;
  }

  @media screen and (min-width: 2000px) {
    font-size: 18px;
    padding: 20px;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const HamburgerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: 10px;
`;

const HamburgerMenu = ({ toggleSidebar, sidebar }) => (
  <div onClick={toggleSidebar} style={{ cursor: "pointer" }}>
    {sidebar ? (
      <AiIcons.AiOutlineClose size={30} color="white" />
    ) : (
      <AiOutlineMenu size={30} color="white" />
    )}
  </div>
);

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const loggedInUser = state?.user?.user;

  function logout() {
    dispatch(signOut());
    navigate("/");
  }

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the sidebar and if the sidebar is open
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebar(false); // Close sidebar
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebar]);

  return (
    <>
      <IconContext.Provider value={{ color: "#000" }}>
        <Nav>
          <NavIcon to="#">
            <img
              src={VTBLogo}
              alt="VTB-Logo"
              style={{
                width: "100%",
                height: 65,
                objectFit: "contain",
                justifyContent: "center",
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                alignSelf: "center",
                marginRight: 30,
              }}
            />
          </NavIcon>

          <div
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // backgroundColor: "red",
              display: "flex",
              width: "90%",
              alignContent: "center",
              alignItems: "center",
              paddingRight: 10,
            }}
          >
            <HamburgerContainer>
              <HamburgerMenu toggleSidebar={showSidebar} sidebar={sidebar} />
            </HamburgerContainer>
          </div>
        </Nav>
        <SidebarNav sidebar={sidebar} ref={sidebarRef}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose
                style={{ color: "white" }}
                onClick={showSidebar}
              />
            </NavIcon>

            {loggedInUser?.User?.role === "TruckOwner"
              ? TruckOwnerSidebarData?.map((item, index) => {
                  return (
                    <SubMenu
                      item={item}
                      key={index}
                      closeSidebar={showSidebar}
                    />
                  );
                })
              : SidebarData?.map((item, index) => {
                  return (
                    <SubMenu
                      item={item}
                      key={index}
                      closeSidebar={showSidebar}
                    />
                  );
                })}
            <SidebarLink to={"/"} onClick={logout}>
              <div
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  // alignSelf: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <RiLogoutBoxLine style={{ color: "white" }} />
                <SidebarLabel>Log Out</SidebarLabel>
              </div>
            </SidebarLink>
            <div
              style={{ marginTop: 50, minHeight: 50, marginBottom: 100 }}
            ></div>
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
