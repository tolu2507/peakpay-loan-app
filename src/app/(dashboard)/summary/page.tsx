"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import {
  CheckedIcons,
  Close,
  FilledStartIcon,
  ProcessingLogo,
  Question,
  SmallCongratulations,
  SmallProcessing,
  StarIcon,
} from "@/components/Logo";
import { Modal } from "@/components/modal";

// --- Sub-components ---

const SummaryCard = ({ title, value }: { title: string; value: string }) => (
  <div className="flex flex-row justify-between items-center border-b py-3">
    <p className="text-[12px]">{title}</p>
    <p className="text-[12px] font-semibold">{value}</p>
  </div>
);

const SummaryCards = ({
  title,
  value,
  due,
  date,
}: {
  title: string;
  value: string;
  date: string;
  due: boolean;
}) => (
  <div className="flex flex-row justify-between items-center border-b py-2">
    <p className="text-[12px] font-normal text-left">{title}</p>
    <p className="text-[12px] font-normal text-start">{value}</p>
    <p className="text-[12px] font-normal text-start">{date}</p>
    <p className="text-[12px] font-normal text-end">
      {due ? "Due" : "Not Due"}
    </p>
  </div>
);

const LoanOffer = ({
  consented,
  setConsented,
  action,
  approve,
}: {
  consented: boolean;
  setConsented: (val: any) => void;
  action: () => void;
  approve: () => void;
}) => (
  <div className="bg-white py-[34px] p-4 overflow-hidden px-[30px] rounded-[16px] w-[590px] max-h-[700px] shadow-2xl">
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
        Dear <b>Oluwasegun Adigun</b>, your next application for Car Monthly
        Loan Product with Peakpay Limited has been approved. Here is a breakdown
        of the details:
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
          Total Repayment Amount: <p className="text-[#FF8A00]">₦206,000.00</p>
        </li>
        <li className="text-[12px] flex mb-1 items-center gap-1 leading-[14px] font-semibold text-[#000000]">
          <div className="w-1 h-1 rounded-[50px] bg-black" />
          Payment method: <p className="text-[#FF8A00]">Card</p>
        </li>
      </ul>
      <div className="my-5 z-50">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consented}
            onChange={(e) => setConsented(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-gray-300 text-[#FF8A00] focus:ring-[#FF8A00]"
          />
          <span className="text-xs text-gray-600 mt-1">
            I hereby accept the Terms and Conditions of this offer
          </span>
        </label>
      </div>
    </div>
    <div className="flex flex-row gap-2 mt-10">
      <button
        onClick={action}
        className="w-full bg-[transparent] disabled:bg-gray-300 text-[#FF8A00] font-semibold py-4 transition-all flex items-center justify-center gap-2">
        Decline
      </button>
      <button
        onClick={approve}
        disabled={!consented}
        className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:bg-gray-300 text-white font-normal py-4 rounded-xl transition-all flex items-center justify-center gap-2">
        Accept
      </button>
    </div>
  </div>
);

const LoanRequestView = ({ onProceed }: { onProceed: () => void }) => {
  const { summaryFlowData, setSummaryFlowData } = useAuthStore();
  const router = useRouter();

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 max-w-[608px]">
      <div className="space-y-2">
        <h2 className="text-[18px] font-semibold text-gray-900">
          Loan Summary
        </h2>

        {summaryFlowData?.showSchedule ? (
          <div className="space-y-3">
            <div>
              <SummaryCard title={"Loan amount"} value={"₦ 1,000,000"} />
              <SummaryCard title={"Tenor"} value={"6 months"} />
              <SummaryCard title={"Interest rate"} value={"10%"} />
              <SummaryCard title={"Management fees"} value={"₦ 2,000"} />
              <SummaryCard title={"Credit life insuarance"} value={"₦ 2,000"} />
              <SummaryCard
                title={"Total repayment amount"}
                value={"₦ 1,500,000"}
              />
              <SummaryCard title={"Monthly repayment"} value={"₦ 100,000"} />
              <SummaryCard title={"Total number of payments"} value={"10"} />
            </div>
            <div className="space-y-2">
              <h3 className="text-[16px] font-semibold text-gray-900">
                Repayment Schedule
              </h3>
              <div>
                <SummaryCards
                  title={"1st repayment"}
                  value={"₦ 100,000"}
                  date={"3 Mar, 2026"}
                  due={true}
                />
                <SummaryCards
                  title={"2nd repayment"}
                  value={"₦ 100,000"}
                  date={"3 Apr, 2026"}
                  due={false}
                />
                <SummaryCards
                  title={"3rd repayment"}
                  value={"₦ 100,000"}
                  date={"3 May, 2026"}
                  due={false}
                />
                <SummaryCards
                  title={"4th repayment"}
                  value={"₦ 100,000"}
                  date={"3 Jun, 2026"}
                  due={false}
                />
                <SummaryCards
                  title={"5th repayment"}
                  value={"₦ 100,000"}
                  date={"3 Jul, 2026"}
                  due={false}
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <div className="flex-col my-10 flex justify-center items-center gap-2">
                <div className="w-[80px] h-[80px]">
                  <Close />
                </div>
              </div>
              <div className="gap-[10px] flex-col flex mt-[20px]">
                <p className="text-[#606060] font-semibold text-[16px] leading-[22px]">
                  Why leave now?
                </p>
                <p className="text-[#606060] font-normal text-[12px] leading-[22px]">
                  You are just a few clicks from getting your loan disbursed.
                  You can review your amount and tenure options to find the
                  perfect fit for your needs!
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-row gap-2 mt-3">
          <button
            onClick={
              summaryFlowData?.showSchedule ? () => setSummaryFlowData({ showSchedule: false }) : () => router.push("/dashboard")
            }
            className="w-full bg-[transparent] disabled:bg-gray-300 text-[#FF8A00] font-semibold py-4 transition-all flex items-center justify-center gap-2">
            {summaryFlowData?.showSchedule ? "Cancel" : "Return to home"}
          </button>
          <button
            onClick={() => {
              setSummaryFlowData({ showSchedule: true });
              onProceed();
            }}
            className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
            {summaryFlowData?.showSchedule ? "View offer letter" : "Review loan details"}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

const LoansPage = () => {
  const { signupData, setLoanData, setModal, summaryFlowData, setSummaryFlowData } = useAuthStore();
  const router = useRouter();
  
  const userName = (signupData?.firstName || "") + " " + (signupData?.lastName || "");
  const currentStep = summaryFlowData?.modalStep || "offer";
  const pin = summaryFlowData?.pin || ["", "", "", ""];
  const isComplete = pin.every((v) => v !== "");
  
  const handlePinChange = (val: string, index: number) => {
    if (val.length > 1) val = val[val.length - 1];

    const newPin = [...pin];
    newPin[index] = val;
    setSummaryFlowData({ pin: newPin });
    if (val && index < 3) {
      setTimeout(() => {
        document.getElementById(`pin-${index + 1}`)?.focus();
      }, 10);
    }
  };
  
  const rate = ["Poor", "Fair", "Okay", "Good", "Very Good"];

  useEffect(() => {
    if (currentStep === "processing") {
      const timer = setTimeout(() => {
        setSummaryFlowData({ modalStep: "pin" });
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (currentStep === "feedback") {
      const timer = setTimeout(() => {
        setSummaryFlowData({ modalStep: "congratulations" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, setSummaryFlowData]);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-900">
            Hi, {userName || "valued customer"}
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
          <LoanRequestView onProceed={() => setModal(true)} />
        </div>
      </div>

      <Modal>
        {currentStep === "offer" && (
          <LoanOffer
            consented={summaryFlowData?.consented || false}
            setConsented={(val) => setSummaryFlowData({ consented: val })}
            action={() => setModal(false)}
            approve={() => setSummaryFlowData({ modalStep: "processing" })}
          />
        )}

        {currentStep === "processing" && (
          <div className="bg-white py-[30px] overflow-hidden px-[20px] rounded-[16px] flex-col flex gap-5 justify-center items-center w-[380px] shadow-2xl">
            <div className="w-20 h-20">
              <ProcessingLogo />
            </div>
            <p className="font-semibold text-[20px] text-black">Loan Tip 101</p>
            <p className="font-normal text-center text-[14px] leading-[20px] text-black">
              Do you know that paying your loans on time can increase your loan
              offers and help you get better interest rates next time? Timely
              repayments show that you are reliable and opens the door for more
              flexible options.
            </p>
            <div className="text-center flex items-center gap-1 mt-3 text-sm font-semibold">
              <SmallProcessing />
              Processing
            </div>
          </div>
        )}

        {currentStep === "pin" && (
          <div className="bg-white py-[30px] overflow-hidden px-[20px] rounded-[16px] flex-col flex gap-5 justify-center items-center w-[380px] shadow-2xl">
            <Question />
            <p className="text-semibold text-[16px]">Enter Transaction Pin </p>
            <div className="flex justify-start gap-4">
              {pin.map((v, i) => (
                <input
                  key={i}
                  id={`pin-${i}`}
                  type="password"
                  value={v}
                  onChange={(e) => handlePinChange(e.target.value, i)}
                  className="w-12 h-14 border border-gray-100 bg-[#FBFBFB] rounded-xl text-center text-xl font-semibold outline-none focus:border-[#FF8A00]"
                  maxLength={1}
                />
              ))}
            </div>
            <button
              onClick={() => {
                setSummaryFlowData({ modalStep: "rating" });
              }}
              disabled={!isComplete}
              className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
              Proceed
            </button>
          </div>
        )}

        {currentStep === "rating" && (
          <div className="bg-white py-[30px] overflow-hidden px-[20px] rounded-[16px] flex-col flex gap-5 w-[380px] shadow-2xl">
            <p className="text-semibold text-[14px]">
              Rate your loan application process{" "}
            </p>
            <div className="flex justify-start gap-2">
              {rate.map((v, i) => (
                <div
                  onClick={() => setSummaryFlowData({ rateSelected: { rate: v, index: i } })}
                  key={v + i}
                  className="flex flex-col gap-1 justify-center items-center cursor-pointer min-w-[50px]">
                  {(summaryFlowData?.rateSelected?.index ?? -1) < i ? <StarIcon /> : <FilledStartIcon />}
                  <p className="text-[10px] whitespace-nowrap">{v}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-semibold text-[14px] mb-2">
                Tell us a bit about your experience
              </p>
              <input
                className="w-full px-3 border rounded-[16px] border-[#E5E7EB] h-[56px]"
                type="text"
                placeholder="Optional feedback"
              />
            </div>
            <button
              onClick={() => {
                setSummaryFlowData({ modalStep: "feedback" });
              }}
              disabled={summaryFlowData?.rateSelected?.index === -1}
              className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
              Submit
            </button>
          </div>
        )}

        {currentStep === "feedback" && (
          <div className="bg-white py-[30px] overflow-hidden px-[20px] rounded-[16px] flex-col flex gap-4 justify-center items-center w-[380px] shadow-2xl">
            <CheckedIcons />
            <p className="font-bold text-center text-[14px] leading-[18px]">
              Feedback received, thank you!
            </p>
            <p className="font-normal text-center leading-[14px] text-[11px]">
              We will continue to serve you with best loans and investments offers
              to the best of our abilities.
            </p>
          </div>
        )}

        {currentStep === "congratulations" && (
          <div className="bg-white py-[30px] overflow-hidden px-[20px] rounded-[16px] flex-col flex gap-4 justify-center items-center w-[380px] shadow-2xl">
            <SmallCongratulations />
            <p className="font-bold text-center text-[14px] leading-[18px]">
              Congratulations
            </p>
            <p className="font-normal text-center leading-[16px] text-[11px] px-10">
              We have credited ₦1,000,000 to your wallet. You can transfer the
              funds from your wallet to any account.
            </p>
            <button
              onClick={() => {
                setLoanData({ status: "approved" });
                setModal(false);
                setSummaryFlowData({ modalStep: "offer" }); // Reset for next time
                router.push("/dashboard");
              }}
              className="w-full bg-[#FF8A00] hover:bg-[#E67C00] text-white font-semibold py-4 rounded-xl shadow-lg transition-all mt-4">
              Return to Dashboard
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LoansPage;
