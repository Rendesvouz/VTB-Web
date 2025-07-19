import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import FormInput from "../../components/form/FormInput";
import PasswordInput from "../../components/form/PasswordInput";
import FormButton from "../../components/form/FormButton";
import { COLORS } from "../../themes/themes";
import axiosInstance from "../../utils/api-client";
import {
  getUser,
  saveAccessToken,
  saveLoginTime,
  saveRefreshToken,
  saveUserRole,
} from "../../redux/features/user/userSlice";
import { showToast } from "../../utils/toastify";
import {
  getDeviceStoreUrl,
  getDriverDeviceStoreUrl,
} from "../../Library/Common";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  min-height: 100vh;
  padding: 130px 20px 60px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 70px 10px 40px;
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
    flex-direction: column;
    box-shadow: none;
    border-radius: 0;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  background: url(${require("../../assets/truck2.png")}) no-repeat center center;
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
  height: auto;

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
  font-size: 2rem;
  margin-bottom: 2rem;
  color: white;

  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
    text-align: center;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;

  input {
    margin-right: 0.5rem;
  }

  label {
    font-size: 0.9rem;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    label {
      font-size: 0.8rem;
    }
  }
`;

const Link = styled.a`
  color: ${COLORS.vtbBtnColor};
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
    font-size: 0.8rem;
    text-align: center;
  }
`;

function Home() {
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
    const loginData = {
      identifier: email,
      password: password,
    };

    console.log("loginData", loginData);

    if (!password) {
      setFormError("Invalid Login details, please try again");
    } else {
      setLoading(true);
      try {
        await axiosInstance({
          url: "api/auth/login",
          method: "POST",
          data: loginData,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            console.log("res", res?.data);
            setLoading(false);

            if (res?.data) {
              console.log("Login data", res?.data);
              dispatch(saveUserRole(res?.data?.role));

              // save the AccessToken and RefreshToken to redux here immediately
              dispatch(saveAccessToken(res?.data?.access_token));
              dispatch(saveRefreshToken(res?.data?.refresh_token));
              dispatch(saveLoginTime(Date.now()));

              // here i am prompting the driver and users to download and install the app
              if (res?.data?.role === "User") {
                const { platform, url } = getDeviceStoreUrl();
                console.log("platform", platform, url);

                if (url) {
                  showToast(
                    `Hello, Please download the app on your ${platform} device to continue enjoying our services`
                  );

                  setTimeout(() => {
                    window.open(url, "_blank");
                  }, 2000);
                } else {
                  setFormError(
                    "Please download the app on your mobile device to continue."
                  );
                }

                return;
              } else if (res?.data?.role === "Driver") {
                const { platform, url } = getDriverDeviceStoreUrl();
                console.log("platform", platform, url);

                if (url) {
                  showToast(
                    `Hello Driver, Please download the app on your ${platform} device to continue enjoying our services`
                  );

                  setTimeout(() => {
                    window.open(url, "_blank");
                  }, 2000);
                } else {
                  setFormError(
                    "Please download the app on your mobile device to continue."
                  );
                }

                return;
              } else if (res?.data?.role == "TruckOwner") {
                checkTruckOwnerProfile(res?.data?.access_token);
              } else if (res?.data?.role == "Admin") {
                const adminUserData = {
                  User: {
                    email: "admin@vtb.com",
                    verified: true,
                    phoneNumber: "0987654231",
                    role: "Admin",
                    id: res?.data?.id,
                  },
                };
                console.log("adminUserData", adminUserData);

                dispatch(getUser(adminUserData));
              }
            } else {
              console.log("message", res?.data?.message);
              setFormError("Invalid Details, please try again later");
            }
          })
          .catch((err) => {
            console.log("Login err", err?.response);
            setFormError("Invalid Login details, please try again");

            setLoading(false);
          });
      } catch (error) {
        console.log("Login error", error);
      }
    }
  };

  const checkUserProfile = async (access_token) => {
    console.log("dfff", access_token);
    try {
      if (!access_token) {
        return;
      }

      const profileResponse = await axiosInstance({
        url: "api/profile/profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log("profdd", profileResponse?.data);

      if (profileResponse?.data) {
        dispatch(getUser(profileResponse?.data));

        if (profileResponse?.data?.User?.role == "TruckOwner") {
          navigate("/admin-dashboard");
        } else if (profileResponse?.data?.User?.role == "Admin") {
          navigate("/admin-dashboard");
        }
        showToast("Login Successful. Welcome Back! 😇", "success");
      }
    } catch (error) {
      console.error("checkUserProfile check error:", error);
    }
  };

  const checkTruckOwnerProfile = async (access_token) => {
    try {
      if (!access_token) {
        return;
      }

      const profileResponse = await axiosInstance({
        url: "api/profile/truckprofile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log("checkTruckOwnerProfile res", profileResponse?.data);
      if (profileResponse?.data?.truckownerId) {
        dispatch(getUser(profileResponse?.data));

        showToast("Login Successful. Welcome Back! 😇", "success");
      } else {
        navigate("/vehicle-owner/onboarding");
      }
    } catch (error) {
      console.error("checkTruckOwnerProfile check error:", error);
      if (error?.response?.status == 404) {
        navigate("/vehicle-owner/onboarding");
      }
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
            marginTop={20}
            disabled={loading}
          />

          <p
            style={{
              justifyContent: "center",
              textAlign: "center",
              color: "white",
              marginTop: 20,
            }}
          >
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{
                color: COLORS.vtbBtnColor,
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Register
            </span>
          </p>
        </FormSection>
      </FormContainer>
    </Container>
  );
}

export default Home;
