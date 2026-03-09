"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WhiteLogo } from "@/components/Logo";
import { useAuthStore } from "@/lib/store";
import { Loader2, Info, ChevronDown, Check } from "lucide-react";
import { BottomSheet } from "@/components/BottomSheet";

const QUESTIONS = [
  "What is your mother's maiden name?",
  "What was the name of your first pet?",
  "What city were you born in?",
  "What was your first car?",
  "What is your favorite book?",
];

export default function SignupStage6() {
  const router = useRouter();
  const { signupData, setSignupData } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(
    null,
  );

  const handleUpdate = (
    index: number,
    field: "question" | "answer",
    value: string,
  ) => {
    const newQuestions = [...(signupData.securityQuestions || [])];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setSignupData({ securityQuestions: newQuestions });
    if (field === "question") {
      setActiveQuestionIndex(null);
    }
  };

  const canProceed =
    signupData.securityQuestions?.every((q) => q.question && q.answer) ?? false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceed) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    router.push("/signup-7");
  };

  const currentQuestion =
    activeQuestionIndex !== null
      ? signupData.securityQuestions?.[activeQuestionIndex]?.question
      : "";

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-white font-sans">
      <section className="hidden md:flex relative flex-1 bg-[#F5F5F5] overflow-hidden">
        <Image
          src="/images/onboarding-hero.png"
          alt="Cheerful customer using Peakpay"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-10 left-10">
          <WhiteLogo />
        </div>
      </section>

      <section className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 overflow-y-auto">
        <div className="w-full max-w-xl space-y-8 py-10">
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              Create security questions
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              To keep your account safe, please set up security questions.
              Please note that your answers are case sensitive.
            </p>
          </div>

          <div className="bg-[#FFF9F2] border border-[#FFE8CC] rounded-2xl p-4 flex items-start gap-3">
            <Info size={18} className="text-[#FF8A00] mt-0.5 flex-shrink-0" />
            <p className="text-xs text-[#854D0E] font-medium leading-relaxed">
              Please note that your answer is case sensitive. Keep it simple and
              memorable.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-10">
              {/* Question 1 */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                    Security question 1
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveQuestionIndex(0)}
                    className="w-full h-[58px] px-5 flex items-center justify-between border border-gray-200 rounded-2xl bg-white hover:border-[#FF8A00] transition-all text-left group">
                    <span
                      className={`text-sm ${signupData.securityQuestions?.[0]?.question ? "text-gray-900 font-semibold" : "text-gray-400 font-medium"}`}>
                      {signupData.securityQuestions?.[0]?.question ||
                        "Select a question"}
                    </span>
                    <ChevronDown
                      size={20}
                      className="text-gray-400 group-hover:text-[#FF8A00] transition-colors"
                    />
                  </button>
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                    Answer to security question 1
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your answer"
                    value={signupData.securityQuestions?.[0]?.answer || ""}
                    onChange={(e) => handleUpdate(0, "answer", e.target.value)}
                    className="w-full h-[58px] px-5 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all text-sm font-semibold placeholder:text-gray-400 placeholder:font-medium"
                  />
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              {/* Question 2 */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                    Security question 2
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveQuestionIndex(1)}
                    className="w-full h-[58px] px-5 flex items-center justify-between border border-gray-200 rounded-2xl bg-white hover:border-[#FF8A00] transition-all text-left group">
                    <span
                      className={`text-sm ${signupData.securityQuestions?.[1]?.question ? "text-gray-900 font-semibold" : "text-gray-400 font-medium"}`}>
                      {signupData.securityQuestions?.[1]?.question ||
                        "Select a question"}
                    </span>
                    <ChevronDown
                      size={20}
                      className="text-gray-400 group-hover:text-[#FF8A00] transition-colors"
                    />
                  </button>
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">
                    Answer to security question 2
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your answer"
                    value={signupData.securityQuestions?.[1]?.answer || ""}
                    onChange={(e) => handleUpdate(1, "answer", e.target.value)}
                    className="w-full h-[58px] px-5 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all text-sm font-semibold placeholder:text-gray-400 placeholder:font-medium"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !canProceed}
              className="w-full bg-[#FF8A00] hover:bg-[#E67C00] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold h-[64px] rounded-2xl flex items-center justify-center transition-all active:scale-[0.98] shadow-lg shadow-orange-200">
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Finish Application"
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Bottom Sheet for Questions */}
      <BottomSheet
        isOpen={activeQuestionIndex !== null}
        onClose={() => setActiveQuestionIndex(null)}
        title="Select Security Question">
        <div className="space-y-2">
          {QUESTIONS.map((q, i) => {
            const isSelected = q === currentQuestion;
            return (
              <button
                key={i}
                type="button"
                onClick={() =>
                  handleUpdate(activeQuestionIndex as number, "question", q)
                }
                className={`w-full p-5 rounded-2xl text-left transition-all flex items-center justify-between group ${
                  isSelected
                    ? "bg-[#FFF9F2] text-[#FF8A00]"
                    : "hover:bg-gray-50 text-gray-700"
                }`}>
                <span className={`text-[15px] font-semibold tracking-tight`}>
                  {q}
                </span>
                {isSelected && (
                  <Check
                    size={20}
                    className="text-[#FF8A00] animate-in zoom-in duration-300"
                  />
                )}
              </button>
            );
          })}
        </div>
      </BottomSheet>
    </main>
  );
}
