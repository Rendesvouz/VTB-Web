import React, { useState } from "react";
import {
  AlertCircle,
  Shield,
  CheckCircle,
  FileText,
  Clock,
  X,
  ArrowRight,
  Truck,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import FormButton from "../form/FormButton";
import { COLORS } from "../../themes/themes";
import { useSelector } from "react-redux";

const VerificationRequiredModal = ({ isOpen, onClose, onGoToProfile }) => {
  const verificationSteps = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Upload Documents",
      description: "Submit required business and vehicle documents",
      completed: false,
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Document Review",
      description: "Our team reviews your submitted documents",
      completed: false,
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Account Verification",
      description: "Get verified and access all platform features",
      completed: false,
    },
  ];

  const requiredDocuments = [
    "Business Registration Certificate",
    "Driver's License",
    "Vehicle Registration",
    "Insurance Certificate",
    "Tax Clearance Certificate",
    "Roadworthiness Certificate",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Verification Required</h2>
              <p className="text-blue-100 text-sm">
                Complete your account verification to continue
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Alert Message */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-1">
                  Action Restricted
                </h3>
                <p className="text-yellow-700 text-sm">
                  You need to complete account verification before you can add
                  trucks to our platform. This helps us maintain trust and
                  security for all users.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Why Verification Matters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Trust & Safety</h4>
                  <p className="text-sm text-gray-600">
                    Build credibility with customers
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Full Access</h4>
                  <p className="text-sm text-gray-600">
                    List and manage your trucks
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Priority Support
                  </h4>
                  <p className="text-sm text-gray-600">
                    Get faster customer service
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Better Visibility
                  </h4>
                  <p className="text-sm text-gray-600">
                    Higher ranking in searches
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Steps */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Verification Process
            </h3>
            <div className="space-y-4">
              {verificationSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed
                        ? "bg-green-100 text-green-600"
                        : index === 0
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      step.completed ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {step.completed
                      ? "Completed"
                      : index === 0
                      ? "Current"
                      : "Pending"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Required Documents
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-900">
                Verification Timeline
              </h4>
            </div>
            <p className="text-sm text-blue-800">
              Document review typically takes 24-48 hours after submission.
              You'll receive an email notification once your account is
              verified.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
          <p className="text-sm text-gray-600">
            Need help? Contact our support team at support@example.com
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onGoToProfile}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              Complete Verification
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Alternative inline version that can be used directly in the component
const VerificationRequiredInline = ({ onGoToProfile }) => {
  const state = useSelector((state) => state);
  const loggedInUser = state?.user?.user;
  const loggedInUserVerification = loggedInUser?.User?.verification;

  const requiredDocuments = [
    "Business Registration Certificate",
    "Proof of Address",
    "Means of ID(Driver's License, NIN, Voter's Card)",
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div
          style={{ backgroundColor: COLORS.vtbBtnColor }}
          className="px-8 py-6 text-white"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Verification Required</h1>
              <p className="text-blue-100 text-lg">
                Complete your account verification to start listing vehicles
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Alert */}
          {loggedInUserVerification?.verificationStatus == "pending" &&
          loggedInUserVerification?.supportingDocuments?.length ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-800 text-lg mb-2">
                    Documents Submitted
                  </h3>
                  <p className="text-yellow-700">
                    Thank you for submitting your documents. Your account is
                    currently under review. You will be notified once a decision
                    has been made.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-800 text-lg mb-2">
                    Account Verification Needed
                  </h3>
                  <p className="text-yellow-700">
                    We require all vehicle owners to complete verification
                    before listing vehicles. This ensures platform security and
                    builds trust with potential customers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">
                Enhanced Security
              </h3>
              <p className="text-green-700 text-sm">
                Verified accounts provide better security for all users
              </p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">
                Full Platform Access
              </h3>
              <p className="text-blue-700 text-sm">
                List unlimited vehicles and access all features
              </p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-purple-800 mb-2">
                Trust Badge
              </h3>
              <p className="text-purple-700 text-sm">
                Display verified status to attract more customers
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Why Verification Matters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Trust & Safety</h4>
                  <p className="text-sm text-gray-600">
                    Build credibility with customers
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Full Access</h4>
                  <p className="text-sm text-gray-600">
                    List and manage your vehicles
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Priority Support
                  </h4>
                  <p className="text-sm text-gray-600">
                    Get faster customer service
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Better Visibility
                  </h4>
                  <p className="text-sm text-gray-600">
                    Higher ranking in searches
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Required Documents
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <FormButton
              title={"Complete Verification Now"}
              btnIcon={<Shield className="w-5 h-5 mr-3" />}
              onClick={onGoToProfile}
            />

            <p className="text-gray-600 text-sm mt-4">
              Verification typically takes 24-48 hours • Need help? Contact
              support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo component showing both versions
const VerificationDemo = () => {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    console.log("Navigating to profile page...");
    // Navigate to profile page
    navigate("/vehicle-owner/profile");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <VerificationRequiredInline onGoToProfile={handleGoToProfile} />
    </div>
  );
};

export default VerificationDemo;
