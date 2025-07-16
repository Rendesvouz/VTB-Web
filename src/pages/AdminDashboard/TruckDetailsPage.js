import React, { useState } from "react";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Truck,
  Clock,
  Shield,
  BadgeCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../Library/Common";
import { getAvailabilityStyles } from "../../Library/Precedence";

const TruckDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const userProfle = state?.user?.user;
  const isTruckOwner = userProfle?.User?.role == "TruckOwner";

  const reduxTruckDetails = state?.user?.truckDetails;
  // console.log("reduxTruckDetails", reduxTruckDetails);

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(
    reduxTruckDetails?.pictures?.[0]
  );
  const statusInfo = getAvailabilityStyles(reduxTruckDetails?.availability);

  // Sample truck data
  const truck = {
    id: "TRK-001",
    make: "Freightliner",
    model: "Cascadia",
    year: 2022,
    plateNumber: "ABC-1234",
    vin: "1FUJGHDV8NLAA1234",
    mileage: 125000,
    status: "Active",
    lastMaintenance: "2024-12-15",
    nextMaintenance: "2025-02-15",
    fuelType: "Diesel",
    capacity: "80,000 lbs",
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        alt: "Front view of Freightliner Cascadia",
        label: "Front View",
      },
      {
        url: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop",
        alt: "Side view of truck",
        label: "Side View",
      },
      {
        url: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=600&fit=crop",
        alt: "Truck interior cabin",
        label: "Interior",
      },
      {
        url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop",
        alt: "Truck engine compartment",
        label: "Engine",
      },
      {
        url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
        alt: "Truck cargo area",
        label: "Cargo Area",
      },
    ],
  };

  const driver = {
    id: "DRV-001",
    name: "John Martinez",
    licenseNumber: "CDL-789456",
    experience: "8 years",
    rating: 4.8,
    phone: "+1 (555) 123-4567",
    email: "john.martinez@company.com",
    joinDate: "2020-03-15",
    totalMiles: 450000,
    safetyRecord: "Excellent",
    specializations: ["Long Haul", "Hazmat", "Oversized Load"],
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  };

  const reviews = [
    {
      id: 1,
      customerName: "Sarah Johnson",
      company: "ABC Logistics",
      rating: 5,
      date: "2024-06-20",
      comment:
        "Excellent service! The driver was professional and delivered on time. The truck was in perfect condition.",
      route: "Chicago, IL → Dallas, TX",
    },
    {
      id: 2,
      customerName: "Mike Chen",
      company: "Global Shipping Co.",
      rating: 4,
      date: "2024-06-15",
      comment:
        "Good experience overall. Driver communicated well throughout the journey. Minor delay due to weather but handled professionally.",
      route: "Los Angeles, CA → Phoenix, AZ",
    },
    {
      id: 3,
      customerName: "Emily Rodriguez",
      company: "FastTrack Delivery",
      rating: 5,
      date: "2024-06-10",
      comment:
        "Outstanding service! The cargo arrived in perfect condition and ahead of schedule. Highly recommend this driver and truck.",
      route: "Miami, FL → Atlanta, GA",
    },
    {
      id: 4,
      customerName: "Robert Wilson",
      company: "Interstate Freight",
      rating: 4,
      date: "2024-06-05",
      comment:
        "Reliable and professional. The truck was well-maintained and the driver was courteous. Will use again.",
      route: "Seattle, WA → Portland, OR",
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Truck className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {reduxTruckDetails?.car_name} - {truck.make} -{" "}
                  {reduxTruckDetails?.model}
                </h1>
                <p className="text-gray-600">
                  Truck ID: {truck.id} • Plate: {truck.plateNumber}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo?.bgClass} ${statusInfo.textClass}`}
              >
                {statusInfo?.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Truck Image */}
            {/* Main Image */}
            <div className="w-full h-64 md:h-80 bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={selectedImage}
                alt="Truck"
                className="w-full h-full object-contain transition duration-300"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3 justify-center overflow-x-auto">
              {reduxTruckDetails?.pictures?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition duration-200 ${
                    selectedImage === img
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {["overview", "specifications"]?.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                        activeTab === tab
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Basic Information
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Make:</span>
                          <span className="font-medium">
                            {reduxTruckDetails?.car_name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Model:</span>
                          <span className="font-medium">
                            {reduxTruckDetails?.model}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Year:</span>
                          <span className="font-medium">{truck.year}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Mileage:</span>
                          <span className="font-medium">
                            {truck.mileage.toLocaleString()} miles
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Operational Details
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fuel Type:</span>
                          <span className="font-medium">{truck.fuelType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-medium">
                            {reduxTruckDetails?.capacity} tons
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Vehicle Type:</span>
                          <span className="font-medium">
                            {reduxTruckDetails?.type}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span
                            className={`px-2 py-1 rounded text-sm ${statusInfo.textClass} ${statusInfo.bgClass}`}
                          >
                            {statusInfo?.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "specifications" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Technical Specifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Vehicle Identification
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div>
                            <span className="text-gray-600">VIN:</span>{" "}
                            {truck.vin}
                          </div>
                          <div>
                            <span className="text-gray-600">Plate Number:</span>{" "}
                            {truck.plateNumber}
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Performance
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div>
                            <span className="text-gray-600">Max Capacity:</span>{" "}
                            {truck.capacity}
                          </div>
                          <div>
                            <span className="text-gray-600">Fuel Type:</span>{" "}
                            {truck.fuelType}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Truck Owner Information */}
            {!isTruckOwner && reduxTruckDetails?.truckOwnerProfile && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Truck Owner
                  </h2>
                  <div className="text-center mb-6">
                    <img
                      src={
                        reduxTruckDetails?.truckOwnerProfile
                          ?.supportingDocuments?.[0]
                      }
                      alt={reduxTruckDetails?.truckOwnerProfile?.fullName}
                      className="w-20 h-20 rounded-full mx-auto mb-3 object-contain"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-center">
                      {reduxTruckDetails?.truckOwnerProfile?.fullName}

                      {reduxTruckDetails?.truckOwnerProfile?.isVerified && (
                        <BadgeCheck className="w-4 h-4 text-green-500 ml-2" />
                      )}
                    </h3>
                    <p className="text-gray-600">
                      Email: {reduxTruckDetails?.truckOwnerProfile?.User?.email}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {reduxTruckDetails?.truckOwnerProfile?.phoneNumber}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {reduxTruckDetails?.truckOwnerProfile?.User?.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Joined:{" "}
                        {formatDate(
                          reduxTruckDetails?.truckOwnerProfile?.createdAt
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Driver Information */}
            {reduxTruckDetails?.matchedDriverProfile && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Assigned Driver
                  </h2>
                  <div className="text-center mb-6">
                    <img
                      src={
                        reduxTruckDetails?.matchedDriverProfile?.profilePicture
                      }
                      alt={reduxTruckDetails?.matchedDriverProfile?.fullName}
                      className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                    />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {reduxTruckDetails?.matchedDriverProfile?.fullName}
                    </h3>
                    <p className="text-gray-600">CDL: {driver.licenseNumber}</p>
                    <div className="flex items-center justify-center space-x-1 mt-2">
                      {renderStars(driver.rating)}
                      <span className="text-sm text-gray-600 ml-1">
                        ({driver.rating})
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {reduxTruckDetails?.matchedDriverProfile?.phoneNumber}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {reduxTruckDetails?.matchedDriverProfile?.User?.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Joined:{" "}
                        {formatDate(
                          reduxTruckDetails?.matchedDriverProfile?.createdAt
                        )}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {driver.experience} experience
                      </span>
                    </div>
                  </div>
                  {/*
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Driver Stats
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Miles:</span>
                      <span className="font-medium">
                        {driver.totalMiles.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Safety Record:</span>
                      <span className="font-medium text-green-600">
                        {driver.safetyRecord}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Specializations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {driver.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                */}
                </div>

                {/* Quick Actions */}
                {/*   <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Schedule Maintenance
                  </button>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Assign New Route
                  </button>
                  <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                    View Documents
                  </button>
                </div>
              </div>*/}
              </div>
            )}

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Customer Reviews
                </h2>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center">{renderStars(4.6)}</div>
                  <span className="text-gray-600">
                    4.6 out of 5 ({reviews.length} reviews)
                  </span>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {reviews.map((review) => (
                  <div key={review.id} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {review.customerName}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {review.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {review.date}
                        </p>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{review.route}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckDetailsPage;
