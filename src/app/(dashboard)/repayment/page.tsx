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
import { Card, CaretLeft, Caretright, CheckedIcons, Copy, LinkIcon, SecuredDetails, Shield, TransferIcon } from "@/components/Logo";
import { Modal } from "@/components/modal";

const LoansPage = () => {
  const { signupData, loanData, setLoanData } = useAuthStore();
  const { loanFlowData, setLoanFlowData, setRepaymentData } = useAuthStore();
  const router = useRouter();
  const userName = signupData.firstName + " " + signupData.lastName;

  useEffect(() => {
    setRepaymentData({ view: "initial", type: "", amount: "" });
  }, [setRepaymentData]);

  const handleRequestProceed = () => {
    setLoanFlowData({ isProcessing: true });
    // Simulate API call
    setTimeout(() => {
      setLoanFlowData({ isProcessing: false, activeStep: "summary" });
    }, 1500);
  };

  const handleSummaryProceed = () => {
    setLoanFlowData({ activeStep: "address" });
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
            isProcessing={loanFlowData.isProcessing}
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
  const { loanData, setLoanData, setModal, modal, repaymentData, setRepaymentData } = useAuthStore();
  const router = useRouter();

  const isValid = loanData.amount && loanData.purpose && loanData.tenor;

  useEffect(() => {
    if (modal) {
      const timeout = setTimeout(() => {
        setModal(false);
        router.push("/dashboard");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [modal]);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 max-w-[608px]">
      <div className="space-y-8">
        {repaymentData.view === "initial" ? (
          <div className="space-y-3">
            <div
              onClick={() => router.back()}
              className="flex items-center gap-2 py-[8px] px-[20px] rounded-[16px] bg-[#FF83001A]">
              <CaretLeft />
              <h2 className="text-[18px] font-semibold text-gray-900">
                Make Repayment
              </h2>
            </div>
            <div>
              <p className="text-[#606060] font-normal text-[16px]">
                To set up your loan repayment process with Peakpay, you are
                required to make a one-time payment. This payment will activate
                your loan repayment and cover your outstanding balance,
                including any applicable interest and fees. Please proceed with
                your payment to complete the process.
              </p>
            </div>
          </div>
        ) : (
          <div>
            {repaymentData.type === "" ? (
              <div>
                {repaymentData.view === "types" ? (
                  <PaymentTypes />
                ) : (
                  <PaymentsOptions
                    action={(val) => setRepaymentData({ type: val })}
                  />
                )}
              </div>
            ) : (
              <div>
                {repaymentData.type === "Transfer" ? (
                  <TransferPageCard
                    setType={(val) => setRepaymentData({ type: val })}
                    action={() => {
                      setLoanData({ status: "none" });
                      setModal(true);
                    }}
                  />
                ) : (
                  <CardTransfer
                    setType={(val) => setRepaymentData({ type: val })}
                    action={() => {
                      setLoanData({ status: "none" });
                      setModal(true);
                    }}
                  />
                )}
              </div>
            )}
          </div>
        )}

        {repaymentData.view === "initial" || repaymentData.view === "types" ? (
          <button
            onClick={
              repaymentData.view === "initial"
                ? () => setRepaymentData({ view: "types", type: "" })
                : () => setRepaymentData({ view: "options" })
            }
            className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
            {repaymentData.view === "initial" ? "Pay" : "Proceed"}
            {repaymentData.view === "initial" && <LinkIcon />}
          </button>
        ) : null}
        <Modal>
          <div className="bg-white py-[30px] overflow-hidden px-[20px] rounded-[16px] flex-col flex gap-8 justify-center items-center w-[380px]">
            <CheckedIcons />
            <p className="font-bold text-center text-[16px] leading-[20px]">
              Repayment Successful
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default LoansPage;

const PaymentTypes = () => {
  const { repaymentData, setRepaymentData } = useAuthStore();
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[18px] font-semibold text-gray-900">
          Make Repayment
        </h2>
      </div>

      <p className="text-[16px] font-semibold leading-[20px] text-[#1e1e1e]">
        Select a repayment option
      </p>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2 text-[#606060] text-[14px] leading-[18px]">
          <input type="radio" name="repayment" id="repayment" />
          <p>Pay next repayment of ₦110,000</p>
        </div>
        <div className="flex items-center gap-2 text-[#606060] text-[14px] leading-[18px]">
          <input type="radio" name="repayment" id="repayment" />
          <p>Pay all repayment of ₦1,000,000</p>
        </div>
        <div className="flex items-center gap-2 text-[#606060] text-[14px] leading-[18px]">
          <input type="radio" name="repayment" id="repayment" />
          <p>Enter an amount to pay</p>
        </div>
      </div>
      <div>
        <label htmlFor="amount" className="text-semibold text-[14px] mb-4">
          Enter Amount
        </label>
        <input
          type="text"
          placeholder="Enter amount"
          value={repaymentData.amount}
          onChange={(e) => setRepaymentData({ amount: e.target.value })}
          className="w-full border mt-4 border-gray-100 rounded-[16px] p-[16px]"
        />
      </div>
    </div>
  );
};


const PaymentsOptions = ({ action }: { action: (val: string) => void }) => <div className="space-y-8">
  <div>
    <h2 className="text-[18px] font-semibold text-gray-900">
      Make Repayment
    </h2>
    <p className="text-[12px] mt-2 font-normal text-[#606060]">How do you want to repay your loan? Select an option.</p>
  </div>
  <div className="flex flex-col gap-5">
    <div onClick={() => action('Card')} className="flex flex-row py-2 cursor-pointer justify-between items-center">
      <div className="flex gap-2 items-center">
        <Card />
        <p className="font-semibold text-[14px] leading-[20px] text-black">Pay with card</p>
      </div>
      <div>
        <Caretright />
      </div>
    </div>
    <div onClick={() => action('Transfer')} className="flex flex-row py-2 cursor-pointer justify-between items-center">
      <div className="flex gap-2 items-center">
        <TransferIcon />
        <p className="font-semibold text-[14px] leading-[20px] text-black">Pay with Transfer</p>
      </div>
      <div>
        <Caretright />
      </div>
    </div>
  </div>
</div>


export const TransferPageCard = ({ setType, action }: { setType: (val: string) => void; action: () => void }) => (<div>
  <div className="gap-[14px] flex-col flex mb-[20px]">
    <h2 className="font-semibold text-[20px] leading-[24px]">Pay with Bank Transfer</h2>
    <p className="text-[#606060] font-normal text-[12px] -mt-1 mb-3 leading-[14px]">
      Do not refresh or close this window until confirmation is complete.
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
  <div className="flex flex-row gap-2 mt-12">
    <button
      onClick={() => setType('')}
      className="w-full bg-[transparent] disabled:bg-gray-300 text-[#FF8A00] font-semibold py-4 transition-all flex items-center justify-center gap-2">
      Back
    </button>
    <button
      onClick={action}
      className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
      I have sent the money
    </button>
  </div>
</div>)

export const CardTransfer = ({ setType, action }: { setType: (val: string) => void; action: () => void }) => {
  //state to manage the form globally should be done here.
  return <div>
    <div className="gap-[14px] flex-col flex mb-[20px]">
      <h2 className="font-semibold text-[20px] leading-[24px]">Pay with Card</h2>
      <p className="text-[#606060] font-normal text-[12px] -mt-1 mb-3 leading-[14px]">
        To make your repayment, enter your card details below
      </p>
    </div>
    <div className="mb-10 space-y-6">
      <div>
        <label htmlFor="cardnumber" className="text-bold text-[14px]">Card Number</label>
        <input type="text" placeholder="0000 0000 0000 0000" className="w-full border mt-2 border-gray-100 rounded-[16px] p-[16px]" />
      </div>
      <div className="w-full flex flex-row items-center gap-4 justify-between">
        <div className="w-full">
          <label htmlFor="expiration" className="text-bold text-[14px]">Expiration date</label>
          <input type="text" placeholder="02-01-1999" className="w-full border mt-2 border-gray-100 rounded-[16px] p-[16px]" />
        </div>
        <div className="w-full">
          <label htmlFor="cvv" className="text-bold text-[14px]">CVV</label>
          <input type="text" placeholder="123" className="w-full border mt-2 border-gray-100 rounded-[16px] p-[16px]" />
        </div>
      </div>
      <div>
        <label htmlFor="name" className="text-bold text-[14px]">Name on card</label>
        <input type="text" placeholder="Enter card name" className="w-full border mt-2 border-gray-100 rounded-[16px] p-[16px]" />
      </div>
      <SecuredDetails />
    </div>
    <div className="flex flex-row gap-2 mt-12">
      <button
        onClick={() => setType('')}
        className="w-full bg-[transparent] disabled:bg-gray-300 text-[#FF8A00] font-semibold py-4 transition-all flex items-center justify-center gap-2">
        Back
      </button>
      <button
        onClick={action}
        className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
        I have sent the money
      </button>
    </div>
  </div>
}