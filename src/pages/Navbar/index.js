import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  Sidebar,
  Times,
} from "./NavbarElements";
import VTBLogo from "../../assets/VTBNoBgLogo.png";
import FormButton from "../../components/form/FormButton";
import TransparentBtn from "../../components/form/TransparentBtn";

const Navbar = () => {
  const navigate = useNavigate();

  const isSmallScreen = window.innerWidth <= 768;

  const [scrollNav, setScrollNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleRegisterClick = () => {
    navigate("/register");

    isSmallScreen && toggleMenu();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
    return () => {
      window.removeEventListener("scroll", changeNav);
    };
  }, []);

  return (
    <>
      <Nav scrollNav={scrollNav}>
        {isOpen ? (
          <Times onClick={toggleMenu} />
        ) : (
          <Bars onClick={toggleMenu} />
        )}

        <Sidebar isOpen={isOpen}>
          {/* Sidebar content */}
          <img
            src={VTBLogo}
            alt="Singnify-Logo"
            style={{
              width: "100%",
              height: 65,
              objectFit: "contain",
              justifyContent: "center",
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          />

          <ul
            style={{
              listStyleType: "none",
              display: "flex",
              alignItems: "center",
              alignSelf: "center",
              flexDirection: "column",
              padding: 20,
            }}
          >
            <li
              style={{
                marginBottom: 30,
              }}
            >
              <NavLink to="/login" onClick={toggleMenu}>
                Login
              </NavLink>
            </li>
          </ul>
        </Sidebar>

        <NavMenu>
          <NavLink to="/">
            <img
              src={VTBLogo}
              alt="Singnify-Logo"
              style={{ width: 150, height: 65, objectFit: "contain" }}
            />
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavLink to="/login" color={"#fff"}>
            Login
          </NavLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
