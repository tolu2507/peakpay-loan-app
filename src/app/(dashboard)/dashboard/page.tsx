"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  ChevronRight,
  Eye,
  EyeOff,
  Plus,
  Info,
  ArrowRight,
  LayoutGrid,
  FileText,
  AlertCircle,
  CheckCircle2,
  Circle,
  Loader2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useAuthStore, SignupData } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Liveness } from "@/components/Logo";

const DashboardPage = () => {
  const { signupData, setKYCData, loanData, kycFlowData, setKYCFlowData, showBalance, setShowBalance } = useAuthStore();
  const router = useRouter();
  console.log({ loanData });
  const userName =
    signupData.firstName && signupData.lastName
      ? `${signupData.firstName} ${signupData.lastName}`
      : "Oluwasegun Adigun";

  const kycSteps = [
    {
      id: "bvn",
      name: "BVN Verification",
      completed: !!signupData?.kycData?.bvn,
    },
    {
      id: "liveness",
      name: "Liveness Check",
      completed: !!signupData?.kycData?.livenessCompleted,
    },
    {
      id: "nextOfKin",
      name: "Next of Kin Details",
      completed: !!signupData?.kycData?.nextOfKinCompleted,
    },
    {
      id: "employment",
      name: "Employment Details",
      completed: !!signupData?.kycData?.employmentCompleted,
    },
    {
      id: "pep",
      name: "PEP Details",
      completed: !!signupData?.kycData?.pepCompleted,
    },
    {
      id: "bankDetails",
      name: "Add Bank Details",
      completed: !!signupData?.kycData?.bankDetailsCompleted,
    },
    {
      id: "transactionPin",
      name: "Create Transaction PIN",
      completed: !!signupData?.kycData?.transactionPinCompleted,
    },
  ];

  const kycCompleted = kycSteps.every((step) => step.completed);

  const handleBVNProceed = () => {
    if (kycFlowData.bvnInput.length >= 11) {
      setKYCData({ bvn: kycFlowData.bvnInput });
      setKYCFlowData({ activeStepId: "liveness" });
    }
  };

  const handleLivenessComplete = () => {
    setKYCData({ livenessCompleted: true });
    setKYCFlowData({ activeStepId: "nextOfKin" });
  };

  const handleNextOfKinComplete = (data: {
    firstName: string;
    lastName: string;
    phone: string;
    relation: string;
  }) => {
    setKYCData({
      nextOfKinFirstName: data.firstName,
      nextOfKinLastName: data.lastName,
      nextOfKinPhone: data.phone,
      nextOfKinRelation: data.relation,
      nextOfKinCompleted: true,
    });
    setKYCFlowData({ activeStepId: "employment" });
  };

  const handleEmploymentComplete = (data: Partial<SignupData["kycData"]>) => {
    setKYCData({
      ...data,
      employmentCompleted: true,
    });
    setKYCFlowData({ activeStepId: "pep" });
  };

  const handlePEPComplete = (isPEP: boolean) => {
    setKYCData({
      isPEP,
      pepCompleted: true,
    });
    setKYCFlowData({ activeStepId: "bankDetails" });
  };

  const handleBankDetailsComplete = (data: Partial<SignupData["kycData"]>) => {
    setKYCData({
      ...data,
      bankDetailsCompleted: true,
    });
    setKYCFlowData({ activeStepId: "transactionPin" });
  };

  const handlePinComplete = (pin: string) => {
    setKYCData({
      transactionPin: pin,
      transactionPinCompleted: true,
    });
    setKYCFlowData({ showKYC: false }); // End KYC flow
  };

  if (kycFlowData.showKYC) {
    return (
      <div className="space-y-6 pb-12">
        {/* Top Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hi, {userName}</h1>
            <p className="text-gray-500">Good morning</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-2 rounded-full cursor-pointer">
              <div className="w-5 h-5 flex items-center justify-center text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="w-4 h-4">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>
            <div className="p-2 border border-gray-100 rounded-full cursor-pointer hover:bg-gray-50 transition-colors">
              <Bell size={20} className="text-[#FF8A00]" />
            </div>
          </div>
        </header>

        {/* KYC Banner */}
        <div className="bg-white border border-[#FFD000] rounded-xl p-4 flex items-center gap-3">
          <div className="text-yellow-500">
            <AlertCircle size={20} />
          </div>
          <p className="text-sm font-semibold text-gray-900">
            Update your profile and complete your KYC to take a loan.
          </p>
        </div>

        {/* KYC Verification Content */}
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          {/* Stepper Sidebar */}
          <div className="w-full md:w-1/3 bg-white rounded-2xl p-8 border border-gray-100 h-fit">
            <div className="space-y-8 relative">
              {kycSteps.map((step, idx) => {
                const isActive = step.id === kycFlowData.activeStepId;
                const isPreviousCompleted =
                  idx === 0 || kycSteps[idx - 1].completed;
                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-4 relative z-10 ${isActive || isPreviousCompleted ? "cursor-pointer" : "opacity-50"}`}
                    onClick={() => {
                      if (isPreviousCompleted || step.completed) {
                        setKYCFlowData({ activeStepId: step.id });
                      }
                    }}>
                    <div className="flex flex-col items-center">
                      {step.completed ? (
                        <div className="text-[#2EB086]">
                          <CheckCircle2
                            size={24}
                            fill="currentColor"
                            fillOpacity="0.1"
                            strokeWidth={2}
                          />
                        </div>
                      ) : isActive ? (
                        <div className="text-[#FF8A00]">
                          <Circle
                            size={24}
                            fill="currentColor"
                            fillOpacity="0.1"
                            strokeWidth={2}
                          />
                        </div>
                      ) : (
                        <div className="text-gray-300">
                          <Circle size={24} strokeWidth={1.5} />
                        </div>
                      )}
                      {idx < 6 && (
                        <div
                          className={`w-[1px] h-8 absolute mt-6 ${step.completed ? "bg-[#2EB086]" : "bg-gray-200"}`}
                        />
                      )}
                    </div>
                    <span
                      className={`text-sm font-semibold ${step.completed || isActive ? "text-gray-900" : "text-gray-400"}`}>
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content Area */}
          <div className="flex-1 bg-white rounded-2xl p-10 border-opacity-50">
            {kycFlowData.activeStepId === "bvn" && (
              <div className=" mx-auto space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Please enter your BVN
                </h2>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900">
                    Bank Verification Number
                  </label>
                  <input
                    type="text"
                    value={kycFlowData.bvnInput}
                    onChange={(e) => setKYCFlowData({ bvnInput: e.target.value })}
                    className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00] transition-all"
                    placeholder="Enter 11-digit BVN"
                    maxLength={11}
                  />
                </div>

                <p className="text-[12px] text-[#2EB086] font-medium italic">
                  Your BVN helps us securely verify your identity. It&apos;s
                  safe and will not be used for any other purpose.
                </p>

                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    className="mt-1 rounded border-gray-300"
                    id="understand"
                    defaultChecked
                  />
                  <label
                    htmlFor="understand"
                    className="text-sm text-gray-500 leading-tight">
                    I understand that Peakpay will use my BVN to verify my
                    identity and check my credit records.
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleBVNProceed}
                    disabled={kycFlowData.bvnInput.length < 11}
                    className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:bg-gray-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-100 transition-all">
                    Proceed
                  </button>
                </div>
              </div>
            )}

            {kycFlowData.activeStepId === "liveness" && (
              <LivenessView onComplete={handleLivenessComplete} />
            )}

            {kycFlowData.activeStepId === "nextOfKin" && (
              <NextOfKinView onComplete={handleNextOfKinComplete} />
            )}

            {kycFlowData.activeStepId === "employment" && (
              <EmploymentDetailsView onComplete={handleEmploymentComplete} />
            )}

            {kycFlowData.activeStepId === "pep" && (
              <PEPDetailsView onComplete={handlePEPComplete} />
            )}

            {kycFlowData.activeStepId === "bankDetails" && (
              <AddBankDetailsView onComplete={handleBankDetailsComplete} />
            )}

            {kycFlowData.activeStepId === "transactionPin" && (
              <CreateTransactionPinView onComplete={handlePinComplete} />
            )}

            {kycFlowData.activeStepId !== "bvn" &&
              kycFlowData.activeStepId !== "liveness" &&
              kycFlowData.activeStepId !== "nextOfKin" &&
              kycFlowData.activeStepId !== "employment" &&
              kycFlowData.activeStepId !== "pep" &&
              kycFlowData.activeStepId !== "bankDetails" &&
              kycFlowData.activeStepId !== "transactionPin" && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                    <LayoutGrid size={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {kycSteps.find((s) => s.id === kycFlowData.activeStepId)?.name}
                    </h3>
                    <p className="text-gray-500 max-w-xs">
                      This step is coming soon. Please complete the other
                      verification steps.
                    </p>
                  </div>
                  <button
                    onClick={() => setKYCFlowData({ activeStepId: "bvn" })}
                    className="text-[#FF8A00] font-bold flex items-center gap-2">
                    Go back to BVN <ArrowRight size={18} />
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }

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
            <Bell size={20} className="text-[#FF8A00]" />
          </div>
        </div>
      </header>

      {/* KYC Banner - Conditional */}
      {!kycCompleted && (
        <div
          onClick={() => setKYCFlowData({ showKYC: true })}
          className="bg-white border border-[#FFD000] rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:bg-yellow-50/30 transition-colors">
          <div className="text-yellow-500">
            <AlertCircle size={20} />
          </div>
          <p className="text-sm font-semibold text-gray-900">
            Update your profile and complete your KYC to take a loan.
          </p>
        </div>
      )}

      {/* Eligibility Card */}
      {!kycCompleted && (
        <div className="bg-[#E6F4F1] rounded-2xl p-8 flex items-center justify-between">
          <h2 className="text-[22px] font-semibold text-[#004D3C] max-w-lg">
            You may be eligible for up to ₦ 10,000,000
          </h2>
          <button className="bg-[#2EB086] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#269d76] transition-colors">
            Get it now
          </button>
        </div>
      )}

      {/* Balance Card Section */}
      <div className="bg-[#3D2100] rounded-3xl p-8 flex items-center justify-between relative overflow-hidden min-h-[220px]">
        <div className="space-y-4 relative z-10">
          <p className="text-gray-300 font-medium">Estimated eligible amount</p>
          <div className="flex items-center gap-3">
            <h3 className="text-[22px] font-semibold text-white">
              ₦ {showBalance ? "0.00" : "****"}
            </h3>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-gray-300 hover:text-white transition-colors">
              {showBalance ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>

          <button
            onClick={() =>
              router.push(
                loanData.status === "pending"
                  ? "/payment"
                  : loanData.status === "approved"
                    ? "/manage"
                    : "/loans",
              )
            }
            className="bg-[#FF8A00] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-[#E67C00] transition-colors group mt-4">
            {loanData.status === "pending"
              ? "Set up payment"
              : loanData.status === "approved"
                ? "Manage Loan"
                : "Request Loan"}
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* 3D Illustration */}
        <div className="absolute right-30 top-0 h-full w-1/2 flex items-center justify-end">
          <div className="relative w-full h-full">
            <Image
              src="/images/money.png"
              alt="Balance Illustration"
              fill
              className="object-cover object-right transform scale-110 translate-x-10"
              priority
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="bg-white rounded-2xl border border-gray-100 p-8 space-y-6">
        <h3 className="text-[20px] font-semibold text-gray-900">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() =>
              router.push(loanData.status === "pending" ? "/payment" : "/loans")
            }
            disabled={loanData.status === "approved"}
            className="bg-[#FFF4E5] p-6 rounded-2xl flex items-center gap-4 hover:shadow-md transition-all group border border-transparent hover:border-[#FFE1CC]">
            <div className="bg-white p-3 rounded-full shadow-sm">
              <FileText size={24} className="text-[#FF8A00]" />
            </div>
            <span
              className={`font-semibold ${loanData.status === "approved"
                  ? "text-[#F3F4F6]"
                  : "text-[#606060]"
                }`}>
              {loanData.status === "pending"
                ? "Set up payment"
                : "Request Loan"}
            </span>
          </button>
          <button
            onClick={() =>
              router.push(
                loanData.status === "pending"
                  ? "/payment"
                  : loanData.status === "approved"
                    ? "/manage"
                    : "/loans",
              )
            }
            disabled={loanData.status !== "approved"}
            className="bg-[#FFF4E5] p-6 rounded-2xl flex items-center gap-4 hover:shadow-md transition-all group border border-transparent hover:border-[#FFE1CC]">
            <div className="bg-white p-3 rounded-full shadow-sm">
              <LayoutGrid size={24} className="text-[#FF8A00]" />
            </div>
            <span
              className={`font-semibold ${loanData.status === "approved"
                  ? "text-[#606060]"
                  : "text-[#F3F4F6]"
                }`}>
              Manage Loan
            </span>
          </button>
        </div>
      </section>

      {/* Transactions Section */}
      <section className="bg-white rounded-2xl border border-gray-100 p-8 space-y-8 min-h-[300px]">
        <div className="flex items-center justify-between">
          <h3 className="text-[20px] font-semibold text-gray-900">
            Transactions
          </h3>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 pt-4">
          <div className="grid grid-cols-3 w-full pb-6 text-sm font-medium text-gray-400 border-b border-gray-50 px-2">
            <span>Date</span>
            <span className="text-center">Narration</span>
            <span className="text-right">Amount</span>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 max-w-[200px]">
            <div className="relative w-48 h-48">
              <Image
                src="/images/empty.png"
                alt="No transactions"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-500 font-semibold">No transaction yet</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const LivenessView = ({ onComplete }: { onComplete: () => void }) => {
  const [status, setStatus] = useState<
    "initial" | "capturing" | "loading" | "success"
  >("initial");
  const [captured, setCaptured] = useState(false);
  const [countdown, setCountdown] = useState(120); // 2:00

  // Mock detection delay
  useEffect(() => {
    if (status === "capturing" && !captured) {
      const timer = setTimeout(() => {
        setCaptured(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, captured]);

  // Timer simulation
  useEffect(() => {
    if (status === "loading" && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (status === "loading" && countdown === 0) {
      setStatus("success");
    }
  }, [status, countdown]);

  // Success auto-redirect
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (status === "initial") {
    return (
      <div className="mx-auto space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Liveness Check</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            You&apos;re almost there! Center your face in the frame and follow
            the on-screen instructions. Make sure it&apos;s completed by
            yourself.
          </p>
        </div>

        <div className="flex justify-center py-6">
          <div className="relative w-48 h-48">
            <Liveness />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900">
            Before you proceed
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="text-[#FF8A00]">
                <CheckCircle2 size={18} fill="currentColor" fillOpacity="0.1" />
              </div>
              <p>
                Take off your glasses, hat or any items that cover your face
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="text-[#FF8A00]">
                <CheckCircle2 size={18} fill="currentColor" fillOpacity="0.1" />
              </div>
              <p>Make sure your face is well-lit</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={() => setStatus("capturing")}
            className="w-full bg-[#FF8A00] hover:bg-[#E67C00] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-100 transition-all">
            Proceed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden relative mx-4">
        {/* Close Button */}
        <button
          onClick={() => setStatus("initial")}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-50">
          <X size={24} />
        </button>

        <div className="p-8 flex flex-col items-center text-center space-y-6">
          {status === "capturing" && (
            <>
              <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-200">
                {/* Mock Camera View */}
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=300&auto=format&fit=crop"
                  alt="Face Capture"
                  width={300}
                  height={300}
                  className="object-cover grayscale"
                />
                {!captured && (
                  <div className="absolute inset-0 border-[40px] border-black/30 rounded-full" />
                )}
              </div>

              {!captured ? (
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">
                    Place your face in the circle.
                  </p>
                  <p className="text-gray-400 text-[12px]">
                    Make sure you are the only one visible on-screen
                  </p>
                </div>
              ) : (
                <div className="w-full space-y-6">
                  <div className="space-y-2 text-left">
                    <h3 className="font-bold text-gray-900">
                      Before you submit
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="text-[#FF8A00]">
                          <CheckCircle2
                            size={16}
                            fill="currentColor"
                            fillOpacity="0.1"
                          />
                        </div>
                        <p>Make sure image is clear and legible</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="text-[#FF8A00]">
                          <CheckCircle2
                            size={16}
                            fill="currentColor"
                            fillOpacity="0.1"
                          />
                        </div>
                        <p>Ensure your face is the main object in the image</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setStatus("loading");
                      setCountdown(120);
                    }}
                    className="w-full bg-[#FF8A00] hover:bg-[#E67C00] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-100 transition-all">
                    Submit
                  </button>
                </div>
              )}
            </>
          )}

          {status === "loading" && (
            <div className="py-12 flex flex-col items-center space-y-8">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <Loader2
                  className="w-16 h-16 text-[#FF8A00] animate-spin"
                  strokeWidth={1.5}
                />
                <div className="absolute w-2 h-2 bg-[#FF8A00] rounded-full top-0" />
              </div>
              <div className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                Loading...{" "}
                <span className="text-gray-400">{formatTime(countdown)}</span>
              </div>
              <div className="text-sm text-gray-400 max-w-[200px]">
                Please wait while we process your verification result.
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="py-12 flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                <CheckCircle2 size={40} strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Verification Successful
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NextOfKinView = ({
  onComplete,
}: {
  onComplete: (data: {
    firstName: string;
    lastName: string;
    phone: string;
    relation: string;
  }) => void;
}) => {
  const { signupData } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: signupData?.kycData?.nextOfKinFirstName || "",
    lastName: signupData?.kycData?.nextOfKinLastName || "",
    phone: signupData?.kycData?.nextOfKinPhone || "",
    relation: signupData?.kycData?.nextOfKinRelation || "",
  });

  const isValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.relation.trim() !== "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const relations = [
    "Brother",
    "Sister",
    "Father",
    "Mother",
    "Spouse",
    "Friend",
    "Other",
  ];

  return (
    <div className="mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Next of Kin Details</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-900">
            What is the first name of your next of kin?
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00] transition-all"
            placeholder="Enter first name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-900">
            What is the last name of your next of kin?
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00] transition-all"
            placeholder="Enter last name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-900">
            What is the phone number of your next of kin?
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00] transition-all"
            placeholder="Enter phone number"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-900">
            What is your relation with your next of kin?
          </label>
          <div className="relative">
            <select
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00] transition-all appearance-none cursor-pointer">
              <option value="" disabled>
                Select an option
              </option>
              {relations.map((rel) => (
                <option key={rel} value={rel}>
                  {rel}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <ChevronRight className="rotate-90" size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={() => onComplete(formData)}
          disabled={!isValid}
          className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:bg-gray-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-100 transition-all">
          Proceed
        </button>
      </div>
    </div>
  );
};

const EmploymentDetailsView = ({
  onComplete,
}: {
  onComplete: (data: any) => void;
}) => {
  const { signupData } = useAuthStore();
  const [formData, setFormData] = useState({
    employmentStatus: signupData?.kycData?.employmentStatus || "",
    employerName: signupData?.kycData?.employerName || "",
    sector: signupData?.kycData?.sector || "",
    industry: signupData?.kycData?.industry || "",
    monthlyIncome: signupData?.kycData?.monthlyIncome || "",
    payDate: signupData?.kycData?.payDate || "",
    workState: signupData?.kycData?.workState || "",
    workCity: signupData?.kycData?.workCity || "",
    workAddress: signupData?.kycData?.workAddress || "",
    workEmail: signupData?.kycData?.workEmail || "",
  });
  const [showOTP, setShowOTP] = useState(false);

  const isValid = Object.values(formData).every((val) => val.trim() !== "");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const employmentStatuses = [
    "Employed",
    "Self-Employed",
    "Unemployed",
    "Student",
  ];
  const sectors = ["Public", "Private", "Non-Profit"];
  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Other",
  ];
  const states = ["Lagos", "Abuja", "Rivers", "Oyo", "Kano"]; // Simplified list

  return (
    <div className="mx-auto space-y-6 h-full flex flex-col">
      <h2 className="text-[22px] font-semibold text-gray-900">
        Employment Details
      </h2>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6 max-h-[500px] custom-scrollbar">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">
            What is your employment status?
          </label>
          <div className="relative">
            <select
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
              className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00] transition-all appearance-none">
              <option value="" disabled>
                Select an option
              </option>
              {employmentStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
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
            Where do you work?
          </label>
          <input
            type="text"
            name="employerName"
            value={formData.employerName}
            onChange={handleChange}
            className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00]"
            placeholder="Enter employer name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">
              What sector do you work in?
            </label>
            <div className="relative">
              <select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00] appearance-none">
                <option value="" disabled>
                  Select an option
                </option>
                {sectors.map((s) => (
                  <option key={s} value={s}>
                    {s}
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
              What industry do you work in?
            </label>
            <div className="relative">
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00] appearance-none">
                <option value="" disabled>
                  Select an option
                </option>
                {industries.map((i) => (
                  <option key={i} value={i}>
                    {i}
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

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">
            How much do you earn monthly?
          </label>
          <input
            type="text"
            name="monthlyIncome"
            value={formData.monthlyIncome}
            onChange={handleChange}
            className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00]"
            placeholder="e.g. 200,000"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">
            What date do you get paid every month?
          </label>
          <input
            type="text"
            name="payDate"
            value={formData.payDate}
            onChange={handleChange}
            className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00]"
            placeholder="e.g. 25th"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">
              Work State
            </label>
            <div className="relative">
              <select
                name="workState"
                value={formData.workState}
                onChange={handleChange}
                className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00] appearance-none">
                <option value="" disabled>
                  Select state
                </option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
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
              Work City
            </label>
            <input
              type="text"
              name="workCity"
              value={formData.workCity}
              onChange={handleChange}
              className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00]"
              placeholder="Enter city"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">
            What is your company address?
          </label>
          <input
            type="text"
            name="workAddress"
            value={formData.workAddress}
            onChange={handleChange}
            className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00]"
            placeholder="Enter address"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">
            What is your work email address?
          </label>
          <input
            type="email"
            name="workEmail"
            value={formData.workEmail}
            onChange={handleChange}
            className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00]"
            placeholder="Enter work email"
          />
        </div>
      </div>

      <div className="pt-4 mt-auto">
        <button
          onClick={() => setShowOTP(true)}
          disabled={!isValid}
          className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl shadow-lg transition-all">
          Proceed
        </button>
      </div>

      {showOTP && (
        <EmailVerificationModal
          email={formData.workEmail}
          onClose={() => setShowOTP(false)}
          onVerify={() => {
            setShowOTP(false);
            onComplete(formData);
          }}
        />
      )}
    </div>
  );
};

const EmailVerificationModal = ({
  email,
  onClose,
  onVerify,
}: {
  email: string;
  onClose: () => void;
  onVerify: () => void;
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(116); // 1:56

  useEffect(() => {
    const t = setInterval(
      () => setTimer((prev) => (prev > 0 ? prev - 1 : 0)),
      1000,
    );
    return () => clearInterval(t);
  }, []);

  const formatTimer = (s: number) => {
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m}:${rs.toString().padStart(2, "0")}`;
  };

  const handleOtpChange = (val: string, index: number) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Focus next
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const isOtpFull = otp.every((v) => v !== "");

  useEffect(() => {
    if (isOtpFull) {
      // Auto verify for demo purposes or after a small delay
      const t = setTimeout(onVerify, 1000);
      return () => clearTimeout(t);
    }
  }, [isOtpFull, onVerify]);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[24px] w-full max-w-sm p-8 text-center space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400">
          <X size={20} />
        </button>

        <div className="flex justify-center">
          <div className="bg-blue-500 text-white p-3 rounded-full flex items-center justify-center w-12 h-12">
            <span className="text-xl font-bold">i</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-[20px] font-semibold text-gray-900">
            Verify your work email address
          </h3>
          <p className="text-sm text-gray-500">
            We have just sent a 6-digit code to your email address{" "}
            <span className="font-semibold">
              {email.replace(/(.{2}).*(@.*)/, "$1****$2")}
            </span>
            . Enter it here.
          </p>
        </div>

        <div className="flex justify-between gap-2">
          {otp.map((v, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              value={v}
              onChange={(e) => handleOtpChange(e.target.value, i)}
              className="w-10 h-12 border border-gray-200 rounded-lg text-center text-lg font-semibold outline-none focus:border-[#FF8A00]"
              maxLength={1}
            />
          ))}
        </div>

        <div className="text-sm text-gray-400">
          Resend code in{" "}
          <span className="text-gray-900 font-medium">
            {formatTimer(timer)}
          </span>
        </div>
      </div>
    </div>
  );
};

const PEPDetailsView = ({
  onComplete,
}: {
  onComplete: (isPEP: boolean) => void;
}) => {
  const { signupData } = useAuthStore();
  const [isPEP, setIsPEP] = useState<string>(
    signupData?.kycData?.isPEP === undefined
      ? ""
      : signupData.kycData.isPEP
        ? "Yes"
        : "No",
  );

  return (
    <div className="mx-auto space-y-6 h-full flex flex-col">
      <div className="space-y-2">
        <h2 className="text-[22px] font-semibold text-gray-900">PEP Details</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          A PEP (politically exposed person) is someone with an important
          government role, like a politician or someone in close contact with
          people in important government roles.
        </p>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-semibold text-gray-900 leading-snug block">
          Are you or any of your immediate family members PEP?
        </label>
        <div className="relative">
          <select
            value={isPEP}
            onChange={(e) => setIsPEP(e.target.value)}
            className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00] transition-all appearance-none">
            <option value="" disabled>
              Select an option
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <ChevronRight
            className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none"
            size={20}
          />
        </div>
      </div>

      <div className="pt-4 mt-auto">
        <button
          onClick={() => onComplete(isPEP === "Yes")}
          disabled={!isPEP}
          className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl shadow-lg transition-all">
          Proceed
        </button>
      </div>
    </div>
  );
};

const AddBankDetailsView = ({
  onComplete,
}: {
  onComplete: (data: any) => void;
}) => {
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    bankPhoneNumber: "",
  });
  const [accountName, setAccountName] = useState("");
  const [isFetchingName, setIsFetchingName] = useState(false);

  const banks = [
    "Access Bank",
    "GTBank",
    "Zenith Bank",
    "First Bank",
    "UBA",
    "Kuda Bank",
  ];

  const handleAccountNumberChange = (val: string) => {
    setFormData((prev) => ({ ...prev, accountNumber: val }));
    if (val.length === 10) {
      setIsFetchingName(true);
      // Mock fetch delay
      setTimeout(() => {
        setAccountName("Oluwasegun Adigun");
        setIsFetchingName(false);
      }, 1000);
    } else {
      setAccountName("");
    }
  };

  const isValid =
    formData.bankName &&
    formData.accountNumber.length === 10 &&
    formData.bankPhoneNumber.length >= 10 &&
    accountName;

  return (
    <div className="mx-auto space-y-6 h-full flex flex-col">
      <div className="space-y-2">
        <h2 className="text-[22px] font-semibold text-gray-900">
          Add Bank Details
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Provide your salary or most active account to qualify for better loan
          offers and significantly higher amounts.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">Bank</label>
          <div className="relative">
            <select
              value={formData.bankName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bankName: e.target.value }))
              }
              className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00] transition-all appearance-none">
              <option value="" disabled>
                Select an option
              </option>
              {banks.map((b) => (
                <option key={b} value={b}>
                  {b}
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
            Account Number
          </label>
          <div className="space-y-1">
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(e) => handleAccountNumberChange(e.target.value)}
              className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00]"
              placeholder="Enter answer"
              maxLength={10}
            />
            <div className="flex justify-end h-5">
              {isFetchingName ? (
                <span className="text-xs text-gray-400 animate-pulse">
                  Fetching name...
                </span>
              ) : (
                <span className="text-xs font-semibold text-[#00A85A]">
                  {accountName}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">
            Phone Number
          </label>
          <input
            type="text"
            value={formData.bankPhoneNumber}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                bankPhoneNumber: e.target.value,
              }))
            }
            className="w-full bg-[#FBFBFB] border border-gray-100 rounded-xl p-4 outline-none focus:border-[#FF8A00]"
            placeholder="Enter answer"
          />
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Info size={14} className="text-[#FF8A00]" />
            <span>
              The phone number provided must be linked to the bank account
              above.
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-auto">
        <button
          onClick={() => onComplete({ ...formData, accountName })}
          disabled={!isValid}
          className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl shadow-lg transition-all">
          Proceed
        </button>
      </div>
    </div>
  );
};

const CreateTransactionPinView = ({
  onComplete,
}: {
  onComplete: (pin: string) => void;
}) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);

  const handlePinChange = (val: string, index: number, isConfirm: boolean) => {
    if (val.length > 1) val = val[val.length - 1];
    if (isConfirm) {
      const newConfirm = [...confirmPin];
      newConfirm[index] = val;
      setConfirmPin(newConfirm);
      if (val && index < 3)
        document.getElementById(`confirm-pin-${index + 1}`)?.focus();
    } else {
      const newPin = [...pin];
      newPin[index] = val;
      setPin(newPin);
      if (val && index < 3)
        document.getElementById(`pin-${index + 1}`)?.focus();
    }
  };

  const isComplete =
    pin.every((v) => v !== "") && confirmPin.every((v) => v !== "");
  const pinsMatch = pin.join("") === confirmPin.join("");

  return (
    <div className="mx-auto space-y-8 h-full flex flex-col">
      <div className="space-y-2">
        <h2 className="text-[22px] font-semibold text-gray-900">
          Create Transaction PIN
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Please keep your PIN safe, it will be used to complete transactions on
          Peakpay.
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-900 block">
            PIN
          </label>
          <div className="flex justify-start gap-4">
            {pin.map((v, i) => (
              <input
                key={i}
                id={`pin-${i}`}
                type="password"
                value={v}
                onChange={(e) => handlePinChange(e.target.value, i, false)}
                className="w-12 h-14 border border-gray-100 bg-[#FBFBFB] rounded-xl text-center text-xl font-semibold outline-none focus:border-[#FF8A00]"
                maxLength={1}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-900 block">
            Confirm PIN
          </label>
          <div className="flex justify-start gap-4">
            {confirmPin.map((v, i) => (
              <input
                key={i}
                id={`confirm-pin-${i}`}
                type="password"
                value={v}
                onChange={(e) => handlePinChange(e.target.value, i, true)}
                className="w-12 h-14 border border-gray-100 bg-[#FBFBFB] rounded-xl text-center text-xl font-semibold outline-none focus:border-[#FF8A00]"
                maxLength={1}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 mt-auto">
        <button
          onClick={() => onComplete(pin.join(""))}
          disabled={!isComplete || !pinsMatch}
          className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl shadow-lg transition-all">
          Proceed
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
