import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Smartphone,
  Truck,
  Users,
  Download,
  Star,
  Shield,
  Globe,
} from "lucide-react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(null);
  const [hoveredRole, setHoveredRole] = useState(null);
  const [completedItems, setCompletedItems] = useState({});
  const [showAnimation, setShowAnimation] = useState(false);

  const roles = [
    {
      id: "truck-owner",
      title: "Truck Owner",
      shortDescription:
        "Manage your fleet and drivers through our web platform",
      tagline: "Your trucks, your business, our platform",
      longDescription:
        "Take control of your trucking business with our comprehensive web platform. <strong>Manage drivers, track vehicles, and optimize routes</strong> from one central dashboard. Access advanced analytics and fleet management tools designed for truck owners.",
      icon: Truck,
      platform: "website",
      requirements: [
        "Valid business registration",
        "Commercial truck registration",
        "Commercial insurance coverage",
        "DOT number verification",
        "Fleet safety certification",
        "Complete web platform setup",
      ],
      webAccess: {
        url: "https://dashboard.rendezvous.com/truck-owners",
        features: [
          "Fleet Management",
          "Driver Analytics",
          "Route Optimization",
          "Revenue Tracking",
        ],
      },
    },
    {
      id: "driver",
      title: "Driver",
      shortDescription: "Start driving trucks and earning with our mobile app",
      tagline: "Drive trucks, earn more, work flexible",
      longDescription:
        "Join our network of professional truck drivers and start earning competitive rates. <strong>Find available trucks, plan routes, and get paid instantly</strong> through our easy-to-use mobile app.",
      icon: Users,
      platform: "mobile",
      requirements: [
        "Valid CDL (Commercial Driver's License)",
        "DOT medical certificate",
        "Clean driving record",
        "Background check completion",
        "Install Driver Mobile App",
      ],
      appStore: {
        ios: "https://apps.apple.com/app/rendezvous-driver",
        android:
          "https://play.google.com/store/apps/details?id=com.rendezvous.driver",
      },
    },
    {
      id: "user",
      title: "Customer",
      shortDescription:
        "Book truck services and deliveries through our mobile app",
      tagline: "Reliable trucking services at your fingertips",
      longDescription:
        "Need freight transport or delivery services? <strong>Book trucks instantly</strong> and track your shipments in real-time with our customer mobile app.",
      icon: Smartphone,
      platform: "mobile",
      requirements: [
        "Valid phone number verification",
        "Business/personal identification",
        "Payment method setup",
        "Install Customer Mobile App",
      ],
      appStore: {
        ios: "https://apps.apple.com/app/rendezvous-customer",
        android:
          "https://play.google.com/store/apps/details?id=com.rendezvous.customer",
      },
    },
  ];

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const selectRole = (role) => {
    setSelectedRole(role);
    setCompletedItems({});
  };

  const goBack = () => {
    setSelectedRole(null);
    setCompletedItems({});
  };

  const toggleRequirement = (index) => {
    setCompletedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const completedRequirements =
    Object.values(completedItems).filter(Boolean).length;
  const isReadyToContinue =
    selectedRole && completedRequirements === selectedRole.requirements.length;

  const continueWithRole = () => {
    if (isReadyToContinue) {
      if (selectedRole.platform === "website") {
        alert(
          `Continuing as ${selectedRole.title}! Redirecting to web dashboard...`
        );
        // Redirect to web platform
      } else {
        alert(
          `Continuing as ${selectedRole.title}! Redirecting to app download...`
        );
        // Redirect to app store
      }
    }
  };

  const downloadApp = (platform) => {
    window.open(selectedRole.appStore[platform], "_blank");
  };

  const accessWebPlatform = () => {
    // window.open(selectedRole.webAccess.url, "_blank");
    navigate("/truck-owner/register");
  };

  const HighlightBubbles = () => (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-ping"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: "2s",
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto mt-10 lg:mt-20">
          {!selectedRole ? (
            // Role Selection View
            <div
              className={`text-center transition-all duration-1000 ${
                showAnimation
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white">
                Welcome to VanTruckBus Logistics !
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Choose how you want to join our trucking platform:
              </p>

              <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {roles?.map((role, index) => {
                  const IconComponent = role.icon;
                  const isWebPlatform = role.platform === "website";
                  return (
                    <div
                      key={role.id}
                      className={`relative bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transition-all duration-500 border-2 ${
                        isWebPlatform
                          ? "border-[#2465E1]/50 hover:border-[#2465E1] hover:bg-[#2465E1]/10"
                          : "border-gray-700 hover:border-[#2465E1]/50 hover:bg-gray-800/50"
                      } hover:scale-105 hover:shadow-2xl ${
                        isWebPlatform
                          ? "hover:shadow-[#2465E1]/25"
                          : "hover:shadow-[#2465E1]/25"
                      } ${
                        showAnimation
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10"
                      }`}
                      style={{ animationDelay: `${index * 0.15}s` }}
                      onClick={() => selectRole(role)}
                      onMouseEnter={() => setHoveredRole(role.id)}
                      onMouseLeave={() => setHoveredRole(null)}
                    >
                      {hoveredRole === role.id && <HighlightBubbles />}

                      {isWebPlatform && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-[#2465E1] text-white px-3 py-1 rounded-full text-xs font-bold">
                            WEB PLATFORM
                          </span>
                        </div>
                      )}

                      <div
                        className={`w-20 h-20 mx-auto mb-6 p-4 rounded-full transition-all duration-300 ${
                          isWebPlatform ? "bg-[#2465E1]" : "bg-[#2465E1]"
                        } ${
                          hoveredRole === role.id ? "scale-110 rotate-12" : ""
                        }`}
                      >
                        <IconComponent className="w-full h-full text-white" />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold">{role.title}</h3>
                        <p className="text-gray-300 leading-relaxed">
                          {role.shortDescription}
                        </p>
                        <div className="flex justify-center">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              isWebPlatform
                                ? "bg-[#2465E1]/20 text-[#2465E1] border border-[#2465E1]/30"
                                : "bg-[#2465E1]/20 text-[#2465E1] border border-[#2465E1]/30"
                            }`}
                          >
                            {isWebPlatform ? "Web Dashboard" : "Mobile App"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            // Role Details View
            <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
              <button
                onClick={goBack}
                className="flex items-center space-x-2 text-[#2465E1] hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to roles</span>
              </button>

              <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                <div className={`w-20 h-20 p-4 rounded-full bg-[#2465E1]`}>
                  <selectedRole.icon className="w-full h-full text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-4xl font-bold mb-2">
                    {selectedRole.title}
                  </h2>
                  <p className="text-xl mb-4 text-[#2465E1]">
                    {selectedRole.tagline}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
                      Popular Choice
                    </span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30 flex items-center space-x-1">
                      <Shield className="w-3 h-3" />
                      <span>Verified Platform</span>
                    </span>
                    {selectedRole.platform === "website" && (
                      <span className="px-3 py-1 bg-[#2465E1]/20 text-[#2465E1] rounded-full text-sm border border-[#2465E1]/30 flex items-center space-x-1">
                        <Globe className="w-3 h-3" />
                        <span>Web Access</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div
                  className="text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: selectedRole.longDescription,
                  }}
                />
              </div>

              {selectedRole?.requirements?.length > 0 && (
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">Requirements</h3>
                    <span className="text-[#2465E1]">
                      {completedRequirements}/{selectedRole.requirements.length}{" "}
                      completed
                    </span>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                    <div
                      className="bg-[#2465E1] h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          (completedRequirements /
                            selectedRole.requirements.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>

                  <ul className="space-y-3">
                    {selectedRole?.requirements.map((req, index) => (
                      <li
                        key={index}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          completedItems[index]
                            ? "bg-green-500/20 border border-green-500/30"
                            : "bg-gray-800/50 border border-gray-600 hover:bg-gray-700/50"
                        }`}
                        onClick={() => toggleRequirement(index)}
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            completedItems[index]
                              ? "bg-green-500 border-green-500"
                              : "border-gray-400"
                          }`}
                        >
                          {completedItems[index] && (
                            <span className="text-white text-sm">✓</span>
                          )}
                        </div>
                        <span
                          className={
                            completedItems[index]
                              ? "text-green-300"
                              : "text-gray-300"
                          }
                        >
                          {req}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedRole?.platform === "website" ? (
                // Web Platform Access for Truck Owners
                <div className="bg-[#2465E1]/10 backdrop-blur-sm rounded-xl p-6 border border-[#2465E1]/20">
                  <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>Access Web Dashboard</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {selectedRole.webAccess.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-white"
                      >
                        <Star className="w-4 h-4 text-[#2465E1]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={accessWebPlatform}
                    className="w-full bg-[#2465E1] hover:bg-[#1e54c7] px-6 py-4 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center space-x-2 text-white"
                  >
                    <Globe className="w-5 h-5" />
                    <span>Access Web Dashboard</span>
                  </button>
                </div>
              ) : (
                // Mobile App Download for Drivers and Customers
                <div className="bg-[#2465E1]/10 backdrop-blur-sm rounded-xl p-6 border border-[#2465E1]/20">
                  <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                    <Smartphone className="w-5 h-5" />
                    <span>Download the {selectedRole?.title} App</span>
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => downloadApp("ios")}
                      className="flex items-center justify-center space-x-3 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors duration-200"
                    >
                      <FaApple className="w-5 h-5 text-white" />
                      <div className="text-left">
                        <div className="text-xs text-gray-400">
                          Download on the
                        </div>
                        <div className="font-semibold text-white">
                          App Store
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => downloadApp("android")}
                      className="flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg transition-colors duration-200"
                    >
                      <FaGooglePlay className="w-5 h-5 text-white" />
                      <div className="text-left">
                        <div className="text-xs text-gray-200">Get it on</div>
                        <div className="font-semibold text-white">
                          Google Play
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              <div className="text-center">
                <button
                  onClick={continueWithRole}
                  disabled={!isReadyToContinue}
                  className={`relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 mx-auto ${
                    isReadyToContinue
                      ? "bg-[#2465E1] hover:bg-[#1e54c7] text-white shadow-lg hover:shadow-xl hover:scale-105"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <span>Continue as {selectedRole.title}</span>
                  <ArrowRight className="w-5 h-5" />
                  {isReadyToContinue && (
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
