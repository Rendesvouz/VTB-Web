import React, { useState } from "react";
import { Star, Clock, MapPin, Award } from "lucide-react";
import FormButton from "../form/FormButton";
import TransparentBtn from "../form/TransparentBtn";

function DriverCards({ props, onClick }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "unemployed":
        return "bg-green-100 text-green-800";
      case "On Route":
        return "bg-yellow-100 text-yellow-800";
      case "Off Duty":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "unemployed":
        return "Available";
      case "On Route":
        return "On Route";
      default:
        return "UnAvailable";
    }
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            props?.status
          )}`}
        >
          {getStatusText(props?.status)}
        </span>
      </div>

      <div className="p-6">
        {/* Driver Info Header */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative">
            <img
              src={props?.profilePicture}
              alt={props?.fullName}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-50 group-hover:ring-blue-100 transition-all"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {props?.fullName}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{props?.license}</p>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < Math.floor(props?.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {props?.rating}
              </span>
              <span className="text-xs text-gray-500">
                ({props?.trips} trips)
              </span>
            </div>
          </div>
        </div>

        {/* Driver Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Award size={16} className="mr-2 text-blue-500" />
            <span>{props?.experience} experience</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={16} className="mr-2 text-blue-500" />
            <span>{props?.dateOfBirth}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-2 text-blue-500" />
            <span>Last active: {props?.lastActive}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 justify-between">
          <TransparentBtn title={"View Profile"} marginLeft={"0px"} />

          <FormButton
            title={props?.truckownerId ? "Assign Driver" : "Employ Driver"}
            marginLeft={"0px"}
            onClick={() => onClick(props)}
          />
        </div>
      </div>

      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}

export default DriverCards;
