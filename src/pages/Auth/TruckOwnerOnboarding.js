import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Stepper } from "@mui/material";
import { MdFileUpload } from "react-icons/md";

import TransparentBtn from "../../components/form/TransparentBtn";
import FormSelect from "../../components/form/FormSelect";
import FormInput from "../../components/form/FormInput";
import FormButton from "../../components/form/FormButton";
import FormTextArea from "../../components/form/FormTextArea";
import UploadSection from "../../components/upload/UploadSection";
import axiosInstance from "../../utils/api-client";
import FileUpload from "../../components/upload/FileUpload";
import FileUpload2 from "../../components/upload/FileUpload2";
import { getUser } from "../../redux/features/user/userSlice";
import { showToast } from "../../utils/toastify";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: 40px;
  flex-wrap: wrap;
  //   background: black;
  padding-top: 120px;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    // background: red;
    flex-direction: column;
  }
`;

const RowContent = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10;
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Subtitle = styled.p`
  margin-bottom: 1rem;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  color: black;
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadContainer = styled.div`
  // // max-width: 1200px;
  // // margin: auto;
  // // padding: 2rem;
  // // background: green;
  // justify-content: center;
  // align-items: stretch;
  // padding: 40px;
  // flex-wrap: wrap;
  // // width: 80%;

  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const formSelectOptions = [
  {
    id: 1,
    name: "Individual",
  },
  {
    id: 2,
    name: "Company / Fleet Operator",
  },
];

const rules1 = [
  "TIF or JPG format",
  "Square (width and height must be the same)",
  "Minimum Size: 3000 by 3000 pixels",
  "Maximum Size: 5000 by 5000 pixels",
  "300 DPI in RGB format",
  "Any song uploaded without design artwork, (song titles and artist name) will not be approved",
  "No Social media logos or handles",
  "No Brand logos",
  "Any text except for artist names and/or the name of the release will be rejected",
];

const rules2 = [
  "Audio files must be 16-bit, 44.1 kHz MP3 files of good quality. If you do not follow these rules, your release will be rejected.",
  "By uploading your songs or albums on SupaTunes, you can not request for takedown within 6 months of upload, or a payment of $12 will be charge for takedown, if your upload is not up to 6 months SupaTunes uses audio Fingerprint, to collectively protect our artist content.",
  "I have read the Terms of Use which includes Distribution, Publishing and Licensing Agreements. I understand that my choice to select this box gives SupaTunes, at their sole discretion, exclusive rights to Distribute, Publish and License my songs and videos worldwide.",
];

const videoRecordRules = [
  "Video files must be H.264 video and AAC audio codec and of good quality. If you do not follow these rules, your release will be rejected.",
];

function TruckOwnerOnboarding() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const user = state?.user?.user;

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const step1Check = () => {
    let isValid = true;

    if (!truckOwnerChoice) {
      setTruckOwnerChoiceError("Please select registration type");
      isValid = false;
    }

    if (!fullName.trim()) {
      setFullNameError("Full name is required");
      isValid = false;
    }

    if (!phoneNumber.trim()) {
      setPhoneNumberError("Phone number is required");
      isValid = false;
    }

    if (!address.trim()) {
      setAddressError("Address is required");
      isValid = false;
    }

    if (!emergencyContactName.trim()) {
      setEmergencyContactNameError("Emergency contact name is required");
      isValid = false;
    }

    if (!emergencyContactPhone.trim()) {
      setEmergencyContactPhoneError("Emergency contact phone is required");
      isValid = false;
    }

    if (truckOwnerChoice === "Company / Fleet Operator") {
      if (!companyName.trim()) {
        setCompanyNameError("Company name is required");
        isValid = false;
      }

      if (!companyRegistrationNumber.trim()) {
        setCompanyRegistrationNumberError(
          "Company registration number is required"
        );
        isValid = false;
      }

      if (!companyPhoneNumber.trim()) {
        setCompanyPhoneNumberError("Company phone number is required");
        isValid = false;
      }

      if (!companyEmail.trim()) {
        setCompanyEmailError("Company email is required");
        isValid = false;
      }

      if (!companyAddress.trim()) {
        setCompanyAddressError("Company address is required");
        isValid = false;
      }
    }

    if (isValid) {
      handleNext();
    } else {
      setFormError("Please fill in all required fields.");
    }
  };

  const step2Check = () => {
    handleNext();
  };

  const [loading, setLoading] = useState(false);

  const [truckOwnerChoice, setTruckOwnerChoice] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [emergencyContactRelation, setEmergencyContactRelation] = useState("");

  // company states
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyRegistrationNumber, setCompanyRegistrationNumber] =
    useState("");

  // files upload
  const [companyLicense, setCompanyLicense] = useState(null);
  const [registrationCAC, setRegistrationCAC] = useState(null);
  const [certificateOfIncorp, setCertificateOfIncorp] = useState(null);
  const [proofOfAddress, setProofOfAddress] = useState(null);

  const allDocsUploaded =
    companyLicense && registrationCAC && certificateOfIncorp && proofOfAddress;

  // Error states
  const [formError, setFormError] = useState("");
  const [truckOwnerChoiceError, setTruckOwnerChoiceError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [addressError, setAddressError] = useState("");

  const [emergencyContactNameError, setEmergencyContactNameError] =
    useState("");
  const [emergencyContactPhoneError, setEmergencyContactPhoneError] =
    useState("");
  const [emergencyContactRelationError, setEmergencyContactRelationError] =
    useState("");

  const [companyNameError, setCompanyNameError] = useState("");
  const [companyEmailError, setCompanyEmailError] = useState("");
  const [companyPhoneNumberError, setCompanyPhoneNumberError] = useState("");
  const [companyAddressError, setCompanyAddressError] = useState("");
  const [companyRegistrationNumberError, setCompanyRegistrationNumberError] =
    useState("");

  const handleUploadingChoiceChange = (event) => {
    setTruckOwnerChoice(event.target.value);
    setTruckOwnerChoiceError("");
    setFormError("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("file", file);
    setProfilePicture(file);
  };

  const handleProofOfAddressChange = (event) => {
    const file = event.target.files[0];
    console.log("file", file);
    setProofOfAddress(file);
  };

  const completeTruckOwnerOnboarding = async () => {
    console.log("completeTruckOwnerOnboarding");
    setLoading(true);

    const formData = new FormData();

    formData.append("fullName", fullName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);
    formData.append("emergencyContact", {
      fullName: emergencyContactName,
      phoneNumber: emergencyContactPhone,
      relationship: emergencyContactRelation,
    });
    formData.append("companyEmail", companyEmail);
    formData.append("companyName", companyName);
    formData.append("companyAddress", companyAddress);
    formData.append("companyPhoneNumber", companyPhoneNumber);
    formData.append("companyRegistrationNumber", companyRegistrationNumber);
    formData.append("licenseNumber", "");
    formData.append("supportingDocuments", profilePicture);

    console.log("formData", formData);

    try {
      await axiosInstance({
        url: "api/profile/truckowner-profile",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }).then((res) => {
        console.log("completeTruckOwnerOnboarding res", res?.data);
        checkTruckOwnerProfile();
      });
    } catch (error) {
      console.log("completeTruckOwnerOnboarding error", error?.response);
      setLoading(false);
    }
  };

  const checkTruckOwnerProfile = async () => {
    try {
      const profileResponse = await axiosInstance({
        url: "api/profile/truckprofile",
        method: "GET",
      });

      console.log("checkTruckOwnerProfile res", profileResponse?.data);
      if (profileResponse?.data?.truckownerId) {
        dispatch(getUser(profileResponse?.data));

        showToast("Yayyyy. Your Profile is all set now 😇", "success");
        setLoading(false);

        navigate("/vehicle-owner/dashboard");
      }
    } catch (error) {
      console.error("checkTruckOwnerProfile check error:", error);
    }
  };

  const uploadDocuments = async () => {
    console.log("uploadDocuments", proofOfAddress);

    const formData = new FormData();

    formData.append("files", proofOfAddress);

    try {
      await axiosInstance({
        url: "api/verification/upload",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }).then((res) => {
        console.log("uploadDocuments res", res?.data);
      });
    } catch (error) {
      console.log("uploadDocuments error", error);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel></Stepper>
      <div>
        {activeStep === 0 && (
          <Container>
            <FormSelect
              formTitle={
                "Are you registering as an individual truck owner or a company?"
              }
              options={formSelectOptions}
              selectId={"uploadingChoice"}
              selectPlaceholder={"Select Option"}
              width={"100%"}
              onChange={handleUploadingChoiceChange}
              errorMessage={truckOwnerChoiceError}
              inputBackgroundColor={"white"}
            />

            <RowContent>
              <FormInput
                formTitle={"FullName"}
                inputId={"fullname"}
                inputPlaceholder={"FullName"}
                type={"text"}
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setFormError("");
                  setFullNameError("");
                }}
                width={"48%"}
                inputBackgroundColor={"white"}
                inputColor={"black"}
                formTitleColor={"black"}
                errorMessage={fullNameError}
              />

              <FormInput
                formTitle={"Phone Number"}
                inputId={"phoneNumber"}
                inputPlaceholder={"Phone Number"}
                type={"number"}
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setFormError("");
                  setPhoneNumberError("");
                }}
                width={"48%"}
                inputBackgroundColor={"white"}
                errorMessage={phoneNumberError}
                inputColor={"black"}
                formTitleColor={"black"}
              />
            </RowContent>

            <FormTextArea
              formTitle={"Address"}
              row={5}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setFormError("");
                setAddressError("");
              }}
              placeholder={""}
              width={"100%"}
              maxLength={100}
              inputBackgroundColor={"white"}
              borderColor="black"
              inputColor={"black"}
              errorMessage={addressError}
            />

            <RowContent>
              <FormInput
                formTitle={"Emergency Contact FullName"}
                inputId={"emegency-fullname"}
                inputPlaceholder={"Emergency Contact FullName"}
                type={"text"}
                value={emergencyContactName}
                onChange={(e) => {
                  setEmergencyContactName(e.target.value);
                  setFormError("");
                  setEmergencyContactNameError("");
                }}
                width={"48%"}
                errorMessage={emergencyContactNameError}
                inputBackgroundColor={"white"}
                inputColor={"black"}
                formTitleColor={"black"}
              />

              <FormInput
                formTitle={"Emergency Contact Phone Number"}
                inputId={"emergency-phoneNumber"}
                inputPlaceholder={"Emergency Contact Phone Number"}
                type={"number"}
                value={emergencyContactPhone}
                onChange={(e) => {
                  setEmergencyContactPhone(e.target.value);
                  setFormError("");
                  setEmergencyContactPhoneError("");
                }}
                width={"48%"}
                errorMessage={emergencyContactPhoneError}
                inputBackgroundColor={"white"}
                inputColor={"black"}
                formTitleColor={"black"}
              />
            </RowContent>

            {/* Section when applying as a comapny */}
            {truckOwnerChoice === "Company / Fleet Operator" && (
              <>
                <Subtitle>
                  Kindly fill in the information of the company you are for
                </Subtitle>
                <RowContent>
                  <FormInput
                    formTitle={"Company Name"}
                    inputId={"company-name"}
                    inputPlaceholder={"Company Name"}
                    type={"text"}
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      setFormError("");
                      setCompanyNameError("");
                    }}
                    errorMessage={companyNameError}
                    width={"48%"}
                    inputBackgroundColor={"white"}
                    inputColor={"black"}
                    formTitleColor={"black"}
                  />

                  <FormInput
                    formTitle={"Company Reg. Number"}
                    inputId={"cac-number"}
                    inputPlaceholder={"Company Reg. Number"}
                    type={"number"}
                    value={companyRegistrationNumber}
                    onChange={(e) => {
                      setCompanyRegistrationNumber(e.target.value);
                      setFormError("");
                      setCompanyRegistrationNumberError("");
                    }}
                    errorMessage={companyRegistrationNumberError}
                    width={"48%"}
                    inputBackgroundColor={"white"}
                    inputColor={"black"}
                    formTitleColor={"black"}
                  />
                </RowContent>

                <RowContent>
                  <FormInput
                    formTitle={"Company's Phone Number"}
                    inputId={"company-phoneNumber"}
                    inputPlaceholder={"Company Phone Number"}
                    type={"number"}
                    value={companyPhoneNumber}
                    onChange={(e) => {
                      setCompanyPhoneNumber(e.target.value);
                      setFormError("");
                      setCompanyPhoneNumberError("");
                    }}
                    errorMessage={companyPhoneNumberError}
                    width={"48%"}
                    inputBackgroundColor={"white"}
                    inputColor={"black"}
                    formTitleColor={"black"}
                  />

                  <FormInput
                    formTitle={"Company Email"}
                    inputId={"company-email"}
                    inputPlaceholder={"Company Email"}
                    type={"email"}
                    value={companyEmail}
                    onChange={(e) => {
                      setCompanyEmail(e.target.value);
                      setFormError("");
                      setCompanyEmailError("");
                    }}
                    errorMessage={companyEmailError}
                    width={"48%"}
                    inputBackgroundColor={"white"}
                    inputColor={"black"}
                    formTitleColor={"black"}
                  />
                </RowContent>

                <FormTextArea
                  formTitle={"Company Address"}
                  row={5}
                  value={companyAddress}
                  onChange={(e) => {
                    setCompanyAddress(e.target.value);
                    setFormError("");
                    setCompanyAddressError("");
                  }}
                  placeholder={""}
                  width={"100%"}
                  maxLength={100}
                  errorMessage={companyAddressError}
                  inputBackgroundColor={"white"}
                  inputColor={"black"}
                  formTitleColor={"black"}
                />
              </>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                marginTop: 20,
              }}
            >
              <FormButton title={"Next"} onClick={step1Check} />
            </div>
          </Container>
        )}

        {activeStep === 1 && (
          <Container>
            <FileUpload2
              uploadTitle="Profile Picture *"
              selectedFile={profilePicture}
              handleFileChange={handleFileChange}
              handleCancel={() => setProfilePicture(null)}
            />

            <hr />
            <div
              style={{
                display: "flex",
                width: "80%",
                marginTop: 40,
                marginBottom: 20,
                padding: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TransparentBtn
                title={"Previous"}
                color={"black"}
                onClick={handleBack}
              />

              <FormButton
                title={"Submit"}
                width={"225px"}
                marginLeft={"0px"}
                onClick={() => {
                  completeTruckOwnerOnboarding();
                }}
                loading={loading}
                errorMessage={formError}
              />
            </div>
          </Container>
        )}
      </div>
    </div>
  );
}

export default TruckOwnerOnboarding;
