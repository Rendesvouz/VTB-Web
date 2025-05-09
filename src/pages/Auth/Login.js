import React, { useState } from "react";
import styled from "styled-components";
import { FaXTwitter, FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import FormInput from "../../components/form/FormInput";
import PasswordInput from "../../components/form/PasswordInput";
import FormButton from "../../components/form/FormButton";

const Container = styled.div`
  display: flex;
  height: auto;
  justify-content: center;
  align-items: center;
  background: black;
  padding-top: 130px;
  padding-bottom: 60px;
  align-content: center;

  @media screen and (max-width: 768px) {
    padding-top: 70px;
    margin-bottom: 0px;
    height: auto;
  }
`;

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    margin: 20px;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  background: url(${require("../../assets/1.jpg")}) no-repeat center center;
  background-size: cover;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1;
  width: 90%;
  height: 20%;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const FormSection = styled.div`
  flex: 1;
  padding: 2rem;
  background: black;

  @media screen and (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: white;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  // margin-bottom: 1rem;

  input {
    margin-right: 0.5rem;
  }

  label {
    font-size: 0.9rem;
  }

  @media screen and (max-width: 768px) {
    label {
      font-size: 0.8rem;
    }
  }
`;

const Link = styled.a`
  color: #05a30b;
  text-align: center;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

const ForgetPasswordLink = styled.p`
  color: grey;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    font-size: 0.8rem; /* Adjust font size for smaller screens */
  }
`;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const login = async () => {
    const form = new FormData();
    form.append("id", email);
    form.append("password", password);

    if (!password) {
      setFormError("Invalid Login details, please try again");
    } else {
      setLoading(true);
    }
  };

  return (
    <Container>
      <FormContainer>
        <ImageSection />
        <FormSection>
          <Title>Welcome</Title>

          <FormInput
            type={"email"}
            formTitle={"Email Address"}
            inputPlaceholder={"Email address"}
            multiple={false}
            inputId={"email"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFormError("");
              setEmailError("");
            }}
            errorMessage={emailError}
          />

          <PasswordInput
            formTitle={"Password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFormError("");
              setPasswordError("");
            }}
            errorMessage={passwordError}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <CheckboxGroup>
              <input type="checkbox" id="terms" />
              <label style={{ color: "grey" }} htmlFor="terms">
                Remember me
              </label>
            </CheckboxGroup>

            <ForgetPasswordLink
              onClick={() => {
                console.log("clicked");
                navigate("/forget-password");
              }}
            >
              Forget Password ?
            </ForgetPasswordLink>
          </div>

          <FormButton
            title={"Login"}
            width={"100%"}
            onClick={login}
            marginLeft={"0px"}
            loading={loading}
            errorMessage={formError}
          />
          <p
            style={{
              justifyContent: "center",
              textAlign: "center",
              color: "white",
            }}
          >
            Or continue with
          </p>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaFacebook style={{ padding: 10, fontSize: 30, color: "white" }} />
            <FaXTwitter style={{ padding: 10, fontSize: 30, color: "white" }} />
            <FcGoogle style={{ padding: 10, fontSize: 30 }} />
          </div>
          <p
            style={{
              justifyContent: "center",
              textAlign: "center",
              color: "white",
            }}
          >
            Don't have an account?{" "}
            <Link rel="stylesheet" href="/register">
              Sign Up
            </Link>
          </p>
        </FormSection>
      </FormContainer>
    </Container>
  );
}

export default Login;
