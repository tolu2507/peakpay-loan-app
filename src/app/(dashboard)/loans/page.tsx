"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronRight,
  ArrowRight,
  Info,
  Upload,
  CheckCircle2,
  FileText,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";

const LoansPage = () => {
  const { signupData, loanData, setLoanData } = useAuthStore();
  const router = useRouter();
  const userName = signupData.firstName + " " + signupData.lastName;
  const [activeStep, setActiveStep] = useState<
    "request" | "summary" | "address"
  >("request");
  const [isProcessing, setIsProcessing] = useState(false);
console.log({loanData})

  const handleRequestProceed = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setActiveStep("summary");
    }, 1500);
  };

  const handleSummaryProceed = () => {
    setActiveStep("address");
  };

  const handleAddressProceed = () => {
    setLoanData({ status: "pending" });
    router.push("/dashboard");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-900">
            Hi, {userName}
          </h1>
          <p className="text-gray-500">Good morning</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-yellow-400 p-2 rounded-full cursor-pointer">
            <div className="w-5 h-5 flex items-center justify-center text-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
          <div className="p-2 border border-gray-100 rounded-full cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="w-5 h-5 flex items-center justify-center text-[#FF8A00]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <div className="flex gap-8">
        {/* Left Side: Stepper Progress */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-50 p-6 space-y-6">
            <div className="flex gap-3">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                    activeStep === "request" ||
                    activeStep === "summary" ||
                    activeStep === "address"
                      ? "border-[#FF8A00] bg-white text-[#FF8A00]"
                      : "border-gray-200"
                  }`}>
                  {activeStep === "address" ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <div className="w-2 h-2 bg-[#FF8A00] rounded-full" />
                  )}
                </div>
                <div className="w-0.5 h-10 bg-gray-100" />
              </div>
              <div
                className={`text-sm font-semibold transition-colors ${
                  activeStep === "request" || activeStep === "summary"
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}>
                Enter loan amount
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                    activeStep === "address"
                      ? "border-[#FF8A00] bg-white text-[#FF8A00]"
                      : "border-gray-200 bg-white"
                  }`}>
                  {activeStep === "address" && (
                    <div className="w-2 h-2 bg-[#FF8A00] rounded-full" />
                  )}
                </div>
              </div>
              <div
                className={`text-sm font-semibold transition-colors ${
                  activeStep === "address" ? "text-gray-900" : "text-gray-400"
                }`}>
                Enter address
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Step Content */}
        <div className="flex-1">
          {activeStep === "request" && (
            <LoanRequestView
              onProceed={handleRequestProceed}
              isProcessing={isProcessing}
            />
          )}
          {activeStep === "summary" && (
            <LoanSummaryView onProceed={handleSummaryProceed} />
          )}
          {activeStep === "address" && (
            <LoanAddressView onProceed={handleAddressProceed} />
          )}
        </div>
      </div>
    </div>
  );
};

const LoanRequestView = ({
  onProceed,
  isProcessing,
}: {
  onProceed: () => void;
  isProcessing: boolean;
}) => {
  const { loanData, setLoanData } = useAuthStore();

  const purposeOptions = [
    "Car payment",
    "Business growth",
    "Medical emergency",
    "School fees",
    "Rent",
  ];
  const tenorOptions = [
    "3 months",
    "6 months",
    "12 months",
    "18 months",
    "24 months",
  ];

  const isValid = loanData.amount && loanData.purpose && loanData.tenor;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-10 max-w-2xl">
      <div className="space-y-8">
        <h2 className="text-[22px] font-semibold text-gray-900">
          Request Loan
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">
              How much do you want?
            </label>
            <div className="space-y-1">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                  ₦
                </span>
                <input
                  type="text"
                  value={loanData.amount}
                  onChange={(e) => setLoanData({ amount: e.target.value })}
                  className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 pl-8 outline-none focus:border-[#FF8A00] transition-all font-semibold"
                  placeholder="10,000,000"
                />
              </div>
              <p className="text-[12px] font-semibold text-[#00A85A]">
                Minimum ₦1,000
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">
              I want this loan for?
            </label>
            <div className="relative">
              <select
                value={loanData.purpose}
                onChange={(e) => setLoanData({ purpose: e.target.value })}
                className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00] transition-all appearance-none font-medium">
                <option value="" disabled>
                  Select an option
                </option>
                {purposeOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <ChevronRight
                className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">
              How long do you want to repay for?
            </label>
            <div className="relative">
              <select
                value={loanData.tenor}
                onChange={(e) => setLoanData({ tenor: e.target.value })}
                className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00] transition-all appearance-none font-medium">
                <option value="" disabled>
                  Select a tenor
                </option>
                {tenorOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <ChevronRight
                className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>
          </div>
        </div>

        <button
          onClick={onProceed}
          disabled={!isValid || isProcessing}
          className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Proceed"
          )}
        </button>
      </div>
    </div>
  );
};

const LoanSummaryView = ({ onProceed }: { onProceed: () => void }) => {
  const { loanData } = useAuthStore();

  const summaryDetails = [
    { label: "Amount you will receive", value: `₦ ${loanData.amount}` },
    { label: "Loan amount", value: "₦ 1,050,000" },
    { label: "Monthly flat interest rate", value: "2.5%" },
    { label: "Loan duration", value: loanData.tenor },
    { label: "Management fee", value: "1% flat" },
    { label: "Credit life insurance", value: "0.2% flat" },
    { label: "Estimated total repayment", value: "₦ 1,120,000" },
    { label: "Date of first payment", value: "25 Apr, 2026" },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-10 max-w-5xl">
      <div className="flex gap-16">
        <div className="flex-1 space-y-8 h-fit">
          <h2 className="text-[22px] font-semibold text-gray-900">
            Request Loan
          </h2>

          <div className="space-y-6 opacity-60 pointer-events-none text-[#5B5B5B]">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">
                How much do you want?
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                  ₦
                </span>
                <input
                  type="text"
                  value={loanData.amount}
                  readOnly
                  className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 pl-8 outline-none font-semibold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">
                I want this loan for?
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={loanData.purpose}
                  readOnly
                  className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">
                How long do you want to repay for?
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={loanData.tenor}
                  readOnly
                  className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none font-medium"
                />
              </div>
            </div>
          </div>

          <button
            onClick={onProceed}
            className="w-full bg-[#FF8A00] hover:bg-[#E67C00] text-white font-semibold py-4 rounded-xl shadow-lg transition-all">
            Proceed
          </button>
        </div>

        <div className="w-[400px] flex-shrink-0 space-y-8">
          <div className="bg-[#F8FAFC] p-6 rounded-2xl space-y-1 text-center border border-gray-50">
            <p className="text-xs text-gray-400 font-medium">
              Estimated Monthly Payment
            </p>
            <p className="text-xl font-semibold text-gray-900">₦ 110,000</p>
          </div>

          <div className="space-y-4">
            {summaryDetails.map((detail, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-[13px] border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                <span className="text-gray-400 font-medium">
                  {detail.label}
                </span>
                <span className="text-gray-900 font-semibold">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const LoanAddressView = ({ onProceed }: { onProceed: () => void }) => {
  const { loanData, setLoanData } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);

  const isValid =
    loanData.houseNumber &&
    loanData.houseAddress &&
    loanData.landmark &&
    loanData.state &&
    loanData.lga &&
    loanData.city;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-10 max-w-3xl">
      <div className="space-y-8">
        <h2 className="text-[22px] font-semibold text-gray-900">
          Enter address
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">
              House number
            </label>
            <input
              type="text"
              value={loanData.houseNumber}
              onChange={(e) => setLoanData({ houseNumber: e.target.value })}
              className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00] transition-all font-medium"
              placeholder="e.g 15"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">
              House address
            </label>
            <input
              type="text"
              value={loanData.houseAddress}
              onChange={(e) => setLoanData({ houseAddress: e.target.value })}
              className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00] transition-all font-medium"
              placeholder="Enter your address"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">
            Closest landmark
          </label>
          <input
            type="text"
            value={loanData.landmark}
            onChange={(e) => setLoanData({ landmark: e.target.value })}
            className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00] transition-all font-medium"
            placeholder="Enter a landmark"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">
            What state do you live in?
          </label>
          <div className="relative">
            <select
              value={loanData.state}
              onChange={(e) => setLoanData({ state: e.target.value })}
              className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00] transition-all appearance-none font-medium">
              <option value="" disabled>
                Select an option
              </option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Oyo">Oyo</option>
            </select>
            <ChevronRight
              className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none"
              size={20}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">
              What is your LGA?
            </label>
            <div className="relative">
              <select
                value={loanData.lga}
                onChange={(e) => setLoanData({ lga: e.target.value })}
                className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00] transition-all appearance-none font-medium">
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Ikeja">Ikeja</option>
                <option value="Alimosho">Alimosho</option>
              </select>
              <ChevronRight
                className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">
              What city do you reside in?
            </label>
            <div className="relative">
              <select
                value={loanData.city}
                onChange={(e) => setLoanData({ city: e.target.value })}
                className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00] transition-all appearance-none font-medium">
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Ikeja">Ikeja</option>
                <option value="Lekki">Lekki</option>
              </select>
              <ChevronRight
                className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-900 block">
            Utility bill (must not be older than 3 months)
          </label>
          <input
            type="file"
            id="bill-upload"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <div
            onClick={() => document.getElementById("bill-upload")?.click()}
            className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center space-y-4 bg-[#FBFBFB] cursor-pointer hover:bg-gray-50 transition-all">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              {file ? (
                <CheckCircle2 size={24} className="text-[#00A85A]" />
              ) : (
                <Upload size={24} className="text-[#00A85A]" />
              )}
            </div>
            <div className="flex flex-col items-center gap-1 text-sm text-center">
              {file ? (
                <>
                  <p className="text-gray-900 font-semibold">{file.name}</p>
                  <p className="text-gray-400">Click to change file</p>
                </>
              ) : (
                <>
                  <div className="text-gray-400 flex items-center gap-1">
                    <Upload size={14} />
                    <span>Drag and drop to upload files or</span>
                  </div>
                  <button className="text-[#00A85A] font-semibold hover:underline">
                    browse file
                  </button>
                </>
              )}
            </div>
          </div>
          <p className="text-[10px] font-semibold text-[#00A85A]">
            JPG, PNG, and PDF files supported. Maximum 10MB
          </p>
        </div>

        <button
          onClick={onProceed}
          disabled={!isValid}
          className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl shadow-lg transition-all">
          Proceed
        </button>
      </div>
    </div>
  );
};

export default LoansPage;
