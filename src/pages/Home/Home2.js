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
} from "lucide-react";

const Home2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const colors = {
    vtbBtnColor: "#376ea4",
    black: "#000000",
    white: "#FFFFFF",
  };

  const stats = [
    { number: "2,500+", label: "Happy Clients" },
    { number: "15,000+", label: "Completed Orders" },
    { number: "4.9/5", label: "Star Rating" },
  ];

  const services = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fleet Management",
      description:
        "Comprehensive fleet solutions for all your transportation needs with modern trucks and professional drivers.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Transport",
      description:
        "GPS tracking, insurance coverage, and secure handling ensure your cargo is protected throughout the journey.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "On-Time Delivery",
      description:
        "Reliable scheduling and efficient logistics guarantee your goods arrive exactly when promised.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "24/7 Support",
      description:
        "Round-the-clock customer service team ready to assist with any questions or concerns.",
    },
  ];

  const features = [
    "Real-time GPS tracking",
    "Flexible scheduling options",
    "Insurance coverage included",
    "Professional drivers",
    "Competitive pricing",
    "Instant quote system",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div
              className="text-2xl font-bold"
              style={{ color: colors.vtbBtnColor }}
            >
              VanTruckBus
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </a>
              <a
                href="#services"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Services
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
              <button
                className="px-6 py-2 rounded-full text-white font-semibold transition-all hover:scale-105"
                style={{ backgroundColor: colors.vtbBtnColor }}
              >
                Get Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
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
            <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg">
              <div className="px-6 py-4 space-y-4">
                <a
                  href="#home"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  Home
                </a>
                <a
                  href="#services"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  Services
                </a>
                <a
                  href="#about"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  Contact
                </a>
                <button
                  className="w-full px-6 py-2 rounded-full text-white font-semibold"
                  style={{ backgroundColor: colors.vtbBtnColor }}
                >
                  Get Quote
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Trusted
                <span className="block" style={{ color: colors.vtbBtnColor }}>
                  Logistics Partner
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Delivering your goods on time and safely with our trusted
                services. We provide high-quality transport and logistics
                solutions tailored to meet your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="px-8 py-4 rounded-full text-white font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg flex items-center justify-center"
                  style={{ backgroundColor: colors.vtbBtnColor }}
                >
                  Order Now <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="px-8 py-4 rounded-full border-2 border-gray-300 text-gray-700 font-semibold text-lg hover:bg-gray-50 transition-all">
                  Learn More
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center justify-center h-64">
                    <Truck
                      className="w-32 h-32"
                      style={{ color: colors.vtbBtnColor }}
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Professional Fleet
                    </h3>
                    <p className="text-gray-600">
                      Modern trucks ready for any delivery challenge
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-white mb-2">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive logistics solutions designed to meet all your
              transportation needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-6" style={{ color: colors.vtbBtnColor }}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose VanTruckBus?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We've been the leader in transport and logistics since our
                inception, specializing in delivering goods across various
                industries with a focus on customer satisfaction, safety, and
                timely delivery.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle
                      className="w-5 h-5 mr-3"
                      style={{ color: colors.vtbBtnColor }}
                    />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className="mt-8 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all hover:scale-105"
                style={{ backgroundColor: colors.vtbBtnColor }}
              >
                Request Quote
              </button>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <Shield
                        className="w-24 h-24 mx-auto mb-4"
                        style={{ color: colors.vtbBtnColor }}
                      />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Secure & Reliable
                      </h3>
                      <p className="text-gray-600">
                        Your cargo is our priority
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Looking for reliable logistics services? Request a free quote from
            VanTruckBus Logistics, and let us help you with your transport
            needs.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 font-semibold text-lg rounded-full hover:bg-gray-100 transition-all hover:scale-105">
            Get Free Quote
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                VanTruckBus
              </h3>
              <p className="text-gray-400 mb-4">
                Your trusted logistics partner for reliable and efficient
                transport solutions.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Services
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Interstate Transport
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Local Delivery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Fleet Management
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Warehousing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    News
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>1234 Logistics Ave</li>
                <li>Business District, Lagos</li>
                <li>+234 123 456 7890</li>
                <li>info@vantruckbus.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 VanTruckBus Logistics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home2;
