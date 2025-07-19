import React, { useState, useEffect } from "react";
import {
  Truck,
  Shield,
  Clock,
  Users,
  Star,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Menu,
  X,
  CheckCircle,
  Download,
  Play,
  Smartphone,
  Globe,
  BarChart3,
  TrendingUp,
  Award,
  Zap,
  Target,
  Heart,
  ArrowDown,
  ChevronRight,
  Package,
  Route,
  DollarSign,
  Headphones,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const VanTruckBusRedesign = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState("drivers");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const colors = {
    primary: "#1e40af",
    secondary: "#3b82f6",
    accent: "#06b6d4",
    success: "#10b981",
    warning: "#f59e0b",
    dark: "#1f2937",
    light: "#f8fafc",
  };

  const stats = [
    {
      number: "50,000+",
      label: "Active Users",
      icon: <Users className="w-8 h-8" />,
    },
    {
      number: "2M+",
      label: "Deliveries Made",
      icon: <Package className="w-8 h-8" />,
    },
    {
      number: "25+",
      label: "Cities Covered",
      icon: <Globe className="w-8 h-8" />,
    },
    {
      number: "4.8/5",
      label: "User Rating",
      icon: <Star className="w-8 h-8" />,
    },
  ];

  const services = [
    {
      icon: <Route className="w-12 h-12" />,
      title: "Smart Route Optimization",
      description:
        "AI-powered routing that saves time and fuel costs while ensuring fastest delivery times.",
      color: colors.primary,
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Secure & Insured",
      description:
        "Full insurance coverage and real-time tracking for complete peace of mind.",
      color: colors.success,
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Instant Booking",
      description:
        "Book your transport in seconds with our mobile app and get instant confirmation.",
      color: colors.accent,
    },
    {
      icon: <Headphones className="w-12 h-12" />,
      title: "24/7 Support",
      description:
        "Round-the-clock customer service with live chat and phone support.",
      color: colors.warning,
    },
  ];

  const features = [
    "Real-time GPS tracking",
    "Transparent pricing",
    "Multiple vehicle options",
    "Instant quotes",
    "Proof of delivery",
    "24/7 customer support",
  ];

  const appFeatures = {
    drivers: [
      {
        icon: <DollarSign className="w-6 h-6" />,
        title: "Earn More",
        desc: "Competitive rates with instant payments",
      },
      {
        icon: <Route className="w-6 h-6" />,
        title: "Smart Routes",
        desc: "Optimized routes to maximize earnings",
      },
      {
        icon: <Clock className="w-6 h-6" />,
        title: "Flexible Hours",
        desc: "Work when you want, how you want",
      },
      {
        icon: <Award className="w-6 h-6" />,
        title: "Driver Rewards",
        desc: "Bonus programs for top performers",
      },
    ],
    users: [
      {
        icon: <Smartphone className="w-6 h-6" />,
        title: "Easy Booking",
        desc: "Book transport in just 3 taps",
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "Secure Transport",
        desc: "Fully insured and tracked deliveries",
      },
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: "Live Tracking",
        desc: "Real-time updates on your shipment",
      },
      {
        icon: <Heart className="w-6 h-6" />,
        title: "Reliable Service",
        desc: "99.5% on-time delivery rate",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={require("../../assets/VTBNoBgLogo.png")}
                alt="VTB Logo"
                className="h-14 w-auto object-contain"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="#services"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Services
              </a>
              <a
                href="#apps"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Apps
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Contact
              </a>
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg">
              <div className="px-6 py-4 space-y-4">
                <a
                  href="#home"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                >
                  Home
                </a>
                <a
                  href="#services"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                >
                  Services
                </a>
                <a
                  href="#apps"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                >
                  Apps
                </a>
                <a
                  href="#about"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                >
                  Contact
                </a>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-semibold">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-white"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center min-h-screen">
            <div className="lg:w-1/2 lg:pr-12">
              <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Star className="w-4 h-4 mr-2" />
                Nigeria's #1 Logistics Platform
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Move Your
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Business Forward
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Connect with thousands of reliable drivers and transport your
                goods across Nigeria with real-time tracking, transparent
                pricing, and guaranteed delivery.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center">
                  Start Shipping Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Free to use
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  24/7 Support
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Instant quotes
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl transform rotate-3 opacity-20"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <Clock className="w-8 h-8 text-blue-600 mb-2" />
                      <div className="text-2xl font-bold text-gray-900">
                        2hr
                      </div>
                      <div className="text-sm text-gray-600">
                        Avg. delivery time
                      </div>
                    </div>
                    <div className="bg-cyan-50 p-4 rounded-xl">
                      <TrendingUp className="w-8 h-8 text-cyan-600 mb-2" />
                      <div className="text-2xl font-bold text-gray-900">
                        98%
                      </div>
                      <div className="text-sm text-gray-600">Success rate</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Truck className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Smart Logistics
                    </h3>
                    <p className="text-gray-600">
                      AI-powered platform for efficient deliveries
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-cyan-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Target className="w-4 h-4 mr-2" />
              Our Services
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Move Your Business
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From instant booking to real-time tracking, we've got all the
              tools you need for seamless logistics management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <div style={{ color: service.color }}>{service.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <button className="text-blue-600 font-semibold flex items-center group-hover:text-blue-700 transition-colors">
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Apps Section */}
      <section
        id="apps"
        className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile Apps
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Get Our Apps &
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Start Moving
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download our mobile apps and join thousands of users and drivers
              who trust VanTruckBus for their logistics needs.
            </p>
          </div>

          {/* App Type Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full p-2 shadow-lg">
              <button
                onClick={() => setActiveTab("drivers")}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === "drivers"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                For Drivers
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === "users"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                For Users
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* App Features */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {activeTab === "drivers"
                  ? "Drive & Earn with VanTruckBus"
                  : "Ship Smarter with VanTruckBus"}
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                {activeTab === "drivers"
                  ? "Join our network of professional drivers and maximize your earnings with flexible schedules and premium routes."
                  : "Experience hassle-free shipping with our user-friendly app designed for businesses and individuals."}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {appFeatures[activeTab].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
                  <div className="w-8 h-8 mr-3">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>

                <button className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
                  <div className="w-8 h-8 mr-3">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.85C20.5,11.13 20.75,11.6 20.75,12C20.75,12.4 20.53,12.86 20.16,13.15L17.89,14.5L15.39,12L17.89,9.5L20.16,10.85M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>

            {/* App Mockup */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <div className="aspect-[9/16] w-64 mx-auto bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Smartphone className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {activeTab === "drivers"
                        ? "VanTruckBus Driver"
                        : "VanTruckBus User"}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {activeTab === "drivers"
                        ? "Drive. Earn. Repeat."
                        : "Ship. Track. Deliver."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12">
              <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Award className="w-4 h-4 mr-2" />
                Why Choose Us
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Built for
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Modern Logistics
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We've revolutionized logistics in Nigeria with cutting-edge
                technology, transparent pricing, and unmatched reliability that
                businesses trust.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Get Started Today
              </button>
            </div>

            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Secure & Safe
                  </h3>
                  <p className="text-gray-600">
                    End-to-end encryption and insurance coverage
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow mt-8">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Cost Effective
                  </h3>
                  <p className="text-gray-600">
                    Save up to 30% on transport costs
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Fast Delivery
                  </h3>
                  <p className="text-gray-600">Average 2-hour delivery time</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow mt-8">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    24/7 Support
                  </h3>
                  <p className="text-gray-600">Always here when you need us</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Ready to Transform Your
              <span className="block">Logistics Experience?</span>
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust VanTruckBus for
              their transport needs. Get started today with a free quote.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                Get Free Quote
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold text-lg rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300">
                Download App
              </button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-blue-100">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                No setup fees
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Instant quotes
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                24/7 support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 bg-gray-900 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">
                  VanTruckBus
                </span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Nigeria's leading logistics platform connecting businesses with
                reliable transport solutions. We're transforming how goods move
                across the country.
              </p>

              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Services
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover:translate-x-1 transform inline-block"
                  >
                    Interstate Transport
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover:translate-x-1 transform inline-block"
                  >
                    Same-Day Delivery
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover:translate-x-1 transform inline-block"
                  >
                    Fleet Management
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover:translate-x-1 transform inline-block"
                  >
                    Bulk Transport
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover:translate-x-1 transform inline-block"
                  >
                    Last Mile Delivery
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Contact Info
              </h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                  <span>
                    Plot 1234, Logistics Avenue
                    <br />
                    Victoria Island, Lagos
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-400 mr-2" />
                  <span>+234 800 VANTRUCKBUS</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-400 mr-2" />
                  <span>hello@vantruckbus.com</span>
                </li>
              </ul>

              <div className="mt-6">
                <h5 className="text-white font-semibold mb-2">
                  Download Our Apps
                </h5>
                <div className="flex flex-col space-y-2">
                  <button className="flex items-center bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm">
                    <div className="w-6 h-6 mr-2">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                      </svg>
                    </div>
                    App Store
                  </button>
                  <button className="flex items-center bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm">
                    <div className="w-6 h-6 mr-2">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.85C20.5,11.13 20.75,11.6 20.75,12C20.75,12.4 20.53,12.86 20.16,13.15L17.89,14.5L15.39,12L17.89,9.5L20.16,10.85M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                      </svg>
                    </div>
                    Google Play
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; 2025 VanTruckBus Logistics. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VanTruckBusRedesign;
