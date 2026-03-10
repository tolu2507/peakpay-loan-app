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
import { CaretLeft, Copy, LinkIcon, Shield } from "@/components/Logo";

const LoansPage = () => {
  const { signupData, loanData, setLoanData } = useAuthStore();
  const router = useRouter();
  const userName = signupData.firstName + " " + signupData.lastName;
  const [activeStep, setActiveStep] = useState<
    "request" | "summary" | "address"
  >("request");
  const [isProcessing, setIsProcessing] = useState(false);
  console.log({ loanData });

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
        <div className="flex-1">
          <LoanRequestView
            onProceed={handleRequestProceed}
            isProcessing={isProcessing}
          />
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
  const router = useRouter();
  const [show, setShow] = useState(false);

  const isValid = loanData.amount && loanData.purpose && loanData.tenor;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 max-w-[608px]">
      <div className="space-y-8">
        <div
          onClick={() => router.back()}
          className="flex items-center gap-2 py-[8px] px-[20px] rounded-[16px] bg-[#FF83001A]">
          <CaretLeft />
          <h2 className="text-[18px] font-semibold text-gray-900">
            Set up repayment process
          </h2>
        </div>

        {!show ? (
          <div>
            <p className="text-[#606060] font-normal text-[16px]">
              To set up your loan repayment process with Peakpay, you are
              required to make a one-time payment. This payment will activate
              your loan repayment and cover your outstanding balance, including
              any applicable interest and fees. Please proceed with your payment
              to complete the process.
            </p>
          </div>
        ) : (
          <div>
            <div className="gap-[14px] flex-col flex mb-[20px]">
              <p className="text-[#606060] font-normal text-[12px] leading-[22px]">
                To confirm your repayment process, please transfer ₦11.00 from
                your bank account below
              </p>
              <div className="rounded-[16px] p-[16px] gap-[8px] gap-[14px] flex-col flex bg-[#F3F4F6]">
                <div className="flex flex-row justify-between items-center">
                  <p className="text-[12px]">Bank Name</p>
                  <p className="text-[12px]">Account Number</p>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <p className="text-[12px]">Access Bank</p>
                  <p className="text-[12px]">8123456789</p>
                </div>
              </div>
            </div>
            <div className="mb-10">
              <p className="text-[16px] mb-[20px] font-semibold leading-[20px] text-[#1e1e1e]">
                To the account below
              </p>
              <div className="rounded-[16px] mb-[4px] p-[16px] gap-[14px] flex-col flex bg-[#F3F4F6]">
                <div className="flex flex-col gap-[1px] items-start">
                  <p className="text-[9px]">Bank Name</p>
                  <p className="text-[12px] font-medium">Paystack-Titan</p>
                </div>
                <div className="flex flex-col gap-[1px] items-start">
                  <p className="text-[9px]">Account Number</p>
                  <div className="flex gap-2 items-center">
                    <p className="text-[12px] font-medium">9012345678</p>
                    <Copy onClick={() => console.log("click")} />
                  </div>
                </div>
                <div className="flex flex-col gap-[1px] items-start">
                  <p className="text-[9px]">Amount</p>
                  <p className="text-[12px] font-medium">₦11.00</p>
                </div>
              </div>
              <p className="text-[#1E9F85] text-[12px] font-semibold leading-[20px]">
                Use this for this transaction only
              </p>
            </div>
            <div>
              <div className="flex-col flex justify-center items-center gap-2">
                <div className="w-[80px] h-[80px]">
                  <Shield />
                </div>
                <p className="font-semibold text-[12px] font-[#000000]">
                  Expires in 30:00
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={show ? () => router.push("summary") : () => setShow(true)}
          className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
          {show ? "I have sent the money" : "Pay"}
          {!show && <LinkIcon />}
        </button>
      </div>
    </div>
  );
};

export default LoansPage;
