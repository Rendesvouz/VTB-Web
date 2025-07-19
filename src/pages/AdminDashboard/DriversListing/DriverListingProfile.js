import React, { useState } from "react";
import {
  User,
  FileText,
  Shield,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Download,
  Eye,
  Ban,
  X,
  AlertCircle,
  Truck,
  RefreshCcw,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  formatDate,
  getTimeActive,
  getYearsActive,
} from "../../../Library/Common";
import { getStatusButtonProps } from "../../../Library/Precedence";
import {
  saveDriversListings,
  saveTruckOwnersListings,
} from "../../../redux/features/user/userSlice";
import axiosInstance from "../../../utils/api-client";

const DriverListingProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfle = state?.user?.user;
  const isTruckOwner = userProfle?.User?.role == "TruckOwner";

  const reduxSelectedDriver = state?.user?.selectedDriver;
  console.log("reduxSelectedDriver", reduxSelectedDriver);

  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [accountStatus, setAccountStatus] = useState("pending");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [actionType, setActionType] = useState("");

  const uploadedDocuments =
    reduxSelectedDriver?.User?.verification?.supportingDocuments;

  const { label, nextStatus, bgColor, hoverColor, Icon } = getStatusButtonProps(
    reduxSelectedDriver?.User?.verification?.verificationStatus,
    Ban,
    CheckCircle,
    Clock,
    RefreshCcw,
    Loader2
  );

  const generatePreviewUrl = (doc) => {
    const base64 = doc?.buffer;
    const mimeType = doc?.mimetype;
    return `data:${mimeType};base64,${base64}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "rejected":
        return "text-red-600 bg-red-100";
      case "suspended":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "rejected":
        return <X className="w-4 h-4" />;
      case "suspended":
        return <Ban className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleStatusChange = async () => {
    const currentStatus =
      reduxSelectedDriver?.User?.verification?.verificationStatus || "rejected";

    let newStatus = currentStatus;
    let action = "";

    // Decide action and target status
    if (currentStatus === "pending" || currentStatus === "rejected") {
      newStatus = "verified";
      action = "activate";
    } else if (currentStatus === "verified") {
      newStatus = "rejected";
      action = "suspend";
    }

    setActionType(action);
    console.log("newStatus", newStatus);
    setLoading(true);
    try {
      const res = await axiosInstance({
        url: `api/verification/status/${reduxSelectedDriver?.driverId}`,
        method: "PUT",
        data: {
          verificationStatus: newStatus,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("handleSuspend res", res?.data);

      fetchDriversListingsWithTruckInfo();
    } catch (err) {
      console.log("handleSuspend err", err?.response?.data);
      setLoading(false);
    } finally {
      setActionType(null);
      setLoading(false);
    }
  };

  const fetchDriversListingsWithTruckInfo = async () => {
    setLoading(true);
    try {
      const [driversRes, trucksRes] = await Promise.all([
        axiosInstance.get("api/profile/all-driverprofile"),
        axiosInstance.get("api/listings/all-offerings"),
      ]);

      const drivers = driversRes?.data?.data || [];
      const trucks = trucksRes?.data?.data || [];
      console.log("fetchDriversListingsWithTruckInfo", drivers, trucks);

      // Fetch truck owner profiles for each truck
      const enrichedTrucks = await Promise.all(
        trucks?.map(async (truck) => {
          try {
            const ownerRes = await axiosInstance.get(
              `api/profile/truckprofiles/${truck?.truckOwnerId}`
            );
            console.log("ownerRes", ownerRes?.data);
            return {
              ...truck,
              truckOwnerProfile: ownerRes?.data || null,
            };
          } catch (err) {
            console.error(`Failed to fetch owner for truck ${truck?.id}`, err);
            return {
              ...truck,
              truckOwnerProfile: null,
            };
          }
        })
      );

      // Build a map of driverId -> truck info
      const driverToTruckMap = {};
      enrichedTrucks?.forEach((truck) => {
        if (truck?.driverId) {
          driverToTruckMap[truck?.driverId] = truck;
        }
      });

      // Append assigned truck info to each driver
      const enrichedDrivers = drivers?.map((driver) => ({
        ...driver,
        assignedTruck: driverToTruckMap[driver?.driverId] || null,
      }));

      dispatch(saveDriversListings(enrichedDrivers));
      setLoading(false);
      navigate(-1);

      console.log("Enriched Drivers with Truck Info", enrichedDrivers);
    } catch (error) {
      console.log("Error fetching drivers or truck listings:", error);
      setLoading(false);
    }
  };

  const confirmStatusChange = () => {
    setAccountStatus(actionType);
    setShowStatusModal(false);
    // Here you would typically make an API call to update the status
    console.log(`Account status changed to: ${actionType}`);
  };

  const DocumentPreview = ({ document }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="text-lg font-semibold">{document.name}</h3>
            <p className="text-gray-600 text-sm">{document.description}</p>
          </div>
          <button
            onClick={() => setSelectedDocument(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 overflow-auto max-h-[calc(90vh-120px)]">
          <div className="text-center">
            <img
              src={document.preview}
              alt={document.name}
              className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
            />
            <div className="mt-4 flex justify-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download className="w-4 h-4" />
                Download
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <CheckCircle className="w-4 h-4" />
                Verify
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                <X className="w-4 h-4" />
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const StatusModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">
          {actionType === "verified"
            ? "Verify Account"
            : actionType === "suspended"
            ? "Suspend Account"
            : "Update Account Status"}
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to{" "}
          {actionType === "verified" ? "verify" : "suspend"} this truck owner's
          account?
        </p>
        <div className="flex gap-4">
          <button
            onClick={confirmStatusChange}
            className={`flex-1 py-2 px-4 rounded-lg text-white font-medium ${
              actionType === "verified"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Confirm
          </button>
          <button
            onClick={() => setShowStatusModal(false)}
            className="flex-1 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={reduxSelectedDriver?.profilePicture}
                alt={reduxSelectedDriver?.fullName}
                className="w-16 h-16 rounded-full object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {reduxSelectedDriver?.fullName}
                </h1>
                <p className="text-gray-600">{""}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(
                      reduxSelectedDriver?.User?.verification
                        ?.verificationStatus
                    )}`}
                  >
                    {getStatusIcon(
                      reduxSelectedDriver?.User?.verification
                        ?.verificationStatus
                    )}
                    {reduxSelectedDriver?.User?.verification?.verificationStatus
                      .charAt(0)
                      .toUpperCase() +
                      reduxSelectedDriver?.User?.verification?.verificationStatus.slice(
                        1
                      )}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              {!isTruckOwner && (
                <button
                  onClick={() => handleStatusChange(nextStatus)}
                  disabled={loading}
                  className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg ${bgColor} ${hoverColor}`}
                >
                  <Icon className="w-4 h-4" />
                  {loading ? "Loading" : label}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Assigned Vehicles</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reduxSelectedDriver?.assignedTrucks?.length || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Jobs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reduxSelectedDriver?.completedJobs || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reduxSelectedDriver?.rating || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Years Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getTimeActive(reduxSelectedDriver?.createdAt)}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("documents")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "documents"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Documents
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">
                          {reduxSelectedDriver?.fullName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">
                          {reduxSelectedDriver?.User?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">
                          {reduxSelectedDriver?.phoneNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">
                          {reduxSelectedDriver?.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Assign Vehicle Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Vehicle Name</p>
                        <p className="font-medium">
                          {reduxSelectedDriver?.companyName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Vehicle Owner </p>
                        <p className="font-medium">
                          {reduxSelectedDriver?.companyAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Activity */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Account Activity
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Join Date</p>
                      <p className="font-medium text-blue-600">
                        {formatDate(reduxSelectedDriver?.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Uploaded Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {uploadedDocuments?.map((doc, key) => {
                    const previewUrl = generatePreviewUrl(doc);

                    return (
                      <div
                        key={key}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">
                            {doc?.filename}
                          </h4>
                        </div>

                        {/* Document Preview */}
                        {/* Document Preview */}
                        <div className="relative mb-3">
                          {doc?.mimetype === "application/pdf" ? (
                            <div
                              className="w-full h-32 bg-gray-100 flex items-center justify-center rounded cursor-pointer border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
                              onClick={() => setSelectedDocument(doc)}
                            >
                              <div className="flex flex-col items-center">
                                <svg
                                  className="w-8 h-8 text-red-500 mb-2"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="text-sm text-gray-600 font-medium">
                                  {doc.filename}
                                </span>
                                <span className="text-xs text-gray-500 mt-1">
                                  Click to preview
                                </span>
                              </div>
                            </div>
                          ) : (
                            <img
                              src={doc.preview}
                              alt={doc.name}
                              className="w-full h-32 object-cover rounded cursor-pointer"
                              onClick={() => setSelectedDocument(doc)}
                            />
                          )}

                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity rounded cursor-pointer flex items-center justify-center">
                            <Eye className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            {doc.description}
                          </p>

                          <button
                            onClick={() => setSelectedDocument(doc)}
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            View Document
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      {selectedDocument && <DocumentPreview document={selectedDocument} />}

      {/* Status Change Modal */}
      {showStatusModal && <StatusModal />}
    </div>
  );
};

export default DriverListingProfile;
