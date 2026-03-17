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
import {
  Alert,
  CaretLeft,
  CheckedIcons,
  Close,
  Copy,
  FilledStartIcon,
  LinkIcon,
  ProcessingLogo,
  Question,
  Shield,
  SmallCongratulations,
  SmallProcessing,
  StarIcon,
} from "@/components/Logo";
import { Modal } from "@/components/modal";

const LoansPage = () => {
  const { signupData, loanData, setLoanData, setModal, manageFlowData, setManageFlowData } = useAuthStore();
  const router = useRouter();
  const userName = signupData.firstName + " " + signupData.lastName;
  
  const isComplete = manageFlowData.pin.every((v) => v !== "");
  
  const handlePinChange = (val: string, index: number) => {
    if (val.length > 1) val = val[val.length - 1];

    const newPin = [...manageFlowData.pin];
    newPin[index] = val;
    setManageFlowData({ pin: newPin });
    if (val && index < 3) document.getElementById(`pin-${index + 1}`)?.focus();
  };
  
  const rate = ["Poor", "Fair", "Okay", "Good", "Very Good"];

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
          <LoanManageView onProceed={() => setModal(true)} />
        </div>
      </div>
      <Modal>
        <div className="bg-white py-[34px] overflow-hidden px-[30px] rounded-[16px] w-[590px] max-h-[700px]">
          <h2 className="font-semibold text-xl">Loan offer letter</h2>
          <div className="my-2">
            <p className="text-[11px] leading-[14px]">
              Date: 5th of March, <br />
              2026 Name of Customer: Oluwasegun Adigun
              <br />
              Address of Customer: Sunshine estate, destiny homes
            </p>
          </div>
          <div className="my-2">
            <p className="text-[12px] leading-[16px]">
              Dear <b>Oluwasegun Adigun</b>, your next application for Car
              Monthly Loan Product with Peakpay Limited has been approved. Here
              is a breakdown of the details:
            </p>
            <p className="text-[12px] leading-[16px] mt-3">
              Please review the Terms and Conditions below. To finalise this
              agreement, please sign on the last page.
            </p>
          </div>
          <div className="my-5">
            <p className="text-[14px] mb-2 leading-[16px] font-semibold">
              Loan Details:
            </p>
            <ul>
              <li className="text-[12px] flex mb-1 items-center gap-1 leading-[14px] font-semibold text-[#000000]">
                <div className="w-1 h-1 rounded-[50px] bg-black" />
                Purpose: Car repayment loan
              </li>
              <li className="text-[12px] flex mb-1 items-center gap-1 leading-[14px] font-semibold text-[#000000]">
                <div className="w-1 h-1 rounded-[50px] bg-black" />
                Loan Amount: <p className="text-[#FF8A00]">₦200,000.00</p>
              </li>
              <li className="text-[12px] flex mb-1 items-center gap-1 leading-[14px] font-semibold text-[#000000]">
                <div className="w-1 h-1 rounded-[50px] bg-black" />
                Interest rate: <p className="text-[#FF8A00]">2%</p>
              </li>
              <li className="text-[12px] flex mb-1 items-center gap-1 leading-[14px] font-semibold text-[#000000]">
                <div className="w-1 h-1 rounded-[50px] bg-black" />
                Loan Term: <p className="text-[#FF8A00]">6 months</p>
              </li>
              <li className="text-[12px] flex mb-1 items-center gap-1 leading-[14px] font-semibold text-[#000000]">
                <div className="w-1 h-1 rounded-[50px] bg-black" />
                Monthly Payment: <p className="text-[#FF8A00]">₦17,000.00</p>
              </li>
              <li className="text-[12px] flex mb-1 items-center gap-1 leading-[14px] font-semibold text-[#000000]">
                <div className="w-1 h-1 rounded-[50px] bg-black" />
                First Payment Due Date:{" "}
                <p className="text-[#FF8A00]">30th July, 2026</p>
              </li>
              <li className="text-[12px] flex mb-1 items-center gap-1 leading-[14px] font-semibold text-[#000000]">
                <div className="w-1 h-1 rounded-[50px] bg-black" />
                Total Repayment Amount:{" "}
                <p className="text-[#FF8A00]">₦206,000.00</p>
              </li>
              <li className="text-[12px] flex mb-1 items-center gap-1 leading-[14px] font-semibold text-[#000000]">
                <div className="w-1 h-1 rounded-[50px] bg-black" />
                Payment method: <p className="text-[#FF8A00]">Card</p>
              </li>
            </ul>
          </div>
          <div className="flex flex-row gap-2 mt-10">
            <button
              onClick={() => setModal(false)}
              className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:bg-gray-300 text-white font-normal py-4 rounded-xl transition-all flex items-center justify-center gap-2">
              Continue
            </button>
          </div>
        </div>
        </Modal>
    </div>
  );
};

const LoanManageView = ({ onProceed }: { onProceed: () => void }) => {
  const router = useRouter();
  const { manageFlowData, setManageFlowData } = useAuthStore();

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 max-w-[608px]">
      <div className="space-y-2">
        <h2 className="text-[18px] font-semibold text-gray-900">Manage Loan</h2>
        <div className="mt-4 gap-2 flex flex-col">
          <div className="justify-end flex flex-row items-center mb-5">
            <div className="px-4 py-2 bg-[#FFCC001A] rounded-full text-[#FFCC00] justify-center items-center flex text-[14px] leading-[20px] font-[700]">
              Ongoing
            </div>
          </div>
          <div className="justify-between items-center flex flex-row">
            <p className="text-[14px] leading-[20px] text-[#606060] font-normal">
              <b>₦200,000</b>/ ₦1,000,000
            </p>
            <p className="text-[14px] leading-[20px] text-[#606060] font-normal">
              20% complete
            </p>
          </div>
          <div className="h-2 rounded-full bg-[#F3F4F6]"></div>
        </div>
        <div className="mt-4">
          <p className="text-[14px] leading-[20px] font-[600] text-[#606060]">
            Next payment Amount
          </p>
          <p className="text-[14px] leading-[18px] font-[600] mt-2">
            ₦ 100,000
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <button className="w-full border-[#FF8A00] border bg-[#F3F4F6] text-[#1E1E1E] text-[14px] font-semibold h-[50px] rounded-xl transition-all flex items-center justify-center gap-2">
            <Alert />
            Next payment is due on the 25th of Sep, 2026
          </button>
          <button
            onClick={() => router.push("/repayment")}
            className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:bg-gray-300 text-white font-semibold h-[50px] rounded-xl transition-all flex items-center justify-center gap-2 text-[14px] ">
            Make Payment
          </button>
          <div className="flex flex-row my-4 justify-between items-center">
            <p
              onClick={() =>
                setManageFlowData({
                  showSchedule: !manageFlowData.showSchedule,
                })
              }
              className="text-[12px] cursor-pointer leading-[14px] text-[#1E9F85] font-medium underline">
              View Repayment Schedule
            </p>
            <p
              onClick={() => {
                onProceed();
              }}
              className="text-[12px] cursor-pointer leading-[14px] text-[#606060] font-medium underline">
              View Offer Letter
            </p>
          </div>
        </div>
        {manageFlowData.showSchedule && (
          <div className="space-y-2">
            <h3 className="text-[16px] font-semibold text-gray-900">
              Repayment Schedule
            </h3>
            <div>
              <SummaryCards
                title={7}
                value={"₦ 100,000"}
                date={"3 Mar, 2026"}
              />
              <SummaryCards
                title={10}
                value={"₦ 100,000"}
                date={"3 Apr, 2026"}
              />
              <SummaryCards
                title={13}
                value={"₦ 100,000"}
                date={"3 May, 2026"}
              />
              <SummaryCards
                title={16}
                value={"₦ 100,000"}
                date={"3 Jun, 2026"}
              />
              <SummaryCards
                title={19}
                value={"₦ 100,000"}
                date={"3 Jul, 2026"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default LoansPage;

const SummaryCards = ({
  title,
  value,
  date,
}: {
  title: number;
  value: string;
  date: string;
}) => (
  <div className="flex flex-row justify-between items-center bg-[#F3F4F6] py-2 px-3 rounded-[12px] mb-3">
    <div className="flex flex-col gap-1">
      <p className="text-[12px] font-normal text-left">{value}</p>
      <p className="text-[12px] font-semibold text-start">{date}</p>
    </div>
    <div className="flex flex-col gap-1 justify-end items-end">
      <p className="text-[12px] font-normal text-start">Upcoming</p>
      <p className="text-[12px] font-semibold text-end text-[#E67C00]">
        {title} days to repayment
      </p>
    </div>
  </div>
);
