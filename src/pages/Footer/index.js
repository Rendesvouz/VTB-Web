import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import VTBLogo from "../../assets/VTBNoBgLogo.png";
import FormInput from "../../components/form/FormInput";
import FormButton from "../../components/form/FormButton";
import { COLORS } from "../../themes/themes";

export const FooterContainer = styled.footer`
  background: ${COLORS.footerColor};
  padding: 40px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const FooterSection = styled.div`
  flex: 1;
  padding: 10px;
  max-width: 300px;

  @media (max-width: 768px) {
    max-width: none;
    width: 100%;
    padding: 20px 0;
  }
`;

export const Logo = styled.img`
  width: 150px;
`;

export const AppStoreBadges = styled.div`
  margin-top: 10px;

  a {
    display: inline-block;
    margin-right: 10px;
  }

  img {
    width: 135px;
  }
`;

export const FollowUs = styled.p`
  margin-top: 40px;
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 0px;

  a {
    color: #fff;
    font-size: 24px;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

export const HelpLinks = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 10px;

    a {
      color: #fff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const SubscribeForm = styled.div`
  display: flex;
  flex-direcrion: row;
  align-items: center;
  margin-top: 10px;
  width: auto;
  align-content: center;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 20px;
    flex-direction: column;
  }
`;

export const Copyright = styled.div`
  margin-top: 20px;
  text-align: center;
  width: 100%;
  color: #bbb;

  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [subscribeEmail, setSubscribeEmail] = useState("");

  const onSubscribe = () => {
    console.log("hfhhf");
    setSubscribeEmail("");
    toast?.success("Great, You have subscribed to our newsletter");
  };

  return (
    <FooterContainer>
      <FooterSection>
        <Link to={"/"}>
          <Logo src={VTBLogo} alt="SupaTunez" />
        </Link>

        <FollowUs>Follow Us</FollowUs>
        <SocialIcons>
          <a href="https://www.instagram.com/Singnify/">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://x.com/Singnify?s=08">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.facebook.com/@singnifymusic/">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.youtube.com/@Singnify">
            <i className="fab fa-youtube"></i>
          </a>
        </SocialIcons>
      </FooterSection>

      <FooterSection>
        <h3>Help</h3>
        <HelpLinks>
          <li>
            <a href="/faqs">FAQ</a>
          </li>
          <li>
            <a href="/support">Support</a>
          </li>
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms-of-service">Terms and Conditions</a>
          </li>
        </HelpLinks>
      </FooterSection>

      <FooterSection>
        <h3>Stay up to date</h3>
        <p>Stay Informed On How You Can Make a Difference</p>
        <SubscribeForm>
          <FormInput
            inputPlaceholder={"Enter your email address"}
            type={"email"}
            width={"70%"}
            multiple={false}
            value={subscribeEmail}
            onChange={(e) => {
              setSubscribeEmail(e.target.value);
            }}
            inputBackgroundColor={"black"}
            inputColor={"white"}
          />
          <FormButton
            onClick={onSubscribe}
            title={"Subscribe"}
            marginTop={-20}
            width={"70%"}
          />
        </SubscribeForm>
      </FooterSection>

      <Copyright>
        © {currentYear} Copyright. Vantruckbus, All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};
export default Footer;
