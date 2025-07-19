import React, { useEffect, useMemo, useState } from "react";
import {
  Upload,
  Check,
  Edit2,
  Save,
  AlertCircle,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/api-client";
import {
  getUser,
  updateTruckOwnerVerififcation,
} from "../../redux/features/user/userSlice";
import { toast } from "react-toastify";

const TruckOwnerProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const loggedInUser = state?.user?.user;
  const loggedInUserVerification = loggedInUser?.User?.verification;
  const reduxVerificationUploads = state?.user?.isTruckOwnerVerified;
  console.log("loggedInUser", loggedInUser, state, reduxVerificationUploads);

  const isCompany = loggedInUser?.companyName;

  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: loggedInUser?.fullName,
    email: loggedInUser?.User?.email,
    phone: loggedInUser?.phoneNumber,
    address: loggedInUser?.address,
    bankDetails: [
      {
        bankName: "",
        bankAccountNumber: "",
      },
    ],
    businessName: "Vehicle Transport Services",
    businessRegNumber: "RC123456789",
    yearsOfOperation: "5",
  });

  const documentTypes = useMemo(() => {
    return {
      proofOfAddress: "Proof of Address",
      meansOfId:
        "Means of Identification (Driver's License, NIN, Voter's Card)",
      ...(isCompany && {
        cacRegistration: "CAC Registration Document",
      }),
    };
  }, [isCompany]);

  const [documents, setDocuments] = useState(() => {
    return Object.keys(documentTypes).reduce((acc, docType) => {
      acc[docType] = {
        file: null,
        fileUrl: null,
        uploaded: false,
        verified: false,
      };
      return acc;
    }, {});
  });

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = async (docType, file) => {
    console.log("handleFileUpload", docType, file);
    try {
      const formData = new FormData();
      formData.append("files", file);

      await axiosInstance({
        url: "api/verification/upload",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }).then((res) => {
        console.log("handleFileUpload res", res?.data);
        setLoading(false);

        const uploadedUrl = res?.data?.data;

        const updatedDocs = {
          ...documents,
          [docType]: {
            ...documents[docType],
            file,
            uploaded: true,
            fileUrl: uploadedUrl,
            verified: false,
          },
        };

        const cleanedDocsForRedux = Object.fromEntries(
          Object.entries(updatedDocs).map(([key, val]) => [
            key,
            {
              uploaded: val.uploaded,
              verified: val.verified,
              fileUrl: val.fileUrl,
            },
          ])
        );

        setDocuments(updatedDocs);
        dispatch(updateTruckOwnerVerififcation(cleanedDocsForRedux));
        setLoading(false);
        checkTruckOwnerProfile();
      });
    } catch (err) {
      console.error("handleFileUpload failed", err);
      setLoading(false);
    }
  };

  const handleVerification = async (docType, file) => {
    setLoading(true);
    const verififcationData = {
      contactInfo: {
        email: loggedInUser?.User?.email,
        phone: loggedInUser?.phoneNumber,
        address: loggedInUser?.address,
      },
    };

    try {
      await axiosInstance({
        url: "api/verification/verify",
        method: "POST",
        data: verififcationData,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log("handleVerification res", res?.data);
        handleFileUpload(docType, file);
      });
    } catch (err) {
      console.error("handleVerification failed", err);
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
      }
    } catch (error) {
      console.error("checkTruckOwnerProfile check error:", error);
    }
  };

  const getVerificationStatus = () => {
    const uploadedDocs = Object.values(documents).filter(
      (doc) => doc.uploaded
    ).length;
    const verifiedDocs = Object.values(documents).filter(
      (doc) => doc.verified
    ).length;
    return {
      uploaded: uploadedDocs,
      verified: verifiedDocs,
      total: Object.keys(documents).length,
    };
  };

  const canAccessPlatform = () => {
    return Object.values(documents).every(
      (doc) => doc.uploaded && doc.verified
    );
  };

  const status = getVerificationStatus();

  const updateTruckOwnerProfile = async () => {
    console.log("updateTruckOwnerProfile");
    setIsEditing(!isEditing);

    const editProfileData = {};

    console.log("editProfileData:", editProfileData);

    try {
      await axiosInstance({
        url: `api/profile/update-truckownerprofile`,
        method: "PUT",
        data: editProfileData,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          console.log("updateTruckOwnerProfile res", res?.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("updateTruckOwnerProfile err", err?.response);
          setLoading(false);
          toast.error(
            "An error occured while updating your profile, please try again later"
          );
        });
    } catch (error) {
      console.log("updateTruckOwnerProfile error", error?.response);
      setLoading(false);
      toast.error(
        "An error occured while updating your profile, please try again later"
      );
    }
  };

  const handleBankChange = (index, field, value) => {
    const updatedBankDetails = [...profileData?.bankDetails];
    updatedBankDetails[index][field] = value;

    setProfileData((prev) => ({
      ...prev,
      bankDetails: updatedBankDetails,
    }));
  };

  useEffect(() => {
    if (loggedInUser?.isVerified) {
      // Update the local documents state
      const verifiedDocs = Object.keys(documents).reduce((acc, doc) => {
        acc[doc] = {
          ...documents[doc],
          verified: true,
          uploaded: true,
        };
        return acc;
      }, {});

      console.log("verifiedDocs", verifiedDocs);

      setDocuments(verifiedDocs);
      dispatch(updateTruckOwnerVerififcation(verifiedDocs));
    }
  }, [loggedInUser?.isVerified]);

  useEffect(() => {
    if (reduxVerificationUploads) {
      const updatedDocs = Object.keys(documentTypes).reduce((acc, docType) => {
        const fromRedux = reduxVerificationUploads[docType];

        acc[docType] = {
          file: null,
          fileUrl: fromRedux?.fileUrl || null,
          uploaded: fromRedux?.uploaded || false,
          verified: fromRedux?.verified || false,
        };

        return acc;
      }, {});

      setDocuments(updatedDocs);
    }
  }, [reduxVerificationUploads, documentTypes]);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="mx-auto px-4 m-5">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <img
                  src={loggedInUser?.supportingDocuments?.[0]}
                  alt="TruckOwner profilepicture"
                  className="w-14 h-14 rounded-full"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profileData?.name}
                </h1>
                <p className="text-gray-600">{profileData.businessName}</p>
              </div>
            </div>
            <div className="text-right">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  canAccessPlatform()
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {canAccessPlatform() ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Verified
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Pending Verification
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {status.verified}/{status.total} documents verified
              </p>
            </div>
          </div>
        </div>

        {/* Access Status Alert */}
        {loggedInUserVerification?.verificationStatus == "pending" &&
        loggedInUserVerification?.supportingDocuments?.length ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-yellow-800">
                  Documents Submitted
                </h3>
                <p className="text-yellow-700 text-sm mt-1">
                  Thank you for submitting your documents. Your account is
                  currently under review. You will be notified once a decision
                  has been made.
                </p>
              </div>
            </div>
          </div>
        ) : (
          !canAccessPlatform() && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-medium text-yellow-800">
                    Complete Your Profile
                  </h3>
                  <p className="text-yellow-700 text-sm mt-1">
                    You need to upload and verify all required documents to
                    access the platform.
                  </p>
                </div>
              </div>
            </div>
          )
        )}

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "profile"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab("documents")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "documents"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Supporting Documents
              </button>
            </nav>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Profile Information
                </h2>
                <button
                  onClick={() => {
                    updateTruckOwnerProfile();
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <p className="text-gray-900">{profileData?.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900">{profileData?.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <p className="text-gray-900">{profileData?.phone}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.businessName}
                      onChange={(e) =>
                        handleInputChange("businessName", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.businessName}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <p className="text-gray-900">{profileData?.address}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Registration Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.businessRegNumber}
                      onChange={(e) =>
                        handleInputChange("businessRegNumber", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">
                      {profileData.businessRegNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Operation
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={profileData.yearsOfOperation}
                      onChange={(e) =>
                        handleInputChange("yearsOfOperation", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">
                      {profileData.yearsOfOperation} years
                    </p>
                  )}
                </div>

                {profileData?.bankDetails?.map((bank, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border rounded-lg bg-gray-50"
                  >
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bank Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={bank.bankName}
                          onChange={(e) =>
                            handleBankChange(index, "bankName", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{bank.bankName || "—"}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bank Account Number
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={bank.bankAccountNumber}
                          onChange={(e) =>
                            handleBankChange(
                              index,
                              "bankAccountNumber",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">
                          {bank.bankAccountNumber || "—"}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Supporting Documents
              </h2>
              <div className="space-y-4">
                {Object.entries(documents)?.map(([docType, docData]) => (
                  <div
                    key={docType}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {documentTypes[docType]}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {docData.uploaded ? "Uploaded" : "Not uploaded"} •
                            {docData.verified
                              ? " Verified"
                              : " Pending verification"}
                            <span
                              className={`w-3 h-3 rounded-full ${
                                docData.uploaded
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            ></span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-2">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              docData.uploaded ? "bg-green-500" : "bg-gray-300"
                            }`}
                          />
                          <div
                            className={`w-3 h-3 rounded-full ${
                              docData.verified ? "bg-green-500" : "bg-gray-300"
                            }`}
                          />
                        </div>
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                              loggedInUser?.User?.verification
                                ? handleFileUpload(docType, e.target.files[0])
                                : handleVerification(docType, e.target.files[0])
                            }
                            className="hidden"
                          />
                          {!docData.uploaded ? (
                            <div className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                              <Upload className="w-4 h-4 mr-1" />
                              {docData.uploaded
                                ? "Replace"
                                : loading
                                ? "Uploading"
                                : "Upload"}
                            </div>
                          ) : null}
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Instructions */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">
                  Document Requirements:
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• All documents must be clear and legible</li>
                  <li>• Accepted formats: PDF (max 5MB per file)</li>
                  <li>• Documents must be current and not expired</li>
                  <li>• Verification process takes 24-48 hours</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        {/*  <div className="text-center">
          <button
            disabled={!canAccessPlatform()}
            className={`px-8 py-3 rounded-lg font-medium text-white ${
              canAccessPlatform()
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {canAccessPlatform()
              ? "Access Platform"
              : "Complete Verification to Access Platform"}
          </button>
        </div>*/}
      </div>
    </div>
  );
};

export default TruckOwnerProfile;
