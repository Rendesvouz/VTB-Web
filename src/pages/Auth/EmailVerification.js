import React, { useState, useRef, useEffect } from "react";
import { COLORS } from "../../themes/themes";

const EmailVerification = () => {
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleInput = (e, index) => {
    const newCodes = [...codes];
    newCodes[index] = e.target.value;
    setCodes(newCodes);
    if (e.target.value && index < codes.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResendClick = () => {
    setIsModalOpen(true);
  };

  const handleResendSubmit = () => {
    if (!resendEmail) {
      setEmailError("Email is required");
      return;
    }
    setLoading(true);
    // Simulate resend action
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      setResendCooldown(30);
    }, 2000);
  };

  const emailVeriification = async () => {
    
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="verification-wrapper onboarding-bg min-h-screen w-full flex items-center justify-center p-4 relative bg-black text-white">
      <div className="inner bg-white w-full max-w-xl rounded-2xl p-4 md:p-8 lg:p-12 h-[50%] text-black">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light">
            We emailed you a code
          </h2>
          <p className="mt-2 md:mt-4 text-sm md:text-base">
            Enter the verification code sent to your email
          </p>

          {isVerified && (
            <div className="verification-success mt-3 md:mt-4">
              <span className="text-green-600 font-medium flex items-center justify-center text-sm md:text-base">
                Verified
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          )}

          {error && (
            <div
              className={`error-message mt-3 md:mt-4 ${
                error ? "shake-animation" : ""
              }`}
            >
              <span className="text-red-600 font-medium flex items-center justify-center text-sm md:text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </span>
            </div>
          )}

          <div className="flex justify-center gap-2 md:gap-4 mt-6 md:mt-8">
            {codes.map((code, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                value={code}
                onChange={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => setError("")}
                type="text"
                maxLength={1}
                className={`w-8 h-10 md:w-12 md:h-12 text-center text-lg md:text-xl font-semibold border rounded-lg focus:ring-2 focus:border-[${
                  COLORS.vtbBtnColor
                }] focus:ring-[${COLORS.vtbBtnColor}] ${
                  error ? "border-red-500" : ""
                }`}
                disabled={loading || isVerified}
              />
            ))}
          </div>

          <div className="mt-6 md:mt-8 flex flex-col md:flex-row items-center justify-center gap-2 text-sm md:text-base">
            <p className="m-0">Didn't get your code?</p>
            <button
              onClick={handleResendClick}
              disabled={loading || isVerified || resendCooldown > 0}
              style={{ color: COLORS.vtbBtnColor }}
              className="hover:underline font-medium whitespace-nowrap"
            >
              {resendCooldown > 0
                ? `Try again in ${resendCooldown}s`
                : "Resend code"}
            </button>
          </div>

          {serverError && (
            <div className="mt-3 md:mt-4 text-red-600 text-xs md:text-sm">
              {serverError}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="absolute bg-white w-full max-w-xl rounded-2xl p-4 md:p-8 lg:p-12 h-[60%] text-black">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-center mb-4">
              Enter Your Email
            </h3>
            <input
              type="email"
              value={resendEmail}
              onChange={(e) => {
                setResendEmail(e.target.value);
                setEmailError("");
              }}
              placeholder="Enter your email address"
              className="w-full text-center px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 mb-2"
              disabled={loading}
            />
            {emailError && (
              <p className="text-sm text-red-600 mb-4">{emailError}</p>
            )}

            <div className="flex justify-center gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleResendSubmit}
                style={{ backgroundColor: COLORS.vtbBtnColor }}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
